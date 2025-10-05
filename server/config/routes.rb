Rails.application.routes.draw do
  resources :users, only: [:create]
  resources :sessions, only: [:create]
  resources :athletes, only: [:index, :create]
  resources :applications, only: [:index, :create, :update]
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
end