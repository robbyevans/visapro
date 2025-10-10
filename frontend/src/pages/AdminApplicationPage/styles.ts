import styled, { css } from "styled-components";

export const AdminApplicationContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
    ${({ theme }) => theme.spacing.sm};
    max-width: 100%;
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

export const Header = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
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
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-family: inherit;

  &:hover {
    background-color: ${({ theme }) => theme.background.secondary};
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xs};
    ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.xs};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    width: 100%;
    justify-content: center;
  }
`;

export const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.text.primary};
  margin: 0;
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    line-height: 1.3;
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    text-align: center;
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: 480px) {
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const Section = styled.section`
  background: ${({ theme }) => theme.background.primary};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.border.light};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    text-align: center;
  }
`;

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 480px) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};

  @media (max-width: 480px) {
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const DetailLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.text.secondary};

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

export const DetailValue = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  word-break: break-word;

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`;

export const StatusBadge = styled.span<{ status: string }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: capitalize;
  display: inline-block;
  width: fit-content;

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

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    padding: ${({ theme }) => theme.spacing.xs};
    ${({ theme }) => theme.spacing.sm};
  }
`;

export const Remarks = styled.div`
  background-color: ${({ theme }) => theme.background.secondary};
  border-left: 3px solid ${({ theme }) => theme.primaryColors["500"]};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.text.secondary};
  word-break: break-word;

  strong {
    color: ${({ theme }) => theme.text.primary};
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

export const DocumentsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: 480px) {
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const DocumentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const DocumentSectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    text-align: center;
  }
`;

export const DocumentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const DocumentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.border.light};
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm};
    flex-direction: column;
    align-items: stretch;
    gap: ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.sm};
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const DocumentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 1;
  min-width: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const DocumentType = styled.span`
  background-color: ${({ theme }) => theme.primaryColors["500"]};
  color: ${({ theme }) => theme.text.inverse};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: capitalize;
  flex-shrink: 0;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    padding: ${({ theme }) => theme.spacing.xs};
    ${({ theme }) => theme.spacing.xs};
    align-self: flex-start;
  }
`;

export const DocumentName = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.text.primary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  min-width: 0;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    max-width: 200px;
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    white-space: normal;
    word-break: break-all;
    max-width: 100%;
    text-overflow: unset;
  }
`;

export const NoDocuments = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.text.secondary};
  font-style: italic;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg};
    ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

export const UploadControls = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const FileInput = styled.input`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  flex: 1;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    padding: ${({ theme }) => theme.spacing.xs};
    ${({ theme }) => theme.spacing.sm};
  }
`;

export const UploadButton = styled.button<{ disabled?: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.neutralColors["400"] : theme.primaryColors["500"]};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme, disabled }) =>
      disabled ? theme.neutralColors["400"] : theme.primaryColors["600"]};
  }

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    padding: ${({ theme }) => theme.spacing.xs};
    ${({ theme }) => theme.spacing.sm};
    width: 100%;
  }
`;

export const AdminActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 480px) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const RemarksInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const RemarksLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.text.primary};

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
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

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

export const StatusButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.xs};
  }

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const StatusButton = styled.button<{
  variant: string;
  disabled?: boolean;
}>`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  font-family: inherit;
  flex: 1;

  ${({ variant, theme, disabled }) => {
    switch (variant) {
      case "approve":
        return css`
          background-color: ${disabled
            ? theme.neutralColors["400"]
            : theme.successColors["500"]};
          color: ${theme.text.inverse};

          &:hover {
            background-color: ${disabled
              ? theme.neutralColors["400"]
              : theme.successColors["600"]};
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
          background-color: ${disabled
            ? theme.neutralColors["400"]
            : theme.primaryColors["500"]};
          color: ${theme.text.inverse};

          &:hover {
            background-color: ${disabled
              ? theme.neutralColors["400"]
              : theme.primaryColors["600"]};
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

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm};
    ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    width: 100%;
  }
`;
export const DocumentActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing.xs};
  }

  @media (max-width: 480px) {
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const PreviewButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.primaryColors["500"]};
  color: ${({ theme }) => theme.primaryColors["500"]};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-decoration: none;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex: 1;

  &:hover {
    background-color: ${({ theme }) => theme.primaryColors["50"]};
  }

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    padding: ${({ theme }) => theme.spacing.xs};
    ${({ theme }) => theme.spacing.sm};
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    padding: ${({ theme }) => theme.spacing.xs};
  }
`;

export const DownloadButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.successColors["500"]};
  color: ${({ theme }) => theme.successColors["500"]};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-decoration: none;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex: 1;

  &:hover {
    background-color: ${({ theme }) => theme.successColors["50"]};
  }

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    padding: ${({ theme }) => theme.spacing.xs};
    ${({ theme }) => theme.spacing.sm};
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    padding: ${({ theme }) => theme.spacing.xs};
  }
`;
