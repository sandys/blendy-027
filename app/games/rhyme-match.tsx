import React, { useState } from "react";
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
import { SAMPLE_LESSONS } from "@/constants/curriculum-data";

const { width } = Dimensions.get("window");

export default function RhymeMatchScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const lessonNumber = parseInt(params.lesson as string);
  const exerciseIndex = parseInt(params.exercise as string);

  const lesson = SAMPLE_LESSONS.find((l) => l.lesson_number === lessonNumber);
  const exercise = lesson?.exercises[exerciseIndex];

  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [scaleAnims] = useState(
    [0, 1, 2].map(() => new Animated.Value(1))
  );

  if (!exercise || exercise.exercise_type !== "Rhyme Match") {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Exercise not found</Text>
      </View>
    );
  }

  const { target, choices } = exercise.data as {
    target: { word: string; image: string };
    choices: { word: string; image: string; isCorrect: boolean }[];
  };

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
        <Text style={styles.instructionText}>
          Which one rhymes with {target.word}?
        </Text>
        <Text style={styles.progressText}>
          Exercise {exerciseIndex + 1} of {lesson?.exercises.length || 0}
        </Text>
      </View>

      <View style={styles.targetContainer}>
        <View style={styles.targetCard}>
          <Text style={styles.targetEmoji}>{target.image}</Text>
          <Text style={styles.targetWord}>{target.word}</Text>
        </View>
      </View>

      <View style={styles.choicesContainer}>
        {choices.map((choice, index) => {
          const isSelected = selectedChoice === index;
          const isCorrect = choice.isCorrect;
          const showCorrect = isSelected && showFeedback && isCorrect;
          const showIncorrect = isSelected && showFeedback && !isCorrect;

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
                ]}
                onPress={() => handleChoiceTap(index)}
                disabled={showFeedback}
                activeOpacity={0.7}
              >
                <Text style={styles.choiceEmoji}>{choice.image}</Text>
                <Text style={styles.choiceWord}>{choice.word}</Text>
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
    fontSize: 16,
    color: "#999",
    fontWeight: "600" as const,
  },
  targetContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  targetCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    minWidth: width * 0.5,
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 16,
  },
  feedbackEmoji: {
    fontSize: 60,
    marginBottom: 8,
  },
  feedbackText: {
    fontSize: 28,
    fontWeight: "700" as const,
    color: "#333",
  },
  errorText: {
    fontSize: 18,
    color: "#F44336",
    textAlign: "center",
  },
});
