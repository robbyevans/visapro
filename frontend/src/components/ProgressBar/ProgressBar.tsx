import React from "react";
import * as S from "./styles";

interface ProgressBarProps {
  percentage: number;
  status: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, status }) => {
  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <S.ProgressBarContainer>
      <S.ProgressHeader>
        <S.ProgressTitle>
          Application Status: {formatStatus(status)}
        </S.ProgressTitle>
        <S.ProgressPercentage>
          {Math.round(percentage)}% Complete
        </S.ProgressPercentage>
      </S.ProgressHeader>

      <S.ProgressBarWrapper>
        <S.ProgressBarFill progress={percentage} />
      </S.ProgressBarWrapper>
    </S.ProgressBarContainer>
  );
};

export default ProgressBar;
