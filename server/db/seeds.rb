# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Create default admin user
# In db/seeds.rb
User.where(role: :admin).destroy_all 

User.create!(
  name: "Admin User",
  email: "user.admin@gmail.com",
  password: "@admin001", 
  password_confirmation: "@admin001",
  role: :admin
)

puts "✅ Admin user created (email: user.admin@gmail.com, password: @admin001) 🍀"

# in Production, run this command in console
# fly ssh console --command "bin/rails db:seed"