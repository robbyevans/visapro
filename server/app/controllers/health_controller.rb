class HealthController < ApplicationController
  skip_before_action :authenticate_user!

  def index
    # Basic health check - just return OK
    render json: { status: 'OK', timestamp: Time.current }
  end
end