export type PhonemeKind = 'plosive' | 'continuant' | 'vowel';

export interface PhonemeInfo {
  kind: PhonemeKind;
  offset: number;     // in samples
  length: number;     // in samples
  loopStart?: number; // relative to offset, in samples
  loopEnd?: number;   // relative to offset, in samples
}

export interface PhonemeManifest {
  meta: {
    sampleRate: number;
    format: string;
  };
  phonemes: Record<string, PhonemeInfo>;
}

export class PhonemeSynth {
  private ctx: AudioContext | null = null;
  private buffer: AudioBuffer | null = null;
  private manifest: PhonemeManifest | null = null;
  private isLoaded = false;
  private loadPromise: Promise<void> | null = null;

  constructor() {
    // We don't initialize AudioContext here because browsers require user gesture
  }

  public async load() {
    if (this.isLoaded) return;
    if (this.loadPromise) return this.loadPromise;

    this.loadPromise = (async () => {
      try {
        const ts = Date.now();
        // 1. Fetch Manifest
        const jsonRes = await fetch(`/audio/phonemes.json?t=${ts}`);
        if (!jsonRes.ok) throw new Error('Failed to load phonemes.json');
        this.manifest = await jsonRes.json();

        // 2. Fetch Binary Audio
        const binRes = await fetch(`/audio/phonemes.bin?t=${ts}`);
        if (!binRes.ok) throw new Error('Failed to load phonemes.bin');
        const arrayBuffer = await binRes.arrayBuffer();

        // 3. Decode / Prepare AudioBuffer
        // We need an AudioContext to decode or create buffer. 
        // If one doesn't exist, create it (might be suspended)
        if (!this.ctx) {
          this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        }

        const sampleRate = this.manifest!.meta.sampleRate;
        const int16Data = new Int16Array(arrayBuffer);
        const float32Data = new Float32Array(int16Data.length);

        // Convert Int16 -> Float32 manually
        for (let i = 0; i < int16Data.length; i++) {
          const int = int16Data[i];
          // Simple normalization: int / 32768
          // This is what decodeAudioData would essentially do for 16-bit PCM
          float32Data[i] = int < 0 ? int / 32768 : int / 32767;
        }

        // Create buffer
        this.buffer = this.ctx.createBuffer(1, float32Data.length, sampleRate);
        this.buffer.copyToChannel(float32Data, 0);

        this.isLoaded = true;
        console.log('[PhonemeSynth] Loaded successfully');
      } catch (e) {
        console.error('[PhonemeSynth] Load failed', e);
        this.loadPromise = null; // Allow retry
        throw e;
      }
    })();

    return this.loadPromise;
  }

