import React from "react";
import { act, fireEvent } from "@testing-library/react-native";
import { renderWithProviders } from "./test-utils";
import SoundSearchScreen from "@/app/games/sound-search";
import * as audio from "@/utils/audio";
import { useLocalSearchParams, router } from "expo-router";

describe("SoundSearchScreen", () => {
  let speakSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.useFakeTimers();
    (useLocalSearchParams as jest.Mock).mockReturnValue({
      lesson: "26",
      exercise: "0",
    });
    (router.replace as jest.Mock).mockClear();
    (router.back as jest.Mock).mockClear();
    speakSpy = jest.spyOn(audio, "speakText").mockImplementation(jest.fn());
  });

  afterEach(() => {
    speakSpy.mockRestore();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("renders partial word and digraph options", () => {
    const { getByText } = renderWithProviders(<SoundSearchScreen />);

    expect(getByText("__ip")).toBeTruthy();
    expect(getByText("sh")).toBeTruthy();
    expect(getByText("ch")).toBeTruthy();
    expect(getByText("th")).toBeTruthy();
  });

  it("keeps blank when incorrect digraph is selected", () => {
    const { getByText } = renderWithProviders(<SoundSearchScreen />);

    fireEvent.press(getByText("ch"));
    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(getByText("__ip")).toBeTruthy();
    expect(speakSpy).not.toHaveBeenCalled();
  });

  it("fills in the word and plays audio when correct digraph is selected", () => {
    const { getByText } = renderWithProviders(<SoundSearchScreen />);

    fireEvent.press(getByText("sh"));

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(getByText("ship")).toBeTruthy();
    expect(speakSpy).toHaveBeenCalledWith("ship", expect.any(Object));
  });
});
