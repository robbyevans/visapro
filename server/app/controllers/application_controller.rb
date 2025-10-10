class ApplicationController < ActionController::API
  before_action :authenticate_user!, unless: :active_storage_request?
  before_action :set_active_storage_host

  # Add this method to handle CORS preflight requests
  def handle_options_request
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, PATCH, DELETE, OPTIONS'
    headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token'
    headers['Access-Control-Max-Age'] = '1728000'
    render text: '', content_type: 'text/plain'
  end

  private

  def active_storage_request?
    request.path.start_with?('/rails/active_storage')
  end

  def set_active_storage_host
    ActiveStorage::Current.url_options = { 
      host: request.base_url,
      protocol: request.protocol 
    }
  end

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
end