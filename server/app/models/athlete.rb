class Athlete < ApplicationRecord
  belongs_to :user, optional: true
  has_many :applications, dependent: :destroy

  validates :first_name, presence: true
  validates :last_name, presence: true

  # passport number NOT required
  validates :passport_number, uniqueness: true, allow_nil: true, allow_blank: true

  # NEW optional fields
  validates :phone_number, allow_nil: true, allow_blank: true, length: { maximum: 20 }
  validates :email, allow_nil: true, allow_blank: true, format: { with: URI::MailTo::EMAIL_REGEXP, allow_blank: true }

  before_validation :find_existing_athlete, on: :create

  private

  def find_existing_athlete
    return if passport_number.blank?

    existing_athlete = Athlete.find_by(passport_number: passport_number)
    if existing_athlete
      self.id = existing_athlete.id
      self.reload
    end
  end
end
