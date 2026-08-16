class SessionsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:create]

  # GET /me
  def show
    if current_user
      render json: { user: serialize_user(current_user) }, status: :ok
    else
      render json: { error: 'Not authenticated' }, status: :unauthorized
    end
  end

  # POST /login
  def create
    user = User.find_by(email: params[:email]&.downcase&.strip)

    #authenticate password first -> prevents account enumeration
    if user&.authenticate(params[:password])
      if user.role == "corporate" && user.status == "inactive"
        render json: { error: "Account pending approval by the admin!" }, status: :unauthorized
      else
        token = JwtService.encode(user_id: user.id)
        render json: { 
          user: serialize_user(user), 
          token: token,
          message: "Logged in successfully" 
        }, status: :ok
      end
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  # DELETE /logout 
  def destroy
    render json: { message: "Logged out successfully" }, status: :ok
  end

  private

  def serialize_user(user)
    user.as_json(except: [:password_digest])
  end
end