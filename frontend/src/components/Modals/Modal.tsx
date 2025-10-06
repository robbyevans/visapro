import React from "react";
import * as S from "./styles";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) => {
  if (!isOpen) return null;

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContainer size={size} onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          {title && <S.ModalTitle>{title}</S.ModalTitle>}
          <S.ModalClose onClick={onClose}>×</S.ModalClose>
        </S.ModalHeader>
        <S.ModalContent>{children}</S.ModalContent>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default Modal;
