import type { Lesson, Exercise, PhonemeCard } from "@/types/curriculum";

describe("TypeScript Types", () => {
  it("Lesson type compiles", () => {
    const lesson: Lesson = {
      lesson_number: 1,
      phase: 1,
      title: "Test",
      description: "Test",
      exercises: [],
    };
    expect(lesson.lesson_number).toBe(1);
  });

  it("Exercise type compiles", () => {
    const exercise: Exercise = {
      exercise_id: "test",
      lesson_number: 1,
      exercise_type: "Rhyme Match",
      skill_focus: "test",
      data: { target: { word: "cat", image: "🐱" }, choices: [] },
      response_type: "tap_image",
      assets: {},
      srs_data: {
        due_date: null,
        stability: 0,
        difficulty: 0,
        review_history: [],
      },
    };
    expect(exercise.exercise_id).toBe("test");
  });

  it("PhonemeCard type compiles", () => {
    const card: PhonemeCard = {
      phoneme: "/a/",
      graphemes: ["a"],
      anchorWord: "apple",
      anchorImage: "🍎",
      category: "vowel",
      unlocked: false,
    };
    expect(card.phoneme).toBe("/a/");
  });
});
