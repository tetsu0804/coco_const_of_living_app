class SubCategory < ApplicationRecord
  belongs_to :category
  has_many :goods
  validates :sub_category_name, presence: true, uniqueness: true, length: { maximum: 20 }
end
