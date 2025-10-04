FactoryBot.define do
  factory :application do
    association :user
    association :athlete
    country { "Kenya" }
    remarks { "Training camp" }
    status { :pending }
  end
end