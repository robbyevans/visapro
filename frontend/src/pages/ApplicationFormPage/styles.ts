import styled from "styled-components";

export const ApplicationFormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
    ${({ theme }) => theme.spacing.sm};
    max-width: 100%;
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

export const FormHeader = styled.header`
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

export const FormTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
`;

export const FormSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.text.secondary};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: 480px) {
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const FormSection = styled.section`
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
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
`;

export const ToggleGroup = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const ToggleButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: none;
  background: ${({ active, theme }) =>
    active ? theme.primaryColors["500"] : theme.background.primary};
  color: ${({ active, theme }) =>
    active ? theme.text.inverse : theme.text.primary};
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    background: ${({ active, theme }) =>
      active ? theme.primaryColors["600"] : theme.background.secondary};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.sm};
    ${({ theme }) => theme.spacing.md};
  }
`;

export const NewAthleteForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const DocumentsInfo = styled.div`
  background: ${({ theme }) => theme.background.secondary};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.text.secondary};
  word-break: break-word;

  p {
    margin: ${({ theme }) => theme.spacing.xs} 0;
  }

  strong {
    color: ${({ theme }) => theme.text.primary};
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.xs};
    ${({ theme }) => theme.spacing.sm};
  }
`;

export const DocumentUploadSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.background.secondary};

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }
`;

export const DocumentUploadHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const DocumentTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.text.primary};
  margin: 0;
  word-break: break-word;

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`;

export const DocumentRequired = styled.span`
  background: ${({ theme }) => theme.errorColors["500"]};
  color: ${({ theme }) => theme.text.inverse};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    padding: ${({ theme }) => theme.spacing.xs};
    ${({ theme }) => theme.spacing.xs};
    align-self: flex-start;
  }
`;

export const DocumentOptional = styled.span`
  background: ${({ theme }) => theme.neutralColors["500"]};
  color: ${({ theme }) => theme.text.inverse};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    padding: ${({ theme }) => theme.spacing.xs};
    ${({ theme }) => theme.spacing.xs};
    align-self: flex-start;
  }
`;

export const DocumentDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  word-break: break-word;

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`;

export const DocumentError = styled.div`
  color: ${({ theme }) => theme.errorColors["500"]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  word-break: break-word;

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    margin-top: ${({ theme }) => theme.spacing.xs};
  }
`;

export const UploadedFile = styled.div`
  background: ${({ theme }) => theme.successColors["100"]};
  border: 1px solid ${({ theme }) => theme.successColors["300"]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.successColors["700"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  word-break: break-word;

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.xs};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

export const UploadedFiles = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.successColors["50"]};
  border: 1px solid ${({ theme }) => theme.successColors["200"]};
  border-radius: ${({ theme }) => theme.borderRadius.md};

  h4 {
    margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
    color: ${({ theme }) => theme.successColors["700"]};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.sm};
    margin-top: ${({ theme }) => theme.spacing.md};
  }
`;

export const FileItem = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.background.primary};
  border: 1px solid ${({ theme }) => theme.successColors["200"]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.successColors["700"]};
  word-break: break-word;

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.xs};
    ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.border.light};

  @media (max-width: 768px) {
    justify-content: stretch;
    gap: ${({ theme }) => theme.spacing.sm};
    padding-top: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const TextAreaLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  transition: all 0.2s ease;
  background-color: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.primary};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryColors["500"]};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primaryColors["100"]};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.background.secondary};
    color: ${({ theme }) => theme.text.tertiary};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${({ theme }) => theme.text.tertiary};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    min-height: 100px;
  }
`;

export const TextAreaHelp = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.text.secondary};
  margin: 0;
  word-break: break-word;

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;
