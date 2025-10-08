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
import { SAMPLE_LESSONS } from "@/constants/curriculum-data";

const { width } = Dimensions.get("window");

export default function SyllableSquishScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const lessonNumber = parseInt(params.lesson as string);
  const exerciseIndex = parseInt(params.exercise as string);

  const lesson = SAMPLE_LESSONS.find((l) => l.lesson_number === lessonNumber);
  const exercise = lesson?.exercises[exerciseIndex];

  const exerciseData = exercise?.data as
    | { word: string; image: string; syllableCount: number }
    | undefined;
  const word = exerciseData?.word || "";
  const image = exerciseData?.image || "";
  const syllableCount = exerciseData?.syllableCount || 0;

  const [tapCount, setTapCount] = useState<number>(0);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const buttonScale = useMemo(() => new Animated.Value(1), []);
  const progressAnims = useMemo(() => {
    const anims: Animated.Value[] = [];
    for (let i = 0; i < syllableCount; i++) {
      anims.push(new Animated.Value(0));
    }
    return anims;
  }, [syllableCount]);

  if (!exercise || exercise.exercise_type !== "Syllable Squish") {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Exercise not found</Text>
      </View>
    );
  }

  const handleSquishTap = () => {
    if (showFeedback) return;

    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }

    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.85,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(buttonScale, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    const newCount = tapCount + 1;
    setTapCount(newCount);

    if (newCount <= syllableCount) {
      Animated.spring(progressAnims[newCount - 1], {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
    }

    if (newCount === syllableCount) {
      setIsCorrect(true);
      setShowFeedback(true);

      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      setTimeout(() => {
        const nextExerciseIndex = exerciseIndex + 1;
        if (lesson && nextExerciseIndex < lesson.exercises.length) {
          router.replace({
            pathname: "/games/syllable-squish",
            params: { lesson: lessonNumber, exercise: nextExerciseIndex },
          });
        } else {
          router.back();
        }
      }, 2500);
    } else if (newCount > syllableCount) {
      setIsCorrect(false);
      setShowFeedback(true);

      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }

      setTimeout(() => {
        setTapCount(0);
        setShowFeedback(false);
        progressAnims.forEach((anim) => anim.setValue(0));
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
          Tap the button for each syllable
        </Text>
      </View>

      <View style={styles.wordContainer}>
        <View style={styles.wordCard}>
          <Text style={styles.wordEmoji}>{image}</Text>
          <Text style={styles.wordText}>{word}</Text>
        </View>
      </View>

      <View style={styles.progressBarContainer}>
        {Array.from({ length: syllableCount }).map((_, index) => {
          const scale = progressAnims[index]
            ? progressAnims[index].interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 1],
              })
            : 0.3;

          const opacity = progressAnims[index]
            ? progressAnims[index].interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 1],
              })
            : 0.3;

          return (
            <Animated.View
              key={index}
              style={[
                styles.progressSegment,
                {
                  transform: [{ scale }],
                  opacity,
                },
              ]}
            />
          );
        })}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSquishTap}
          disabled={showFeedback}
          activeOpacity={0.9}
        >
          <Animated.View
            style={[
              styles.squishButton,
              {
                transform: [{ scale: buttonScale }],
              },
            ]}
          >
            <Text style={styles.squishButtonText}>SQUISH!</Text>
            <Text style={styles.squishButtonEmoji}>👆</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>

      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>
          Taps: {tapCount} / {syllableCount}
        </Text>
      </View>

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
            {isCorrect ? "Perfect!" : "Oops! Try again!"}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9E6",
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
    color: "#FFB84D",
    textAlign: "center",
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: "#999",
    fontWeight: "600" as const,
    marginBottom: 12,
  },
  wordContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  wordCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    minWidth: width * 0.6,
  },
  wordEmoji: {
    fontSize: 80,
    marginBottom: 10,
  },
  wordText: {
    fontSize: 36,
    fontWeight: "700" as const,
    color: "#333",
  },
  progressBarContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  progressSegment: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFB84D",
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  squishButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#FFB84D",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 8,
    borderColor: "#FFA726",
  },
  squishButtonText: {
    fontSize: 32,
    fontWeight: "900" as const,
    color: "#FFFFFF",
    marginBottom: 8,
  },
  squishButtonEmoji: {
    fontSize: 48,
  },
  counterContainer: {
    alignItems: "center",
  },
  counterText: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: "#666",
  },
  feedbackContainer: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    padding: 30,
    borderRadius: 24,
    alignItems: "center",
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
