class ApplicationsController < ApplicationController
  before_action :set_application, only: [:show, :update]

      def index
    applications = if current_user.admin?
                    Application.includes(:user, :athlete, :documents)
                  else
                    current_user.applications.includes(:athlete, :documents)
                  end

    # Remove all filtering logic - just return all applications
    # Apply basic sorting by creation date (newest first)
    applications = applications.order(created_at: :desc)

    render json: applications.as_json(
      include: {
        athlete: { only: [:first_name, :last_name, :date_of_birth, :passport_number] },
        documents: { only: [:id, :doc_type, :file_url, :created_at] }
      }
    )
  end

  def show
    render json: @application.as_json(
      include: {
        athlete: { only: [:first_name, :last_name, :date_of_birth, :passport_number] },
        documents: { 
          only: [:id, :doc_type, :created_at],
          methods: [:file_url, :file_full_url] # Include both URL methods
        },
        user: { only: [:id, :name, :email] }
      }
    )
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

    # Return the created application with associations
    render json: application.as_json(
      include: {
        athlete: { only: [:first_name, :last_name, :date_of_birth, :passport_number] },
        documents: { only: [:id, :doc_type, :file_url, :created_at] }
      }
    ), status: :created
    
  rescue ActiveRecord::RecordInvalid => e
    errors = []
    errors += athlete.errors.full_messages if athlete&.errors&.any?
    errors += application.errors.full_messages if application&.errors&.any?
    errors << e.message if errors.empty?
    
    render json: { errors: errors }, status: :unprocessable_entity
  end

  def update
    if @application.update(application_params)
      render json: @application.as_json(
        include: {
          athlete: { only: [:first_name, :last_name, :date_of_birth, :passport_number] },
          documents: { only: [:id, :doc_type, :file_url, :created_at] }
        }
      )
    else
      render json: { errors: @application.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

   def set_application
    @application = Application.find(params[:id])
    
    # Ensure users can only access their own applications unless admin
    unless current_user.admin? || @application.user_id == current_user.id
      render json: { error: 'Not authorized' }, status: :forbidden
    end
    rescue ActiveRecord::RecordNotFound
    render json: { error: 'Application not found' }, status: :not_found
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