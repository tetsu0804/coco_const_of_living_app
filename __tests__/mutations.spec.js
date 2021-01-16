import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import mutations from '@/store/mutations'


let localVue = createLocalVue()
localVue.use(Vuex)

describe('mutationsのテスト', () => {
    let state
  describe('createCategorySubCategory', () => {
    let categorySub
    let categorySubTwo
    let categorySubThree
    let categorySubFour
    beforeEach(() => {
      state = {
        categorySubCategoryArray: [],
        categoryNameArray: [],
      }

      categorySub = { category: 'その他', sub: '生理用品'}
      categorySubTwo = { category: '食べ物', sub: 'ご飯'}
      categorySubThree = { category: '食べ物', sub: 'おやつ'}
      categorySubFour = { category: 'その他', sub: '日用品'}
    })

    it('通常時', async () => {
      mutations.mutations.createCategorySubCategory(state, categorySub)
      expect(state.categorySubCategoryArray[0].category).toBe('その他')
      expect(state.categorySubCategoryArray[0].sub[0]).toBe('生理用品')
      expect(state.categorySubCategoryArray.length).toBe(1)

      mutations.mutations.createCategorySubCategory(state, categorySubTwo)
      expect(state.categorySubCategoryArray[1].category).toBe('食べ物')
      expect(state.categorySubCategoryArray[1].sub[0]).toBe('ご飯')
      expect(state.categorySubCategoryArray.length).toBe(2)
    })

    it('存在するカテゴリ名がある場合はカテゴリ名は追加せずサブカテゴリだけ追加になる', () => {
      mutations.mutations.createCategorySubCategory(state, categorySub)
      expect(state.categorySubCategoryArray.length).toBe(1)
      expect(state.categorySubCategoryArray[0].category).toBe('その他')
      expect(state.categorySubCategoryArray[0].sub[0]).toBe('生理用品')
      expect(state.categorySubCategoryArray[0].sub.length).toBe(1)

      mutations.mutations.createCategorySubCategory(state, categorySubFour)
      expect(state.categorySubCategoryArray.length).toBe(1)
      expect(state.categorySubCategoryArray.length).not.toBe(2)
      expect(state.categorySubCategoryArray[0].category).toBe('その他')
      expect(state.categorySubCategoryArray[0].sub.length).toBe(2)
      expect(state.categorySubCategoryArray[0].sub.length).not.toBe(1)
      expect(state.categorySubCategoryArray[0].sub.[0]).toBe('生理用品')
      expect(state.categorySubCategoryArray[0].sub.[1]).toBe('日用品')
      expect(state.categorySubCategoryArray[1]).toBeUndefined()
    })
  })

  describe('createGoods', () => {
    let goods
    let goodsTwo
    let goodsThree
    beforeEach(() => {
      state = {
        goods: []
      }
      goods = { id: 1, goods_name: 'ロイヤルカナン', price: 5000, create_day: '2021-01-16T00:00:00.000+09:00', sub_category: 'ご飯', category: '食べ物'}
      goodsTwo = { id: 2, goods_name: 'カムカムがむ', price: 800, create_day: '2021-01-16T00:00:00.000+09:00', sub_category: 'おやつ', category: '食べ物'}
      goodsThree = { id: 3, goods_name: 'カムカムがむ', price: 800, create_day: '2021-01-16T00:00:00.000+09:00', sub_category: 'おやつ', category: '食べ物'}
    })

    it('成功', () => {
      expect(state.goods.length).toBe(0)
      mutations.mutations.createGoods(state, goods)
      expect(state.goods.length).toBe(1)
      expect(state.goods[0].id).toBe(1)
      expect(state.goods[0].goods_name).toBe('ロイヤルカナン')
      expect(state.goods[0].price).toBe(5000)
      expect(state.goods[0].create_day).toBe('2021-01-16T00:00:00.000+09:00')

      mutations.mutations.createGoods(state, goodsTwo)
      expect(state.goods.length).toBe(2)
      expect(state.goods[0].id).toBe(2)
      expect(state.goods[0].goods_name).toBe('カムカムがむ')
      expect(state.goods[0].price).toBe(800)
      expect(state.goods[0].create_day).toBe('2021-01-16T00:00:00.000+09:00')
      expect(state.goods[1].id).toBe(1)
      expect(state.goods[1].goods_name).toBe('ロイヤルカナン')
      expect(state.goods[1].price).toBe(5000)
      expect(state.goods[1].create_day).toBe('2021-01-16T00:00:00.000+09:00')


      mutations.mutations.createGoods(state, goodsThree)
      expect(state.goods.length).toBe(3)
      expect(state.goods[0].id).toBe(3)
      expect(state.goods[0].goods_name).toBe('カムカムがむ')
      expect(state.goods[0].price).toBe(800)
      expect(state.goods[0].create_day).toBe('2021-01-16T00:00:00.000+09:00')
      expect(state.goods[1].id).toBe(2)
      expect(state.goods[1].goods_name).toBe('カムカムがむ')
      expect(state.goods[1].price).toBe(800)
      expect(state.goods[1].create_day).toBe('2021-01-16T00:00:00.000+09:00')
      expect(state.goods[2].id).toBe(1)
      expect(state.goods[2].goods_name).toBe('ロイヤルカナン')
      expect(state.goods[2].price).toBe(5000)
      expect(state.goods[2].create_day).toBe('2021-01-16T00:00:00.000+09:00')

    })
  })
})
