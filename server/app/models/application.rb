class Application < ApplicationRecord
  belongs_to :user
  belongs_to :athlete
  has_many :documents, dependent: :destroy


  enum status: { pending: 0, approved: 1, rejected: 2, invoiced: 3, completed: 4 }

  validates :country, presence: true
  validates :user, presence: true
  validates :athlete, presence: true
  
  validate :single_application_for_individual_user, on: :create

  private

  def single_application_for_individual_user
    return unless user&.individual?
    if Application.exists?(user_id: user.id, status: [:pending, :approved, :invoiced, :completed])
      errors.add(:base, "Individual users may only have one active application")
    end
  end
end