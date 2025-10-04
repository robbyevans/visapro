FactoryBot.define do
  factory :athlete do
    first_name { Faker::Name.first_name }
    last_name  { Faker::Name.last_name }
    date_of_birth { Faker::Date.birthday(min_age: 18, max_age: 40) }
    passport_number { Faker::IDNumber.unique.passport }
    association :user
  end
end
