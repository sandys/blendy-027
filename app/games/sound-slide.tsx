import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Platform,
  PanResponder,
  LayoutChangeEvent,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolateColor,
  runOnJS,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { SAMPLE_LESSONS } from "@/constants/curriculum-data";
import { speakText } from "@/utils/audio";
import { Volume2 } from "lucide-react-native";
import { Bodies, Body, Composite, Engine, SAT } from "matter-js";

export default function SoundSlideScreen() {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const params = useLocalSearchParams();
  const lessonNumber = parseInt(params.lesson as string);
  const exerciseIndex = parseInt(params.exercise as string);

  const lesson = SAMPLE_LESSONS.find((l) => l.lesson_number === lessonNumber);
  const exercise = lesson?.exercises[exerciseIndex];
  const exerciseData = exercise?.data as | { onset: string; rime: string; word: string; image: string } | undefined;

  const [stage, setStage] = useState<"initial" | "merged">("initial");
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isPlayingOnset, setIsPlayingOnset] = useState<boolean>(false);
  const [isPlayingRime, setIsPlayingRime] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const engineRef = useRef<any | null>(null);
  const onsetBodyRef = useRef<any | null>(null);
  const rimeBodyRef = useRef<any | null>(null);
  const rafRef = useRef<number | null>(null);
  const gameAreaRef = useRef<View>(null);

  const onsetX = useSharedValue<number>(0);
  const onsetY = useSharedValue<number>(0);
  const onsetScale = useSharedValue<number>(1);
  const rimeScale = useSharedValue<number>(1);
  const rimeX = useSharedValue<number>(0);
  const rimeY = useSharedValue<number>(0);
  const flash = useSharedValue<number>(0);

  const gameLayout = useRef<{ x: number; y: number; width: number; height: number } | null>(null);
  const dragStartCenter = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const onsetNormRef = useRef<{ x: number; y: number }>({ x: 0.35, y: 0.5 });
  const rimeNormRef = useRef<{ x: number; y: number }>({ x: 0.65, y: 0.5 });
  const sizeNormRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const audioLoopRef = useRef<boolean>(true);
  const isCorrectAnswerGiven = useRef<boolean>(false);

  const tileSize = useMemo(() => {
    const minDim = Math.min(width, height);
    const base = isLandscape ? minDim * 0.14 : minDim * 0.2;
    return Math.max(64, Math.min(120, Math.round(base)));
  }, [isLandscape, width, height]);

  useEffect(() => {
    engineRef.current = Engine.create();
    if (engineRef.current) {
      (engineRef.current.world.gravity as any).x = 0;
      (engineRef.current.world.gravity as any).y = 0;
      (engineRef.current.world.gravity as any).scale = 0;
    }
    // Set safe initial positions so both tiles are visible even before onLayout
    const ox = Math.max(60, width * 0.3);
    const rx = Math.min(width - 60, width * 0.7);
    const cy = height * 0.55;
    onsetX.value = ox;
    onsetY.value = cy;
    rimeX.value = rx;
    rimeY.value = cy;
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      engineRef.current = null;
      onsetBodyRef.current = null;
      rimeBodyRef.current = null;
    };
  }, []);

  useEffect(() => {
    audioLoopRef.current = true;
    isCorrectAnswerGiven.current = false;
    setStage("initial");
    setShowFeedback(false);
    setShowSuccess(false);
    onsetScale.value = 1;
    rimeScale.value = 1;

    const play = async () => {
      flash.value = withTiming(1, { duration: 180 }, () => {
        flash.value = withTiming(0, { duration: 180 });
      });
      if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
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
        await new Promise((r) => setTimeout(r, 1200));
      }
    };
    if (exerciseData) play();
    return () => {
      audioLoopRef.current = false;
    };
  }, [exerciseIndex, lessonNumber, exerciseData, flash, onsetScale, rimeScale]);

  const startEngineLoop = () => {
    if (!engineRef.current || !onsetBodyRef.current) return;
    const loop = () => {
      if (!engineRef.current || !onsetBodyRef.current) return;
      Engine.update(engineRef.current, 16);
      const ob = onsetBodyRef.current as any;
      const rb = rimeBodyRef.current as any;
      if (ob?.position) {
        onsetX.value = ob.position.x;
        onsetY.value = ob.position.y;
        const gl = gameLayout.current;
        if (gl) {
          onsetNormRef.current = { x: ob.position.x / gl.width, y: ob.position.y / gl.height };
        }
      }
      if (rb?.position) {
        rimeX.value = rb.position.x;
        rimeY.value = rb.position.y;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(loop);
  };

  const computeCentersNorm = (gl: { width: number; height: number }) => {
    const marginPx = Math.max(12, Math.round(tileSize * 0.25));
    const usableW = gl.width - marginPx * 2 - tileSize; // space between centers after accounting for both half widths
    const spacingTarget = Math.max(tileSize * 1.1, Math.min(usableW, gl.width * (isLandscape ? 0.28 : 0.24)));
    const cxLeftPx = Math.max(marginPx + tileSize / 2, Math.round(gl.width / 2 - spacingTarget / 2));
    const cxRightPx = Math.min(gl.width - marginPx - tileSize / 2, Math.round(gl.width / 2 + spacingTarget / 2));
    const cyPx = Math.round(gl.height * 0.5);
    const cxLeft = cxLeftPx / gl.width;
    const cxRight = cxRightPx / gl.width;
    const cy = cyPx / gl.height;
    console.log('[SoundSlide] centers', { marginPx, spacingTarget, cxLeftPx, cxRightPx, cyPx, gl });
    return { cxLeft, cxRight, cy };
  };

  const layoutBodies = (gl: { x: number; y: number; width: number; height: number }) => {
    const eng = engineRef.current;
    if (!eng) return;

    sizeNormRef.current = { w: tileSize / gl.width, h: tileSize / gl.height };

    const centers = computeCentersNorm(gl);
    onsetNormRef.current = { x: centers.cxLeft, y: centers.cy };
    rimeNormRef.current = { x: centers.cxRight, y: centers.cy };

    const onsetXpx = onsetNormRef.current.x * gl.width;
    const onsetYpx = onsetNormRef.current.y * gl.height;
    const rimeXpx = rimeNormRef.current.x * gl.width;
    const rimeYpx = rimeNormRef.current.y * gl.height;

    if (onsetBodyRef.current) {
      Composite.remove(eng.world, onsetBodyRef.current);
      onsetBodyRef.current = null;
    }
    if (rimeBodyRef.current) {
      Composite.remove(eng.world, rimeBodyRef.current);
      rimeBodyRef.current = null;
    }

    onsetBodyRef.current = Bodies.rectangle(onsetXpx, onsetYpx, tileSize, tileSize, { label: "onset", isStatic: false });
    rimeBodyRef.current = Bodies.rectangle(rimeXpx, rimeYpx, tileSize, tileSize, { label: "rime", isStatic: true });
    Composite.add(eng.world, [onsetBodyRef.current, rimeBodyRef.current]);
    console.log('[SoundSlide] layoutBodies', {
      tileSize,
      onset: { x: onsetXpx, y: onsetYpx },
      rime: { x: rimeXpx, y: rimeYpx },
      sizeNorm: sizeNormRef.current,
    });

    onsetX.value = onsetXpx;
    onsetY.value = onsetYpx;
    rimeX.value = rimeXpx;
    rimeY.value = rimeYpx;

    startEngineLoop();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => stage === "initial" && !!gameLayout.current,
      onMoveShouldSetPanResponder: () => stage === "initial" && !!gameLayout.current,
      onPanResponderGrant: () => {
        const ob = onsetBodyRef.current;
        if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onsetScale.value = withSpring(1.08);
        if (ob) {
          const pos = (ob as any).position;
          dragStartCenter.current = { x: pos?.x ?? 0, y: pos?.y ?? 0 };
          console.log('[SoundSlide] drag start', dragStartCenter.current);
        }
      },
      onPanResponderMove: (_evt, g) => {
        const ob = onsetBodyRef.current;
        const rb = rimeBodyRef.current;
        const eng = engineRef.current;
        const gl = gameLayout.current;
        if (!ob || !eng || !gl) return;
        const marginPx = Math.max(12, tileSize * 0.25);
        const minX = marginPx + tileSize / 2;
        const maxX = gl.width - marginPx - tileSize / 2;
        const minY = marginPx + tileSize / 2;
        const maxY = gl.height - marginPx - tileSize / 2;
        let nx = dragStartCenter.current.x + g.dx;
        let ny = dragStartCenter.current.y + g.dy;
        nx = Math.max(minX, Math.min(maxX, nx));
        ny = Math.max(minY, Math.min(maxY, ny));
        Body.setPosition(ob, { x: nx, y: ny });
        onsetNormRef.current = { x: nx / gl.width, y: ny / gl.height };
        Engine.update(eng, 16);
        if (rb) {
          const result = SAT.collides(ob as any, rb as any) as { collided?: boolean } | null;
          const hovering = !!(result && result.collided === true);
          rimeScale.value = withTiming(hovering ? 1.06 : 1, { duration: 120 });
        }
        if (__DEV__) console.log('[SoundSlide] drag move', { nx, ny });
      },
      onPanResponderRelease: () => {
        const ob = onsetBodyRef.current;
        const rb = rimeBodyRef.current;
        const eng = engineRef.current;
        const gl = gameLayout.current;
        onsetScale.value = withSpring(1);
        if (!ob || !rb || !eng || !gl) return;
        Engine.update(eng, 16);
        const result = SAT.collides(ob as any, rb as any) as { collided?: boolean } | null;
        const hit = !!(result && result.collided === true);
        console.log('[SoundSlide] release', { hit, onset: (ob as any).position, rime: (rb as any).position });
        if (hit) {
          runOnJS(handleSuccess)();
        } else {
          const centers = computeCentersNorm(gl);
          onsetNormRef.current = { x: centers.cxLeft, y: centers.cy };
          const cx = onsetNormRef.current.x * gl.width;
          const cy = onsetNormRef.current.y * gl.height;
          Body.setPosition(ob, { x: cx, y: cy });
          onsetX.value = withSpring(cx);
          onsetY.value = withSpring(cy);
          rimeScale.value = withTiming(1, { duration: 120 });
        }
      },
      onPanResponderTerminate: () => {
        onsetScale.value = withSpring(1);
      },
    })
  ).current;

  useEffect(() => {
    const ox = Math.max(60, width * 0.3);
    const rx = Math.min(width - 60, width * 0.7);
    const cy = height * 0.55;
    onsetX.value = ox;
    onsetY.value = cy;
    rimeX.value = rx;
    rimeY.value = cy;

    if (gameLayout.current) {
      layoutBodies(gameLayout.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height, isLandscape, tileSize, stage]);

  const handleSuccess = () => {
    isCorrectAnswerGiven.current = true;
    audioLoopRef.current = false;
    setIsPlayingOnset(false);
    setIsPlayingRime(false);
    setShowSuccess(true);
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    speakText(exerciseData?.word ?? "", { usePhoneme: false, rate: 0.7 });
    rimeScale.value = withTiming(1.12, { duration: 200 }, () => {
      rimeScale.value = withTiming(1, { duration: 200 });
    });
    setTimeout(() => {
      setStage("merged");
      setShowFeedback(true);
    }, 700);
    setTimeout(() => {
      const nextExerciseIndex = exerciseIndex + 1;
      if (lesson && nextExerciseIndex < (lesson.exercises?.length ?? 0)) {
        router.replace({ pathname: "/games/sound-slide", params: { lesson: lessonNumber, exercise: nextExerciseIndex } });
      } else {
        router.back();
      }
    }, 2600);
  };

  const flashAnimatedStyle = useAnimatedStyle(() => {
    const bg = interpolateColor(flash.value, [0, 1], ["rgba(255,211,61,0)", "rgba(255,211,61,0.3)"]);
    return { backgroundColor: bg } as const;
  }, [flash]);

  const onsetAnimatedStyle = useAnimatedStyle(() => ({
    position: "absolute" as const,
    width: tileSize,
    height: tileSize,
    borderRadius: tileSize * 0.2,
    transform: [
      { translateX: onsetX.value - tileSize / 2 },
      { translateY: onsetY.value - tileSize / 2 },
      { scale: onsetScale.value },
    ],
  }), [tileSize, onsetX, onsetY, onsetScale]);

  const rimeAnimatedStyle = useAnimatedStyle(() => ({
    position: "absolute" as const,
    width: tileSize,
    height: tileSize,
    borderRadius: tileSize * 0.2,
    transform: [
      { translateX: rimeX.value - tileSize / 2 },
      { translateY: rimeY.value - tileSize / 2 },
      { scale: rimeScale.value },
    ],
  }), [tileSize, rimeScale, rimeX, rimeY]);

  return (
    <View style={[styles.container, { paddingLeft: insets.left, paddingRight: insets.right, paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Animated.View style={[styles.flashOverlay, flashAnimatedStyle]} pointerEvents="none" />
      <View style={styles.header}>
        <Text style={[styles.progressText, { fontSize: isLandscape ? 12 : 14 }]}>Exercise {exerciseIndex + 1} of {lesson?.exercises.length || 0}</Text>
        <Text style={[styles.instructionText, { fontSize: isLandscape ? Math.max(14, width * 0.018) : Math.max(18, width * 0.04), marginTop: 4 }]}>Drag the sounds together to make a word!</Text>
      </View>

      <View
        style={styles.gameArea}
        ref={gameAreaRef}
        onLayout={(e: LayoutChangeEvent) => {
          const { x, y, width: w, height: h } = e.nativeEvent.layout;
          console.log('[SoundSlide] onLayout', { x, y, w, h });
          gameLayout.current = { x, y, width: w, height: h };
          layoutBodies({ x, y, width: w, height: h });
        }}
      >
        {stage === "initial" && !!gameLayout.current && (
          <>
            <Animated.View
              testID="onset-tile"
              style={[styles.onsetTile, isPlayingOnset ? styles.tilePlaying : null, showSuccess ? styles.tileSuccess : null, onsetAnimatedStyle]}
              {...panResponder.panHandlers}
            >
              <Text style={[styles.tileText, { fontSize: tileSize * 0.4 }]}>{exerciseData?.onset}</Text>
              {isPlayingOnset && (
                <View style={[styles.audioIndicator, { padding: Math.max(4, tileSize * 0.08) }]}>
                  <Volume2 size={Math.max(16, tileSize * 0.25)} color="#FFFFFF" />
                </View>
              )}
            </Animated.View>

            <Animated.View
              testID="rime-tile"
              style={[styles.rimeTile, isPlayingRime ? styles.tilePlaying : null, showSuccess ? styles.tileSuccess : null, rimeAnimatedStyle]}
            >
              <Text style={[styles.tileText, { fontSize: tileSize * 0.4 }]}>{exerciseData?.rime}</Text>
              {isPlayingRime && (
                <View style={[styles.audioIndicator, { padding: Math.max(4, tileSize * 0.08) }]}>
                  <Volume2 size={Math.max(16, tileSize * 0.25)} color="#FFFFFF" />
                </View>
              )}
            </Animated.View>
          </>
        )}

        {stage === "merged" && (
          <View style={styles.mergedContainer}>
            <View style={[styles.wordCard, { padding: isLandscape ? Math.max(20, width * 0.03) : Math.max(28, width * 0.06) }]}>
              <Text style={[styles.wordEmoji, { fontSize: isLandscape ? 70 : 100 }]}>{exerciseData?.image}</Text>
              <Text style={[styles.wordText, { fontSize: isLandscape ? 40 : 56 }]}>{exerciseData?.word}</Text>
            </View>
          </View>
        )}
      </View>

      {showFeedback && (
        <View style={[styles.feedbackContainer, { bottom: Math.max(24, height * (isLandscape ? 0.06 : 0.08)) }]}>
          <Text style={[styles.feedbackEmoji, { fontSize: Math.max(36, Math.min(84, Math.round((isLandscape ? height : width) * 0.08))) }]}>🎉</Text>
          <Text style={[styles.feedbackText, { fontSize: Math.max(18, Math.min(36, Math.round((isLandscape ? height : width) * 0.035))) }]}>Great job!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8E1" },
  header: { paddingVertical: 12, paddingHorizontal: 20, alignItems: "center" },
  instructionText: { fontWeight: "700" as const, color: "#FFD93D", textAlign: "center", marginBottom: 8 },
  progressText: { color: "#999", fontWeight: "600" as const },
  gameArea: { flex: 1, justifyContent: "center", alignItems: "center", position: "relative" as const },
  onsetTile: {
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
    backgroundColor: "#4ECDC4",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  tilePlaying: {
    borderWidth: 4,
    borderColor: "#FFFFFF",
    shadowColor: "#FFD93D",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 10,
  },
  tileSuccess: {
    backgroundColor: "#4CAF50",
    borderWidth: 4,
    borderColor: "#FFFFFF",
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 12,
  },
  audioIndicator: { position: "absolute", top: 4, right: 4, backgroundColor: "rgba(0, 0, 0, 0.4)", borderRadius: 20 },
  tileText: { fontWeight: "800" as const, color: "#FFFFFF" },
  mergedContainer: { alignItems: "center", justifyContent: "center" },
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
  wordEmoji: { marginBottom: 20 },
  wordText: { fontWeight: "800" as const, color: "#1A1A1A" },
  feedbackContainer: { position: "absolute", alignSelf: "center", backgroundColor: "#E8F5E9", padding: 20, borderRadius: 20, alignItems: "center", minWidth: 200 },
  feedbackEmoji: { marginBottom: 12 },
  feedbackText: { fontWeight: "700" as const, textAlign: "center", color: "#333" },
  flashOverlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000 },
});
