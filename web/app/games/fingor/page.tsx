'use client';

import { useState, useRef, useEffect } from 'react';

interface AudioSegment {
  grapheme: string;
  audio_url: string;
}

export default function FingorGame() {
  const [word, setWord] = useState('mat');
  const [segments, setSegments] = useState<AudioSegment[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  // Fetch audio segments
  useEffect(() => {
    async function loadAudio() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/audio/fingor?text=${word}`);
        const data = await res.json();
        setSegments(data.segments);

        // Preload audio elements
        audioRefs.current = data.segments.map((seg: AudioSegment) => {
          const audio = new Audio(seg.audio_url);
          audio.loop = true;
          audio.preload = 'auto';
          return audio;
        });
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
  const handlePointerDown = () => {
    isDraggingRef.current = true;
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
              onPointerDown={handlePointerDown}
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

      {/* Dev Controls */}
      <div className="fixed bottom-4 right-4 flex gap-2">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value.toLowerCase())}
          className="px-4 py-2 border-2 border-gray-300 rounded-lg"
          placeholder="Enter word"
        />
      </div>
    </div>
  );
}
