import React, { useState } from "react";
import { useAuth } from "../../redux/hooks/useAuth";
import Input from "../Forms/Input";
import Button from "../Button/Button";
import * as S from "./styles";

interface LoginProps {
  onToggleMode: () => void;
  onSuccess?: () => void;
}

const Login: React.FC<LoginProps> = ({ onToggleMode, onSuccess }) => {
  const { handleLogIn, isLoading, error, clearAuthError } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (field: string, value: string) => {
    if (error) clearAuthError();
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleLogIn(formData.email, formData.password);
    if (result.success && onSuccess) {
      onSuccess();
    }
  };

  return (
    <S.AuthFormContainer>
      <S.AuthTitle>Login to Your Account</S.AuthTitle>

      {error && <S.AuthError>{error}</S.AuthError>}

      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(value) => handleChange("email", value)}
          placeholder="Enter your email"
          required
          disabled={isLoading}
        />

        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={(value) => handleChange("password", value)}
          placeholder="Enter your password"
          required
          disabled={isLoading}
        />

        <Button
          type="submit"
          variant="primary"
          loading={isLoading}
          disabled={isLoading}
        >
          Sign In
        </Button>
      </form>

      <S.AuthFooter>
        <S.AuthFooterText>
          Don't have an account?{" "}
          <S.AuthLink type="button" onClick={onToggleMode} disabled={isLoading}>
            Sign up
          </S.AuthLink>
        </S.AuthFooterText>
      </S.AuthFooter>
    </S.AuthFormContainer>
  );
};

export default Login;
