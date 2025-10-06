import React from "react";
import * as S from "./styles";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = "md", className = "" }) => {
  return <S.SpinnerContainer size={size} className={className} />;
};

export default Spinner;
