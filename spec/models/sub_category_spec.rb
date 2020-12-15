require 'rails_helper'

RSpec.describe SubCategory, type: :model do
  before do
    @eat= FactoryBot.create(:category)
    @snack = SubCategory.create(sub_category_name: 'おやつ', category_id: @eat.id)
    @dog_food = SubCategory.create(sub_category_name: 'ご飯', category_id: @eat.id)
  end

  context '成功' do
    it '普通' do
      expect(@snack).to be_valid
      expect(@dog_food).to be_valid
    end

    it 'sub_category_nameが20文字' do
      @snack.sub_category_name = 'a' * 20
      @dog_food.sub_category_name = 'a' * 20
      expect(@snack).to be_valid
      expect(@dog_food).to be_valid
    end
  end

  context '失敗' do
    it 'sub_category_nameが空文字' do
      @snack.sub_category_name = ''
      @dog_food.sub_category_name = ''
      expect(@snack).to_not be_valid
      expect(@dog_food).to_not be_valid
    end

    it 'sub_category_nameが二つ以上同じ値ならば' do
      other_snack = SubCategory.create(sub_category_name: 'おやつ', category_id: @eat.id)
      hospital = Category.create(category_name: '医療品')
      other_snack2 = SubCategory.create(sub_category_name: 'おやつ', category_id: hospital.id)

      expect(other_snack).to_not be_valid
      expect(other_snack2).to_not be_valid
    end

    it 'sub_category_nameが21文字以上なら' do
      @snack.sub_category_name = 'a' * 21
      expect(@snack).to_not be_valid
    end
  end
end
