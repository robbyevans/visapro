import React, { useState } from "react";
import Input from "../Forms/Input";
import Button from "../Button/Button";
import * as S from "./styles";

interface PasswordResetRequestProps {
  onSuccess?: () => void;
  onBackToLogin?: () => void;
}

const PasswordResetRequest: React.FC<PasswordResetRequestProps> = ({
  onSuccess,
  onBackToLogin,
}) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      setMessage(
        "If an account exists with this email, you will receive reset instructions."
      );
      if (onSuccess) onSuccess();
    } catch (error) {
      setMessage("Error sending reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.AuthFormContainer>
      <S.AuthTitle>Reset Your Password</S.AuthTitle>

      {message && (
        <S.AuthMessage type={message.includes("Error") ? "error" : "success"}>
          {message}
        </S.AuthMessage>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Enter your email address"
          required
          disabled={isLoading}
        />

        <Button
          type="submit"
          variant="primary"
          loading={isLoading}
          disabled={isLoading}
        >
          Send Reset Instructions
        </Button>
      </form>

      <S.AuthFooter>
        <S.AuthFooterText>
          Remember your password?{" "}
          <S.AuthLink
            type="button"
            onClick={onBackToLogin}
            disabled={isLoading}
          >
            Back to login
          </S.AuthLink>
        </S.AuthFooterText>
      </S.AuthFooter>
    </S.AuthFormContainer>
  );
};

export default PasswordResetRequest;
