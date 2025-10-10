class Document < ApplicationRecord
  belongs_to :application
  has_one_attached :file

  enum :doc_type, { passport: 0, invitation_letter: 1, visa: 2 }

  def file_url
    return unless file.attached?
    
    # Always generate full URL with explicit host
    Rails.application.routes.url_helpers.rails_blob_url(
      file, 
      host: ENV['SERVER_API_URL'] || 'visapro-rails-app.fly.dev',
      protocol: 'https'
    )
  rescue => e
    Rails.logger.error "Error generating file URL: #{e.message}"
    nil
  end

  # Alias for consistency
  def file_full_url
    file_url
  end
end