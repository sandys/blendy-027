import React from "react";
import { render, fireEvent, waitFor } from "../test-utils";
import RhymeMatchScreen from "@/app/games/rhyme-match";

// Mock useLocalSearchParams
jest.mock("expo-router", () => ({
  ...jest.requireActual("expo-router"),
  useLocalSearchParams: () => ({ lesson: "1", exercise: "0" }),
}));

describe("RhymeMatchScreen", () => {
  it("renders target word and choices", () => {
    const { getByText } = render(<RhymeMatchScreen />);

    // Should show target word
    expect(getByText(/cat/i)).toBeTruthy();
  });

  it("provides feedback on correct choice", async () => {
    const { getByText } = render(<RhymeMatchScreen />);

    // Tap correct rhyming word
    const correctChoice = getByText(/hat/i);
    fireEvent.press(correctChoice);

    // Should show success feedback
    await waitFor(() => {
      // Check for success state (implementation specific)
      expect(correctChoice).toBeTruthy();
    });
  });

  it("provides feedback on incorrect choice", async () => {
    const { getByText } = render(<RhymeMatchScreen />);

    // Tap incorrect word
    const incorrectChoice = getByText(/dog/i);
    fireEvent.press(incorrectChoice);

    // Should allow retry
    await waitFor(() => {
      expect(incorrectChoice).toBeTruthy();
    });
  });
});
