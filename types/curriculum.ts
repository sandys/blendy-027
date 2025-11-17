export type PhaseType = 1 | 2 | 3 | 4;

export type ExerciseType =
  | "Rhyme Match"
  | "Word Tapper"
  | "Syllable Squish"
  | "Sound Slide"
  | "Sound Detective"
  | "Word Builder"
  | "Change the Word"
  | "Sound Search"
  | "Blend Flipper"
  | "Word Sort"
  | "Magic Wand"
  | "Word Surgery"
  | "Syllable Split"
  | "Heart Word"
  | "Ice Cream Cones"
  | "Feed the Monster"
  | "Over Easy"
  | "Letter Sounds Bingo"
  | "Make a Match"
  | "Why Did They Do That";

export type ResponseType =
  | "tap_image"
  | "drag_and_drop"
  | "read_aloud"
  | "voice_recognition"
  | "tap_count"
  | "tap_choice"
  | "multiple_choice";

export interface SRSData {
  due_date: string | null;
  stability: number;
  difficulty: number;
  review_history: {
    timestamp: string;
    rating: number;
  }[];
}

export interface ExerciseAssets {
  audio?: string[];
  images?: string[];
}

export interface RhymeMatchData {
  target: { word: string; image: string };
  choices: { word: string; image: string; isCorrect: boolean }[];
}

export interface WordTapperData {
  sentence: string;
  wordCount: number;
}

export interface SyllableSquishData {
  word: string;
  image: string;
  syllableCount: number;
}

export interface SoundSlideData {
  onset: string;
  rime: string;
  word: string;
  image?: string;
}

export interface SoundDetectiveData {
  word: string;
  image: string;
  targetPosition: "first" | "last" | "middle";
  correctSound: string;
  choices: string[];
}

export interface WordBuilderData {
  word: string;
  letters: string[];
  image?: string;
}

export interface SoundSearchOption {
  label: string;
  isCorrect: boolean;
}

export interface SoundSearchData {
  image: string;
  word: string;
  wordWithBlank: string;
  prompt?: string;
  choices: SoundSearchOption[];
}

export interface ChangeTheWordData {
  initialWord: string;
  changes: {
    position: number;
    newLetter: string;
    newWord: string;
  }[];
}

export interface HeartWordData {
  word: string;
  sounds: string[];
  graphemes: string[];
  trickyParts: number[];
  sentence: string;
}

export type ExerciseData =
  | RhymeMatchData
  | WordTapperData
  | SyllableSquishData
  | SoundSlideData
  | SoundDetectiveData
  | WordBuilderData
  | SoundSearchData
  | ChangeTheWordData
  | HeartWordData;

export interface Exercise {
  exercise_id: string;
  lesson_number: number;
  exercise_type: ExerciseType;
  skill_focus: string;
  data: ExerciseData;
  response_type: ResponseType;
  assets: ExerciseAssets;
  srs_data: SRSData;
}

export interface Lesson {
  lesson_number: number;
  phase: PhaseType;
  title: string;
  description: string;
  new_graphemes?: string[];
  new_irregular_words?: string[];
  exercises: Exercise[];
  story?: {
    title: string;
    text: string;
    images?: string[];
  };
}

export interface PhaseInfo {
  phase: PhaseType;
  title: string;
  description: string;
  lessonRange: [number, number];
  color: string;
}

export interface UserProgress {
  currentLesson: number;
  completedLessons: number[];
  unlockedPhonemes: string[];
  exerciseProgress: Record<string, SRSData>;
  totalStars: number;
  streakDays: number;
  lastActivityDate: string;
}

export interface PhonemeCard {
  phoneme: string;
  graphemes: string[];
  anchorWord: string;
  anchorImage: string;
  articulationVideo?: string;
  category: "consonant" | "vowel";
  subcategory?: string;
  unlocked: boolean;
}
