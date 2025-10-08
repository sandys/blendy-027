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

export default function SoundDetectiveScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const lessonNumber = parseInt(params.lesson as string);
  const exerciseIndex = parseInt(params.exercise as string);

  const lesson = SAMPLE_LESSONS.find((l) => l.lesson_number === lessonNumber);
  const exercise = lesson?.exercises[exerciseIndex];

  const exerciseData = exercise?.data as
    | {
        word: string;
        image: string;
        targetPosition: "first" | "middle" | "last";
        correctSound: string;
        choices: string[];
      }
    | undefined;

  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const scaleAnims = React.useRef(
    exerciseData?.choices.map(() => new Animated.Value(1)) || []
  ).current;

  if (!exercise || exercise.exercise_type !== "Sound Detective") {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Exercise not found</Text>
      </View>
    );
  }

  const handleChoicePress = (choice: string, index: number) => {
    if (showFeedback) return;

    setSelectedChoice(choice);
    const correct = choice === exerciseData?.correctSound;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      Animated.sequence([
        Animated.spring(scaleAnims[index], {
          toValue: 1.3,
          useNativeDriver: true,
          friction: 3,
        }),
        Animated.spring(scaleAnims[index], {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();

      setTimeout(() => {
        const nextExerciseIndex = exerciseIndex + 1;
        if (lesson && nextExerciseIndex < lesson.exercises.length) {
          router.replace({
            pathname: "/games/sound-detective",
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

      Animated.sequence([
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
      ]).start();

      setTimeout(() => {
        setShowFeedback(false);
        setSelectedChoice(null);
      }, 2000);
    }
  };

  const getPositionText = () => {
    switch (exerciseData?.targetPosition) {
      case "first":
        return "first";
      case "middle":
        return "middle";
      case "last":
        return "last";
      default:
        return "";
    }
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.instructionText}>
          What is the {getPositionText()} sound?
        </Text>
        <Text style={styles.progressText}>
          Exercise {exerciseIndex + 1} of {lesson?.exercises.length || 0}
        </Text>
      </View>

      <View style={styles.wordContainer}>
        <Text style={styles.wordEmoji}>{exerciseData?.image}</Text>
        <Text style={styles.wordText}>{exerciseData?.word}</Text>
      </View>

      <View style={styles.choicesContainer}>
        {exerciseData?.choices.map((choice, index) => {
          const isSelected = selectedChoice === choice;
          const isCorrectChoice = choice === exerciseData?.correctSound;
          const showCorrect = showFeedback && isCorrectChoice;
          const showIncorrect = showFeedback && isSelected && !isCorrect;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChoicePress(choice, index)}
              disabled={showFeedback}
              activeOpacity={0.7}
            >
              <Animated.View
                style={[
                  styles.choiceButton,
                  showCorrect && styles.choiceButtonCorrect,
                  showIncorrect && styles.choiceButtonIncorrect,
                  {
                    transform: [{ scale: scaleAnims[index] }],
                  },
                ]}
              >
                <Text
                  style={[
                    styles.choiceText,
                    (showCorrect || showIncorrect) && styles.choiceTextSelected,
                  ]}
                >
                  {choice}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>

      {showFeedback && (
        <View
          style={[
            styles.feedbackContainer,
            isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect,
          ]}
        >
          <Text style={styles.feedbackEmoji}>{isCorrect ? "🎉" : "🤔"}</Text>
          <Text style={styles.feedbackText}>
            {isCorrect ? "Perfect!" : "Try again!"}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    padding: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: "center",
  },
  instructionText: {
    fontSize: 26,
    fontWeight: "700" as const,
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 8,
  },
  progressText: {
    fontSize: 16,
    color: "#999",
    fontWeight: "600" as const,
  },
  wordContainer: {
    alignItems: "center",
    marginBottom: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    padding: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  wordEmoji: {
    fontSize: 100,
    marginBottom: 20,
  },
  wordText: {
    fontSize: 48,
    fontWeight: "800" as const,
    color: "#1A1A1A",
  },
  choicesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 20,
    marginBottom: 40,
  },
  choiceButton: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#4CAF50",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  choiceButtonCorrect: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  choiceButtonIncorrect: {
    backgroundColor: "#F44336",
    borderColor: "#F44336",
  },
  choiceText: {
    fontSize: 40,
    fontWeight: "800" as const,
    color: "#4CAF50",
  },
  choiceTextSelected: {
    color: "#FFFFFF",
  },
  feedbackContainer: {
    padding: 30,
    borderRadius: 24,
    alignSelf: "center",
    alignItems: "center",
    minWidth: width * 0.6,
    position: "absolute",
    bottom: 80,
  },
  feedbackCorrect: {
    backgroundColor: "#E8F5E9",
  },
  feedbackIncorrect: {
    backgroundColor: "#FFEBEE",
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
});
