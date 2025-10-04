class UsersController < ApplicationController
  def create
    user = User.new(user_params)
    if user.save
      render json: { user: user }, status: :created

      #send welcome email to user
      UserMailer.welcome_email(user).deliver_now

      #Notify all admins of the new user 
      User.admin.find_each do |admin|
      UserMailer.admin_new_user(admin, user).deliver_now
    end
     
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :role)
  end
end
