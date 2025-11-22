import { NextRequest, NextResponse } from 'next/server';
import { getLessonStructure } from '@/lib/audio/lesson_generator';
import { wordToAce } from '@/lib/audio/g2p';
import { SAMPLE_LESSONS } from '@/lib/data/curriculum';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;
    console.log(`[API] Fetching lesson structure for ID: ${id}`);

    const lessonNumber = parseInt(id, 10);
    const lesson = SAMPLE_LESSONS.find(l => l.lesson_number === lessonNumber);

    if (!lesson) {
        return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    try {
        // Extract words from Sound Slide exercises
        const words: any[] = [];

        for (const exercise of lesson.exercises) {
            if (exercise.exercise_type === 'Sound Slide' && exercise.data) {
                const { word, onset, rime } = exercise.data;
                if (word && onset && rime) {
                    const wordAce = wordToAce(word);
                    const onsetAce = wordToAce(onset);
                    const rimeAce = wordToAce(rime);

                    words.push({
                        id: word,
                        text: word,
                        ace_phonemes: wordAce,
                        onset_ace: onsetAce,
                        rime_ace: rimeAce
                    });
                }
            }
        }

        const lessonData = getLessonStructure({
            lesson_id: id,
            words
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
