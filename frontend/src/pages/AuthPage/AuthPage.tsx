import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../redux/hooks/useAuth";
import AuthForm from "../../components/Auth/AuthForm";
import * as S from "./styles";

interface AuthPageProps {
  onSuccess?: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onSuccess }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const getInitialMode = () => {
    if (location.pathname === "/signup") return "signup";
    if (location.pathname === "/initiate") return "initiate";
    return "login";
  };

  const [mode, setMode] = useState<"login" | "signup" | "initiate">(getInitialMode);

  useEffect(() => {
    setMode(getInitialMode());
  }, [location.pathname]);

  useEffect(() => {
    if (isAuthenticated && mode !== "initiate") {
      const from = (location.state as any)?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location, mode]);

  const handleAuthSuccess = () => {
    if (mode === "initiate" && onSuccess) {
      onSuccess(); 
    } else {
      const from = (location.state as any)?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    }
  };

  const handleToggleMode = () => {
    if (mode === "initiate") return;

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