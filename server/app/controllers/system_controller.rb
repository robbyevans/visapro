class SystemController < ApplicationController
  # Ensure no authentication is required to check status
  skip_before_action :authenticate_user!, only: [:setup_status]

  def setup_status
    render json: { is_initialized: User.exists? }, status: :ok
  end
end