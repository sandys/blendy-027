import { NextRequest, NextResponse } from 'next/server';
import { generateAudio } from '@/lib/audio/piper';
import { createWav, trimSilence } from '@/lib/audio/dsp';
import { wordToGraphemes, wordToAce } from '@/lib/audio/g2p';
import { textToIPA, textToEspeakPhonemes } from '@/lib/audio/phonemize';

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

        // Use espeak to get IPA for the full word
        const fullWordIPA = textToIPA(text);
        console.log(`[Fingor] Full word IPA: "${fullWordIPA}"`);

        // Get ACE phonemes for each grapheme to know how many phonemes to expect
        const graphemeACE = graphemes.map(g => wordToAce(g));
        console.log(`[Fingor] Grapheme ACE breakdown:`, graphemeACE);

        // Parse the IPA output
        // For "mat" -> "mˈæt" -> "mæt" (remove stress)
        // Need to handle multi-byte IPA characters properly
        const cleanedIPA = fullWordIPA.replace(/[ˈˌ]/g, '');

        // Split IPA into phoneme characters (handles multi-byte UTF-8)
        const ipaPhonemes = Array.from(cleanedIPA);

        console.log(`[Fingor] Cleaned IPA: "${cleanedIPA}"`);
        console.log(`[Fingor] Parsed IPA phonemes:`, ipaPhonemes);

        // Generate audio for each grapheme using corresponding espeak phoneme(s)
        const segments = [];
        let phonemeIndex = 0;

        for (let i = 0; i < graphemes.length; i++) {
            const grapheme = graphemes[i];
            const numPhonemes = graphemeACE[i].length;

            // Extract the phoneme(s) for this grapheme
            const graphemePhonemes = ipaPhonemes.slice(phonemeIndex, phonemeIndex + numPhonemes);
            const phonemeString = graphemePhonemes.join('');

            console.log(`[Fingor] Grapheme "${grapheme}" (${numPhonemes} ACE phonemes) -> IPA phoneme(s): "${phonemeString}"`);

            // For isolated consonants, add schwa (ə) to make them pronounceable
            // This prevents "m" from being read as "em", etc.
            let phonemeForAudio = phonemeString;
            const ipaVowels = ['a', 'e', 'i', 'o', 'u', 'æ', 'ɑ', 'ɔ', 'ə', 'ɛ', 'ɪ', 'ʊ', 'ʌ'];
            const hasVowel = Array.from(phonemeString).some(ch => ipaVowels.includes(ch));

            if (!hasVowel && phonemeString.length > 0) {
                phonemeForAudio = phonemeString + 'ə'; // Add IPA schwa for consonants
                console.log(`[Fingor] Added schwa: "${phonemeString}" -> "${phonemeForAudio}"`);
            }

            // Use IPA phoneme notation for Piper
            const phonemeInput = `[[${phonemeForAudio}]]`;

            // Generate audio using phoneme mode
            const pcm = await generateAudio(phonemeInput, 1.0);

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
