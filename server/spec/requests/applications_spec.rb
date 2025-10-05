require 'rails_helper'

RSpec.describe "Applications API", type: :request do
  let!(:user) { create(:user) }
  let!(:athlete) { create(:athlete, user: user) }

  describe "GET /applications" do
    before do
      create_list(:application, 2, user: user, athlete: athlete, country: "UG")
      other_user = create(:user, role: :corporate)
      other_athlete = create(:athlete, user: other_user)
      create(:application, user: other_user, athlete: other_athlete, country: "TZ")
    end

    context "as individual user" do
      it "lists only their own applications" do
        get "/applications", headers: auth_headers(user)
        expect(response).to have_http_status(:ok)
        body = JSON.parse(response.body)
        expect(body.length).to eq(2)
      end
    end

    context "as admin" do
      let(:admin) { create(:user, role: :admin) }

      it "lists all applications" do
        get "/applications", headers: auth_headers(admin)
        expect(response).to have_http_status(:ok)
        body = JSON.parse(response.body)
        expect(body.length).to eq(3) # Should be exact number
      end
    end

    it "requires authentication" do
      get "/applications"
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe "POST /applications" do
    let(:params) { { athlete_id: athlete.id, country: "UK", remarks: "Training" } }

    it "creates a new application for authenticated user" do
      expect {
        post "/applications", params: params, headers: auth_headers(user)
      }.to change(Application, :count).by(1)
      expect(response).to have_http_status(:created)
    end

    it "requires authentication" do
      post "/applications", params: params
      expect(response).to have_http_status(:unauthorized)
    end

    it "doesn't create without country" do
      post "/applications", params: { athlete_id: athlete.id }, headers: auth_headers(user)
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it "notifies user and admin when application is submitted" do
      admin = create(:user, role: :admin)

      expect {
        post "/applications", params: { athlete_id: athlete.id, country: "US" }, headers: auth_headers(user)
      }.to change { ActionMailer::Base.deliveries.size }.by(2)

      subjects = ActionMailer::Base.deliveries.map(&:subject)
      recipients = ActionMailer::Base.deliveries.flat_map(&:to)

      expect(subjects).to include("Application Submitted ✅")
      expect(subjects).to include("New Application Submitted by #{user.email}")
      expect(recipients).to include(user.email)
      expect(recipients).to include(admin.email)
    end
  end

  describe "PATCH /applications/:id" do
    let!(:application) { create(:application, user: user, athlete: athlete, country: "KE", status: :pending) }

    it "notifies user when admin updates application" do
      admin = create(:user, role: :admin)

      expect {
        patch "/applications/#{application.id}", 
              params: { status: :approved }, 
              headers: auth_headers(admin)
      }.to change { ActionMailer::Base.deliveries.size }.by(1)

      mail = ActionMailer::Base.deliveries.last
      expect(mail.to).to include(user.email)
      expect(mail.subject).to include("Application Update: Approved")
    end

    it "allows user to update their own application" do
      patch "/applications/#{application.id}", 
            params: { remarks: "Updated remarks" }, 
            headers: auth_headers(user)
      expect(response).to have_http_status(:ok)
    end
  end
end