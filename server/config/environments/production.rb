require "active_support/core_ext/integer/time"

Rails.application.configure do
  # --- CORS FIX (must be near the top) ---
  config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins ENV['ALLOWED_ORIGINS']&.split(',').map(&:strip)

      resource '*',
        headers: :any,
        methods: [:get, :post, :put, :patch, :delete, :options, :head],
        credentials: false
    end
  end
  # --- END CORS FIX ---

  # Basics
  config.enable_reloading = false
  config.eager_load = true
  config.consider_all_requests_local = false

  # Active Storage (AWS S3)
  config.active_storage.service = (ENV.fetch("ACTIVE_STORAGE_SERVICE", "amazon")).to_sym
  config.active_storage.routes_prefix = '/rails/active_storage'

  # URL helpers
  Rails.application.routes.default_url_options = {
    host: ENV['SERVER_API_URL'] || 'visapro-production.up.railway.app',
    protocol: 'https'
  }

  config.action_mailer.default_url_options = Rails.application.routes.default_url_options

  # SSL
  config.force_ssl = true
  config.ssl_options = { redirect: { exclude: ->(request) { request.path == "/up" } } }

  # Host allowance
  config.hosts << /.*\.fly\.dev/
  config.hosts << /.*\.railway\.app/ if ENV['RAILWAY'] == 'true'
  config.hosts << (ENV['HOSTNAME'] if ENV['HOSTNAME'].present?)

  # Logging
  config.logger = ActiveSupport::Logger.new(STDOUT)
                    .tap { |l| l.formatter = ::Logger::Formatter.new }
                    .then { |l| ActiveSupport::TaggedLogging.new(l) }

  config.log_tags = [:request_id]
  config.log_level = ENV.fetch("RAILS_LOG_LEVEL", "info").to_sym

  # Mailer
  config.action_mailer.perform_caching = false
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = {
    address: ENV.fetch("SMTP_ADDRESS", "smtp.gmail.com"),
    port: ENV.fetch("SMTP_PORT", 587),
    domain: ENV.fetch("SMTP_DOMAIN", "example.com"),
    user_name: ENV["SMTP_USERNAME"],
    password: ENV["SMTP_PASSWORD"],
    authentication: "plain",
    enable_starttls_auto: true
  }

  config.action_mailer.perform_deliveries = ENV.fetch("ACTION_MAILER_PERFORM_DELIVERIES", "false") == "true"
  config.action_mailer.raise_delivery_errors = ENV.fetch("ACTION_MAILER_RAISE_ERRORS", "false") == "true"

  # i18n
  config.i18n.fallbacks = true
  config.active_support.report_deprecations = false

  # DB schema
  config.active_record.dump_schema_after_migration = false
  config.active_record.attributes_for_inspect = [:id]

  # Host authorization exception for health checks
  config.host_authorization = { exclude: ->(request) { request.path == "/up" } }

  # Require Rails master key
  config.require_master_key = true
end
