class DocumentsController < ApplicationController
  
  def create
    application = Application.find_by(id: params[:application_id])
    return render json: { error: "Application not found" }, status: :not_found unless application

    unless current_user.admin? || application.user_id == current_user.id
      return render json: { error: 'Not authorized to add documents to this application' }, status: :forbidden
    end

    document = application.documents.new(
      doc_type: params[:doc_type]
    )

    if params[:document].present?
      document.file.attach(params[:document])
    end

    if document.save
      # Return both URLs for frontend
      render json: {
        id: document.id,
        application_id: document.application_id,
        doc_type: document.doc_type,
        file_url: document.file_url,
        download_url: document.download_url, # Include download URL
        file_full_url: document.file_full_url,
        created_at: document.created_at
      }, status: :created
    else
      render json: { errors: document.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def download
    document = Document.find(params[:id])
    
    # Authorization check
    unless current_user.admin? || document.application.user_id == current_user.id
      return render json: { error: 'Not authorized' }, status: :forbidden
    end

    if document.file.attached?
      # Force download by setting Content-Disposition header
      # This will stream the file through Rails with proper headers
      send_data document.file.download,
                filename: document.file.filename.to_s,
                type: document.file.content_type,
                disposition: 'attachment'
    else
      render json: { error: 'File not found' }, status: :not_found
    end
  end

  private

  def document_params
    params.permit(:application_id, :doc_type, :document)
  end
end