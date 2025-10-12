import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  useWindowDimensions,
  Platform,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { SAMPLE_LESSONS } from "@/constants/curriculum-data";
import { speakText } from "@/utils/audio";
import { Volume2, CheckCircle } from "lucide-react-native";

type BuildStage = "initial" | "first-blend" | "final-blend" | "complete";

interface DraggableLetter {
  id: string;
  letter: string;
  position: Animated.ValueXY;
  isInDropZone: boolean;
  scale: Animated.Value;
}

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
  const [playingLetterIndex, setPlayingLetterIndex] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [draggableLetters, setDraggableLetters] = useState<DraggableLetter[]>([]);
  const [blendedText, setBlendedText] = useState<string>("");
  const audioLoopRef = useRef<boolean>(true);
  const isCorrectAnswerGiven = useRef<boolean>(false);
  const dropZoneLayout = useRef<{ x: number; y: number; width: number; height: number } | null>(null);
  const letterLayoutsRef = useRef<Map<number, { x: number; y: number; width: number; height: number }>>(new Map());
  const flashAnim = useRef(new Animated.Value(0)).current;

  const isLandscape = width > height;
  const tileSize = isLandscape ? Math.min(width * 0.12, 90) : Math.min(width * 0.2, 110);
  const dropZoneWidth = isLandscape ? width * 0.4 : width * 0.7;
  const dropZoneHeight = tileSize + 40;
  const wordCardPadding = isLandscape ? 30 : 50;

  useEffect(() => {
    if (!exerciseData) return;

    const letters: DraggableLetter[] = exerciseData.letters.map((letter, index) => ({
      id: `letter-${index}`,
      letter,
      position: new Animated.ValueXY({ x: 0, y: 0 }),
      isInDropZone: false,
      scale: new Animated.Value(1),
    }));

    setDraggableLetters(letters);
  }, [exerciseData]);

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

      await new Promise((resolve) => setTimeout(resolve, 500));
    };

    const playAudioLoop = async () => {
      await playInitialFeedback();

      while (audioLoopRef.current && !isCorrectAnswerGiven.current && stage === "initial") {
        for (let i = 0; i < exerciseData.letters.length; i++) {
          if (!audioLoopRef.current || isCorrectAnswerGiven.current) break;

          setPlayingLetterIndex(i);
          await speakText(exerciseData.letters[i], { usePhoneme: true });
          await new Promise((resolve) => setTimeout(resolve, 600));
        }

        setPlayingLetterIndex(null);
        await new Promise((resolve) => setTimeout(resolve, 1500));
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

  const createPanResponder = (letterIndex: number) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        if (Platform.OS !== "web") {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        Animated.spring(draggableLetters[letterIndex].scale, {
          toValue: 1.1,
          useNativeDriver: true,
          friction: 3,
        }).start();
      },
      onPanResponderMove: (_, gesture) => {
        draggableLetters[letterIndex].position.setValue({
          x: gesture.dx,
          y: gesture.dy,
        });
      },
      onPanResponderRelease: (evt, gesture) => {
        Animated.spring(draggableLetters[letterIndex].scale, {
          toValue: 1,
          useNativeDriver: true,
          friction: 3,
        }).start();

        if (!dropZoneLayout.current) {
          Animated.spring(draggableLetters[letterIndex].position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
            friction: 5,
          }).start();
          return;
        }

        const letterLayout = letterLayoutsRef.current.get(letterIndex);
        if (!letterLayout) {
          Animated.spring(draggableLetters[letterIndex].position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
            friction: 5,
          }).start();
          return;
        }

        const dropZone = dropZoneLayout.current;
        const letterCenterX = letterLayout.x + letterLayout.width / 2 + gesture.dx;
        const letterCenterY = letterLayout.y + letterLayout.height / 2 + gesture.dy;

        const isInDropZone =
          letterCenterX >= dropZone.x &&
          letterCenterX <= dropZone.x + dropZone.width &&
          letterCenterY >= dropZone.y &&
          letterCenterY <= dropZone.y + dropZone.height;

        if (isInDropZone) {
          if (Platform.OS !== "web") {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }

          const updatedLetters = [...draggableLetters];
          updatedLetters[letterIndex].isInDropZone = true;
          setDraggableLetters(updatedLetters);

          Animated.spring(draggableLetters[letterIndex].position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
            friction: 5,
          }).start();

          checkBlendCompletion(updatedLetters);
        } else {
          Animated.spring(draggableLetters[letterIndex].position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
            friction: 5,
          }).start();
        }
      },
    });
  };

  const checkBlendCompletion = async (letters: DraggableLetter[]) => {
    const allInDropZone = letters.every((l) => l.isInDropZone);

    if (!allInDropZone) {
      const inDropZone = letters.filter((l) => l.isInDropZone);
      if (inDropZone.length > 0) {
        const partialBlend = inDropZone.map((l) => l.letter).join("");
        setBlendedText(partialBlend);
        audioLoopRef.current = false;
        setPlayingLetterIndex(null);
        await speakText(partialBlend, { usePhoneme: false, rate: 0.7 });
      }
      return;
    }

    isCorrectAnswerGiven.current = true;
    audioLoopRef.current = false;
    setPlayingLetterIndex(null);
    setShowSuccess(true);

    const fullWord = exerciseData?.word || "";
    setBlendedText(fullWord);

    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    await speakText(fullWord, { usePhoneme: false, rate: 0.7 });

    setTimeout(() => {
      setStage("complete");

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
    }, 1000);
  };

  const getInstructionText = () => {
    switch (stage) {
      case "initial":
        return "Drag the letters into the box to blend them";
      case "complete":
        return "You built the word!";
      default:
        return "";
    }
  };

  const flashColor = flashAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(33, 150, 243, 0)", "rgba(33, 150, 243, 0.3)"],
  });

  return (
    <View
      style={[
        styles.container,
        {
          paddingLeft: insets.left,
          paddingRight: insets.right,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <Animated.View style={[styles.flashOverlay, { backgroundColor: flashColor }]} pointerEvents="none" />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.progressText, { fontSize: isLandscape ? 14 : 16 }]}>
            Exercise {exerciseIndex + 1} of {lesson?.exercises.length || 0}
          </Text>
          <Text style={[styles.instructionText, { fontSize: isLandscape ? 20 : 24 }]}>
            {getInstructionText()}
          </Text>
        </View>

        <View style={styles.buildArea}>
          {stage === "initial" && (
            <>
              <View
                style={[
                  styles.dropZone,
                  {
                    width: dropZoneWidth,
                    height: dropZoneHeight,
                    borderColor: showSuccess ? "#4CAF50" : "#2196F3",
                    backgroundColor: showSuccess ? "rgba(76, 175, 80, 0.1)" : "rgba(33, 150, 243, 0.1)",
                  },
                ]}
                onLayout={(event) => {
                  const { x, y, width, height } = event.nativeEvent.layout;
                  dropZoneLayout.current = { x, y, width, height };
                  console.log('[WordBuilder] Drop zone layout:', dropZoneLayout.current);
                }}
              >
                {blendedText ? (
                  <View style={styles.blendedContainer}>
                    <Text style={[styles.blendedText, { fontSize: tileSize * 0.5, color: showSuccess ? "#4CAF50" : "#2196F3" }]}>{blendedText}</Text>
                    {showSuccess && <CheckCircle size={tileSize * 0.4} color="#4CAF50" fill="#4CAF50" />}
                  </View>
                ) : (
                  <Text style={[styles.dropZoneText, { fontSize: isLandscape ? 16 : 18 }]}>Drop letters here</Text>
                )}
              </View>

              <View style={[styles.lettersRow, { gap: isLandscape ? 15 : 20, marginTop: isLandscape ? 30 : 40 }]}>
                {draggableLetters.map((draggableLetter, index) => {
                  if (draggableLetter.isInDropZone) {
                    return <View key={draggableLetter.id} style={{ width: tileSize, height: tileSize }} />;
                  }

                  const panResponder = createPanResponder(index);

                  return (
                    <Animated.View
                      key={draggableLetter.id}
                      testID={`letter-${index}`}
                      {...panResponder.panHandlers}
                      style={[
                        styles.letterTile,
                        {
                          width: tileSize,
                          height: tileSize,
                          borderRadius: tileSize * 0.18,
                        },
                        playingLetterIndex === index && styles.letterTilePlaying,
                        {
                          transform: [
                            { translateX: draggableLetter.position.x },
                            { translateY: draggableLetter.position.y },
                            { scale: draggableLetter.scale },
                          ],
                        },
                      ]}
                      onLayout={(event) => {
                        const { x, y, width, height } = event.nativeEvent.layout;
                        letterLayoutsRef.current.set(index, { x, y, width, height });
                        console.log('[WordBuilder] Letter layout:', { index, x, y, width, height });
                      }}
                    >
                      <Text style={[styles.letterText, { fontSize: tileSize * 0.44 }]}>
                        {draggableLetter.letter}
                      </Text>
                      {playingLetterIndex === index && (
                        <View style={styles.audioIndicator}>
                          <Volume2 size={tileSize * 0.18} color="#FFFFFF" />
                        </View>
                      )}
                    </Animated.View>
                  );
                })}
              </View>
            </>
          )}

          {stage === "complete" && (
            <View style={styles.completeContainer}>
              <View style={[styles.wordCard, { padding: wordCardPadding }]}>
                {exerciseData?.image && (
                  <Text style={[styles.wordEmoji, { fontSize: isLandscape ? 70 : 100 }]}>
                    {exerciseData.image}
                  </Text>
                )}
                <Text style={[styles.completeWord, { fontSize: isLandscape ? 48 : 64 }]}>
                  {exerciseData?.word}
                </Text>
              </View>
              <View style={[styles.feedbackContainer, { marginTop: isLandscape ? 20 : 30 }]}>
                <Text style={[styles.feedbackEmoji, { fontSize: isLandscape ? 50 : 72 }]}>🎉</Text>
                <Text style={[styles.feedbackText, { fontSize: isLandscape ? 24 : 32 }]}>Amazing!</Text>
              </View>
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
    backgroundColor: "#E3F2FD",
  },
  content: {
    flex: 1,
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  instructionText: {
    fontWeight: "700" as const,
    color: "#2196F3",
    textAlign: "center",
    marginBottom: 8,
  },
  progressText: {
    color: "#999",
    fontWeight: "600" as const,
  },
  buildArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  dropZone: {
    borderWidth: 3,
    borderStyle: "dashed",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  dropZoneText: {
    color: "#2196F3",
    fontWeight: "600" as const,
  },
  blendedContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  blendedText: {
    fontWeight: "800" as const,
    color: "#2196F3",
  },
  lettersRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  letterTile: {
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
  audioIndicator: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 16,
    padding: 4,
  },
  letterText: {
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
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  wordEmoji: {
    marginBottom: 20,
  },
  completeWord: {
    fontWeight: "800" as const,
    color: "#1A1A1A",
  },
  feedbackContainer: {
    backgroundColor: "#E8F5E9",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    minWidth: 200,
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
