import {
  ALL_PHONEME_CARDS,
  PHASES,
  SAMPLE_LESSONS,
} from "@/constants/curriculum-data";

describe("curriculum data integrity", () => {
  it("orders lessons sequentially without gaps", () => {
    const lessonNumbers = SAMPLE_LESSONS.map((lesson) => lesson.lesson_number);
    const sorted = [...lessonNumbers].sort((a, b) => a - b);

    expect(lessonNumbers).toEqual(sorted);
    expect(new Set(lessonNumbers).size).toBe(lessonNumbers.length);
    expect(sorted[0]).toBe(1);
    expect(sorted[sorted.length - 1]).toBe(sorted.length);
    for (let index = 1; index < sorted.length; index += 1) {
      expect(sorted[index] - sorted[index - 1]).toBe(1);
    }
  });

  it("associates lessons to existing phases", () => {
    const phaseMap = new Map(PHASES.map((phase) => [phase.phase, phase]));

    SAMPLE_LESSONS.forEach((lesson) => {
      const phase = phaseMap.get(lesson.phase);
      expect(phase).toBeDefined();
      if (phase) {
        const [start, end] = phase.lessonRange;
        expect(lesson.lesson_number).toBeGreaterThanOrEqual(start);
        expect(lesson.lesson_number).toBeLessThanOrEqual(end);
      }
    });
  });

  it("defines unique phoneme cards ready for unlocking", () => {
    expect(ALL_PHONEME_CARDS.length).toBeGreaterThan(0);

    const phonemes = ALL_PHONEME_CARDS.map((card) => card.phoneme);
    const uniquePhonemes = new Set(phonemes);
    const duplicates = ALL_PHONEME_CARDS.filter(
      (card, index, array) =>
        array.findIndex((candidate) => candidate.phoneme === card.phoneme) !== index
    );

    const allowedDuplicates = new Set(["/th/"]);
    if (duplicates.length > 0) {
      const duplicateSet = new Set(duplicates.map((card) => card.phoneme));
      expect(duplicateSet).toEqual(allowedDuplicates);
    }
    expect(uniquePhonemes.size).toBeGreaterThanOrEqual(
      ALL_PHONEME_CARDS.length - allowedDuplicates.size
    );
    expect(ALL_PHONEME_CARDS.every((card) => card.unlocked === false)).toBe(true);
  });
});
