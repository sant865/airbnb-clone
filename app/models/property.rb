class Property < ApplicationRecord
  validates :name, presence: true
  validates :headline, presence: true
  validates :description, presence: true
  validates :address_1, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :country, presence: true

  monetize :price_cents, allow_nil: true

  geocoded_by :address
  after_validation :geocode, if: -> (obj) { obj.latitude.blank? || obj.longitude.blank? }

  has_many_attached :images, dependent: :destroy

  def address
    # Because I'm using fake (faker gem) address and city we have to remove them to get the geolocation
    # [address_1, address_2, city, state, country].compact.join(', ')
    [state, country].compact.join(', ')
  end

  def default_image
    images.first
  end
end
