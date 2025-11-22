'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { COLORS } from '@/lib/theme';

interface GameLayoutProps {
  children: React.ReactNode;
  title?: string;
  instruction?: string;
  progress?: string;
  backgroundColor?: string;
  primaryColor?: string;
  onBack?: () => void;
}

export const GameLayout: React.FC<GameLayoutProps> = ({
  children,
  title,
  instruction,
  progress,
  backgroundColor = COLORS.background,
  primaryColor = COLORS.primary,
  onBack,
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div 
      className="flex flex-col h-screen w-screen overflow-hidden select-none touch-none"
      style={{ backgroundColor }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 z-10 h-16 shrink-0">
        <div className="flex flex-1 items-center gap-4">
          <button 
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md active:scale-95 transition-transform"
          >
            <X size={24} color={primaryColor} />
          </button>
          
          {progress && (
            <div className="px-3 py-1 rounded-xl bg-white/50 backdrop-blur-sm">
              <span className="text-sm font-semibold text-gray-600">{progress}</span>
            </div>
          )}
        </div>

        <div className="flex-[2] flex justify-center text-center">
          {instruction && (
            <span 
              className="text-xl md:text-2xl font-bold"
              style={{ color: primaryColor }}
            >
              {instruction}
            </span>
          )}
        </div>
        
        <div className="flex-1" />
      </div>

      {/* Game Content */}
      <div className="flex-1 w-full p-4 flex justify-center items-center relative">
        {children}
      </div>
    </div>
  );
};
