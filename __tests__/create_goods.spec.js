import {shallowMount, createLocalVue } from '@vue/test-utils'
import GoodsCreateModal from '@/components/Home/GoodsCreateModal'
import Vuex from 'vuex'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(Vuex, BootstrapVue)
jest.mock('axios')

describe('GoodsCreateModalのテスト', () => {
  let wrapper
  let createComp
  let homeUseCategory
  let store
  let state
  let actions

  homeUseCategory = [
    {text: '食べ物', value: ['ご飯', 'おやつ']},
    {text: '散歩用品', value: ['リード', 'うんち袋', '首輪']},
    {text: 'その他', value: ['車外うんちカバー']}
  ]
  beforeEach(() => {
    state = {
      goods: []
    }

    actions = {
      fetchCreateGoods: jest.fn()
    }

    store = new Vuex.Store({
      state,
      actions
    })

    createComp = propsData => shallowMount(GoodsCreateModal, { propsData,
      data() {
        return {
          error: '',
          date: null
        }
      },
      mocks: {
        $store: store
      }
     })
  })

  describe('mount時にpropsの初期データを代入している', () => {
    beforeEach(() => {
      wrapper = createComp({homeUseCategory, selected: null, subCategories: null, dateValue: '', goods_name: '', goods_price: ''})
    })
    it('初期にpropsにデータが入っているか', () => {
      expect(wrapper.vm.homeUseCategory.length).toBe(3)
      expect(wrapper.vm.homeUseCategory[0].text).toBe('食べ物')
      expect(wrapper.vm.homeUseCategory[0].value[1]).toBe('おやつ')
      expect(wrapper.vm.homeUseCategory[2].text).toBe('その他')
      expect(wrapper.vm.homeUseCategory[2].value[0]).toBe('車外うんちカバー')
      expect(wrapper.vm.homeUseCategory[2].value[0]).not.toBe('車外おしっこカバー')
    })

    it('goodsの値を代入してpropsに適切な値が入っているか', () => {
      wrapper.setProps({ selected: 'おやつ', goods_name: 'かむかむガム', goods_price: 800, dateValue: '2021-01-09'})
      expect(wrapper.vm.selected).toBe('おやつ')
      expect(wrapper.vm.goods_name).toBe('かむかむガム')
      expect(wrapper.vm.goods_price).toBe(800)
      expect(wrapper.vm.dateValue).toBe('2021-01-09')
      expect(wrapper.vm.goods_name).not.toBe('噛むんだガム')
    })

    it('axios.postのurlと引数に適切な値が入っているか', () => {
      wrapper.setProps({ selected: 'おやつ', goods_name: 'かむかむガム', goods_price: 800, dateValue: '2021-01-09'})
      wrapper.find('#goods-create').trigger('click')
      wrapper.setData({ date: wrapper.vm.dateParse(wrapper.vm.dateValue) })
      wrapper.vm.$nextTick(() => {
        wrapper.vm.dateParse(wrapper.vm.dateValue)
        expect(axios.post).toHaveBeenCalledWith('/api/v1/goods', { goods_name: wrapper.vm.goods_name, price: wrapper.vm.goods_price, create_day: wrapper.vm.date, sub_category_name: wrapper.vm.selected})
        done()
      })
    })

    it('actions.dispatchが正しく動作しているか', () => {
      wrapper.setProps({ selected: 'おやつ', goods_name: 'かむかむガム', goods_price: 800, dateValue: '2021-01-09'})
      wrapper.find('#goods-create').trigger('click')
      wrapper.setData({ date: wrapper.vm.dateParse(wrapper.vm.dateValue) })
      wrapper.vm.$store.dispatch('fetchCreateGoods', { id: 1, goods_name: wrapper.vm.goods_name, price: wrapper.vm.goods_price, create_day: wrapper.vm.date, sub_category: wrapper.vm.selected, category: '食べ物' })
      expect(actions.fetchCreateGoods).toHaveBeenCalledWith(expect.any(Object), { id: 1, goods_name: 'かむかむガム', price: 800, create_day: '2021/1/9 0:00:00', sub_category: 'おやつ', category: '食べ物' })
    })

    it('$emit childSuccessMessageが発動するか', () => {
      wrapper.setProps({ selected: 'おやつ', goods_name: 'かむかむガム', goods_price: 800, dateValue: '2021-01-09'})
      wrapper.find('#goods-create').trigger('click')
      wrapper.vm.$emit('childSuccessMessage', `${wrapper.vm.goods_name}を追加しました`)
      expect(wrapper.emitted().childSuccessMessage).toBeTruthy()
      expect(wrapper.emitted().childSuccessMessage[0]).toStrictEqual(['かむかむガムを追加しました'])
    })
  })
})

describe('actions.fetchCreateGoodsのテスト', () => {
  let store
  let state
  let mutations
  let actions
  it('stateに的確な値が入っているか', () => {
    state = {
      goods: []
    }
    mutations = {
      createGoods(state, { id: id, goods_name: goods_name, price: price, create_day: create_day, sub_category: sub_category, category: category }) {
        let get_goods = { id: id, goods_name: goods_name, price: price, create_day: create_day, sub_category: sub_category, category: category }
        state.goods.unshift(get_goods)
      }
    }
    actions = {
      fetchCreateGoods( {commit}, { id: id, goods_name: goods_name, price: price, create_day: create_day, sub_category: sub_category, category: category }) {
        commit('createGoods', { id: id, goods_name: goods_name, price: price, create_day: create_day, sub_category: sub_category, category: category })
      }
    }
    store = new Vuex.Store({
      state,
      mutations,
      actions
    })
    expect(state.goods).toStrictEqual([])
    expect(state.goods.length).toBe(0)
    store.dispatch('fetchCreateGoods', { id: 1, goods_name: '強靭なリード', price: 1000, create_day: '2021/1/9 0:00:00', sub_category: 'リード', category: '散歩'})

    expect(state.goods.length).toBe(1)
    expect(state.goods[0].id).toBe(1)
    expect(state.goods[0].goods_name).toStrictEqual('強靭なリード')
    expect(state.goods[0].price).toBe(1000)
    expect(state.goods[0].create_day).toStrictEqual('2021/1/9 0:00:00')
    expect(state.goods[0].sub_category).toStrictEqual('リード')
    expect(state.goods[0].category).toStrictEqual('散歩')

  })
})
