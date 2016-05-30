Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  resources :game, only: [:index]
  root 'game#index'
end
