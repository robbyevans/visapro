// File: /frontend/src/components/Auth/styles.ts

import styled from "styled-components";

export const AuthFormContainer = styled.div`
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

export const AuthTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  text-align: center;
  margin-bottom: 24px;
`;

export const AuthError = styled.div`
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626; /* Error text color */
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 16px;
  font-size: 14px;
`;

export const AuthFooter = styled.div`
  margin-top: 24px;
  text-align: center;
`;

export const AuthFooterText = styled.p`
  color: #6b7280; /* Footer text color */
  font-size: 14px;
`;

export const AuthLink = styled.button`
  background: none;
  border: none;
  color: #3b82f6;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;

  &:hover {
    color: #2563eb;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Add to your /frontend/src/components/Auth/styles.ts

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
`;

export const NativeSelect = styled.select<{ $hasError?: boolean }>`
  width: 100%;
  padding: 12px;
  border: 1px solid ${(props) => (props.$hasError ? "#ef4444" : "#d1d5db")};
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s ease;
  background-color: white;
  color: #111827;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 4px;
`;
