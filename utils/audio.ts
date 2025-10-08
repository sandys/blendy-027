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
