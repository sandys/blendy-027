import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  soundEnabled: boolean;
  musicEnabled: boolean;
  speechRate: number; // 0.5 to 2.0
  hapticFeedback: boolean;
  fontSize: 'small' | 'medium' | 'large';
  theme: 'light' | 'dark' | 'system';
  autoAdvance: boolean; // Auto-advance to next exercise
  showHints: boolean;
}

const initialState: SettingsState = {
  soundEnabled: true,
  musicEnabled: true,
  speechRate: 1.0,
  hapticFeedback: true,
  fontSize: 'medium',
  theme: 'light',
  autoAdvance: true,
  showHints: true,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleSound: (state) => {
      state.soundEnabled = !state.soundEnabled;
    },

    toggleMusic: (state) => {
      state.musicEnabled = !state.musicEnabled;
    },

    setSpeechRate: (state, action: PayloadAction<number>) => {
      state.speechRate = Math.max(0.5, Math.min(2.0, action.payload));
    },

    toggleHapticFeedback: (state) => {
      state.hapticFeedback = !state.hapticFeedback;
    },

    setFontSize: (state, action: PayloadAction<'small' | 'medium' | 'large'>) => {
      state.fontSize = action.payload;
    },

    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
    },

    toggleAutoAdvance: (state) => {
      state.autoAdvance = !state.autoAdvance;
    },

    toggleShowHints: (state) => {
      state.showHints = !state.showHints;
    },

    resetSettings: () => {
      return { ...initialState };
    },
  },
});

export const {
  toggleSound,
  toggleMusic,
  setSpeechRate,
  toggleHapticFeedback,
  setFontSize,
  setTheme,
  toggleAutoAdvance,
  toggleShowHints,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
