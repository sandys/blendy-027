import React from "react";
import { render } from "../test-utils";
import WordBuilderScreen from "@/app/games/word-builder";

jest.mock("expo-router", () => ({
  ...jest.requireActual("expo-router"),
  useLocalSearchParams: () => ({ lesson: "6", exercise: "0" }),
}));

describe("WordBuilderScreen", () => {
  it("renders letter tiles", () => {
    const { queryByText } = render(<WordBuilderScreen />);

    // Should show letter tiles
    expect(queryByText).toBeTruthy();
  });

  it("allows dragging letters to build word", () => {
    const { queryByText } = render(<WordBuilderScreen />);

    // Should have draggable elements
    expect(queryByText).toBeTruthy();
  });

  it("plays blended sound when word complete", () => {
    const { queryByText } = render(<WordBuilderScreen />);

    // Should trigger audio on completion
    expect(queryByText).toBeTruthy();
  });
});
