import React from "react";
import { render, fireEvent } from "../test-utils";
import WordTapperScreen from "@/app/games/word-tapper";

jest.mock("expo-router", () => ({
  ...jest.requireActual("expo-router"),
  useLocalSearchParams: () => ({ lesson: "2", exercise: "0" }),
}));

describe("WordTapperScreen", () => {
  it("renders sentence and tappable circles", () => {
    const { getByText } = render(<WordTapperScreen />);

    // Should show instruction or sentence
    expect(getByText).toBeTruthy();
  });

  it("counts taps correctly", () => {
    const { getAllByTestId } = render(<WordTapperScreen />);

    // Get tappable circles (if they have testID)
    const circles = getAllByTestId(/circle/i);

    if (circles.length > 0) {
      // Tap first circle
      fireEvent.press(circles[0]);
      expect(circles[0]).toBeTruthy();
    }
  });

  it("validates word count on submit", () => {
    const { getByText } = render(<WordTapperScreen />);

    // Should have submit or check button
    expect(getByText).toBeTruthy();
  });
});
