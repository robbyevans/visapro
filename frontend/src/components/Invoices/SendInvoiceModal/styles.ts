import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1200;
`;

export const Modal = styled.div`
  width: 900px;
  background: ${({ theme }) => theme.background.primary};
  border-radius: 12px;
  padding: 20px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

export const Body = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 20px;
`;

export const LeftPanel = styled.div`
  flex: 1;
`;

export const RightPanel = styled.div`
  flex: 1;
  border-left: 1px solid ${({ theme }) => theme.border.light};
  padding-left: 16px;
`;

export const Label = styled.label`
  font-weight: 600;
  margin-bottom: 4px;
  display: block;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 12px;
  border: 1px solid ${({ theme }) => theme.border.light};
`;

export const PrimaryButton = styled.button`
  width: 100%;
  padding: 12px;
  background: ${({ theme }) => theme.primaryColors[500]};
  border: none;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 8px;
`;

export const CheckRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px 0;
`;

export const PreviewTitle = styled.div`
  font-weight: 600;
  margin-bottom: 8px;
`;

export const PreviewBox = styled.div`
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid ${({ theme }) => theme.border.light};
  border-radius: 8px;
  padding: 12px;
`;
