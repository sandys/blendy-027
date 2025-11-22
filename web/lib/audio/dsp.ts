import { WaveFile } from 'wavefile';

export type PCM = {
  samples: Int16Array;
  sampleRate: number;
};

export function readWav(buffer: Buffer): PCM {
  const wav = new WaveFile(buffer);
  wav.toBitDepth("16"); 
  
  const fmt = wav.fmt as any;
  const sampleRate = fmt.sampleRate;
  
  // wavefile.getSamples returns Float64Array usually, or typed array based on bit depth.
  // getSamples(false, Int16Array) might work?
  // wavefile documentation says .getSamples() returns Float64Array.
  // We can access .data.samples directly if we know internal structure, but let's use public API.
  
  const samples = wav.getSamples(false, Int16Array) as unknown as Int16Array;
  
  // If mono, it returns typed array. If stereo, array of arrays.
  // Piper is mono.
  
  return {
      samples: samples,
      sampleRate
  };
}

export function createWav(pcm: PCM): Buffer {
  const wav = new WaveFile();
  wav.fromScratch(1, pcm.sampleRate, '16', pcm.samples);
  return Buffer.from(wav.toBuffer());
}

export function concat(buffers: PCM[]): PCM {
  if (buffers.length === 0) throw new Error("No buffers to concat");
  const sr = buffers[0].sampleRate;
  
  let totalLen = 0;
  for (const b of buffers) totalLen += b.samples.length;
  
  const result = new Int16Array(totalLen);
  let offset = 0;
  for (const b of buffers) {
      if (b.sampleRate !== sr) throw new Error("Sample rate mismatch");
      result.set(b.samples, offset);
      offset += b.samples.length;
  }
  
  return { samples: result, sampleRate: sr };
}

export function silence(ms: number, sampleRate: number): PCM {
  const numSamples = Math.floor((ms / 1000) * sampleRate);
  return {
      samples: new Int16Array(numSamples).fill(0),
      sampleRate
  };
}

// Linear crossfade
export function crossfade(a: PCM, b: PCM, overlapMs: number): PCM {
  if (a.sampleRate !== b.sampleRate) throw new Error("Sample rate mismatch");
  const overlapSamples = Math.floor((overlapMs / 1000) * a.sampleRate);
  
  // If overlap is longer than clips, clamp it
  const actualOverlap = Math.min(overlapSamples, a.samples.length, b.samples.length);
  
  const lenA = a.samples.length;
  const lenB = b.samples.length;
  const newLen = lenA + lenB - actualOverlap;
  
  const result = new Int16Array(newLen);
  
  // Copy A (up to overlap)
  result.set(a.samples.subarray(0, lenA - actualOverlap), 0);
  
  // Overlap region
  const overlapStart = lenA - actualOverlap;
  for (let i = 0; i < actualOverlap; i++) {
      const fadeOut = 1 - (i / actualOverlap);
      const fadeIn = i / actualOverlap;
      
      const sampleA = a.samples[lenA - actualOverlap + i];
      const sampleB = b.samples[i];
      
      result[overlapStart + i] = (sampleA * fadeOut) + (sampleB * fadeIn);
  }
  
  // Copy B (remaining)
  result.set(b.samples.subarray(actualOverlap), overlapStart + actualOverlap);
  
  return { samples: result, sampleRate: a.sampleRate };
}

export function getDurationMs(pcm: PCM): number {
    return (pcm.samples.length / pcm.sampleRate) * 1000;
}

export function trimSilence(pcm: PCM, threshold = 0.01): PCM {
    const samples = pcm.samples;
    const limit = 32767 * threshold;
    
    let start = 0;
    let end = samples.length - 1;

    while (start < samples.length && Math.abs(samples[start]) < limit) {
        start++;
    }

    // If completely silent
    if (start >= samples.length) {
        return { samples: new Int16Array(0), sampleRate: pcm.sampleRate };
    }

    while (end > start && Math.abs(samples[end]) < limit) {
        end--;
    }

    // Add a tiny padding (10ms) to avoid harsh cuts? 
    // Or just return strict trim. Strict trim is better for crossfade.
    const trimmed = samples.subarray(start, end + 1);
    
    // We must copy to new array to avoid holding ref to large buffer
    const result = new Int16Array(trimmed);
    
    return { samples: result, sampleRate: pcm.sampleRate };
}
