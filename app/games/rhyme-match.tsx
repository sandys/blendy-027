import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { Volume2 } from "lucide-react-native";
import { SAMPLE_LESSONS } from "@/constants/curriculum-data";
import { speakText } from "@/utils/audio";

const { width } = Dimensions.get("window");

export default function RhymeMatchScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const lessonNumber = parseInt(params.lesson as string);
  const exerciseIndex = parseInt(params.exercise as string);

  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [playingAudioIndex, setPlayingAudioIndex] = useState<number | null>(null);
  const [hasPlayedIntro, setHasPlayedIntro] = useState<boolean>(false);
  const [scaleAnims] = useState(
    [0, 1, 2].map(() => new Animated.Value(1))
  );
  const pulseAnims = useRef([0, 1, 2].map(() => new Animated.Value(1))).current;

  const lesson = SAMPLE_LESSONS.find((l) => l.lesson_number === lessonNumber);
  const exercise = lesson?.exercises[exerciseIndex];

  const exerciseData = exercise?.exercise_type === "Rhyme Match" ? exercise.data as {
    target: { word: string; image: string };
    choices: { word: string; image: string; isCorrect: boolean }[];
  } : null;

  useEffect(() => {
    if (!exerciseData) return;

    const playIntroSequence = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      await speakText(exerciseData.target.word);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      for (let i = 0; i < exerciseData.choices.length; i++) {
        setPlayingAudioIndex(i);
        
        Animated.sequence([
          Animated.timing(pulseAnims[i], {
            toValue: 1.15,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnims[i], {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
        
        await speakText(exerciseData.choices[i].word);
        await new Promise(resolve => setTimeout(resolve, 600));
      }
      
      setPlayingAudioIndex(null);
      setHasPlayedIntro(true);
    };

    setHasPlayedIntro(false);
    playIntroSequence();
  }, [exerciseIndex, exerciseData, pulseAnims]);

  if (!exerciseData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Exercise not found</Text>
      </View>
    );
  }

  const { target, choices } = exerciseData;

  const handleChoiceTap = (index: number) => {
    if (showFeedback) return;

    setSelectedChoice(index);
    setShowFeedback(true);

    const isCorrect = choices[index].isCorrect;

    if (isCorrect) {
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      Animated.sequence([
        Animated.timing(scaleAnims[index], {
          toValue: 1.3,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnims[index], {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      setTimeout(() => {
        const nextExerciseIndex = exerciseIndex + 1;
        if (lesson && nextExerciseIndex < lesson.exercises.length) {
          router.replace({
            pathname: "/games/rhyme-match",
            params: { lesson: lessonNumber, exercise: nextExerciseIndex },
          });
        } else {
          router.back();
        }
      }, 2000);
    } else {
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }

      Animated.sequence([
        Animated.timing(scaleAnims[index], {
          toValue: 0.9,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnims[index], {
          toValue: 1.05,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnims[index], {
          toValue: 0.9,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnims[index], {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(() => {
          setShowFeedback(false);
          setSelectedChoice(null);
        }, 1000);
      });
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <Text style={styles.progressText}>
          Exercise {exerciseIndex + 1} of {lesson?.exercises.length || 0}
        </Text>
        <Text style={styles.instructionText}>
          Which one rhymes with {target.word}?
        </Text>
      </View>

      <TouchableOpacity 
        style={styles.targetContainer}
        onPress={() => speakText(target.word)}
        activeOpacity={0.8}
      >
        <View style={styles.targetCard}>
          <Text style={styles.targetEmoji}>{target.image}</Text>
          <Text style={styles.targetWord}>{target.word}</Text>
          <View style={styles.audioIndicator}>
            <Volume2 size={28} color="#FF6B9D" />
            <Text style={styles.audioHint}>Tap to hear</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.choicesContainer}>
        {choices.map((choice, index) => {
          const isSelected = selectedChoice === index;
          const isCorrect = choice.isCorrect;
          const showCorrect = isSelected && showFeedback && isCorrect;
          const showIncorrect = isSelected && showFeedback && !isCorrect;
          const isPlayingAudio = playingAudioIndex === index;

          return (
            <Animated.View
              key={index}
              style={[
                styles.choiceWrapper,
                { transform: [{ scale: scaleAnims[index] }] },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.choiceCard,
                  showCorrect && styles.choiceCardCorrect,
                  showIncorrect && styles.choiceCardIncorrect,
                  isPlayingAudio && styles.choiceCardPlaying,
                ]}
                onPress={() => handleChoiceTap(index)}
                disabled={showFeedback || !hasPlayedIntro}
                activeOpacity={0.7}
              >
                <Animated.View style={{ transform: [{ scale: pulseAnims[index] }] }}>
                  <Text style={styles.choiceEmoji}>{choice.image}</Text>
                </Animated.View>
                <Text style={styles.choiceWord}>{choice.word}</Text>
                {isPlayingAudio && (
                  <View style={styles.playingIndicator}>
                    <Volume2 size={24} color="#FF6B9D" />
                  </View>
                )}
                {showCorrect && (
                  <View style={styles.feedbackOverlay}>
                    <Text style={styles.feedbackEmoji}>✨</Text>
                    <Text style={styles.feedbackText}>Great!</Text>
                  </View>
                )}
                {showIncorrect && (
                  <View style={styles.feedbackOverlay}>
                    <Text style={styles.feedbackEmoji}>🤔</Text>
                    <Text style={styles.feedbackText}>Try again!</Text>
                  </View>
                )}
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>

      {!hasPlayedIntro && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>🎵 Listen carefully...</Text>
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5F7",
    padding: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: "center",
  },
  instructionText: {
    fontSize: 28,
    fontWeight: "700" as const,
    color: "#FF6B9D",
    textAlign: "center",
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: "#999",
    fontWeight: "600" as const,
    marginBottom: 12,
  },
  targetContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  targetCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    minWidth: width * 0.6,
    borderWidth: 3,
    borderColor: "#FF6B9D",
  },
  targetEmoji: {
    fontSize: 80,
    marginBottom: 10,
  },
  targetWord: {
    fontSize: 32,
    fontWeight: "700" as const,
    color: "#333",
  },
  choicesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: 15,
  },
  choiceWrapper: {
    width: (width - 60) / 3,
  },
  choiceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 3,
    borderColor: "transparent",
  },
  choiceCardCorrect: {
    borderColor: "#4CAF50",
    backgroundColor: "#E8F5E9",
  },
  choiceCardIncorrect: {
    borderColor: "#F44336",
    backgroundColor: "#FFEBEE",
  },
  choiceEmoji: {
    fontSize: 60,
    marginBottom: 8,
  },
  choiceWord: {
    fontSize: 24,
    fontWeight: "600" as const,
    color: "#333",
  },
  feedbackOverlay: {
    position: "absolute",
    top: -10,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  feedbackEmoji: {
    fontSize: 48,
    marginBottom: 4,
  },
  feedbackText: {
    fontSize: 22,
    fontWeight: "800" as const,
    color: "#333",
  },
  errorText: {
    fontSize: 18,
    color: "#F44336",
    textAlign: "center",
  },
  audioIndicator: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#FFF5F7",
  },
  audioHint: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#FF6B9D",
  },
  playingIndicator: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#FFF5F7",
    borderRadius: 20,
    padding: 8,
  },
  choiceCardPlaying: {
    borderColor: "#FF6B9D",
    borderWidth: 4,
    backgroundColor: "#FFF5F7",
  },
  loadingOverlay: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: "rgba(255, 107, 157, 0.95)",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  loadingText: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
});
