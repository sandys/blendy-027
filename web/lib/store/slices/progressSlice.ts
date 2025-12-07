import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LessonProgress {
  lessonNumber: number;
  completedExercises: number[];
  totalExercises: number;
  lastPlayedAt: string | null;
  bestScore: number;
}

interface ProgressState {
  currentLesson: number;
  currentPhase: number;
  lessonsProgress: Record<number, LessonProgress>;
  unlockedLessons: number[];
  totalStars: number;
  streakDays: number;
  lastActiveDate: string | null;
}

const initialState: ProgressState = {
  currentLesson: 1,
  currentPhase: 1,
  lessonsProgress: {},
  unlockedLessons: [1, 2, 3, 4, 5], // First 5 lessons unlocked by default
  totalStars: 0,
  streakDays: 0,
  lastActiveDate: null,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setCurrentLesson: (state, action: PayloadAction<number>) => {
      state.currentLesson = action.payload;
    },

    setCurrentPhase: (state, action: PayloadAction<number>) => {
      state.currentPhase = action.payload;
    },

    completeExercise: (state, action: PayloadAction<{ lessonNumber: number; exerciseIndex: number; totalExercises: number }>) => {
      const { lessonNumber, exerciseIndex, totalExercises } = action.payload;

      if (!state.lessonsProgress[lessonNumber]) {
        state.lessonsProgress[lessonNumber] = {
          lessonNumber,
          completedExercises: [],
          totalExercises,
          lastPlayedAt: null,
          bestScore: 0,
        };
      }

      const lesson = state.lessonsProgress[lessonNumber];

      if (!lesson.completedExercises.includes(exerciseIndex)) {
        lesson.completedExercises.push(exerciseIndex);
      }

      lesson.lastPlayedAt = new Date().toISOString();
      lesson.totalExercises = totalExercises;

      // Unlock next lesson if current is complete
      if (lesson.completedExercises.length >= totalExercises) {
        const nextLesson = lessonNumber + 1;
        if (!state.unlockedLessons.includes(nextLesson)) {
          state.unlockedLessons.push(nextLesson);
          state.totalStars += 1;
        }
      }
    },

    unlockLesson: (state, action: PayloadAction<number>) => {
      if (!state.unlockedLessons.includes(action.payload)) {
        state.unlockedLessons.push(action.payload);
      }
    },

    addStars: (state, action: PayloadAction<number>) => {
      state.totalStars += action.payload;
    },

    updateStreak: (state) => {
      const today = new Date().toISOString().split('T')[0];

      if (state.lastActiveDate) {
        const lastDate = new Date(state.lastActiveDate);
        const todayDate = new Date(today);
        const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          state.streakDays += 1;
        } else if (diffDays > 1) {
          state.streakDays = 1;
        }
      } else {
        state.streakDays = 1;
      }

      state.lastActiveDate = today;
    },

    resetProgress: (state) => {
      return { ...initialState };
    },
  },
});

export const {
  setCurrentLesson,
  setCurrentPhase,
  completeExercise,
  unlockLesson,
  addStars,
  updateStreak,
  resetProgress,
} = progressSlice.actions;

export default progressSlice.reducer;
