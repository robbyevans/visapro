import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${(props) => props.theme.spacing.lg};
`;

export const ModalContainer = styled.div<{ size?: "sm" | "md" | "lg" }>`
  background: ${(props) => props.theme.background.primary};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  box-shadow: ${(props) => props.theme.shadows.xl};
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.border.light};

  ${(props) => {
    switch (props.size) {
      case "sm":
        return "max-width: 400px;";
      case "lg":
        return "max-width: 800px;";
      default:
        return "max-width: 600px;";
    }
  }}
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.spacing.lg}
    ${(props) => props.theme.spacing.xl};
  border-bottom: 1px solid ${(props) => props.theme.border.light};
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: ${(props) => props.theme.typography.fontSize.xl};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  color: ${(props) => props.theme.text.primary};
`;

export const ModalClose = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${(props) => props.theme.text.secondary};
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  transition: all 0.2s ease;

  &:hover {
    color: ${(props) => props.theme.text.primary};
    background-color: ${(props) => props.theme.background.secondary};
  }
`;

export const ModalContent = styled.div`
  padding: ${(props) => props.theme.spacing.xl};
  overflow-y: auto;
  flex: 1;
`;
