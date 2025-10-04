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
    end


    it "does not create user with invalid attributes" do
      post "/users", params: invalid_attributes

      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end
