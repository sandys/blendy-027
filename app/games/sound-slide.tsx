import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Platform,
  PanResponder,
  Pressable,
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

type LayoutSize = { width: number; height: number };

export default function SoundSlideScreen() {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const params = useLocalSearchParams();
  const lessonNumber = parseInt(params.lesson as string);
  const exerciseIndex = parseInt(params.exercise as string);

  const lesson = SAMPLE_LESSONS.find((l) => l.lesson_number === lessonNumber);
  const exercise = lesson?.exercises[exerciseIndex];
  const exerciseData = exercise?.data as
    | { onset: string; rime: string; word: string; image: string }
    | undefined;

  const [stage, setStage] = useState<"initial" | "merged">("initial");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isPlayingOnset, setIsPlayingOnset] = useState(false);
  const [isPlayingRime, setIsPlayingRime] = useState(false);
  const [audioRestartKey, setAudioRestartKey] = useState(0);

  const onsetX = useSharedValue(0);
  const onsetY = useSharedValue(0);
  const onsetScale = useSharedValue(1);
  const rimeX = useSharedValue(0);
  const rimeY = useSharedValue(0);
  const rimeScale = useSharedValue(1);
  const flash = useSharedValue(0);

  const gameLayout = useRef<LayoutSize | null>(null);
  const dragStartCenter = useRef({ x: 0, y: 0 });
  const homeOnsetNorm = useRef({ x: 0.35, y: 0.5 });
  const homeRimeNorm = useRef({ x: 0.65, y: 0.5 });
  const onsetNormRef = useRef({ x: 0.35, y: 0.5 });
  const rimeNormRef = useRef({ x: 0.65, y: 0.5 });
  const audioLoopRef = useRef(true);
  const isCorrectAnswerGiven = useRef(false);

  const tileSize = useMemo(() => {
    const minDim = Math.min(width, height);
    const scale = isLandscape ? 0.18 : 0.28;
    return Math.max(72, Math.min(180, Math.round(minDim * scale)));
  }, [isLandscape, width, height]);

  const boardWidth = Math.min(width * 0.92, 960);
  const boardHeight = Math.min(height * (isLandscape ? 0.78 : 0.55), height - (isLandscape ? 140 : 200));
  const boardPadding = Math.max(16, boardWidth * 0.04);

  const positionTiles = useCallback(
    (layout?: LayoutSize) => {
      const gl = layout ?? gameLayout.current;
      if (!gl) return;
      const marginPx = Math.max(12, Math.round(tileSize * 0.25));
      const leftIdeal = 0.32;
      const rightIdeal = 0.68;
      const half = tileSize / 2;
      const minCx = (marginPx + half) / gl.width;
      const maxCx = (gl.width - marginPx - half) / gl.width;
      const cy = 0.5;

      const adjustedLeft = Math.max(minCx, Math.min(maxCx, leftIdeal));
      const adjustedRight = Math.max(minCx, Math.min(maxCx, rightIdeal));

      homeOnsetNorm.current = { x: adjustedLeft, y: cy };
      homeRimeNorm.current = { x: adjustedRight, y: cy };
      onsetNormRef.current = { ...homeOnsetNorm.current };
      rimeNormRef.current = { ...homeRimeNorm.current };

      onsetX.value = adjustedLeft * gl.width;
      onsetY.value = cy * gl.height;
      rimeX.value = adjustedRight * gl.width;
      rimeY.value = cy * gl.height;
    },
    [tileSize, onsetX, onsetY, rimeX, rimeY]
  );

  useEffect(() => {
    audioLoopRef.current = true;
    isCorrectAnswerGiven.current = false;
    setStage("initial");
    setShowFeedback(false);
    onsetScale.value = 1;
    rimeScale.value = 1;

    const playLoop = async () => {
      flash.value = withTiming(1, { duration: 200 }, () => {
        flash.value = withTiming(0, { duration: 200 });
      });
      if (Platform.OS !== "web") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      }
      await new Promise((r) => setTimeout(r, 300));
      while (audioLoopRef.current && !isCorrectAnswerGiven.current) {
        setIsPlayingOnset(true);
        await speakText(exerciseData?.onset ?? "", { usePhoneme: true });
        setIsPlayingOnset(false);
        await new Promise((r) => setTimeout(r, 700));
        if (!audioLoopRef.current || isCorrectAnswerGiven.current) break;
        setIsPlayingRime(true);
        await speakText(exerciseData?.rime ?? "", { usePhoneme: false });
        setIsPlayingRime(false);
        await new Promise((r) => setTimeout(r, 1100));
      }
    };
    if (exerciseData) playLoop();
    return () => {
      audioLoopRef.current = false;
    };
  }, [exerciseData, exerciseIndex, lessonNumber, flash, onsetScale, rimeScale, audioRestartKey]);

  const resetTilePosition = useCallback(() => {
    const gl = gameLayout.current;
    if (!gl) return;
    const targetX = homeOnsetNorm.current.x * gl.width;
    const targetY = homeOnsetNorm.current.y * gl.height;
    onsetNormRef.current = { ...homeOnsetNorm.current };
    onsetX.value = withSpring(targetX);
    onsetY.value = withSpring(targetY);
    rimeScale.value = withTiming(1, { duration: 150 });
  }, [onsetX, onsetY, rimeScale]);

  const handleSuccess = useCallback(() => {
    isCorrectAnswerGiven.current = true;
    audioLoopRef.current = false;
    setIsPlayingOnset(false);
    setIsPlayingRime(false);
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    speakText(exerciseData?.word ?? "", { usePhoneme: false, rate: 0.72 });
    rimeScale.value = withTiming(1.12, { duration: 220 }, () => {
      rimeScale.value = withTiming(1, { duration: 220 });
    });
    setTimeout(() => {
      setStage("merged");
      setShowFeedback(true);
    }, 600);
    setTimeout(() => {
      const nextExerciseIndex = exerciseIndex + 1;
      if (lesson && nextExerciseIndex < (lesson.exercises?.length ?? 0)) {
        router.replace({
          pathname: "/games/sound-slide",
          params: { lesson: lessonNumber, exercise: nextExerciseIndex },
        });
      } else {
        router.back();
      }
    }, 2400);
  }, [exerciseData, exerciseIndex, rimeScale, lesson, lessonNumber]);

  const hitThreshold = tileSize * 0.45;
  const checkHover = useCallback(
    (nx: number, ny: number) => {
      const dx = nx - rimeX.value;
      const dy = ny - rimeY.value;
      return Math.sqrt(dx * dx + dy * dy) <= hitThreshold;
    },
    [hitThreshold, rimeX, rimeY]
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => stage === "initial" && !!gameLayout.current,
        onMoveShouldSetPanResponder: () => stage === "initial" && !!gameLayout.current,
        onPanResponderGrant: () => {
          if (Platform.OS !== "web") {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
          onsetScale.value = withSpring(1.08);
          dragStartCenter.current = { x: onsetX.value, y: onsetY.value };
        },
        onPanResponderTerminationRequest: () => false,
        onPanResponderMove: (_evt, gesture) => {
          const gl = gameLayout.current;
          if (!gl) return;
          const marginPx = Math.max(12, tileSize * 0.25);
          const half = tileSize / 2;
          const minX = marginPx + half;
          const maxX = gl.width - marginPx - half;
          const minY = marginPx + half;
          const maxY = gl.height - marginPx - half;
          let nx = dragStartCenter.current.x + gesture.dx;
          let ny = dragStartCenter.current.y + gesture.dy;
          nx = Math.max(minX, Math.min(maxX, nx));
          ny = Math.max(minY, Math.min(maxY, ny));
          onsetX.value = nx;
          onsetY.value = ny;
          onsetNormRef.current = { x: nx / gl.width, y: ny / gl.height };
          const hovering = checkHover(nx, ny);
          rimeScale.value = withTiming(hovering ? 1.08 : 1, { duration: 140 });
        },
        onPanResponderRelease: () => {
          onsetScale.value = withSpring(1);
          const gl = gameLayout.current;
          if (!gl) {
            resetTilePosition();
            return;
          }
          const hit = checkHover(onsetX.value, onsetY.value);
          if (hit) {
            handleSuccess();
          } else {
            resetTilePosition();
          }
        },
        onPanResponderTerminate: () => {
          onsetScale.value = withSpring(1);
          resetTilePosition();
        },
      }),
    [stage, tileSize, handleSuccess, resetTilePosition, checkHover, onsetScale, onsetX, onsetY, rimeScale]
  );

  useEffect(() => {
    if (gameLayout.current) {
      positionTiles();
    }
  }, [positionTiles, tileSize, stage]);

  const flashStyle = useAnimatedStyle(() => {
    const bg = interpolateColor(flash.value, [0, 1], ["rgba(0,0,0,0)", "rgba(255,211,61,0.2)"]);
    return { backgroundColor: bg };
  }, [flash]);

  const haloSize = tileSize * 1.4;

  const onsetAnimatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        { translateX: onsetX.value - tileSize / 2 },
        { translateY: onsetY.value - tileSize / 2 },
        { scale: onsetScale.value },
      ],
    }),
    [tileSize]
  );

  const rimeAnimatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        { translateX: rimeX.value - tileSize / 2 },
        { translateY: rimeY.value - tileSize / 2 },
        { scale: rimeScale.value },
      ],
    }),
    [tileSize]
  );

  const haloAnimatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        { translateX: rimeX.value - haloSize / 2 },
        { translateY: rimeY.value - haloSize / 2 },
      ],
    }),
    [haloSize]
  );

  const containerPaddingHorizontal = Math.max(16, width * 0.04);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 12,
          paddingBottom: Math.max(insets.bottom + 12, 20),
          paddingHorizontal: containerPaddingHorizontal,
        },
      ]}
    >
      <View style={[styles.header, { paddingHorizontal: containerPaddingHorizontal }]}>
        <View style={styles.headerRow}>
          <Text style={[styles.progressText, { fontSize: isLandscape ? 12 : 14 }]}>
            Exercise {exerciseIndex + 1} of {lesson?.exercises.length ?? 0}
          </Text>
          <Pressable
            hitSlop={12}
            style={styles.replayButton}
            accessibilityRole="button"
            onPress={() => {
              audioLoopRef.current = false;
              isCorrectAnswerGiven.current = false;
              setStage("initial");
              setShowFeedback(false);
              positionTiles();
              setAudioRestartKey((key) => key + 1);
            }}
          >
            <Volume2 size={20} color="#1A1A1A" />
            <Text style={styles.replayText}>Replay</Text>
          </Pressable>
        </View>
        <Text
          style={[
            styles.instructionText,
            {
              fontSize: isLandscape ? Math.max(16, width * 0.018) : Math.max(18, width * 0.042),
            },
          ]}
        >
          Drag the sounds together to make a word!
        </Text>
      </View>

      <View style={styles.gameArea}>
        <View style={styles.boardOuter}>
          <View
            style={[
              styles.board,
              {
                width: boardWidth,
                height: boardHeight,
                padding: boardPadding,
                borderRadius: Math.max(24, boardWidth * 0.04),
              },
            ]}
            onLayout={(e) => {
              const { width: w, height: h } = e.nativeEvent.layout;
              if (w <= 0 || h <= 0) return;
              gameLayout.current = { width: w, height: h };
              positionTiles({ width: w, height: h });
            }}
          >
            <Animated.View style={[styles.flashOverlay, flashStyle]} pointerEvents="none" />
            {stage === "initial" && (
              <>
                <Animated.View
                  pointerEvents="none"
                  style={[
                    styles.dropHalo,
                    {
                      width: haloSize,
                      height: haloSize,
                      borderRadius: haloSize / 2,
                    },
                    haloAnimatedStyle,
                  ]}
                />
                <Animated.View pointerEvents="none" style={[styles.rimeTile, rimeAnimatedStyle]}>
                  <Text style={[styles.tileText, { fontSize: tileSize * 0.42 }]}>{exerciseData?.rime}</Text>
                  {isPlayingRime && (
                    <View style={[styles.audioIndicator, { padding: Math.max(4, tileSize * 0.08) }]}>
                      <Volume2 size={Math.max(16, tileSize * 0.25)} color="#FFFFFF" />
                    </View>
                  )}
                </Animated.View>

                <Animated.View
                  {...panResponder.panHandlers}
                  style={[styles.onsetTile, onsetAnimatedStyle]}
                >
                  <Text style={[styles.tileText, { fontSize: tileSize * 0.42 }]}>{exerciseData?.onset}</Text>
                  {isPlayingOnset && (
                    <View style={[styles.audioIndicator, { padding: Math.max(4, tileSize * 0.08) }]}>
                      <Volume2 size={Math.max(16, tileSize * 0.25)} color="#FFFFFF" />
                    </View>
                  )}
                </Animated.View>
              </>
            )}

            {stage === "merged" && (
              <View style={styles.mergedContainer}>
                <View
                  style={[
                    styles.wordCard,
                    {
                      padding: isLandscape ? Math.max(20, width * 0.025) : Math.max(28, width * 0.05),
                    },
                  ]}
                >
                  <Text style={[styles.wordEmoji, { fontSize: isLandscape ? 70 : 90 }]}>{exerciseData?.image}</Text>
                  <Text style={[styles.wordText, { fontSize: isLandscape ? 40 : 54 }]}>{exerciseData?.word}</Text>
                </View>
              </View>
            )}
          </View>
        </View>
        {showFeedback && (
          <View
            style={[
              styles.feedbackContainer,
              { bottom: insets.bottom + Math.max(24, height * 0.04) },
            ]}
          >
            <Text
              style={[
                styles.feedbackEmoji,
                { fontSize: Math.max(34, Math.min(80, Math.round((isLandscape ? height : width) * 0.08))) },
              ]}
            >
              🎉
            </Text>
            <Text
              style={[
                styles.feedbackText,
                { fontSize: Math.max(18, Math.min(32, Math.round((isLandscape ? height : width) * 0.035))) },
              ]}
            >
              Great job!
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8E1",
  },
  header: {
    paddingVertical: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  instructionText: {
    fontWeight: "700",
    color: "#EBA937",
    textAlign: "center",
    marginTop: 6,
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
    backgroundColor: "#FFE7A4",
  },
  replayText: {
    fontWeight: "600",
    color: "#1A1A1A",
  },
  gameArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  boardOuter: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  board: {
    backgroundColor: "#FFF1C1",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  flashOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  onsetTile: {
    position: "absolute",
    width: "auto",
    height: "auto",
    paddingHorizontal: 6,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6B9D",
    borderRadius: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  rimeTile: {
    position: "absolute",
    width: "auto",
    height: "auto",
    paddingHorizontal: 6,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4ECDC4",
    borderRadius: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  tileText: {
    fontWeight: "800",
    color: "#FFFFFF",
  },
  audioIndicator: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "rgba(0,0,0,0.35)",
    borderRadius: 16,
  },
  dropHalo: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.28)",
    borderWidth: 3,
    borderColor: "rgba(78,205,196,0.5)",
    zIndex: 0,
  },
  mergedContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  wordCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 18,
    elevation: 10,
    minWidth: 220,
  },
  wordEmoji: {
    marginBottom: 16,
  },
  wordText: {
    fontWeight: "800",
    color: "#1A1A1A",
  },
  feedbackContainer: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 8,
  },
  feedbackEmoji: {
    marginBottom: 8,
  },
  feedbackText: {
    fontWeight: "700",
    color: "#2E7D32",
  },
});
