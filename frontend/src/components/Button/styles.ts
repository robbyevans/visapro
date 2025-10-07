import styled, { keyframes, css } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulsate = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
`;

export const Button = styled.button<{
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  pulsating?: boolean;
  textColor?: string; // <-- accept prop
}>`
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  text-decoration: none;
  justify-content: center;
  position: relative;

  // Size styles
  ${({ size, theme }) => {
    switch (size) {
      case "sm":
        return css`
          padding: ${theme.spacing.xs} ${theme.spacing.md};
          font-size: ${theme.typography.fontSize.sm};
        `;
      case "lg":
        return css`
          padding: ${theme.spacing.md} ${theme.spacing.xl};
          font-size: ${theme.typography.fontSize.lg};
        `;
      default: // md
        return css`
          padding: ${theme.spacing.sm} ${theme.spacing.lg};
          font-size: ${theme.typography.fontSize.base};
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Variant styles — color uses textColor prop when provided, otherwise theme.text.inverse */
  ${({ variant, theme, textColor }) => {
    const colorValue = textColor ?? theme.text.inverse;
    switch (variant) {
      case "secondary":
        return css`
          background-color: ${theme.secondaryColors["500"]};
          color: ${colorValue};

          &:hover:not(:disabled) {
            background-color: ${theme.secondaryColors["600"]};
          }

          &:active:not(:disabled) {
            background-color: ${theme.secondaryColors["700"]};
          }
        `;
      case "danger":
        return css`
          background-color: ${theme.errorColors["500"]};
          color: ${colorValue};

          &:hover:not(:disabled) {
            background-color: ${theme.errorColors["600"]};
          }

          &:active:not(:disabled) {
            background-color: ${theme.errorColors["700"]};
          }
        `;
      case "success":
        return css`
          background-color: ${theme.successColors["500"]};
          color: ${colorValue};

          &:hover:not(:disabled) {
            background-color: ${theme.successColors["600"]};
          }

          &:active:not(:disabled) {
            background-color: ${theme.successColors["700"]};
          }
        `;
      default:
        return css`
          background-color: ${theme.primaryColors["500"]};
          color: ${colorValue};

          &:hover:not(:disabled) {
            background-color: ${theme.primaryColors["600"]};
          }

          &:active:not(:disabled) {
            background-color: ${theme.primaryColors["700"]};
          }
        `;
    }
  }}

  ${({ loading, textColor, theme }) =>
    loading &&
    css`
      /* hide the label text (keeps layout) */
      color: transparent;

      &::after {
        content: "";
        position: absolute;
        width: 16px;
        height: 16px;
        border: 2px solid transparent;
        /* spinner color uses textColor fallback to theme */
        border-top: 2px solid ${textColor ?? theme.text.inverse};
        border-radius: 50%;
        animation: ${spin} 1s linear infinite;
      }
    `}

  ${({ pulsating }) =>
    pulsating &&
    css`
      animation: ${pulsate} 2s infinite;
      position: relative;
      z-index: 1;

      &:hover {
        animation: none;
        transform: scale(1.05);
      }
    `}
`;
