class UserMailer < ApplicationMailer
  default from: "no-reply@visapro.com"

  def welcome_email(user)
    @user = user
    mail(to: @user.email, subject: "Welcome to VisaPro 🎉")
  end

  def reset_password_email(user, token)
    @user = user
    @reset_link = edit_password_reset_url(token: token)
    mail(to: @user.email, subject: "Reset your password")
  end

  def application_submitted(user, application)
    @user = user
    @application = application
    mail(to: @user.email, subject: "Application Submitted ✅")
  end

  def application_updated(user, application)
    @user = user
    @application = application
    mail(to: @user.email, subject: "Application Update: #{application.status.capitalize}")
  end

  def admin_new_user(admin, user)
    @admin = admin
    @user = user
    mail(to: @admin.email, subject: "New User Signup: #{@user.email}")
  end

  def admin_new_application(admin, application)
    @admin = admin
    @application = application
    mail(to: @admin.email, subject: "New Application Submitted by #{application.user.email}")
  end
end
