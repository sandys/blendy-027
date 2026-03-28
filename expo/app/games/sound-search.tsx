import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
  Platform,
  LayoutRectangle,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, router } from "expo-router";
import { Volume2 } from "lucide-react-native";
import { SAMPLE_LESSONS } from "@/constants/curriculum-data";
import { speakText } from "@/utils/audio";
import { GameLayout } from "@/components/GameLayout";
import { COLORS, SPACING, TYPOGRAPHY } from "@/constants/theme";
import { SoundSearchData } from "@/types/curriculum";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";

export default function SoundSearchScreen() {
  const layout = useResponsiveLayout();
  const { isLandscape } = layout;

  const params = useLocalSearchParams();
  const lessonNumber = parseInt(params.lesson as string);
  const exerciseIndex = parseInt(params.exercise as string);

  const [revealedWord, setRevealedWord] = useState<string | null>(null);
  const [flyingBubble, setFlyingBubble] = useState<{
    text: string;
    start: LayoutRectangle;
    end: LayoutRectangle;
  } | null>(null);
  
  const flyAnim = useRef(new Animated.Value(0)).current;
  const audioLoopRef = useRef<boolean>(true);

  // Layout capture using refs (safer than onLayout for dynamic measurement)
  const blankRef = useRef<View>(null);
  const choiceRefs = useRef<Array<View | null>>([]);

  const lesson = SAMPLE_LESSONS.find((l) => l.lesson_number === lessonNumber);
  const exercise = lesson?.exercises[exerciseIndex];
  const exerciseData = exercise?.data as SoundSearchData | undefined;

  useEffect(() => {
    if (!exerciseData) return;
    
    // Reset state
    setRevealedWord(null);
    setFlyingBubble(null);
    flyAnim.setValue(0);
    audioLoopRef.current = true;

    const playPrompt = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (audioLoopRef.current && exerciseData.prompt) {
         await speakText(exerciseData.prompt);
      } else if (audioLoopRef.current) {
         // Fallback
         await speakText(`What sound does ${exerciseData.word} start with?`);
      }
    };
    
    playPrompt();

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

  const handleChoicePress = (index: number) => {
    if (flyingBubble || revealedWord) return; // Block input

    const choice = exerciseData.choices[index];
    
    if (choice.isCorrect) {
      // Success
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      // Measure start and end positions dynamically using refs
      const startRef = choiceRefs.current[index];
      const endRef = blankRef.current;

      if (startRef && endRef) {
          startRef.measure((x, y, width, height, pageX, pageY) => {
              const startLayout = { x: pageX, y: pageY, width, height };
              
              endRef.measure((ex, ey, ewidth, eheight, ePageX, ePageY) => {
                  const endLayout = { x: ePageX, y: ePageY, width: ewidth, height: eheight };

                  setFlyingBubble({
                    text: choice.label,
                    start: startLayout,
                    end: endLayout,
                  });
          
                  Animated.timing(flyAnim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: false, 
                  }).start(() => {
                    setRevealedWord(exerciseData.word);
                    setFlyingBubble(null);
                    
                    // Play full word
                    speakText(exerciseData.word);
          
                    // Next level
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
                    }, 2000);
                  });
              });
          });
      } else {
        // Fallback if refs/measure fail
        setRevealedWord(exerciseData.word);
        speakText(exerciseData.word);
        setTimeout(router.back, 2000);
      }

    } else {
      // Error
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
      // Negative Feedback
      speakText("Not quite. Try again.");
    }
  };

  // Styles
  const bubbleSize = layout.tileSize;
  const imageSize = layout.cardSize;

  return (
    <GameLayout
      instruction={exerciseData.prompt || "Fill in the missing sound"}
      progress={`Exercise ${exerciseIndex + 1} of ${lesson?.exercises.length || 0}`}
      primaryColor={COLORS.soundSearch.primary}
      backgroundColor={COLORS.soundSearch.background}
    >
      <View style={[styles.container, { flexDirection: isLandscape ? 'row' : 'column' }]}>
        
        {/* Left: Word + Image */}
        <View style={[styles.targetSection, { flex: isLandscape ? 0.5 : 0.45 }]}>
          <Text style={{ fontSize: imageSize }}>{exerciseData.image}</Text>
          
          <View style={styles.wordRow}>
            {/* The Blank/Revealed Spot */}
            <View 
              ref={blankRef}
              style={[styles.blankSlot, { minWidth: bubbleSize * 0.8 }]}
              // We don't strictly need onLayout if we use measure on ref, but keeping it doesn't hurt
            >
              <Text style={[styles.wordText, { fontSize: 32 }]}>
                {revealedWord ? exerciseData.word : exerciseData.wordWithBlank}
              </Text>
            </View>
          </View>
        </View>

        {/* Right: Bubbles */}
        <View style={[styles.choicesSection, { flex: isLandscape ? 0.5 : 0.55 }]}>
          <Text style={styles.subInstruction}>Tap the correct sound</Text>
          <View style={styles.bubblesGrid}>
            {exerciseData.choices.map((choice, index) => (
              <TouchableOpacity
                key={index}
                ref={el => { choiceRefs.current[index] = el; }}
                style={[
                  styles.bubble,
                  {
                    width: bubbleSize,
                    height: bubbleSize,
                    opacity: (flyingBubble && flyingBubble.text === choice.label) ? 0 : 1
                  }
                ]}
                onPress={() => handleChoicePress(index)}
              >
                <Text style={styles.bubbleText}>{choice.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </View>

      {/* Flying Bubble Overlay */}
      {flyingBubble && (
        <Animated.View
          style={[
            styles.flyingBubble,
            {
              width: flyingBubble.start.width,
              height: flyingBubble.start.height,
              left: flyAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [flyingBubble.start.x, flyingBubble.end.x]
              }),
              top: flyAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [flyingBubble.start.y, flyingBubble.end.y]
              }),
              // Ensure it stays above everything
              position: 'absolute', 
              zIndex: 9999,
            }
          ]}
        >
          <Text style={styles.bubbleText}>{flyingBubble.text}</Text>
        </Animated.View>
      )}

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
  targetSection: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.l,
  },
  choicesSection: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.m,
  },
  wordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.m,
    borderRadius: 16,
    minWidth: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  blankSlot: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.text,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  wordText: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text,
  },
  subInstruction: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textLight,
    marginBottom: SPACING.m,
  },
  bubblesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SPACING.l,
  },
  bubble: {
    backgroundColor: COLORS.soundSearch.primary,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  flyingBubble: {
    backgroundColor: COLORS.soundSearch.primary,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  bubbleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});