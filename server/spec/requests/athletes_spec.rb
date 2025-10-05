require 'rails_helper'

RSpec.describe "Athletes API", type: :request do
  let!(:user) { create(:user) }

  describe "POST /athletes" do
    it "creates an athlete for authenticated user" do
      expect {
        post "/athletes", 
             params: { athlete: { first_name: "Usain", last_name: "Bolt", date_of_birth: "1986-08-21", passport_number: "A1234567" } },
             headers: auth_headers(user)
      }.to change(Athlete, :count).by(1)
      expect(response).to have_http_status(:created)
    end

    it "requires authentication" do
      post "/athletes", params: { athlete: { first_name: "Usain", last_name: "Bolt" } }
      expect(response).to have_http_status(:unauthorized)
    end

    it "fails with invalid attributes" do
      post "/athletes", 
           params: { athlete: { first_name: "", last_name: "", passport_number: "" } },
           headers: auth_headers(user)
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe "GET /athletes" do
    before { create_list(:athlete, 3, user: user) }

    it "returns user's athletes when authenticated" do
      get "/athletes", headers: auth_headers(user)
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).size).to eq(3)
    end

    it "requires authentication" do
      get "/athletes"
      expect(response).to have_http_status(:unauthorized)
    end
  end
end