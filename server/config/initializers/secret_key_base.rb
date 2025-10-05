Rails.application.config.secret_key_base = if Rails.env.test?
  'test_secret_key_base_placeholder'
elsif Rails.env.development? 
  'development_secret_key_base_placeholder'
else
  ENV['SECRET_KEY_BASE'] || 'fallback_production_key_please_set_env_var'
end