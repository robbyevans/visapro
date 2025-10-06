class Athlete < ApplicationRecord
  belongs_to :user, optional: true
  has_many :applications, dependent: :destroy

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :passport_number, presence: true, uniqueness: true

  # If you want to ensure athletes are unique by passport number
  before_validation :find_existing_athlete, on: :create

  private

  def find_existing_athlete
    return unless passport_number.present?
    
    existing_athlete = Athlete.find_by(passport_number: passport_number)
    if existing_athlete
      self.id = existing_athlete.id
      self.reload
    end
  end
end