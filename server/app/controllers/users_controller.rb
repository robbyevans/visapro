# app/controllers/users_controller.rb
class UsersController < ApplicationController
  # Skip authentication for both standard signup and initial setup
  skip_before_action :authenticate_user!, only: [:create, :initiate]

  # Standard user signup
  def create
    user = User.new(user_params)
    
    #no admin setup for standard users
    if user.role == "admin"
      user.role = "individual" 
    end

    user.status = user.corporate? ? "inactive" : "active"
    
    if user.save
      # Send welcome email to user
      UserMailer.welcome_email(user).deliver_now

      # Notify all admins of the new user 
      User.admin.find_each do |admin|
        UserMailer.admin_new_user(admin, user).deliver_now
      end

      render json: { 
        user: user.as_json(except: [:password_digest]),
        message: "User created successfully"
      }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # Admin setup
  def initiate
    if User.exists?
      render json: { error: "System is already initialized." }, status: :forbidden
      return
    end

    user = User.new(user_params)
    user.role = "admin" 
    user.status = "active"

    if user.save
      # token = JwtService.encode(user_id: user.id)
      
      render json: { 
        user: user.as_json(except: [:password_digest]),
        message: "Admin initialized successfully.",
        # token: token 
      }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update_theme
    if current_user.update(theme_preference: params[:theme_preference])
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
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :role, :theme_preference, :phone_number, :country_code)
  end
end