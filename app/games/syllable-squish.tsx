import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
  Platform,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, router } from "expo-router";
import { Volume2 } from "lucide-react-native";
import { SAMPLE_LESSONS } from "@/constants/curriculum-data";
import { speakText } from "@/utils/audio";
import { GameLayout } from "@/components/GameLayout";
import { COLORS, SPACING, TYPOGRAPHY } from "@/constants/theme";
import { SyllableSquishData } from "@/types/curriculum";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";

export default function SyllableSquishScreen() {
  const layout = useResponsiveLayout();
  const { isLandscape } = layout;

  const params = useLocalSearchParams();
  const lessonNumber = parseInt(params.lesson as string);
  const exerciseIndex = parseInt(params.exercise as string);

  const [tapCount, setTapCount] = useState<number>(0);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isPlayingWord, setIsPlayingWord] = useState<boolean>(false);
  
  const buttonScale = useRef(new Animated.Value(1)).current;
  const progressAnims = useRef<Animated.Value[]>([]).current;
  const audioLoopRef = useRef<boolean>(true);
  const isCorrectAnswerGiven = useRef<boolean>(false);

  const lesson = SAMPLE_LESSONS.find((l) => l.lesson_number === lessonNumber);
  const exercise = lesson?.exercises[exerciseIndex];
  const exerciseData = exercise?.data as SyllableSquishData | undefined;

  if (exerciseData && progressAnims.length !== exerciseData.syllableCount) {
    while(progressAnims.length > 0) progressAnims.pop();
    for(let i=0; i<exerciseData.syllableCount; i++) progressAnims.push(new Animated.Value(0));
  }

  useEffect(() => {
    if (!exerciseData) return;

    audioLoopRef.current = true;
    isCorrectAnswerGiven.current = false;
    setTapCount(0);
    setShowFeedback(false);

    const playAudioLoop = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      while (audioLoopRef.current && !isCorrectAnswerGiven.current) {
        setIsPlayingWord(true);
        await speakText(exerciseData.word, { rate: 0.8 });
        setIsPlayingWord(false);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    };

    playAudioLoop();

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

  const handleSquishTap = () => {
    if (showFeedback) return;

    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }

    // Button Anim
    Animated.sequence([
      Animated.timing(buttonScale, { toValue: 0.9, duration: 80, useNativeDriver: true }),
      Animated.spring(buttonScale, { toValue: 1, friction: 3, useNativeDriver: true }),
    ]).start();

    const newCount = tapCount + 1;
    setTapCount(newCount);

    // Progress Anim
    if (newCount <= exerciseData.syllableCount) {
        Animated.spring(progressAnims[newCount - 1], { toValue: 1, useNativeDriver: true }).start();
    }

    // Check win
    if (newCount === exerciseData.syllableCount) {
        isCorrectAnswerGiven.current = true;
        audioLoopRef.current = false;
        setIsPlayingWord(false);
        setIsCorrect(true);
        setShowFeedback(true);

        if (Platform.OS !== "web") {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
        
        speakText("Great job!");

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

    } else if (newCount > exerciseData.syllableCount) {
        // Over tap!
        if (Platform.OS !== "web") {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
        
        setIsCorrect(false);
        setShowFeedback(true);
        speakText("Too many!");

        setTimeout(() => {
            setTapCount(0);
            setShowFeedback(false);
            progressAnims.forEach(a => a.setValue(0));
        }, 1500);
    }
  };

  // Sizing
  const buttonSize = layout.buttonSize * 2;
  const cardSize = layout.cardSize;

  return (
    <GameLayout
      instruction="Squish the button for each syllable"
      progress={`Exercise ${exerciseIndex + 1} of ${lesson?.exercises.length || 0}`}
      primaryColor={COLORS.syllableSquish.primary}
      backgroundColor={COLORS.syllableSquish.background}
    >
      <View style={[styles.container, { flexDirection: isLandscape ? 'row' : 'column' }]}>
        
        {/* Left: Target */}
        <View style={[styles.targetSection, { flex: isLandscape ? 0.4 : 0.4 }]}>
            <View style={[
                styles.card,
                {
                    width: cardSize,
                    minHeight: cardSize * 0.8,
                    borderColor: isPlayingWord ? COLORS.syllableSquish.primary : 'transparent',
                    borderWidth: isPlayingWord ? 4 : 0
                }
            ]}>
                <Text style={{ fontSize: cardSize * 0.4 }}>{exerciseData.image}</Text>
                <Text style={styles.wordText}>{exerciseData.word}</Text>
                {isPlayingWord && <Volume2 size={24} color={COLORS.syllableSquish.primary} style={{marginTop: 10}}/>}
            </View>
        </View>

        {/* Right: Interaction */}
        <View style={[styles.interactionSection, { flex: isLandscape ? 0.6 : 0.6 }]}>
            
            {/* Progress dots */}
            <View style={styles.progressRow}>
                {Array.from({ length: exerciseData.syllableCount }).map((_, index) => (
                    <View 
                      key={index} 
                      style={[
                          styles.progressDotBase,
                          { width: 40, height: 40, borderRadius: 20 }
                      ]}
                    >
                        <Animated.View 
                           style={[
                               styles.progressDotFill,
                               { 
                                   opacity: progressAnims[index],
                                   transform: [{ scale: progressAnims[index] }]
                               }
                           ]}
                        />
                    </View>
                ))}
            </View>

            {/* Squish Button */}
            <TouchableOpacity
              onPress={handleSquishTap}
              activeOpacity={0.9}
              disabled={showFeedback}
            >
                <Animated.View
                  style={[
                      styles.squishButton,
                      {
                          width: buttonSize,
                          height: buttonSize,
                          borderRadius: buttonSize / 2,
                          transform: [{ scale: buttonScale }]
                      }
                  ]}
                >
                    <Text style={styles.squishText}>SQUISH!</Text>
                </Animated.View>
            </TouchableOpacity>
            
            <Text style={styles.counterText}>Taps: {tapCount}</Text>

            {showFeedback && (
                 <View style={[styles.feedbackBadge, { backgroundColor: isCorrect ? '#E8F5E9' : '#FFEBEE' }]}>
                     <Text style={{ fontSize: 24, fontWeight: 'bold', color: isCorrect ? COLORS.success : COLORS.error }}>
                         {isCorrect ? "Perfect!" : "Oops!"}
                     </Text>
                 </View>
            )}

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
  targetSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  interactionSection: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.l,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  wordText: {
    ...TYPOGRAPHY.h2,
    marginTop: SPACING.s,
    color: COLORS.text,
  },
  progressRow: {
    flexDirection: 'row',
    gap: SPACING.m,
  },
  progressDotBase: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressDotFill: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
    backgroundColor: COLORS.syllableSquish.primary,
  },
  squishButton: {
    backgroundColor: COLORS.syllableSquish.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 6,
    borderColor: COLORS.syllableSquish.accent,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  squishText: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.white,
  },
  counterText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textLight,
  },
  feedbackBadge: {
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.s,
    borderRadius: 16,
  }
});

