class DocumentsController < ApplicationController
  def create
    application = Application.find_by(id: params[:application_id])
    return render json: { error: "Application not found" }, status: :not_found unless application

    unless current_user.admin? || application.user_id == current_user.id
      return render json: { error: 'Not authorized to add documents to this application' }, status: :forbidden
    end

    document = application.documents.new(document_params.except(:application_id))
    if document.save
      render json: document, status: :created
    else
      render json: { errors: document.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def document_params
    params.permit(:application_id, :doc_type, :file_url)
  end
end