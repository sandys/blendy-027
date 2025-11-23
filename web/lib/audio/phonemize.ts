import { execSync } from 'child_process';

/**
 * Convert text to phoneme IDs using piper-phonemize
 * This is the proper phonemizer for Piper TTS
 */
export function textToPiperPhonemes(text: string): string {
    try {
        // Use piper_phonemize to get phoneme IDs in espeak format
        // -l en-us: US English
        // --espeak: output espeak phoneme notation
        const result = execSync(`echo "${text}" | piper_phonemize -l en-us --espeak`, {
            encoding: 'utf-8',
            timeout: 5000
        });

        return result.trim();
    } catch (error) {
        console.error(`[Phonemize] piper_phonemize failed for "${text}":`, error);
        // Fallback to espeak-ng
        return textToEspeakPhonemes(text);
    }
}

/**
 * Convert text to espeak phoneme notation using espeak-ng
 * This uses the actual espeak-ng binary to ensure accurate phonemization
 */
export function textToEspeakPhonemes(text: string): string {
    try {
        // Use espeak-ng to get phoneme notation (-x flag)
        // -v en-us: US English voice
        // -q: quiet (no audio output)
        // -x: output phoneme notation
        const result = execSync(`echo "${text}" | espeak-ng -v en-us -q -x`, {
            encoding: 'utf-8',
            timeout: 5000
        });

        return result.trim();
    } catch (error) {
        console.error(`[Phonemize] Failed to phonemize "${text}":`, error);
        // Fallback to original text
        return text;
    }
}

/**
 * Convert text to IPA using espeak-ng for Piper TTS
 * Uses --ipa=3 flag which is compatible with Piper's [[phonemes]] notation
 */
export function textToIPA(text: string): string {
    try {
        // Use espeak-ng to get IPA notation (--ipa=3 flag for Piper compatibility)
        // -v en-us: US English voice
        // -q: quiet (no audio output)
        // --ipa=3: output IPA notation compatible with Piper
        const result = execSync(`espeak-ng -v en-us --ipa=3 -q "${text}"`, {
            encoding: 'utf-8',
            timeout: 5000
        });

        return result.trim();
    } catch (error) {
        console.error(`[Phonemize] Failed to get IPA for "${text}":`, error);
        // Fallback to original text
        return text;
    }
}
