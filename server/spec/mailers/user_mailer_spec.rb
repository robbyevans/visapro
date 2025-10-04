require "rails_helper"

RSpec.describe UserMailer, type: :mailer do
  let(:user) { create(:user, email: "test@example.com") }
  let(:application) { create(:application, user: user) }

  it "sends welcome email" do
    email = UserMailer.welcome_email(user).deliver_now
    expect(email.to).to eq([user.email])
    expect(email.subject).to include("Welcome")
  end

  it "sends reset password email" do
    token = user.generate_password_reset_token!
    email = UserMailer.reset_password_email(user, token).deliver_now
    expect(email.to).to eq([user.email])
    expect(email.subject).to include("Reset your password")
    expect(email.body.encoded).to include(token)
  end

  it "sends application submitted email" do
    email = UserMailer.application_submitted(user, application).deliver_now
    expect(email.subject).to include("Application Submitted")
  end
end
