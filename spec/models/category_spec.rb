require 'rails_helper'

RSpec.describe Category, type: :model do
  before do
    @eat = Category.create(category_name: '食べ物')
  end

  context '成功' do
    it '通常' do
      expect(@eat).to be_valid
    end

    it 'category_name文字数が20文字なので成功' do
      @eat.category_name = 'a' * 20
      expect(@eat).to be_valid
    end
  end

  context '失敗' do
    it 'category_nameが空文字の為失敗' do
      @eat.category_name = ''
      expect(@eat).to_not be_valid
    end

    it 'category_nameが同じ' do
      other_eat = Category.create(category_name: '食べ物')
      expect(other_eat).to_not be_valid
    end

    it 'category_nameの文字数が21文字なので失敗' do
      @eat.category_name = 'a' * 21
      expect(@eat).to_not be_valid
    end
  end
end
