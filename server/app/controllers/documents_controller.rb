# File: /server/app/controllers/documents_controller.rb
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
      # Return both relative and full URLs for debugging
      render json: {
        id: document.id,
        application_id: document.application_id,
        doc_type: document.doc_type,
        file_url: document.file_url, # Relative URL
        file_full_url: document.file_full_url, # Full URL
        created_at: document.created_at
      }, status: :created
    else
      render json: { errors: document.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def document_params
    params.permit(:application_id, :doc_type, :document)
  end
end