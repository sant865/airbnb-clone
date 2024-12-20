require "rails_helper"

RSpec.describe "Api::users", type: :request do
  describe "GET /show" do
    let(:headers) do
      {'ACCEPT' => 'application/json' }
    end
    context "when the user exists" do
      it "returns a successful response" do
        user = create(:user)
        get api_user_path(user), headers: headers
        expect(response).to be_successful
      end
    end

    context "when the user does not exist" do
      it "returns a 404 status" do
        get api_user_path(id: -1), headers: headers
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
 