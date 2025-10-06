import React, { useState } from "react";
import * as S from "./styles";

interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Determine the actual input type
  const getInputType = () => {
    if (type !== "password") return type;
    return isPasswordVisible ? "text" : "password";
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <S.InputContainer>
      <S.InputLabel>
        {label}
        {required && " *"}
      </S.InputLabel>
      <S.InputWrapper>
        <S.StyledInput
          type={getInputType()}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          $hasError={!!error}
          $isPassword={type === "password"}
        />
        {type === "password" && (
          <S.PasswordToggle
            type="button"
            onClick={togglePasswordVisibility}
            disabled={disabled}
          >
            {isPasswordVisible ? (
              <S.EyeIcon>👁️</S.EyeIcon>
            ) : (
              <S.EyeSlashIcon>🙈</S.EyeSlashIcon>
            )}
          </S.PasswordToggle>
        )}
      </S.InputWrapper>
      {error && <S.InputError>{error}</S.InputError>}
    </S.InputContainer>
  );
};

export default Input;
