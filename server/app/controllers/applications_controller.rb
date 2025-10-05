module Admin
  class ApplicationsController < ApplicationController
    before_action :ensure_admin

     def index
      applications = Application.all.includes(:user, :athlete, :documents)
      render json: applications
    end

      def create
    # Ensure the application belongs to the current user
    application = current_user.applications.new(application_params)
    
    if application.save
      # Notify user 
      UserMailer.application_submitted(current_user, application).deliver_now

      # Notify all admins
      User.admin.find_each do |admin|
        UserMailer.admin_new_application(admin, application).deliver_now
      end

      render json: application, status: :created
    else
      render json: { errors: application.errors.full_messages }, status: :unprocessable_entity
    end
  end

     def update
      application = Application.find(params[:id])
      if application.update(admin_application_params)
        # UserMailer.application_updated(application.user, application).deliver_now
        render json: application
      else
        render json: { errors: application.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def ensure_admin
      render json: { error: 'Admin access required' }, status: :forbidden unless current_user&.admin?
    end

    def admin_application_params
      params.permit(:status, :remarks)
    end
  end
end
