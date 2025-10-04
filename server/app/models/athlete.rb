class Athlete < ApplicationRecord
  belongs_to :user
  has_many :applications, dependent: :destroy

  validates :first_name, :last_name, :passport_number, presence: true
  validates :passport_number, uniqueness: true
end
