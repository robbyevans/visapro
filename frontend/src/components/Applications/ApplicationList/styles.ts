import styled from "styled-components";

export const ApplicationListContainer = styled.div`
  width: 100%;
`;

export const ApplicationListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  padding-bottom: ${(props) => props.theme.spacing.md};
  border-bottom: 1px solid ${(props) => props.theme.border.light};
`;

export const ApplicationListHeaderTitle = styled.h2`
  margin: 0;
  font-size: ${(props) => props.theme.typography.fontSize["2xl"]};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  color: ${(props) => props.theme.text.primary};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
`;

export const FilterBadge = styled.span`
  background-color: ${(props) => props.theme.primary[500]};
  color: ${(props) => props.theme.text.inverse};
  padding: ${(props) => props.theme.spacing.xs}
    ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
  text-transform: capitalize;
`;

export const ApplicationCount = styled.span`
  color: ${(props) => props.theme.text.secondary};
  font-size: ${(props) => props.theme.typography.fontSize.sm};
`;

export const ApplicationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};
`;

export const ApplicationListLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing["3xl"]}
    ${(props) => props.theme.spacing.lg};
  color: ${(props) => props.theme.text.secondary};
  gap: ${(props) => props.theme.spacing.md};
`;

export const ApplicationListError = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing.xl}
    ${(props) => props.theme.spacing.lg};
  background-color: ${(props) => props.theme.error[50]};
  border: 1px solid ${(props) => props.theme.error[200]};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  color: ${(props) => props.theme.error[700]};
  gap: ${(props) => props.theme.spacing.md};
`;

export const RetryButton = styled.button`
  background-color: ${(props) => props.theme.secondary[500]};
  color: ${(props) => props.theme.text.inverse};
  border: none;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.md};
  cursor: pointer;
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.secondary[600]};
  }
`;
