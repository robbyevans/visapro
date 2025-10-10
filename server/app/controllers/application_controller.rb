class ApplicationController < ActionController::API
  before_action :authenticate_user!, unless: :active_storage_request?
  before_action :set_active_storage_host
  before_action :set_cors_headers

  # Add this method to handle CORS preflight requests
  def handle_options_request
    set_cors_headers
    render json: {}, status: :ok
  end

  private

  def set_cors_headers
    # Get allowed origins from environment or use defaults
    allowed_origins = ENV['ALLOWED_ORIGINS']&.split(',') || [
      'http://localhost:5173',
      'http://127.0.0.1:5173', 
      'http://192.168.2.129:5173',
      'https://visapro-dusky.vercel.app'
    ]

    # Check if the request origin is allowed
    request_origin = request.headers['Origin']
    if allowed_origins.include?(request_origin)
      headers['Access-Control-Allow-Origin'] = request_origin
    end

    headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD'
    headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token, X-Requested-With'
    headers['Access-Control-Max-Age'] = '1728000'
  end

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