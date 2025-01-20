require "rails_helper"

RSpec.describe "Api::userByEmail", type: :request do
  describe "GET /show" do
    let(:headers) do
      {'ACCEPT' => 'application/json' }
    end
    context "when the user exists" do
      it "returns a successful response" do
        user = create(:user)
        get api_user_by_email_path(email: user.email), headers: headers
        expect(response).to be_successful
        expect(JSON.parse(response.body)).to include("email" => user.email)
      end
    end

    context "when the user does not exist" do
      it "returns a 404 status" do
        get api_user_by_email_path(email: "johndoe@example.com"), headers: headers
        expect(response).to have_http_status(:not_found)
        expect(JSON.parse(response.body)).to include("error" => "User with email johndoe@example.com not found")
      end
    end
  end
end
 