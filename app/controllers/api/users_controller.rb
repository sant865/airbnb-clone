module Api
  class UsersController < ApplicationController
    def show 
      user = User.find_by(id: params[:id])

      if user
        render json: user, status: :ok
      else
        render json: { error: "User does not exist" }, status: :not_found
      end
    rescue ActiveRecord::RecordNotFound => e
      render json: { error: e.message }, status: :not_found
    end
  end
end