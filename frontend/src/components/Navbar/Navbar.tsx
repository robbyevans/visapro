import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../redux/hooks/useAuth";
import { useUser } from "../../redux/hooks/useUser";
import Button from "../Button/Button";
import * as S from "./styles";

const Navbar: React.FC = () => {
  const { isAuthenticated, handleLogOut } = useAuth();
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    handleLogOut();
    navigate("/");
    setIsMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
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
                <S.NavLink>Dashboard</S.NavLink>
              </Link>
              {currentUser?.role === "admin" && (
                <Link to="/admin/dashboard">
                  <S.NavLink>Admin</S.NavLink>
                </Link>
              )}
            </S.NavLinks>

            <S.UserSection>
              <S.UserGreeting>Hello, {currentUser?.name}</S.UserGreeting>
              <S.UserRole>{currentUser?.role}</S.UserRole>
              <Button onClick={handleSignOut} variant="secondary">
                Sign Out
              </Button>
            </S.UserSection>

            <S.MobileMenuToggle onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </S.MobileMenuToggle>
          </>
        ) : (
          <S.AuthSection>
            <Button
              onClick={() => handleNavigation("/login")}
              variant="primary"
              // size="small"
            >
              Sign In
            </Button>
          </S.AuthSection>
        )}
      </S.NavbarContent>

      {isAuthenticated && (
        <S.MobileMenu isOpen={isMenuOpen}>
          <Link to="/dashboard">
            <S.MobileNavLink onClick={() => setIsMenuOpen(false)}>
              Dashboard
            </S.MobileNavLink>
          </Link>
          {currentUser?.role === "admin" && (
            <Link to="/admin/dashboard">
              <S.MobileNavLink onClick={() => setIsMenuOpen(false)}>
                Admin
              </S.MobileNavLink>
            </Link>
          )}
          <S.MobileSignOut onClick={handleSignOut}>Sign Out</S.MobileSignOut>
        </S.MobileMenu>
      )}
    </S.NavbarContainer>
  );
};

export default Navbar;
