class ApplicationsController < ApplicationController
  def index
    if current_user.admin?
      applications = Application.all.includes(:user, :athlete)
    else
      applications = current_user.applications.includes(:athlete)
    end
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
    
    # Authorization check - only allow updates if user owns the application or is admin
    if current_user.admin? || application.user_id == current_user.id
      if application.update(application_params)
        UserMailer.application_updated(application.user, application).deliver_now
        render json: application, status: :ok
      else
        render json: { errors: application.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: 'Not authorized' }, status: :forbidden
    end
  end

  private

  def application_params
    params.permit(:athlete_id, :country, :remarks, :status)
  end
end