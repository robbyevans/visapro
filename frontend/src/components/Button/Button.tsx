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
  pulsating?: boolean;
  textColor?: string;
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
  pulsating = false,
  textColor,
}) => {
  return (
    <S.Button
      type={type}
      variant={variant}
      size={size}
      // FIX: Convert boolean props to strings or use conditional rendering
      data-loading={loading ? "true" : "false"}
      data-pulsating={pulsating ? "true" : "false"}
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
      textColor={textColor}
    >
      {children}
    </S.Button>
  );
};

export default Button;
