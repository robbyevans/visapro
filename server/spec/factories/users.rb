FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.unique.email }
    password { "password123" }
    password_confirmation { "password123" }
    role { :individual }

    trait :admin do
      role { :admin }
    end

    trait :corporate do
      role { :corporate }
    end
  end
end
