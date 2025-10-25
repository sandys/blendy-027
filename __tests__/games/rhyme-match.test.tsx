import React from "react";
import { render } from "../test-utils";
import RhymeMatchScreen from "@/app/games/rhyme-match";

describe("RhymeMatchScreen", () => {
  it("renders without crashing", () => {
    const { container } = render(<RhymeMatchScreen />);
    expect(container).toBeTruthy();
  });
});
