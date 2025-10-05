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
    athlete = current_user.athletes.new(athlete_params)
    if athlete.save
      render json: athlete, status: :created
    else
      render json: { errors: athlete.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def athlete_params
    params.require(:athlete).permit(:first_name, :last_name, :date_of_birth, :passport_number)
  end
end