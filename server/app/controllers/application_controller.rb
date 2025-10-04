class ApplicationController < ActionController::API

  def update
    application = Application.find(params[:id])
    if application.update(application_params)
      # Notify user of the update
      UserMailer.application_updated(application.user, application).deliver_now
      render json: application, status: :ok
    else
      render json: { errors: application.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
