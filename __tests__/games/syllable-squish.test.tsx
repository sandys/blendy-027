import React from "react";
import { render } from "../test-utils";
import SyllableSquishScreen from "@/app/games/syllable-squish";

describe("SyllableSquishScreen", () => {
  it("renders without crashing", () => {
    const { container } = render(<SyllableSquishScreen />);
    expect(container).toBeTruthy();
  });
});
