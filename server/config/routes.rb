Rails.application.routes.draw do
  resources :users, only: [:create]
  resources :sessions, only: [:create]
  resources :athletes, only: [:index, :create]
  resources :applications, only: [:index, :create]
  resources :documents, only: [:create]

  namespace :admin do
    get "dashboard", to: "dashboard#index"
  end
end