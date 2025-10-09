import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const drawCircle = keyframes`
  0% {
    stroke-dashoffset: 151;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

const drawCheck = keyframes`
  0% {
    stroke-dashoffset: 36;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

const progressShrink = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const ModalContainer = styled.div`
  background: ${({ theme }) => theme.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius["2xl"]};
  padding: ${({ theme }) => theme.spacing["2xl"]};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  max-width: 400px;
  width: 100%;
  position: relative;
  animation: ${slideIn} 0.4s ease-out;
  border: 1px solid ${({ theme }) => theme.border.light};
`;

export const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Checkmark = styled.svg`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: ${({ theme }) => theme.successColors["500"]};
  stroke-miterlimit: 10;
  filter: drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3));
`;

export const CheckmarkCircle = styled.circle`
  stroke-dasharray: 151;
  stroke-dashoffset: 151;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: ${({ theme }) => theme.successColors["500"]};
  fill: none;
  animation: ${drawCircle} 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
`;

export const CheckmarkCheck = styled.path`
  transform-origin: 50% 50%;
  stroke-dasharray: 36;
  stroke-dashoffset: 36;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  animation: ${drawCheck} 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
`;

export const ModalContent = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const ModalTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`;

export const ModalMessage = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.text.secondary};
  line-height: 1.5;
  margin: 0;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  color: ${({ theme }) => theme.text.secondary};
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.background.secondary};
    color: ${({ theme }) => theme.text.primary};
  }
`;

export const CloseIcon = styled.span`
  line-height: 1;
  margin-top: -2px;
`;

export const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: ${({ theme }) => theme.border.light};
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius["2xl"]};
  border-bottom-right-radius: ${({ theme }) => theme.borderRadius["2xl"]};
  overflow: hidden;
`;

interface ProgressFillProps {
  autoCloseDelay: number;
}

export const ProgressFill = styled.div<ProgressFillProps>`
  height: 100%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.successColors["400"]} 0%,
    ${({ theme }) => theme.successColors["500"]} 50%,
    ${({ theme }) => theme.successColors["600"]} 100%
  );
  animation: ${progressShrink} ${({ autoCloseDelay }) => autoCloseDelay}ms
    linear forwards;
`;
