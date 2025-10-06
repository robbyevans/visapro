import styled from "styled-components";

export const NavbarContainer = styled.nav`
  background: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
  color: #111827;
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
  color: #6b7280;
  font-weight: 500;
  transition: color 0.2s ease;
  padding: 8px 0;
  position: relative;

  &:hover {
    color: #374151;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #3b82f6;
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

export const UserGreeting = styled.span`
  color: #6b7280;
  font-size: 14px;
`;

export const UserRole = styled.span`
  background-color: #f3f4f6;
  color: #6b7280;
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
    background-color: #374151;
    transition: all 0.3s ease;
  }
`;

export const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (min-width: 769px) {
    display: none;
  }
`;

export const MobileNavLink = styled.a`
  padding: 16px 24px;
  text-decoration: none;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f9fafb;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const MobileSignOut = styled.button`
  padding: 16px 24px;
  background: none;
  border: none;
  text-align: left;
  color: #ef4444;
  border-bottom: 1px solid #f3f4f6;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #fef2f2;
  }
`;
