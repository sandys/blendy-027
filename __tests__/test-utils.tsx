import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react-native";
import { AppProvider } from "@/contexts/AppContext";

// Mock lesson data
const mockLessons = [
  {
    lesson_number: 1,
    phase: 1,
    title: "Test Lesson",
    description: "Test",
    exercises: [],
  },
];

const mockProgress = {
  currentLesson: 1,
  completedLessons: [],
  unlockedPhonemes: [],
  exerciseProgress: {},
  totalStars: 0,
  streakDays: 0,
  lastActivityDate: new Date().toISOString(),
};

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <AppProvider>{children}</AppProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react-native";
export { customRender as render };
