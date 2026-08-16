module Admin
  class UsersController < ApplicationController
    before_action :authenticate_user!
    before_action :ensure_admin!

    # GET /admin/corporate_users
    def corporate_index
      corporate_users = User.where(role: 'corporate').order(created_at: :desc)
      render json: corporate_users.as_json(except: [:password_digest]), status: :ok
    end

    # PATCH /admin/users/:id/status
    def update_status
      user = User.find(params[:id])
      
      if user.update(status: params[:status]) # expects "active" or "inactive"
        render json: { 
          user: user.as_json(except: [:password_digest]), 
          message: "User status updated successfully" 
        }, status: :ok
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def ensure_admin!
      unless current_user&.role == "admin"
        render json: { error: "Unauthorized access" }, status: :forbidden
      end
    end
  end
end