import React, { useState } from "react";
import { useAuth } from "../../redux/hooks/useAuth";
import Input from "../Forms/Input";
import Select from "../Forms/Select";
import Button from "../Button/Button";
import * as S from "./styles";

interface SignupProps {
  onToggleMode: () => void;
  onSuccess?: () => void;
}

const Signup: React.FC<SignupProps> = ({ onToggleMode, onSuccess }) => {
  const { handleSignUp, isLoading, error, clearAuthError } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    role: "individual" as "individual" | "corporate",
  });
  const [localError, setLocalError] = useState<string | null>(null);

  const roleOptions = [
    { value: "individual", label: "Individual" },
    { value: "corporate", label: "Corporate" },
  ];

  const handleChange = (field: string, value: string) => {
    if (error || localError) {
      clearAuthError();
      setLocalError(null);
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    // Client-side validation
    if (formData.password !== formData.passwordConfirmation) {
      setLocalError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setLocalError("Password must be at least 6 characters long");
      return;
    }

    const signUpData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    const result = await handleSignUp(signUpData);
    if (result.success && onSuccess) {
      onSuccess();
    }
  };

  const displayError = localError || error;

  return (
    <S.AuthFormContainer>
      <S.AuthTitle>Create Your Account</S.AuthTitle>

      {displayError && <S.AuthError>{displayError}</S.AuthError>}

      <form onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          type="text"
          value={formData.name}
          onChange={(value) => handleChange("name", value)}
          placeholder="Enter your full name"
          required
          disabled={isLoading}
        />

        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(value) => handleChange("email", value)}
          placeholder="Enter your email"
          required
          disabled={isLoading}
        />

        <Select
          label="Account Types"
          value={formData.role}
          onChange={(value) => handleChange("role", value)}
          options={roleOptions}
          required
          disabled={isLoading}
        />

        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={(value) => handleChange("password", value)}
          placeholder="Create a password"
          required
          disabled={isLoading}
          // minLength={6}
        />

        <Input
          label="Confirm Password"
          type="password"
          value={formData.passwordConfirmation}
          onChange={(value) => handleChange("passwordConfirmation", value)}
          placeholder="Confirm your password"
          required
          disabled={isLoading}
          // minLength={6}
        />

        <Button
          type="submit"
          variant="primary"
          loading={isLoading}
          disabled={isLoading}
        >
          Create Account
        </Button>
      </form>

      <S.AuthFooter>
        <S.AuthFooterText>
          Already have an account?{" "}
          <S.AuthLink type="button" onClick={onToggleMode}>
            Sign in
          </S.AuthLink>
        </S.AuthFooterText>
      </S.AuthFooter>
    </S.AuthFormContainer>
  );
};

export default Signup;
