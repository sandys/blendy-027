import * as fs from 'fs';
import * as path from 'path';
import * as ort from 'onnxruntime-node';

// --- Constants & Config ---

const MODEL_PATH = '/usr/local/share/piper/en_US-amy-low.onnx';
const CONFIG_PATH = '/usr/local/share/piper/en_US-amy-low.onnx.json';
const OUTPUT_DIR = path.resolve(__dirname, '../public/audio');

const SAMPLE_RATE = 16000; // Piper model sample rate

type PhonemeKind = 'plosive' | 'continuant' | 'vowel';

interface PhonemeDef {
    ipa: string;
    kind: PhonemeKind;
}

// 44 English Phonemes + Types
const INVENTORY: PhonemeDef[] = [
    // Plosives (Stops)
    { ipa: 'p', kind: 'plosive' },
    { ipa: 'b', kind: 'plosive' },
    { ipa: 't', kind: 'plosive' },
    { ipa: 'd', kind: 'plosive' },
    { ipa: 'k', kind: 'plosive' },
    { ipa: 'ɡ', kind: 'plosive' }, // Script g
    { ipa: 'tʃ', kind: 'plosive' }, // ch -> t + ʃ
    { ipa: 'dʒ', kind: 'plosive' }, // j -> d + ʒ

    // Fricatives (Continuant)
    { ipa: 'f', kind: 'continuant' },
    { ipa: 'v', kind: 'continuant' },
    { ipa: 'θ', kind: 'continuant' }, // th (thing)
    { ipa: 'ð', kind: 'continuant' }, // th (this)
    { ipa: 's', kind: 'continuant' },
    { ipa: 'z', kind: 'continuant' },
    { ipa: 'ʃ', kind: 'continuant' }, // sh
    { ipa: 'ʒ', kind: 'continuant' }, // zh
    { ipa: 'h', kind: 'continuant' },

    // Nasals (Continuant)
    { ipa: 'm', kind: 'continuant' },
    { ipa: 'n', kind: 'continuant' },
    { ipa: 'ŋ', kind: 'continuant' }, // ng

    // Approximants (Continuant)
    { ipa: 'l', kind: 'continuant' },
    { ipa: 'ɹ', kind: 'continuant' }, // r
    { ipa: 'j', kind: 'continuant' }, // y
    { ipa: 'w', kind: 'continuant' },

    // Vowels (Monophthongs)
    { ipa: 'i', kind: 'vowel' }, // ee
    { ipa: 'ɑ', kind: 'vowel' }, // ar
    { ipa: 'ɔ', kind: 'vowel' }, // or
    { ipa: 'u', kind: 'vowel' }, // oo
    { ipa: 'ɜ', kind: 'vowel' }, // ur
    { ipa: 'ɪ', kind: 'vowel' }, // i
    { ipa: 'ɛ', kind: 'vowel' }, // e (epsilon)
    { ipa: 'æ', kind: 'vowel' }, // a
    { ipa: 'ɔ', kind: 'vowel' }, // o (ɒ not in map, use ɔ)
    { ipa: 'ʊ', kind: 'vowel' }, // u (put)
    { ipa: 'ʌ', kind: 'vowel' }, // u (up)
    { ipa: 'ə', kind: 'vowel' }, // schwa

    // Vowels (Diphthongs - represented as sequences in Piper)
    { ipa: 'eɪ', kind: 'vowel' },
    { ipa: 'aɪ', kind: 'vowel' },
    { ipa: 'ɔɪ', kind: 'vowel' },
    { ipa: 'aʊ', kind: 'vowel' },
    { ipa: 'əʊ', kind: 'vowel' }, // oh
    { ipa: 'ɪə', kind: 'vowel' }, // ear
    { ipa: 'eə', kind: 'vowel' }, // air
    { ipa: 'ʊə', kind: 'vowel' }, // ure
];

// --- Generation Logic ---

let session: ort.InferenceSession;
let config: any;

async function init() {
    console.log('Loading model from:', MODEL_PATH);
    const configData = fs.readFileSync(CONFIG_PATH, 'utf-8');
    config = JSON.parse(configData);
    session = await ort.InferenceSession.create(MODEL_PATH);
}

