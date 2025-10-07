import styled, { css } from "styled-components";

export const ApplicationCardContainer = styled.div`
  background: ${({ theme }) => theme.background.primary};
  border: 1px solid ${({ theme }) => theme.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    border-color: ${({ theme }) => theme.primaryColors["500"]};
    box-shadow: ${({ theme }) => theme.shadows.md};
    transform: translateY(-2px);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.text.primary};
`;

const getStatusStyles = (status: string) => {
  switch (status) {
    case "approved":
      return css`
        background-color: ${({ theme }) => theme.successColors["100"]};
        color: ${({ theme }) => theme.successColors["700"]};
        border: 1px solid ${({ theme }) => theme.successColors["200"]};
      `;
    case "rejected":
      return css`
        background-color: ${({ theme }) => theme.errorColors["100"]};
        color: ${({ theme }) => theme.errorColors["700"]};
        border: 1px solid ${({ theme }) => theme.errorColors["200"]};
      `;
    case "completed":
      return css`
        background-color: ${({ theme }) => theme.primaryColors["100"]};
        color: ${({ theme }) => theme.primaryColors["700"]};
        border: 1px solid ${({ theme }) => theme.primaryColors["200"]};
      `;
    case "invoiced":
      return css`
        background-color: ${({ theme }) => theme.secondaryColors["100"]};
        color: ${({ theme }) => theme.secondaryColors["700"]};
        border: 1px solid ${({ theme }) => theme.secondaryColors["200"]};
      `;
    default:
      return css`
        background-color: ${({ theme }) => theme.warningColors["100"]};
        color: ${({ theme }) => theme.warningColors["700"]};
        border: 1px solid ${({ theme }) => theme.warningColors["200"]};
      `;
  }
};

export const StatusBadge = styled.span<{ status: string }>`
  padding: ${({ theme }) => theme.spacing.xs};
  ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: capitalize;
  ${({ status }) => getStatusStyles(status)}
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const CardDetail = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const DetailLabel = styled.span`
  color: ${({ theme }) => theme.text.secondary};
`;

export const DetailValue = styled.span`
  color: ${({ theme }) => theme.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const CardRemarks = styled.div`
  background-color: ${({ theme }) => theme.background.secondary};
  border-left: 3px solid ${({ theme }) => theme.primaryColors["500"]};
  padding: ${({ theme }) => theme.spacing.sm};
  ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.md} 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.text.secondary};
  border-radius: 0 ${({ theme }) => theme.borderRadius.md}
    ${({ theme }) => theme.borderRadius.md} 0;

  strong {
    color: ${({ theme }) => theme.text.primary};
  }
`;

export const CardActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const SmallButton = styled.button`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &.btn-secondary {
    background-color: ${({ theme }) => theme.secondaryColors["500"]};
    color: ${({ theme }) => theme.text.inverse};

    &:hover {
      background-color: ${({ theme }) => theme.secondaryColors["600"]};
    }
  }

  &.btn-success {
    background-color: ${({ theme }) => theme.successColors["500"]};
    color: ${({ theme }) => theme.text.inverse};

    &:hover {
      background-color: ${({ theme }) => theme.successColors["600"]};
    }
  }

  &.btn-danger {
    background-color: ${({ theme }) => theme.errorColors["500"]};
    color: ${({ theme }) => theme.text.inverse};

    &:hover {
      background-color: ${({ theme }) => theme.errorColors["600"]};
    }
  }
`;
