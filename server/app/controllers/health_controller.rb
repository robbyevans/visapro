class HealthController < ApplicationController
  skip_before_action :authenticate_user!
  skip_before_action :set_cors_headers
  skip_before_action :set_active_storage_host

  def index
    render plain: 'OK', status: 200
  end
end