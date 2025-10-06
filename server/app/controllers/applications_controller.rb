# File 9: /server/app/controllers/applications_controller.rb
class ApplicationsController < ApplicationController
  before_action :set_application, only: [:update]

  def index
    if current_user.admin?
      # Admin sees all applications
      applications = Application.includes(:user, :athlete, :documents).all
    else
      # Regular users see only their own applications
      applications = current_user.applications.includes(:athlete, :documents)
    end
    
    render json: applications
  end

  def create
    # Build application with nested athlete attributes
    application = current_user.applications.build(application_params)
    
    # Create or find athlete
    if application_params[:athlete_attributes]
      athlete = Athlete.find_or_initialize_by(
        passport_number: application_params[:athlete_attributes][:passport_number]
      )
      athlete.assign_attributes(application_params[:athlete_attributes])
      athlete.save!
      application.athlete = athlete
    end
    
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
    if @application.update(application_params)
      render json: @application
    else
      render json: { errors: @application.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_application
    @application = Application.find(params[:id])
    
    # Ensure users can only update their own applications unless admin
    unless current_user.admin? || @application.user_id == current_user.id
      render json: { error: 'Not authorized' }, status: :forbidden
    end
  end

  def application_params
    params.require(:application).permit(
      :country, 
      :remarks, 
      :status,
      athlete_attributes: [
        :first_name, 
        :last_name, 
        :passport_number, 
        :date_of_birth
      ]
    )
  end
end