import createContextHook from "@nkzw/create-context-hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, useCallback, useMemo } from "react";
import { UserProgress, PhonemeCard, Lesson } from "@/types/curriculum";
import { ALL_PHONEME_CARDS, SAMPLE_LESSONS } from "@/constants/curriculum-data";

const STORAGE_KEY = "@phonics_app_progress";

const initialProgress: UserProgress = {
  currentLesson: 1,
  completedLessons: [],
  unlockedPhonemes: [],
  exerciseProgress: {},
  totalStars: 0,
  streakDays: 0,
  lastActivityDate: new Date().toISOString(),
};

export const [AppProvider, useApp] = createContextHook(() => {
  const [progress, setProgress] = useState<UserProgress>(initialProgress);
  const [phonemeCards, setPhonemeCards] = useState<PhonemeCard[]>(ALL_PHONEME_CARDS);
  const [lessons] = useState<Lesson[]>(SAMPLE_LESSONS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setProgress(parsed);
        
        const updatedCards = ALL_PHONEME_CARDS.map((card) => ({
          ...card,
          unlocked: parsed.unlockedPhonemes.includes(card.phoneme),
        }));
        setPhonemeCards(updatedCards);
      }
    } catch (error) {
      console.error("Failed to load progress:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProgress = async (newProgress: UserProgress) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      setProgress(newProgress);
    } catch (error) {
      console.error("Failed to save progress:", error);
    }
  };

  const unlockPhoneme = useCallback(
    (phoneme: string) => {
      if (!progress.unlockedPhonemes.includes(phoneme)) {
        const newProgress = {
          ...progress,
          unlockedPhonemes: [...progress.unlockedPhonemes, phoneme],
        };
        saveProgress(newProgress);

        setPhonemeCards((prev) =>
          prev.map((card) =>
            card.phoneme === phoneme ? { ...card, unlocked: true } : card
          )
        );
      }
    },
    [progress]
  );

  const completeLesson = useCallback(
    (lessonNumber: number, starsEarned: number) => {
      const newProgress = {
        ...progress,
        completedLessons: progress.completedLessons.includes(lessonNumber)
          ? progress.completedLessons
          : [...progress.completedLessons, lessonNumber],
        currentLesson: Math.max(progress.currentLesson, lessonNumber + 1),
        totalStars: progress.totalStars + starsEarned,
        lastActivityDate: new Date().toISOString(),
      };
      saveProgress(newProgress);
    },
    [progress]
  );

  const updateExerciseProgress = useCallback(
    (exerciseId: string, rating: number) => {
      const now = new Date().toISOString();
      const existing = progress.exerciseProgress[exerciseId];

      const newSRSData = {
        due_date: now,
        stability: existing ? existing.stability + 1 : 1,
        difficulty: existing ? existing.difficulty : 0,
        review_history: [
          ...(existing?.review_history || []),
          { timestamp: now, rating },
        ],
      };

      const newProgress = {
        ...progress,
        exerciseProgress: {
          ...progress.exerciseProgress,
          [exerciseId]: newSRSData,
        },
      };
      saveProgress(newProgress);
    },
    [progress]
  );

  const resetProgress = useCallback(async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setProgress(initialProgress);
    setPhonemeCards(ALL_PHONEME_CARDS);
  }, []);

  return useMemo(
    () => ({
      progress,
      phonemeCards,
      lessons,
      isLoading,
      unlockPhoneme,
      completeLesson,
      updateExerciseProgress,
      resetProgress,
    }),
    [
      progress,
      phonemeCards,
      lessons,
      isLoading,
      unlockPhoneme,
      completeLesson,
      updateExerciseProgress,
      resetProgress,
    ]
  );
});
