# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

10.times do |i|
  property = Property.create!(
    name: Faker::Lorem.word,
    headline: Faker::Lorem.sentence,
    description: Faker::Lorem.paragraph,
    address_1: Faker::Address.street_address,
    city: Faker::Address.city,
    state: Faker::Address.state,
    country: "United States", 
    price: Money.from_amount((60..200).to_a.sample)
  )

  property.images.attach(io: File.open(Rails.root.join("db", "sample", "images", "property_#{i + 1}.jpg")), filename: property.name)
  
  (1..5).to_a.sample.times do
    Review.create(reviewable: property, rating: (1..5).to_a.sample, title: Faker::Lorem.word, body: Faker::Lorem.paragraph)
  end
end
