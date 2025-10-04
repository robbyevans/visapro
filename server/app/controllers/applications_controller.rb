class ApplicationsController < ApplicationController
  def index
    render json: Application.all
  end

  def create
    application = Application.new(application_params)
    if application.save
      render json: application, status: :created
    else
      render json: { errors: application.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def application_params
    params.permit(:user_id, :athlete_id, :country, :remarks, :status)
  end
end
