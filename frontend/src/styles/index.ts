export const STATIC_COLORS = {
  // Base Colors
  base: {
    white: "#FFFFFF",
    black: "#000000",
    transparent: "transparent",
  },

  // Gray Scale
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },

  // Semantic Colors (for consistent use across themes)
  semantic: {
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#3B82F6",
  },

  // Brand Colors (if you have specific brand colors)
  brand: {
    primary: "#10B981", // Emerald Green
    secondary: "#3B82F6", // Sapphire Blue
    accent: "#8B5CF6", // Purple
  },

  // Background Overlays
  overlay: {
    light: "rgba(255, 255, 255, 0.1)",
    medium: "rgba(255, 255, 255, 0.15)",
    dark: "rgba(0, 0, 0, 0.4)",
    darker: "rgba(0, 0, 0, 0.6)",
  },
} as const;

// Type for better TypeScript support
export type StaticColors = typeof STATIC_COLORS;

// Re-export theme files for convenience
export {
  lightTheme,
  darkTheme,
  getTheme,
  type ThemeMode,
  type ThemeColors,
} from "./theme";
export { GlobalStyle } from "./global";
