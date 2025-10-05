class ApplicationController < ActionController::API
  before_action :authenticate_user!

  private

  def authenticate_user!
    header = request.headers['Authorization']
    token = header&.split(' ')&.last

    if token
      decoded = JwtService.decode(token)
      if decoded && (@current_user = User.find_by(id: decoded[:user_id]))
        return # Authentication successful
      end
    end

    render json: { error: 'Unauthorized' }, status: :unauthorized
  end

  def current_user
    @current_user
  end

  # Skip authentication for specific actions
  def skip_authentication?
    false
  end
end