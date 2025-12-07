import * as ort from 'onnxruntime-node';
import fs from 'fs';
import { PCM } from './dsp';

const MODEL_PATH = '/usr/local/share/piper/en_US-amy-low.onnx';
const CONFIG_PATH = '/usr/local/share/piper/en_US-amy-low.onnx.json';

interface VoiceConfig {
  audio: {
    sample_rate: number;
    quality: string;
  };
  inference: {
    noise_scale: number;
    length_scale: number;
    noise_w: number;
  };
  phoneme_id_map: { [key: string]: number[] };
  num_symbols: number;
}

let voiceConfig: VoiceConfig | null = null;
let ortSession: ort.InferenceSession | null = null;

async function loadModel(): Promise<{ voiceConfig: VoiceConfig; ortSession: ort.InferenceSession }> {
  if (!voiceConfig) {
    const configData = fs.readFileSync(CONFIG_PATH, 'utf-8');
    voiceConfig = JSON.parse(configData);
  }
  if (!ortSession) {
    ortSession = await ort.InferenceSession.create(MODEL_PATH);
  }
  return { voiceConfig: voiceConfig!, ortSession: ortSession! };
}

/**
 * Convert IPA phoneme string to phoneme IDs using the voice config
 */
function phonemesToIds(phonemes: string, config: VoiceConfig): number[] {
  const ids: number[] = [];

  // Add start token
  ids.push(...(config.phoneme_id_map['^'] || [1]));

  // Convert each phoneme character to its ID
  for (const char of phonemes) {
    const phonemeIds = config.phoneme_id_map[char];
    if (phonemeIds) {
      ids.push(...phonemeIds);
    } else {
      console.warn(`[Piper ONNX] Unknown phoneme: "${char}" (${char.charCodeAt(0)})`);
      // Use padding token for unknown phonemes
      ids.push(...(config.phoneme_id_map['_'] || [0]));
    }
  }

  // Add end token
  ids.push(...(config.phoneme_id_map['$'] || [2]));

  return ids;
}

/**
 * Custom error class for TTS generation failures
 */
export class TTSGenerationError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = 'TTSGenerationError';
  }
}

/**
 * Generate audio from IPA phonemes using ONNX Runtime
 * @throws {TTSGenerationError} if generation fails
 */
export async function generateAudioONNX(
  phonemes: string,
  lengthScale: number = 1.0
): Promise<PCM> {
  if (!phonemes || phonemes.trim().length === 0) {
    console.warn('[Piper ONNX] Empty phonemes input, returning silence');
    return { samples: new Int16Array(16000), sampleRate: 16000 };
  }

  try {
    const { voiceConfig, ortSession } = await loadModel();

    console.log(`[Piper ONNX] Generating audio for phonemes: "${phonemes}" (scale: ${lengthScale})`);

    // Convert phonemes to IDs
    const phonemeIds = phonemesToIds(phonemes, voiceConfig);

    if (phonemeIds.length < 3) {
      console.warn('[Piper ONNX] Too few phoneme IDs, returning silence');
      return { samples: new Int16Array(16000), sampleRate: 16000 };
    }

    // Create input tensors
    const inputTensor = new ort.Tensor('int64', BigInt64Array.from(phonemeIds.map(id => BigInt(id))), [1, phonemeIds.length]);
    const inputLengthsTensor = new ort.Tensor('int64', BigInt64Array.from([BigInt(phonemeIds.length)]));
    const scalesTensor = new ort.Tensor('float32', Float32Array.from([
      voiceConfig.inference.noise_scale,
      lengthScale,
      voiceConfig.inference.noise_w
    ]));

    // Run inference
    const feeds = {
      input: inputTensor,
      input_lengths: inputLengthsTensor,
      scales: scalesTensor
    };

    const output = await ortSession.run(feeds);
    const audioData = output.output.data as Float32Array;

    if (!audioData || audioData.length === 0) {
      throw new TTSGenerationError('ONNX model returned empty audio data');
    }

    console.log(`[Piper ONNX] Generated ${audioData.length} audio samples`);

    // Convert float32 PCM to int16 PCM with volume boost
    const volumeBoost = 2.0;
    const int16Data = new Int16Array(audioData.length);
    for (let i = 0; i < audioData.length; i++) {
      const boostedValue = audioData[i] * volumeBoost;
      const clampedValue = Math.max(-1, Math.min(1, boostedValue));
      int16Data[i] = Math.round(clampedValue * 32767);
    }

    return {
      samples: int16Data,
      sampleRate: voiceConfig.audio.sample_rate
    };
  } catch (error) {
    console.error('[Piper ONNX] Generation failed:', error);

    // Re-throw known errors
    if (error instanceof TTSGenerationError) {
      throw error;
    }

    // For unexpected errors, return silence but log the issue
    console.error('[Piper ONNX] Returning silence due to error');
    return { samples: new Int16Array(16000), sampleRate: 16000 };
  }
}
