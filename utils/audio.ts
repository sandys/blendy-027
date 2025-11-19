import { Audio, AVPlaybackStatus } from "expo-av";
import * as Speech from "expo-speech";

let currentSound: Audio.Sound | null = null;
let isSpeaking = false;

const PHONEME_MAP: Record<string, string> = {
  "a": "aaa",
  "b": "buh",
  "c": "kuh",
  "d": "duh",
  "e": "eh",
  "f": "fff",
  "g": "guh",
  "h": "hhh",
  "i": "ih",
  "j": "juh",
  "k": "kuh",
  "l": "lll",
  "m": "mmm",
  "n": "nnn",
  "o": "ah",
  "p": "puh",
  "q": "kuh",
  "r": "rrr",
  "s": "ss", // Changed to 'ss' for a more accurate /s/ phoneme sound, avoiding repetition of letter name
  "t": "tuh",
  "u": "uh",
  "v": "vvv",
  "w": "www",
  "x": "ks",
  "y": "yuh",
  "z": "zzz",
  "sh": "shh",
  "ch": "chh",
  "th": "thh",
  "wh": "whh",
  "ng": "ng",
  "ck": "kuh",
  "qu": "kwuh",
  "ff": "fff",
  "ll": "lll",
  "ss": "sss",
  "bl": "bluh",
  "cl": "kluh",
  "fl": "fluh",
  "pl": "pluh",
  "sl": "sluh",
  "gl": "gluh",
  "br": "bruh",
  "cr": "kruh",
  "dr": "druh",
  "fr": "fruh",
  "gr": "gruh",
  "pr": "pruh",
  "tr": "truh",
  "sc": "skuh",
  "sk": "skuh",
  "sm": "smuh",
  "sn": "snuh",
  "sp": "spuh",
  "st": "stuh",
  "sw": "swuh",
};

function textToPhoneme(text: string): string {
  const lower = text.toLowerCase().trim();
  
  if (PHONEME_MAP[lower]) {
    return PHONEME_MAP[lower];
  }
  
  return text;
}

export async function speakText(text: string, options?: { rate?: number; pitch?: number; usePhoneme?: boolean }): Promise<void> {
  try {
    if (isSpeaking) {
      await Speech.stop();
    }

    isSpeaking = true;

    const textToSpeak = options?.usePhoneme === true ? textToPhoneme(text) : text;

    await Speech.speak(textToSpeak, {
      language: "en-US",
      pitch: options?.pitch || 1.0,
      rate: options?.rate || 0.85,
      onDone: () => {
        isSpeaking = false;
      },
      onStopped: () => {
        isSpeaking = false;
      },
      onError: () => {
        isSpeaking = false;
      },
    });
  } catch (error) {
    console.error("Error speaking text:", error);
    isSpeaking = false;
  }
}

export async function stopSpeaking(): Promise<void> {
  try {
    if (isSpeaking) {
      await Speech.stop();
      isSpeaking = false;
    }
  } catch (error) {
    console.error("Error stopping speech:", error);
  }
}

export async function playAudio(audioUri: string): Promise<void> {
  try {
    if (currentSound) {
      await currentSound.unloadAsync();
      currentSound = null;
    }

    if (!audioUri) {
      console.warn("No audio URI provided");
      return;
    }

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
    });

    const { sound } = await Audio.Sound.createAsync(
      { uri: audioUri },
      { shouldPlay: true }
    );

    currentSound = sound;

    sound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
      if (status.isLoaded && status.didJustFinish) {
        sound.unloadAsync();
        if (currentSound === sound) {
          currentSound = null;
        }
      }
    });
  } catch (error) {
    console.error("Error playing audio:", error);
  }
}

export async function stopAudio(): Promise<void> {
  try {
    if (currentSound) {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
      currentSound = null;
    }
  } catch (error) {
    console.error("Error stopping audio:", error);
  }
}

function elongateSegment(segment: string, factor = 3): string {
  return segment
    .split("")
    .map((ch) => ch.repeat(factor))
    .join("");
}

const vowels = ["a", "e", "i", "o", "u"];

const digraphs = ["sh", "ch", "th", "wh", "ng", "ck", "qu", "ph", "gh"];
const consonantBlends = [
  "bl", "cl", "fl", "gl", "pl", "sl",
  "br", "cr", "dr", "fr", "gr", "pr", "tr",
  "sc", "sk", "sm", "sn", "sp", "st", "sw",
  "scr", "spr", "str", "spl", "thr", "shr"
];

function findOnsetEnd(word: string): number {
  const lower = word.toLowerCase();
  
  const firstVowelIndex = [...lower].findIndex((ch) => vowels.includes(ch));
  if (firstVowelIndex === -1) return -1;
  if (firstVowelIndex === 0) return 0;
  
  for (let len = 3; len >= 2; len--) {
    if (firstVowelIndex >= len) {
      const possibleBlend = lower.slice(firstVowelIndex - len, firstVowelIndex);
      if (consonantBlends.includes(possibleBlend)) {
        return firstVowelIndex;
      }
    }
  }
  
  return firstVowelIndex;
}

function findVowelEnd(word: string, vowelStart: number): number {
  const lower = word.toLowerCase();
  
  for (const digraph of digraphs) {
    if (lower.slice(vowelStart).startsWith(digraph)) {
      return vowelStart + digraph.length;
    }
  }
  
  let end = vowelStart + 1;
  while (end < lower.length && vowels.includes(lower[end])) {
    end++;
  }
  
  return end;
}

export async function playBlending(word: string): Promise<void> {
  try {
    const lower = word.toLowerCase();
    const firstVowelIndex = [...lower].findIndex((ch) => vowels.includes(ch));

    if (firstVowelIndex === -1) {
      console.warn("No vowel found in word:", word);
      await speakText(word, { rate: 0.5 });
      return;
    }

    const onsetEnd = findOnsetEnd(lower);
    if (onsetEnd === -1) {
      console.warn("Could not determine onset for word:", word);
      await speakText(word, { rate: 0.5 });
      return;
    }

    const onset = lower.slice(0, onsetEnd);
    const vowelEnd = findVowelEnd(lower, onsetEnd);
    const vowelPart = lower.slice(onsetEnd, vowelEnd);
    const coda = lower.slice(vowelEnd);

    const cvPart = elongateSegment(onset + vowelPart);
    const cvcPart = elongateSegment(lower);

    console.log("Blending:", { word, onset, vowelPart, coda, cvPart, cvcPart });

    await new Promise<void>((resolve) => {
      Speech.speak(cvPart, {
        rate: 0.5,
        pitch: 1.0,
        language: "en-US",
        onDone: () => resolve(),
        onStopped: () => resolve(),
        onError: () => resolve(),
      });
    });

    await new Promise((r) => setTimeout(r, 150));

    await new Promise<void>((resolve) => {
      Speech.speak(cvcPart, {
        rate: 0.5,
        pitch: 1.0,
        language: "en-US",
        onDone: () => resolve(),
        onStopped: () => resolve(),
        onError: () => resolve(),
      });
    });
  } catch (error) {
    console.error("Error in playBlending:", error);
  }
}
