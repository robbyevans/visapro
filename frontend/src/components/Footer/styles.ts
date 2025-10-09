import styled from "styled-components";
import { STATIC_COLORS } from "../../styles";

export const FooterContainer = styled.footer`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.neutralColors["900"]} 0%,
    ${({ theme }) => theme.neutralColors["800"]} 100%
  );
  color: ${({ theme }) => theme.text.inverse};
  padding: 80px 0 0;
  transition: background 0.3s ease;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

export const FooterMain = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
  padding-bottom: 60px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 60px;
  }
`;

export const FooterBrand = styled.div`
  max-width: 300px;
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.primaryColors["500"]};
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

export const LogoImage = styled.img`
  width: 300px;
  height: 300px;
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

export const BrandDescription = styled.p`
  color: ${STATIC_COLORS.base.white};
  opacity: 0.7;
  line-height: 1.6;
  margin-bottom: 24px;
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
`;

export const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.primaryColors["500"]}20;
    transform: translateY(-2px);
  }
`;

export const SocialIcon = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.text.inverse};
`;

export const FooterLinksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const FooterLinksColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LinksTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.primaryColors["500"]};
`;

export const FooterLink = styled.a`
  color: ${STATIC_COLORS.base.white};
  opacity: 0.7;
  text-decoration: none;
  padding: 8px 0;
  transition: all 0.3s ease;
  font-size: 14px;

  &:hover {
    color: ${({ theme }) => theme.primaryColors["500"]};
    opacity: 1;
  }
`;

export const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 32px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
`;

export const Copyright = styled.p`
  color: ${STATIC_COLORS.base.white};
  opacity: 0.5;
  font-size: 14px;
  margin: 0;
`;

export const BottomLinks = styled.div`
  display: flex;
  gap: 24px;
`;

export const BottomLink = styled.a`
  color: ${STATIC_COLORS.base.white};
  opacity: 0.5;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;
