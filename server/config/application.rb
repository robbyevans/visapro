require_relative "boot"
require "rails/all"
Bundler.require(*Rails.groups)

module Visapro
  class Application < Rails::Application
    config.load_defaults 7.2
    config.autoload_lib(ignore: %w[assets tasks])
    config.api_only = true

    # CORS
    config.middleware.insert_before 0, Rack::Cors do
      allow do
      origins_allowed =
        (ENV['ALLOWED_ORIGINS']&.split(',')&.map(&:strip) || [
          'http://localhost:5173',
          'http://127.0.0.1:5173',
          'http://192.168.2.129:5173',
          'https://visapro-dusky.vercel.app'
        ])

        origins(*origins_allowed)

        resource '*',
          headers: :any,
          methods: [:get, :post, :put, :patch, :delete, :options, :head],
          credentials: false,
          max_age: 600
    end
  end

  end
end
