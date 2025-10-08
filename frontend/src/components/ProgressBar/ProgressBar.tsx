import React from "react";
import * as S from "./styles";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: {
    label: string;
    status: "completed" | "current" | "pending";
    description?: string;
  }[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  steps,
}) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <S.ProgressBarContainer>
      <S.ProgressHeader>
        <S.ProgressTitle>Application Progress</S.ProgressTitle>
        <S.ProgressPercentage>
          {Math.round(progressPercentage)}% Complete
        </S.ProgressPercentage>
      </S.ProgressHeader>

      <S.ProgressBarWrapper>
        <S.ProgressBarFill progress={progressPercentage} />
        <S.ProgressSteps>
          {steps.map((step, index) => (
            <S.ProgressStep key={index} status={step.status}>
              <S.StepDot status={step.status}>
                {step.status === "completed" && "✓"}
                {step.status === "current" && index + 1}
                {step.status === "pending" && index + 1}
              </S.StepDot>
              <S.StepInfo>
                <S.StepLabel>{step.label}</S.StepLabel>
                {step.description && (
                  <S.StepDescription>{step.description}</S.StepDescription>
                )}
              </S.StepInfo>
            </S.ProgressStep>
          ))}
        </S.ProgressSteps>
      </S.ProgressBarWrapper>
    </S.ProgressBarContainer>
  );
};

export default ProgressBar;
