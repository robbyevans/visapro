import React from "react";
import * as S from "./styles";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
}) => {
  return (
    <S.Button
      type={type}
      variant={variant}
      size={size}
      loading={loading}
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
    >
      {children}
    </S.Button>
  );
};

export default Button;
