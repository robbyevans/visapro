require 'rails_helper'

RSpec.describe "Athletes API", type: :request do
  let!(:user) { create(:user) }

  describe "POST /athletes" do
    it "creates an athlete for a user" do
      expect {
        post "/athletes", params: { athlete: { first_name: "Usain", last_name: "Bolt", date_of_birth: "1986-08-21", passport_number: "A1234567", user_id: user.id } }
      }.to change(Athlete, :count).by(1)

      expect(response).to have_http_status(:created)
    end

    it "fails with invalid attributes" do
      post "/athletes", params: { athlete: { first_name: "", last_name: "", passport_number: "", user_id: user.id } }

      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe "GET /athletes" do
    before { create_list(:athlete, 3, user: user) }

    it "returns all athletes" do
      get "/athletes"
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).size).to eq(3)
    end
  end
end
