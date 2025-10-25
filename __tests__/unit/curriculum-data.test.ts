import { PHASES, SAMPLE_LESSONS, ALL_PHONEME_CARDS } from "@/constants/curriculum-data";

describe("Curriculum Data", () => {
  describe("PHASES", () => {
    it("has 4 phases", () => {
      expect(PHASES).toHaveLength(4);
    });

    it("has correct phase numbers", () => {
      expect(PHASES.map(p => p.phase)).toEqual([1, 2, 3, 4]);
    });

    it("has correct lesson ranges", () => {
      expect(PHASES[0].lessonRange).toEqual([1, 5]);
      expect(PHASES[1].lessonRange).toEqual([6, 25]);
      expect(PHASES[2].lessonRange).toEqual([26, 45]);
      expect(PHASES[3].lessonRange).toEqual([46, 55]);
    });
  });

  describe("SAMPLE_LESSONS", () => {
    it("has lessons", () => {
      expect(SAMPLE_LESSONS.length).toBeGreaterThan(0);
    });

    it("has correct structure", () => {
      const lesson = SAMPLE_LESSONS[0];
      expect(lesson).toHaveProperty("lesson_number");
      expect(lesson).toHaveProperty("phase");
      expect(lesson).toHaveProperty("title");
      expect(lesson).toHaveProperty("description");
      expect(lesson).toHaveProperty("exercises");
    });

    it("has exercises with correct structure", () => {
      const exercise = SAMPLE_LESSONS[0].exercises[0];
      expect(exercise).toHaveProperty("exercise_id");
      expect(exercise).toHaveProperty("exercise_type");
      expect(exercise).toHaveProperty("skill_focus");
      expect(exercise).toHaveProperty("data");
      expect(exercise).toHaveProperty("response_type");
    });

    it("has sequential lesson numbers", () => {
      const lessonNumbers = SAMPLE_LESSONS.map(l => l.lesson_number);
      for (let i = 0; i < lessonNumbers.length - 1; i++) {
        expect(lessonNumbers[i + 1]).toBe(lessonNumbers[i] + 1);
      }
    });
  });

  describe("ALL_PHONEME_CARDS", () => {
    it("has 44 phonemes", () => {
      expect(ALL_PHONEME_CARDS).toHaveLength(44);
    });

    it("has consonants and vowels", () => {
      const consonants = ALL_PHONEME_CARDS.filter(c => c.category === "consonant");
      const vowels = ALL_PHONEME_CARDS.filter(c => c.category === "vowel");

      expect(consonants.length).toBeGreaterThan(0);
      expect(vowels.length).toBeGreaterThan(0);
      expect(consonants.length + vowels.length).toBe(44);
    });

    it("has correct structure", () => {
      const card = ALL_PHONEME_CARDS[0];
      expect(card).toHaveProperty("phoneme");
      expect(card).toHaveProperty("graphemes");
      expect(card).toHaveProperty("anchorWord");
      expect(card).toHaveProperty("anchorImage");
      expect(card).toHaveProperty("category");
      expect(card).toHaveProperty("unlocked");
    });
  });
});
