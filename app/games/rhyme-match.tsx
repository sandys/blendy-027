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

export default function RhymeMatchScreen() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const params = useLocalSearchParams();
  const lessonNumber = parseInt(params.lesson as string);
  const exerciseIndex = parseInt(params.exercise as string);

  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [playingAudioIndex, setPlayingAudioIndex] = useState<number | null>(null);
  const [isPlayingTarget, setIsPlayingTarget] = useState<boolean>(false);
  
  // Animations
  const scaleAnims = useRef([0, 1, 2].map(() => new Animated.Value(1))).current;
  const pulseAnims = useRef([0, 1, 2].map(() => new Animated.Value(1))).current;
  const audioLoopRef = useRef<boolean>(true);
  const isCorrectAnswerGiven = useRef<boolean>(false);

  const lesson = SAMPLE_LESSONS.find((l) => l.lesson_number === lessonNumber);
  const exercise = lesson?.exercises[exerciseIndex];

  const exerciseData = exercise?.exercise_type === "Rhyme Match" ? exercise.data as {
    target: { word: string; image: string };
    choices: { word: string; image: string; isCorrect: boolean }[];
  } : null;

  // Initialize and Audio Loop
  useEffect(() => {
    if (!exerciseData) return;

    audioLoopRef.current = true;
    isCorrectAnswerGiven.current = false;

    const playAudioLoop = async () => {
      // Initial delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      while (audioLoopRef.current && !isCorrectAnswerGiven.current) {
        // Play target
        setIsPlayingTarget(true);
        await speakText(exerciseData.target.word);
        setIsPlayingTarget(false);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (!audioLoopRef.current || isCorrectAnswerGiven.current) break;
        
        // Play choices
        for (let i = 0; i < exerciseData.choices.length; i++) {
          if (!audioLoopRef.current || isCorrectAnswerGiven.current) break;
          
          setPlayingAudioIndex(i);
          
          // Pulse animation
          Animated.sequence([
            Animated.timing(pulseAnims[i], {
              toValue: 1.1,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnims[i], {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start();
          
          await speakText(exerciseData.choices[i].word);
          await new Promise(resolve => setTimeout(resolve, 800));
        }
        
        setPlayingAudioIndex(null);
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

  const { target, choices } = exerciseData;

  const handleChoiceTap = (index: number) => {
    if (showFeedback) return;

    setSelectedChoice(index);
    setShowFeedback(true);

    const isCorrect = choices[index].isCorrect;

    if (isCorrect) {
      isCorrectAnswerGiven.current = true;
      audioLoopRef.current = false;
      setPlayingAudioIndex(null);
      setIsPlayingTarget(false);

      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      Animated.sequence([
        Animated.timing(scaleAnims[index], {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnims[index], {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]).start();

      setTimeout(() => {
        const nextExerciseIndex = exerciseIndex + 1;
        if (lesson && nextExerciseIndex < lesson.exercises.length) {
          router.replace({
            pathname: "/games/rhyme-match",
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

      Animated.sequence([
        Animated.timing(scaleAnims[index], {
          toValue: 0.9,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnims[index], {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]).start();

      setTimeout(() => {
        setShowFeedback(false);
        setSelectedChoice(null);
      }, 1500);
    }
  };

  // Responsive Sizing
  const targetSize = isLandscape ? height * 0.4 : width * 0.4;
  const choiceSize = isLandscape ? height * 0.25 : width * 0.28;
  
  return (
    <GameLayout
      instruction="Which one rhymes with?"
      progress={`Exercise ${exerciseIndex + 1} of ${lesson?.exercises.length || 0}`}
      primaryColor={COLORS.rhymeMatch.primary}
      backgroundColor={COLORS.rhymeMatch.background}
    >
      <View style={[styles.mainContainer, { flexDirection: isLandscape ? 'row' : 'column' }]}>
        
        {/* Left: Target Word */}
        <View style={[styles.targetSection, { flex: isLandscape ? 0.4 : 0.4 }]}>
          <View 
            style={[
              styles.targetCard, 
              { 
                width: targetSize, 
                height: targetSize,
                borderColor: isPlayingTarget ? COLORS.rhymeMatch.primary : 'transparent',
                borderWidth: isPlayingTarget ? 4 : 0,
              }
            ]}
          >
            <Text style={{ fontSize: targetSize * 0.4 }}>{target.image}</Text>
            <Text style={[styles.wordText, { fontSize: targetSize * 0.15 }]}>{target.word}</Text>
            {isPlayingTarget && (
              <View style={styles.audioIcon}>
                <Volume2 size={20} color={COLORS.white} />
              </View>
            )}
          </View>
        </View>

        {/* Right: Choices */}
        <View style={[styles.choicesSection, { flex: isLandscape ? 0.6 : 0.6 }]}>
          <View style={styles.choicesGrid}>
            {choices.map((choice, index) => {
              const isSelected = selectedChoice === index;
              const isCorrect = choice.isCorrect;
              const isPlaying = playingAudioIndex === index;
              
              let borderColor = 'transparent';
              let backgroundColor = COLORS.white;
              
              if (isSelected && showFeedback) {
                borderColor = isCorrect ? COLORS.success : COLORS.error;
                backgroundColor = isCorrect ? '#E8F5E9' : '#FFEBEE';
              } else if (isPlaying) {
                borderColor = COLORS.rhymeMatch.primary;
              }

              return (
                <Animated.View 
                  key={index} 
                  style={{ transform: [{ scale: scaleAnims[index] }, { scale: pulseAnims[index] }] }}
                >
                  <TouchableOpacity
                    style={[
                      styles.choiceCard,
                      {
                        width: choiceSize,
                        height: choiceSize,
                        borderColor,
                        backgroundColor,
                      }
                    ]}
                    onPress={() => handleChoiceTap(index)}
                    disabled={showFeedback}
                    activeOpacity={0.8}
                  >
                    <Text style={{ fontSize: choiceSize * 0.4 }}>{choice.image}</Text>
                    <Text style={[styles.wordText, { fontSize: choiceSize * 0.15 }]}>{choice.word}</Text>
                    
                    {/* Feedback Overlay */}
                    {isSelected && showFeedback && (
                      <View style={styles.feedbackIcon}>
                        <Text style={{ fontSize: 24 }}>{isCorrect ? '✨' : '🤔'}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>
        </View>
      </View>
    </GameLayout>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  targetSection: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  choicesSection: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  targetCard: {
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
  choicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SPACING.m,
  },
  choiceCard: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  wordText: {
    ...TYPOGRAPHY.h3,
    marginTop: SPACING.xs,
    color: COLORS.text,
  },
  audioIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: COLORS.rhymeMatch.primary,
    padding: 6,
    borderRadius: 20,
  },
  feedbackIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
