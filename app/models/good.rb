class Good < ApplicationRecord
  belongs_to :sub_category

  validates :goods_name, presence: true, length: { maximum: 50}
  validates :price, presence: true, numericality: { only_integer: true}
end
