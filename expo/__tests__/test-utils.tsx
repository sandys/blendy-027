import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react-native";
import { AppProvider } from "@/contexts/AppContext";

type ProviderProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProviderProps) => <AppProvider>{children}</AppProvider>;

export const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react-native";
