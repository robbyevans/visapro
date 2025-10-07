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
  max-width: 100%;
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

// New Theme Toggle Styles
export const ThemeToggleContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
  cursor: pointer;
`;

export const ThemeToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${({ theme }) => theme.primaryColors["500"]};
  }

  &:checked + span:before {
    transform: translateX(30px);
  }

  &:checked + span .sun {
    opacity: 0;
    transform: translateX(-20px);
  }

  &:checked + span .moon {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const ThemeToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.neutralColors["300"]};
  transition: all 0.4s ease;
  border-radius: 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;

  &:before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: transform 0.4s ease;
    border-radius: 50%;
    z-index: 2;
  }
`;

export const ThemeIcon = styled.span`
  font-size: 14px;
  transition: all 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;

  &.sun {
    opacity: 1;
    transform: translateX(0);
  }

  &.moon {
    opacity: 0;
    transform: translateX(20px);
  }

  ${ThemeToggleInput}:checked + ${ThemeToggleSlider} & {
    &.sun {
      opacity: 0;
      transform: translateX(-20px);
    }

    &.moon {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const UserGreeting = styled.span`
  color: ${({ theme }) => theme.text.secondary};
  font-size: 14px;
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
