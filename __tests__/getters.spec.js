import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import getters from '@/store/getters'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('gettersのテスト', () => {
  let state
  let goods
  let now
  let last_now
  let two_month_ago_now
  let this_month
  let last_month
  let two_month_ago
  beforeEach(() => {
    now = new Date
    last_now = new Date
    two_month_ago_now = new Date
    this_month = new Date(now.setMonth(0))
    last_month = new Date(last_now.setMonth(-1))
    two_month_ago = new Date(two_month_ago_now.setMonth(-2))

    state = {
      categorySubCategoryArray: [
        { category: '食べ物', sub: ['ご飯', 'おやつ', '飲み物']},
        { category: '医療', sub: ['医者', '市販']},
        { category: 'その他', sub: ['生理用品', '日用品']}
      ],
      goods: [
        {id: 1, goods_name: 'ロイヤルカナン', price: 5000, create_day: this_month, sub_category: 'ご飯', category: '食べ物'},
        {id: 4, goods_name: 'カムカムガム', price: 800, create_day: this_month, sub_category: 'おやつ', category: 'ご飯'},
        {id: 2, goods_name: '爪切り', price: 500, create_day: last_month, sub_category: '医者', category: '医療'},
        { id: 3, goods_name: 'トイレシート', price: 1500, create_day: two_month_ago, sub_category: '生理用品', category: 'その他'}
      ]
    }
  })

  describe('categoryAndSub(全てのカテゴリとサブカテゴリ)', () => {
    it('確認', () => {
      const category_sub = getters.getters.categoryAndSub(state)
      expect(category_sub.length).toBe(3)
      expect(category_sub[0].category).toBe('食べ物')
      expect(category_sub[0].sub.length).toBe(3)
      expect(category_sub[0].sub[0]).toBe('ご飯')
      expect(category_sub[0].sub[2]).toBe('飲み物')
      expect(category_sub[1].category).toBe('医療')
      expect(category_sub[1].sub.length).toBe(2)
      expect(category_sub[1].sub[0]).toBe('医者')
      expect(category_sub[1].sub[1]).toBe('市販')
      expect(category_sub[2].category).toBe('その他')
      expect(category_sub[2].sub.length).toBe(2)
      expect(category_sub[2].sub[0]).toBe('生理用品')
      expect(category_sub[2].sub[1]).toBe('日用品')
    })
  })

  describe('subCategoryIndex(特定のサブカテゴリだけを取得)', () => {
    it('確認', () => {
      const subcategory = getters.getters.subCategoryIndex(state)
      expect(subcategory(1).length).toBe(2)
      expect(subcategory(1)[0]).toBe('医者')
      expect(subcategory(1)[1]).toBe('市販')
      expect(subcategory(1)[2]).toBeUndefined()
    })
  })

  describe('homeUseCategory(b-form-selectセレクトタブで使用する)', () => {
    it('確認', () => {
      const select_value  = getters.getters.homeUseCategory(state)
      expect(select_value.length).toBe(3)
      expect(select_value[0].text).toBe('食べ物')
      expect(select_value[0].value.length).toBe(3)
      expect(select_value[0].value[0]).toBe('ご飯')
      expect(select_value[0].value[1]).toBe('おやつ')
      expect(select_value[0].value[2]).toBe('飲み物')
      expect(select_value[1].text).toBe('医療')
      expect(select_value[1].value.length).toBe(2)
      expect(select_value[1].value[0]).toBe('医者')
      expect(select_value[1].value[1]).toBe('市販')
      expect(select_value[2].text).toBe('その他')
      expect(select_value[2].value.length).toBe(2)
      expect(select_value[2].value[0]).toBe('生理用品')
      expect(select_value[2].value[1]).toBe('日用品')
    })
  })

  describe('monthGoodsArray', () => {
    it('確認', () => {
      const month_goods = getters.getters.monthGoodsArray(state)
      expect(month_goods(0).length).toBe(2)
      expect(month_goods(0)[0].goods_name).toBe('ロイヤルカナン')

      expect(month_goods(1).length).toBe(1)
      expect(month_goods(1).[0].goods_name).toBe('爪切り')

      expect(month_goods(2).length).toBe(1)
      expect(month_goods(2)[0].goods_name).toBe('トイレシート')
    })
  })

  describe('monthLastGoods', () => {
    it('確認', () => {
      const last_goods = getters.getters.monthLastGoods(state, getters.getters)
      expect(last_goods(0)).toBe('最後のお買い物はロイヤルカナン')
    })
  })

  describe('yearAndMonth', () => {
    let formatYear = 'YYYY'
    let formatMonth = 'MM'
    it('確認', () => {
      const year = this_month.getFullYear()
      const month = 1 + this_month.getMonth()
      const last_month_year = last_month.getFullYear()
      const last_month_month = 1 + last_month.getMonth()

      const format_string = getters.getters.yearAndMonth(state)
      const year_string = formatYear.replace(/YYYY/g, year)
      expect(format_string(0)[0]).toBe(year_string)
      expect(format_string(0)[1]).toBe('今月')

      const last_month_year_string = formatYear.replace(/YYYY/g, last_month_year)
      const last_month_month_string = formatMonth.replace(/MM/g, last_month_month)
      expect(format_string(1)[0]).toBe(last_month_year_string)
      expect(format_string(1)[1]).toBe(`${last_month_month_string}月`)
    })
  })

  describe('priceMonthGoodsArray', () => {
    it('確認', () => {
      const total_price = getters.getters.priceMonthGoodsArray(state, getters.getters)

      expect(total_price(0)).toBe(5800)
    })
  })

  describe('preveTrueOrFalse', () => {
    it('確認', () => {
      const prevBtn = getters.getters.preveTrueOrFalse(state)
      expect(prevBtn(0)).toBe(true)
      expect(prevBtn(2)).toBe(false)
    })
  })
})
