import styled, { css, keyframes } from "styled-components";
import { STATIC_COLORS } from "../../styles";

interface ButtonStyledProps {
  variant: "primary" | "secondary" | "danger" | "success";
  size: "sm" | "md" | "lg";
  disabled?: boolean;
  textColor?: string;
  "data-loading"?: string;
  "data-pulsating"?: string;
}

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
`;

export const Button = styled.button<ButtonStyledProps>`
  /* Base styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  /* Size variants */
  ${({ size }) => {
    switch (size) {
      case "sm":
        return css`
          padding: 8px 16px;
          font-size: 14px;
          min-height: 36px;
        `;
      case "lg":
        return css`
          padding: 12px 24px;
          font-size: 16px;
          min-height: 48px;
        `;
      default: // md
        return css`
          padding: 10px 20px;
          font-size: 14px;
          min-height: 40px;
        `;
    }
  }}

  /* Color variants */
  ${({ variant, theme }) => {
    switch (variant) {
      case "secondary":
        return css`
          background: ${theme.background.primary};
          color: ${theme.text.primary};
          border: 1px solid ${theme.border.default};

          &:hover:not(:disabled) {
            background: ${theme.background.secondary};
            border-color: ${theme.primaryColors["300"]};
          }
        `;
      case "danger":
        return css`
          background: ${theme.errorColors["500"]};
          color: ${STATIC_COLORS.base.white};

          &:hover:not(:disabled) {
            background: ${theme.errorColors["600"]};
          }
        `;
      case "success":
        return css`
          background: ${theme.successColors["500"]};
          color: ${STATIC_COLORS.base.white};

          &:hover:not(:disabled) {
            background: ${theme.successColors["600"]};
          }
        `;
      default: // primary
        return css`
          background: linear-gradient(
            135deg,
            ${theme.primaryColors["500"]},
            ${theme.primaryColors["600"]}
          );
          color: ${STATIC_COLORS.base.white};

          &:hover:not(:disabled) {
            background: linear-gradient(
              135deg,
              ${theme.primaryColors["600"]},
              ${theme.primaryColors["700"]}
            );
            transform: translateY(-1px);
          }
        `;
    }
  }}

  /* Text color override */
  ${({ textColor }) =>
    textColor &&
    css`
      color: ${textColor};
    `}

  /* Disabled state */
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
      transform: none !important;
    `}

  /* Loading state */
  ${({ "data-loading": loading }) =>
    loading === "true" &&
    css`
      cursor: wait;
      opacity: 0.8;
    `}

  /* Pulsating animation */
  ${({ "data-pulsating": pulsating }) =>
    pulsating === "true" &&
    css`
      animation: ${pulseAnimation} 2s infinite;
    `}

  /* Focus state */
  &:focus {
    outline: 2px solid ${({ theme }) => theme.primaryColors["300"]};
    outline-offset: 2px;
  }

  /* Active state */
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;
