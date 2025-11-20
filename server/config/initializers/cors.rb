
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # TEMPORARILY ALLOW ALL ORIGINS
    origins '*'

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      max_age: 600,
      credentials: false
  end
end