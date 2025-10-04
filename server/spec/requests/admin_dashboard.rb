require 'rails_helper'

RSpec.describe 'Admin Dashboard API',type: :request do
  describe "GET /admin/dashboard" do
    it "returns success" do
      get "/admin/dashboard"
      expect(response).to have_http_status(:ok)
    end
  end
end