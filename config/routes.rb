Rails.application.routes.draw do
  devise_for :users
  
  root "home#index"

  namespace :api do 
    get "user_by_email/", to: "user_by_email#show", as: :user_by_email, constraints: { email: /.*/ }

    resources :favorites, only: [:create, :destroy]
  end
end