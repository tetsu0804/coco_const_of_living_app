class SubCategory < ApplicationRecord
  belongs_to :category
  validates :sub_category_name, presence: true, uniqueness: true, length: { maximum: 20 }
end
