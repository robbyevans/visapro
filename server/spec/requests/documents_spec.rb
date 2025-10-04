require 'rails_helper'

RSpec.describe "Documents API", type: :request do
  let!(:application) { create(:application) }

  describe "POST /documents" do
    let(:params) { { application_id: application.id, doc_type: "passport", file_url: "http://example.com/p.pdf" } }

    it "creates a document" do
      expect {
        post "/documents", params: params
      }.to change(Document, :count).by(1)
      expect(response).to have_http_status(:created)
      expect(JSON.parse(response.body)["doc_type"]).not_to be_nil
    end
  end
end
