import React, { useState } from "react";
import { useAuth } from "../../redux/hooks/useAuth";
import Input from "../Forms/Input";
import Button from "../Button/Button";
import { countries } from "../../utils/countries";
import * as S from "./styles";

interface AuthFormProps {
  mode: "login" | "signup";
  onToggleMode: () => void;
  onSuccess?: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  onToggleMode,
  onSuccess,
}) => {
  const { handleLogIn, handleSignUp, isLoading, error, clearAuthError } =
    useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    role: "individual" as "individual" | "corporate",
    phone_number: "",
    country_code: "KE",
  });
  const [localError, setLocalError] = useState<string | null>(null);

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

    if (mode === "signup") {
      // Client-side validation for signup
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
        phone_number: formData.phone_number,
        country_code: formData.country_code,
      };

      const result = await handleSignUp(signUpData);
      if (result.success && onSuccess) {
        onSuccess();
      }
    } else {
      // Login
      const result = await handleLogIn(formData.email, formData.password);
      if (result.success && onSuccess) {
        onSuccess();
      }
    }
  };

  const displayError = localError || error;

  // Get selected country
  const selectedCountry = countries.find(
    (country) => country.code === formData.country_code
  );
  const dialCode = selectedCountry ? selectedCountry.dialCode : "+254";

  return (
    <S.AuthFormContainer>
      <S.AuthTitle>
        {mode === "login" ? "Login to Your Account" : "Create Your Account"}
      </S.AuthTitle>

      {displayError && <S.AuthError>{displayError}</S.AuthError>}

      <form onSubmit={handleSubmit}>
        {mode === "signup" && (
          <Input
            label="Full Name"
            type="text"
            value={formData.name}
            onChange={(value) => handleChange("name", value)}
            placeholder="Enter your full name"
            required
            disabled={isLoading}
          />
        )}

        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(value) => handleChange("email", value)}
          placeholder="Enter your email"
          required
          disabled={isLoading}
        />

        {mode === "signup" && (
          <>
            <S.SelectContainer>
              <S.InputLabel>Account Type *</S.InputLabel>
              <S.NativeSelect
                value={formData.role}
                onChange={(e) => handleChange("role", e.target.value)}
                required
                disabled={isLoading}
              >
                <option value="individual">Individual</option>
                <option value="corporate">Corporate</option>
              </S.NativeSelect>
            </S.SelectContainer>

            <S.PhoneInputContainer>
              <S.InputLabel>Phone Number *</S.InputLabel>
              <S.PhoneInputGroup>
                <S.CountrySelect
                  value={formData.country_code}
                  onChange={(e) => handleChange("country_code", e.target.value)}
                  disabled={isLoading}
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.name} ({country.dialCode})
                    </option>
                  ))}
                </S.CountrySelect>
                <S.PhoneNumberInput
                  type="tel"
                  value={formData.phone_number}
                  onChange={(e) => handleChange("phone_number", e.target.value)}
                  placeholder="Enter phone number"
                  required
                  disabled={isLoading}
                  $hasDialCode={!!dialCode}
                />
              </S.PhoneInputGroup>
              <S.PhoneHelpText>
                We'll use this for important updates about your applications
              </S.PhoneHelpText>
            </S.PhoneInputContainer>
          </>
        )}

        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={(value) => handleChange("password", value)}
          placeholder={
            mode === "login" ? "Enter your password" : "Create a password"
          }
          required
          disabled={isLoading}
        />

        {mode === "signup" && (
          <Input
            label="Confirm Password"
            type="password"
            value={formData.passwordConfirmation}
            onChange={(value) => handleChange("passwordConfirmation", value)}
            placeholder="Confirm your password"
            required
            disabled={isLoading}
          />
        )}

        <Button
          type="submit"
          variant="primary"
          loading={isLoading}
          disabled={isLoading}
        >
          {mode === "login" ? "Sign In" : "Create Account"}
        </Button>
      </form>

      <S.AuthFooter>
        <S.AuthFooterText>
          {mode === "login"
            ? "Don't have an account? "
            : "Already have an account? "}{" "}
          <S.AuthLink type="button" onClick={onToggleMode}>
            {mode === "login" ? "Sign up" : "Sign in"}
          </S.AuthLink>
        </S.AuthFooterText>
      </S.AuthFooter>
    </S.AuthFormContainer>
  );
};

export default AuthForm;
