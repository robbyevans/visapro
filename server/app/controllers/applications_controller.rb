class ApplicationsController < ApplicationController
  before_action :set_application, only: [:update]

  def index
    if current_user.admin?
      applications = Application.includes(:user, :athlete, :documents).all
    else
      applications = current_user.applications.includes(:athlete, :documents)
    end
    
    render json: applications
  end

  def create
    application = nil
    athlete = nil
    
    Application.transaction do
      # Create or find athlete and associate with current user
      if application_params[:athlete_attributes]
        athlete = Athlete.find_or_initialize_by(
          passport_number: application_params[:athlete_attributes][:passport_number]
        )
        athlete.assign_attributes(application_params[:athlete_attributes])
        athlete.user = current_user  # Associate athlete with current user
        athlete.save!
      end
      
      # Build application for current user
      application = current_user.applications.build(
        country: application_params[:country],
        remarks: application_params[:remarks],
        athlete: athlete
      )
      application.save!
    end
    
    # Send emails after successful transaction
    UserMailer.application_submitted(current_user, application).deliver_now
    User.admin.find_each do |admin|
      UserMailer.admin_new_application(admin, application).deliver_now
    end

    render json: application, status: :created
    
  rescue ActiveRecord::RecordInvalid => e
    errors = []
    errors += athlete.errors.full_messages if athlete&.errors&.any?
    errors += application.errors.full_messages if application&.errors&.any?
    errors << e.message if errors.empty?
    
    render json: { errors: errors }, status: :unprocessable_entity
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