  /**
   * Play a phoneme.
   * @param ipa The IPA symbol (e.g. "p", "s", "æ")
   * @param durationMs Target duration in milliseconds. 
   *                   For plosives, this is largely ignored (plays natural burst).
   *                   For continuants/vowels, this determines sustain time.
   * @returns A control object to stop the sound prematurely.
   */
  public play(ipa: string, durationMs: number = 200, startTime?: number) {
    if (!this.isLoaded || !this.ctx || !this.buffer || !this.manifest) {
      console.warn('[PhonemeSynth] Not loaded yet');
      return { stop: () => {} };
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const info = this.manifest.phonemes[ipa];
    if (!info) {
      console.warn(`[PhonemeSynth] Unknown phoneme: "${ipa}"`);
      return { stop: () => {} };
    }

    const t = startTime !== undefined ? startTime : this.ctx.currentTime;

    const src = this.ctx.createBufferSource();
    src.buffer = this.buffer;

    // Create envelope gain node
    const gain = this.ctx.createGain();
    src.connect(gain);
    gain.connect(this.ctx.destination);

    // Calculate buffer offsets (in seconds)
    const offsetStart = info.offset / this.buffer.sampleRate;
    const bufferDuration = info.length / this.buffer.sampleRate;
    
    console.log(`[PhonemeSynth] REQUEST: "${ipa}"
      Kind: ${info.kind}
      Info: Offset=${info.offset}, Len=${info.length}, SR=${this.buffer.sampleRate}
      Asset Duration: ${bufferDuration.toFixed(4)}s
      Requested Start: ${startTime !== undefined ? startTime.toFixed(4) : 'NOW'} (Context: ${this.ctx.currentTime.toFixed(4)})
      Requested Sustain: ${durationMs}ms
    `);

    // --- PLOSIVE (Stop) ---
    if (info.kind === 'plosive') {
      // Just play the burst. No looping.
      // Small fade out at the very end to avoid clicks
      const fadeOutTime = 0.02; // 20ms fade
      
      gain.gain.setValueAtTime(1, t);
      // Let it play for its natural length (or slightly less if buffer is padded)
      const playDur = bufferDuration;
      
      gain.gain.setValueAtTime(1, t + playDur - fadeOutTime);
      gain.gain.linearRampToValueAtTime(0, t + playDur);

      console.log(`[PhonemeSynth] Scheduling ONE-SHOT: start=${t.toFixed(3)}, duration=${playDur.toFixed(3)}`);
      src.start(t, offsetStart, playDur);
      
      // Stop logic (mostly unnecessary for one-shots)
      return {
        stop: () => {
          try { src.stop(); } catch(e) {}
        }
      };
    }

    // --- CONTINUANT / VOWEL (Seamless Loop) ---
    else {
      // Setup looping
      // The asset is now a "baked loop" (middle segment with crossfaded edges)
      if (info.loopStart === undefined || info.loopEnd === undefined) {
          console.warn(`[PhonemeSynth] Missing loop points for continuant: ${ipa}`);
          return { stop: () => {} };
      }

      src.loop = true;
      src.loopStart = offsetStart + (info.loopStart / this.buffer.sampleRate);
      src.loopEnd = offsetStart + (info.loopEnd / this.buffer.sampleRate);

      console.log(`[PhonemeSynth] Scheduling SEAMLESS LOOP:
        Start Time: ${t.toFixed(3)}
        Offset Start: ${offsetStart.toFixed(4)}s
        Abs LoopStart: ${src.loopStart.toFixed(4)}s
        Abs LoopEnd: ${src.loopEnd.toFixed(4)}s
      `);

      // Envelope Parameters (Attack/Release only, Sustain is infinite)
      const attack = 0.03; 
      const release = 0.05;

      // ADSR
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(1, t + attack);
      // Gain stays at 1 until stop is called

      // Start playing
      src.start(t, offsetStart);
      
      // We do NOT schedule src.stop() automatically based on durationMs.
      // The user (Fingor) must call stop(). 
      // But for safety, if a duration WAS provided (e.g. non-interactive playback), we can respect it?
      // Fingor passes 5000ms. If we stop at 5s, that's fine.
      
      if (durationMs > 0) {
          // Schedule auto-stop if duration is explicit
          // But for "infinite hold", usually we want manual control. 
          // Fingor sends 5000ms as a "long time".
          // Let's just ignore durationMs for the "loop" part and only use it for auto-cleanup?
          // Or better: The caller controls stop.
      }

      return {
        stop: () => {
          console.log(`[PhonemeSynth] Manual STOP called for "${ipa}"`);
          const now = this.ctx!.currentTime;
          gain.gain.cancelScheduledValues(now);
          gain.gain.setValueAtTime(gain.gain.value, now);
          gain.gain.linearRampToValueAtTime(0, now + 0.05); // Quick fade out
          src.stop(now + 0.06);
        }
      };
    }
  }

  public getContext(): AudioContext | null {
      return this.ctx;
  }

  public getPhonemeInfo(ipa: string): PhonemeInfo | undefined {
    if (!this.manifest) {
      console.warn('[PhonemeSynth] Manifest not loaded when requesting phoneme info');
      return undefined;
    }
    return this.manifest.phonemes[ipa];
  }
}

// Singleton instance
export const synth = new PhonemeSynth();
