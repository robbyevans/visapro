# File: /server/config/routes.rb
Rails.application.routes.draw do
  # Handle CORS preflight requests
  match '*path', to: 'application#handle_options_request', via: :options

  resources :users, only: [:create]
  resources :sessions, only: [:create]
  resources :athletes, only: [:index, :create]
  resources :applications, only: [:index, :show, :create, :update]  # Add :show here
  resources :documents, only: [:create]

  # Fix password reset routes - use token as param instead of id
  resources :password_resets, only: [:create]
  get '/password_resets/:token/edit', to: 'password_resets#edit', as: 'edit_password_reset'
  patch '/password_resets/:token', to: 'password_resets#update'

  resources :users, only: [:create] do
    collection do
      patch :update_theme
    end
  end

  namespace :admin do
    get "dashboard", to: "dashboard#index"
    resources :applications, only: [:index, :update]
  end

  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  get "/me", to: "sessions#show"
end