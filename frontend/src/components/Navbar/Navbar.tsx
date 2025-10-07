// File 5: /frontend/src/components/Navbar/Navbar.tsx

import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../redux/hooks/useAuth";
import { useUser } from "../../redux/hooks/useUser";
import { useTheme } from "../../hooks/useTheme";
import Button from "../Button/Button";
import * as S from "./styles";

const Navbar: React.FC = () => {
  const { isAuthenticated, handleLogOut } = useAuth();
  const { currentUser } = useUser();
  const { themeMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSignOut = () => {
    handleLogOut();
    navigate("/");
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <S.NavbarContainer>
      <S.NavbarContent>
        <S.Brand>
          <Link to="/" style={{ textDecoration: "none" }}>
            <S.BrandLink>
              <S.BrandLogo src="/logo.svg" alt="Logo" />
              <S.BrandText>VisaPro</S.BrandText>
            </S.BrandLink>
          </Link>
        </S.Brand>

        {isAuthenticated ? (
          <>
            <S.NavLinks>
              <Link to="/dashboard">
                <S.NavLink $isActive={isActiveRoute("/dashboard")}>
                  Dashboard
                </S.NavLink>
              </Link>
              {currentUser?.role === "admin" && (
                <Link to="/admin/dashboard">
                  <S.NavLink $isActive={isActiveRoute("/admin/dashboard")}>
                    Admin
                  </S.NavLink>
                </Link>
              )}
            </S.NavLinks>

            <S.UserSection>
              <S.ThemeToggleContainer>
                <S.ThemeToggleInput
                  type="checkbox"
                  checked={themeMode === "dark"}
                  onChange={handleThemeToggle}
                />
                <S.ThemeToggleSlider>
                  <S.ThemeIcon className="sun">☀️</S.ThemeIcon>
                  <S.ThemeIcon className="moon">🌙</S.ThemeIcon>
                </S.ThemeToggleSlider>
              </S.ThemeToggleContainer>

              <S.UserMenuContainer>
                <S.UserMenuButton
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <S.UserAvatar>
                    {currentUser?.name?.charAt(0)?.toUpperCase() || "U"}
                  </S.UserAvatar>
                  <S.UserGreeting>Hello, {currentUser?.name}</S.UserGreeting>
                  <S.UserMenuArrow $isOpen={isUserMenuOpen}>▼</S.UserMenuArrow>
                </S.UserMenuButton>

                {isUserMenuOpen && (
                  <S.UserDropdown>
                    <S.UserDropdownItem
                      onClick={() => handleNavigation("/profile")}
                    >
                      👤 Profile
                    </S.UserDropdownItem>
                    <S.UserDropdownItem
                      onClick={() => handleNavigation("/settings")}
                    >
                      ⚙️ Settings
                    </S.UserDropdownItem>
                    <S.UserDropdownDivider />
                    <S.UserDropdownItem onClick={handleSignOut}>
                      🚪 Sign Out
                    </S.UserDropdownItem>
                  </S.UserDropdown>
                )}
              </S.UserMenuContainer>
            </S.UserSection>

            <S.MobileMenuToggle onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </S.MobileMenuToggle>
          </>
        ) : (
          <S.AuthSection>
            <S.ThemeToggleContainer>
              <S.ThemeToggleInput
                type="checkbox"
                checked={themeMode === "dark"}
                onChange={handleThemeToggle}
              />
              <S.ThemeToggleSlider>
                <S.ThemeIcon className="sun">☀️</S.ThemeIcon>
                <S.ThemeIcon className="moon">🌙</S.ThemeIcon>
              </S.ThemeToggleSlider>
            </S.ThemeToggleContainer>
            <Button
              onClick={() => handleNavigation("/login")}
              variant="primary"
            >
              Sign In
            </Button>
          </S.AuthSection>
        )}
      </S.NavbarContent>

      {isAuthenticated ? (
        <S.MobileMenu $isOpen={isMenuOpen}>
          <Link to="/dashboard">
            <S.MobileNavLink
              $isActive={isActiveRoute("/dashboard")}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </S.MobileNavLink>
          </Link>
          {currentUser?.role === "admin" && (
            <Link to="/admin/dashboard">
              <S.MobileNavLink
                $isActive={isActiveRoute("/admin/dashboard")}
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </S.MobileNavLink>
            </Link>
          )}
          <Link to="/profile">
            <S.MobileNavLink
              $isActive={isActiveRoute("/profile")}
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </S.MobileNavLink>
          </Link>
          <Link to="/settings">
            <S.MobileNavLink
              $isActive={isActiveRoute("/settings")}
              onClick={() => setIsMenuOpen(false)}
            >
              Settings
            </S.MobileNavLink>
          </Link>
          <S.MobileThemeToggle onClick={handleThemeToggle}>
            {themeMode === "light"
              ? "🌙 Switch to Dark Mode"
              : "☀️ Switch to Light Mode"}
          </S.MobileThemeToggle>
          <S.MobileSignOut onClick={handleSignOut}>Sign Out</S.MobileSignOut>
        </S.MobileMenu>
      ) : (
        <S.MobileMenu $isOpen={isMenuOpen}>
          <S.MobileThemeToggle onClick={handleThemeToggle}>
            {themeMode === "light"
              ? "🌙 Switch to Dark Mode"
              : "☀️ Switch to Light Mode"}
          </S.MobileThemeToggle>
          <S.MobileNavLink onClick={() => handleNavigation("/login")}>
            Sign In
          </S.MobileNavLink>
        </S.MobileMenu>
      )}
    </S.NavbarContainer>
  );
};

export default Navbar;
