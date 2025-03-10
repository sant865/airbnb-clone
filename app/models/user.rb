class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_one :profile, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :favorited_properties, through: :favorites, source: :property

  after_create :create_profile

  def create_profile
    self.profile = Profile.new
    self.save!
  end
end
