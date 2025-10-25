import React from "react";
import { render } from "../test-utils";
import SoundDetectiveScreen from "@/app/games/sound-detective";

describe("SoundDetectiveScreen", () => {
  it("renders without crashing", () => {
    const { container } = render(<SoundDetectiveScreen />);
    expect(container).toBeTruthy();
  });
});
