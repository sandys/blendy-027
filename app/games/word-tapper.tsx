import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
  Platform,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { Volume2 } from "lucide-react-native";
import { SAMPLE_LESSONS } from "@/constants/curriculum-data";
import { speakText } from "@/utils/audio";

export default function WordTapperScreen() {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const params = useLocalSearchParams();
  const lessonNumber = parseInt(params.lesson as string);
  const exerciseIndex = parseInt(params.exercise as string);

  const lesson = SAMPLE_LESSONS.find((l) => l.lesson_number === lessonNumber);
  const exercise = lesson?.exercises[exerciseIndex];

  const exerciseData = exercise?.data as
    | { sentence: string; wordCount: number }
    | undefined;
  const sentence = exerciseData?.sentence || "";
  const wordCount = exerciseData?.wordCount || 0;

  const [tapCount, setTapCount] = useState<number>(0);
  const [showSubmit, setShowSubmit] = useState<boolean>(false);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isPlayingSentence, setIsPlayingSentence] = useState<boolean>(false);
  const audioLoopRef = useRef<boolean>(true);
  const isCorrectAnswerGiven = useRef<boolean>(false);
  const flashAnim = useRef(new Animated.Value(0)).current;

  const circleAnims = useMemo(() => {
    const anims: Animated.Value[] = [];
    for (let i = 0; i < wordCount; i++) {
      anims.push(new Animated.Value(0));
    }
    return anims;
  }, [wordCount]);

  useEffect(() => {
    if (!sentence) return;

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
        setIsPlayingSentence(true);
        await speakText(sentence, { rate: 0.7 });
        setIsPlayingSentence(false);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    };

    playAudioLoop();

    return () => {
      audioLoopRef.current = false;
    };
  }, [exerciseIndex, sentence, flashAnim]);

  if (!exercise || exercise.exercise_type !== "Word Tapper") {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Exercise not found</Text>
      </View>
    );
  }

  const handleCircleTap = (index: number) => {
    if (showFeedback || tapCount >= wordCount) return;

    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    Animated.spring(circleAnims[index], {
      toValue: 1,
      useNativeDriver: true,
      friction: 5,
    }).start();

    const newCount = tapCount + 1;
    setTapCount(newCount);

    if (newCount === wordCount) {
      setShowSubmit(true);
    }
  };

  const handleSubmit = () => {
    const correct = tapCount === wordCount;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      isCorrectAnswerGiven.current = true;
      audioLoopRef.current = false;
      setIsPlayingSentence(false);

      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      setTimeout(() => {
        const nextExerciseIndex = exerciseIndex + 1;
        if (lesson && nextExerciseIndex < lesson.exercises.length) {
          router.replace({
            pathname: "/games/word-tapper",
            params: { lesson: lessonNumber, exercise: nextExerciseIndex },
          });
        } else {
          router.back();
        }
      }, 2500);
    } else {
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }

      setTimeout(() => {
        setTapCount(0);
        setShowSubmit(false);
        setShowFeedback(false);
        circleAnims.forEach((anim) => anim.setValue(0));
      }, 2000);
    }
  };

  const flashColor = flashAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(78, 205, 196, 0)', 'rgba(78, 205, 196, 0.3)'],
  });

  const isLandscape = width > height;
  const circleSize = isLandscape ? 70 : 90;
  const sentenceCardPadding = isLandscape ? 20 : 30;

  return (
    <View style={[styles.container, { paddingLeft: insets.left, paddingRight: insets.right, paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Animated.View 
        style={[
          styles.flashOverlay,
          { backgroundColor: flashColor }
        ]} 
        pointerEvents="none"
      />
      <View style={styles.landscapeContent}>
        <View style={styles.leftSection}>
          <View style={styles.header}>
            <Text style={[styles.progressText, { fontSize: isLandscape ? 12 : 14 }]}>
              Exercise {exerciseIndex + 1} of {lesson?.exercises.length || 0}
            </Text>
            <Text style={[styles.instructionText, { fontSize: isLandscape ? 18 : 26 }]}>
              Tap a circle for each word you hear
            </Text>
          </View>

          <View style={styles.sentenceContainer}>
            <View style={[
              styles.sentenceCard,
              isPlayingSentence && styles.sentenceCardPlaying,
              { padding: sentenceCardPadding }
            ]}>
              <Text style={[styles.sentenceText, { fontSize: isLandscape ? 22 : 28 }]}>{sentence}</Text>
              {isPlayingSentence && (
                <View style={styles.audioIndicator}>
                  <Volume2 size={28} color="#4ECDC4" />
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={styles.rightSection}>
          <View style={styles.circlesContainer}>
        {Array.from({ length: wordCount }).map((_, index) => {
          const isTapped = index < tapCount;
          const scale = circleAnims[index]
            ? circleAnims[index].interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.2],
              })
            : 1;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleCircleTap(index)}
              disabled={isTapped || showFeedback}
              activeOpacity={0.7}
            >
              <Animated.View
                style={[
                  styles.circle,
                  isTapped && styles.circleFilled,
                  {
                    width: circleSize,
                    height: circleSize,
                    borderRadius: circleSize / 2,
                    transform: [{ scale }],
                  },
                ]}
              >
                {isTapped && <Text style={[styles.circleNumber, { fontSize: circleSize * 0.4 }]}>{index + 1}</Text>}
              </Animated.View>
            </TouchableOpacity>
          );
        })}
          </View>

          <View style={styles.counterContainer}>
            <Text style={[styles.counterText, { fontSize: isLandscape ? 16 : 20 }]}>
              Words tapped: {tapCount} / {wordCount}
            </Text>
          </View>

          {showSubmit && !showFeedback && (
            <TouchableOpacity 
              style={[
                styles.submitButton,
                {
                  paddingVertical: isLandscape ? 12 : 16,
                  paddingHorizontal: isLandscape ? 30 : 40,
                }
              ]} 
              onPress={handleSubmit}
            >
              <Text style={[styles.submitButtonText, { fontSize: isLandscape ? 16 : 20 }]}>Check Answer</Text>
            </TouchableOpacity>
          )}

          {showFeedback && (
            <View
              style={[
                styles.feedbackContainer,
                isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect,
              ]}
            >
              <Text style={[styles.feedbackEmoji, { fontSize: isLandscape ? 50 : 72 }]}>
                {isCorrect ? "🎉" : "🤔"}
              </Text>
              <Text style={[styles.feedbackText, { fontSize: isLandscape ? 24 : 32 }]}>
                {isCorrect ? "Perfect!" : "Try again!"}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F8FF",
  },
  landscapeContent: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
  },
  leftSection: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 20,
  },
  rightSection: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  instructionText: {
    fontWeight: "700" as const,
    color: "#4ECDC4",
    textAlign: "center",
    marginBottom: 8,
  },
  progressText: {
    color: "#999",
    fontWeight: "600" as const,
    marginBottom: 12,
  },
  sentenceContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  sentenceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    minWidth: 200,
    borderWidth: 4,
    borderColor: "#4ECDC4",
  },
  sentenceCardPlaying: {
    borderColor: "#4ECDC4",
    borderWidth: 5,
    backgroundColor: "#E8F9F8",
    shadowColor: "#4ECDC4",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  sentenceText: {
    fontWeight: "700" as const,
    color: "#333",
    textAlign: "center",
  },
  audioIndicator: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#E8F9F8",
    borderRadius: 20,
    padding: 8,
  },
  circlesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 15,
    marginBottom: 20,
    maxWidth: "100%",
  },
  circle: {
    borderWidth: 4,
    borderColor: "#4ECDC4",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  circleFilled: {
    backgroundColor: "#4ECDC4",
  },
  circleNumber: {
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
  counterContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  counterText: {
    fontWeight: "600" as const,
    color: "#666",
  },
  submitButton: {
    backgroundColor: "#4ECDC4",
    borderRadius: 30,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonText: {
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
  feedbackContainer: {
    padding: 20,
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 20,
    alignItems: "center",
    minWidth: 200,
  },
  feedbackCorrect: {
    backgroundColor: "#E8F5E9",
  },
  feedbackIncorrect: {
    backgroundColor: "#FFEBEE",
  },
  feedbackEmoji: {
    marginBottom: 12,
  },
  feedbackText: {
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
