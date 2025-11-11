import styled, { css } from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const InputLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const Required = styled.span`
  color: ${({ theme }) => theme.errorColors["500"]};
  margin-left: ${({ theme }) => theme.spacing.xs};
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const StyledInput = styled.input<{
  $hasError?: boolean;
  $isPassword?: boolean;
}>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  padding-right: ${({ $isPassword, theme }) =>
    $isPassword ? "40px" : theme.spacing.md};
  border: 1px solid
    ${({ $hasError, theme }) =>
      $hasError ? theme.errorColors["500"] : theme.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  transition: all 0.2s ease;
  background-color: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.primary};
  font-family: inherit;

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
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text.secondary};

  &:hover {
    background-color: ${({ theme }) => theme.background.secondary};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const EyeIcon = styled.span`
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

export const EyeSlashIcon = styled.span`
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const SelectField = styled.select<{ $hasError?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} 40px
    ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md};
  border: 1px solid
    ${({ $hasError, theme }) =>
      $hasError ? theme.errorColors["500"] : theme.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  transition: all 0.2s ease;
  background-color: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.primary};
  appearance: none;
  cursor: pointer;
  font-family: inherit;
  z-index: 1;

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

  option[value=""] {
    color: ${({ theme }) => theme.text.tertiary};
  }

  option {
    padding: ${({ theme }) => theme.spacing.sm};
    background: ${({ theme }) => theme.background.primary};
    color: ${({ theme }) => theme.text.primary};
  }
`;

export const SelectArrow = styled.span<{ $disabled?: boolean }>`
  position: absolute;
  right: ${({ theme }) => theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${({ $disabled, theme }) =>
    $disabled ? theme.text.tertiary : theme.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  ${SelectField}:focus + & {
    color: ${({ theme }) => theme.primaryColors["500"]};
  }
`;

export const InputError = styled.span`
  color: ${({ theme }) => theme.errorColors["500"]};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const FileDropzoneContainer = styled.div`
  width: 100%;
`;

export const FileInput = styled.input`
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const DropzoneContent = styled.div`
  pointer-events: none;
`;

export const DropzoneError = styled.div`
  color: ${({ theme }) => theme.errorColors["500"]};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  margin-top: ${({ theme }) => theme.spacing.sm};
  text-align: center;
`;

export const CameraContainer = styled.div`
  border: 2px dashed ${({ theme }) => theme.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
  background-color: ${({ theme }) => theme.background.primary};
  position: relative;
  overflow: hidden;
`;

export const CameraVideo = styled.video`
  width: 100%;
  max-width: 400px;
  height: 300px;
  background-color: ${({ theme }) => theme.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  object-fit: cover;

  @media (max-width: 480px) {
    height: 250px;
    max-width: 100%;
  }
`;

export const CameraControls = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const CameraButtonContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  display: flex;
  justify-content: center;
`;

export const CameraButton = styled.button<{
  $variant?: "primary" | "secondary";
}>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid
    ${({ $variant, theme }) =>
      $variant === "primary"
        ? theme.primaryColors["500"]
        : theme.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ $variant, theme }) =>
    $variant === "primary" ? theme.primaryColors["500"] : "transparent"};
  color: ${({ $variant, theme }) =>
    $variant === "primary" ? theme.text.primary : theme.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover:not(:disabled) {
    background-color: ${({ $variant, theme }) =>
      $variant === "primary"
        ? theme.primaryColors["600"]
        : theme.background.secondary};
    border-color: ${({ $variant, theme }) =>
      $variant === "primary"
        ? theme.primaryColors["600"]
        : theme.secondaryColors["600"]};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px
      ${({ $variant, theme }) =>
        $variant === "primary"
          ? theme.primaryColors["100"]
          : theme.border.default};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const CameraIcon = styled.span`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 480px) {
    width: 18px;
    height: 18px;
  }
`;

export const CaptureIcon = styled.span`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
  }
`;

// Add these mobile styles to File 4: /frontend/src/components/Forms/styles.ts

export const DropzoneArea = styled.div<{
  isDragging?: boolean;
  disabled?: boolean;
}>`
  border: 2px dashed ${({ theme }) => theme.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
  background-color: ${({ theme }) => theme.background.primary};

  ${({ disabled, theme }) =>
    !disabled &&
    css`
      &:hover {
        border-color: ${theme.primaryColors["500"]};
        background-color: ${theme.background.secondary};
      }
    `}

  ${({ isDragging, theme }) =>
    isDragging &&
    css`
      border-color: ${theme.primaryColors["500"]};
      background-color: ${theme.primaryColors["50"]};
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
    `}

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const DropzoneIcon = styled.svg`
  width: 48px;
  height: 48px;
  color: ${({ theme }) => theme.text.tertiary};
  margin: 0 auto ${({ theme }) => theme.spacing.md};

  ${DropzoneArea}:hover &, ${DropzoneArea}[data-dragging="true"] & {
    color: ${({ theme }) => theme.primaryColors["500"]};
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    margin: 0 auto ${({ theme }) => theme.spacing.sm};
  }
`;

export const DropzoneText = styled.p`
  color: ${({ theme }) => theme.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin: 0;
  word-break: break-word;

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

export const DropzoneHint = styled.p`
  color: ${({ theme }) => theme.text.tertiary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  margin: ${({ theme }) => theme.spacing.xs} 0 0 0;
  word-break: break-word;

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;
