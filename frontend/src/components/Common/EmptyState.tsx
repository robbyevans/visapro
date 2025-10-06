import React from "react";
import * as S from "./styles";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
}) => {
  return (
    <S.EmptyStateContainer>
      {icon && <S.EmptyStateIcon>{icon}</S.EmptyStateIcon>}
      <S.EmptyStateTitle>{title}</S.EmptyStateTitle>
      {description && (
        <S.EmptyStateDescription>{description}</S.EmptyStateDescription>
      )}
      {action && <S.EmptyStateAction>{action}</S.EmptyStateAction>}
    </S.EmptyStateContainer>
  );
};

export default EmptyState;
