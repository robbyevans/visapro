import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.xs};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

export const InputLabel = styled.label`
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
  color: ${(props) => props.theme.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.xs};
`;

export const Required = styled.span`
  color: ${(props) => props.theme.error[500]};
  margin-left: ${(props) => props.theme.spacing.xs};
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
  padding: ${(props) => props.theme.spacing.md};
  padding-right: ${(props) =>
    props.$isPassword ? "40px" : props.theme.spacing.md};
  border: 1px solid
    ${(props) =>
      props.$hasError ? props.theme.error[500] : props.theme.border.default};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  transition: all 0.2s ease;
  background-color: ${(props) => props.theme.background.primary};
  color: ${(props) => props.theme.text.primary};
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary[500]};
    box-shadow: 0 0 0 3px ${(props) => props.theme.primary[100]};
  }

  &:disabled {
    background-color: ${(props) => props.theme.background.secondary};
    color: ${(props) => props.theme.text.tertiary};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${(props) => props.theme.text.tertiary};
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
  padding: ${(props) => props.theme.spacing.xs};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.text.secondary};

  &:hover {
    background-color: ${(props) => props.theme.background.secondary};
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
  gap: ${(props) => props.theme.spacing.xs};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.xs};
  margin-bottom: ${(props) => props.theme.spacing.md};
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
  padding: ${(props) => props.theme.spacing.md} 40px
    ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.md};
  border: 1px solid
    ${(props) =>
      props.$hasError ? props.theme.error[500] : props.theme.border.default};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  transition: all 0.2s ease;
  background-color: ${(props) => props.theme.background.primary};
  color: ${(props) => props.theme.text.primary};
  appearance: none;
  cursor: pointer;
  font-family: inherit;
  z-index: 1;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary[500]};
    box-shadow: 0 0 0 3px ${(props) => props.theme.primary[100]};
  }

  &:disabled {
    background-color: ${(props) => props.theme.background.secondary};
    color: ${(props) => props.theme.text.tertiary};
    cursor: not-allowed;
  }

  option[value=""] {
    color: ${(props) => props.theme.text.tertiary};
  }

  option {
    padding: ${(props) => props.theme.spacing.sm};
    background: ${(props) => props.theme.background.primary};
    color: ${(props) => props.theme.text.primary};
  }
`;

export const SelectArrow = styled.span<{ $disabled?: boolean }>`
  position: absolute;
  right: ${(props) => props.theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${(props) =>
    props.$disabled ? props.theme.text.tertiary : props.theme.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  ${SelectField}:focus + & {
    color: ${(props) => props.theme.primary[500]};
  }
`;

export const InputError = styled.span`
  color: ${(props) => props.theme.error[500]};
  font-size: ${(props) => props.theme.typography.fontSize.xs};
  margin-top: ${(props) => props.theme.spacing.xs};
`;

export const FileDropzoneContainer = styled.div`
  width: 100%;
`;

export const DropzoneArea = styled.div<{
  isDragging?: boolean;
  disabled?: boolean;
}>`
  border: 2px dashed ${(props) => props.theme.border.default};
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: ${(props) => props.theme.spacing.xl};
  text-align: center;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
  background-color: ${(props) => props.theme.background.primary};

  ${(props) =>
    !props.disabled &&
    `
    &:hover {
      border-color: ${props.theme.primary[500]};
      background-color: ${props.theme.background.secondary};
    }
  `}

  ${(props) =>
    props.isDragging &&
    `
    border-color: ${props.theme.primary[500]};
    background-color: ${props.theme.primary[50]};
  `}

  ${(props) =>
    props.disabled &&
    `
    opacity: 0.6;
    cursor: not-allowed;
  `}
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

export const DropzoneIcon = styled.svg`
  width: 48px;
  height: 48px;
  color: ${(props) => props.theme.text.tertiary};
  margin: 0 auto ${(props) => props.theme.spacing.md};

  ${DropzoneArea}:hover &, ${DropzoneArea}[data-dragging="true"] & {
    color: ${(props) => props.theme.primary[500]};
  }
`;

export const DropzoneText = styled.p`
  color: ${(props) => props.theme.text.secondary};
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  margin: 0;
`;

export const DropzoneError = styled.div`
  color: ${(props) => props.theme.error[500]};
  font-size: ${(props) => props.theme.typography.fontSize.xs};
  margin-top: ${(props) => props.theme.spacing.sm};
  text-align: center;
`;

export const DropzoneHint = styled.p`
  color: ${(props) => props.theme.text.tertiary};
  font-size: ${(props) => props.theme.typography.fontSize.xs};
  margin: ${(props) => props.theme.spacing.xs} 0 0 0;
`;
