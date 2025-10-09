import styled from "styled-components";

export const NavbarContainer = styled.nav`
  background: ${({ theme }) => theme.background.primary};
  border-bottom: 1px solid ${({ theme }) => theme.border.light};
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all 0.3s ease;
`;

export const NavbarContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  height: 4rem;
  max-width: 100%;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
`;

export const BrandLink = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: inherit;
`;

export const BrandLogo = styled.img`
  height: 2rem;
  width: 2rem;
`;

export const BrandText = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};
  transition: color 0.3s ease;
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled.a<{ $isActive?: boolean }>`
  text-decoration: none;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.text.primary : theme.text.secondary};
  font-weight: 500;
  transition: all 0.2s ease;
  padding: 0.5rem 0;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.text.primary};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${({ $isActive }) => ($isActive ? "100%" : "0")};
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
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const AuthSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

// Theme Toggle Styles
export const ThemeToggleContainer = styled.label<{ $mobile?: boolean }>`
  position: relative;
  display: inline-flex;
  width: ${({ $mobile }) => ($mobile ? "4rem" : "3.75rem")};
  height: ${({ $mobile }) => ($mobile ? "2rem" : "1.875rem")};
  cursor: pointer;
  align-items: center;
`;

export const ThemeToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;

  &:checked + span {
    background-color: ${({ theme }) => theme.primaryColors["500"]};
  }

  &:checked + span:before {
    transform: translateX(1.5rem);
  }
`;

// Styled Components
// ThemeToggleSlider — use the prop ($isDarkMode) to control which icon shows
export const ThemeToggleSlider = styled.span<{ $isDarkMode: boolean }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #283d5fff;
  transition: background-color 0.4s ease, box-shadow 0.25s ease;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;

  /* subtle depth on the track so the knob reads as 'above' */
  box-shadow: inset 0 3px 0 rgba(255, 255, 255, 0.06);

  &:before {
    position: absolute;
    content: "";
    height: 1.375rem;
    width: 1.375rem;
    left: ${({ $isDarkMode }) => ($isDarkMode ? "0.8rem" : "0.25rem")};
    bottom: 0.25rem;
    background-color: white;
    transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55),
      box-shadow 0.25s ease;
    border-radius: 50%;
    /* raise above icons */
    z-index: 3;
    transform: ${({ $isDarkMode }) =>
      $isDarkMode ? "translateX(1.5rem)" : "translateX(0)"};

    /* raised knob shadow */
    box-shadow: 0 6px 14px rgba(16, 24, 40, 0.12),
      /* soft ambient shadow */ 0 2px 4px rgba(16, 24, 40, 0.08); /* smaller contact shadow */
  }

  /* Sun icon - visible when dark mode is ON (shows sun to indicate switching to light) */
  .sun {
    opacity: ${({ $isDarkMode }) => ($isDarkMode ? "1" : "0")};
    display: ${({ $isDarkMode }) => ($isDarkMode ? "block" : "none")};
    transform: ${({ $isDarkMode }) =>
      $isDarkMode ? "translateX(0.1rem) scale(1.5)" : "translateX(0) scale(1)"};
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    z-index: 1;
  }

  /* Moon icon - visible when dark mode is OFF (shows moon to indicate switching to dark) */
  .moon {
    /* keep it in the layout so we can animate opacity/transform */
    display: block;
    opacity: ${({ $isDarkMode }) => ($isDarkMode ? "0" : "1")};
    visibility: ${({ $isDarkMode }) => ($isDarkMode ? "hidden" : "visible")};
    pointer-events: ${({ $isDarkMode }) => ($isDarkMode ? "none" : "auto")};

    /* combine translate + scale + rotate in the same transform */
    transform: ${({ $isDarkMode }) =>
      $isDarkMode
        ? "translateX(0) scale(0) rotate(-14deg)"
        : "translateX(1.7rem) scale(1.25) rotate(5deg)"};

    transition: opacity 0.35s ease,
      transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55),
      visibility 0.35s ease;
    z-index: 1;
  }
