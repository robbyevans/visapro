require 'rails_helper'

RSpec.describe "PasswordResets", type: :request do
  describe "POST /password_resets" do
    it "sends reset password email" do
      user = create(:user, email: "jane@test.com") # Remove explicit password to use factory default

      expect {
        post "/password_resets", params: { email: user.email }
      }.to change { ActionMailer::Base.deliveries.size }.by(1)

      mail = ActionMailer::Base.deliveries.last
      expect(mail.to).to include(user.email)
      expect(mail.subject).to eq("Reset your password")
    end
  end
end