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

async function loadModel() {
  if (!voiceConfig) {
    const configData = fs.readFileSync(CONFIG_PATH, 'utf-8');
    voiceConfig = JSON.parse(configData);
  }
  if (!ortSession) {
    ortSession = await ort.InferenceSession.create(MODEL_PATH);
  }
  return { voiceConfig, ortSession };
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
 * Generate audio from IPA phonemes using ONNX Runtime
 */
export async function generateAudioONNX(
  phonemes: string,
  lengthScale: number = 1.0
): Promise<PCM> {
  try {
    const { voiceConfig, ortSession } = await loadModel();

    console.log(`[Piper ONNX] Generating audio for phonemes: "${phonemes}"`);

    // Convert phonemes to IDs
    const phonemeIds = phonemesToIds(phonemes, voiceConfig);
    console.log(`[Piper ONNX] Phoneme IDs:`, phonemeIds);

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

    console.log(`[Piper ONNX] Generated ${audioData.length} audio samples`);

    // Convert float32 PCM to int16 PCM
    const int16Data = new Int16Array(audioData.length);
    for (let i = 0; i < audioData.length; i++) {
      // Clamp to [-1, 1] and convert to int16 range
      const clampedValue = Math.max(-1, Math.min(1, audioData[i]));
      int16Data[i] = Math.round(clampedValue * 32767);
    }

    return {
      samples: int16Data,
      sampleRate: voiceConfig.audio.sample_rate
    };
  } catch (error) {
    console.error('[Piper ONNX] Generation failed:', error);
    // Return silence on error
    return { samples: new Int16Array(16000), sampleRate: 16000 };
  }
}
