class User < ApplicationRecord
  has_secure_password
  
  # Add theme preference validation
  validates :theme_preference, inclusion: { in: %w[light dark], message: "must be 'light' or 'dark'" }
  
  def generate_password_reset_token!
    update!(
      reset_password_token: SecureRandom.hex(10),
      reset_password_sent_at: Time.current
    )
    reset_password_token
  end

  def password_token_valid?
    reset_password_sent_at > 2.hours.ago
  end

  def reset_password!(password)
    update!(password: password, reset_password_token: nil)
  end

  # Add these helper methods for the simplified grouping
  def application_count
    applications.count
  end

  def pending_applications_count
    applications.pending.count
  end

  def invoiced_applications_count
    applications.invoiced.count
  end

  def individual?
    role == 'individual'
  end

  def corporate?
    role == 'corporate'
  end
  
  enum :role, { individual: 0, corporate: 1, admin: 2 }
  
  has_many :athletes, dependent: :destroy
  has_many :applications, dependent: :destroy
  has_many :invoices, dependent: :destroy

  validates :email, presence: true, uniqueness: true
  validates :name, presence: true
  validates :password, length: { minimum: 6 }, allow_nil: true
  
  # Add phone number validation
  validates :phone_number, presence: true, if: -> { role != "admin" }
  validates :country_code, presence: true, if: -> { phone_number.present? }
end