import styled from "styled-components";

export const AuthPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => {
    // Check if we're in dark mode by looking for dark theme colors
    const isDarkTheme =
      theme.background?.primary === theme.neutralColors?.["900"] ||
      theme.background?.primary === "#1a1a1a" ||
      theme.text?.primary === "#ffffff";

    if (isDarkTheme) {
      // Dark theme gradient
      return `linear-gradient(
        135deg,
        ${theme.neutralColors?.["800"] || "#2d3748"} 0%,
        ${theme.neutralColors?.["900"] || "#1a202c"} 50%,
        ${theme.primaryColors?.["900"] || "#1e3a8a"} 100%
      )`;
    } else {
      // Light theme gradient (original)
      return `linear-gradient(
        135deg,
        ${theme.primaryColors["500"]} 0%,
        ${theme.secondaryColors["500"]} 100%
      )`;
    }
  }};
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const AuthCard = styled.div`
  width: 100%;
  max-width: 440px;
`;
