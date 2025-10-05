class Admin::DashboardController < ApplicationController
  before_action :ensure_admin

  def index
    # Admin dashboard statistics
    stats = {
      total_users: User.count,
      total_applications: Application.count,
      pending_applications: Application.pending.count,
      approved_applications: Application.approved.count
    }
    render json: stats
  end

  private

  def ensure_admin
    render json: { error: 'Admin access required' }, status: :forbidden unless current_user&.admin?
  end
end