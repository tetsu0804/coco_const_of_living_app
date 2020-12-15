class Category < ApplicationRecord
  validates :category_name, uniqueness: true, presence: true, length: { maximum: 20 }
end
