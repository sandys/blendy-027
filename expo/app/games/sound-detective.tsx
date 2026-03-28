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
import { SoundDetectiveData } from "@/types/curriculum";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";

export default function SoundDetectiveScreen() {
  const layout = useResponsiveLayout();
  const { isLandscape } = layout;

  const params = useLocalSearchParams();
  const lessonNumber = parseInt(params.lesson as string);
  const exerciseIndex = parseInt(params.exercise as string);

  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isPlayingWord, setIsPlayingWord] = useState<boolean>(false);
  
  const scaleAnims = useRef<Animated.Value[]>([]).current;
  const audioLoopRef = useRef<boolean>(true);
  const isCorrectAnswerGiven = useRef<boolean>(false);

  const lesson = SAMPLE_LESSONS.find((l) => l.lesson_number === lessonNumber);
  const exercise = lesson?.exercises[exerciseIndex];
  const exerciseData = exercise?.data as SoundDetectiveData | undefined;

  // Init anims
  if (exerciseData && scaleAnims.length !== exerciseData.choices.length) {
    while(scaleAnims.length > 0) scaleAnims.pop();
    for(let i=0; i<exerciseData.choices.length; i++) scaleAnims.push(new Animated.Value(1));
  }

  useEffect(() => {
    if (!exerciseData) return;

    audioLoopRef.current = true;
    isCorrectAnswerGiven.current = false;
    setShowFeedback(false);
    setSelectedChoice(null);

    const playAudioLoop = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      while (audioLoopRef.current && !isCorrectAnswerGiven.current) {
        setIsPlayingWord(true);
        await speakText(exerciseData.word, { rate: 0.8 });
        setIsPlayingWord(false);
        await new Promise(resolve => setTimeout(resolve, 2500));
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

  const handleChoicePress = (choice: string, index: number) => {
    if (showFeedback) return;

    setSelectedChoice(choice);
    const correct = choice === exerciseData?.correctSound;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      isCorrectAnswerGiven.current = true;
      audioLoopRef.current = false;
      setIsPlayingWord(false);

      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      Animated.sequence([
        Animated.spring(scaleAnims[index], { toValue: 1.2, useNativeDriver: true }),
        Animated.spring(scaleAnims[index], { toValue: 1, useNativeDriver: true })
      ]).start();

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
    } else {
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
      
      // Shake
      Animated.sequence([
        Animated.timing(scaleAnims[index], { toValue: 0.9, duration: 50, useNativeDriver: true }),
        Animated.timing(scaleAnims[index], { toValue: 1.1, duration: 50, useNativeDriver: true }),
        Animated.timing(scaleAnims[index], { toValue: 1, duration: 50, useNativeDriver: true }),
      ]).start();

      setTimeout(() => {
        setShowFeedback(false);
        setSelectedChoice(null);
      }, 1500);
    }
  };

  const getPositionText = () => {
    switch (exerciseData?.targetPosition) {
      case "first": return "first";
      case "middle": return "middle";
      case "last": return "last";
      default: return "";
    }
  };

  // Sizing
  const cardSize = layout.cardSize;
  const choiceSize = layout.tileSize;

  return (
    <GameLayout
      instruction={`What is the ${getPositionText()} sound?`}
      progress={`Exercise ${exerciseIndex + 1} of ${lesson?.exercises.length || 0}`}
      primaryColor={COLORS.soundDetective.primary}
      backgroundColor={COLORS.soundDetective.background}
    >
      <View style={[styles.container, { flexDirection: isLandscape ? 'row' : 'column' }]}>
        
        {/* Left: Target */}
        <View style={[styles.targetSection, { flex: isLandscape ? 0.4 : 0.4 }]}>
           <View style={[
               styles.card, 
               { 
                   width: cardSize, 
                   height: cardSize,
                   borderColor: isPlayingWord ? COLORS.soundDetective.primary : 'transparent',
                   borderWidth: isPlayingWord ? 4 : 0 
               }
           ]}>
               <Text style={{ fontSize: cardSize * 0.5 }}>{exerciseData.image}</Text>
               {/* Optional word display, spec says Sound Detective relies on listening, but image helps context */}
               <Volume2 size={32} color={COLORS.soundDetective.primary} style={{ marginTop: 10 }} />
           </View>
           <Text style={styles.wordLabel}>{exerciseData.word}</Text>
        </View>

        {/* Right: Choices */}
        <View style={[styles.choicesSection, { flex: isLandscape ? 0.6 : 0.6 }]}>
            <View style={styles.choicesGrid}>
                {exerciseData.choices.map((choice, index) => {
                    const isSelected = selectedChoice === choice;
                    const isCorrectChoice = choice === exerciseData.correctSound;
                    
                    // Feedback logic
                    let bgColor = COLORS.white;
                    let borderColor = COLORS.soundDetective.primary;
                    if (showFeedback && isSelected) {
                        bgColor = isCorrect ? '#E8F5E9' : '#FFEBEE';
                        borderColor = isCorrect ? COLORS.success : COLORS.error;
                    }

                    return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => handleChoicePress(choice, index)}
                          disabled={showFeedback}
                          activeOpacity={0.7}
                        >
                           <Animated.View
                             style={[
                                 styles.choiceButton,
                                 {
                                     width: choiceSize,
                                     height: choiceSize,
                                     borderRadius: choiceSize / 2,
                                     backgroundColor: bgColor,
                                     borderColor: borderColor,
                                     transform: [{ scale: scaleAnims[index] || 1 }]
                                 }
                             ]}
                           >
                               <Text style={styles.choiceText}>{choice}</Text>
                           </Animated.View>
                        </TouchableOpacity>
                    );
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
  targetSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  choicesSection: {
    justifyContent: 'center',
    alignItems: 'center',
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
  wordLabel: {
    marginTop: SPACING.m,
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
  },
  choicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SPACING.l,
  },
  choiceButton: {
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  choiceText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
  }
});