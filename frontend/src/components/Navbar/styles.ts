import styled from "styled-components";

export const NavbarContainer = styled.nav`
  background: ${({ theme }) => theme.background.primary};
  border-bottom: 1px solid ${({ theme }) => theme.border.light};
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

export const NavbarContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 64px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
`;

export const BrandLink = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: inherit;
`;

export const BrandLogo = styled.img`
  height: 32px;
  width: 32px;
`;

export const BrandText = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};
  transition: color 0.3s ease;
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.text.secondary};
  font-weight: 500;
  transition: all 0.2s ease;
  padding: 8px 0;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.text.primary};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.primaryColors["500"]};
    transition: width 0.2s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ThemeToggleButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;

  &:hover {
    background-color: ${({ theme }) => theme.background.secondary};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const UserGreeting = styled.span`
  color: ${({ theme }) => theme.text.secondary};
  font-size: 14px;
`;

export const UserRole = styled.span`
  background-color: ${({ theme }) => theme.background.secondary};
  color: ${({ theme }) => theme.text.secondary};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
`;

export const AuthSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const MobileMenuToggle = styled.button`
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;

  @media (max-width: 768px) {
    display: flex;
  }

  span {
    width: 20px;
    height: 2px;
    background-color: ${({ theme }) => theme.text.primary};
    transition: all 0.3s ease;
  }
`;

// FIX: Use $ prefix for transient prop to prevent DOM warning
export const MobileMenu = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.background.primary};
  border-bottom: 1px solid ${({ theme }) => theme.border.light};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: background-color 0.3s ease, border-color 0.3s ease;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const MobileNavLink = styled.a`
  padding: 16px 24px;
  text-decoration: none;
  color: ${({ theme }) => theme.text.primary};
  border-bottom: 1px solid ${({ theme }) => theme.border.light};
  transition: background-color 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.background.secondary};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const MobileThemeToggle = styled.button`
  padding: 16px 24px;
  background: none;
  border: none;
  text-align: left;
  color: ${({ theme }) => theme.text.primary};
  border-bottom: 1px solid ${({ theme }) => theme.border.light};
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;

  &:hover {
    background-color: ${({ theme }) => theme.background.secondary};
  }
`;

export const MobileSignOut = styled.button`
  padding: 16px 24px;
  background: none;
  border: none;
  text-align: left;
  color: ${({ theme }) => theme.errorColors["500"]};
  border-bottom: 1px solid ${({ theme }) => theme.border.light};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.errorColors["50"]};
  }
`;
