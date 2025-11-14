// frontend/src/pages/Invoices/styles.ts
import styled from "styled-components";

export const Container = styled.div`
  max-width: 980px;
  margin: 24px auto;
  padding: 20px;
  border-radius: 12px;
  background: ${({ theme }) => theme.background.primary};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  margin: 0;
`;

export const Subtitle = styled.div`
  margin-top: 4px;
  color: ${({ theme }) => theme.text.secondary};
  font-size: 14px;
`;

export const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

export const Section = styled.div`
  margin-top: 16px;
`;

export const Table = styled.table`
  width: 100%;
  margin-top: 16px;
  border-collapse: collapse;
`;

export const Th = styled.th`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid ${({ theme }) => theme.border.light};
`;

export const Td = styled.td`
  padding: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.border.light};
`;

export const Input = styled.input`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border.light};
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border.light};
  min-height: 80px;
`;

export const PrimaryButton = styled.button`
  background: ${({ theme }) => theme.primaryColors[500]};
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
`;

export const SecondaryButton = styled.button`
  background: ${({ theme }) => theme.background.secondary};
  border: 1px solid ${({ theme }) => theme.border.light};
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
`;
