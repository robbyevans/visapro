require 'rails_helper'

RSpec.describe "Users API", type: :request do
  describe "POST /users" do
    let(:valid_attributes) do
      { user: { name: "John Doe", email: "john@example.com", password: "password", password_confirmation: "password" } }
    end

    let(:invalid_attributes) do
      { user: { name: "", email: "", password: "" } }
    end

    it "creates a new user with valid attributes" do
      expect {
        post "/users", params: valid_attributes
      }.to change(User, :count).by(1)

      expect(response).to have_http_status(:created)
      body = JSON.parse(response.body)
      expect(body["user"]["email"]).to eq("john@example.com")
      expect(body["token"]).to be_present # Should return JWT token
    end

    it "does not create user with invalid attributes" do
      post "/users", params: invalid_attributes
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it "sends welcome email to user and notification to admin" do
      admin = create(:user, role: :admin)

      expect {
        post "/users", params: { user: { name: "John", email: "john@test.com", password: "password", password_confirmation: "password" } }
      }.to change { ActionMailer::Base.deliveries.size }.by(2)

      subjects = ActionMailer::Base.deliveries.map(&:subject)
      recipients = ActionMailer::Base.deliveries.flat_map(&:to)

      expect(subjects).to include("Welcome to VisaPro 🎉")
      expect(subjects).to include("New User Signup: john@test.com")
      expect(recipients).to include("john@test.com")
      expect(recipients).to include(admin.email)
    end
  end
end