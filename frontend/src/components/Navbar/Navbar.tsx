import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../redux/hooks/useAuth";
import { useUser } from "../../redux/hooks/useUser";
import { useTheme } from "../../hooks/useTheme";
import Button from "../Button/Button";
import * as S from "./styles";
import logo from "../../assets/logo.png";

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

  const isDarkMode = themeMode === "dark";

  const ThemeToggle = ({ mobile = false }: { mobile?: boolean }) => (
    <S.ThemeToggleContainer $mobile={mobile}>
      <S.ThemeToggleInput
        type="checkbox"
        checked={isDarkMode}
        onChange={handleThemeToggle}
      />
      <S.ThemeToggleSlider $isDarkMode={isDarkMode}>
        <S.ThemeIcon className="sun">☀️</S.ThemeIcon>
        <S.ThemeIcon className="moon">🌙</S.ThemeIcon>
      </S.ThemeToggleSlider>
    </S.ThemeToggleContainer>
  );

  return (
    <S.NavbarContainer>
      <S.NavbarContent>
        {/* Brand Section */}
        <S.Brand>
          <Link to="/" style={{ textDecoration: "none" }}>
            <S.BrandLink>
              <S.BrandLogo src={logo} alt="Logo" />
              <S.BrandText>VisaLink</S.BrandText>
            </S.BrandLink>
          </Link>
        </S.Brand>

        {isAuthenticated ? (
          <>
            {/* Desktop Navigation */}
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

            {/* Desktop User Section */}
            <S.UserSection>
              <ThemeToggle />

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

            {/* Mobile Menu Toggle */}
            <S.MobileMenuToggle
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              $isOpen={isMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </S.MobileMenuToggle>
          </>
        ) : (
          /* Unauthenticated User Section */
          <S.AuthSection>
            <ThemeToggle />
            <Button
              onClick={() => handleNavigation("/login")}
              variant="primary"
              size="md"
            >
              Sign In
            </Button>
          </S.AuthSection>
        )}
      </S.NavbarContent>

      {/* Mobile Menu */}
      <S.MobileMenu $isOpen={isMenuOpen}>
        {isAuthenticated ? (
          /* Authenticated Mobile Menu */
          <>
            <S.MobileMenuHeader>
              <S.MobileUserInfo>
                <S.UserAvatar $large>
                  {currentUser?.name?.charAt(0)?.toUpperCase() || "U"}
                </S.UserAvatar>
                <div>
                  <S.MobileUserName>{currentUser?.name}</S.MobileUserName>
                  <S.MobileUserRole>
                    {currentUser?.role === "admin" ? "Administrator" : "User"}
                  </S.MobileUserRole>
                </div>
              </S.MobileUserInfo>
            </S.MobileMenuHeader>

            <S.MobileNavSection>
              <Link to="/dashboard">
                <S.MobileNavLink
                  $isActive={isActiveRoute("/dashboard")}
                  onClick={() => setIsMenuOpen(false)}
                >
                  📊 Dashboard
                </S.MobileNavLink>
              </Link>
              {currentUser?.role === "admin" && (
                <Link to="/admin/dashboard">
                  <S.MobileNavLink
                    $isActive={isActiveRoute("/admin/dashboard")}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    🛠️ Admin
                  </S.MobileNavLink>
                </Link>
              )}
              <Link to="/profile">
                <S.MobileNavLink
                  $isActive={isActiveRoute("/profile")}
                  onClick={() => setIsMenuOpen(false)}
                >
                  👤 Profile
                </S.MobileNavLink>
              </Link>
              <Link to="/settings">
                <S.MobileNavLink
                  $isActive={isActiveRoute("/settings")}
                  onClick={() => setIsMenuOpen(false)}
                >
                  ⚙️ Settings
                </S.MobileNavLink>
              </Link>
            </S.MobileNavSection>

            <S.MobileMenuFooter>
              <S.MobileThemeSection>
                <S.MobileThemeLabel>Theme</S.MobileThemeLabel>
                <ThemeToggle mobile />
              </S.MobileThemeSection>
              <S.MobileSignOut onClick={handleSignOut}>
                🚪 Sign Out
              </S.MobileSignOut>
            </S.MobileMenuFooter>
          </>
        ) : (
          /* Unauthenticated Mobile Menu */
          <>
            <S.MobileNavSection>
              <S.MobileNavLink onClick={() => handleNavigation("/login")}>
                🔐 Sign In
              </S.MobileNavLink>
            </S.MobileNavSection>

            <S.MobileMenuFooter>
              <S.MobileThemeSection>
                <S.MobileThemeLabel>Theme</S.MobileThemeLabel>
                <ThemeToggle mobile />
              </S.MobileThemeSection>
            </S.MobileMenuFooter>
          </>
        )}
      </S.MobileMenu>
    </S.NavbarContainer>
  );
};

export default Navbar;
