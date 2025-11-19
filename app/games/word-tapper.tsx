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
import { WordTapperData } from "@/types/curriculum";

export default function WordTapperScreen() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const params = useLocalSearchParams();
  const lessonNumber = parseInt(params.lesson as string);
  const exerciseIndex = parseInt(params.exercise as string);

  const [tapCount, setTapCount] = useState<number>(0);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isPlayingSentence, setIsPlayingSentence] = useState<boolean>(false);
  
  const circleAnims = useRef<Animated.Value[]>([]).current;
  const audioLoopRef = useRef<boolean>(true);

  const lesson = SAMPLE_LESSONS.find((l) => l.lesson_number === lessonNumber);
  const exercise = lesson?.exercises[exerciseIndex];
  const exerciseData = exercise?.data as WordTapperData | undefined;

  // Initialize animations array
  if (exerciseData && circleAnims.length !== exerciseData.wordCount) {
    // Reset/Init array if length changed
    while(circleAnims.length > 0) circleAnims.pop();
    for (let i = 0; i < exerciseData.wordCount; i++) {
      circleAnims.push(new Animated.Value(1));
    }
  }

  useEffect(() => {
    if (!exerciseData) return;

    setTapCount(0);
    setShowFeedback(false);
    setIsCorrect(false);
    audioLoopRef.current = true;

    const playLoop = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      while (audioLoopRef.current) {
        setIsPlayingSentence(true);
        await speakText(exerciseData.sentence, { rate: 0.85 });
        setIsPlayingSentence(false);
        await new Promise(resolve => setTimeout(resolve, 2500));
        if (isCorrect) break; // Stop loop if solved
      }
    };

    playLoop();

    return () => {
      audioLoopRef.current = false;
    };
  }, [exerciseIndex, exerciseData, isCorrect]); // Re-run if isCorrect changes to stop loop? Actually loop checks ref.

  if (!exerciseData) {
    return (
      <GameLayout>
        <Text style={{ color: COLORS.error }}>Exercise not found</Text>
      </GameLayout>
    );
  }

  const handleCircleTap = (index: number) => {
    if (showFeedback || index >= exerciseData.wordCount) return;
    
    // Only allow tapping in order? The previous game allowed tapping any circle? 
    // Usually Word Tapper is "tap for each word". So we just increment count.
    // But the UI shows circles. If we tap *any* circle, does it fill *that* circle or the *next* available slot?
    // Previous implementation: `handleCircleTap(index)` fills the circle at `index`.
    // AND `disabled={isTapped}`.
    // BUT `isTapped = index < tapCount`.
    // This implies we must tap them in order implicitly? No, the previous UI rendered `wordCount` circles.
    // `handleCircleTap(index)` set `tapCount`.
    // Wait, previous code: `onPress={() => handleCircleTap(index)}` where `index` comes from `map`.
    // But `isTapped` check was `index < tapCount`.
    // So if I tap circle #3 while `tapCount` is 0, it would fire?
    // `handleCircleTap` implementation:
    // `const newCount = tapCount + 1; setTapCount(newCount);`
    // It didn't use `index` for logic other than animation.
    // So effectively, tapping *any* circle incremented the count, and the UI filled from left to right.
    
    // I will simplify: Just a big "TAP" button? No, the spec says "circles representing words".
    // Usually the kid taps a physical object or a generic button.
    // Let's keep the circles. Tapping *any* untrapped circle fills the next slot.
    
    // Actually, the previous UI code had `disabled={index < tapCount}`.
    // So circle 0 is disabled if count is 1.
    // Circle 1 is disabled if count is 2.
    // But if I tap circle 2 when count is 0?
    // `isTapped` for circle 2 is `2 < 0` -> false. Enabled.
    // Tap circle 2 -> `tapCount` becomes 1.
    // Now `index < tapCount` re-evaluates.
    // Circle 0: `0 < 1` -> true (Filled).
    // Circle 2: `2 < 1` -> false (Unfilled).
    // So tapping circle 2 fills circle 0 visual? That's confusing.
    
    // Better UX: The circles are just indicators. We have a big "TAP" button?
    // OR we tap the circles themselves in order?
    // Let's enforce tapping in order, or just make them fill left-to-right regardless of which one is tapped?
    // I'll make them act as buttons. Tapping any active one increments the count.
    
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    const newCount = tapCount + 1;
    setTapCount(newCount);
    
    // Animate the circle that just got "filled" (which is index `newCount - 1`)
    Animated.sequence([
        Animated.spring(circleAnims[newCount - 1], { toValue: 1.2, useNativeDriver: true }),
        Animated.spring(circleAnims[newCount - 1], { toValue: 1, useNativeDriver: true })
    ]).start();

    // Auto-check if full?
    if (newCount === exerciseData.wordCount) {
       // Wait a moment then check? Or show "Check" button?
       // Previous had "Check Answer" button appear.
    }
  };

  const checkAnswer = () => {
      const correct = tapCount === exerciseData.wordCount;
      setIsCorrect(correct);
      setShowFeedback(true);
      audioLoopRef.current = false;
      
      if (correct) {
          if (Platform.OS !== "web") {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }
          setTimeout(() => {
            const nextExerciseIndex = exerciseIndex + 1;
            if (lesson && nextExerciseIndex < lesson.exercises.length) {
              router.replace({
                pathname: "/games/word-tapper",
                params: { lesson: lessonNumber, exercise: nextExerciseIndex },
              });
            } else {
              router.back();
            }
          }, 2000);
      } else {
          if (Platform.OS !== "web") {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          }
          setTimeout(() => {
              setTapCount(0);
              setShowFeedback(false);
          }, 1500);
      }
  }

  // Sizing
  const circleSize = isLandscape ? height * 0.18 : width * 0.18;

  return (
    <GameLayout
        instruction="Tap a circle for each word"
        progress={`Exercise ${exerciseIndex + 1} of ${lesson?.exercises.length || 0}`}
        primaryColor={COLORS.wordTapper.primary}
        backgroundColor={COLORS.wordTapper.background}
    >
      <View style={[styles.container, { flexDirection: isLandscape ? 'row' : 'column' }]}>
          
          {/* Left: Sentence (Hidden? No, usually hidden until end? 
             Spec says "Teacher says sentence. Student taps."
             Text should probably be hidden or small?
             Previous UI showed it. I'll show it but maybe obscure it? 
             No, let's show it for now as visual support is good. 
             Actually, for "Word Tapper", often the text is NOT shown to test auditory processing.
             But looking at `exerciseData`, we have `sentence`.
             I'll show it.
          ) */}
          <View style={[styles.sentenceSection, { flex: isLandscape ? 0.4 : 0.3 }]}>
              <View style={[
                  styles.card, 
                  { 
                      borderColor: isPlayingSentence ? COLORS.wordTapper.primary : 'transparent',
                      borderWidth: isPlayingSentence ? 4 : 0
                  }
              ]}>
                  <Volume2 size={48} color={COLORS.wordTapper.primary} />
                  {/* We can hide text if we want to be strict, but for now show it */}
                  <Text style={styles.sentenceText}>{exerciseData.sentence}</Text>
              </View>
          </View>

          {/* Right: Circles */}
          <View style={[styles.interactionSection, { flex: isLandscape ? 0.6 : 0.7 }]}>
              <View style={styles.circlesRow}>
                  {Array.from({ length: exerciseData.wordCount }).map((_, index) => {
                      const isFilled = index < tapCount;
                      return (
                          <TouchableOpacity
                            key={index}
                            activeOpacity={0.8}
                            onPress={() => handleCircleTap(index)}
                            disabled={isFilled || showFeedback}
                          >
                              <Animated.View 
                                style={[
                                    styles.circle,
                                    {
                                        width: circleSize,
                                        height: circleSize,
                                        borderRadius: circleSize / 2,
                                        backgroundColor: isFilled ? COLORS.wordTapper.primary : COLORS.white,
                                        transform: [{ scale: circleAnims[index] || 1 }]
                                    }
                                ]}
                              >
                                  <Text style={[
                                      styles.circleText, 
                                      { color: isFilled ? COLORS.white : COLORS.wordTapper.primary }
                                  ]}>
                                      {index + 1}
                                  </Text>
                              </Animated.View>
                          </TouchableOpacity>
                      )
                  })}
              </View>

              {/* Controls */}
              <View style={styles.controls}>
                  <Text style={styles.counterText}>{tapCount} / {exerciseData.wordCount}</Text>
                  
                  {tapCount > 0 && !showFeedback && (
                      <TouchableOpacity 
                        style={styles.checkButton}
                        onPress={checkAnswer}
                      >
                          <Text style={styles.checkButtonText}>Check</Text>
                      </TouchableOpacity>
                  )}

                  {showFeedback && (
                      <View style={[styles.feedbackBadge, { backgroundColor: isCorrect ? '#E8F5E9' : '#FFEBEE' }]}>
                          <Text style={{ fontSize: 24, fontWeight: 'bold', color: isCorrect ? COLORS.success : COLORS.error }}>
                              {isCorrect ? "Correct!" : "Try Again"}
                          </Text>
                      </View>
                  )}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  sentenceSection: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.m,
  },
  interactionSection: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: SPACING.l,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    minWidth: 200,
  },
  sentenceText: {
    ...TYPOGRAPHY.h2,
    textAlign: 'center',
    marginTop: SPACING.m,
    color: COLORS.text,
  },
  circlesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SPACING.m,
    marginBottom: SPACING.l,
  },
  circle: {
    borderWidth: 4,
    borderColor: COLORS.wordTapper.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  circleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  controls: {
    alignItems: 'center',
    gap: SPACING.m,
    minHeight: 80,
  },
  counterText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textLight,
  },
  checkButton: {
    backgroundColor: COLORS.wordTapper.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.m,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  checkButtonText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  feedbackBadge: {
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.s,
    borderRadius: 16,
  }
});
