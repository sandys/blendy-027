'use client';

import { useState, useEffect } from "react";

// Base dimensions for scaling (using a standard iPad as reference for "1.0" scale in landscape)
const BASE_WIDTH = 1024;
const BASE_HEIGHT = 768;

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export const useResponsiveLayout = () => {
  const { width, height } = useWindowSize();

  // Web is almost always "safe" except for mobile browser chrome which window size accounts for.
  // We assume full window availability.
  
  const isLandscape = width > height;
  
  // Effective usable area
  const safeWidth = width;
  const safeHeight = height;

  // Calculate scale factor based on the smaller dimension (height in landscape)
  const scaleRef = isLandscape ? safeHeight / BASE_HEIGHT : safeWidth / BASE_WIDTH;
  
  const isPhone = isLandscape ? safeHeight < 600 : safeWidth < 600;
  const scaleFactor = isPhone ? Math.max(scaleRef * 1.2, 0.6) : Math.min(Math.max(scaleRef, 0.7), 1.2);

  return {
    // Dimensions
    width,
    height,
    safeWidth,
    safeHeight,
    isLandscape,
    isPhone,
    
    // Standard Element Sizes
    tileSize: Math.round(120 * scaleFactor),
    cardSize: Math.round(300 * scaleFactor),
    buttonSize: Math.round(80 * scaleFactor),
    iconSize: Math.round(48 * scaleFactor),
    
    // Layout
    spacing: Math.round(24 * scaleFactor),
    gutter: Math.round(32 * scaleFactor),
    
    // Typography
    fontSize: {
      small: Math.round(16 * scaleFactor),
      medium: Math.round(24 * scaleFactor),
      large: Math.round(32 * scaleFactor),
      xl: Math.round(48 * scaleFactor),
      xxl: Math.round(64 * scaleFactor),
    },
    
    // Game Specific
    soundSlide: {
      trackWidth: isLandscape ? safeWidth * 0.6 : safeWidth * 0.8,
      startOffset: isLandscape ? safeWidth * 0.1 : 0,
    }
  };
};
