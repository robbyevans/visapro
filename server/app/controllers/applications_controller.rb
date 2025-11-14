class ApplicationsController < ApplicationController
  before_action :set_application, only: [:show, :update]

  # ==========================================================
  # GET /applications
  # Supports grouping for admin: /applications?group_by_client=true
  # ==========================================================
  def index
    group_by_client = params[:group_by_client] == 'true'

      if group_by_client && current_user.admin?
    users_with_applications =
      User.includes(applications: [:athlete, :documents, :invoice])
          .where.not(applications: { id: nil })
          .order(:name)

    render json: users_with_applications.as_json(
      only: [:id, :name, :email, :role],
      methods: [:application_count, :pending_applications_count, :invoiced_applications_count],
      include: {
        applications: {
          only: [
            :id, :country, :status, :remarks,
            :created_at, :updated_at,
            :invoice_id, :unit_price
          ],
          include: {
            invoice: {
              only: [
                :id, :invoice_number,
                :total_amount, :issue_date,
                :due_date, :status, :notes
              ]
            },
            athlete: {
            only: [
              :first_name,
              :last_name,
              :date_of_birth,
              :passport_number,
              :phone_number,
              :email
            ]

            },
            documents: {
              methods: [:file_url, :download_url]
            }
          }
        }
      }
    )
    else
      # ---------------------------------------------------------
      # INDIVIDUAL APPLICATIONS (admin sees all, user sees own)
      # ---------------------------------------------------------
      applications =
        if current_user.admin?
          Application.includes(:user, :athlete, :documents, :invoice)
        else
          current_user.applications.includes(:athlete, :documents, :invoice)
        end

      applications = applications.order(created_at: :desc)

      render json: applications.as_json(
        include: {
          invoice: {
            only: [:id, :invoice_number, :total_amount, :issue_date, :status]
          },
          athlete: {
          only: [
            :first_name,
            :last_name,
            :date_of_birth,
            :passport_number,
            :phone_number,
            :email
          ]

          },
          documents: {
            only: [:id, :doc_type, :created_at],
            methods: [:file_url, :download_url]
          },
          user: {
            only: [:id, :name, :email, :role]
          }
        }
      )
    end
  end

  # ==========================================================
  # GET /applications/:id
  # ==========================================================
  def show
    render json: @application.as_json(
      include: {
        invoice: {
          only: [:id, :invoice_number, :total_amount, :issue_date, :status]
        },
        athlete: {
        only: [
          :first_name,
          :last_name,
          :date_of_birth,
          :passport_number,
          :phone_number,
          :email
        ]

        },
        documents: {
          only: [:id, :doc_type, :created_at],
          methods: [:file_url, :download_url]
        },
        user: {
          only: [:id, :name, :email]
        }
      }
    )
  end

  # ==========================================================
  # POST /applications
  # ==========================================================
  def create
    application = nil
    athlete = nil

    Application.transaction do
      # Create or update athlete
      if application_params[:athlete_attributes]
        attrs = application_params[:athlete_attributes]

        # If passport number provided → try to find existing athlete
        if attrs[:passport_number].present?
          athlete = Athlete.find_or_initialize_by(passport_number: attrs[:passport_number])
        else
          # If no passport → always create new athlete
          athlete = Athlete.new
        end

        athlete.assign_attributes(attrs)
        athlete.user = current_user
        athlete.save!
      end


      application = current_user.applications.build(
        country: application_params[:country],
        remarks: application_params[:remarks],
        athlete: athlete
      )
      application.save!
    end

    # Send emails
    UserMailer.application_submitted(current_user, application).deliver_now
    User.admin.find_each do |admin|
      UserMailer.admin_new_application(admin, application).deliver_now
    end

    render json: application.as_json(
      include: {
        invoice: { only: [:id, :invoice_number, :total_amount, :status] },
        athlete: {
            only: [
              :first_name,
              :last_name,
              :date_of_birth,
              :passport_number,
              :phone_number,
              :email
            ]

           },
        documents: { methods: [:file_url, :download_url] },
        user: { only: [:id, :name, :email, :role] }
      }
    ), status: :created

  rescue ActiveRecord::RecordInvalid => e
    errors = []
    errors += athlete.errors.full_messages if athlete&.errors&.any?
    errors += application.errors.full_messages if application&.errors&.any?
    errors << e.message if errors.empty?

    render json: { errors: errors }, status: :unprocessable_entity
  end

  # ==========================================================
  # PATCH/PUT /applications/:id
  # ==========================================================
  def update
    if @application.update(application_params)
      render json: @application.as_json(
        include: {
          invoice: { only: [:id, :invoice_number, :total_amount, :status] },
          athlete: { 
          only: [
            :first_name,
            :last_name,
            :date_of_birth,
            :passport_number,
            :phone_number,
            :email
          ]
          },
          documents: {
            only: [:id, :doc_type, :created_at],
            methods: [:file_url, :download_url]
          },
          user: { only: [:id, :name, :email, :role] }
        }
      )
    else
      render json: { errors: @application.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # ==========================================================
  # PRIVATE HELPERS
  # ==========================================================
  private

  def set_application
    @application = Application.find(params[:id])

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
      :date_of_birth,
      :phone_number,
      :email   
    ]
  )
end
end
