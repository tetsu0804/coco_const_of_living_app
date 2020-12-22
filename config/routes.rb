Rails.application.routes.draw do
  root to: 'home#index'
  namespace :api do
    namespace :v1 do
      post '/category', controller: :categories, action: :create
      post '/goods', controller: :goods, action: :create
      delete '/category/:category_name', controller: :categories, action: :destroy
      delete '/sub_category/:sub_category_name', controller: :sub_categories, action: :destroy
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
