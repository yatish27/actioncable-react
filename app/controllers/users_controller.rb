class UsersController < ApplicationController
  def index
   @online_count = Rails.cache.read('online_count').to_i
  end
end
