require 'rails_helper'

RSpec.describe "PasswordResets", type: :request do
  describe "POST /password_resets" do
    it "sends reset password email" do
      user = User.create!(name: "Jane", email: "jane@test.com", password: "password")

      expect {
        post "/password_resets", params: { email: user.email }
      }.to change { enqueued_jobs.size }.by(1)

      mail = ActionMailer::Base.deliveries.last
      expect(mail.to).to include(user.email)
      expect(mail.subject).to eq("Reset Your Password")
    end
  end
end
