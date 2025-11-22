import { generateAudio } from './piper';
import { PCM, concat, silence, crossfade, createWav, getDurationMs, trimSilence } from './dsp';
import { toIPA } from '@/lib/utils/phoneme_parser';

interface LessonRequest {
    lesson_id: string;
    words: Array<{ 
        id: string, 
        text: string, 
        onset?: string,
        rime?: string,
        ace_phonemes?: string[], 
        onset_ace?: string[], 
        rime_ace?: string[] 
    }>;
}

const TARGET_TOTAL_MS = 5000;

// Heuristic weights
const PHONEME_WEIGHTS: Record<string, number> = {
    'p': 1.0, 'b': 1.0, 't': 1.0, 'd': 1.0, 'k': 1.0, 'g': 1.0,
    'f': 1.5, 'v': 1.5, 's': 1.5, 'z': 1.5, 'sh': 1.5, 'th': 1.5,
    'm': 1.5, 'n': 1.5,
    'a': 2.5, 'e': 2.5, 'i': 2.5, 'o': 2.5, 'u': 2.5, 
    'æ': 2.5, 'ɑ': 2.5, 'ɔ': 2.5, 'ə': 2.5, 'ɛ': 2.5, 'ɪ': 2.5, 'ʊ': 2.5, 'ʌ': 2.5,
    'default': 1.0
};

function getWeight(ph: string) {
    // Basic fuzzy match for weight
    for (const key in PHONEME_WEIGHTS) {
        if (ph.includes(key)) return PHONEME_WEIGHTS[key];
    }
    return PHONEME_WEIGHTS['default'];
}

function encodeBase64(pcm: PCM): string {
    const wav = createWav(pcm);
    // Return data URI for easy playback
    return `data:audio/wav;base64,${wav.toString('base64')}`;
}

// Helper to make isolated consonants pronounceable (add schwa)
function getSpeakableIPA(ipa: string): string {
    // Vowels don't need change
    if ('aeiouæɑɔəɛɪʊʌ'.includes(ipa.charAt(0))) return ipa;
    
    // If it's already long/complex, leave it
    if (ipa.length > 2) return ipa;

    // Only add schwa to STOPS. Continuants (m, s, f, etc) can be stretched naturally.
    // Also adding 'h' because [[h]] often defaults to "aitch"
    const stops = ['b', 'd', 'g', 'p', 't', 'k', 'h'];
    if (stops.includes(ipa)) {
        return ipa + 'ə';
    }

    // Leave continuants (m, n, s, f, v, z, sh, th, etc) alone so they "hum"
    // e.g. [[m̩]] -> "mmm"
    return ipa;
}

