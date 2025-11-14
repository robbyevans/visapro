class AthletesController < ApplicationController
  def index
    if current_user.admin?
      athletes = Athlete.all
    else
      athletes = current_user.athletes
    end
    render json: athletes
  end

  def create
    # support both nested and flat payloads
    attrs = params[:athlete].presence || params.permit(:first_name, :last_name, :date_of_birth, :passport_number, :phone_number, :email)
    athlete = current_user.athletes.new(attrs)
    if athlete.save
      render json: athlete, status: :created
    else
      render json: { errors: athlete.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def athlete_params
  params.require(:athlete).permit(
    :first_name,
    :last_name,
    :passport_number,
    :date_of_birth,
    :phone_number,
    :email        
  )
end
end