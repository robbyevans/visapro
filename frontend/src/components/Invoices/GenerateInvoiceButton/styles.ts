import styled from "styled-components";

export const Button = styled.button`
  background: ${({ theme }) => theme.primaryColors?.[500] || "#2563eb"};
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;

  &:hover {
    opacity: 0.95;
  }
`;
