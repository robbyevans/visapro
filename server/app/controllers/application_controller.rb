class ApplicationController < ActionController::API
  before_action :authenticate_user!

    # Add this method to handle CORS preflight requests
def handle_options_request
  headers['Access-Control-Allow-Origin'] = '*'
  headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, PATCH, DELETE, OPTIONS'
  headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token'
  headers['Access-Control-Max-Age'] = '1728000'
  render text: '', content_type: 'text/plain'
end

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