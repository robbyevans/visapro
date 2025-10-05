class Application < ApplicationRecord
  belongs_to :user
  belongs_to :athlete
  has_many :documents, dependent: :destroy

  enum status: { pending: 0, approved: 1, rejected: 2, invoiced: 3 }

  validates :country, presence: true
  validate :single_application_for_individual_user, on: :create

  private

  def single_application_for_individual_user
    return unless user&.individual?
    if Application.exists?(user_id: user.id)
      errors.add(:base, "Individual users may only have one active application")
    end
  end
end
