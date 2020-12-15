class Category < ApplicationRecord
  has_many :sub_categories, dependent: :destroy
  validates :category_name, uniqueness: true, presence: true, length: { maximum: 20 }
end
