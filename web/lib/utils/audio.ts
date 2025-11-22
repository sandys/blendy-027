'use client';

// Web Audio Utility using Server-Side Piper TTS

let currentAudio: HTMLAudioElement | null = null;

// Cleaned up: Removed legacy PHONEME_MAP and textToPhoneme.
// We now rely on ACE -> IPA -> Piper (server side).

export async function speakText(input: string, options?: { rate?: number; isPhoneme?: boolean; interrupt?: boolean }): Promise<void> {
  // Convert rate (speed) to Piper's length_scale (slowness)
  const rate = options?.rate || 1.0;
  const lengthScale = Math.max(0.1, 1 / rate).toFixed(2); 

  const shouldInterrupt = options?.interrupt ?? true;
  if (shouldInterrupt) {
    stopSpeaking();
  }

  const params = new URLSearchParams();
  params.set('speed', lengthScale);
  
  if (options?.isPhoneme) {
      params.set('phonemes', input); // Input should be IPA string
  } else {
      params.set('text', input);
  }
  
  const url = `/api/tts?${params.toString()}`;

  return new Promise((resolve) => {
    const audio = new Audio(url);
    
    if (shouldInterrupt) {
        currentAudio = audio;
    }

    audio.onended = () => {
      if (currentAudio === audio) currentAudio = null;
      resolve();
    };

    audio.onerror = (e) => {
      console.error("Audio playback error:", e);
      resolve();
    };

    audio.play().catch(e => {
      console.warn("Autoplay blocked or network error:", e);
      resolve();
    });
  });
}

export function stopSpeaking(): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
}

export function playAudio(src: string): Promise<void> {
    stopSpeaking();
    return new Promise((resolve, reject) => {
        const audio = new Audio(src);
        currentAudio = audio;
        audio.onended = () => {
            currentAudio = null;
            resolve();
        };
        audio.onerror = (e) => reject(e);
        audio.play().catch(reject);
    });
}
