class UsersController < ApplicationController
  skip_before_action :authenticate_user!, only: [:create]

  def create
    user = User.new(user_params)
    if user.save
      # Send welcome email to user
      UserMailer.welcome_email(user).deliver_now

      # Notify all admins of the new user 
      User.admin.find_each do |admin|
        UserMailer.admin_new_user(admin, user).deliver_now
      end

      # Automatically log in the user after signup
      token = JwtService.encode(user_id: user.id)
      render json: { 
        user: user.as_json(except: [:password_digest]), 
        token: token 
      }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update_theme
    if current_user.update(theme_preference: params[:theme])
      render json: { 
        user: current_user.as_json(except: [:password_digest]),
        message: "Theme preference updated successfully" 
      }
    else
      render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :role, :theme_preference)
  end
end