export async function generateWordAudio(
    text: string, 
    ace_phonemes: string[], 
    onset_ace?: string[], 
    rime_ace?: string[]
) {
    // Strict Phoneme Mode: Convert ACE -> IPA
    // For WHOLE WORD, we do NOT add schwa. We want pure blending.
    const wordIPA = ace_phonemes.map(toIPA).join('');
    const phonemeString = `[[${wordIPA}]]`;
    console.log(`[Gen] Whole Word IPA Input: "${phonemeString}"`);

    // 1. Base Audio (Whole Words via Phonemes)
    const normalPCM = await generateAudio(phonemeString, 1.0);
    const slowPCM = await generateAudio(phonemeString, 0.65);

    // 2. Compute Durations
    const weights = ace_phonemes.map(getWeight);
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    const targetDurations = weights.map(w => (TARGET_TOTAL_MS * w) / totalWeight);
    console.log(`[Gen] Target Durations (ms):`, targetDurations);

    // 3. Generate & Stretch Phonemes (for Blend)
    const stretchedPhonemes: PCM[] = [];
    const sampleRate = normalPCM.sampleRate || 22050; 
    
    for (let i = 0; i < ace_phonemes.length; i++) {
        const ace = ace_phonemes[i];
        const ipa = toIPA(ace);
        const targetMs = targetDurations[i];
        
        // For ISOLATED/STRETCHED generation, use the speakable version
        const speakableIPA = getSpeakableIPA(ipa);
        
        console.log(`[Gen] Processing Phoneme ${i}: ACE="${ace}" IPA="${ipa}" Speakable="[[${speakableIPA}]]"`);
        
        const basePh = await generateAudio(`[[${speakableIPA}]]`, 1.0);
        const baseMs = getDurationMs(basePh);
        
        const scale = Math.max(0.1, targetMs / (baseMs || 100));
        
        const stretched = await generateAudio(`[[${speakableIPA}]]`, scale);
        // Critical: Trim silence so we crossfade sound-to-sound
        const trimmed = trimSilence(stretched);
        stretchedPhonemes.push(trimmed);
    }

    // 4. Composing Blends
    
    // A. Segmented Blend
    const gap = silence(200, sampleRate);
    const segmentedParts = [];
    for (let i = 0; i < stretchedPhonemes.length; i++) {
        segmentedParts.push(stretchedPhonemes[i]);
        if (i < stretchedPhonemes.length - 1) segmentedParts.push(gap);
    }
    const segmentedBlend = concat(segmentedParts);

    // B. Smooth Blend (Native Piper Stretch)
    // Instead of manual crossfading, we ask Piper to generate the whole word very slowly.
    // This ensures natural co-articulation (blending) between phonemes.
    console.log(`[Gen] Generating Smooth Blend (Native Piper)...`);
    // Scale 5.0 = ~5x slower than normal. Adjust as needed for "5 seconds".
    // If normal is ~0.8s, 5.0 -> 4.0s.
    const smoothBlend = await generateAudio(phonemeString, 5.0);

    /* Legacy DSP Blend (Disabled)
    let smoothBlend = stretchedPhonemes[0];
    for (let i = 1; i < stretchedPhonemes.length; i++) {
        smoothBlend = crossfade(smoothBlend, stretchedPhonemes[i], 250); 
    }
    */

    // 5. Isolated Onset/Rime Clips
    let onsetPCM = null;
    if (onset_ace && onset_ace.length > 0) {
        console.log(`[Gen] Generating Onset...`);
        const onsetIPA = onset_ace.map(toIPA).join('');
        onsetPCM = await generateAudio(`[[${onsetIPA}]]`, 0.7);
    }

    let rimePCM = null;
    if (rime_ace && rime_ace.length > 0) {
        console.log(`[Gen] Generating Rime...`);
        const rimeIPA = rime_ace.map(toIPA).join('');
        rimePCM = await generateAudio(`[[${rimeIPA}]]`, 1.0); 
    }

    console.log(`[Gen-End] Finished.`);

    return {
        normal: encodeBase64(normalPCM),
        slow_word: encodeBase64(slowPCM),
        segmented_blend: encodeBase64(segmentedBlend),
        smooth_blend: encodeBase64(smoothBlend),
        onset: onsetPCM ? encodeBase64(onsetPCM) : null,
        rime: rimePCM ? encodeBase64(rimePCM) : null,
        durations_ms: targetDurations
    };
}

export function getLessonStructure(req: LessonRequest) {
    const responseWords = req.words.map(word => {
        const params = new URLSearchParams();
        params.set('text', word.text);
        if (word.ace_phonemes) params.set('ace', word.ace_phonemes.join(','));
        if (word.onset_ace) params.set('onset', word.onset_ace.join(','));
        if (word.rime_ace) params.set('rime', word.rime_ace.join(','));
        // Cache Busting
        params.set('t', Date.now().toString());
        params.set('v', '3');

        return {
            id: word.id,
            text: word.text,
            phonemes: word.ace_phonemes,
            audio_url: `/api/audio/word?${params.toString()}`
        };
    });

    return {
        lesson_id: req.lesson_id,
        words: responseWords
    };
}