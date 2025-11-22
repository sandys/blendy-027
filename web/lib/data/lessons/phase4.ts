import { Lesson } from "@/lib/types/curriculum";

// Phase 4: Advanced Patterns & Morphology (Lessons 46-55)
// VCe (Magic E), R-controlled vowels, Syllable types, Affixes
export const phase4Lessons: Lesson[] = [
  // Lesson 46: Magic E (a_e)
  {
    lesson_number: 46,
    phase: 4,
    title: "Magic E (a_e)",
    description: "The 'e' at the end makes the 'a' say its name.",
    new_graphemes: ["a_e"],
    new_irregular_words: [],
    exercises: [
      {
        exercise_id: "L46-MagicWand-01",
        lesson_number: 46,
        exercise_type: "Magic Wand", // Placeholder type until implemented, using Sound Slide logic for now? 
        // Actually we don't have Magic Wand game yet. We use Sound Slide or Word Builder.
        // Let's use Word Builder to teach the concept: c-a-k-e
        exercise_type: "Word Builder",
        skill_focus: "Building VCe words",
        data: {
          image: "🎂",
          word: "cake",
          letters: ["c", "a", "k", "e"],
        },
        response_type: "drag_drop",
        assets: { audio: [], images: [] },
        srs_data: { due_date: null, stability: 0, difficulty: 0, review_history: [] },
      },
      {
        exercise_id: "L46-SoundSearch-01",
        lesson_number: 46,
        exercise_type: "Sound Search",
        skill_focus: "Identifying long a",
        data: {
          image: "🎮",
          word: "game",
          wordWithBlank: "g_me",
          prompt: "What vowel goes in the middle?",
          choices: [
            { label: "a", isCorrect: true }, // In VCe context
            { label: "o", isCorrect: false },
            { label: "i", isCorrect: false },
          ],
        },
        response_type: "tap_choice",
        assets: { audio: [], images: [] },
        srs_data: { due_date: null, stability: 0, difficulty: 0, review_history: [] },
      }
    ],
    story: {
      title: "Kate's Cake",
      text: "Kate will bake a cake. She takes the cake to the lake. Dave creates a game at the lake.",
      images: []
    },
  },

  // Lesson 51: Plural -s
  {
    lesson_number: 51,
    phase: 4,
    title: "Plural -s",
    description: "Adding 's' to mean more than one.",
    new_graphemes: ["s"], // Morphology use
    new_irregular_words: [],
    exercises: [
      {
        exercise_id: "L51-WordBuilder-01",
        lesson_number: 51,
        exercise_type: "Word Builder",
        skill_focus: "Spelling plurals",
        data: {
          image: "🐈🐈",
          word: "cats",
          letters: ["c", "a", "t", "s"],
        },
        response_type: "drag_drop",
        assets: { audio: [], images: [] },
        srs_data: { due_date: null, stability: 0, difficulty: 0, review_history: [] },
      }
    ],
    story: {
      title: "The Cats",
      text: "Two cats sat on mats. The cats saw bats. The bats had hats.",
      images: []
    },
  },

  // Lesson 53: Compound Words
  {
    lesson_number: 53,
    phase: 4,
    title: "Compound Words",
    description: "Two small words make one big word.",
    new_graphemes: [],
    new_irregular_words: [],
    exercises: [
      {
        exercise_id: "L53-WordSurgery-01",
        lesson_number: 53,
        exercise_type: "Word Surgery", // Placeholder: Will implement later. Use Syllable Squish mechanic or similar?
        // For now, standard Word Builder works to build it.
        exercise_type: "Word Builder",
        skill_focus: "Building compounds",
        data: {
          image: "🌭",
          word: "hotdog",
          letters: ["h", "o", "t", "d", "o", "g"],
        },
        response_type: "drag_drop",
        assets: { audio: [], images: [] },
        srs_data: { due_date: null, stability: 0, difficulty: 0, review_history: [] },
      },
      {
        exercise_id: "L53-SyllableSquish-01",
        lesson_number: 53,
        exercise_type: "Syllable Squish",
        skill_focus: "Segmenting compounds",
        data: {
          image: "🌅",
          word: "sunset",
          syllableCount: 2,
        },
        response_type: "tap",
        assets: { audio: [], images: [] },
        srs_data: { due_date: null, stability: 0, difficulty: 0, review_history: [] },
      }
    ],
    story: {
      title: "Sunset",
      text: "The sun sets on the hilltop. A catfish swims in the bathtub? No, that is silly!",
      images: []
    },
  },
  
  // Lesson 54: Closed Syllables (Rabbit Rule)
  {
    lesson_number: 54,
    phase: 4,
    title: "Closed Syllables (VCCV)",
    description: "Splitting words between two consonants.",
    new_graphemes: [],
    new_irregular_words: [],
    exercises: [
      {
        exercise_id: "L54-SyllableSquish-01",
        lesson_number: 54,
        exercise_type: "Syllable Squish",
        skill_focus: "Segmenting VCCV words",
        data: {
          image: "🐰",
          word: "rabbit",
          syllableCount: 2,
        },
        response_type: "tap",
        assets: { audio: [], images: [] },
        srs_data: { due_date: null, stability: 0, difficulty: 0, review_history: [] },
      }
    ],
    story: {
      title: "The Rabbit",
      text: "A rabbit has a habit. It hops on a magnet. The rabbit eats a carrot.",
      images: []
    },
  }
];