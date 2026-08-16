module Admin
  class DashboardController < ApplicationController
    before_action :ensure_admin
    before_action :set_user, only: [:update_status]

    # GET /admin/dashboard
    def index
      stats = {
        total_users: User.count,
        total_applications: Application.count,
        pending_applications: Application.pending.count,
        approved_applications: Application.approved.count
      }
      render json: stats
    end

    # GET /admin/corporate_users
    def corporate_index
      @corporate_users = User.where(role: "corporate").order(id: :asc)

      render json: @corporate_users.map { |u|
        {
          id: u.id,
          name: u.name,
          email: u.email,
          status: extract_user_status(u)
        }
      }
    end

    # PATCH /admin/users/:id/status
    def update_status
      raw_status = params[:status] || params.dig(:user, :status) || params.dig(:dashboard, :status)
      target_is_active = [1, "1", true, "true", "active"].include?(raw_status)

      # Determine the exact DB value to write
      db_value = target_is_active ? get_active_db_value : get_inactive_db_value

      # Force direct SQL UPDATE query in PostgreSQL
      @user.update_columns(status: db_value, updated_at: Time.current)
      @user.reload

      render json: {
        message: "User status updated successfully",
        user: {
          id: @user.id,
          name: @user.name,
          email: @user.email,
          status: extract_user_status(@user)
        }
      }, status: :ok
    rescue StandardError => e
      render json: { error: e.message }, status: :unprocessable_entity
    end

    private

    # Reads user status from DB and returns strictly 1 (Active) or 0 (Inactive)
    def extract_user_status(user)
      raw_val = user.read_attribute_before_type_cast(:status)
      val_str = user.status.to_s.downcase

      if User.defined_enums["status"].present?
        statuses = User.statuses
        # If the enum has defined active keys
        active_val = statuses["active"] || statuses.values[1] || 1
        return raw_val.to_s == active_val.to_s || val_str == "active" ? 1 : 0
      end

      # Fallback for boolean or integer columns
      [1, "1", true, "true", "active"].include?(raw_val) ? 1 : 0
    end

    # Gets the active value matching the column schema/enum
    def get_active_db_value
      col_type = User.columns_hash["status"]&.type

      if User.defined_enums["status"].present?
        User.statuses["active"] || User.statuses.values[1] || 1
      elsif col_type == :boolean
        true
      elsif col_type == :string
        "active"
      else
        1
      end
    end

    # Gets the inactive value matching the column schema/enum
    def get_inactive_db_value
      col_type = User.columns_hash["status"]&.type

      if User.defined_enums["status"].present?
        User.statuses["inactive"] || User.statuses.values[0] || 0
      elsif col_type == :boolean
        false
      elsif col_type == :string
        "inactive"
      else
        0
      end
    end

    def set_user
      @user = User.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "User not found" }, status: :not_found
    end

    def ensure_admin
      render json: { error: "Admin access required" }, status: :forbidden unless current_user&.admin?
    end
  end
end