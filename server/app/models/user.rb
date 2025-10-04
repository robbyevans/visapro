class User < ApplicationRecord
  has_secure_password
  
  enum :role, { individual: 0, corporate: 1, admin: 2 }
  
  has_many :athletes, dependent: :destroy
  has_many :applications, dependent: :destroy

  validates :email, presence: true, uniqueness: true
  validates :name, presence: true
  validates :password, length: { minimum: 6 }, allow_nil: true
end
