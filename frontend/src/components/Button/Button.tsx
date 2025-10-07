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
  textColor?: string; // <-- new optional prop
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
      loading={loading}
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
      pulsating={pulsating}
      textColor={textColor} // <-- pass it down
    >
      {children}
    </S.Button>
  );
};

export default Button;
