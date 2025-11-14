class Invoice < ApplicationRecord
  belongs_to :user
  has_many :applications, dependent: :nullify
  
  enum status: { pending: 0, paid: 1, cancelled: 2 }
end

