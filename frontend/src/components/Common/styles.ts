import styled from "styled-components";

export const EmptyStateContainer = styled.div`
  text-align: center;
  padding: 48px 24px;
  color: #6b7280;
`;

export const EmptyStateIcon = styled.div`
  margin-bottom: 16px;

  svg {
    width: 64px;
    height: 64px;
    color: #d1d5db;
  }
`;

export const EmptyStateTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 8px 0;
`;

export const EmptyStateDescription = styled.p`
  font-size: 14px;
  margin: 0 0 24px 0;
  line-height: 1.5;
`;

export const EmptyStateAction = styled.div`
  display: inline-flex;
`;
