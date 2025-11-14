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
  margin: 0 0 4px 0;
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

export const SectionTitle = styled.h3`
  margin: 0 0 8px 0;
`;

export const HelpText = styled.div`
  color: ${({ theme }) => theme.text.secondary};
  font-size: 13px;
  margin-bottom: 12px;
`;

export const Table = styled.table`
  width: 100%;
  margin-top: 8px;
  border-collapse: collapse;
`;

export const Th = styled.th`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid ${({ theme }) => theme.border.light};
`;

export const Td = styled.td<{ colSpan?: number }>`
  padding: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.border.light};
`;

export const Input = styled.input`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border.light};
  min-width: 120px;
`;

export const PrimaryButton = styled.button`
  background: ${({ theme }) => theme.primaryColors[500]};
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled.button`
  background: ${({ theme }) => theme.background.secondary};
  border: 1px solid ${({ theme }) => theme.border.light};
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
`;

export const StepPill = styled.div`
  background: ${({ theme }) => theme.neutralColors["200"]};
  color: ${({ theme }) => theme.text.primary};
  padding: 6px 10px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 13px;
`;

export const TitleSmall = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text.secondary};
`;

export const SectionFooter = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
`;

export const SectionSub = styled.div`
  color: ${({ theme }) => theme.text.secondary};
  font-size: 13px;
`;

export const Row = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;
  margin-bottom: 12px;
`;

export const BulkPriceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const PreviewBox = styled.div`
  border: 1px solid ${({ theme }) => theme.border.light};
  border-radius: 8px;
  padding: 12px;
  background: ${({ theme }) => theme.background.secondary};
`;

export const ThSmall = styled(Th)`
  width: 120px;
`;
