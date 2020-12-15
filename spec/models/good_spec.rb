require 'rails_helper'

RSpec.describe Good, type: :model do
  before do
    @dogg_food = FactoryBot.create(:sub_category)
    @royal_canan = Good.create(goods_name: 'ロイヤルカナン', price: 4000, sub_category_id: @dogg_food.id)
    @cumcum_gam = Good.create(goods_name: 'カムカムガム', price: 800, sub_category_id: @dogg_food.id)
  end

  context '成功' do
    it '普通' do
      expect(@royal_canan).to be_valid
      expect(@cumcum_gam).to be_valid
    end

    it 'goods_nameが複数あっても' do
      @royal_canan2 = Good.create(goods_name: 'ロイヤルカナン', price: 4000, sub_category_id: @dogg_food.id)
      expect(@royal_canan2).to be_valid
      expect(Good.count).to eq(3)
    end

    it 'goods_nameが50文字なら' do
      @royal_canan.goods_name = 'a' * 50
      @cumcum_gam.goods_name = 'a' * 50
    end
  end

  context '失敗' do
    it 'goods_nameが空文字なら' do
      @royal_canan.goods_name = ''
      @cumcum_gam.goods_name = ''
      expect(@royal_canan).to_not be_valid
      expect(@cumcum_gam).to_not be_valid
    end

    it 'priceが空文字なら' do
      @royal_canan.price = ''
      @cumcum_gam.price = ''
      expect(@royal_canan).to_not be_valid
      expect(@cumcum_gam).to_not be_valid
    end

    it 'goods_nameが51文字なら' do
      @royal_canan.goods_name = 'a' * 51
      @cumcum_gam.goods_name = 'a' * 51
      expect(@royal_canan).to_not be_valid
      expect(@cumcum_gam).to_not be_valid
    end

    it 'priceが文字列なら' do
      @royal_canan.price = '四千'
      @cumcum_gam.price = '五百'
      expect(@royal_canan).to_not be_valid
      expect(@cumcum_gam).to_not be_valid
    end
  end
end
