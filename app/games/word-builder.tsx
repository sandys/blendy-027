import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  useWindowDimensions,
  Platform,
  LayoutRectangle,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, router } from "expo-router";
import { SAMPLE_LESSONS } from "@/constants/curriculum-data";
import { speakText } from "@/utils/audio";
import { Volume2, CheckCircle } from "lucide-react-native";
import { GameLayout } from "@/components/GameLayout";
import { COLORS, SPACING, TYPOGRAPHY } from "@/constants/theme";
import { WordBuilderData } from "@/types/curriculum";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";

interface DraggableLetter {
  id: string;
  letter: string;
  pan: Animated.ValueXY;
  scale: Animated.Value;
  isPlaced: boolean;
}

export default function WordBuilderScreen() {
  const layout = useResponsiveLayout();
  const { width, height, isLandscape } = layout;
  
  const params = useLocalSearchParams();
  const lessonNumber = parseInt(params.lesson as string);
  const exerciseIndex = parseInt(params.exercise as string);

  const lesson = SAMPLE_LESSONS.find((l) => l.lesson_number === lessonNumber);
  const exercise = lesson?.exercises[exerciseIndex];
  const exerciseData = exercise?.data as WordBuilderData | undefined;

  const [letters, setLetters] = useState<DraggableLetter[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [blendedText, setBlendedText] = useState("");

  const dropZoneRef = useRef<View>(null);
  const audioLoopRef = useRef(true);

  useEffect(() => {
    if (!exerciseData) return;
    
    const newLetters = exerciseData.letters.map((l, i) => ({
      id: `${i}-${l}`,
      letter: l,
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1),
      isPlaced: false,
    }));
    setLetters(newLetters);
    setIsSuccess(false);
    setBlendedText("");
    audioLoopRef.current = true;

    const playIntro = async () => {
       await new Promise(resolve => setTimeout(resolve, 500));
       // Speak individual sounds
       for (const l of exerciseData.letters) {
          if (!audioLoopRef.current) break;
          await speakText(l, { usePhoneme: true });
          await new Promise(resolve => setTimeout(resolve, 500));
       }
    };
    playIntro();

    return () => {
      audioLoopRef.current = false;
    };
  }, [exerciseIndex, exerciseData]);

  if (!exerciseData) {
     return (
      <GameLayout>
        <Text style={{ color: COLORS.error }}>Exercise not found</Text>
      </GameLayout>
    );
  }

  const createPanResponder = (index: number) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        Animated.spring(letters[index].scale, { toValue: 1.2, useNativeDriver: false }).start();
        letters[index].pan.setOffset({
          x: (letters[index].pan.x as any)._value,
          y: (letters[index].pan.y as any)._value,
        });
        letters[index].pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: letters[index].pan.x, dy: letters[index].pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gesture) => {
        letters[index].pan.flattenOffset();
        Animated.spring(letters[index].scale, { toValue: 1, useNativeDriver: false }).start();

        // Measure drop zone on release for accuracy
        dropZoneRef.current?.measure((x, y, width, height, pageX, pageY) => {
             // gesture.moveX/Y are reliable on native
             const releaseX = gesture.moveX;
             const releaseY = gesture.moveY;

             if (
               releaseX >= pageX &&
               releaseX <= pageX + width &&
               releaseY >= pageY &&
               releaseY <= pageY + height
             ) {
               // Dropped!
               if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
               
               const updated = [...letters];
               updated[index].isPlaced = true;
               setLetters(updated);
               
               checkCompletion(updated);
             } else {
               // Return to start
               Animated.spring(letters[index].pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
             }
        });
      }
    });
  };

  const checkCompletion = (currentLetters: DraggableLetter[]) => {
    const placed = currentLetters.filter(l => l.isPlaced);
    
    // Speak partial blend
    const partial = placed.map(l => l.letter).join("");
    setBlendedText(partial);
    speakText(partial, { usePhoneme: false }); // Say as word part

    if (placed.length === currentLetters.length) {
      setIsSuccess(true);
      audioLoopRef.current = false;
      if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      // Speak full word
      speakText(exerciseData.word);

      setTimeout(() => {
          const nextExerciseIndex = exerciseIndex + 1;
          if (lesson && nextExerciseIndex < lesson.exercises.length) {
            router.setParams({
              lesson: lessonNumber,
              exercise: nextExerciseIndex,
            });
          } else {
            router.back();
          }
      }, 2500);
    }
  };

  // Styles
  const dropZoneWidth = layout.safeWidth * 0.5;
  const dropZoneHeight = layout.safeHeight * 0.25;
  const tileSize = layout.tileSize;

  return (
    <GameLayout
      instruction="Drag letters to build the word"
      progress={`Exercise ${exerciseIndex + 1} of ${lesson?.exercises.length || 0}`}
      primaryColor={COLORS.wordBuilder.primary}
      backgroundColor={COLORS.wordBuilder.background}
    >
       <View style={[styles.container, { flexDirection: isLandscape ? 'row' : 'column' }]}>
          
          {/* Left/Top: Drop Zone */}
          <View style={[styles.dropZoneSection, { flex: isLandscape ? 0.5 : 0.45 }]}>
             <View 
               ref={dropZoneRef}
               style={[
                 styles.dropZone,
                 { 
                   width: dropZoneWidth, 
                   height: dropZoneHeight,
                   borderColor: isSuccess ? COLORS.success : COLORS.wordBuilder.primary,
                   backgroundColor: isSuccess ? '#E8F5E9' : COLORS.white,
                 }
               ]}
             >
                 {/* Show placed letters inside drop zone */}
                 <View style={styles.placedLettersRow}>
                    {letters.filter(l => l.isPlaced).map((l, i) => (
                        <View key={`placed-${i}`} style={[styles.placedTile, { width: tileSize, height: tileSize }]}>
                            <Text style={styles.tileText}>{l.letter}</Text>
                        </View>
                    ))}
                    {letters.every(l => !l.isPlaced) && (
                        <Text style={styles.placeholderText}>Drop Here</Text>
                    )}
                 </View>

                 {isSuccess && (
                    <View style={styles.successBadge}>
                        <CheckCircle size={32} color={COLORS.success} />
                        <Text style={styles.successText}>{exerciseData.word}</Text>
                    </View>
                 )}
             </View>
          </View>

          {/* Right/Bottom: Letter Bank */}
          <View style={[styles.bankSection, { flex: isLandscape ? 0.5 : 0.55 }]}>
             <View style={styles.bankRow}>
                 {letters.map((letter, index) => {
                    if (letter.isPlaced) {
                        // Placeholder to keep layout stable
                        return <View key={letter.id} style={{ width: tileSize, height: tileSize, margin: SPACING.s }} />;
                    }
                    
                    const panResponder = createPanResponder(index);
                    
                    return (
                        <Animated.View
                          key={letter.id}
                          {...panResponder.panHandlers}
                          style={[
                              styles.draggableTile,
                              {
                                  width: tileSize,
                                  height: tileSize,
                                  transform: [
                                      { translateX: letter.pan.x },
                                      { translateY: letter.pan.y },
                                      { scale: letter.scale }
                                  ],
                                  margin: SPACING.s,
                                  zIndex: 999, // Ensure on top while dragging
                              }
                          ]}
                        >
                            <Text style={styles.tileText}>{letter.letter}</Text>
                        </Animated.View>
                    )
                 })}
             </View>
          </View>

       </View>
    </GameLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropZoneSection: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  bankSection: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2, 
  },
  dropZone: {
    borderWidth: 4,
    borderStyle: 'dashed',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placedLettersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SPACING.s,
  },
  placedTile: {
    backgroundColor: COLORS.wordBuilder.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  draggableTile: {
    backgroundColor: COLORS.wordBuilder.accent,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  tileText: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: 'bold',
  },
  placeholderText: {
    color: COLORS.textLight,
    fontSize: 20,
    fontWeight: '600',
  },
  bankRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  successBadge: {
    position: 'absolute',
    bottom: -60,
    backgroundColor: COLORS.white,
    padding: SPACING.m,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.s,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  }
});