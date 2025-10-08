import styled, { css } from "styled-components";

export const ProgressBarContainer = styled.div`
  background: ${({ theme }) => theme.background.primary};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.border.light};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const ProgressTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.text.primary};
  margin: 0;
`;

export const ProgressPercentage = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.primaryColors["500"]};
  background: ${({ theme }) => theme.primaryColors["50"]};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const ProgressBarWrapper = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const ProgressBarFill = styled.div<{ progress: number }>`
  height: 6px;
  background: ${({ theme }) => theme.primaryColors["500"]};
  border-radius: 3px;
  width: ${({ progress }) => progress}%;
  transition: width 0.3s ease;
  position: relative;
  z-index: 2;
`;

export const ProgressSteps = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.xl};
  position: relative;
`;

export const ProgressStep = styled.div<{
  status: "completed" | "current" | "pending";
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
  position: relative;

  ${({ status, theme }) => {
    switch (status) {
      case "completed":
        return css`
          color: ${theme.successColors["600"]};
        `;
      case "current":
        return css`
          color: ${theme.primaryColors["600"]};
        `;
      case "pending":
        return css`
          color: ${theme.neutralColors["400"]};
        `;
    }
  }}
`;

export const StepDot = styled.div<{
  status: "completed" | "current" | "pending";
}>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  border: 2px solid;

  ${({ status, theme }) => {
    switch (status) {
      case "completed":
        return css`
          background: ${theme.successColors["500"]};
          color: ${theme.text.inverse};
          border-color: ${theme.successColors["500"]};
        `;
      case "current":
        return css`
          background: ${theme.primaryColors["500"]};
          color: ${theme.text.inverse};
          border-color: ${theme.primaryColors["500"]};
        `;
      case "pending":
        return css`
          background: ${theme.background.primary};
          color: ${theme.neutralColors["400"]};
          border-color: ${theme.neutralColors["300"]};
        `;
    }
  }}
`;

export const StepInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const StepLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  white-space: nowrap;
`;

export const StepDescription = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.text.secondary};
  white-space: nowrap;
`;
