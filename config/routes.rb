Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  resources :users, only: [:index]
  root 'users#index'
end
