import styled, { keyframes } from "styled-components";
import Button from "../Button/Button";

export const EditDocumentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.background.secondary};
  border: 1px solid ${({ theme }) => theme.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  gap: ${({ theme }) => theme.spacing.md};

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.sm};
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
  min-width: 0; /* Allow text truncation */

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

export const DocumentIcon = styled.div`
  font-size: 24px;
  flex-shrink: 0;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const DocumentDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0; /* Allow text truncation */
`;

export const DocumentName = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px; /* FIXED: Set max width for truncation */

  @media (max-width: 768px) {
    max-width: 150px;
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }

  @media (max-width: 480px) {
    max-width: 120px;
  }
`;

export const DocumentType = styled.span`
  color: ${({ theme }) => theme.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  text-transform: capitalize;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px;

  @media (max-width: 768px) {
    max-width: 150px;
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }

  @media (max-width: 480px) {
    max-width: 120px;
  }
`;

export const DocumentActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
  flex-shrink: 0;

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing.xs};
  }

  @media (max-width: 480px) {
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const ReplaceButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.primaryColors["500"]};
  color: ${({ theme }) => theme.text.inverse};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: background-color 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) => theme.primaryColors["600"]};
  }

  input {
    display: none;
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xs};
    ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    flex: 1;
    text-align: center;
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.xs};
    ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

export const MobileResponsiveButton = styled(Button)`
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xs};
    ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    flex: 1;
    text-align: center;
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.xs};
    ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const PreviewOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease;
  padding: ${({ theme }) => theme.spacing.lg};

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

export const PreviewContainer = styled.div`
  background: ${({ theme }) => theme.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  animation: ${slideUp} 0.3s ease;

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    width: 95%;
    max-height: 85vh;
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }

  @media (max-width: 480px) {
    width: 98%;
    max-height: 80vh;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
`;

export const PreviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.border.light};

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

export const PreviewTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 400px;

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    max-width: 250px;
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    max-width: 180px;
  }
`;

export const PreviewActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;

  /* Mobile responsiveness */
  @media (max-width: 480px) {
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const ActionButton = styled.button`
  background: ${({ theme }) => theme.primaryColors["500"]};
  color: ${({ theme }) => theme.text.inverse};
  border: none;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  transition: background-color 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.primaryColors["600"]};
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xs};
    ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.xs};
    ${({ theme }) => theme.spacing.sm};
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.text.secondary};
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) => theme.background.secondary};
    color: ${({ theme }) => theme.text.primary};
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
    font-size: 20px;
  }

  @media (max-width: 480px) {
    width: 24px;
    height: 24px;
    font-size: 18px;
  }
`;

export const PreviewContent = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

export const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

export const PDFPreview = styled.div`
  width: 100%;
  height: 600px;
  border: 1px solid ${({ theme }) => theme.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};

  embed {
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    height: 500px;
  }

  @media (max-width: 480px) {
    height: 400px;
  }
`;

export const UnsupportedPreview = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.text.secondary};
  padding: ${({ theme }) => theme.spacing.xl};

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: ${({ theme }) => theme.text.secondary};
`;

export const ErrorMessage = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.errorColors["500"]};
  padding: ${({ theme }) => theme.spacing.lg};

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.lg};

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.sm};
    margin-top: ${({ theme }) => theme.spacing.md};
    flex-wrap: wrap;
  }

  @media (max-width: 480px) {
    gap: ${({ theme }) => theme.spacing.xs};
    margin-top: ${({ theme }) => theme.spacing.sm};
  }
`;

export const PrimaryButton = styled.button`
  background: ${({ theme }) => theme.primaryColors["500"]};
  color: ${({ theme }) => theme.text.inverse};
  border: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.primaryColors["600"]};
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xs};
    ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    flex: 1;
    min-width: 120px;
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.xs};
    ${({ theme }) => theme.spacing.sm};
    min-width: 100px;
  }
`;

export const SecondaryButton = styled.button`
  background: ${({ theme }) => theme.background.secondary};
  color: ${({ theme }) => theme.text.primary};
  border: 1px solid ${({ theme }) => theme.border.default};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.background.primary};
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xs};
    ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    flex: 1;
    min-width: 120px;
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.xs};
    ${({ theme }) => theme.spacing.sm};
    min-width: 100px;
  }
`;
