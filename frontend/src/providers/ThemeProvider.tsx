import React, { useState, useEffect } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme, darkTheme, theme, type ThemeMode } from "../styles/theme";
import { ThemeContext } from "../contexts/ThemeContext";
import { useUser } from "../redux/hooks/useUser";
import { useAuth } from "../redux/hooks/useAuth";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const { currentUser, updateTheme, updateThemeLocal } = useUser();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const initializeTheme = () => {
      try {
        if (isAuthenticated && currentUser) {
          // ✅ Use theme_preference from backend
          setThemeMode(currentUser.theme_preference || "light");
        } else {
          // For non-authenticated users, use saved preference or system preference
          const savedTheme = localStorage.getItem("theme") as ThemeMode;
          const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
          ).matches;

          if (savedTheme) {
            setThemeMode(savedTheme);
          } else if (prefersDark) {
            setThemeMode("dark");
          }
        }
      } catch (error) {
        console.error("Failed to load theme preference:", error);
        // Fallback to light theme
        setThemeMode("light");
      }
    };

    initializeTheme();
  }, [currentUser, isAuthenticated]);

  const toggleTheme = async () => {
    const newTheme = themeMode === "light" ? "dark" : "light";

    if (isAuthenticated && currentUser) {
      try {
        // Update locally first for immediate UI response
        setThemeMode(newTheme);
        updateThemeLocal(newTheme);

        // Then persist to backend with theme_preference parameter
        await updateTheme(newTheme);
        console.info("Theme preference updated on backend:", newTheme);
      } catch (error) {
        console.error("Failed to update theme preference on backend:", error);
        // Revert on error
        setThemeMode(themeMode);
        updateThemeLocal(themeMode);
      }
    } else {
      // For non-authenticated users, just update local storage
      setThemeMode(newTheme);
      localStorage.setItem("theme", newTheme);
    }
  };

  const handleSetThemeMode = async (mode: ThemeMode) => {
    if (isAuthenticated && currentUser) {
      try {
        // Update locally first for immediate UI response
        setThemeMode(mode);
        updateThemeLocal(mode);

        // Then persist to backend with theme_preference parameter
        await updateTheme(mode);
      } catch (error) {
        console.error("Failed to update theme preference:", error);
        // Revert on error
        setThemeMode(themeMode);
        updateThemeLocal(themeMode);
        throw error;
      }
    } else {
      // For non-authenticated users, just update local storage
      setThemeMode(mode);
      localStorage.setItem("theme", mode);
    }
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
