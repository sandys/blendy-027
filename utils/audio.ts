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

export function textToPhoneme(text: string): string {
  const lower = text.toLowerCase().trim();
  
  if (PHONEME_MAP[lower]) {
    return PHONEME_MAP[lower];
  }
  
  return text;
}

export async function speakText(text: string, options?: { rate?: number; pitch?: number; usePhoneme?: boolean; interrupt?: boolean }): Promise<void> {
  return new Promise(async (resolve) => {
    try {
      const shouldInterrupt = options?.interrupt ?? true;
      
      if (shouldInterrupt && isSpeaking) {
        await Speech.stop();
      }

      isSpeaking = true;
      const textToSpeak = options?.usePhoneme === true ? textToPhoneme(text) : text;

      Speech.speak(textToSpeak, {
        language: "en-US",
        pitch: options?.pitch || 1.0,
        rate: options?.rate || 0.85,
        onDone: () => {
          isSpeaking = false;
          resolve();
        },
        onStopped: () => {
          isSpeaking = false;
          resolve();
        },
        onError: () => {
          isSpeaking = false;
          resolve();
        },
      });
    } catch (error) {
      console.error("Error speaking text:", error);
      isSpeaking = false;
      resolve();
    }
  });
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

export function getStretchedWord(word: string): string {
  const lower = word.toLowerCase();
  const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
  let stretched = "";
  let vowelFound = false;

  for (let i = 0; i < lower.length; i++) {
    const char = lower[i];
    stretched += char;
    // Extend the first vowel found significantly
    if (!vowelFound && vowels.includes(char)) {
       // 15 repeats usually forces a very long duration
       stretched += char.repeat(15);
       vowelFound = true;
    }
  }
  // If no vowel (rare), just return word
  return stretched || word;
}

export async function playBlending(word: string): Promise<void> {
  try {
    stopSpeaking(); // Ensure no other speech is active
    const lowerWord = word.toLowerCase();
    console.log("Blending:", { word: lowerWord });

    // Step 1: Speak the whole word slowly to create a stretched blending effect
    await speakText(lowerWord, {
      rate: 0.35, // Very slow rate for stretched effect
      pitch: 1.0,
      usePhoneme: false, // Speak as a full word, not individual phonemes
    });

    await new Promise((r) => setTimeout(r, 300)); // Short pause

    // Step 2: Speak the whole word at a normal rate
    await speakText(lowerWord, {
      rate: 0.85, // Normal rate
      pitch: 1.0,
      usePhoneme: false,
    });
  } catch (error) {
    console.error("Error in playBlending:", error);
  }
}
