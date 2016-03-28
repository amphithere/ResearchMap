Rails.application.routes.draw do
  resources :trip_passes
  devise_for :users, :path_prefix => 'profile', :controllers => { :confirmations => "confirmations" }
  devise_for :researchers, :path_prefix => 'profile', :controllers => { :confirmations => "confirmations" }
  resources :users

  # devise_for :researchers, :path_prefix => 'profile'
  resources :researchers

  resources :users, :researchers, :researches

  as :user do
    patch "/user/confirm" => "confirmations#confirm", :as => :user_confirm
  end
  as :researcher do
    patch "/researcher/confirm" => "confirmations#confirm", :as => :researcher_confirm
  end

  resources :users do
    get 'following', to: 'follow#following'
    get 'likes', to: 'likes#index', as: :likes
    get 'trips', to: 'users#trips', as: :trips
    collection {post :import}
  end

  resources :researches do
    collection {post :import}
    post 'like', to: 'socializations#like'
    post 'unlike', to: 'socializations#unlike'
  end

  resources :conversations, only: [:index, :show, :destroy] do
    member do
      post :restore
      post :reply
    end
    collection do
      delete :empty_trash
    end
    member do
      post :mark_as_read
    end
  end

  resources :messages, only: [:new, :create]

  resources :researchers do
    collection {post :import}
    post 'follow',   to: 'socializations#follow'
    post 'unfollow', to: 'socializations#unfollow'
    get 'following', to: 'follow#following'
    get 'followers', to: 'follow#followers'
    get 'likes', to: 'likes#index', as: :likes
  end

  resources :trip_passes do
    collection {post :import}
    post 'accept', to: 'trip_passes#accept', as: :accept
    post 'decline', to: 'trip_passes#decline', as: :decline
    post 'accepted_cancel', to: 'trip_passes#accepted_cancel', as: :accepted_cancel
    post 'declined_cancel', to: 'trip_passes#declined_cancel', as: :declined_cancel
  end

  resources :people do
    collection do
      get :search
    end
  end

  get 'accepted_passes', to: 'trip_passes#getAcceptedPasses', as: :accepted_passes
  get 'declined_passes', to: 'trip_passes#getDeclinedPasses', as: :declined_passes
  get 'trip_requests' => 'trip_passes#trip_requests', as: :trip_requests
  get 'import', to: 'admins#import', as: :import
  get 'templates', to: 'admins#templates', as: :templates
  get 'my_research', to: 'researchers#your_research', as: :my_research
  get 'activity', to: 'activity#index', as: :activity
  get 'welcome/map'
  # get 'profile/:id' => 'profile#show', as: :profile
  get 'welcome/index'
  get 'welcome/data', :defaults => { format: :'json'}
  get 'people/index'
  root 'welcome#index'

end
