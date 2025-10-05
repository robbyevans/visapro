require 'rails_helper'

RSpec.describe "Documents API", type: :request do
  let!(:user) { create(:user) }
  let!(:application) { create(:application, user: user) }

  describe "POST /documents" do
    let(:params) { { application_id: application.id, doc_type: "passport", file_url: "http://example.com/p.pdf" } }

    it "creates a document for authenticated user" do
      expect {
        post "/documents", params: params, headers: auth_headers(user)
      }.to change(Document, :count).by(1)
      expect(response).to have_http_status(:created)
    end

    it "requires authentication" do
      post "/documents", params: params
      expect(response).to have_http_status(:unauthorized)
    end
  end
end