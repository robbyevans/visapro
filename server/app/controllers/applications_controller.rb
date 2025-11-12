class ApplicationsController < ApplicationController
  before_action :set_application, only: [:show, :update]

  def index
    group_by_client = params[:group_by_client] == 'true'
    
    if group_by_client && current_user.admin?
      # Simple grouping by user - no groups table needed!
      users_with_applications = User.includes(applications: [:athlete, :documents])
                                    .where.not(applications: { id: nil })
                                    .order(:name)
      
      render json: users_with_applications.as_json(
        only: [:id, :name, :email, :role],
        methods: [:application_count, :pending_applications_count, :invoiced_applications_count],
        include: {
          applications: {
            only: [:id, :country, :status, :remarks, :created_at, :updated_at],
            include: {
              athlete: { only: [:first_name, :last_name, :date_of_birth, :passport_number] },
              documents: { methods: [:file_url, :download_url] }
            }
          }
        }
      )
    else
      # Return individual applications (existing behavior)
      applications = if current_user.admin?
                      Application.includes(:user, :athlete, :documents)
                    else
                      current_user.applications.includes(:athlete, :documents)
                    end

      applications = applications.order(created_at: :desc)

      render json: applications.as_json(
        include: {
          athlete: { only: [:first_name, :last_name, :date_of_birth, :passport_number] },
          documents: { 
            only: [:id, :doc_type, :created_at],
            methods: [:file_url, :download_url]
          },
          user: { only: [:id, :name, :email, :role] }  # Include user info
        }
      )
    end
  end

  def show
    render json: @application.as_json(
      include: {
        athlete: { only: [:first_name, :last_name, :date_of_birth, :passport_number] },
        documents: { 
          only: [:id, :doc_type, :created_at],
          methods: [:file_url, :download_url] # Include download_url in response
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
        documents: { 
          only: [:id, :doc_type, :created_at],
          methods: [:file_url, :download_url] # Include download_url in response
        },
        user: { only: [:id, :name, :email, :role] }  # Include user info in response
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
          documents: { 
            only: [:id, :doc_type, :created_at],
            methods: [:file_url, :download_url] # Include download_url in response
          },
          user: { only: [:id, :name, :email, :role] }  # Include user info in response
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