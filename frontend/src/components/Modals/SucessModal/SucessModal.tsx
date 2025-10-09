import React, { useEffect } from "react";
import * as S from "./styles";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  autoCloseDelay?: number;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title = "Success!",
  message = "Your application has been submitted successfully!",
  autoCloseDelay = 4000,
}) => {
  useEffect(() => {
    if (isOpen && autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoCloseDelay, onClose]);

  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.ModalContainer>
        <S.SuccessIcon>
          <S.Checkmark viewBox="0 0 52 52">
            <S.CheckmarkCircle cx="26" cy="26" r="25" fill="none" />
            <S.CheckmarkCheck fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </S.Checkmark>
        </S.SuccessIcon>

        <S.ModalContent>
          <S.ModalTitle>{title}</S.ModalTitle>
          <S.ModalMessage>{message}</S.ModalMessage>
        </S.ModalContent>

        <S.CloseButton onClick={onClose}>
          <S.CloseIcon>×</S.CloseIcon>
        </S.CloseButton>

        <S.ProgressBar>
          <S.ProgressFill autoCloseDelay={autoCloseDelay} />
        </S.ProgressBar>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default SuccessModal;
