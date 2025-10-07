import styled from "styled-components";

export const AuthPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primaryColors["500"]} 0%,
    ${({ theme }) => theme.secondaryColors["500"]} 100%
  );
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const AuthCard = styled.div`
  width: 100%;
  max-width: 440px;
`;
