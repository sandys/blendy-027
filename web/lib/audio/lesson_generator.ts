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
    const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U', '@', 'ə'];
    if (vowels.includes(ipa.charAt(0))) return ipa;

    // If it's already long/complex, leave it
    if (ipa.length > 2) return ipa;

    // Add IPA schwa ə to single consonants to prevent letter-name pronunciation
    // Without this, "f" becomes "eff", "s" becomes "ess", etc.
    return ipa + 'ə';
}

export async function generateWordAudio(
    text: string,
    ace_phonemes: string[],
    onset_text?: string | null,
    rime_text?: string | null
) {
    // Use plain text mode - let Piper's espeak-ng phonemizer handle it
    console.log(`[Gen] Whole Word Text Input: "${text}"`);

    // 1. Base Audio (Whole Words via plain text)
    const normalPCM = await generateAudio(text, 1.0);
    const slowPCM = await generateAudio(text, 0.65);

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
    // Scale 5.0 = ~5x slower with reduced noise params for smoother output
    const smoothBlend = await generateAudio(text, 5.0);

    /* Legacy DSP Blend (Disabled)
    let smoothBlend = stretchedPhonemes[0];
    for (let i = 1; i < stretchedPhonemes.length; i++) {
        smoothBlend = crossfade(smoothBlend, stretchedPhonemes[i], 250); 
    }
    */

    // 5. Isolated Onset/Rime Clips (using plain text)
    let onsetPCM = null;
    if (onset_text) {
        console.log(`[Gen] Generating Onset from text: "${onset_text}"`);

        // Make consonants pronounceable by doubling them or adding vowel
        // e.g., "m" -> "mmm" (continuant) or "b" -> "buh" (stop)
        let onsetForTTS = onset_text;
        const vowels = ['a', 'e', 'i', 'o', 'u'];
        const hasVowel = vowels.some(v => onset_text.includes(v));

        if (!hasVowel && onset_text.length === 1) {
            // For continuants (m, n, s, f, etc), triple the letter for a sustained sound
            const continuants = ['m', 'n', 's', 'f', 'v', 'z', 'l', 'r'];
            if (continuants.includes(onset_text)) {
                onsetForTTS = onset_text + onset_text + onset_text; // e.g., "m" -> "mmm"
            } else {
                onsetForTTS = onset_text + 'uh'; // e.g., "b" -> "buh"
            }
            console.log(`[Gen] Modified onset "${onset_text}" -> "${onsetForTTS}" for TTS`);
        } else if (!hasVowel && onset_text.length === 2) {
            onsetForTTS = onset_text + 'uh'; // e.g., "sh" -> "shuh"
            console.log(`[Gen] Modified onset "${onset_text}" -> "${onsetForTTS}" for TTS`);
        }

        onsetPCM = await generateAudio(onsetForTTS, 0.7);
    }

    let rimePCM = null;
    if (rime_text) {
        console.log(`[Gen] Generating Rime from text: "${rime_text}"`);
        rimePCM = await generateAudio(rime_text, 1.0);
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
        if (word.onset) params.set('onset_text', word.onset);
        if (word.rime) params.set('rime_text', word.rime);
        if (word.ace_phonemes) params.set('ace', word.ace_phonemes.join(','));
        // Cache Busting
        params.set('t', Date.now().toString());
        params.set('v', '4');

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