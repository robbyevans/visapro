import styled, { css } from "styled-components";

export const ApplicationCardContainer = styled.div`
  background: ${(props) => props.theme.background.primary};
  border: 1px solid ${(props) => props.theme.border.light};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: ${(props) => props.theme.spacing.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    border-color: ${(props) => props.theme.primary[500]};
    box-shadow: ${(props) => props.theme.shadows.md};
    transform: translateY(-2px);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: ${(props) => props.theme.typography.fontSize.lg};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  color: ${(props) => props.theme.text.primary};
`;

const getStatusStyles = (status: string) => {
  switch (status) {
    case "approved":
      return css`
        background-color: ${(props) => props.theme.success[100]};
        color: ${(props) => props.theme.success[700]};
        border: 1px solid ${(props) => props.theme.success[200]};
      `;
    case "rejected":
      return css`
        background-color: ${(props) => props.theme.error[100]};
        color: ${(props) => props.theme.error[700]};
        border: 1px solid ${(props) => props.theme.error[200]};
      `;
    case "completed":
      return css`
        background-color: ${(props) => props.theme.primary[100]};
        color: ${(props) => props.theme.primary[700]};
        border: 1px solid ${(props) => props.theme.primary[200]};
      `;
    case "invoiced":
      return css`
        background-color: ${(props) => props.theme.secondary[100]};
        color: ${(props) => props.theme.secondary[700]};
        border: 1px solid ${(props) => props.theme.secondary[200]};
      `;
    default:
      return css`
        background-color: ${(props) => props.theme.warning[100]};
        color: ${(props) => props.theme.warning[700]};
        border: 1px solid ${(props) => props.theme.warning[200]};
      `;
  }
};

export const StatusBadge = styled.span<{ status: string }>`
  padding: ${(props) => props.theme.spacing.xs}
    ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: ${(props) => props.theme.typography.fontSize.xs};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
  text-transform: capitalize;
  ${(props) => getStatusStyles(props.status)}
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.xs};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

export const CardDetail = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${(props) => props.theme.typography.fontSize.sm};
`;

export const DetailLabel = styled.span`
  color: ${(props) => props.theme.text.secondary};
`;

export const DetailValue = styled.span`
  color: ${(props) => props.theme.text.primary};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
`;

export const CardRemarks = styled.div`
  background-color: ${(props) => props.theme.background.secondary};
  border-left: 3px solid ${(props) => props.theme.primary[500]};
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  margin: ${(props) => props.theme.spacing.md} 0;
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  color: ${(props) => props.theme.text.secondary};
  border-radius: 0 ${(props) => props.theme.borderRadius.md}
    ${(props) => props.theme.borderRadius.md} 0;

  strong {
    color: ${(props) => props.theme.text.primary};
  }
`;

export const CardActions = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
  margin-top: ${(props) => props.theme.spacing.md};
`;

export const SmallButton = styled.button`
  padding: ${(props) => props.theme.spacing.xs}
    ${(props) => props.theme.spacing.sm};
  font-size: ${(props) => props.theme.typography.fontSize.xs};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};

  &.btn-secondary {
    background-color: ${(props) => props.theme.secondary[500]};
    color: ${(props) => props.theme.text.inverse};

    &:hover {
      background-color: ${(props) => props.theme.secondary[600]};
    }
  }

  &.btn-success {
    background-color: ${(props) => props.theme.success[500]};
    color: ${(props) => props.theme.text.inverse};

    &:hover {
      background-color: ${(props) => props.theme.success[600]};
    }
  }

  &.btn-danger {
    background-color: ${(props) => props.theme.error[500]};
    color: ${(props) => props.theme.text.inverse};

    &:hover {
      background-color: ${(props) => props.theme.error[600]};
    }
  }
`;
