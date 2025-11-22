import { NextRequest, NextResponse } from 'next/server';
import { generateWordAudio } from '@/lib/audio/lesson_generator';

export const dynamic = 'force-dynamic';

import { wordToAce } from '@/lib/audio/g2p';

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const text = searchParams.get('text');
    
    // ACE phoneme arrays (comma-separated)
    let ace = searchParams.get('ace')?.split(',').filter(p => p.length > 0);
    let onsetAce = searchParams.get('onset')?.split(',').filter(p => p.length > 0);
    let rimeAce = searchParams.get('rime')?.split(',').filter(p => p.length > 0);

    if (!text) {
        return NextResponse.json({ error: 'Missing text' }, { status: 400 });
    }

    // Auto-generate ACE if missing
    if (!ace) {
        ace = wordToAce(text);
    }
    // onset and rime are already ACE phonemes from the lesson API, no conversion needed

    try {
        const audioData = await generateWordAudio(text, ace, onsetAce, rimeAce);
        
        return NextResponse.json(audioData, {
            headers: {
                'Cache-Control': 'public, max-age=31536000, immutable'
            }
        });
    } catch (e) {
        console.error("Word audio generation failed", e);
        return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
    }
}
