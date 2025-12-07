import { spawnSync } from 'child_process';

/**
 * Sanitize text input to prevent any injection issues
 * Only allows alphanumeric, spaces, and basic punctuation
 */
function sanitizeText(text: string): string {
    // Remove any potentially dangerous characters, keep only safe ones
    return text.replace(/[^a-zA-Z0-9\s.,!?'-]/g, '').trim();
}

/**
 * Convert text to phoneme IDs using piper-phonemize
 * This is the proper phonemizer for Piper TTS
 */
export function textToPiperPhonemes(text: string): string {
    try {
        const safeText = sanitizeText(text);
        if (!safeText) return text;

        // Use spawnSync with array args to prevent command injection
        const result = spawnSync('piper_phonemize', ['-l', 'en-us', '--espeak'], {
            input: safeText,
            encoding: 'utf-8',
            timeout: 5000
        });

        if (result.error || result.status !== 0) {
            console.error(`[Phonemize] piper_phonemize failed:`, result.stderr);
            return textToEspeakPhonemes(text);
        }

        return result.stdout.trim();
    } catch (error) {
        console.error(`[Phonemize] piper_phonemize failed for "${text}":`, error);
        return textToEspeakPhonemes(text);
    }
}

/**
 * Convert text to espeak phoneme notation using espeak-ng
 * This uses the actual espeak-ng binary to ensure accurate phonemization
 */
export function textToEspeakPhonemes(text: string): string {
    try {
        const safeText = sanitizeText(text);
        if (!safeText) return text;

        // Use spawnSync with array args to prevent command injection
        const result = spawnSync('espeak-ng', ['-v', 'en-us', '-q', '-x', safeText], {
            encoding: 'utf-8',
            timeout: 5000
        });

        if (result.error || result.status !== 0) {
            console.error(`[Phonemize] espeak-ng failed:`, result.stderr);
            return text;
        }

        return result.stdout.trim();
    } catch (error) {
        console.error(`[Phonemize] Failed to phonemize "${text}":`, error);
        return text;
    }
}

/**
 * Convert text to IPA using espeak-ng for Piper TTS
 * Uses --ipa=3 flag which is compatible with Piper's [[phonemes]] notation
 */
export function textToIPA(text: string): string {
    try {
        const safeText = sanitizeText(text);
        if (!safeText) return text;

        // Use spawnSync with array args to prevent command injection
        const result = spawnSync('espeak-ng', ['-v', 'en-us', '--ipa=3', '-q', safeText], {
            encoding: 'utf-8',
            timeout: 5000
        });

        if (result.error || result.status !== 0) {
            console.error(`[Phonemize] espeak-ng IPA failed:`, result.stderr);
            return text;
        }

        return result.stdout.trim();
    } catch (error) {
        console.error(`[Phonemize] Failed to get IPA for "${text}":`, error);
        return text;
    }
}
