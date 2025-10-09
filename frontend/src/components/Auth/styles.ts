import styled from "styled-components";

export const AuthFormContainer = styled.div`
  background: ${({ theme }) => theme.background.primary};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid ${({ theme }) => theme.border.light};
`;

export const AuthTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.text.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const AuthError = styled.div`
  background-color: ${({ theme }) => theme.errorColors["50"]};
  border: 1px solid ${({ theme }) => theme.errorColors["200"]};
  color: ${({ theme }) => theme.errorColors["700"]};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const AuthMessage = styled.div<{ type: "success" | "error" }>`
  background-color: ${({ theme, type }) =>
    type === "success" ? theme.successColors["50"] : theme.errorColors["50"]};
  border: 1px solid
    ${({ theme, type }) =>
      type === "success"
        ? theme.successColors["200"]
        : theme.errorColors["200"]};
  color: ${({ theme, type }) =>
    type === "success" ? theme.successColors["700"] : theme.errorColors["700"]};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const AuthFooter = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

export const AuthFooterText = styled.p`
  color: ${({ theme }) => theme.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const AuthLink = styled.a`
  background: none;
  border: 0px solid black;
  color: ${({ theme }) => theme.primaryColors["500"]};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-decoration: underline;
  transition: color 0.2s ease;
  margin-left: 10px;

  &:hover {
    color: ${({ theme }) => theme.primaryColors["600"]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const NativeSelect = styled.select<{ $hasError?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.errorColors["500"] : theme.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  transition: all 0.2s ease;
  background-color: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.primary};
  cursor: pointer;

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
`;

export const InputLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const PhoneInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const PhoneInputGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: stretch;
`;

export const CountrySelect = styled.select`
  flex: 0 0 180px;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  transition: all 0.2s ease;
  background-color: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.primary};
  cursor: pointer;
  max-width: 200px;

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
`;

export const PhoneNumberInput = styled.input<{ $hasDialCode: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
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
`;

export const PhoneHelpText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.text.secondary};
  margin: ${({ theme }) => theme.spacing.xs} 0 0 0;
`;
