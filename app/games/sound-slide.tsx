import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
  PanResponder,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { SAMPLE_LESSONS } from "@/constants/curriculum-data";

const { width, height } = Dimensions.get("window");

export default function SoundSlideScreen() {
  const insets = useSafeAreaInsets();
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

  const onsetPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const onsetScale = useRef(new Animated.Value(1)).current;
  const rimeScale = useRef(new Animated.Value(1)).current;
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
        const targetY = height * 0.45;
        const distance = Math.sqrt(
          Math.pow(gestureState.moveX - targetX, 2) +
            Math.pow(gestureState.moveY - targetY, 2)
        );

        if (distance < 100) {
          if (Platform.OS !== "web") {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }

          Animated.parallel([
            Animated.spring(onsetPosition, {
              toValue: { x: width * 0.15, y: 0 },
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
            setStage("merged");
            setShowFeedback(true);

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
            }, 2500);
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

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.instructionText}>
          Drag the sounds together to make a word!
        </Text>
        <Text style={styles.progressText}>
          Exercise {exerciseIndex + 1} of {lesson?.exercises.length || 0}
        </Text>
      </View>

      <View style={styles.gameArea}>
        {stage === "initial" && (
          <>
            <Animated.View
              style={[
                styles.onsetTile,
                {
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
            </Animated.View>

            <Animated.View
              style={[
                styles.rimeTile,
                {
                  transform: [{ scale: rimeScale }],
                },
              ]}
            >
              <Text style={styles.tileText}>{exerciseData?.rime}</Text>
            </Animated.View>

            <View style={styles.guideContainer}>
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
    padding: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
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
    left: width * 0.15,
    top: height * 0.35,
    width: 120,
    height: 120,
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
    right: width * 0.15,
    top: height * 0.35,
    width: 120,
    height: 120,
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
  tileText: {
    fontSize: 48,
    fontWeight: "800" as const,
    color: "#FFFFFF",
  },
  guideContainer: {
    position: "absolute",
    top: height * 0.25,
    left: width * 0.15,
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
    bottom: 100,
    alignSelf: "center",
    backgroundColor: "#E8F5E9",
    padding: 30,
    borderRadius: 24,
    alignItems: "center",
    minWidth: width * 0.6,
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
