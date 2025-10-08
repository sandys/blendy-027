import React, { useState, useMemo } from "react";
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

export default function WordTapperScreen() {
  const insets = useSafeAreaInsets();
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

  const circleAnims = useMemo(() => {
    const anims: Animated.Value[] = [];
    for (let i = 0; i < wordCount; i++) {
      anims.push(new Animated.Value(0));
    }
    return anims;
  }, [wordCount]);

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

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.progressText}>
          Exercise {exerciseIndex + 1} of {lesson?.exercises.length || 0}
        </Text>
        <Text style={styles.instructionText}>
          Tap a circle for each word you hear
        </Text>
      </View>

      <View style={styles.sentenceContainer}>
        <View style={styles.sentenceCard}>
          <Text style={styles.sentenceText}>{sentence}</Text>
          <TouchableOpacity
            style={styles.audioButton}
            onPress={() => speakText(sentence, { rate: 0.7 })}
            activeOpacity={0.7}
          >
            <Volume2 size={28} color="#4ECDC4" />
          </TouchableOpacity>
        </View>
      </View>

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
                  { transform: [{ scale }] },
                ]}
              >
                {isTapped && <Text style={styles.circleNumber}>{index + 1}</Text>}
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>
          Words tapped: {tapCount} / {wordCount}
        </Text>
      </View>

      {showSubmit && !showFeedback && (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Check Answer</Text>
        </TouchableOpacity>
      )}

      {showFeedback && (
        <View
          style={[
            styles.feedbackContainer,
            isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect,
          ]}
        >
          <Text style={styles.feedbackEmoji}>
            {isCorrect ? "🎉" : "🤔"}
          </Text>
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
    backgroundColor: "#F0F8FF",
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
    color: "#4ECDC4",
    textAlign: "center",
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: "#999",
    fontWeight: "600" as const,
    marginBottom: 12,
  },
  sentenceContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  sentenceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    minWidth: width * 0.7,
  },
  sentenceText: {
    fontSize: 28,
    fontWeight: "600" as const,
    color: "#333",
    textAlign: "center",
  },
  circlesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 20,
    marginBottom: 30,
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 5,
    borderColor: "#4ECDC4",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  circleFilled: {
    backgroundColor: "#4ECDC4",
  },
  circleNumber: {
    fontSize: 36,
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
  counterContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  counterText: {
    fontSize: 20,
    fontWeight: "600" as const,
    color: "#666",
  },
  submitButton: {
    backgroundColor: "#4ECDC4",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonText: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
  feedbackContainer: {
    padding: 30,
    borderRadius: 24,
    alignSelf: "center",
    marginTop: 20,
    alignItems: "center",
    minWidth: width * 0.6,
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
  audioButton: {
    marginTop: 20,
    padding: 12,
    borderRadius: 24,
    backgroundColor: "#E8F9F8",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
