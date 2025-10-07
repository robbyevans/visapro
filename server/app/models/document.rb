class Document < ApplicationRecord
  belongs_to :application
  has_one_attached :file

  enum :doc_type, { passport: 0, invitation_letter: 1, visa: 2 }

  def file_url
    return unless file.attached?
    
    # For development, we can use the rails_blob_path which generates a relative URL
    # This will be easier for the frontend to handle
    Rails.application.routes.url_helpers.rails_blob_path(file, only_path: true)
  rescue => e
    Rails.logger.error "Error generating file URL: #{e.message}"
    nil
  end

  # Alternative method that returns full URL
  def file_full_url
    return unless file.attached?
    
    # This generates a full URL including the host
    Rails.application.routes.url_helpers.rails_blob_url(file, only_path: false)
  rescue => e
    Rails.logger.error "Error generating full file URL: #{e.message}"
    nil
  end
end