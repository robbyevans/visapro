class AthletesController < ApplicationController
  def index
    render json: Athlete.all
  end

  def create
    athlete = Athlete.new(athlete_params)
    if athlete.save
      render json: athlete, status: :created
    else
      render json: { errors: athlete.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def athlete_params
    params.require(:athlete).permit(:first_name, :last_name, :date_of_birth, :passport_number, :user_id)
  end
end