`;

export const ThemeIcon = styled.span`
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  z-index: 1;
`;

// User Menu Styles
export const UserMenuContainer = styled.div`
  position: relative;
`;

export const UserMenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.background.secondary};
  }
`;

export const UserAvatar = styled.div<{ $large?: boolean }>`
  width: ${({ $large }) => ($large ? "3rem" : "2rem")};
  height: ${({ $large }) => ($large ? "3rem" : "2rem")};
  border-radius: 50%;
  background: ${({ theme }) => theme.primaryColors["500"]};
  color: ${({ theme }) => theme.text.inverse};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: ${({ $large }) => ($large ? "1.25rem" : "0.875rem")};
`;

export const UserGreeting = styled.span`
  color: ${({ theme }) => theme.text.secondary};
  font-size: 0.875rem;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const UserMenuArrow = styled.span<{ $isOpen: boolean }>`
  font-size: 0.625rem;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0)")};
  transition: transform 0.2s ease;
`;

export const UserDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${({ theme }) => theme.background.primary};
  border: 1px solid ${({ theme }) => theme.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  min-width: 12rem;
  margin-top: 0.5rem;
  z-index: 1000;
  overflow: hidden;
`;

export const UserDropdownItem = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  color: ${({ theme }) => theme.text.primary};
  transition: background-color 0.2s ease;
  font-size: 0.875rem;

  &:hover {
    background-color: ${({ theme }) => theme.background.secondary};
  }
`;

export const UserDropdownDivider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.border.light};
  margin: 0.25rem 0;
`;

// Mobile Styles
export const MobileMenuToggle = styled.button<{ $isOpen: boolean }>`
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;

  @media (max-width: 768px) {
    display: flex;
  }

  span {
    width: 1.25rem;
    height: 2px;
    background-color: ${({ theme }) => theme.text.primary};
    transition: all 0.3s ease;
    transform-origin: center;

    &:nth-child(1) {
      transform: ${({ $isOpen }) =>
        $isOpen ? "rotate(45deg) translate(3px, 3px)" : "none"};
    }

    &:nth-child(2) {
      opacity: ${({ $isOpen }) => ($isOpen ? "0" : "1")};
    }

    &:nth-child(3) {
      transform: ${({ $isOpen }) =>
        $isOpen ? "rotate(-45deg) translate(6px, -6px)" : "none"};
    }
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
  max-height: calc(100vh - 4rem);
  overflow-y: auto;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const MobileMenuHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.border.light};
  background: ${({ theme }) => theme.background.secondary};
`;

export const MobileUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const MobileUserName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
  font-size: 1rem;
`;

export const MobileUserRole = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text.secondary};
  margin-top: 0.25rem;
`;

export const MobileNavSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MobileNavLink = styled.a<{ $isActive?: boolean }>`
  padding: 1rem 1.5rem;
  text-decoration: none;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.primaryColors["500"] : theme.text.primary};
  border-bottom: 1px solid ${({ theme }) => theme.border.light};
  transition: all 0.2s ease;
  cursor: pointer;
  font-weight: ${({ $isActive }) => ($isActive ? "600" : "400")};
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.primaryColors["50"] : "transparent"};
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    background-color: ${({ theme, $isActive }) =>
      $isActive ? theme.primaryColors["100"] : theme.background.secondary};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const MobileMenuFooter = styled.div`
  margin-top: auto;
  border-top: 1px solid ${({ theme }) => theme.border.light};
`;

export const MobileThemeSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.border.light};
`;

export const MobileThemeLabel = styled.span`
  color: ${({ theme }) => theme.text.primary};
  font-weight: 500;
  font-size: 0.875rem;
`;

export const MobileSignOut = styled.button`
  width: 100%;
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  text-align: left;
  color: ${({ theme }) => theme.errorColors["500"]};
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    background-color: ${({ theme }) => theme.errorColors["50"]};
  }
`;
