'use client';

import { useState, useRef, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SAMPLE_LESSONS } from '@/lib/data/curriculum';

interface AudioSegment {
  grapheme: string;
  audio_url: string;
}

export default function FingorGame() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonNumber = parseInt(searchParams.get('lesson') || '4');
  const exerciseIndex = parseInt(searchParams.get('exercise') || '0');

  const lesson = SAMPLE_LESSONS.find((l) => l.lesson_number === lessonNumber);
  const exercise = lesson?.exercises[exerciseIndex];
  const exerciseData = exercise?.data as any;
  const word = exerciseData?.word || 'mat';

  const [segments, setSegments] = useState<AudioSegment[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  // Fetch audio segments when word changes
  useEffect(() => {
    async function loadAudio() {
      setIsLoading(true);
      setAudioReady(false);
      setStarted(false); // Reset started state for new exercise
      try {
        const res = await fetch(`/api/audio/fingor?text=${word}`);
        const data = await res.json();
        setSegments(data.segments);

        // Preload audio elements and wait for them to be ready
        const audioPromises = data.segments.map((seg: AudioSegment) => {
          return new Promise<HTMLAudioElement>((resolve) => {
            const audio = new Audio(seg.audio_url);
            audio.loop = true;
            audio.preload = 'auto';
            audio.addEventListener('canplaythrough', () => resolve(audio), { once: true });
            audio.load();
          });
        });

        audioRefs.current = await Promise.all(audioPromises);
        setAudioReady(true);
      } catch (err) {
        console.error('Failed to load audio:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadAudio();
  }, [word]);

  // Play audio for active segment
  useEffect(() => {
    audioRefs.current.forEach((audio, idx) => {
      if (idx === activeIndex) {
        audio.currentTime = 0;
        audio.play().catch(e => console.warn('Audio play failed:', e));
      } else {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  }, [activeIndex]);

  // Handle pointer events
  const handlePointerDown = (index: number) => {
    if (!started) return;
    isDraggingRef.current = true;
    setActiveIndex(index); // Set active immediately on pointer down
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    setActiveIndex(null);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    const point = { x: e.clientX, y: e.clientY };
    const element = document.elementFromPoint(point.x, point.y);

    if (element && element.hasAttribute('data-segment-index')) {
      const index = parseInt(element.getAttribute('data-segment-index')!);
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    }
  };

  const handleSegmentEnter = (index: number) => {
    if (isDraggingRef.current) {
      setActiveIndex(index);
    }
  };

  const handleNext = () => {
    const nextExerciseIndex = exerciseIndex + 1;
    if (lesson && nextExerciseIndex < lesson.exercises.length) {
      // Navigate to next exercise
      router.push(`/games/fingor?lesson=${lessonNumber}&exercise=${nextExerciseIndex}`);
    } else {
      // Go back to lesson selection or previous page
      router.back();
    }
  };

  // Pre-start State (Tap to Start modal)
  if (!started) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
        <div
          className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 cursor-pointer backdrop-blur-sm"
          onClick={() => audioReady && setStarted(true)}
        >
          <div className="bg-white px-12 py-8 rounded-3xl shadow-2xl flex flex-col items-center animate-pulse transition-transform hover:scale-105">
            {!audioReady ? (
              <>
                <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                <div className="text-2xl font-bold text-gray-800">Loading Audio...</div>
              </>
            ) : (
              <>
                <div className="text-6xl mb-4">▶️</div>
                <div className="text-2xl font-bold text-gray-800">Tap to Start</div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
        <div className="text-2xl font-bold text-blue-600">Loading...</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 select-none touch-none"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">Fingor</h1>
        <p className="text-lg text-blue-700">Drag your finger across the word</p>
      </div>

      {/* Elkonin Boxes */}
      <div className="flex gap-4 mb-12">
        {segments.map((segment, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={index}
              data-segment-index={index}
              className="flex flex-col items-center cursor-pointer"
              onPointerDown={() => handlePointerDown(index)}
              onPointerEnter={() => handleSegmentEnter(index)}
            >
              {/* Grapheme Box */}
              <div
                className={`
                  w-24 h-24 flex items-center justify-center
                  border-4 rounded-lg transition-all duration-150
                  ${isActive
                    ? 'bg-blue-500 border-blue-600 scale-110 shadow-2xl'
                    : 'bg-white border-gray-400 shadow-md'
                  }
                `}
              >
                <span
                  className={`
                    text-5xl font-bold transition-all duration-150
                    ${isActive ? 'text-white' : 'text-gray-900'}
                  `}
                >
                  {segment.grapheme}
                </span>
              </div>

              {/* Dot underneath */}
              <div className="mt-3">
                <div
                  className={`
                    w-3 h-3 rounded-full transition-all duration-150
                    ${isActive ? 'bg-blue-500 scale-150' : 'bg-gray-400'}
                  `}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Instructions */}
      <div className="text-center text-gray-600 max-w-md">
        <p className="mb-4">
          Click and drag across the letters to hear each sound.
          Hold your finger on a letter to hear it loop!
        </p>
      </div>

      {/* Next Button */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
        <button
          onClick={handleNext}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-2xl px-12 py-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
        >
          Next
        </button>
      </div>
    </div>
  );
}
