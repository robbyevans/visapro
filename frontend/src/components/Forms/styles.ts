// File 6: /frontend/src/components/Forms/styles.ts

import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
`;

export const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 4px;
`;

export const Required = styled.span`
  color: #ef4444;
  margin-left: 4px;
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
  padding: 12px;
  padding-right: ${(props) => (props.$isPassword ? "40px" : "12px")};
  border: 1px solid ${(props) => (props.$hasError ? "#ef4444" : "#d1d5db")};
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s ease;
  background-color: white;
  color: #111827;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:disabled {
    background-color: #f9fafb;
    color: #6b7280;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #9ca3af;
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
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;

  &:hover {
    background-color: #f3f4f6;
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
  border: none;
`;

export const EyeSlashIcon = styled.span`
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
`;

// New Select-specific styles
export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
  width: 100%;
`;

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  /* Remove the red border - it was for debugging */
`;

export const SelectField = styled.select<{ $hasError?: boolean }>`
  width: 100%;
  padding: 12px 40px 12px 12px;
  border: 1px solid ${(props) => (props.$hasError ? "#ef4444" : "#d1d5db")};
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s ease;
  background-color: white;
  color: #111827;
  appearance: none;
  cursor: pointer;
  font-family: inherit;
  z-index: 1;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:disabled {
    background-color: #f9fafb;
    color: #6b7280;
    cursor: not-allowed;
  }

  /* Style for placeholder option */
  option[value=""] {
    color: #9ca3af;
  }

  /* Basic option styling - limited browser support */
  option {
    padding: 8px;
    background: white;
    color: #111827;
  }
`;

export const SelectArrow = styled.span<{ $disabled?: boolean }>`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${(props) => (props.$disabled ? "#9ca3af" : "#6b7280")};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  ${SelectField}:focus + & {
    color: #3b82f6;
  }
`;

export const InputError = styled.span`
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
`;
// File Dropzone Styles
export const FileDropzoneContainer = styled.div`
  width: 100%;
`;

export const DropzoneArea = styled.div<{
  isDragging?: boolean;
  disabled?: boolean;
}>`
  border: 2px dashed #d1d5db;
  border-radius: 6px;
  padding: 32px;
  text-align: center;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;

  ${(props) =>
    !props.disabled &&
    `
    &:hover {
      border-color: #3b82f6;
      background-color: #f8fafc;
    }
  `}

  ${(props) =>
    props.isDragging &&
    `
    border-color: #3b82f6;
    background-color: #eff6ff;
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
  color: #9ca3af;
  margin: 0 auto 12px;

  ${DropzoneArea}:hover &, ${DropzoneArea}[data-dragging="true"] & {
    color: #3b82f6;
  }
`;

export const DropzoneText = styled.p`
  color: #6b7280;
  font-size: 14px;
  margin: 0;
`;

export const DropzoneError = styled.div`
  color: #ef4444;
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
`;
