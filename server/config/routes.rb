Rails.application.routes.draw do
  resources :users, only: [:create]
  resources :sessions, only: [:create]
  resources :athletes, only: [:index, :create]
  resources :applications, only: [:index, :create, :update]
  resources :documents, only: [:create]

  resources :password_resets, only: [:create, :edit, :update]

  namespace :admin do
    get "dashboard", to: "dashboard#index"
    resources :applications, only: [:index, :update]
  end

  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
end