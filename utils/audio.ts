import { Audio, AVPlaybackStatus } from "expo-av";
import * as Speech from "expo-speech";

let currentSound: Audio.Sound | null = null;
let isSpeaking = false;

export async function speakText(text: string, options?: { rate?: number; pitch?: number }): Promise<void> {
  try {
    if (isSpeaking) {
      await Speech.stop();
    }

    isSpeaking = true;

    await Speech.speak(text, {
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

export async function playBlending(word: string): Promise<void> {
  try {
    const lower = word.toLowerCase();
    const firstVowelIndex = [...lower].findIndex((ch) => vowels.includes(ch));

    if (firstVowelIndex === -1) {
      console.warn("No vowel found in word:", word);
      await speakText(word, { rate: 0.5 });
      return;
    }

    const onset = lower.slice(0, firstVowelIndex);
    const vowel = lower[firstVowelIndex];

    const cvPart = elongateSegment(onset + vowel);
    const cvcPart = elongateSegment(lower);

    console.log("Blending:", { word, cvPart, cvcPart });

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
