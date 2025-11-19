import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Platform,
  Pressable,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, router } from "expo-router";
import { SAMPLE_LESSONS } from "@/constants/curriculum-data";
import { speakText } from "@/utils/audio";
import { Volume2 } from "lucide-react-native";
import Matter from "matter-js";
import { GameLayout } from "@/components/GameLayout";
import { COLORS, SPACING, TYPOGRAPHY } from "@/constants/theme";
import { SoundSlideData } from "@/types/curriculum";

export default function SoundSlideScreen() {
  const { width, height } = useWindowDimensions();
  const params = useLocalSearchParams();
  const lessonNumber = parseInt(params.lesson as string);
  const exerciseIndex = parseInt(params.exercise as string);

  const lesson = SAMPLE_LESSONS.find((l) => l.lesson_number === lessonNumber);
  const exercise = lesson?.exercises[exerciseIndex];
  const exerciseData = exercise?.data as SoundSlideData | undefined;

  const [stage, setStage] = useState<"drag" | "merged">("drag");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isPlayingOnset, setIsPlayingOnset] = useState(false);
  const [isPlayingRime, setIsPlayingRime] = useState(false);
  
  // Shared Values for Reanimated
  const onsetX = useSharedValue(0);
  const onsetY = useSharedValue(0);
  const rimeX = useSharedValue(0);
  const rimeY = useSharedValue(0);
  const rimeScale = useSharedValue(1);

  // Refs
  const engineRef = useRef<Matter.Engine | null>(null);
  const onsetBodyRef = useRef<Matter.Body | null>(null);
  const rimeBodyRef = useRef<Matter.Body | null>(null);
  const requestRef = useRef<number | null>(null);
  const boardLayout = useRef<{ width: number, height: number } | null>(null);
  const isDragging = useRef(false);
  const audioLoopRef = useRef(true);

  const isLandscape = width > height;
  const tileSize = isLandscape ? Math.min(height * 0.25, 120) : width * 0.22;

  // Initialize Physics World
  const initPhysics = useCallback((w: number, h: number) => {
      if (engineRef.current) {
          Matter.World.clear(engineRef.current.world, false);
          Matter.Engine.clear(engineRef.current);
      }

      const engine = Matter.Engine.create();
      engine.gravity.y = 0; // No gravity
      engineRef.current = engine;

      // Walls
      const wallThick = 100;
      const walls = [
          Matter.Bodies.rectangle(w/2, -wallThick/2, w, wallThick, { isStatic: true }), // Top
          Matter.Bodies.rectangle(w/2, h + wallThick/2, w, wallThick, { isStatic: true }), // Bottom
          Matter.Bodies.rectangle(-wallThick/2, h/2, wallThick, h, { isStatic: true }), // Left
          Matter.Bodies.rectangle(w + wallThick/2, h/2, wallThick, h, { isStatic: true }), // Right
      ];
      Matter.World.add(engine.world, walls);

      // Bodies
      const radius = tileSize / 2;
      
      // Onset (Left side)
      const onset = Matter.Bodies.circle(w * 0.25, h * 0.5, radius, {
          label: 'onset',
          restitution: 0.5,
          frictionAir: 0.1, // High friction to stop quickly
      });
      onsetBodyRef.current = onset;

      // Rime (Right side)
      const rime = Matter.Bodies.circle(w * 0.75, h * 0.5, radius, {
          label: 'rime',
          isStatic: true, // Target is static
          isSensor: true, // Sensor so we can detect overlap without bouncing hard
      });
      rimeBodyRef.current = rime;

      Matter.World.add(engine.world, [onset, rime]);

      // Sync initial positions
      onsetX.value = onset.position.x;
      onsetY.value = onset.position.y;
      rimeX.value = rime.position.x;
      rimeY.value = rime.position.y;

      // Start Loop
      const loop = () => {
          Matter.Engine.update(engine, 1000 / 60);
          
          if (onsetBodyRef.current) {
              onsetX.value = onsetBodyRef.current.position.x;
              onsetY.value = onsetBodyRef.current.position.y;
              
              // Check collision manually since Rime is sensor or static
              if (stage === 'drag' && rimeBodyRef.current) {
                  const dx = onsetBodyRef.current.position.x - rimeBodyRef.current.position.x;
                  const dy = onsetBodyRef.current.position.y - rimeBodyRef.current.position.y;
                  const dist = Math.sqrt(dx*dx + dy*dy);
                  
                  if (dist < tileSize * 0.6) { // Close enough to snap
                      handleMerge();
                  }
              }
          }

          requestRef.current = requestAnimationFrame(loop);
      };
      loop();

  }, [tileSize, stage]);

  const handleMerge = () => {
      if (stage !== 'drag') return;
      
      setStage('merged');
      audioLoopRef.current = false;
      
      if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      // Snap onset to rime
      if (onsetBodyRef.current && rimeBodyRef.current) {
          Matter.Body.setPosition(onsetBodyRef.current, rimeBodyRef.current.position);
      }
      
      // Feedback animation
      rimeScale.value = withSpring(1.2, {}, () => {
          rimeScale.value = withSpring(1);
      });

      speakText(exerciseData?.word || "");
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
  };

  // Clean up
  useEffect(() => {
      return () => {
          if (requestRef.current) cancelAnimationFrame(requestRef.current);
          if (engineRef.current) {
              Matter.World.clear(engineRef.current.world, false);
              Matter.Engine.clear(engineRef.current);
          }
      };
  }, []);

  // Audio Loop
  useEffect(() => {
    if (!exerciseData) return;
    audioLoopRef.current = true;

    const playLoop = async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        while (audioLoopRef.current && stage === 'drag') {
            setIsPlayingOnset(true);
            await speakText(exerciseData.onset, { usePhoneme: true });
            setIsPlayingOnset(false);
            
            await new Promise(resolve => setTimeout(resolve, 500));
            if (!audioLoopRef.current) break;

            setIsPlayingRime(true);
            await speakText(exerciseData.rime, { usePhoneme: false });
            setIsPlayingRime(false);

            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    };
    playLoop();
    return () => { audioLoopRef.current = false; };
  }, [exerciseIndex, exerciseData, stage]);


  const onLayoutBoard = (e: any) => {
      const { width, height } = e.nativeEvent.layout;
      boardLayout.current = { width, height };
      initPhysics(width, height);
  };

  // Touch Handling
  const onTouchStart = (e: any) => {
      if (stage !== 'drag') return;
      // Naive check if touch is near onset
      const { locationX, locationY } = e.nativeEvent;
      if (onsetBodyRef.current) {
          const dx = locationX - onsetBodyRef.current.position.x;
          const dy = locationY - onsetBodyRef.current.position.y;
          if (Math.sqrt(dx*dx + dy*dy) < tileSize) {
              isDragging.current = true;
              // Kinematic control
              Matter.Body.setStatic(onsetBodyRef.current, true); 
          }
      }
  };

  const onTouchMove = (e: any) => {
      if (!isDragging.current || !onsetBodyRef.current) return;
      const { locationX, locationY } = e.nativeEvent;
      
      // Direct position set for instant drag
      Matter.Body.setPosition(onsetBodyRef.current, { x: locationX, y: locationY });
  };

  const onTouchEnd = (e: any) => {
      if (!isDragging.current || !onsetBodyRef.current) return;
      isDragging.current = false;
      // Release control
      Matter.Body.setStatic(onsetBodyRef.current, false);
      
      // Add small velocity towards rime? Or just let friction stop it.
      // Let's just let it drift a bit.
  };

  // Animated Styles
  const onsetStyle = useAnimatedStyle(() => ({
      transform: [
          { translateX: onsetX.value - tileSize/2 },
          { translateY: onsetY.value - tileSize/2 },
          { scale: 1 } // Add pulse if playing?
      ]
  }));

  const rimeStyle = useAnimatedStyle(() => ({
      transform: [
          { translateX: rimeX.value - tileSize/2 },
          { translateY: rimeY.value - tileSize/2 },
          { scale: rimeScale.value }
      ]
  }));

  if (!exerciseData) {
    return (
      <GameLayout>
        <Text style={{ color: COLORS.error }}>Exercise not found</Text>
      </GameLayout>
    );
  }

  return (
    <GameLayout
      instruction="Slide the sounds together"
      progress={`Exercise ${exerciseIndex + 1} of ${lesson?.exercises.length || 0}`}
      primaryColor={COLORS.soundSlide.primary}
      backgroundColor={COLORS.soundSlide.background}
    >
        <View 
            style={styles.boardContainer}
            onLayout={onLayoutBoard}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
             {/* Rime (Target) */}
             {stage === 'drag' && (
                 <Animated.View style={[styles.tile, styles.rimeTile, { width: tileSize, height: tileSize, borderRadius: tileSize/2 }, rimeStyle]}>
                     <Text style={styles.tileText}>{exerciseData.rime}</Text>
                 </Animated.View>
             )}

             {/* Onset (Draggable) */}
             {stage === 'drag' && (
                 <Animated.View style={[styles.tile, styles.onsetTile, { width: tileSize, height: tileSize, borderRadius: tileSize/2 }, onsetStyle]}>
                     <Text style={styles.tileText}>{exerciseData.onset}</Text>
                 </Animated.View>
             )}

             {/* Merged State */}
             {stage === 'merged' && (
                 <View style={[styles.mergedCard, { padding: tileSize * 0.5, borderRadius: 30 }]}>
                     <Text style={{ fontSize: tileSize }}>{exerciseData.image}</Text>
                     <Text style={[styles.wordText, { fontSize: tileSize * 0.5 }]}>{exerciseData.word}</Text>
                 </View>
             )}

             {showFeedback && (
                 <View style={styles.feedbackBadge}>
                     <Text style={styles.feedbackText}>Excellent!</Text>
                 </View>
             )}
        </View>
    </GameLayout>
  );
}

const styles = StyleSheet.create({
  boardContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  tile: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  onsetTile: {
    backgroundColor: COLORS.soundSlide.accent,
  },
  rimeTile: {
    backgroundColor: COLORS.soundSlide.primary,
  },
  tileText: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: 'bold',
  },
  mergedCard: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -150 }, { translateY: -150 }], // Centering trick hardcoded? No.
    // We should center properly using flex or math.
    // But here 'merged' just replaces the tiles.
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    // Flex centering
    width: 300, 
    height: 300,
    marginTop: -150,
    marginLeft: -150,
  },
  wordText: {
    marginTop: SPACING.s,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  feedbackBadge: {
      position: 'absolute',
      bottom: 40,
      alignSelf: 'center',
      backgroundColor: COLORS.success,
      paddingHorizontal: SPACING.l,
      paddingVertical: SPACING.m,
      borderRadius: 30,
  },
  feedbackText: {
      color: COLORS.white,
      fontSize: 24,
      fontWeight: 'bold',
  }
});