import React, { forwardRef, useImperativeHandle, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useApp } from "@/contexts/AppContext";
import { renderWithProviders } from "./test-utils";
import { act, waitFor } from "@testing-library/react-native";

const ContextCapture = forwardRef((_props, ref) => {
  const context = useApp();
  useImperativeHandle(ref, () => context, [context]);
  return null;
});

describe("AppContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("provides initial lesson data and phoneme deck", async () => {
    const harnessRef = React.createRef<ReturnType<typeof useApp>>();

    renderWithProviders(<ContextCapture ref={harnessRef} />);

    await act(async () => {
      jest.runAllTimers();
    });

    await waitFor(
      () => expect(harnessRef.current?.isLoading).toBe(false),
      { timeout: 7000 }
    );

    const context = harnessRef.current!;
    expect(context.progress.currentLesson).toBe(1);
    expect(Array.isArray(context.lessons)).toBe(true);
    expect(context.lessons.length).toBeGreaterThan(0);
    expect(context.phonemeCards.length).toBeGreaterThan(0);
    expect(context.phonemeCards.every((card) => card.unlocked === false)).toBe(true);
  });

  it("records lesson completion and phoneme unlocks", async () => {
    const harnessRef = React.createRef<ReturnType<typeof useApp>>();

    renderWithProviders(<ContextCapture ref={harnessRef} />);

    await act(async () => {
      jest.runAllTimers();
    });

    await waitFor(() => expect(harnessRef.current?.isLoading).toBe(false));

    await act(async () => {
      harnessRef.current?.completeLesson(1, 3);
    });
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
    let storedProgress = JSON.parse(
      (AsyncStorage.setItem as jest.Mock).mock.calls.at(-1)?.[1] ?? "{}"
    );
    expect(storedProgress.completedLessons).toContain(1);

    await waitFor(() =>
      expect(harnessRef.current?.progress.completedLessons).toContain(1)
    );

    await act(async () => {
      harnessRef.current?.unlockPhoneme("/ē/");
    });
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(2);
    storedProgress = JSON.parse(
      (AsyncStorage.setItem as jest.Mock).mock.calls.at(-1)?.[1] ?? "{}"
    );
    expect(storedProgress.unlockedPhonemes).toContain("/ē/");

    await waitFor(() => {
      expect(harnessRef.current?.progress.completedLessons).toContain(1);
      expect(harnessRef.current?.progress.currentLesson).toBeGreaterThanOrEqual(2);
      expect(harnessRef.current?.progress.totalStars).toBeGreaterThanOrEqual(3);
      expect(harnessRef.current?.progress.unlockedPhonemes).toContain("/ē/");
    });
  });
});
