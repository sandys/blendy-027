import { Audio } from "expo-av";
import * as Speech from "expo-speech";
import {
  playAudio,
  playBlending,
  speakText,
  stopAudio,
  stopSpeaking,
} from "@/utils/audio";

const getSpeechMock = () => Speech.speak as jest.Mock;
const getAudioCreateMock = () => Audio.Sound.createAsync as jest.Mock;
const getAudioModeMock = () => Audio.setAudioModeAsync as jest.Mock;

describe("audio utilities", () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterAll(() => {
    consoleLogSpy.mockRestore();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("speakText forwards text with default options", async () => {
    await speakText("hello");

    expect(getSpeechMock()).toHaveBeenCalledTimes(1);
    const [utterance, options] = getSpeechMock().mock.calls[0];
    expect(utterance).toBe("hello");
    expect(options.rate).toBe(0.85);
    expect(options.pitch).toBe(1);
    expect(typeof options.onDone).toBe("function");
  });

  it("speakText uses phoneme map when requested", async () => {
    await speakText("sh", { usePhoneme: true });

    const [utterance] = getSpeechMock().mock.calls.pop() ?? [];
    expect(utterance).toBe("shh");
  });

  it("stopSpeaking aborts active speech safely", async () => {
    getSpeechMock().mockImplementationOnce(() => Promise.resolve());

    await speakText("hello");
    await stopSpeaking();

    expect(Speech.stop).toHaveBeenCalled();
  });

  it("playAudio prepares and starts playback", async () => {
    await playAudio("https://example.com/test.mp3");

    expect(getAudioModeMock()).toHaveBeenCalledTimes(1);
    expect(getAudioCreateMock()).toHaveBeenCalledWith(
      { uri: "https://example.com/test.mp3" },
      { shouldPlay: true }
    );
  });

  it("stopAudio unloads current sound instance", async () => {
    await playAudio("https://example.com/test.mp3");
    await stopAudio();

    const { sound } = await getAudioCreateMock().mock.results[0].value;
    expect(sound.stopAsync).toHaveBeenCalled();
    expect(sound.unloadAsync).toHaveBeenCalled();
  });

  it("playBlending emphasizes onset-vowel and whole word", async () => {
    await playBlending("cat");

    const calls = getSpeechMock().mock.calls;
    const phonemeCalls = calls.slice(-2).map(([text]) => text);
    expect(phonemeCalls[0]).toBe("cccaaa");
    expect(phonemeCalls[1]).toBe("cccaaattt");
  });
});
