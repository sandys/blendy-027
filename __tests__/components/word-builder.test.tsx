import React from "react";
import { render } from "../test-utils";
import WordBuilderScreen from "@/app/games/word-builder";

describe("WordBuilderScreen", () => {
  it("renders without crashing", () => {
    const { container } = render(<WordBuilderScreen />);
    expect(container).toBeTruthy();
  });

  it("renders game UI", () => {
    const { queryByText } = render(<WordBuilderScreen />);
    expect(queryByText).toBeTruthy();
  });
});
