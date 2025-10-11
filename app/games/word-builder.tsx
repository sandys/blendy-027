import React, { useState, useRef, useEffect } from "react";
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
import { SAMPLE_LESSONS } from "@/constants/curriculum-data";
import { speakText } from "@/utils/audio";
import { Volume2 } from "lucide-react-native";

type BuildStage = "initial" | "first-blend" | "final-blend" | "complete";

export default function WordBuilderScreen() {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const params = useLocalSearchParams();
  const lessonNumber = parseInt(params.lesson as string);
  const exerciseIndex = parseInt(params.exercise as string);

  const lesson = SAMPLE_LESSONS.find((l) => l.lesson_number === lessonNumber);
  const exercise = lesson?.exercises[exerciseIndex];

  const exerciseData = exercise?.data as
    | { word: string; letters: string[]; image?: string }
    | undefined;

  const [stage, setStage] = useState<BuildStage>("initial");
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [playingLetterIndex, setPlayingLetterIndex] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const audioLoopRef = useRef<boolean>(true);
  const isCorrectAnswerGiven = useRef<boolean>(false);
  const flashAnim = useRef(new Animated.Value(0)).current;

  const letter1Scale = useRef(new Animated.Value(1)).current;
  const letter2Scale = useRef(new Animated.Value(1)).current;
  const letter3Scale = useRef(new Animated.Value(1)).current;
  const mergedScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!exerciseData || stage !== "initial") return;

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
      
      while (audioLoopRef.current && !isCorrectAnswerGiven.current && stage === "initial") {
        for (let i = 0; i < exerciseData.letters.length; i++) {
          if (!audioLoopRef.current || isCorrectAnswerGiven.current) break;
          
          setPlayingLetterIndex(i);
          await speakText(exerciseData.letters[i], { usePhoneme: true });
          await new Promise(resolve => setTimeout(resolve, 600));
        }
        
        setPlayingLetterIndex(null);
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    };

    playAudioLoop();

    return () => {
      audioLoopRef.current = false;
    };
  }, [exerciseIndex, exerciseData, stage, flashAnim]);

  if (!exercise || exercise.exercise_type !== "Word Builder") {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Exercise not found</Text>
      </View>
    );
  }

  const handleFirstBlend = async () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    const isTwoLetterWord = exerciseData?.letters.length === 2;
    setShowSuccess(true);

    if (isTwoLetterWord) {
      await speakText(exerciseData?.word || "", { usePhoneme: false, rate: 0.7 });
      Animated.parallel([
        Animated.sequence([
          Animated.timing(letter1Scale, {
            toValue: 1.2,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(letter1Scale, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(letter2Scale, {
            toValue: 1.2,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(letter2Scale, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        isCorrectAnswerGiven.current = true;
        audioLoopRef.current = false;
        setPlayingLetterIndex(null);

        if (Platform.OS !== "web") {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
        setStage("complete");
        setShowFeedback(true);

        setTimeout(() => {
          const nextExerciseIndex = exerciseIndex + 1;
          if (lesson && nextExerciseIndex < lesson.exercises.length) {
            router.replace({
              pathname: "/games/word-builder",
              params: { lesson: lessonNumber, exercise: nextExerciseIndex },
            });
          } else {
            router.back();
          }
        }, 2500);
      });
    } else {
      Animated.parallel([
        Animated.sequence([
          Animated.timing(letter1Scale, {
            toValue: 1.2,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(letter1Scale, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(letter2Scale, {
            toValue: 1.2,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(letter2Scale, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        Animated.spring(mergedScale, {
          toValue: 1.3,
          useNativeDriver: true,
          friction: 3,
        }),
      ]).start(async () => {
        const firstBlend = exerciseData?.letters.slice(0, 2).join("") || "";
        await speakText(firstBlend, { usePhoneme: false, rate: 0.7 });
        
        Animated.spring(mergedScale, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
        setStage("first-blend");
        setShowSuccess(false);
      });
    }
  };

  const handleFinalBlend = async () => {
    isCorrectAnswerGiven.current = true;
    audioLoopRef.current = false;
    setPlayingLetterIndex(null);
    setShowSuccess(true);

    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    await speakText(exerciseData?.word || "", { usePhoneme: false, rate: 0.7 });

    Animated.parallel([
      Animated.sequence([
        Animated.timing(letter3Scale, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(letter3Scale, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(mergedScale, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setStage("complete");
      setShowFeedback(true);

      setTimeout(() => {
        const nextExerciseIndex = exerciseIndex + 1;
        if (lesson && nextExerciseIndex < lesson.exercises.length) {
          router.replace({
            pathname: "/games/word-builder",
            params: { lesson: lessonNumber, exercise: nextExerciseIndex },
          });
        } else {
          router.back();
        }
      }, 2500);
    });
  };

  const getInstructionText = () => {
    const isTwoLetterWord = exerciseData?.letters.length === 2;
    switch (stage) {
      case "initial":
        return isTwoLetterWord
          ? "Tap to blend the sounds together"
          : "Tap to blend the first two sounds";
      case "first-blend":
        return "Now add the last sound!";
      case "complete":
        return "You built the word!";
      default:
        return "";
    }
  };

  const flashColor = flashAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(33, 150, 243, 0)', 'rgba(33, 150, 243, 0.3)'],
  });

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
        <Text style={styles.instructionText}>{getInstructionText()}</Text>
      </View>

      <View style={styles.buildArea}>
        {stage === "initial" && (
          <>
            <View style={styles.lettersRow}>
              <Animated.View
                style={[
                  styles.letterTile,
                  playingLetterIndex === 0 && styles.letterTilePlaying,
                  showSuccess && styles.letterTileSuccess,
                  { transform: [{ scale: letter1Scale }] },
                ]}
              >
                <Text style={styles.letterText}>
                  {exerciseData?.letters[0]}
                </Text>
                {playingLetterIndex === 0 && (
                  <View style={styles.audioIndicator}>
                    <Volume2 size={20} color="#FFFFFF" />
                  </View>
                )}
              </Animated.View>

              <Animated.View
                style={[
                  styles.letterTile,
                  playingLetterIndex === 1 && styles.letterTilePlaying,
                  showSuccess && styles.letterTileSuccess,
                  { transform: [{ scale: letter2Scale }] },
                ]}
              >
                <Text style={styles.letterText}>
                  {exerciseData?.letters[1]}
                </Text>
                {playingLetterIndex === 1 && (
                  <View style={styles.audioIndicator}>
                    <Volume2 size={20} color="#FFFFFF" />
                  </View>
                )}
              </Animated.View>
            </View>

            <TouchableOpacity
              style={styles.blendButton}
              onPress={handleFirstBlend}
              activeOpacity={0.8}
            >
              <Text style={styles.blendButtonText}>Blend →</Text>
            </TouchableOpacity>
          </>
        )}

        {stage === "first-blend" && (
          <>
            <View style={styles.lettersRow}>
              <Animated.View
                style={[
                  styles.mergedTile,
                  showSuccess && styles.mergedTileSuccess,
                  { transform: [{ scale: mergedScale }] },
                ]}
              >
                <Text style={styles.mergedText}>
                  {exerciseData?.letters[0]}
                  {exerciseData?.letters[1]}
                </Text>
              </Animated.View>

              <Animated.View
                style={[
                  styles.letterTile,
                  playingLetterIndex === 2 && styles.letterTilePlaying,
                  showSuccess && styles.letterTileSuccess,
                  { transform: [{ scale: letter3Scale }] },
                ]}
              >
                <Text style={styles.letterText}>
                  {exerciseData?.letters[2]}
                </Text>
                {playingLetterIndex === 2 && (
                  <View style={styles.audioIndicator}>
                    <Volume2 size={20} color="#FFFFFF" />
                  </View>
                )}
              </Animated.View>
            </View>

            <TouchableOpacity
              style={styles.blendButton}
              onPress={handleFinalBlend}
              activeOpacity={0.8}
            >
              <Text style={styles.blendButtonText}>Blend →</Text>
            </TouchableOpacity>
          </>
        )}

        {stage === "complete" && (
          <View style={styles.completeContainer}>
            <View style={styles.wordCard}>
              {exerciseData?.image && (
                <Text style={styles.wordEmoji}>{exerciseData.image}</Text>
              )}
              <Text style={styles.completeWord}>{exerciseData?.word}</Text>
            </View>
          </View>
        )}
      </View>

      {showFeedback && (
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackEmoji}>🎉</Text>
          <Text style={styles.feedbackText}>Amazing!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
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
    color: "#2196F3",
    textAlign: "center",
    marginBottom: 8,
  },
  progressText: {
    fontSize: 16,
    color: "#999",
    fontWeight: "600" as const,
  },
  buildArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lettersRow: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 40,
  },
  letterTile: {
    width: 110,
    height: 110,
    borderRadius: 20,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  letterTilePlaying: {
    borderWidth: 4,
    borderColor: "#FFFFFF",
    shadowColor: "#2196F3",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 10,
  },
  letterTileSuccess: {
    backgroundColor: "#4CAF50",
    borderWidth: 4,
    borderColor: "#FFFFFF",
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 12,
  },
  mergedTileSuccess: {
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
    top: 6,
    right: 6,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 16,
    padding: 4,
  },
  letterText: {
    fontSize: 48,
    fontWeight: "800" as const,
    color: "#FFFFFF",
  },
  mergedTile: {
    width: 150,
    height: 110,
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
  mergedText: {
    fontSize: 48,
    fontWeight: "800" as const,
    color: "#FFFFFF",
  },
  blendButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  blendButtonText: {
    fontSize: 28,
    fontWeight: "800" as const,
    color: "#FFFFFF",
  },
  completeContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  wordCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    padding: 50,
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
  completeWord: {
    fontSize: 64,
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
