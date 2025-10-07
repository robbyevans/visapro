export interface ColorPalette {
  "50": string;
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
  "900": string;
}

export interface ThemeColors {
  primaryColors: ColorPalette;
  secondaryColors: ColorPalette;
  neutralColors: ColorPalette;
  successColors: ColorPalette;
  warningColors: ColorPalette;
  errorColors: ColorPalette;
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
  };
  border: {
    light: string;
    default: string;
    dark: string;
  };
}

// Emerald Green as Primary (Professional, Trustworthy, Growth-oriented)
const primaryColors: ColorPalette = {
  "50": "#ecfdf5",
  "100": "#d1fae5",
  "200": "#a7f3d0",
  "300": "#6ee7b7",
  "400": "#34d399",
  "500": "#10b981", // Main primary color
  "600": "#059669",
  "700": "#047857",
  "800": "#065f46",
  "900": "#064e3b",
};

// Sapphire Blue as Secondary (Trust, Calm, Professional)
const secondaryColors: ColorPalette = {
  "50": "#eff6ff",
  "100": "#dbeafe",
  "200": "#bfdbfe",
  "300": "#93c5fd",
  "400": "#60a5fa",
  "500": "#3b82f6", // Main secondary color
  "600": "#2563eb",
  "700": "#1d4ed8",
  "800": "#1e40af",
  "900": "#1e3a8a",
};

// Neutral Colors
const neutralColors: ColorPalette = {
  "50": "#f8fafc",
  "100": "#f1f5f9",
  "200": "#e2e8f0",
  "300": "#cbd5e1",
  "400": "#94a3b8",
  "500": "#64748b",
  "600": "#475569",
  "700": "#334155",
  "800": "#1e293b",
  "900": "#0f172a",
};

// Success Colors (Green)
const successColors: ColorPalette = {
  "50": "#f0fdf4",
  "100": "#dcfce7",
  "200": "#bbf7d0",
  "300": "#86efac",
  "400": "#4ade80",
  "500": "#22c55e",
  "600": "#16a34a",
  "700": "#15803d",
  "800": "#166534",
  "900": "#14532d",
};

// Warning Colors (Amber - not yellow)
const warningColors: ColorPalette = {
  "50": "#fffbeb",
  "100": "#fef3c7",
  "200": "#fde68a",
  "300": "#fcd34d",
  "400": "#fbbf24",
  "500": "#f59e0b",
  "600": "#d97706",
  "700": "#b45309",
  "800": "#92400e",
  "900": "#78350f",
};

// Error Colors (Red)
const errorColors: ColorPalette = {
  "50": "#fef2f2",
  "100": "#fee2e2",
  "200": "#fecaca",
  "300": "#fca5a5",
  "400": "#f87171",
  "500": "#ef4444",
  "600": "#dc2626",
  "700": "#b91c1c",
  "800": "#991b1b",
  "900": "#7f1d1d",
};

// Light Theme
export const lightTheme: ThemeColors = {
  primaryColors: primaryColors,
  secondaryColors: secondaryColors,
  neutralColors: neutralColors,
  successColors: successColors,
  warningColors: warningColors,
  errorColors: errorColors,
  background: {
    primary: "#ffffff",
    secondary: neutralColors["50"],
    tertiary: neutralColors["100"],
  },
  text: {
    primary: neutralColors["900"],
    secondary: neutralColors["700"],
    tertiary: neutralColors["500"],
    inverse: "#ffffff",
  },
  border: {
    light: neutralColors["200"],
    default: neutralColors["300"],
    dark: neutralColors["400"],
  },
};

// Dark Theme
export const darkTheme: ThemeColors = {
  primaryColors: primaryColors,
  secondaryColors: secondaryColors,
  neutralColors: neutralColors,
  successColors: successColors,
  warningColors: warningColors,
  errorColors: errorColors,
  background: {
    primary: neutralColors["900"],
    secondary: neutralColors["800"],
    tertiary: neutralColors["700"],
  },
  text: {
    primary: neutralColors["50"],
    secondary: neutralColors["200"],
    tertiary: neutralColors["400"],
    inverse: neutralColors["900"],
  },
  border: {
    light: neutralColors["700"],
    default: neutralColors["600"],
    dark: neutralColors["500"],
  },
};

export type ThemeMode = "light" | "dark";

export const getTheme = (mode: ThemeMode): ThemeColors => {
  return mode === "dark" ? darkTheme : lightTheme;
};

// Common theme values
export const theme = {
  borderRadius: {
    sm: "4px",
    md: "6px",
    lg: "8px",
    xl: "12px",
    "2xl": "16px",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
    "3xl": "64px",
  },
  typography: {
    fontFamily: {
      primary:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      mono: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "18px",
      xl: "20px",
      "2xl": "24px",
      "3xl": "30px",
      "4xl": "36px",
      "5xl": "48px",
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
};
