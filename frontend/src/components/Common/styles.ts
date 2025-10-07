import styled from "styled-components";

export const EmptyStateContainer = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.text.secondary};
  padding: ${({ theme }) => theme.spacing["2xl"]};
  ${({ theme }) => theme.spacing.lg};
`;

export const EmptyStateIcon = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};

  svg {
    width: 64px;
    height: 64px;
    color: ${({ theme }) => theme.text.tertiary};
  }
`;

export const EmptyStateTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`;

export const EmptyStateDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  line-height: 1.5;
`;

export const EmptyStateAction = styled.div`
  display: inline-flex;
`;
