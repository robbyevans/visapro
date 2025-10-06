import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../redux/hooks/useAuth";
import AuthForm from "../../components/Auth/AuthForm";
import * as S from "./styles";

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're on login or signup path
  useEffect(() => {
    if (location.pathname === "/signup") {
      setMode("signup");
    } else {
      setMode("login");
    }
  }, [location.pathname]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleAuthSuccess = () => {
    const from = (location.state as any)?.from?.pathname || "/dashboard";
    navigate(from, { replace: true });
  };

  const handleToggleMode = () => {
    const newMode = mode === "login" ? "signup" : "login";
    setMode(newMode);
    navigate(newMode === "login" ? "/login" : "/signup", { replace: true });
  };

  return (
    <S.AuthPageContainer>
      <S.AuthCard>
        <AuthForm
          mode={mode}
          onToggleMode={handleToggleMode}
          onSuccess={handleAuthSuccess}
        />
      </S.AuthCard>
    </S.AuthPageContainer>
  );
};

export default AuthPage;
