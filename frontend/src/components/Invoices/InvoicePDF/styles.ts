import styled from "styled-components";

export const Container = styled.div`
  padding: 24px;
  font-family: Arial, sans-serif;
  color: ${({ theme }) => theme.text.primary};
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const Title = styled.h1`
  font-size: 32px;
  margin: 0;
`;

export const Label = styled.span`
  font-weight: 600;
`;

export const Section = styled.div`
  margin-top: 20px;
`;

export const Subtitle = styled.h3`
  margin-bottom: 6px;
`;

export const Table = styled.table`
  width: 100%;
  margin-top: 16px;
  border-collapse: collapse;
`;

export const Th = styled.th`
  text-align: left;
  padding: 10px 8px;
  border-bottom: 1px solid ${({ theme }) => theme.border.light};

  &.right {
    text-align: right;
  }
`;

export const Td = styled.td`
  padding: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.border.light};

  &.right {
    text-align: right;
  }
`;

export const TotalRow = styled.div`
  margin-top: 20px;
  font-size: 18px;
  text-align: right;
  font-weight: 600;
  padding-top: 8px;
  border-top: 2px solid ${({ theme }) => theme.border.light};
`;
