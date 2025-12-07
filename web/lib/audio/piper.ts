/**
 * Piper TTS Audio Generation
 *
 * This module provides a unified interface for TTS generation using ONNX Runtime.
 * The legacy spawn-based implementation has been removed in favor of direct ONNX inference.
 */

import { generateAudioONNX } from './piper_onnx';
import { textToIPA } from './phonemize';
import { PCM } from './dsp';

/**
 * Generate audio from text or IPA phonemes
 *
 * @param text - Text to synthesize (can be plain text or [[IPA]] notation)
 * @param lengthScale - Speed control (1.0 = normal, higher = slower)
 * @returns PCM audio data
 */
export async function generateAudio(text: string, lengthScale: number = 1.0): Promise<PCM> {
    try {
        let ipaInput: string;

        // Check if already in IPA notation [[...]]
        if (text.startsWith('[[') && text.endsWith(']]')) {
            // Extract IPA from brackets
            ipaInput = text.slice(2, -2);
        } else {
            // Convert plain text to IPA
            ipaInput = textToIPA(text);
        }

        console.log(`[Piper] Generating audio for: "${ipaInput}" (scale: ${lengthScale})`);

        const pcm = await generateAudioONNX(ipaInput, lengthScale);

        console.log(`[Piper] Generated ${pcm.samples.length} samples at ${pcm.sampleRate}Hz`);

        return pcm;
    } catch (error) {
        console.error('[Piper] Generation failed:', error);
        // Return 1 second of silence as fallback
        return { samples: new Int16Array(16000), sampleRate: 16000 };
    }
}
