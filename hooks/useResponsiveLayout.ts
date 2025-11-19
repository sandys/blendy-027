import { useWindowDimensions, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Base dimensions for scaling (using a standard iPad as reference for "1.0" scale in landscape)
const BASE_WIDTH = 1024;
const BASE_HEIGHT = 768;

export const useResponsiveLayout = () => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const isLandscape = width > height;
  
  // Effective usable area
  const safeWidth = width - insets.left - insets.right;
  const safeHeight = height - insets.top - insets.bottom;

  // Calculate scale factor based on the smaller dimension (height in landscape)
  // to ensure elements fit vertically.
  // We clamp the scale to prevent elements becoming too tiny on phones or huge on large tablets.
  const scaleRef = isLandscape ? safeHeight / BASE_HEIGHT : safeWidth / BASE_WIDTH;
  
  // On phones, we might want a slightly larger relative scale because the screen is physically smaller
  // so 10% of height on phone is much smaller than 10% on iPad.
  // We boost the scale slightly for smaller devices (< 600px height).
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
