Rails.application.routes.draw do
  # Handle CORS preflight requests
  match '*path', to: 'application#handle_options_request', via: :options

  # Active Storage routes
  resolve("ActiveStorage::Blob") { |blob, options| route_for(:rails_blob, blob, options) }
  resolve("ActiveStorage::Attachment") { |attachment, options| route_for(:rails_blob, attachment.blob, options) }

  resources :users, only: [:create] do
    collection do
      patch :update_theme
    end
  end

  resources :documents do
    get 'download', on: :member
  end

  resources :sessions, only: [:create]
  resources :athletes, only: [:index, :create]
  resources :applications, only: [:index, :show, :create, :update]

  resources :invoices, only: [:index, :show, :create] do
  patch :update_status, on: :member
  end
  resources :documents, only: [:create]



  # Fix password reset routes - use token as param instead of id
  resources :password_resets, only: [:create]
  get '/password_resets/:token/edit', to: 'password_resets#edit', as: 'edit_password_reset'
  patch '/password_resets/:token', to: 'password_resets#update'

  namespace :admin do
    get "dashboard", to: "dashboard#index"
    resources :applications, only: [:index, :update]
  end

  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  get "/me", to: "sessions#show"

  # Health check endpoint for Fly.io
  get '/up', to: 'health#index'
  
end