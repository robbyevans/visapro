FactoryBot.define do
  factory :document do
    association :application
    doc_type { :passport }
    file_url { "http://example.com/dummy.pdf" }
  end
end