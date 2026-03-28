export const COLORS = {
  primary: "#FF6B9D",
  secondary: "#4ECDC4",
  background: "#FFF5F7",
  white: "#FFFFFF",
  text: "#333333",
  textLight: "#666666",
  success: "#4CAF50",
  error: "#F44336",
  warning: "#FFC107",
  
  // Game specific palettes
  rhymeMatch: {
    primary: "#FF6B9D",
    background: "#FFF5F7",
    accent: "#E91E63"
  },
  wordTapper: {
    primary: "#4ECDC4",
    background: "#F0F8FF",
    accent: "#009688"
  },
  soundSearch: {
    primary: "#A5D6A7",
    background: "#F0F4F8",
    accent: "#2E7D32"
  },
  soundDetective: {
    primary: "#4CAF50",
    background: "#E8F5E9",
    accent: "#2E7D32"
  },
  wordBuilder: {
    primary: "#2196F3",
    background: "#E3F2FD",
    accent: "#1976D2"
  },
  syllableSquish: {
    primary: "#FFB84D",
    background: "#FFF9E6",
    accent: "#F57C00"
  },
  soundSlide: {
    primary: "#FFA000",
    background: "#FFF7DC",
    accent: "#FF6F00"
  }
};

export const SPACING = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
};

export const TYPOGRAPHY = {
  h1: {
    fontSize: 32,
    fontWeight: "bold" as const,
  },
  h2: {
    fontSize: 24,
    fontWeight: "bold" as const,
  },
  h3: {
    fontSize: 20,
    fontWeight: "600" as const,
  },
  body: {
    fontSize: 16,
    fontWeight: "400" as const,
  },
  instruction: {
    fontSize: 22,
    fontWeight: "600" as const,
  }
};

export const LAYOUT = {
  maxContentWidth: 1024,
  borderRadius: 20,
};
