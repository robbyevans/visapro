Rails.application.routes.draw do
  # Auth
  post "/signup", to: "users#create"
  post "/login",  to: "sessions#create"

  # Resources
  resources :users, only: [:create]
  resources :sessions, only: [:create]
  resources :athletes, only: [:index, :create]
  resources :applications, only: [:index, :create]
  resources :documents, only: [:create]

  namespace :admin do
    get "dashboard", to: "dashboard#index"
  end
end
