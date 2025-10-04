class Application < ApplicationRecord
belongs_to :user
belongs_to :athlete
has_many :documents, dependent: :destroy

enum :status, { pending: 0, approved: 1, rejected: 2, invoiced: 3 }

validates :country, presence: true
end
