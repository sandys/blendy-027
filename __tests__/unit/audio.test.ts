import { speakText } from "@/utils/audio";

describe("Audio Utils", () => {
  it("speakText function exists", () => {
    expect(speakText).toBeDefined();
    expect(typeof speakText).toBe("function");
  });

  it("returns promise", () => {
    const result = speakText("test");
    expect(result).toBeInstanceOf(Promise);
  });
});
