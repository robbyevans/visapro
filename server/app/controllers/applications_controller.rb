class ApplicationsController < ApplicationController
  def index
    render json: Application.all
  end

  def create
    application = Application.new(application_params)
    if application.save
      render json: application, status: :created

      #Notify user 
      UserMailer.application_submitted(application.user, application).deliver_now

      # Notify all admins
      User.admin.find_each do |admin|
        UserMailer.admin_new_application(admin, application).deliver_now
      end

    else
      render json: { errors: application.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def application_params
    params.permit(:user_id, :athlete_id, :country, :remarks, :status)
  end
end
