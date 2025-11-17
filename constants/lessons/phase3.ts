import { Lesson } from "@/types/curriculum";

// Phase 3: Expanding the Phonetic Code (Lessons 26-45)
// Digraphs, Blends, FLOSS Rule, Glued Sounds
export const phase3Lessons: Lesson[] = [
  {
    lesson_number: 26,
    phase: 3,
    title: "Digraph sh",
    description: "Identify the /sh/ sound at the start of words.",
    new_graphemes: ["sh"],
    exercises: [
      {
        exercise_id: "L26-SoundSearch-001",
        lesson_number: 26,
        exercise_type: "Sound Search",
        skill_focus: "Blend the /sh/ digraph with word endings.",
        data: {
          image: "🚢",
          word: "ship",
          wordWithBlank: "__ip",
          prompt: "What sound starts ship?",
          choices: [
            { label: "sh", isCorrect: true },
            { label: "ch", isCorrect: false },
            { label: "th", isCorrect: false },
          ],
        },
        response_type: "tap_choice",
        assets: {
          audio: [],
          images: [],
        },
        srs_data: {
          due_date: null,
          stability: 0,
          difficulty: 0,
          review_history: [],
        },
      },
    ],
    story: {
      title: "A Ship for Sam",
      text: "Sam spots a big ship. The ship has red sails. Sam and his pal wish to sail it soon.",
    },
  },
];
