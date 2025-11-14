class Application < ApplicationRecord
  belongs_to :user
  belongs_to :athlete
  has_many :documents, dependent: :destroy
  belongs_to :invoice, optional: true 

  enum status: { pending: 0, approved: 1, rejected: 2, invoiced: 3, completed: 4 }

  validates :country, presence: true
  validates :user, presence: true
  validates :athlete, presence: true
  validates :unit_price, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true

end
