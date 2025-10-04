require 'rails_helper'

RSpec.describe "Sessions API", type: :request do
  describe "POST /sessions" do
    let!(:user) { create(:user, email: "jane@example.com", password: "password") }

    it "logs in with correct credentials" do
      post "/sessions", params: { email: "jane@example.com", password: "password" }

      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["message"]).to eq("Logged in successfully")
    end

    it "fails with wrong password" do
      post "/sessions", params: { email: "jane@example.com", password: "wrongpass" }

      expect(response).to have_http_status(:unauthorized)
    end
  end
end