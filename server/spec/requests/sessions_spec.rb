require 'rails_helper'

RSpec.describe "Sessions API", type: :request do
  describe "POST /sessions" do
    let!(:user) { create(:user, email: "jane@example.com", password: "password", password_confirmation: "password") }

    it "logs in with correct credentials and returns token" do
      post "/sessions", params: { email: "jane@example.com", password: "password" }

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["message"]).to eq("Logged in successfully")
      expect(json["token"]).to be_present
      expect(json["user"]["email"]).to eq("jane@example.com")
      expect(json["user"]).not_to have_key("password_digest")
    end

    it "fails with wrong password" do
      post "/sessions", params: { email: "jane@example.com", password: "wrongpass" }
      expect(response).to have_http_status(:unauthorized)
    end
  end
end