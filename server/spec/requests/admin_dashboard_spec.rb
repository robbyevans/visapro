require 'rails_helper'

RSpec.describe 'Admin Dashboard API', type: :request do
  describe "GET /admin/dashboard" do
    it "returns success for admin" do
      admin = create(:user, role: :admin)
      get "/admin/dashboard", headers: auth_headers(admin)
      expect(response).to have_http_status(:ok)
    end

    it "denies access for non-admin" do
      user = create(:user, role: :individual)
      get "/admin/dashboard", headers: auth_headers(user)
      expect(response).to have_http_status(:forbidden)
    end

    it "requires authentication" do
      get "/admin/dashboard"
      expect(response).to have_http_status(:unauthorized)
    end
  end
end