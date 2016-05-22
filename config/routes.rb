Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  resources :welcome, only: [:index]
  root 'welcome#index'
end
