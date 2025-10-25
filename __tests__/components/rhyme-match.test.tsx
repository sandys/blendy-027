import React from "react";
import { render, fireEvent, waitFor } from "../test-utils";
import RhymeMatchScreen from "@/app/games/rhyme-match";

describe("RhymeMatchScreen", () => {
  it("renders without crashing", () => {
    const { container } = render(<RhymeMatchScreen />);
    expect(container).toBeTruthy();
  });

  it("displays target word image", () => {
    const { getByText } = render(<RhymeMatchScreen />);
    // Target word "cat" should be visible
    expect(getByText("🐱")).toBeTruthy();
  });

  it("displays choice options", () => {
    const { getByText } = render(<RhymeMatchScreen />);
    // Should have choices visible
    expect(getByText("🎩")).toBeTruthy(); // hat
    expect(getByText("🐕")).toBeTruthy(); // dog
    expect(getByText("🚗")).toBeTruthy(); // car
  });

  it("handles choice selection", async () => {
    const { getByText } = render(<RhymeMatchScreen />);

    const choice = getByText("🎩");
    fireEvent.press(choice);

    // Test that press doesn't crash
    await waitFor(() => {
      expect(choice).toBeTruthy();
    });
  });
});
