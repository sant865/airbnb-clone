module Api
  class FavoritesController < ApplicationController
    protect_from_forgery with: :null_session
    skip_before_action :verify_authenticity_token, if: :json_request?

    def create 
      favorite = Favorite.create!(favorite_params)

      respond_to do |format|
        format.json do
          render json: { id: favorite.id }, status: :created
        end
      end
    end

    def destroy 
      favorite = Favorite.find(params[:id])
      if favorite
        favorite.destroy!
        respond_to do |format|
          format.json do
            head :no_content
          end
        end
      end
    end

    private 

    def favorite_params
      params.permit(:user_id, :property_id)
    end

    def json_request?
      request.format.json?
    end
  end
end