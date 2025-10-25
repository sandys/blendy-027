import React from "react";
import { render } from "../test-utils";
import SoundSlideScreen from "@/app/games/sound-slide";

describe("SoundSlideScreen", () => {
  it("renders without crashing", () => {
    const { container } = render(<SoundSlideScreen />);
    expect(container).toBeTruthy();
  });
});
