module Api
  class UserByEmailController < ApplicationController
    def show 
      user = User.find_by(email: params[:email])
      if user
        render json: user, status: :ok
      else
        render json: { error: "User with email #{params[:email]} not found" }, status: :not_found
      end
    end
  end
end