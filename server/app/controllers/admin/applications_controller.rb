module Admin
  class ApplicationsController < ApplicationController
    before_action :ensure_admin
    before_action :set_application, only: [:update]

    def index
      applications = Application.all.includes(:user, :athlete, :documents)
      render json: applications
    end

    def update
      if @application.update(admin_application_params)
        render json: @application
      else
        render json: { errors: @application.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def ensure_admin
      render json: { error: 'Admin access required' }, status: :forbidden unless current_user&.admin?
    end

    def set_application
      @application = Application.find(params[:id])
    end

    def admin_application_params
      params.permit(:status, :remarks)
    end
  end
end