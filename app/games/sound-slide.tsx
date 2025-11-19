import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Platform,
  Animated,
  PanResponder,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, router } from "expo-router";
import { SAMPLE_LESSONS } from "@/constants/curriculum-data";
import { speakText, stopSpeaking } from "@/utils/audio";
import { GameLayout } from "@/components/GameLayout";
import { COLORS, SPACING } from "@/constants/theme";
import { SoundSlideData } from "@/types/curriculum";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";

export default function SoundSlideScreen() {
  const layout = useResponsiveLayout();
  const { width, height, isLandscape } = layout;
  
  const params = useLocalSearchParams();
  const lessonNumber = parseInt(params.lesson as string);
  const exerciseIndex = parseInt(params.exercise as string);

  const lesson = SAMPLE_LESSONS.find((l) => l.lesson_number === lessonNumber);
  const exercise = lesson?.exercises[exerciseIndex];
  const exerciseData = exercise?.data as SoundSlideData | undefined;

  const [stage, setStage] = useState<"drag" | "merged">("drag");
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Layout Dimensions
  const tileSize = layout.tileSize;
  const trackWidth = layout.soundSlide.trackWidth;
  
  // Standard Animated Values
    const pan = useRef(new Animated.ValueXY()).current;
    const scale = useRef(new Animated.Value(1)).current;
  
    // Audio State
    const audioLoopRef = React.useRef(true);
    
    // ... (rest of useEffects same)
    useEffect(() => {
      if (!exerciseData) return;
      console.log("[SoundSlide] Resetting for new exercise");
      audioLoopRef.current = true;
      setStage("drag");
      setShowFeedback(false);
      pan.setValue({ x: 0, y: 0 });
      scale.setValue(1);
  
      const playLoop = async () => {
          await new Promise(resolve => setTimeout(resolve, 500));
          // Rely on audioLoopRef for loop control, not stage state dependency
          while (audioLoopRef.current) {
              console.log("[SoundSlide] Audio loop: Onset");
              await speakText(exerciseData.onset, { usePhoneme: true });
              await new Promise(resolve => setTimeout(resolve, 1000));
              if (!audioLoopRef.current) break;
  
              console.log("[SoundSlide] Audio loop: Rime");
              await speakText(exerciseData.rime, { usePhoneme: false });
              await new Promise(resolve => setTimeout(resolve, 2500));
          }
      };
      playLoop();
    }, [exerciseIndex, exerciseData]); // Removed stage from dependencies
  
    const handleSuccess = () => {
      console.log("[SoundSlide] Success!");
      setStage("merged");
      audioLoopRef.current = false;
      stopSpeaking();
      
      if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  
      speakText(exerciseData?.word || "");
      setShowFeedback(true);
  
      setTimeout(() => {
          const nextExerciseIndex = exerciseIndex + 1;
          if (lesson && nextExerciseIndex < lesson.exercises.length) {
            // Use setParams to update the exercise index without unmounting the screen
            router.setParams({ 
              lesson: lessonNumber, 
              exercise: nextExerciseIndex 
            });
          } else {
            router.back();
          }
      }, 2500);
    };
  
    const panResponder = React.useMemo(() => 
      PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onMoveShouldSetPanResponder: () => true,
          onPanResponderGrant: () => {
            console.log("[SoundSlide] Pan Grant");
            pan.setOffset({
              x: (pan.x as any)._value,
              y: (pan.y as any)._value
            });
            pan.setValue({ x: 0, y: 0 });
            Animated.spring(scale, { toValue: 1.1, useNativeDriver: false }).start();
          },
          onPanResponderMove: Animated.event(
            [null, { dx: pan.x, dy: pan.y }],
            { useNativeDriver: false }
          ),
          onPanResponderRelease: (e, gestureState) => {
            console.log("[SoundSlide] Pan Release");
            pan.flattenOffset();
            Animated.spring(scale, { toValue: 1, useNativeDriver: false }).start();
    
            // Current position relative to start (0,0)
            const currentX = (pan.x as any)._value;
            const currentY = (pan.y as any)._value;
    
            // Target is at (trackWidth, 0)
            const distanceX = Math.abs(currentX - trackWidth);
            const distanceY = Math.abs(currentY);
            const threshold = tileSize * 0.8; 
    
            console.log("[SoundSlide] Release Check:", { currentX, trackWidth, distanceX, distanceY, threshold });
    
            if (distanceX < threshold && distanceY < threshold) {
               // Snap to target and trigger success immediately
               // We don't wait for callback to ensure responsiveness
               handleSuccess();
               Animated.spring(pan, {
                   toValue: { x: trackWidth, y: 0 },
                   useNativeDriver: false
               }).start();
            } else {
               // Spring back
               console.log("[SoundSlide] Spring back");
               Animated.spring(pan, {
                   toValue: { x: 0, y: 0 },
                   useNativeDriver: false
               }).start();
            }
          }
        }),
        [trackWidth, tileSize, handleSuccess]
      ).panHandlers;  
  
    if (!exerciseData) {
       return <GameLayout><Text style={{color: COLORS.error}}>No Data</Text></GameLayout>;
    }
  
    return (
      <GameLayout
        instruction="Slide the sounds together"
        progress={`Exercise ${exerciseIndex + 1} of ${lesson?.exercises.length || 0}`}
        primaryColor={COLORS.soundSlide.primary}
        backgroundColor={COLORS.soundSlide.background}
      >
        {/* Main Container: Centers the game area */}
        <View style={styles.container}>
          
          {/* Track Container: Holds the track and tiles. 
              Its width determines the game width. 
              Everything inside is relative to this container. 
          */}
          <View style={{ width: trackWidth, height: tileSize, justifyContent: 'center' }}>
              
              {/* Visual Track Line */}
              <View style={[styles.track, { width: trackWidth, height: 6, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 3 }]} />
  
              {/* Start Position Placeholder (Onset) - Left aligned (x=0) */}
              <View style={[styles.placeholder, { width: tileSize, height: tileSize, left: 0 }]} />
              
              {/* Target Position (Rime) - Right aligned (x=trackWidth) */}
              {/* We align it so its center is at trackWidth. 
                  So left = trackWidth - tileSize/2? 
                  No, if we drag from 0 to trackWidth, we want the centers to align.
                  Let's say Draggable starts at 0 (centered on 0?).
                  If Draggable is left: 0, its center is at tileSize/2.
                  If Target is left: trackWidth, its center is at trackWidth + tileSize/2.
                  Then drag distance is trackWidth.
                  CORRECT: 
                  Start Item: left: 0
                  End Item: left: trackWidth
                  Drag Distance: trackWidth.
              */}
              <View style={[styles.targetTile, { width: tileSize, height: tileSize, left: trackWidth }]}>
                  <Text style={styles.tileText}>{exerciseData.rime}</Text>
              </View>
  
                          {/* Draggable Onset Tile */}
                          {stage === 'drag' && (
                              <Animated.View 
                                {...panResponder}
                                style={[
                                    styles.tile, 
                                    styles.onsetTile, 
                                    { 
                                        width: tileSize, 
                                        height: tileSize, 
                                        left: 0, // Start at 0
                                        transform: [
                                            { translateX: pan.x }, 
                                            { translateY: pan.y },
                                            { scale: scale }
                                        ],
                                        zIndex: 10
                                    }
                                ]}
                              >
                                <Text style={styles.tileText}>{exerciseData.onset}</Text>
                              </Animated.View>
                          )}
              
              {/* Success Card - Centered roughly between or at end */}
              {stage === 'merged' && (
                  <View 
                      style={[
                          styles.mergedCard, 
                          { 
                              padding: tileSize * 0.5, 
                              borderRadius: 30, 
                              // Center it relative to the track?
                              // left: trackWidth/2 - (cardWidth/2)? 
                              // Hard to know card width. Let's use center alignment via flex overlay if possible?
                              // Or just absolute centering.
                              alignSelf: 'center', 
                              zIndex: 20
                          }
                      ]}
                  >
                      <Text style={{ fontSize: tileSize }}>{exerciseData.image}</Text>
                      <Text style={[styles.wordText, { fontSize: tileSize * 0.5 }]}>{exerciseData.word}</Text>
                  </View>
              )}
  
          </View>
  
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
    container: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    track: {
        position: 'absolute',
        // Track line should go from center of start to center of end
        // Start center: tileSize/2
        // End center: trackWidth + tileSize/2
        // Length = trackWidth
        // Left = tileSize/2
        left: 0, // We can just span the whole visual distance?
        // Actually let's make it start from center of tile 1 to center of tile 2
        // left: tileSize/2, width: trackWidth
    },
    placeholder: {
        position: 'absolute',
        // borderStyle: 'dashed', borderWidth: 2, borderColor: '#ddd', borderRadius: 999
    },
    targetTile: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.soundSlide.primary,
        borderRadius: 999, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    tile: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 999, 
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 8,
    },
    onsetTile: {
      backgroundColor: COLORS.soundSlide.accent,
    },
    tileText: {
      color: COLORS.white,
      fontSize: 32,
      fontWeight: 'bold',
    },
    mergedCard: {
      position: 'absolute', 
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.white,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 10,
      minWidth: 250,
      // Center visually in the track container
      left: '10%', // Approximate centering if we don't know width
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