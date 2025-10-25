import "@testing-library/jest-native/extend-expect";

// Mock expo-speech
jest.mock("expo-speech", () => ({
  speak: jest.fn(),
  stop: jest.fn(),
  pause: jest.fn(),
  resume: jest.fn(),
  isSpeakingAsync: jest.fn(() => Promise.resolve(false)),
}));

// Mock expo-haptics
jest.mock("expo-haptics", () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  selectionAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: "light",
    Medium: "medium",
    Heavy: "heavy",
  },
}));

// Mock expo-router
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({ lesson: "1", exercise: "0" }),
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  },
}));

// Mock safe area insets
jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  SafeAreaProvider: ({ children }: any) => children,
}));

// Mock curriculum data
jest.mock("@/constants/curriculum-data", () => ({
  SAMPLE_LESSONS: [
    {
      lesson_number: 1,
      phase: 1,
      title: "Test Lesson",
      description: "Test",
      exercises: [
        {
          exercise_id: "L1-RhymeMatch-001",
          lesson_number: 1,
          exercise_type: "Rhyme Match",
          skill_focus: "Rhyme Recognition",
          data: {
            target: { word: "cat", image: "🐱" },
            choices: [
              { word: "hat", image: "🎩", isCorrect: true },
              { word: "dog", image: "🐕", isCorrect: false },
              { word: "car", image: "🚗", isCorrect: false },
            ],
          },
          response_type: "tap_image",
          assets: { audio: [] },
          srs_data: {
            due_date: null,
            stability: 0,
            difficulty: 0,
            review_history: [],
          },
        },
      ],
    },
  ],
  PHASES: [],
  ALL_PHONEME_CARDS: [],
}));

// Mock AppContext
jest.mock("@/contexts/AppContext", () => ({
  useApp: () => ({
    lessons: [],
    progress: {
      currentLesson: 1,
      completedLessons: [],
      unlockedPhonemes: [],
      exerciseProgress: {},
      totalStars: 0,
      streakDays: 0,
      lastActivityDate: new Date().toISOString(),
    },
    completeLesson: jest.fn(),
    unlockPhoneme: jest.fn(),
  }),
  AppProvider: ({ children }: any) => children,
}));

// Silence console warnings in tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};
