// /frontend/src/components/Invoices/SendInvoiceModal/styles.ts
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
  width: 920px;
  max-width: calc(100% - 32px);
  background: ${({ theme }) => theme.background.primary};
  border-radius: 12px;
  padding: 18px;
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
  font-size: 22px;
  cursor: pointer;
`;

export const Body = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 12px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const LeftPanel = styled.div`
  flex: 1;
  min-width: 280px;
`;

export const RightPanel = styled.div`
  flex: 1;
  border-left: 1px solid ${({ theme }) => theme.border.light};
  padding-left: 16px;
  min-width: 320px;
`;

export const Label = styled.label`
  font-weight: 600;
  margin-bottom: 6px;
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
  width: 140px;
  padding: 10px 12px;
  background: ${({ theme }) => theme.primaryColors[500]};
  border: none;
  color: white;
  border-radius: 8px;
  cursor: pointer;
`;

export const SecondaryButton = styled.button`
  width: 120px;
  padding: 10px 12px;
  background: ${({ theme }) => theme.background.secondary};
  border: 1px solid ${({ theme }) => theme.border.light};
  border-radius: 8px;
  cursor: pointer;
`;

export const CheckRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

export const PreviewTitle = styled.div`
  font-weight: 600;
  margin-bottom: 8px;
`;

export const PreviewBox = styled.div`
  max-height: 480px;
  overflow: auto;
  border: 1px solid ${({ theme }) => theme.border.light};
  border-radius: 8px;
  padding: 12px;
  background: ${({ theme }) => theme.background.secondary};
`;

export const HelpText = styled.div<{ small?: boolean }>`
  color: ${({ theme }) => theme.text.secondary};
  font-size: ${({ small }) => (small ? "12px" : "13px")};
  margin-bottom: 12px;
`;

export const ButtonRow = styled.div`
  margin-top: 6px;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;
