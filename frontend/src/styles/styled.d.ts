import "styled-components";
import { ThemeColors } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme extends ThemeColors {
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      "2xl": string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      "2xl": string;
      "3xl": string;
    };
    typography: {
      fontFamily: {
        primary: string;
        mono: string;
      };
      fontSize: {
        xs: string;
        sm: string;
        base: string;
        lg: string;
        xl: string;
        "2xl": string;
        "3xl": string;
        "4xl": string;
        "5xl": string;
      };
      fontWeight: {
        normal: string;
        medium: string;
        semibold: string;
        bold: string;
      };
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
}
