import styled, { css } from "styled-components";

export const AdminApplicationContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const BackButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.border.default};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.text.secondary};
  font-family: inherit;

  &:hover {
    background-color: ${({ theme }) => theme.background.secondary};
  }
`;

export const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.text.primary};
  margin: 0;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const Section = styled.section`
  background: ${({ theme }) => theme.background.primary};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.border.light};
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const DetailLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.text.secondary};
`;

export const DetailValue = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.text.primary};
`;

export const StatusBadge = styled.span<{ status: string }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: capitalize;

  ${({ status, theme }) => {
    switch (status) {
      case "approved":
        return css`
          background-color: ${theme.successColors["100"]};
          color: ${theme.successColors["700"]};
        `;
      case "rejected":
        return css`
          background-color: ${theme.errorColors["100"]};
          color: ${theme.errorColors["700"]};
        `;
      case "completed":
        return css`
          background-color: ${theme.primaryColors["100"]};
          color: ${theme.primaryColors["700"]};
        `;
      case "invoiced":
        return css`
          background-color: ${theme.secondaryColors["100"]};
          color: ${theme.secondaryColors["700"]};
        `;
      default:
        return css`
          background-color: ${theme.warningColors["100"]};
          color: ${theme.warningColors["700"]};
        `;
    }
  }}
`;

export const Remarks = styled.div`
  background-color: ${({ theme }) => theme.background.secondary};
  border-left: 3px solid ${({ theme }) => theme.primaryColors["500"]};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.text.secondary};
`;

export const DocumentsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const DocumentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const DocumentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const DocumentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.border.light};
`;

export const DocumentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const DocumentType = styled.span`
  background-color: ${({ theme }) => theme.primaryColors["500"]};
  color: ${({ theme }) => theme.text.inverse};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: capitalize;
`;

export const DocumentName = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.text.primary};
`;

export const UploadControls = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
`;

export const AdminActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const RemarksInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const TextArea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
  background-color: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.primary};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryColors["500"]};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primaryColors["100"]};
  }

  &::placeholder {
    color: ${({ theme }) => theme.text.tertiary};
  }
`;

export const StatusButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

export const StatusButton = styled.button<{ variant: string }>`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  ${({ variant, theme }) => {
    switch (variant) {
      case "approve":
        return css`
          background-color: ${theme.successColors["500"]};
          color: ${theme.text.inverse};

          &:hover {
            background-color: ${theme.successColors["600"]};
          }

          &:disabled {
            background-color: ${theme.neutralColors["400"]};
            cursor: not-allowed;
          }
        `;
      case "reject":
        return css`
          background-color: ${theme.errorColors["500"]};
          color: ${theme.text.inverse};

          &:hover {
            background-color: ${theme.errorColors["600"]};
          }
        `;
      case "complete":
        return css`
          background-color: ${theme.primaryColors["500"]};
          color: ${theme.text.inverse};

          &:hover {
            background-color: ${theme.primaryColors["600"]};
          }

          &:disabled {
            background-color: ${theme.neutralColors["400"]};
            cursor: not-allowed;
          }
        `;
      default:
        return css`
          background-color: ${theme.neutralColors["500"]};
          color: ${theme.text.inverse};

          &:hover {
            background-color: ${theme.neutralColors["600"]};
          }
        `;
    }
  }}
`;
