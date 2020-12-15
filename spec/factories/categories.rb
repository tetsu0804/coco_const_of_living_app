FactoryBot.define do
  factory :category do
    sequence(:category_name) { |n| "食べ物#{n}"}
  end
end