function phonemesToIds(phonemes: string): number[] {
    const ids: number[] = [];
    ids.push(...(config.phoneme_id_map['^'] || [1]));
    for (const char of phonemes) {
        if (config.phoneme_id_map[char]) {
            ids.push(...config.phoneme_id_map[char]);
        } else {
            console.warn(`Unknown phoneme char: ${char}`);
             ids.push(...(config.phoneme_id_map['_'] || [0]));
        }
    }
    ids.push(...(config.phoneme_id_map['$'] || [2]));
    return ids;
}

async function generateRaw(phonemes: string, lengthScale: number): Promise<Float32Array> {
    const ids = phonemesToIds(phonemes);
    const inputTensor = new ort.Tensor('int64', BigInt64Array.from(ids.map(BigInt)), [1, ids.length]);
    const inputLengths = new ort.Tensor('int64', BigInt64Array.from([BigInt(ids.length)]));
    // noise_scale, length_scale, noise_w
    const scales = new ort.Tensor('float32', Float32Array.from([0.4, lengthScale, 0.8])); // Reduced noise_scale

    const feeds = { input: inputTensor, input_lengths: inputLengths, scales: scales };
    const output = await session.run(feeds);
    return output.output.data as Float32Array;
}

// Convert float32 [-1, 1] to Int16
function toInt16(float32: Float32Array): Int16Array {
    const int16 = new Int16Array(float32.length);
    for (let i = 0; i < float32.length; i++) {
        // Simple clip
        const s = Math.max(-1, Math.min(1, float32[i]));
        int16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    return int16;
}

// --- Loop Processing ---

function makeLoopable(samples: Int16Array, sampleRate: number): { samples: Int16Array, loopStart: number, loopEnd: number } {
    // 1. Extract a stable middle region (e.g. 50% to 90%)
    // Start later (50%) to strictly avoid onset artifacts (e.g. "eff", "em", "uh").
    const startIdx = Math.floor(samples.length * 0.50);
    const endIdx = Math.floor(samples.length * 0.90);
    const regionLen = endIdx - startIdx;
    
    // 2. Define Crossfade Length (e.g. 50ms)
    const fadeLen = Math.floor(0.05 * sampleRate);
    
    if (regionLen < 2 * fadeLen) {
        // Too short to loop properly, just return as is
        return { samples, loopStart: 0, loopEnd: samples.length };
    }

    // 3. The Target Loop Length is Region - Fade
    // We will blend the last 'fadeLen' samples of the region INTO the first 'fadeLen' samples.
    const loopLen = regionLen - fadeLen;
    const result = new Int16Array(loopLen);
    
    // Copy the main body
    // region[0...loopLen] -> result[0...loopLen]
    // The region starts at samples[startIdx]
    result.set(samples.subarray(startIdx, startIdx + loopLen), 0);
    
    // 4. Perform Crossfade on the start of the result buffer
    // We blend the *end* of the region (which would have been just after the loop)
    // into the *beginning* of the loop.
    // End of region is samples[startIdx + loopLen ... startIdx + loopLen + fadeLen]
    
    for (let i = 0; i < fadeLen; i++) {
        const enteringLoop = samples[startIdx + loopLen + i]; // From end of region
        const startingLoop = result[i];                       // Current start of loop
        
        // Linear Crossfade
        // We want to go from Entering (at end of prev cycle) -> Starting (at start of new cycle)
        // Wait, standard logic:
        // loop[i] = mix(loop_start[i], loop_end[i])
        // Let's fade OUT the "end of region" and fade IN the "start of region"
        
        const progress = i / fadeLen;
        // At i=0: We are at the loop boundary. We want continuity from the END of the previous iteration.
        // So we want mostly "EnteringLoop".
        // At i=1: We want to be fully "StartingLoop".
        
        const blended = (enteringLoop * (1 - progress)) + (startingLoop * progress);
        result[i] = blended;
    }
    
    return { 
        samples: result, 
        loopStart: 0, 
        loopEnd: loopLen // Loop the whole result buffer
    };
}

// --- Trimming Heuristics ---

function processSamples(raw: Float32Array, kind: PhonemeKind): { samples: Int16Array, loopStart?: number, loopEnd?: number } {
    const sr = SAMPLE_RATE;
    const samples = toInt16(raw);
    
    if (kind === 'plosive') {
        const keepMs = 180; 
        const keepLen = Math.min(samples.length, Math.floor((keepMs / 1000) * sr));
        
        let start = 0;
        const threshold = 32767 * 0.02;
        while(start < samples.length && Math.abs(samples[start]) < threshold) start++;
        
        if (start < samples.length) {
            const actualKeepLen = Math.min(samples.length - start, keepLen);
            return { samples: samples.slice(start, start + actualKeepLen) };
        }
        return { samples: samples.slice(0, keepLen) };
        
    } else {
        // Continuant/Vowel: Create a seamless loop
        return makeLoopable(samples, sr);
    }
}

// --- Main Builder ---

async function build() {
    await init();
    
    const manifest: any = {
        meta: {
            sampleRate: SAMPLE_RATE,
            format: "int16"
        },
        phonemes: {}
    };
    
    const buffers: Int16Array[] = [];
    let currentOffset = 0;
    
    for (const ph of INVENTORY) {
        console.log(`Generating ${ph.ipa} (${ph.kind})...`);
        
        let inputIds: string;
        let lengthScale: number;
        let extractStartRatio = 0.35; // Default for vowels/nasals/approximants
        let extractEndRatio = 0.85;

        // Special handling for Fricatives to avoid "eff" artifact
        const isFricative = ['f', 'v', 'θ', 'ð', 's', 'z', 'ʃ', 'ʒ', 'h'].includes(ph.ipa);

        if (ph.kind === 'plosive') {
            inputIds = `[[${ph.ipa}]]`;
            lengthScale = 1.2; 
        } else if (isFricative) {
            // Generate CV context (e.g. "fa") to get a natural start
            inputIds = `[[${ph.ipa} æ]]`;
            lengthScale = 5.0;
            // Extract the consonant portion more carefully
            // Skip the initial attack (first 15%) to avoid onset artifacts
            // Extract from 15% to 50% to get stable consonant before vowel transition
            extractStartRatio = 0.15;
            extractEndRatio = 0.50;
        } else {
            // Vowels/Nasals/Liquids: Use single phoneme (relying on model to sustain)
            inputIds = `[[${ph.ipa}]]`;
            lengthScale = 5.0;
            // Keep standard trim
            extractStartRatio = 0.35; 
            extractEndRatio = 0.85;
        }

        const raw = await generateRaw(inputIds, lengthScale);
        
        // Custom processing based on kind/context
        let processed: { samples: Int16Array, loopStart?: number, loopEnd?: number };
        
        if (ph.kind === 'plosive') {
             processed = processSamples(raw, ph.kind);
        } else {
             // Custom logic for loopable extraction
             const samples = toInt16(raw);
             // 1. Extract the target region based on ratios
             const startIdx = Math.floor(samples.length * extractStartRatio);
             const endIdx = Math.floor(samples.length * extractEndRatio);
             const region = samples.subarray(startIdx, endIdx);
             
             // 2. Make that region loopable
             const loopResult = makeLoopable(region, SAMPLE_RATE);
             processed = loopResult;
        }
        
        manifest.phonemes[ph.ipa] = {
            kind: ph.kind,
            offset: currentOffset,
            length: processed.samples.length,
            ...(processed.loopStart !== undefined ? { loopStart: processed.loopStart, loopEnd: processed.loopEnd } : {})
        };
        
        buffers.push(processed.samples);
        currentOffset += processed.samples.length;
    }
    
    // Concat all buffers
    const totalLength = buffers.reduce((acc, b) => acc + b.length, 0);
    const bigBuffer = new Int16Array(totalLength);
    let offset = 0;
    for (const b of buffers) {
        bigBuffer.set(b, offset);
        offset += b.length;
    }
    
    // Write files
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    console.log(`Writing assets to ${OUTPUT_DIR}...`);
    fs.writeFileSync(path.join(OUTPUT_DIR, 'phonemes.json'), JSON.stringify(manifest, null, 2));
    fs.writeFileSync(path.join(OUTPUT_DIR, 'phonemes.bin'), Buffer.from(bigBuffer.buffer));
    
    console.log(`Success! Total size: ${(totalLength * 2 / 1024).toFixed(2)} KB`);
}

build().catch(console.error);
