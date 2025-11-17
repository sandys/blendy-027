import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Platform,
  Pressable,
  PanResponder,
} from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { SAMPLE_LESSONS } from "@/constants/curriculum-data";
import { speakText } from "@/utils/audio";
import { Volume2 } from "lucide-react-native";

type ExerciseData = {
  onset: string;
  rime: string;
  word: string;
  image: string;
};

type Point = { x: number; y: number };

export default function SoundSlideScreen() {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const params = useLocalSearchParams();
  const lessonNumber = Number(params.lesson ?? 1);
  const exerciseIndex = Number(params.exercise ?? 0);

  const lesson = SAMPLE_LESSONS.find((l) => l.lesson_number === lessonNumber);
  const exercise = lesson?.exercises[exerciseIndex];
  const exerciseData = (exercise?.data as ExerciseData) ?? null;

  const [stage, setStage] = useState<"drag" | "merged">("drag");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isPlayingOnset, setIsPlayingOnset] = useState(false);
  const [isPlayingRime, setIsPlayingRime] = useState(false);
  const [audioRestartKey, setAudioRestartKey] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  const onsetX = useSharedValue(0);
  const onsetY = useSharedValue(0);
  const onsetScale = useSharedValue(1);
  const rimeX = useSharedValue(0);
  const rimeY = useSharedValue(0);
  const rimeScale = useSharedValue(1);
  const flash = useSharedValue(0);

  const homeOnset = useRef<Point>({ x: 0, y: 0 });
  const dragStart = useRef<Point>({ x: 0, y: 0 });
  const dropCenter = useRef<Point>({ x: 0, y: 0 });
  const audioLoopRef = useRef(true);
  const isCompleteRef = useRef(false);

  const horizontalPadding = Math.max(16, width * 0.04);
  const headerSpacing = Math.max(18, height * 0.02);
  const availableHeight =
    height - insets.top - insets.bottom - headerHeight - headerSpacing - 32;
  const maxBoardWidth = Math.min(width - horizontalPadding * 2, 1024);
  const maxBoardHeight = Math.max(260, availableHeight);
  const boardAspect = isLandscape ? 16 / 9 : 4 / 5;

  let boardWidth = maxBoardWidth;
  let boardHeight = boardWidth / boardAspect;
  if (boardHeight > maxBoardHeight) {
    boardHeight = maxBoardHeight;
    boardWidth = boardHeight * boardAspect;
  }
  const tileSize = Math.min(Math.max(70, Math.min(boardWidth, boardHeight) * 0.22), 220);

  const boardSize = useMemo(() => ({ width: boardWidth, height: boardHeight }), [boardWidth, boardHeight]);

  const placeTiles = useCallback(() => {
    const { width: bw, height: bh } = boardSize;
    const margin = Math.max(tileSize * 0.3, 16);
    const half = tileSize / 2;
    const minCx = (margin + half) / bw;
    const maxCx = (bw - margin - half) / bw;
    const leftCenter = Math.max(minCx, Math.min(0.32, maxCx)) * bw;
    const rightCenter = Math.max(minCx, Math.min(0.68, maxCx)) * bw;
    const centerY = bh * 0.5;

    homeOnset.current = { x: leftCenter, y: centerY };
    dropCenter.current = { x: rightCenter, y: centerY };
    onsetX.value = leftCenter;
    onsetY.value = centerY;
    rimeX.value = rightCenter;
    rimeY.value = centerY;
  }, [boardSize, onsetX, onsetY, rimeX, rimeY, tileSize]);

  useEffect(() => {
    placeTiles();
  }, [placeTiles]);

  useEffect(() => {
    audioLoopRef.current = true;
    isCompleteRef.current = false;
    setStage("drag");
    setShowFeedback(false);
    onsetScale.value = 1;
    rimeScale.value = 1;

    const loopAudio = async () => {
      flash.value = withTiming(1, { duration: 220 }, () => {
        flash.value = withTiming(0, { duration: 220 });
      });
      if (Platform.OS !== "web") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      }
      await new Promise((resolve) => setTimeout(resolve, 280));

      while (audioLoopRef.current && !isCompleteRef.current) {
        setIsPlayingOnset(true);
        await speakText(exerciseData?.onset ?? "", { usePhoneme: true });
        setIsPlayingOnset(false);
        await new Promise((resolve) => setTimeout(resolve, 600));
        if (!audioLoopRef.current || isCompleteRef.current) break;
        setIsPlayingRime(true);
        await speakText(exerciseData?.rime ?? "", { usePhoneme: false });
        setIsPlayingRime(false);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };
    if (exerciseData) {
      loopAudio();
    }
    return () => {
      audioLoopRef.current = false;
    };
  }, [exerciseData, exerciseIndex, lessonNumber, flash, onsetScale, rimeScale, audioRestartKey]);

  const resetOnset = useCallback(() => {
    const { x, y } = homeOnset.current;
    onsetX.value = withSpring(x, { damping: 12, stiffness: 150 });
    onsetY.value = withSpring(y, { damping: 12, stiffness: 150 });
    rimeScale.value = withTiming(1, { duration: 140 });
  }, [onsetX, onsetY, rimeScale]);

  const handleSuccess = useCallback(() => {
    isCompleteRef.current = true;
    audioLoopRef.current = false;
    setIsPlayingOnset(false);
    setIsPlayingRime(false);
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    speakText(exerciseData?.word ?? "", { rate: 0.72 });
    rimeScale.value = withTiming(1.12, { duration: 220 }, () => {
      rimeScale.value = withTiming(1, { duration: 220 });
    });
    setTimeout(() => {
      setStage("merged");
      setShowFeedback(true);
    }, 500);
    setTimeout(() => {
      const nextExercise = exerciseIndex + 1;
      if (lesson && nextExercise < (lesson.exercises?.length ?? 0)) {
        router.replace({
          pathname: "/games/sound-slide",
          params: { lesson: lessonNumber, exercise: nextExercise },
        });
      } else {
        router.back();
      }
    }, 2400);
  }, [exerciseData, exerciseIndex, lesson, lessonNumber, rimeScale]);

  const dropThreshold = tileSize * 0.45;
  const isHovering = useCallback(
    (nx: number, ny: number) => {
      const dx = nx - dropCenter.current.x;
      const dy = ny - dropCenter.current.y;
      return Math.sqrt(dx * dx + dy * dy) <= dropThreshold;
    },
    [dropThreshold]
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => stage === "drag",
        onMoveShouldSetPanResponder: () => stage === "drag",
        onPanResponderGrant: () => {
          if (Platform.OS !== "web") {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
          onsetScale.value = withSpring(1.08);
          dragStart.current = { x: onsetX.value, y: onsetY.value };
        },
        onPanResponderMove: (_evt, gesture) => {
          if (stage !== "drag") return;
          const { width: bw, height: bh } = boardSize;
          const margin = tileSize * 0.35;
          const half = tileSize / 2;
          const minX = margin + half;
          const maxX = bw - margin - half;
          const minY = margin + half;
          const maxY = bh - margin - half;
          let nx = dragStart.current.x + gesture.dx;
          let ny = dragStart.current.y + gesture.dy;
          nx = Math.max(minX, Math.min(maxX, nx));
          ny = Math.max(minY, Math.min(maxY, ny));
          onsetX.value = nx;
          onsetY.value = ny;
          rimeScale.value = withTiming(isHovering(nx, ny) ? 1.08 : 1, { duration: 120 });
        },
        onPanResponderRelease: () => {
          onsetScale.value = withSpring(1);
          const hit = isHovering(onsetX.value, onsetY.value);
          if (hit) {
            handleSuccess();
          } else {
            resetOnset();
          }
        },
        onPanResponderTerminate: () => {
          onsetScale.value = withSpring(1);
          resetOnset();
        },
      }),
    [boardSize, handleSuccess, isHovering, resetOnset, stage, tileSize, onsetScale, onsetX, onsetY, rimeScale]
  );

  if (!exerciseData) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={styles.errorText}>Exercise not found</Text>
      </View>
    );
  }

  const flashStyle = useAnimatedStyle(() => {
    const color = interpolateColor(flash.value, [0, 1], ["rgba(0,0,0,0)", "rgba(255,211,61,0.25)"]);
    return { backgroundColor: color };
  }, [flash]);

  const onsetStyle = useAnimatedStyle(
    () => ({
      transform: [
        { translateX: onsetX.value - tileSize / 2 },
        { translateY: onsetY.value - tileSize / 2 },
        { scale: onsetScale.value },
      ],
    }),
    [tileSize]
  );

  const rimeStyle = useAnimatedStyle(
    () => ({
      transform: [
        { translateX: rimeX.value - tileSize / 2 },
        { translateY: rimeY.value - tileSize / 2 },
        { scale: rimeScale.value },
      ],
    }),
    [tileSize]
  );

  const haloStyle = useAnimatedStyle(
    () => ({
      transform: [
        { translateX: dropCenter.current.x - tileSize },
        { translateY: dropCenter.current.y - tileSize },
      ],
    }),
    [tileSize]
  );

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 16,
          paddingBottom: insets.bottom + 16,
          paddingHorizontal: horizontalPadding,
        },
      ]}
    >
      <View
        style={[styles.header, { marginBottom: headerSpacing }]}
        onLayout={(event) => setHeaderHeight(event.nativeEvent.layout.height)}
      >
        <View style={styles.headerRow}>
          <Text style={[styles.progressText, { fontSize: isLandscape ? 12 : 14 }]}>
            Exercise {exerciseIndex + 1} of {lesson?.exercises.length ?? 0}
          </Text>
          <Pressable
            style={styles.replayButton}
            onPress={() => {
              audioLoopRef.current = false;
              isCompleteRef.current = false;
              setStage("drag");
              setShowFeedback(false);
              placeTiles();
              setAudioRestartKey((key) => key + 1);
            }}
            accessibilityRole="button"
          >
            <Volume2 size={18} color="#1A1A1A" />
            <Text style={styles.replayText}>Replay</Text>
          </Pressable>
        </View>
        <Text
          style={[
            styles.instructionText,
            { fontSize: isLandscape ? Math.max(16, width * 0.018) : Math.max(18, width * 0.042) },
          ]}
        >
          Drag the sounds together to build the word.
        </Text>
      </View>

      <View style={styles.stageArea}>
        <View
          style={[
            styles.board,
            {
              width: boardWidth,
              height: boardHeight,
              borderRadius: Math.max(24, boardWidth * 0.04),
            },
          ]}
        >
          <Animated.View style={[styles.flashOverlay, flashStyle]} pointerEvents="none" />

          {stage === "drag" && (
            <>
              <Animated.View
                style={[
                  styles.dropHalo,
                  {
                    width: tileSize * 2,
                    height: tileSize * 2,
                    borderRadius: tileSize,
                  },
                  haloStyle,
                ]}
                pointerEvents="none"
              />
              <Animated.View style={[styles.tile, styles.rimeTile, rimeStyle]} pointerEvents="none">
                <Text style={[styles.tileText, { fontSize: tileSize * 0.4 }]}>{exerciseData.rime}</Text>
                {isPlayingRime && (
                  <View style={[styles.audioChip, { padding: Math.max(4, tileSize * 0.08) }]}>
                    <Volume2 size={Math.max(16, tileSize * 0.25)} color="#FFFFFF" />
                  </View>
                )}
              </Animated.View>
              <Animated.View
                {...panResponder.panHandlers}
                style={[styles.tile, styles.onsetTile, onsetStyle]}
              >
                <Text style={[styles.tileText, { fontSize: tileSize * 0.4 }]}>{exerciseData.onset}</Text>
                {isPlayingOnset && (
                  <View style={[styles.audioChip, { padding: Math.max(4, tileSize * 0.08) }]}>
                    <Volume2 size={Math.max(16, tileSize * 0.25)} color="#FFFFFF" />
                  </View>
                )}
              </Animated.View>
            </>
          )}

          {stage === "merged" && (
            <View style={styles.revealCard}>
              <Text style={[styles.wordEmoji, { fontSize: isLandscape ? 80 : 96 }]}>{exerciseData.image}</Text>
              <Text style={[styles.wordText, { fontSize: isLandscape ? 44 : 56 }]}>{exerciseData.word}</Text>
            </View>
          )}
        </View>

        {showFeedback && (
          <View style={styles.feedbackBubble}>
            <Text style={[styles.feedbackEmoji, { fontSize: Math.max(36, width * 0.06) }]}>🎉</Text>
            <Text style={[styles.feedbackText, { fontSize: Math.max(18, width * 0.03) }]}>Great job!</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7DC",
  },
  header: {
    width: "100%",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 12,
  },
  instructionText: {
    textAlign: "center",
    color: "#B37400",
    fontWeight: "700",
    marginTop: 8,
  },
  progressText: {
    color: "#6B6B6B",
    fontWeight: "600",
  },
  replayButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#FFE7B0",
  },
  replayText: {
    fontWeight: "600",
    color: "#1A1A1A",
  },
  stageArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  board: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.05)",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  flashOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  dropHalo: {
    position: "absolute",
    borderWidth: 3,
    borderColor: "rgba(78,205,196,0.45)",
    backgroundColor: "rgba(78,205,196,0.08)",
  },
  tile: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  onsetTile: {
    backgroundColor: "#FF6B9D",
  },
  rimeTile: {
    backgroundColor: "#4ECDC4",
  },
  tileText: {
    color: "#FFFFFF",
    fontWeight: "800",
    letterSpacing: 1,
  },
  audioChip: {
    position: "absolute",
    top: 6,
    right: 6,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  revealCard: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF1C1",
    borderRadius: 32,
    paddingHorizontal: 32,
    paddingVertical: 24,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
  wordEmoji: {
    marginBottom: 16,
  },
  wordText: {
    fontWeight: "800",
    color: "#1A1A1A",
  },
  feedbackBubble: {
    position: "absolute",
    bottom: 24,
    alignSelf: "center",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 28,
    paddingVertical: 18,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.16,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  feedbackEmoji: {
    lineHeight: 40,
  },
  feedbackText: {
    fontWeight: "700",
    color: "#2E7D32",
  },
  errorText: {
    fontSize: 18,
    color: "#444",
  },
});
