import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
  Platform,
  Easing,
  findNodeHandle,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { Volume2 } from "lucide-react-native";
import { SAMPLE_LESSONS } from "@/constants/curriculum-data";
import { speakText } from "@/utils/audio";
import type { SoundSearchData } from "@/types/curriculum";

type FloatingBubbleState = {
  label: string;
  anim: Animated.Value;
  from: { x: number; y: number; width: number; height: number };
  to: { x: number; y: number };
};

export default function SoundSearchScreen() {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const params = useLocalSearchParams();
  const lessonNumber = parseInt(params.lesson as string);
  const exerciseIndex = parseInt(params.exercise as string);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [revealedWord, setRevealedWord] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<View>(null);
  const blankRef = useRef<View>(null);
  const choiceRefs = useRef<(TouchableOpacity | null)[]>([]);
  const [floatingChoiceIndex, setFloatingChoiceIndex] = useState<number | null>(null);
  const [floatingBubble, setFloatingBubble] = useState<FloatingBubbleState | null>(null);

  const lesson = SAMPLE_LESSONS.find((l) => l.lesson_number === lessonNumber);
  const exercise = lesson?.exercises[exerciseIndex];
  const exerciseData: SoundSearchData | null =
    exercise?.exercise_type === "Sound Search"
      ? (exercise.data as SoundSearchData)
      : null;

  const shakeRefs = useRef<Animated.Value[]>([]);
  if (exerciseData) {
    if (shakeRefs.current.length !== exerciseData.choices.length) {
      shakeRefs.current = exerciseData.choices.map(() => new Animated.Value(0));
    }
  } else if (shakeRefs.current.length) {
    shakeRefs.current = [];
  }
  const animatedShake = shakeRefs.current;

  useEffect(() => {
    return () => {
      if (transitionTimeout.current) {
        clearTimeout(transitionTimeout.current);
        transitionTimeout.current = null;
      }
      animatedShake.forEach((anim) => anim.stopAnimation());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setActiveIndex(null);
    setRevealedWord(null);
    setIsTransitioning(false);
    setFloatingChoiceIndex(null);
    setFloatingBubble(null);

    if (transitionTimeout.current) {
      clearTimeout(transitionTimeout.current);
      transitionTimeout.current = null;
    }

    animatedShake.forEach((value) => value.setValue(0));
    choiceRefs.current = [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exerciseIndex, lessonNumber]);

  const wordDisplay = useMemo(() => {
    if (!exerciseData) {
      return "";
    }

    return revealedWord ?? exerciseData.wordWithBlank;
  }, [exerciseData, revealedWord]);

  const shakeInterpolation = (value: Animated.Value) =>
    value.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [-8, 0, 8],
    });

  const handleChoicePress = (index: number) => {
    if (!exerciseData || isTransitioning) {
      return;
    }

    const choice = exerciseData.choices[index];
    setActiveIndex(index);

    if (choice.isCorrect) {
      setIsTransitioning(true);
      setFloatingChoiceIndex(index);
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      const finishReveal = () => {
        setFloatingBubble(null);
        setFloatingChoiceIndex(null);
        setRevealedWord(exerciseData.word);
      };

      const containerNode = containerRef.current;
      const bubbleNode = choiceRefs.current[index];
      const blankNode = blankRef.current;
      let containerHandle: number | null = null;
      if (containerNode) {
        try {
          containerHandle = findNodeHandle(containerNode);
        } catch (error) {
          console.warn("[SoundSearch] Unable to measure container", error);
          containerHandle = null;
        }
      }

      if (
        containerHandle &&
        bubbleNode &&
        typeof bubbleNode.measureLayout === "function" &&
        blankNode &&
        typeof blankNode.measureLayout === "function"
      ) {
        bubbleNode.measureLayout(containerHandle, (choiceX, choiceY, choiceWidth, choiceHeight) => {
          blankNode.measureLayout(
            containerHandle,
            (blankX, blankY, blankWidth, blankHeight) => {
              const anim = new Animated.Value(0);
              const targetX = blankX + (blankWidth - choiceWidth) / 2;
              const targetY = blankY + (blankHeight - choiceHeight) / 2;
              setFloatingBubble({
                label: choice.label,
                anim,
                from: { x: choiceX, y: choiceY, width: choiceWidth, height: choiceHeight },
                to: { x: targetX, y: targetY },
              });
              Animated.timing(anim, {
                toValue: 1,
                duration: 450,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: false,
              }).start(finishReveal);
            },
            finishReveal
          );
        }, finishReveal);
      } else {
        finishReveal();
      }

      speakText(exerciseData.word, { rate: 0.8 });

      transitionTimeout.current = setTimeout(() => {
        const nextExerciseIndex = exerciseIndex + 1;
        if (lesson && nextExerciseIndex < lesson.exercises.length) {
          router.replace({
            pathname: "/games/sound-search",
            params: { lesson: lessonNumber, exercise: nextExerciseIndex },
          });
        } else {
          router.back();
        }
        transitionTimeout.current = null;
      }, 1600);
    } else {
      const shakeValue = animatedShake[index];
      if (!shakeValue) {
        setActiveIndex(null);
        return;
      }
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
      Animated.sequence([
        Animated.timing(shakeValue, {
          toValue: 1,
          duration: 80,
          useNativeDriver: false,
        }),
        Animated.timing(shakeValue, {
          toValue: -1,
          duration: 80,
          useNativeDriver: false,
        }),
        Animated.timing(shakeValue, {
          toValue: 0,
          duration: 80,
          useNativeDriver: false,
        }),
      ]).start(() => setActiveIndex(null));
    }
  };

  if (!exerciseData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Exercise not found</Text>
      </View>
    );
  }

  const maxContentWidth = Math.min(1024, width * 0.94);
  const containerPaddingH = Math.max(16, width * 0.04);
  const containerPaddingV = Math.max(24, height * 0.04);
  const cardPaddingHorizontal = Math.max(16, maxContentWidth * (isLandscape ? 0.035 : 0.06));
  const cardPaddingVertical = Math.max(20, height * (isLandscape ? 0.08 : 0.05));
  const badgeSize = Math.max(96, Math.min(Math.min(width, height) * (isLandscape ? 0.23 : 0.3), 220));
  const bubbleSize = Math.max(72, Math.min(Math.min(width, height) * (isLandscape ? 0.16 : 0.22), 180));
  const wordFontSize = Math.max(32, Math.min(width * 0.05, 62));
  const promptFontSize = Math.max(16, Math.min(width * 0.022, 26));
  const blankPaddingHorizontal = Math.max(18, width * 0.02);
  const blankPaddingVertical = Math.max(6, height * 0.012);
  const choiceLabelFont = Math.max(28, bubbleSize * 0.38);
  const audioButtonSize = Math.max(40, Math.min(64, bubbleSize * 0.35));
  const columnSpacing = Math.max(24, width * (isLandscape ? 0.02 : 0.05));

  const floatingBubbleStyle =
    floatingBubble && {
      transform: [
        {
          translateX: floatingBubble.anim.interpolate({
            inputRange: [0, 1],
            outputRange: [floatingBubble.from.x, floatingBubble.to.x],
          }),
        },
        {
          translateY: floatingBubble.anim.interpolate({
            inputRange: [0, 1],
            outputRange: [floatingBubble.from.y, floatingBubble.to.y],
          }),
        },
        {
          scale: floatingBubble.anim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.05],
          }),
        },
      ],
    };

  return (
    <View
      ref={containerRef}
      style={[
        styles.container,
        {
          paddingTop: insets.top + containerPaddingV,
          paddingBottom: Math.max(insets.bottom + 12, containerPaddingV),
          paddingHorizontal: containerPaddingH,
        },
      ]}
    >
      <View
        style={[
          styles.gameCard,
          {
            flexDirection: isLandscape ? "row" : "column",
            paddingHorizontal: cardPaddingHorizontal,
            paddingVertical: cardPaddingVertical,
            maxWidth: maxContentWidth,
            width: "100%",
            gap: isLandscape ? columnSpacing : undefined,
          },
        ]}
      >
        <View
          style={[
            styles.visualColumn,
            {
              flex: isLandscape ? 1 : undefined,
              marginBottom: isLandscape ? 0 : columnSpacing,
              alignSelf: "stretch",
            },
          ]}
        >
          <View
            style={[
              styles.imageBadge,
              {
                width: badgeSize,
                height: badgeSize,
                borderRadius: badgeSize / 2,
                marginBottom: Math.max(20, height * 0.03),
              },
            ]}
          >
            <Text style={[styles.imageEmoji, { fontSize: Math.min(badgeSize * 0.55, 96) }]}>
              {exerciseData.image}
            </Text>
          </View>
          <View
            style={[
              styles.wordCard,
              {
                paddingHorizontal: Math.max(16, width * 0.03),
                paddingVertical: Math.max(16, height * 0.025),
                maxWidth: isLandscape ? width * 0.32 : width * 0.78,
                alignSelf: "stretch",
              },
            ]}
          >
            <Text style={[styles.wordPrompt, { fontSize: promptFontSize }]}>
              {exerciseData.prompt || "Which sound completes the word?"}
            </Text>
            <View style={styles.wordDisplayRow}>
              <View
                ref={blankRef}
                style={[
                  styles.wordBlankBox,
                  {
                    paddingHorizontal: blankPaddingHorizontal,
                    paddingVertical: blankPaddingVertical,
                    minWidth: Math.max(bubbleSize * 0.9, 120),
                  },
                ]}
              >
                <Text style={[styles.wordBlank, { fontSize: wordFontSize }]}>{wordDisplay}</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.audioButton,
                  {
                    padding: audioButtonSize * 0.4,
                    borderRadius: audioButtonSize,
                  },
                ]}
                onPress={() => speakText(revealedWord ?? exerciseData.word)}
                activeOpacity={0.7}
              >
                <Volume2 size={Math.min(audioButtonSize * 0.6, 28)} color="#5C6B73" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.choicesColumn,
            {
              flex: isLandscape ? 1 : 1.1,
              marginTop: isLandscape ? 0 : 8,
            },
          ]}
        >
          <Text style={[styles.choicePrompt, { fontSize: promptFontSize }]}>Tap the correct digraph</Text>
          <View
            style={[
              styles.choiceRow,
              {
                flexDirection: isLandscape ? "row" : "column",
                justifyContent: isLandscape ? "space-between" : "flex-start",
                gap: isLandscape ? columnSpacing : Math.max(18, height * 0.02),
              },
            ]}
          >
            {exerciseData.choices.map((choice, index) => (
              <Animated.View
                key={choice.label}
                style={[
                  styles.choiceWrapper,
                  {
                    transform: [{ translateX: shakeInterpolation(animatedShake[index]) }],
                    marginBottom: isLandscape ? 0 : Math.max(12, height * 0.015),
                  },
                ]}
              >
                <TouchableOpacity
                  accessibilityRole="button"
                  activeOpacity={0.85}
                  onPress={() => handleChoicePress(index)}
                  ref={(node) => {
                    choiceRefs.current[index] = node;
                  }}
                  style={[
                    styles.choiceBubble,
                    {
                      width: bubbleSize,
                      height: bubbleSize,
                      borderRadius: bubbleSize / 2,
                    },
                    activeIndex === index && choice.isCorrect && styles.choiceBubbleActive,
                    floatingChoiceIndex === index && { opacity: 0 },
                  ]}
                >
                  <Text style={[styles.choiceLabel, { fontSize: choiceLabelFont }]}>{choice.label}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>
      </View>
      {floatingBubble && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.floatingBubble,
            {
              width: floatingBubble.from.width,
              height: floatingBubble.from.height,
              borderRadius: floatingBubble.from.width / 2,
            },
            floatingBubbleStyle,
          ]}
        >
          <Text
            style={[
              styles.choiceLabel,
              { fontSize: Math.max(24, floatingBubble.from.width * 0.36), color: "#1A1A2E" },
            ]}
          >
            {floatingBubble.label}
          </Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
    alignItems: "center",
    justifyContent: "center",
  },
  gameCard: {
    borderRadius: 32,
    backgroundColor: "#FFFFFF",
    shadowColor: "#121212",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 28,
    elevation: 12,
  },
  visualColumn: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageBadge: {
    backgroundColor: "#E0F2F1",
    alignItems: "center",
    justifyContent: "center",
  },
  imageEmoji: {
    fontSize: 88,
  },
  wordCard: {
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#E3E8EE",
    backgroundColor: "#F8FBFF",
  },
  wordPrompt: {
    fontWeight: "600",
    color: "#5C6B73",
    textAlign: "center",
    marginBottom: 12,
  },
  wordDisplayRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  wordBlankBox: {
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E0E7FF",
    justifyContent: "center",
    alignItems: "center",
  },
  wordBlank: {
    fontWeight: "800",
    color: "#1A1A2E",
    letterSpacing: 4,
  },
  audioButton: {
    marginLeft: 16,
    backgroundColor: "#E9F2FE",
  },
  choicesColumn: {
    justifyContent: "center",
  },
  choicePrompt: {
    fontWeight: "600",
    textAlign: "center",
    color: "#1A1A2E",
    marginBottom: 20,
  },
  choiceRow: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  choiceWrapper: {
    alignItems: "center",
  },
  choiceBubble: {
    backgroundColor: "#D7E8FA",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#16213E",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 8,
  },
  choiceBubbleActive: {
    backgroundColor: "#A5D6A7",
  },
  choiceLabel: {
    fontWeight: "800",
    color: "#1A1A2E",
  },
  errorText: {
    fontSize: 18,
    color: "#1A1A2E",
  },
  floatingBubble: {
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A5D6A7",
    shadowColor: "#16213E",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 10,
  },
});
