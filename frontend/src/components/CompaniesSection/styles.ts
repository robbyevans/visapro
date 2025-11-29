import styled from "styled-components";

export const CompaniesSection = styled.section`
  padding: 80px 0;
  background: ${({ theme }) => theme.background.primary};
  transition: background-color 0.3s ease;
  border-top: 1px solid ${({ theme }) => theme.border.light};
  border-bottom: 1px solid ${({ theme }) => theme.border.light};

  @media (max-width: 768px) {
    padding: 60px 0;
  }

  @media (max-width: 480px) {
    padding: 48px 0;
  }
`;

export const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;

export const SectionHeader = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto 60px;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }

  @media (max-width: 480px) {
    margin-bottom: 32px;
  }
`;

export const SectionPreTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.secondaryColors["500"]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 12px;
`;

export const SectionTitle = styled.h2`
  font-size: 42px;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
    margin-bottom: 12px;
  }
`;

export const SectionSubtitle = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.text.secondary};
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
    line-height: 1.5;
  }
`;

export const CompaniesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 40px;
  align-items: center;
  justify-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
`;

export const CompanyLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  padding: 16px;
  background: ${({ theme }) => theme.background.secondary};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border.light};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ theme }) => theme.primaryColors["200"]};
    background: ${({ theme }) => theme.background.primary};
  }

  @media (max-width: 768px) {
    height: 70px;
    padding: 12px;
  }

  @media (max-width: 480px) {
    height: 60px;
    padding: 10px;
    border-radius: 8px;
  }
`;

export const CompanyLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: inherit;
`;

export const CompanyLogo = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  opacity: 0.7;
  transition: all 0.3s ease;

  ${CompanyLogoContainer}:hover &, 
  ${CompanyLink}:hover & {
    filter: grayscale(0%);
    opacity: 1;
  }

  @media (max-width: 768px) {
    filter: grayscale(0%);
    opacity: 0.8;

    ${CompanyLogoContainer}:hover &, 
    ${CompanyLink}:hover & {
      opacity: 1;
    }
  }
`;
