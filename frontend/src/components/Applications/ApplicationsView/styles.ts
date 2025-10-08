import styled from "styled-components";

export const ApplicationsViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const ViewHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;

export const FilterToggle = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ active, theme }) =>
    active ? theme.primaryColors["100"] : theme.background.primary};
  color: ${({ active, theme }) =>
    active ? theme.primaryColors["600"] : theme.text.primary};
  border: 1px solid
    ${({ active, theme }) =>
      active ? theme.primaryColors["300"] : theme.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: ${({ theme }) => theme.primaryColors["50"]};
    border-color: ${({ theme }) => theme.primaryColors["300"]};
  }
`;

export const FilterIcon = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const FilterCount = styled.span`
  background: ${({ theme }) => theme.primaryColors["500"]};
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export const FilterPanel = styled.div`
  background: ${({ theme }) => theme.background.primary};
  border: 1px solid ${({ theme }) => theme.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

export const FilterActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.border.light};
`;

export const ClearFiltersButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.errorColors["300"]};
  color: ${({ theme }) => theme.errorColors["600"]};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.errorColors["50"]};
    border-color: ${({ theme }) => theme.errorColors["500"]};
  }
`;

export const CloseFiltersButton = styled.button`
  background: ${({ theme }) => theme.primaryColors["500"]};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryColors["600"]};
  }
`;
