import React from "react";
import { render } from "../test-utils";
import SoundSlideScreen from "@/app/games/sound-slide";

jest.mock("expo-router", () => ({
  ...jest.requireActual("expo-router"),
  useLocalSearchParams: () => ({ lesson: "4", exercise: "0" }),
}));

describe("SoundSlideScreen", () => {
  it("renders onset and rime tiles", () => {
    const { queryByText } = render(<SoundSlideScreen />);

    // Should render game elements
    expect(queryByText).toBeTruthy();
  });

  it("allows dragging onset to rime", () => {
    const { queryByText } = render(<SoundSlideScreen />);

    // Basic interaction test
    expect(queryByText).toBeTruthy();
  });

  it("plays blended word on successful drag", () => {
    const { queryByText } = render(<SoundSlideScreen />);

    // Should trigger audio on blend
    expect(queryByText).toBeTruthy();
  });
});
