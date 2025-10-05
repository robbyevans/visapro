class SessionsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:create]

  def show
    if current_user
      render json: { user: current_user.as_json(except: [:password_digest]) }
    else
      render json: { error: 'Not authenticated' }, status: :unauthorized
    end
  end

  def create
    user = User.find_by(email: params[:email])
    
    if user&.authenticate(params[:password])
      token = JwtService.encode(user_id: user.id)
      render json: { 
        user: user.as_json(except: [:password_digest]), 
        token: token,
        message: "Logged in successfully" 
      }, status: :ok
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end
end