import React from "react";
import { Link } from "react-router-dom";
import * as S from "./styles";
import Logo from "../../assets/TrackPassLogo.png";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Testimonials", href: "#testimonials" },
      { name: "FAQ", href: "#faq" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
      { name: "Partners", href: "/partners" },
    ],
    resources: [
      { name: "Documentation", href: "/docs" },
      { name: "Support", href: "/support" },
      { name: "Blog", href: "/blog" },
      { name: "Status", href: "/status" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR", href: "/gdpr" },
    ],
  };

  return (
    <S.FooterContainer>
      <S.FooterContent>
        <S.FooterMain>
          <S.FooterBrand>
            <S.Logo>
              <S.LogoImage src={Logo} />
              TrackPass
            </S.Logo>
            <S.BrandDescription>
              Empowering Kenyan athletes to compete globally with streamlined
              visa solutions and dedicated support.
            </S.BrandDescription>
            <S.SocialLinks>
              <S.SocialLink href="#" aria-label="Twitter">
                <S.SocialIcon>🐦</S.SocialIcon>
              </S.SocialLink>
              <S.SocialLink href="#" aria-label="Facebook">
                <S.SocialIcon>📘</S.SocialIcon>
              </S.SocialLink>
              <S.SocialLink href="#" aria-label="Instagram">
                <S.SocialIcon>📷</S.SocialIcon>
              </S.SocialLink>
              <S.SocialLink href="#" aria-label="LinkedIn">
                <S.SocialIcon>💼</S.SocialIcon>
              </S.SocialLink>
            </S.SocialLinks>
          </S.FooterBrand>

          <S.FooterLinksGrid>
            <S.FooterLinksColumn>
              <S.LinksTitle>Product</S.LinksTitle>
              {footerLinks.product.map((link) => (
                <S.FooterLink key={link.name} href={link.href}>
                  {link.name}
                </S.FooterLink>
              ))}
            </S.FooterLinksColumn>

            <S.FooterLinksColumn>
              <S.LinksTitle>Company</S.LinksTitle>
              {footerLinks.company.map((link) => (
                <S.FooterLink key={link.name} as={Link} to={link.href}>
                  {link.name}
                </S.FooterLink>
              ))}
            </S.FooterLinksColumn>

            <S.FooterLinksColumn>
              <S.LinksTitle>Resources</S.LinksTitle>
              {footerLinks.resources.map((link) => (
                <S.FooterLink key={link.name} as={Link} to={link.href}>
                  {link.name}
                </S.FooterLink>
              ))}
            </S.FooterLinksColumn>

            <S.FooterLinksColumn>
              <S.LinksTitle>Legal</S.LinksTitle>
              {footerLinks.legal.map((link) => (
                <S.FooterLink key={link.name} as={Link} to={link.href}>
                  {link.name}
                </S.FooterLink>
              ))}
            </S.FooterLinksColumn>
          </S.FooterLinksGrid>
        </S.FooterMain>

        <S.FooterBottom>
          <S.Copyright>
            © {currentYear} TrackPass. All rights reserved.
          </S.Copyright>
          <S.BottomLinks>
            <S.BottomLink href="#">Privacy</S.BottomLink>
            <S.BottomLink href="#">Terms</S.BottomLink>
            <S.BottomLink href="#">Sitemap</S.BottomLink>
          </S.BottomLinks>
        </S.FooterBottom>
      </S.FooterContent>
    </S.FooterContainer>
  );
};

export default Footer;
