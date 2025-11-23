import { execSync } from 'child_process';

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
 * Convert text to IPA using espeak-ng
 * This uses the actual espeak-ng binary to ensure accurate phonemization
 */
export function textToIPA(text: string): string {
    try {
        // Use espeak-ng to get IPA notation (--ipa flag)
        // -v en-us: US English voice
        // -q: quiet (no audio output)
        // --ipa: output IPA notation
        const result = execSync(`echo "${text}" | espeak-ng -v en-us -q --ipa`, {
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
