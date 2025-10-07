import React, { useState } from "react";
import Input from "../Forms/Input";
import Button from "../Button/Button";
import * as S from "./styles";

interface PasswordResetFormProps {
  onSuccess?: () => void;
}

const PasswordResetForm: React.FC<PasswordResetFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    password: "",
    passwordConfirmation: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirmation) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.AuthFormContainer>
      <S.AuthTitle>Set New Password</S.AuthTitle>

      {error && <S.AuthError>{error}</S.AuthError>}

      <form onSubmit={handleSubmit}>
        <Input
          label="New Password"
          type="password"
          value={formData.password}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, password: value }))
          }
          placeholder="Enter your new password"
          required
          disabled={isLoading}
        />

        <Input
          label="Confirm New Password"
          type="password"
          value={formData.passwordConfirmation}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, passwordConfirmation: value }))
          }
          placeholder="Confirm your new password"
          required
          disabled={isLoading}
        />

        <Button
          type="submit"
          variant="primary"
          loading={isLoading}
          disabled={isLoading}
        >
          Reset Password
        </Button>
      </form>
    </S.AuthFormContainer>
  );
};

export default PasswordResetForm;
