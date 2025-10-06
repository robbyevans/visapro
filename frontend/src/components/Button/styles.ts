import styled, { keyframes, css } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Button = styled.button<{
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg"; // Add this
  loading?: boolean;
}>`
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  justify-content: center;
  position: relative;

  // Size styles
  ${(props) => {
    switch (props.size) {
      case "sm":
        return css`
          padding: 8px 16px;
          font-size: 12px;
        `;
      case "lg":
        return css`
          padding: 16px 32px;
          font-size: 16px;
        `;
      default: // md
        return css`
          padding: 12px 24px;
          font-size: 14px;
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${(props) => {
    switch (props.variant) {
      case "secondary":
        return css`
          background-color: #6b7280;
          color: white;

          &:hover:not(:disabled) {
            background-color: #4b5563;
          }
        `;
      case "danger":
        return css`
          background-color: #ef4444;
          color: white;

          &:hover:not(:disabled) {
            background-color: #dc2626;
          }
        `;
      case "success":
        return css`
          background-color: #10b981;
          color: white;

          &:hover:not(:disabled) {
            background-color: #059669;
          }
        `;
      default:
        return css`
          background-color: #3b82f6;
          color: white;

          &:hover:not(:disabled) {
            background-color: #2563eb;
          }
        `;
    }
  }}

  ${(props) =>
    props.loading &&
    css`
      color: transparent;

      &::after {
        content: "";
        position: absolute;
        width: 16px;
        height: 16px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: ${spin} 1s linear infinite;
      }
    `}
`;

// Your Spinner component remains the same
export const Spinner = styled.div<{ size?: "sm" | "md" | "lg" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "";
    border: 2px solid #f3f4f6;
    border-top: 2px solid #3b82f6;
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;

    ${(props) => {
      switch (props.size) {
        case "sm":
          return css`
            width: 16px;
            height: 16px;
          `;
        case "lg":
          return css`
            width: 32px;
            height: 32px;
          `;
        default:
          return css`
            width: 24px;
            height: 24px;
          `;
      }
    }}
  }
`;
