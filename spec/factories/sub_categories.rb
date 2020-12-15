FactoryBot.define do
  factory :sub_category do
    sequence(:sub_category_name) { |n| "ドッグフード#{n}" }
    association :category
  end
end
