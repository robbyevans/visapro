require_relative "boot"
require "rails/all"
Bundler.require(*Rails.groups)

module Visapro
  class Application < Rails::Application
    config.load_defaults 7.2
    config.autoload_lib(ignore: %w[assets tasks])
    config.api_only = true

    # ===============================
    # CORS CONFIGURATION (GLOBAL)
    # ===============================
        config.middleware.insert_before 0, Rack::Cors do
      allow do
        # TEMPORARILY ALLOW ALL ORIGINS
        origins '*'

        resource "*",
          headers: :any,
          methods: [:get, :post, :put, :patch, :delete, :options, :head],
          credentials: false,
          max_age: 600
      end
    end
    # ===============================

    # Handle preflight requests
    config.middleware.insert_before Rack::Cors, Rack::Head
  end
end