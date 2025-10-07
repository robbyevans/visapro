import React, { useState, useEffect } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme, darkTheme, theme, type ThemeMode } from "../styles/theme";
import { ThemeContext } from "../contexts/ThemeContext";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  useEffect(() => {
    const initializeTheme = () => {
      try {
        const savedTheme = localStorage.getItem("theme") as ThemeMode;
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;

        if (savedTheme) {
          setThemeMode(savedTheme);
        } else if (prefersDark) {
          setThemeMode("dark");
        }
      } catch (error) {
        console.error("Failed to load theme preference:", error);
        // Fallback to light theme
        setThemeMode("light");
      }
    };

    initializeTheme();
  }, []);

  const toggleTheme = () => {
    const newTheme = themeMode === "light" ? "dark" : "light";
    setThemeMode(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleSetThemeMode = (mode: ThemeMode) => {
    setThemeMode(mode);
    localStorage.setItem("theme", mode);
  };

  const currentTheme = {
    ...(themeMode === "light" ? lightTheme : darkTheme),
    ...theme,
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        toggleTheme,
        setThemeMode: handleSetThemeMode,
      }}
    >
      <StyledThemeProvider theme={currentTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
