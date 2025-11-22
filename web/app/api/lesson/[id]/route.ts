import { NextRequest, NextResponse } from 'next/server';
import { getLessonStructure } from '@/lib/audio/lesson_generator';

export const dynamic = 'force-dynamic';

// Static Lesson Definitions (Mock)
const LESSONS: Record<string, any> = {
    '4': { 
        words: [
            { 
                id: 'cat', text: 'cat', 
                ace_phonemes: ['k', 'ae', 't'],
                onset_ace: ['k'], rime_ace: ['ae', 't']
            },
            { 
                id: 'mat', text: 'mat', 
                ace_phonemes: ['mv', 'ae', 't'], 
                onset_ace: ['mv'], rime_ace: ['ae', 't']
            },
            { 
                id: 'bat', text: 'bat', 
                ace_phonemes: ['b', 'ae', 't'],
                onset_ace: ['b'], rime_ace: ['ae', 't']
            },
            { 
                id: 'sat', text: 'sat', 
                ace_phonemes: ['s', 'ae', 't'], 
                onset_ace: ['s'], rime_ace: ['ae', 't']
            },
            { 
                id: 'hat', text: 'hat', 
                ace_phonemes: ['hh', 'ae', 't'], 
                onset_ace: ['hh'], rime_ace: ['ae', 't']
            },
            { 
                id: 'pin', text: 'pin', 
                ace_phonemes: ['p', 'ih', 'n'], 
                onset_ace: ['p'], rime_ace: ['ih', 'n']
            },
            { 
                id: 'fin', text: 'fin', 
                ace_phonemes: ['f', 'ih', 'n'], 
                onset_ace: ['f'], rime_ace: ['ih', 'n']
            },
            { 
                id: 'bin', text: 'bin', 
                ace_phonemes: ['b', 'ih', 'n'], 
                onset_ace: ['b'], rime_ace: ['ih', 'n']
            },
            { 
                id: 'win', text: 'win', 
                ace_phonemes: ['w', 'ih', 'n'], 
                onset_ace: ['w'], rime_ace: ['ih', 'n']
            },
            { 
                id: 'top', text: 'top', 
                ace_phonemes: ['t', 'aa', 'p'], 
                onset_ace: ['t'], rime_ace: ['aa', 'p']
            },
            { 
                id: 'mop', text: 'mop', 
                ace_phonemes: ['m', 'aa', 'p'], 
                onset_ace: ['m'], rime_ace: ['aa', 'p']
            },
            { 
                id: 'hop', text: 'hop', 
                ace_phonemes: ['hh', 'aa', 'p'], 
                onset_ace: ['hh'], rime_ace: ['aa', 'p']
            },
            { 
                id: 'pop', text: 'pop', 
                ace_phonemes: ['p', 'aa', 'p'], 
                onset_ace: ['p'], rime_ace: ['aa', 'p']
            },
            { 
                id: 'bug', text: 'bug', 
                ace_phonemes: ['b', 'ah', 'g'], 
                onset_ace: ['b'], rime_ace: ['ah', 'g']
            },
            { 
                id: 'rug', text: 'rug', 
                ace_phonemes: ['r', 'ah', 'g'], 
                onset_ace: ['r'], rime_ace: ['ah', 'g']
            },
            { 
                id: 'hug', text: 'hug', 
                ace_phonemes: ['hh', 'ah', 'g'], 
                onset_ace: ['hh'], rime_ace: ['ah', 'g']
            },
            { 
                id: 'mug', text: 'mug', 
                ace_phonemes: ['m', 'ah', 'g'], 
                onset_ace: ['m'], rime_ace: ['ah', 'g']
            }
        ]
    }
};

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;
    console.log(`[API] Fetching lesson structure for ID: ${id}`);
    
    const lessonConfig = LESSONS[id];
    if (!lessonConfig) {
        return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    try {
        const lessonData = getLessonStructure({
            lesson_id: id,
            words: lessonConfig.words
        });
        
        return NextResponse.json(lessonData, {
            headers: {
                'Cache-Control': 'no-store, max-age=0'
            }
        });
    } catch (e) {
        console.error("Lesson structure failed", e);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
