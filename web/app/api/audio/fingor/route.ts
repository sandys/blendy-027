import { NextRequest, NextResponse } from 'next/server';
import { generateAudioONNX } from '@/lib/audio/piper_onnx';
import { createWav, trimSilence } from '@/lib/audio/dsp';
import { wordToGraphemes, wordToAce } from '@/lib/audio/g2p';
import { textToIPA } from '@/lib/audio/phonemize';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const text = searchParams.get('text');

    if (!text) {
        return NextResponse.json({ error: 'Missing text' }, { status: 400 });
    }

    try {
        // Break word into graphemes
        const graphemes = wordToGraphemes(text);
        console.log(`[Fingor] Word: "${text}" -> Graphemes:`, graphemes);

        // Use espeak-ng --ipa=3 to get IPA phonemes for the full word
        const fullWordIPA = textToIPA(text);
        console.log(`[Fingor] Full word IPA (--ipa=3): "${fullWordIPA}"`);

        // Get ACE phonemes for each grapheme to know how many phonemes to expect
        const graphemeACE = graphemes.map(g => wordToAce(g));
        console.log(`[Fingor] Grapheme ACE breakdown:`, graphemeACE);

        // Parse the IPA output from espeak-ng --ipa=3
        // For "cat" -> "kˈæt" -> "kæt" (remove stress marks)
        const cleanedIPA = fullWordIPA.replace(/[ˈˌ]/g, '');

        // Split into IPA phoneme characters
        const ipaPhonemes = Array.from(cleanedIPA);

        console.log(`[Fingor] Cleaned IPA: "${cleanedIPA}"`);
        console.log(`[Fingor] Parsed IPA phonemes:`, ipaPhonemes);

        // Generate audio for each grapheme using corresponding espeak phoneme(s)
        const segments = [];
        let phonemeIndex = 0;

        for (let i = 0; i < graphemes.length; i++) {
            const grapheme = graphemes[i];
            const numPhonemes = graphemeACE[i].length;

            // Extract the IPA phoneme(s) for this grapheme
            const graphemePhonemes = ipaPhonemes.slice(phonemeIndex, phonemeIndex + numPhonemes);
            const phonemeString = graphemePhonemes.join('');

            console.log(`[Fingor] Grapheme "${grapheme}" (${numPhonemes} ACE phonemes) -> IPA phoneme(s): "${phonemeString}"`);

            // For isolated consonants, add a brief schwa to make them audible
            let phonemeForAudio = phonemeString;
            const ipaVowels = ['a', 'e', 'i', 'o', 'u', 'æ', 'ɑ', 'ɔ', 'ə', 'ɛ', 'ɪ', 'ʊ', 'ʌ', 'e‍ɪ', 'o‍ʊ', 'a‍ɪ', 'a‍ʊ', 'ɔ‍ɪ'];
            const hasVowel = Array.from(phonemeString).some(ch => ipaVowels.includes(ch));

            if (!hasVowel && phonemeString.length > 0) {
                phonemeForAudio = phonemeString + 'ə';
                console.log(`[Fingor] Added schwa for consonant: "${phonemeString}" -> "${phonemeForAudio}"`);
            }

            // Generate audio using ONNX Runtime with IPA phonemes
            // Use slower speed (higher length_scale) for clearer pronunciation
            const pcm = await generateAudioONNX(phonemeForAudio, 2.0);

            // Trim silence for seamless looping
            const trimmed = trimSilence(pcm);

            // Convert to WAV and encode as base64
            const wav = createWav(trimmed);
            const audio_url = `data:audio/wav;base64,${wav.toString('base64')}`;

            segments.push({
                grapheme,
                audio_url
            });

            phonemeIndex += numPhonemes;
        }

        console.log(`[Fingor] Generated ${segments.length} segments`);

        return NextResponse.json(
            { segments },
            {
                headers: {
                    'Cache-Control': 'no-store, max-age=0'
                }
            }
        );
    } catch (e) {
        console.error('[Fingor] Audio generation failed', e);
        return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
    }
}
