import styled from "styled-components";

export const ApplicationListContainer = styled.div`
  width: 100%;
`;

export const ApplicationListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.border.light};
`;

export const ApplicationListHeaderTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.text.primary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const FilterBadge = styled.span`
  background-color: ${({ theme }) => theme.primaryColors["500"]};
  color: ${({ theme }) => theme.text.inverse};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: capitalize;
`;

export const ApplicationCount = styled.span`
  color: ${({ theme }) => theme.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const ApplicationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const ApplicationListLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing["3xl"]};
  ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.text.secondary};
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ApplicationListError = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.errorColors["50"]};
  border: 1px solid ${({ theme }) => theme.errorColors["200"]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.errorColors["700"]};
  gap: ${({ theme }) => theme.spacing.md};
`;

export const RetryButton = styled.button`
  background-color: ${({ theme }) => theme.secondaryColors["500"]};
  color: ${({ theme }) => theme.text.inverse};
  border: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColors["600"]};
  }
`;
