class PasswordResetsController < ApplicationController
  skip_before_action :authenticate_user!
  
  def create
    user = User.find_by(email: params[:email])
    if user
      token = user.generate_password_reset_token!
      UserMailer.reset_password_email(user, token).deliver_now
    end
    render json: { message: "If that email exists, a reset link has been sent." }
  end

  def edit
    user = User.find_by(reset_password_token: params[:token])
    if user&.password_token_valid?
      render json: { message: "Token is valid" }
    else
      render json: { error: "Invalid or expired token" }, status: :unprocessable_entity
    end
  end

  def update
    user = User.find_by(reset_password_token: params[:token])
    if user&.password_token_valid?
      user.reset_password!(params[:password])
      render json: { message: "Password reset successfully" }
    else
      render json: { error: "Invalid or expired token" }, status: :unprocessable_entity
    end
  end
end
