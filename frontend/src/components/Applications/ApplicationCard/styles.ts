import styled, { css } from "styled-components";

export const ApplicationCardContainer = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    border-color: #3b82f6;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

const getStatusStyles = (status: string) => {
  switch (status) {
    case "approved":
      return css`
        background-color: #d1fae5;
        color: #065f46;
      `;
    case "rejected":
      return css`
        background-color: #fee2e2;
        color: #991b1b;
      `;
    case "completed":
      return css`
        background-color: #dbeafe;
        color: #1e40af;
      `;
    case "invoiced":
      return css`
        background-color: #f3e8ff;
        color: #7e22ce;
      `;
    default:
      return css`
        background-color: #fef3c7;
        color: #92400e;
      `;
  }
};

export const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
  ${(props) => getStatusStyles(props.status)}
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
`;

export const CardDetail = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

export const DetailLabel = styled.span`
  color: #6b7280;
`;

export const DetailValue = styled.span`
  color: #374151;
  font-weight: 500;
`;

export const CardRemarks = styled.div`
  background-color: #f8fafc;
  border-left: 3px solid #3b82f6;
  padding: 8px 12px;
  margin: 12px 0;
  font-size: 13px;
  color: #4b5563;

  strong {
    color: #374151;
  }
`;

export const CardActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

export const SmallButton = styled.button`
  padding: 6px 12px;
  font-size: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &.btn-secondary {
    background-color: #6b7280;
    color: white;

    &:hover {
      background-color: #4b5563;
    }
  }

  &.btn-success {
    background-color: #10b981;
    color: white;

    &:hover {
      background-color: #059669;
    }
  }

  &.btn-danger {
    background-color: #ef4444;
    color: white;

    &:hover {
      background-color: #dc2626;
    }
  }
`;
