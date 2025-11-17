import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Platform,
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
import Matter from "matter-js";

type ExerciseData = {
  onset: string;
  rime: string;
  word: string;
  image: string;
};

type Point = { x: number; y: number };

const Engine = Matter.Engine;
const World = Matter.World;
const Body = Matter.Body;
const Bodies = Matter.Bodies;

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

  // Animation values
  const onsetX = useSharedValue(0);
  const onsetY = useSharedValue(0);
  const onsetScale = useSharedValue(1);
  const rimeX = useSharedValue(0);
  const rimeY = useSharedValue(0);
  const rimeScale = useSharedValue(1);
  const flash = useSharedValue(0);

  // Physics refs
  const engineRef = useRef<Matter.Engine | null>(null);
  const onsetBodyRef = useRef<Matter.Body | null>(null);
  const rimeBodyRef = useRef<Matter.Body | null>(null);
  const draggedBodyRef = useRef<Matter.Body | null>(null);
  const mousePointRef = useRef<Point>({ x: 0, y: 0 });

  const audioLoopRef = useRef(true);
  const isCompleteRef = useRef(false);
  const boardConfigRef = useRef({ width: 0, height: 0 });

  // Board sizing
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

  // Store board config
  boardConfigRef.current = { width: boardWidth, height: boardHeight };

  // Initialize physics
  useEffect(() => {
    const bw = boardWidth;
    const bh = boardHeight;
    const radius = tileSize / 2;

    // Create engine
    const newEngine = Engine.create();
    newEngine.gravity.y = 0;
    engineRef.current = newEngine;

    // Create walls
    const wallThickness = 50;
    const bottomWall = Bodies.rectangle(
      bw / 2,
      bh + wallThickness / 2,
      bw + wallThickness * 2,
      wallThickness,
      { isStatic: true, label: "wall" }
    );

    const topWall = Bodies.rectangle(
      bw / 2,
      -wallThickness / 2,
      bw + wallThickness * 2,
      wallThickness,
      { isStatic: true, label: "wall" }
    );

    const leftWall = Bodies.rectangle(
      -wallThickness / 2,
      bh / 2,
      wallThickness,
      bh + wallThickness * 2,
      { isStatic: true, label: "wall" }
    );

    const rightWall = Bodies.rectangle(
      bw + wallThickness / 2,
      bh / 2,
      wallThickness,
      bh + wallThickness * 2,
      { isStatic: true, label: "wall" }
    );

    World.add(newEngine.world, [bottomWall, topWall, leftWall, rightWall]);

    // Create onset body
    const onsetStartX = bw * 0.32;
    const onsetStartY = bh * 0.5;
    const onsetBody = Bodies.circle(onsetStartX, onsetStartY, radius, {
      friction: 0.4,
      restitution: 0.2,
      frictionAir: 0.02,
      label: "onset",
    });

    // Create rime body
    const rimeStartX = bw * 0.68;
    const rimeStartY = bh * 0.5;
    const rimeBody = Bodies.circle(rimeStartX, rimeStartY, radius, {
      isStatic: true,
      label: "rime",
    });

    onsetBodyRef.current = onsetBody;
    rimeBodyRef.current = rimeBody;

    World.add(newEngine.world, [onsetBody, rimeBody]);

    // Set initial animation values
    onsetX.value = onsetStartX;
    onsetY.value = onsetStartY;
    rimeX.value = rimeStartX;
    rimeY.value = rimeStartY;

    // Physics loop
    let lastTime = Date.now();
    const physicsLoop = setInterval(() => {
      if (!engineRef.current) return;

      const now = Date.now();
      const deltaTime = Math.min((now - lastTime) / 1000, 0.016);
      lastTime = now;

      // Apply drag force if dragging
      if (draggedBodyRef.current && onsetBody) {
        const dx = mousePointRef.current.x - onsetBody.position.x;
        const dy = mousePointRef.current.y - onsetBody.position.y;
        const forceMagnitude = 0.001;
        Body.applyForce(onsetBody, onsetBody.position, {
          x: dx * forceMagnitude,
          y: dy * forceMagnitude,
        });
      }

      // Update engine
      Engine.update(newEngine, deltaTime * 1000);

      // Sync to animations
      onsetX.value = onsetBody.position.x;
      onsetY.value = onsetBody.position.y;
      rimeX.value = rimeBody.position.x;
      rimeY.value = rimeBody.position.y;

      // Collision check
      if (stage === "drag" && !isCompleteRef.current && onsetBody && rimeBody) {
        const dx = onsetBody.position.x - rimeBody.position.x;
        const dy = onsetBody.position.y - rimeBody.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const collisionDist = tileSize * 0.6;

        if (distance < collisionDist) {
          handleSuccess();
        }

        // Hover feedback
        const hoverDist = tileSize * 0.8;
        rimeScale.value = withTiming(distance < hoverDist ? 1.08 : 1, { duration: 120 });
      }
    }, 1000 / 60);

    return () => {
      clearInterval(physicsLoop);
      if (engineRef.current) {
        World.clear(engineRef.current.world, false);
        Engine.clear(engineRef.current);
      }
    };
  }, [boardWidth, boardHeight, tileSize, stage]);

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

  const resetOnset = useCallback(() => {
    if (onsetBodyRef.current) {
      const bw = boardConfigRef.current.width;
      const bh = boardConfigRef.current.height;
      const targetX = bw * 0.32;
      const targetY = bh * 0.5;

      Body.setPosition(onsetBodyRef.current, { x: targetX, y: targetY });
      Body.setVelocity(onsetBodyRef.current, { x: 0, y: 0 });
      Body.setAngularVelocity(onsetBodyRef.current, 0);
    }
    onsetScale.value = withTiming(1, { duration: 140 });
  }, [onsetScale]);

  // Audio loop
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
        { translateX: onsetX.value - tileSize / 2 } as any,
        { translateY: onsetY.value - tileSize / 2 } as any,
        { scale: onsetScale.value } as any,
      ],
    }),
    [tileSize]
  );

  const rimeStyle = useAnimatedStyle(
    () => ({
      transform: [
        { translateX: rimeX.value - tileSize / 2 } as any,
        { translateY: rimeY.value - tileSize / 2 } as any,
        { scale: rimeScale.value } as any,
      ],
    }),
    [tileSize]
  );

  const dropHaloStyle = useAnimatedStyle(
    () => ({
      transform: [
        { translateX: rimeX.value - tileSize } as any,
        { translateY: rimeY.value - tileSize } as any,
      ],
    }),
    [tileSize]
  );

  const handleBoardTouchStart = (e: any) => {
    if (stage !== "drag" || !onsetBodyRef.current) return;

    const touch = e.nativeEvent;
    const x = touch.locationX;
    const y = touch.locationY;

    const dx = x - onsetBodyRef.current.position.x;
    const dy = y - onsetBodyRef.current.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < tileSize / 2 + 20) {
      draggedBodyRef.current = onsetBodyRef.current;
      mousePointRef.current = { x, y };
      onsetScale.value = withSpring(1.08);
      if (Platform.OS !== "web") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }
  };

  const handleBoardTouchMove = (e: any) => {
    if (stage !== "drag" || !draggedBodyRef.current) return;

    const touch = e.nativeEvent;
    const bw = boardConfigRef.current.width;
    const bh = boardConfigRef.current.height;
    const margin = tileSize * 0.35;

    const clampedX = Math.max(margin + tileSize / 2, Math.min(bw - margin - tileSize / 2, touch.locationX));
    const clampedY = Math.max(margin + tileSize / 2, Math.min(bh - margin - tileSize / 2, touch.locationY));

    mousePointRef.current = { x: clampedX, y: clampedY };
  };

  const handleBoardTouchEnd = () => {
    if (!draggedBodyRef.current) return;

    onsetScale.value = withSpring(1);
    draggedBodyRef.current = null;
    resetOnset();
  };

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
              setAudioRestartKey((key) => key + 1);
              resetOnset();
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
          onTouchStart={handleBoardTouchStart}
          onTouchMove={handleBoardTouchMove}
          onTouchEnd={handleBoardTouchEnd}
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
                  dropHaloStyle,
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
              <Animated.View style={[styles.tile, styles.onsetTile, onsetStyle]}>
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
