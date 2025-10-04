class DocumentsController < ApplicationController
  def create
    document = Document.new(document_params)
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
