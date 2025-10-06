// File 1: /frontend/src/components/Forms/Select.tsx

import React from "react";
import * as S from "./styles";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  required = false,
  disabled = false,
  error,
}) => {
  return (
    <S.SelectContainer>
      {label && (
        <S.InputLabel>
          {label}
          {required && <S.Required>*</S.Required>}
        </S.InputLabel>
      )}
      <S.SelectWrapper>
        <S.SelectField
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
          $hasError={!!error}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </S.SelectField>
        <S.SelectArrow $disabled={disabled}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M6 9l6 6 6-6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </S.SelectArrow>
      </S.SelectWrapper>
      {error && <S.InputError>{error}</S.InputError>}
    </S.SelectContainer>
  );
};

export default Select;
