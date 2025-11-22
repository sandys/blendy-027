'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, useAnimationControls, PanInfo } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { GameLayout } from '@/components/GameLayout';
import { COLORS } from '@/lib/theme';
import { SAMPLE_LESSONS } from '@/lib/data/curriculum';
import { SoundSlideData } from '@/lib/types/curriculum';
import { useResponsiveLayout } from '@/lib/hooks/useResponsiveLayout';
import { speakText, stopSpeaking, playAudio } from '@/lib/utils/audio';
import { logToServer } from '@/lib/client-logger';

export default function SoundSlideGame() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const lessonNumber = parseInt(searchParams.get('lesson') || '4');
  const exerciseIndex = parseInt(searchParams.get('exercise') || '0');

  const layout = useResponsiveLayout();
  const { isLandscape } = layout;

  const lesson = SAMPLE_LESSONS.find((l) => l.lesson_number === lessonNumber);
  const exercise = lesson?.exercises[exerciseIndex];
  const exerciseData = exercise?.data as SoundSlideData | undefined;

  const [stage, setStage] = useState<"drag" | "merged">("drag");
  const [showFeedback, setShowFeedback] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [started, setStarted] = useState(false);
  
  const audioLoopRef = useRef(true);
  const controls = useAnimationControls();

  useEffect(() => {
    setMounted(true);
    logToServer("SoundSlideGame: Component Mounted", { 
        lessonNumber, 
        exerciseIndex, 
        hasExerciseData: !!exerciseData 
    });
  }, []);

  // 1. Fetch Lesson Metadata (Fast)
  const { data: lessonData } = useQuery({
    queryKey: ['lesson_v3', lessonNumber],
    queryFn: async () => {
      const res = await fetch(`/api/lesson/${lessonNumber}`);
      if (!res.ok) throw new Error('Failed to load lesson');
      return res.json();
    },
    enabled: !!lessonNumber, // Preload metadata immediately
    staleTime: Infinity,
  });

  // 2. Find metadata for current exercise word
  const currentWordMeta = lessonData?.words?.find((w: any) => w.text === exerciseData?.word);

  // 3. Lazily fetch audio for JUST this word (Triggered by 'started')
  const { data: wordAudio, isLoading: isAudioLoading } = useQuery({
    queryKey: ['wordAudio_v3', currentWordMeta?.text],
    queryFn: async () => {
      if (!currentWordMeta?.audio_url) return null;
      logToServer("Fetching Word Audio", { url: currentWordMeta.audio_url });
      const res = await fetch(currentWordMeta.audio_url);
      if (!res.ok) throw new Error('Failed to load word audio');
      return res.json();
    },
    enabled: !!currentWordMeta && started,
    staleTime: Infinity,
  });

  // Dimensions
  const tileSize = layout.tileSize;
  const containerWidth = layout.soundSlide.trackWidth + tileSize;
  const dragDistance = layout.soundSlide.trackWidth;

  useEffect(() => {
    // Only start loop if data is fully ready
    if (!exerciseData || !started || !wordAudio) return;
    
    audioLoopRef.current = true;
    setStage("drag");
    setShowFeedback(false);
    controls.set({ x: 0 });

    const playLoop = async () => {
      // Initial small delay before first sound
      await new Promise(resolve => setTimeout(resolve, 500));
      
      while (audioLoopRef.current) {
        logToServer("Playing PRE-GENERATED Audio", { type: 'smooth_blend' });
        await playAudio(wordAudio.smooth_blend);
        
        if (!audioLoopRef.current) break;
        // Shorter pause between repetitions (1.5s)
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    };
    playLoop();

    return () => {
      audioLoopRef.current = false;
      stopSpeaking();
    };
  }, [exerciseIndex, exerciseData, controls, started, wordAudio]);

  const handleSuccess = () => {
    setStage("merged");
    audioLoopRef.current = false;
    stopSpeaking();
    
    // Play normal speed word on success
    if (wordAudio) {
        playAudio(wordAudio.normal);
    } else {
        speakText(exerciseData?.word || "");
    }
    setShowFeedback(true);

    setTimeout(() => {
      const nextExerciseIndex = exerciseIndex + 1;
      if (lesson && nextExerciseIndex < lesson.exercises.length) {
        router.replace(`/games/sound-slide?lesson=${lessonNumber}&exercise=${nextExerciseIndex}`);
      } else {
        router.back();
      }
    }, 2500);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const currentX = info.offset.x;
    const threshold = dragDistance * 0.7; 
    
    if (currentX > threshold) {
       controls.start({ x: dragDistance }).then(() => {
           handleSuccess();
       });
    } else {
       controls.start({ x: 0 });
    }
  };

  if (!mounted || !exerciseData) return null;

  // Pre-start State
  if (!started) {
      return (
        <GameLayout
          instruction="Slide the sounds together"
          progress={`Exercise ${exerciseIndex + 1} of ${lesson?.exercises.length || 0}`}
          primaryColor={COLORS.soundSlide.primary}
          backgroundColor={COLORS.soundSlide.background}
        >
            <div 
                className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 cursor-pointer backdrop-blur-sm"
                onClick={() => setStarted(true)}
            >
                <div className="bg-white px-12 py-8 rounded-3xl shadow-2xl flex flex-col items-center animate-pulse transition-transform hover:scale-105">
                    <div className="text-6xl mb-4">▶️</div>
                    <div className="text-2xl font-bold text-gray-800">Tap to Start</div>
                </div>
            </div>
        </GameLayout>
      );
  }

  // Loading Audio State (Spinner)
  if (isAudioLoading || !wordAudio) {
      return (
        <GameLayout
          instruction="Generating Audio..."
          progress={`Exercise ${exerciseIndex + 1}`}
          primaryColor={COLORS.soundSlide.primary}
          backgroundColor={COLORS.soundSlide.background}
        >
            <div className="flex flex-col items-center justify-center h-full">
                <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-lg font-medium text-gray-600">Creating Phonics...</p>
            </div>
        </GameLayout>
      );
  }

  // Active Game State
  return (
    <GameLayout
      instruction="Slide the sounds together"
      progress={`Exercise ${exerciseIndex + 1} of ${lesson?.exercises.length || 0}`}
      primaryColor={COLORS.soundSlide.primary}
      backgroundColor={COLORS.soundSlide.background}
    >
      <div className="relative flex items-center justify-center w-full h-full">
        <div 
            className="relative flex items-center" 
            style={{ width: containerWidth, height: tileSize }}
        >
            <div 
                className="absolute left-0 h-4 bg-black/5 rounded-full"
                style={{ width: containerWidth, top: '50%', marginTop: -8 }}
            />

            <div 
                className="absolute right-0 flex items-center justify-center rounded-full shadow-md text-white font-bold select-none"
                style={{ 
                    width: tileSize, 
                    height: tileSize, 
                    backgroundColor: COLORS.soundSlide.primary,
                    fontSize: tileSize * 0.4,
                    zIndex: 1
                }}
            >
                {exerciseData.rime}
            </div>

            {stage === 'drag' && (
                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: dragDistance }}
                    dragElastic={0.1}
                    dragMomentum={false}
                    animate={controls}
                    onDragEnd={handleDragEnd}
                    className="absolute left-0 flex items-center justify-center rounded-full shadow-xl text-white font-bold cursor-grab active:cursor-grabbing select-none z-10"
                    style={{ 
                        width: tileSize, 
                        height: tileSize, 
                        backgroundColor: COLORS.soundSlide.accent,
                        fontSize: tileSize * 0.4
                    }}
                >
                    {exerciseData.onset}
                </motion.div>
            )}

            {stage === 'merged' && (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center bg-white rounded-3xl shadow-2xl z-20 border-4"
                    style={{ 
                        padding: tileSize * 0.3,
                        borderColor: COLORS.soundSlide.primary,
                        minWidth: tileSize * 2.5
                    }}
                >
                    <div style={{ fontSize: tileSize * 0.8 }}>{exerciseData.image}</div>
                    <div className="mt-2 font-bold text-gray-800" style={{ fontSize: tileSize * 0.4 }}>
                        {exerciseData.word}
                    </div>
                </motion.div>
            )}
        </div>

        {showFeedback && (
            <div className="absolute bottom-10 bg-green-500 text-white px-8 py-3 rounded-full text-2xl font-bold shadow-lg animate-bounce">
                Excellent!
            </div>
        )}
      </div>
    </GameLayout>
  );
}
