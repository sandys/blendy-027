import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  useWindowDimensions,
  Platform,
  PanResponder,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { SAMPLE_LESSONS } from "@/constants/curriculum-data";
import { speakText } from "@/utils/audio";
import { Volume2 } from "lucide-react-native";

export default function SoundSlideScreen() {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const params = useLocalSearchParams();
  const lessonNumber = parseInt(params.lesson as string);
  const exerciseIndex = parseInt(params.exercise as string);

  const lesson = SAMPLE_LESSONS.find((l) => l.lesson_number === lessonNumber);
  const exercise = lesson?.exercises[exerciseIndex];

  const exerciseData = exercise?.data as
    | { onset: string; rime: string; word: string; image: string }
    | undefined;

  const [stage, setStage] = useState<"initial" | "merged" | "complete">("initial");
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isPlayingOnset, setIsPlayingOnset] = useState<boolean>(false);
  const [isPlayingRime, setIsPlayingRime] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const audioLoopRef = useRef<boolean>(true);
  const isCorrectAnswerGiven = useRef<boolean>(false);
  const flashAnim = useRef(new Animated.Value(0)).current;

  const onsetPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const onsetScale = useRef(new Animated.Value(1)).current;
  const rimeScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!exerciseData) return;

    audioLoopRef.current = true;
    isCorrectAnswerGiven.current = false;

    const playInitialFeedback = async () => {
      Animated.sequence([
        Animated.timing(flashAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(flashAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
      
      if (Platform.OS !== "web") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
    };

    const playAudioLoop = async () => {
      await playInitialFeedback();
      
      while (audioLoopRef.current && !isCorrectAnswerGiven.current) {
        setIsPlayingOnset(true);
        await speakText(exerciseData.onset, { usePhoneme: true });
        setIsPlayingOnset(false);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (!audioLoopRef.current || isCorrectAnswerGiven.current) break;
        
        setIsPlayingRime(true);
        await speakText(exerciseData.rime, { usePhoneme: false });
        setIsPlayingRime(false);
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    };

    playAudioLoop();

    return () => {
      audioLoopRef.current = false;
    };
  }, [exerciseIndex, exerciseData, flashAnim]);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => stage === "initial",
      onMoveShouldSetPanResponder: () => stage === "initial",
      onPanResponderGrant: () => {
        if (Platform.OS !== "web") {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        Animated.spring(onsetScale, {
          toValue: 1.1,
          useNativeDriver: true,
        }).start();
      },
      onPanResponderMove: Animated.event(
        [null, { dx: onsetPosition.x, dy: onsetPosition.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gestureState) => {
        const targetX = width * 0.5;
        const targetY = height * 0.5;
        const distance = Math.sqrt(
          Math.pow(gestureState.moveX - targetX, 2) +
            Math.pow(gestureState.moveY - targetY, 2)
        );

        if (distance < 100) {
          isCorrectAnswerGiven.current = true;
          audioLoopRef.current = false;
          setIsPlayingOnset(false);
          setIsPlayingRime(false);
          setShowSuccess(true);

          if (Platform.OS !== "web") {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }

          speakText(exerciseData?.word || "", { usePhoneme: false, rate: 0.7 });

          Animated.parallel([
            Animated.spring(onsetPosition, {
              toValue: { x: width * 0.25, y: 0 },
              useNativeDriver: true,
            }),
            Animated.spring(onsetScale, {
              toValue: 1,
              useNativeDriver: true,
            }),
            Animated.sequence([
              Animated.timing(rimeScale, {
                toValue: 1.1,
                duration: 200,
                useNativeDriver: true,
              }),
              Animated.timing(rimeScale, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
              }),
            ]),
          ]).start(() => {
            setTimeout(() => {
              setStage("merged");
              setShowFeedback(true);
            }, 800);

            setTimeout(() => {
              const nextExerciseIndex = exerciseIndex + 1;
              if (lesson && nextExerciseIndex < lesson.exercises.length) {
                router.replace({
                  pathname: "/games/sound-slide",
                  params: { lesson: lessonNumber, exercise: nextExerciseIndex },
                });
              } else {
                router.back();
              }
            }, 3000);
          });
        } else {
          if (Platform.OS !== "web") {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          }

          Animated.parallel([
            Animated.spring(onsetPosition, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: true,
            }),
            Animated.spring(onsetScale, {
              toValue: 1,
              useNativeDriver: true,
            }),
          ]).start();
        }
      },
    })
  ).current;

  if (!exercise || exercise.exercise_type !== "Sound Slide") {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Exercise not found</Text>
      </View>
    );
  }

  const flashColor = flashAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 211, 61, 0)', 'rgba(255, 211, 61, 0.3)'],
  });

  const isLandscape = width > height;
  const tileSize = Math.min(width * 0.12, height * 0.25, 120);
  const verticalCenter = height * 0.5;
  const onsetLeft = width * 0.15;
  const rimeRight = width * 0.15;

  return (
    <View style={[styles.container, { paddingLeft: insets.left, paddingRight: insets.right }]}>
      <Animated.View 
        style={[
          styles.flashOverlay,
          { backgroundColor: flashColor }
        ]} 
        pointerEvents="none"
      />
      <View style={styles.header}>
        <Text style={styles.progressText}>
          Exercise {exerciseIndex + 1} of {lesson?.exercises.length || 0}
        </Text>
        <Text style={styles.instructionText}>
          Drag the sounds together to make a word!
        </Text>
      </View>

      <View style={styles.gameArea}>
        {stage === "initial" && (
          <>
            <Animated.View
              style={[
                styles.onsetTile,
                isPlayingOnset && styles.tilePlaying,
                showSuccess && styles.tileSuccess,
                {
                  left: onsetLeft,
                  top: verticalCenter - tileSize / 2,
                  width: tileSize,
                  height: tileSize,
                  transform: [
                    { translateX: onsetPosition.x },
                    { translateY: onsetPosition.y },
                    { scale: onsetScale },
                  ],
                },
              ]}
              {...panResponder.panHandlers}
            >
              <Text style={styles.tileText}>{exerciseData?.onset}</Text>
              {isPlayingOnset && (
                <View style={styles.audioIndicator}>
                  <Volume2 size={20} color="#FFFFFF" />
                </View>
              )}
            </Animated.View>

            <Animated.View
              style={[
                styles.rimeTile,
                isPlayingRime && styles.tilePlaying,
                showSuccess && styles.tileSuccess,
                {
                  right: rimeRight,
                  top: verticalCenter - tileSize / 2,
                  width: tileSize,
                  height: tileSize,
                  transform: [{ scale: rimeScale }],
                },
              ]}
            >
              <Text style={styles.tileText}>{exerciseData?.rime}</Text>
              {isPlayingRime && (
                <View style={styles.audioIndicator}>
                  <Volume2 size={20} color="#FFFFFF" />
                </View>
              )}
            </Animated.View>

            <View style={[styles.guideContainer, { top: verticalCenter - tileSize / 2 - 50, left: onsetLeft }]}>
              <Text style={styles.guideText}>👆 Drag me →</Text>
            </View>
          </>
        )}

        {stage === "merged" && (
          <View style={styles.mergedContainer}>
            <View style={styles.wordCard}>
              <Text style={styles.wordEmoji}>{exerciseData?.image}</Text>
              <Text style={styles.wordText}>{exerciseData?.word}</Text>
            </View>
          </View>
        )}
      </View>

      {showFeedback && (
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackEmoji}>🎉</Text>
          <Text style={styles.feedbackText}>Great job!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8E1",
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  instructionText: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: "#FFD93D",
    textAlign: "center",
    marginBottom: 8,
  },
  progressText: {
    fontSize: 16,
    color: "#999",
    fontWeight: "600" as const,
  },
  gameArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  onsetTile: {
    position: "absolute",
    borderRadius: 20,
    backgroundColor: "#FF6B9D",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  rimeTile: {
    position: "absolute",
    borderRadius: 20,
    backgroundColor: "#4ECDC4",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  tilePlaying: {
    borderWidth: 4,
    borderColor: "#FFFFFF",
    shadowColor: "#FFD93D",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 10,
  },
  tileSuccess: {
    backgroundColor: "#4CAF50",
    borderWidth: 4,
    borderColor: "#FFFFFF",
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 12,
  },
  audioIndicator: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 16,
    padding: 6,
  },
  tileText: {
    fontSize: 42,
    fontWeight: "800" as const,
    color: "#FFFFFF",
  },
  guideContainer: {
    position: "absolute",
  },
  guideText: {
    fontSize: 20,
    fontWeight: "600" as const,
    color: "#666",
  },
  mergedContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  wordCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  wordEmoji: {
    fontSize: 100,
    marginBottom: 20,
  },
  wordText: {
    fontSize: 56,
    fontWeight: "800" as const,
    color: "#1A1A1A",
  },
  feedbackContainer: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    backgroundColor: "#E8F5E9",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    minWidth: 200,
  },
  feedbackEmoji: {
    fontSize: 72,
    marginBottom: 12,
  },
  feedbackText: {
    fontSize: 32,
    fontWeight: "700" as const,
    textAlign: "center",
    color: "#333",
  },
  errorText: {
    fontSize: 18,
    color: "#F44336",
    textAlign: "center",
  },
  flashOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
});
