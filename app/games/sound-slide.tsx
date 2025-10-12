import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Platform,
  PanResponder,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
  interpolateColor,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { SAMPLE_LESSONS } from "@/constants/curriculum-data";
import { speakText } from "@/utils/audio";
import { Volume2 } from "lucide-react-native";
import { Bodies, Body, Engine, SAT, Composite } from "matter-js";

export default function SoundSlideScreen() {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
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
  const [isPlayingOnset, setIsPlayingOnset] = useState<boolean>(false);
  const [isPlayingRime, setIsPlayingRime] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const audioLoopRef = useRef<boolean>(true);
  const isCorrectAnswerGiven = useRef<boolean>(false);

  const onsetX = useSharedValue(0);
  const onsetY = useSharedValue(0);
  const onsetScale = useSharedValue(1);
  const rimeScale = useSharedValue(1);
  const flash = useSharedValue(0);

  const onsetLayoutRef = useRef<{ x: number; y: number; width: number; height: number } | null>(null);
  const rimeLayoutRef = useRef<{ x: number; y: number; width: number; height: number } | null>(null);
  const rimeZoneLayout = useRef<{ pageX: number; pageY: number; width: number; height: number } | null>(null);
  const rimeRef = useRef<View>(null);
  const onsetRef = useRef<View>(null);
  const lastDragRef = useRef<{ dx: number; dy: number; pageX: number; pageY: number }>({ dx: 0, dy: 0, pageX: 0, pageY: 0 });

  const engineRef = useRef<any | null>(null);
  const onsetBodyRef = useRef<any | null>(null);
  const rimeBodyRef = useRef<any | null>(null);

  useEffect(() => {
    if (!exerciseData) return;

    onsetLayoutRef.current = null;
    rimeLayoutRef.current = null;
    audioLoopRef.current = true;
    isCorrectAnswerGiven.current = false;
    setStage("initial");
    setShowFeedback(false);
    setShowSuccess(false);

    onsetX.value = 0;
    onsetY.value = 0;
    onsetScale.value = 1;
    rimeScale.value = 1;

    rimeZoneLayout.current = null;

    const engine = Engine.create();
    engineRef.current = engine;
    // Bodies will be created when layouts are known

    const playInitialFeedback = async () => {
      flash.value = withTiming(1, { duration: 200 }, () => {
        flash.value = withTiming(0, { duration: 200 });
      });

      if (Platform.OS !== "web") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
    };

    const playAudioLoop = async () => {
      await playInitialFeedback();

      while (audioLoopRef.current && !isCorrectAnswerGiven.current) {
        setIsPlayingOnset(true);
        await speakText(exerciseData.onset, { usePhoneme: true });
        setIsPlayingOnset(false);
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (!audioLoopRef.current || isCorrectAnswerGiven.current) break;

        setIsPlayingRime(true);
        await speakText(exerciseData.rime, { usePhoneme: false });
        setIsPlayingRime(false);
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
    };

    playAudioLoop();

    return () => {
      audioLoopRef.current = false;
      engineRef.current = null;
      onsetBodyRef.current = null;
      rimeBodyRef.current = null;
    };
  }, [exerciseIndex, exerciseData, onsetX, onsetY, onsetScale, rimeScale, flash]);

  useEffect(() => {
    requestAnimationFrame(() => {
      try {
        rimeRef.current?.measureInWindow((pageX, pageY, w, h) => {
          rimeZoneLayout.current = { pageX, pageY, width: w, height: h };
          console.log('[SoundSlide] Re-measured rime drop zone on dimension change', rimeZoneLayout.current);
          const engine = engineRef.current;
          if (engine) {
            const cx = pageX + w / 2;
            const cy = pageY + h / 2;
            if (!rimeBodyRef.current) {
              rimeBodyRef.current = Bodies.rectangle(cx, cy, w, h, { isStatic: true, label: 'rime' });
              Composite.add(engine.world, rimeBodyRef.current);
            } else {
              Body.setPosition(rimeBodyRef.current, { x: cx, y: cy });
            }
          }
        });
      } catch (e) {
        console.log('[SoundSlide] measureInWindow error on dimension effect', e);
      }
    });
  }, [width, height]);

  const handleSuccessJS = () => {
    isCorrectAnswerGiven.current = true;
    audioLoopRef.current = false;
    setIsPlayingOnset(false);
    setIsPlayingRime(false);
    setShowSuccess(true);

    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    speakText(exerciseData?.word || "", { usePhoneme: false, rate: 0.7 });

    onsetX.value = withSpring(width * 0.25);
    onsetY.value = withSpring(0);
    onsetScale.value = withSpring(1);
    rimeScale.value = withTiming(1.1, { duration: 200 }, () => {
      rimeScale.value = withTiming(1, { duration: 200 });
    });

    setTimeout(() => {
      setStage("merged");
      setShowFeedback(true);
    }, 800);

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
    }, 3000);
  };

  const resetOnsetJS = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onsetX.value = withSpring(0);
    onsetY.value = withSpring(0);
    onsetScale.value = withSpring(1);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => stage === "initial",
      onMoveShouldSetPanResponder: () => stage === "initial",
      onPanResponderGrant: () => {
        console.log('[SoundSlide] Pan responder grant - starting drag');
        if (Platform.OS !== "web") {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        onsetScale.value = withSpring(1.1);
      },
      onPanResponderMove: (evt, gestureState) => {
        const movePageX = (evt?.nativeEvent as any)?.pageX ?? 0;
        const movePageY = (evt?.nativeEvent as any)?.pageY ?? 0;
        lastDragRef.current = { dx: gestureState.dx, dy: gestureState.dy, pageX: movePageX, pageY: movePageY };
        onsetX.value = gestureState.dx;
        onsetY.value = gestureState.dy;

        const engine = engineRef.current;
        const onsetBody = onsetBodyRef.current;
        if (engine && onsetBody && onsetLayoutRef.current) {
          const baseLeft = (onsetLayoutRef.current.x ?? 0) + (onsetLayoutRef.current.width ?? 0) / 2;
          const baseTop = (onsetLayoutRef.current.y ?? 0) + (onsetLayoutRef.current.height ?? 0) / 2;
          Body.setPosition(onsetBody, { x: baseLeft + gestureState.dx, y: baseTop + gestureState.dy });
          Engine.update(engine, 16);

          const rimeBody = rimeBodyRef.current;
          if (rimeBody) {
            const sat = SAT.collides(onsetBody as any, rimeBody as any) as { collided?: boolean } | null;
            const hovering = !!(sat?.collided === true);
            if (!sat) {
              console.log('[SoundSlide] SAT.collides returned null during move');
            }
            rimeScale.value = withTiming(hovering ? 1.05 : 1, { duration: 120 });
          }
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        const engine = engineRef.current;
        const onsetBody = onsetBodyRef.current;
        const rimeBody = rimeBodyRef.current;

        if (!engine || !onsetBody || !rimeBody || !onsetLayoutRef.current) {
          runOnJS(resetOnsetJS)();
          return;
        }

        const baseLeft = (onsetLayoutRef.current.x ?? 0) + (onsetLayoutRef.current.width ?? 0) / 2;
        const baseTop = (onsetLayoutRef.current.y ?? 0) + (onsetLayoutRef.current.height ?? 0) / 2;
        Body.setPosition(onsetBody, { x: baseLeft + gestureState.dx, y: baseTop + gestureState.dy });
        Engine.update(engine, 16);

        const sat = SAT.collides(onsetBody as any, rimeBody as any) as { collided?: boolean } | null;
        const didCollide = !!(sat?.collided === true);
        if (!sat) {
          console.log('[SoundSlide] SAT.collides returned null on release');
        }
        if (didCollide) {
          runOnJS(handleSuccessJS)();
        } else {
          runOnJS(resetOnsetJS)();
        }
      },
    })
  ).current;

  const flashAnimatedStyle = useAnimatedStyle(() => {
    const bg = interpolateColor(
      flash.value,
      [0, 1],
      ['rgba(255,211,61,0)', 'rgba(255,211,61,0.3)']
    );
    return { backgroundColor: bg } as const;
  }, [flash]);

  const isLandscape = width > height;
  const tileSize = isLandscape ? 80 : 120;
  const spacing = isLandscape ? width * 0.15 : width * 0.1;

  const onsetAnimatedStyle = useAnimatedStyle(() => ({
    width: tileSize,
    height: tileSize,
    borderRadius: tileSize * 0.2,
    transform: [
      { translateX: onsetX.value },
      { translateY: onsetY.value },
      { scale: onsetScale.value },
    ],
  }), [tileSize, onsetX, onsetY, onsetScale]);

  const rimeAnimatedStyle = useAnimatedStyle(() => ({
    width: tileSize,
    height: tileSize,
    borderRadius: tileSize * 0.2,
    transform: [{ scale: rimeScale.value }],
  }), [tileSize, rimeScale]);

  return (
    <View style={[styles.container, { paddingLeft: insets.left, paddingRight: insets.right, paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Animated.View 
        style={[styles.flashOverlay, flashAnimatedStyle]} 
        pointerEvents="none"
      />
      <View style={styles.header}>
        <Text style={[styles.progressText, { fontSize: isLandscape ? 12 : 14 }]}>
          Exercise {exerciseIndex + 1} of {lesson?.exercises.length || 0}
        </Text>
        <Text style={[styles.instructionText, { fontSize: isLandscape ? 16 : 20, marginTop: 4 }]}>
          Drag the sounds together to make a word!
        </Text>
      </View>

      <View style={styles.gameArea}>
        {stage === "initial" && (
          <>
            <View key={`tiles-${exerciseIndex}`} style={styles.tilesRow}>
              <View style={styles.tileWrapper}>
                <Text style={[styles.guideText, { fontSize: isLandscape ? 12 : 16, marginBottom: 8 }]}>👆 Drag me →</Text>
                <Animated.View
                  style={[
                    styles.onsetTile,
                    isPlayingOnset ? styles.tilePlaying : null,
                    showSuccess ? styles.tileSuccess : null,
                    onsetAnimatedStyle,
                  ]}
                  testID="onset-tile"
                  ref={onsetRef}
                  {...panResponder.panHandlers}
                  onLayout={(event) => {
                    const { x, y, width: w, height: h } = event.nativeEvent.layout;
                    onsetLayoutRef.current = { x, y, width: w, height: h };
                    console.log('[SoundSlide] Onset layout (onLayout):', { x, y, width: w, height: h });
                    const engine = engineRef.current;
                    if (engine) {
                      const cx = x + w / 2;
                      const cy = y + h / 2;
                      if (!onsetBodyRef.current) {
                        onsetBodyRef.current = Bodies.rectangle(cx, cy, w, h, { isStatic: false, label: 'onset' });
                        Composite.add(engine.world, onsetBodyRef.current);
                      } else {
                        Body.setPosition(onsetBodyRef.current, { x: cx, y: cy });
                      }
                    }
                  }}
                >
                  <Text style={[styles.tileText, { fontSize: tileSize * 0.4 }]}>{exerciseData?.onset}</Text>
                  {isPlayingOnset && (
                    <View style={[styles.audioIndicator, { padding: Math.max(4, tileSize * 0.08) }]}>
                      <Volume2 size={Math.max(16, tileSize * 0.25)} color="#FFFFFF" />
                    </View>
                  )}
                </Animated.View>
              </View>

              <View style={{ width: spacing }} />

              <View style={styles.tileWrapper}>
                <Animated.View
                  testID="rime-tile"
                  style={[
                    styles.rimeTile,
                    isPlayingRime ? styles.tilePlaying : null,
                    showSuccess ? styles.tileSuccess : null,
                    rimeAnimatedStyle,
                  ]}
                  ref={rimeRef}
                  onLayout={() => {
                    try {
                      requestAnimationFrame(() => {
                        rimeRef.current?.measureInWindow((pageX, pageY, w, h) => {
                          rimeZoneLayout.current = { pageX, pageY, width: w, height: h };
                          console.log('[SoundSlide] Rime drop zone layout (absolute):', rimeZoneLayout.current);
                          const engine = engineRef.current;
                          if (engine) {
                            const cx = pageX + w / 2;
                            const cy = pageY + h / 2;
                            if (!rimeBodyRef.current) {
                              rimeBodyRef.current = Bodies.rectangle(cx, cy, w, h, { isStatic: true, label: 'rime' });
                              Composite.add(engine.world, rimeBodyRef.current);
                            } else {
                              Body.setPosition(rimeBodyRef.current, { x: cx, y: cy });
                            }
                          }
                        });
                      });
                    } catch (e) {
                      console.log('[SoundSlide] measureInWindow error', e);
                    }
                  }}
                >
                  <Text style={[styles.tileText, { fontSize: tileSize * 0.4 }]}>{exerciseData?.rime}</Text>
                  {isPlayingRime && (
                    <View style={[styles.audioIndicator, { padding: Math.max(4, tileSize * 0.08) }]}>
                      <Volume2 size={Math.max(16, tileSize * 0.25)} color="#FFFFFF" />
                    </View>
                  )}
                </Animated.View>
              </View>
            </View>
          </>
        )}

        {stage === "merged" && (
          <View style={styles.mergedContainer}>
            <View style={[styles.wordCard, { padding: isLandscape ? 30 : 40 }]}>
              <Text style={[styles.wordEmoji, { fontSize: isLandscape ? 70 : 100 }]}>{exerciseData?.image}</Text>
              <Text style={[styles.wordText, { fontSize: isLandscape ? 40 : 56 }]}>{exerciseData?.word}</Text>
            </View>
          </View>
        )}
      </View>

      {showFeedback && (
        <View style={[styles.feedbackContainer, { bottom: isLandscape ? 40 : 80 }]}>
          <Text style={[styles.feedbackEmoji, { fontSize: isLandscape ? 50 : 72 }]}>🎉</Text>
          <Text style={[styles.feedbackText, { fontSize: isLandscape ? 24 : 32 }]}>Great job!</Text>
        </View>
      )}
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
    paddingHorizontal: 20,
    alignItems: "center",
  },
  instructionText: {
    fontWeight: "700" as const,
    color: "#FFD93D",
    textAlign: "center",
    marginBottom: 8,
  },
  progressText: {
    color: "#999",
    fontWeight: "600" as const,
  },
  gameArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
  audioIndicator: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 20,
  },
  tileText: {
    fontWeight: "800" as const,
    color: "#FFFFFF",
  },
  tilesRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tileWrapper: {
    alignItems: "center",
  },
  guideText: {
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
  wordText: {
    fontWeight: "800" as const,
    color: "#1A1A1A",
  },
  feedbackContainer: {
    position: "absolute",
    alignSelf: "center",
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
