import { NextRequest, NextResponse } from 'next/server';
import { generateWordAudio } from '@/lib/audio/lesson_generator';

export const dynamic = 'force-dynamic';

import { wordToAce } from '@/lib/audio/g2p';

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const text = searchParams.get('text');
    const onsetText = searchParams.get('onset_text');
    const rimeText = searchParams.get('rime_text');

    // ACE phoneme arrays (comma-separated) - only used for duration calculation
    let ace = searchParams.get('ace')?.split(',').filter(p => p.length > 0);

    if (!text) {
        return NextResponse.json({ error: 'Missing text' }, { status: 400 });
    }

    // Auto-generate ACE if missing (for duration calculation)
    if (!ace) {
        ace = wordToAce(text);
    }

    try {
        const audioData = await generateWordAudio(text, ace, onsetText, rimeText);
        
        return NextResponse.json(audioData, {
            headers: {
                'Cache-Control': 'no-store, max-age=0'
            }
        });
    } catch (e) {
        console.error("Word audio generation failed", e);
        return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
    }
}
