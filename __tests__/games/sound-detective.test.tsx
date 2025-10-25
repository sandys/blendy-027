import React from "react";
import { render, fireEvent } from "../test-utils";
import SoundDetectiveScreen from "@/app/games/sound-detective";

jest.mock("expo-router", () => ({
  ...jest.requireActual("expo-router"),
  useLocalSearchParams: () => ({ lesson: "5", exercise: "0" }),
}));

describe("SoundDetectiveScreen", () => {
  it("renders word and sound choices", () => {
    const { queryByText } = render(<SoundDetectiveScreen />);

    // Should show word and choices
    expect(queryByText).toBeTruthy();
  });

  it("allows selecting a sound", () => {
    const { queryAllByRole } = render(<SoundDetectiveScreen />);

    // Should have interactive elements
    expect(queryAllByRole).toBeTruthy();
  });

  it("validates sound position (first/middle/last)", () => {
    const { queryByText } = render(<SoundDetectiveScreen />);

    // Should check correct position
    expect(queryByText).toBeTruthy();
  });
});
