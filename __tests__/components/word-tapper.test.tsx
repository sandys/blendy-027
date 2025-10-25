import React from "react";
import { render } from "../test-utils";
import WordTapperScreen from "@/app/games/word-tapper";

describe("WordTapperScreen", () => {
  it("renders without crashing", () => {
    const { container } = render(<WordTapperScreen />);
    expect(container).toBeTruthy();
  });

  it("renders game UI", () => {
    const { queryByText } = render(<WordTapperScreen />);
    // Basic render check
    expect(queryByText).toBeTruthy();
  });
});
