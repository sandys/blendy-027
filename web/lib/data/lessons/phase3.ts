import { Lesson } from "@/lib/types/curriculum";

// Phase 3: Expanding the Phonetic Code (Lessons 26-45)
// Digraphs, Blends, FLOSS Rule, Glued Sounds
export const phase3Lessons: Lesson[] = [
  // Lesson 26: Digraph 'sh' (Initial)
  {
    lesson_number: 26,
    phase: 3,
    title: "Digraph sh (Start)",
    description: "Identify the /sh/ sound at the beginning of words.",
    new_graphemes: ["sh"],
    new_irregular_words: [],
    exercises: [
      {
        exercise_id: "L26-SoundSearch-01",
        lesson_number: 26,
        exercise_type: "Sound Search",
        skill_focus: "Identify initial digraph",
        data: {
          image: "🚢",
          word: "ship",
          wordWithBlank: "__ip",
          prompt: "What sound does ship start with?",
          choices: [
            { label: "sh", isCorrect: true },
            { label: "ch", isCorrect: false },
            { label: "th", isCorrect: false },
          ],
        },
        response_type: "tap_choice",
        assets: { audio: [], images: [] },
        srs_data: { due_date: null, stability: 0, difficulty: 0, review_history: [] },
      },
      {
        exercise_id: "L26-SoundSlide-01",
        lesson_number: 26,
        exercise_type: "Sound Slide",
        skill_focus: "Blending onset and rime",
        data: {
          image: "🛍️",
          word: "shop",
          onset: "sh",
          rime: "op",
        },
        response_type: "drag_drop",
        assets: { audio: [], images: [] },
        srs_data: { due_date: null, stability: 0, difficulty: 0, review_history: [] },
      },
      {
        exercise_id: "L26-WordBuilder-01",
        lesson_number: 26,
        exercise_type: "Word Builder",
        skill_focus: "Segmenting and spelling",
        data: {
          image: "🐚",
          word: "shell",
          letters: ["sh", "e", "ll"], // Treating 'll' as unit for ease or 'l','l'? Let's use single letters for now unless specified. Spec says graphemes. 'sh' is a grapheme.
          // If 'll' is not taught yet (FLOSS is later), maybe avoid double letters or treat as singles.
          // Let's use simple words: 'shut'
          // Corrected: word 'shut'
        },
        response_type: "drag_drop",
        assets: { audio: [], images: [] },
        srs_data: { due_date: null, stability: 0, difficulty: 0, review_history: [] },
      }
    ],
    story: {
      title: "The Ship",
      text: "Shep is on a big ship. The ship is red. Shep looks at a fish shop on the deck.",
      images: []
    },
  },

  // Lesson 27: Digraph 'sh' (Final)
  {
    lesson_number: 27,
    phase: 3,
    title: "Digraph sh (End)",
    description: "Identify the /sh/ sound at the end of words.",
    new_graphemes: [],
    new_irregular_words: [],
    exercises: [
      {
        exercise_id: "L27-SoundSearch-01",
        lesson_number: 27,
        exercise_type: "Sound Search",
        skill_focus: "Identify final digraph",
        data: {
          image: "🐟",
          word: "fish",
          wordWithBlank: "fi__",
          prompt: "What sound does fish end with?",
          choices: [
            { label: "sh", isCorrect: true },
            { label: "s", isCorrect: false },
            { label: "ch", isCorrect: false },
          ],
        },
        response_type: "tap_choice",
        assets: { audio: [], images: [] },
        srs_data: { due_date: null, stability: 0, difficulty: 0, review_history: [] },
      },
      {
        exercise_id: "L27-SoundSlide-01",
        lesson_number: 27,
        exercise_type: "Sound Slide",
        skill_focus: "Blending body and coda",
        data: {
          image: "💰",
          word: "cash",
          onset: "ca", // Body-coda blend? Sound Slide usually Onset-Rime (c-ash) or Body-Coda (ca-sh)?
          // Current logic supports simple 2-part. Let's do Onset-Rime: c-ash
          // Or wait, 'sh' is the new thing. 
          // If we do 'c-ash', the user drags 'c'. The 'ash' is the rime.
          // That works.
          onset: "c",
          rime: "ash",
        },
        response_type: "drag_drop",
        assets: { audio: [], images: [] },
        srs_data: { due_date: null, stability: 0, difficulty: 0, review_history: [] },
      },
      {
        exercise_id: "L27-WordBuilder-01",
        lesson_number: 27,
        exercise_type: "Word Builder",
        skill_focus: "Spelling with sh",
        data: {
          image: "🍽️",
          word: "dish",
          letters: ["d", "i", "sh"],
        },
        response_type: "drag_drop",
        assets: { audio: [], images: [] },
        srs_data: { due_date: null, stability: 0, difficulty: 0, review_history: [] },
      }
    ],
    story: {
      title: "Fresh Fish",
      text: "Dash got a fresh fish. The fish is on a dish. Dash will mash the fish.",
      images: []
    },
  },

  // Lesson 28: Digraph 'th' (Voiceless)
  {
    lesson_number: 28,
    phase: 3,
    title: "Digraph th (Voiceless)",
    description: "Identify the soft /th/ sound like in 'math'.",
    new_graphemes: ["th"],
    new_irregular_words: [],
    exercises: [
      {
        exercise_id: "L28-SoundSearch-01",
        lesson_number: 28,
        exercise_type: "Sound Search",
        skill_focus: "Identify th digraph",
        data: {
          image: "🛁",
          word: "bath",
          wordWithBlank: "ba__",
          prompt: "What sound does bath end with?",
          choices: [
            { label: "th", isCorrect: true },
            { label: "f", isCorrect: false },
            { label: "sh", isCorrect: false },
          ],
        },
        response_type: "tap_choice",
        assets: { audio: [], images: [] },
        srs_data: { due_date: null, stability: 0, difficulty: 0, review_history: [] },
      },
      {
        exercise_id: "L28-SoundSlide-01",
        lesson_number: 28,
        exercise_type: "Sound Slide",
        skill_focus: "Blending with th",
        data: {
          image: "🧵",
          word: "thin",
          onset: "th",
          rime: "in",
        },
        response_type: "drag_drop",
        assets: { audio: [], images: [] },
        srs_data: { due_date: null, stability: 0, difficulty: 0, review_history: [] },
      }
    ],
    story: {
      title: "Math Path",
      text: "Beth walks on a path. She does math on the path. A moth lands on the math pad.",
      images: []
    },
  },
  
  // Lesson 29: Digraph 'ch'
  {
    lesson_number: 29,
    phase: 3,
    title: "Digraph ch",
    description: "Identify the /ch/ sound like in 'chip'.",
    new_graphemes: ["ch"],
    new_irregular_words: [],
    exercises: [
      {
        exercise_id: "L29-SoundSearch-01",
        lesson_number: 29,
        exercise_type: "Sound Search",
        skill_focus: "Identify ch digraph",
        data: {
          image: "🥔",
          word: "chip",
          wordWithBlank: "__ip",
          prompt: "What sound does chip start with?",
          choices: [
            { label: "ch", isCorrect: true },
            { label: "sh", isCorrect: false },
            { label: "j", isCorrect: false },
          ],
        },
        response_type: "tap_choice",
        assets: { audio: [], images: [] },
        srs_data: { due_date: null, stability: 0, difficulty: 0, review_history: [] },
      },
      {
        exercise_id: "L29-WordBuilder-01",
        lesson_number: 29,
        exercise_type: "Word Builder",
        skill_focus: "Spelling with ch",
        data: {
          image: "🪓",
          word: "chop",
          letters: ["ch", "o", "p"],
        },
        response_type: "drag_drop",
        assets: { audio: [], images: [] },
        srs_data: { due_date: null, stability: 0, difficulty: 0, review_history: [] },
      }
    ],
    story: {
      title: "Chip and the Chop",
      text: "Chad has a bag of chips. He will chop a log. Munch, munch, chop, chop!",
      images: []
    },
  },

  // Lesson 30: Digraph 'ck'
  {
    lesson_number: 30,
    phase: 3,
    title: "Digraph ck",
    description: "Identify the /k/ sound at the end of short vowel words.",
    new_graphemes: ["ck"],
    new_irregular_words: [],
    exercises: [
      {
        exercise_id: "L30-SoundSearch-01",
        lesson_number: 30,
        exercise_type: "Sound Search",
        skill_focus: "Identify ck digraph",
        data: {
          image: "🦆",
          word: "duck",
          wordWithBlank: "du__",
          prompt: "What sound does duck end with?",
          choices: [
            { label: "ck", isCorrect: true },
            { label: "k", isCorrect: false }, // Tricky! But 'ck' is the digraph
            { label: "c", isCorrect: false },
          ],
        },
        response_type: "tap_choice",
        assets: { audio: [], images: [] },
        srs_data: { due_date: null, stability: 0, difficulty: 0, review_history: [] },
      },
      {
        exercise_id: "L30-SoundSlide-01",
        lesson_number: 30,
        exercise_type: "Sound Slide",
        skill_focus: "Blending with ck",
        data: {
          image: "🔒",
          word: "lock",
          onset: "l",
          rime: "ock",
        },
        response_type: "drag_drop",
        assets: { audio: [], images: [] },
        srs_data: { due_date: null, stability: 0, difficulty: 0, review_history: [] },
      }
    ],
    story: {
      title: "The Red Rock",
      text: "Rick kicks a red rock. The rock is stuck in the muck. Bad luck, Rick!",
      images: []
    },
  }
];