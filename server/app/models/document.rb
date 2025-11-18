class Document < ApplicationRecord
  belongs_to :application
  has_one_attached :file

  enum :doc_type, { passport: 0, invitation_letter: 1, visa: 2 }

  def file_url
    return unless file.attached?
    
    # Generate the standard Rails blob URL - let the frontend handle download vs preview
    Rails.application.routes.url_helpers.rails_blob_url(
      file, 
      host: ENV['SERVER_API_URL'] || 'visapro-production.up.railway.app',
      protocol: 'https'
    )
  rescue => e
    Rails.logger.error "Error generating file URL: #{e.message}"
    nil
  end

  # Use the custom download endpoint for forced downloads
  def download_url
    return unless file.attached?
    
    # Use the custom download route we created
    Rails.application.routes.url_helpers.download_document_url(
      self,
      host: ENV['SERVER_API_URL'] || 'visapro-production.up.railway.app',
      protocol: 'https'
    )
  end

  # Alias for consistency
  def file_full_url
    file_url
  end
end