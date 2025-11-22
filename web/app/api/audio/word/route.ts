import { NextRequest, NextResponse } from 'next/server';
import { generateWordAudio } from '@/lib/audio/lesson_generator';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const text = searchParams.get('text');
    // Accept 'ace' OR 'phonemes' (legacy/fallback)
    const ace = (searchParams.get('ace') || searchParams.get('phonemes'))?.split(',');
    const onset = searchParams.get('onset')?.split(',');
    const rime = searchParams.get('rime')?.split(',');

    if (!text || !ace) {
        return NextResponse.json({ error: 'Missing params' }, { status: 400 });
    }

    try {
        const audioData = await generateWordAudio(text, ace, onset, rime);
        
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
