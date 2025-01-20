class Profile < ApplicationRecord
  belongs_to :user

  geocoded_by :address
  after_validation :geocode, if: -> (obj) { (obj.address.present?) && (obj.latitude.blank? || obj.longitude.blank?) }

  def address
    # Because I'm using fake (faker gem) address and city we have to remove them to get the geolocation
    # [address_1, address_2, city, state, country].compact.join(', ')
    [address_1, address_2, city, state, zip_code, country].compact.join(', ')
  end
end
