import { NextRequest, NextResponse } from 'next/server';
import { wordToGraphemes, wordToAce } from '@/lib/audio/g2p';
import { textToIPA } from '@/lib/audio/phonemize';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

// Define a minimal interface for the JSON manifest
interface PhonemeManifest {
  phonemes: Record<string, { kind: 'plosive' | 'continuant' | 'vowel' }>;
}

interface SegmentDataWithKind {
  grapheme: string;
  ipa: string;
  kind: 'plosive' | 'continuant' | 'vowel';
}

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const text = searchParams.get('text');

    if (!text) {
        return NextResponse.json({ error: 'Missing text' }, { status: 400 });
    }

    try {
        // Load phoneme manifest directly from filesystem
        const manifestPath = path.join(process.cwd(), 'public', 'audio', 'phonemes.json');
        const manifestData = fs.readFileSync(manifestPath, 'utf-8');
        const manifest: PhonemeManifest = JSON.parse(manifestData);
        
        console.log('[API/Fingor] Manifest loaded from FS.');

        const graphemes = wordToGraphemes(text);
        const fullWordIPA = textToIPA(text);
        const graphemeACE = graphemes.map(g => wordToAce(g));
        const cleanedIPA = fullWordIPA.replace(/[ˈˌ]/g, '');
        const ipaPhonemes = Array.from(cleanedIPA);
        
        const segments: SegmentDataWithKind[] = [];
        let phonemeIndex = 0;

        for (let i = 0; i < graphemes.length; i++) {
            const grapheme = graphemes[i];
            const numPhonemes = graphemeACE[i].length;
            const graphemePhonemes = ipaPhonemes.slice(phonemeIndex, phonemeIndex + numPhonemes);
            let phonemeKey = graphemePhonemes.join('');
            
            // Normalization for our Synth Inventory
            if (phonemeKey === 'r') phonemeKey = 'ɹ';
            if (phonemeKey === 'g') phonemeKey = 'ɡ';
            if (phonemeKey === 'e') phonemeKey = 'ɛ';
            if (phonemeKey === 'ɒ') phonemeKey = 'ɔ';
            
            const info = manifest.phonemes[phonemeKey];
            
            if (!info) {
              console.warn(`[API/Fingor] Phoneme info not found for: ${phonemeKey}`);
              segments.push({
                grapheme,
                ipa: phonemeKey,
                kind: 'vowel' // Default fallback
              });
            } else {
              segments.push({
                  grapheme,
                  ipa: phonemeKey,
                  kind: info.kind
              });
            }
            
            phonemeIndex += numPhonemes;
        }

        console.log(`[API/Fingor] Sending segments for word "${text}":`, segments);

        return NextResponse.json(
            { segments },
            {
                headers: {
                    'Cache-Control': 'no-store, max-age=0'
                }
            }
        );
    } catch (e) {
        console.error('[Fingor] Metadata generation failed', e);
        return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
    }
}
