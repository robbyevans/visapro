import styled, { css } from "styled-components";

export const ApplicationCardContainer = styled.div<{ $clickable?: boolean }>`
  background: ${({ theme }) => theme.background.primary};
  border: 1px solid ${({ theme }) => theme.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};

  ${({ $clickable }) =>
    $clickable &&
    css`
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;

      &:hover {
        border-color: ${({ theme }) => theme.primaryColors["500"]};
        box-shadow: ${({ theme }) => theme.shadows.md};
        transform: translateY(-2px);
      }
    `}

  ${({ $clickable }) =>
    !$clickable &&
    css`
      cursor: default;
    `}

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.sm};

    ${({ $clickable }) =>
      $clickable &&
      css`
        &:hover {
          transform: none;
        }
      `}
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.sm};
  pointer-events: none;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.xs};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.text.primary};
  line-height: 1.3;
  pointer-events: none;

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    word-break: break-word;
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  pointer-events: none;

  @media (max-width: 480px) {
    gap: ${({ theme }) => theme.spacing.xs};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

export const CardDetail = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  align-items: center;
  pointer-events: none;

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

export const DetailLabel = styled.span`
  color: ${({ theme }) => theme.text.secondary};
  flex-shrink: 0;
  min-width: 80px;
  pointer-events: none;
`;

export const DetailValue = styled.span`
  color: ${({ theme }) => theme.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-align: right;
  word-break: break-word;
  flex: 1;
  margin-left: ${({ theme }) => theme.spacing.sm};
  pointer-events: none;
`;

export const CardRemarks = styled.div`
  background-color: ${({ theme }) => theme.background.secondary};
  border-left: 3px solid ${({ theme }) => theme.primaryColors["500"]};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.md} 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.text.secondary};
  border-radius: 0 ${({ theme }) => theme.borderRadius.md}
    ${({ theme }) => theme.borderRadius.md} 0;
  pointer-events: none;

  strong {
    color: ${({ theme }) => theme.text.primary};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.xs};
    ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    margin: ${({ theme }) => theme.spacing.sm} 0;
  }
`;

export const CardActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  pointer-events: auto;

  @media (max-width: 480px) {
    gap: ${({ theme }) => theme.spacing.xs};
    margin-top: ${({ theme }) => theme.spacing.sm};

    button {
      flex: 1;
      min-width: 80px;
    }
  }
`;

export const SmallButton = styled.button`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  white-space: nowrap;
  pointer-events: auto;

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.xs};
    ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  }
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
