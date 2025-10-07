import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const SpinnerContainer = styled.div<{ size?: "sm" | "md" | "lg" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "";
    border: 2px solid ${({ theme }) => theme.neutralColors["200"]};
    border-top: 2px solid ${({ theme }) => theme.primaryColors["500"]};
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;

    ${({ size }) => {
      switch (size) {
        case "sm":
          return `
            width: 16px;
            height: 16px;
          `;
        case "lg":
          return `
            width: 32px;
            height: 32px;
          `;
        default:
          return `
            width: 24px;
            height: 24px;
          `;
      }
    }}
  }
`;
