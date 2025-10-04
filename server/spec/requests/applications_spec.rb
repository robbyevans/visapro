require 'rails_helper'

RSpec.describe "Applications API", type: :request do
  let!(:user) { create(:user) }
  let!(:athlete) { create(:athlete, user: user) }

  describe "POST /applications" do
    let(:params) { { user_id: user.id, athlete_id: athlete.id, country: "UK", remarks: "Training" } }

    it "creates a new application" do
      expect {
        post "/applications", params: params
      }.to change(Application, :count).by(1)
      expect(response).to have_http_status(:created)
      json = JSON.parse(response.body)
      expect(json["country"]).to eq("UK")
      expect(json["status"]).to be_present
    end

    it "doesn't create without country" do
      post "/applications", params: params.except(:country)
      expect(response).to have_http_status(:unprocessable_entity)
      json = JSON.parse(response.body)
      expect(json["errors"]).to include("Country can't be blank")
    end

    it "notifies user and admin when application is submitted" do
      user = User.create!(name: "Corp", email: "corp@test.com", password: "password", role: :corporate)
      admin = User.create!(name: "Admin", email: "admin@test.com", password: "password", role: :admin)

      expect {
        post "/applications", params: { application: { user_id: user.id, status: :pending } }
      }.to change { enqueued_jobs.size }.by(2) # 1 to user, 1 to admin

      last_mail = ActionMailer::Base.deliveries.last
      expect(last_mail.to).to include(admin.email)
    end
  end

  describe "GET /applications" do
    before { create_list(:application, 2, user: user, athlete: athlete) }

    it "lists applications" do
      get "/applications"
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).length).to be >= 2
    end
  end

  describe "PATCH /applications/:id" do
    it "notifies user when admin updates application" do
      user = User.create!(name: "Corp", email: "corp@test.com", password: "password", role: :corporate)
      admin = User.create!(name: "Admin", email: "admin@test.com", password: "password", role: :admin)
      application = Application.create!(user: user, status: :pending)

      expect {
        patch "/applications/#{application.id}", params: { application: { status: :approved } }
      }.to change { enqueued_jobs.size }.by(1)

      mail = ActionMailer::Base.deliveries.last
      expect(mail.to).to include(user.email)
      expect(mail.subject).to eq("Your Application Status Updated")
    end
  end
end
