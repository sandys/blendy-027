'use client';

import { useState, useRef, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SAMPLE_LESSONS } from '@/lib/data/curriculum';
import { synth, PhonemeInfo } from '@/lib/audio/PhonemeSynth';

interface SegmentData {
  grapheme: string;
  ipa: string;
  kind: PhonemeInfo['kind'];
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

  const [segments, setSegments] = useState<SegmentData[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [synthReady, setSynthReady] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const currentSoundRef = useRef<{ stop: () => void } | null>(null);
  const connectedSoundRef = useRef<{ stop: () => void } | null>(null); // For connected phonation

  // Initialize Synth & Fetch Metadata
  useEffect(() => {
    async function init() {
      setIsLoading(true);
      setSynthReady(false);
      setStarted(false);

      try {
        await synth.load();
        setSynthReady(true);

        // Add timestamp to prevent caching
        const res = await fetch(`/api/audio/fingor?text=${word}&t=${Date.now()}`);
        const data = await res.json();
        setSegments(data.segments);
      } catch (err) {
        console.error('Failed to init game:', err);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, [word]);

  // Handle Audio Playback and Connected Phonation
  useEffect(() => {
    // Stop any previously playing sounds before starting new ones
    const stopCurrentSounds = () => {
      if (currentSoundRef.current) {
        currentSoundRef.current.stop();
        currentSoundRef.current = null;
      }
      if (connectedSoundRef.current) {
        connectedSoundRef.current.stop();
        connectedSoundRef.current = null;
      }
    };

    stopCurrentSounds();

    if (activeIndex !== null && segments[activeIndex]) {
      const currentSegment = segments[activeIndex];
      const nextSegment = segments[activeIndex + 1];

      console.log(`[FingorGame] Interaction Active: Index ${activeIndex} -> ${currentSegment.grapheme} /${currentSegment.ipa}/ (${currentSegment.kind})`);

      // Connected Phonation Logic
      if (currentSegment.kind === 'plosive' && 
          nextSegment && 
          (nextSegment.kind === 'vowel' || nextSegment.kind === 'continuant')) {
        
        // Highlight both segments
        setHighlightedIndices([activeIndex, activeIndex + 1]);

        const context = synth.getContext();
        if (context) {
          const now = context.currentTime;
          const ASSET_SAMPLE_RATE = 16000;
          const plosiveInfo = synth.getPhonemeInfo(currentSegment.ipa);
          const plosiveDuration = plosiveInfo ? (plosiveInfo.length / ASSET_SAMPLE_RATE) : 0.18;

          // Start the next sound slightly before the plosive ends for natural coarticulation
          // Use 10ms overlap to blend the burst into the continuant
          const nextSoundStartTime = now + plosiveDuration - 0.01;

          // Play the plosive as a one-shot starting NOW
          currentSoundRef.current = synth.play(currentSegment.ipa, 0, now);

          // Play next continuously, starting near the end of the plosive
          connectedSoundRef.current = synth.play(nextSegment.ipa, 5000, nextSoundStartTime);
        }

      } else {
        // Normal playback
        setHighlightedIndices([activeIndex]); 

        if (currentSegment.kind === 'plosive') {
          currentSoundRef.current = synth.play(currentSegment.ipa, 0);
        } else {
          currentSoundRef.current = synth.play(currentSegment.ipa, 5000); 
        }
      }
    } else {
      setHighlightedIndices([]);
    }

    return () => {
      // Cleanup on unmount or activeIndex change
      if (currentSoundRef.current) {
        currentSoundRef.current.stop();
        currentSoundRef.current = null;
      }
      if (connectedSoundRef.current) {
        connectedSoundRef.current.stop();
        connectedSoundRef.current = null;
      }
    };
  }, [activeIndex, segments]);

  // Handle pointer events
  const handlePointerDown = (index: number) => {
    if (!started) return;
    isDraggingRef.current = true;
    setActiveIndex(index);
    
    const ctx = synth.getContext();
    if (ctx && ctx.state === 'suspended') {
        ctx.resume();
    }
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
      const index = parseInt(element.getAttribute('data-segment-index')!);;
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

  const handleStart = async () => {
      const ctx = synth.getContext();
      if (ctx && ctx.state === 'suspended') {
          await ctx.resume();
      }
      setStarted(true);
  };

  const handleNext = () => {
    const nextExerciseIndex = exerciseIndex + 1;
    if (lesson && nextExerciseIndex < lesson.exercises.length) {
      router.push(`/games/fingor?lesson=${lessonNumber}&exercise=${nextExerciseIndex}`);
    } else {
      router.back();
    }
  };

  if (!started) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
        <div
          className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 cursor-pointer backdrop-blur-sm"
          onClick={() => synthReady && handleStart()}
        >
          <div className="bg-white px-12 py-8 rounded-3xl shadow-2xl flex flex-col items-center animate-pulse transition-transform hover:scale-105">
            {!synthReady ? (
              <>
                <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                <div className="text-2xl font-bold text-gray-800">Loading Assets...</div>
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
          const isActive = highlightedIndices.includes(index);
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
