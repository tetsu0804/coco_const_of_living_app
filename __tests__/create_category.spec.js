import { mount, createLocalVue } from '@vue/test-utils'
import NewCategory from '@/components/NewCategory'
import Vuex from 'vuex'
import configStore from '@/store/store'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(Vuex, BootstrapVue)
jest.mock('axios')

describe('NewCateogryテスト', () => {
  describe('beforeEachでmountしている', () => {
    let wrapper
    let store
    let state
    let getters
    let actions

    beforeEach(() => {
      state = {
        categorySubCategoryArray: [
          { category: '食べ物', sub: ['ご飯', 'おやつ']}
        ]
      }

      getters = {
        categoryAndSub: () => state.categorySubCategoryArray,
        subCategoryIndex: () => {
          return index => {
            return state.categorySubCategoryArray[index]
          }
        }
      }

      actions = {
        createCategorySubCategory: jest.fn()
      }

      store = new Vuex.Store({
        state,
        getters,
        actions
      })

      wrapper = mount(NewCategory, { store, localVue,
        data() {
          return {
            categoryName: '',
            subCategoryName: '',
            categoryIndex: 0,
            error_message: ''
          }
        }
      })
    })

    describe('Vuexの値がhtmlに適切に反映されているか', () => {
      it('カテゴリ一覧に適切な値があるか', () => {
        const categories = wrapper.find('.categories')
        expect(categories.text()).not.toContain('医療')
        expect(categories.text()).toContain('食べ物')
      })

      it('サブカテゴリ一覧に適切な値が反映されているか', () => {
        const subcategories = wrapper.find('.subcategories')
        expect(subcategories.text()).not.toContain('飲み物')
        expect(subcategories.text()).toContain('ご飯')
        expect(subcategories.text()).toContain('おやつ')
      })
    })

    describe('関数が呼ばれているか', () => {
      it('axios.postが呼ばれていてactionsも発動する', () => {
        wrapper.setData({
          categoryName: '生活用品',
          subCategoryName: 'ペットシート'
        })
        const div_btn = wrapper.find('.div-category-create-btn')

        div_btn.find('#category-create').trigger('submit')
        wrapper.vm.$nextTick(() => {
          expect(axios.post).toHaveBeenCalledWith('/api/v1/category', { category_name: wrapper.vm.categoryName, sub_category_name: wrapper.vm.subCategoryName})
          done()
        })

        wrapper.vm.$store.dispatch('createCategorySubCategory', { category: wrapper.vm.categoryName, sub: wrapper.vm.subCategoryName})
        expect(actions.createCategorySubCategory).toHaveBeenCalledWith(expect.any(Object), {category: '生活用品', sub: 'ペットシート'})
      })
    })
  })
})

describe('actions.fetchCreateCategorySubCategoryのテスト', () => {
  let store
  let state
  let mutations
  let actions
  it('実際にstateに値が入っているか', () => {
    state = {
      categorySubCategoryArray: [],
      categoryNameArray: []
    }

    mutations = {
      createCategorySubCategory(state, {category: category, sub: sub}) {
        let categoryName = {category: category, sub: []}
        categoryName.sub.push(sub)
        // state.categorySubCategoryArrayがあるか？
        if(state.categorySubCategoryArray.length > 0) {
          // categoryNameArrayに state.categoryName.category が無ければ カテゴリとサブカテを入れる
          if(!state.categoryNameArray.includes(categoryName.category)) {
            state.categoryNameArray.push(categoryName.category)
            state.categorySubCategoryArray.push(categoryName)
          } else {
            // カテゴリがあるならば、カテゴリのサブが無ければ入れる
            for(let i = 0; i < state.categorySubCategoryArray.length; i++) {
              if(state.categorySubCategoryArray[i].category === categoryName.category) {
                if( !state.categorySubCategoryArray[i].sub.includes(categoryName.sub[0])) {
                  state.categorySubCategoryArray[i].sub.push(categoryName.sub[0])
                }  else {
                  return
                }
              }
            }
          }
        } else {
          state.categoryNameArray.push(categoryName.category)
          state.categorySubCategoryArray.push(categoryName)
        }
      }
    }

    actions = {
      fetchCreateCategorySubCategory( {commit}, {category: category, sub: sub} ) {
        commit('createCategorySubCategory', {category: category, sub: sub})
      }
    }

    store = new Vuex.Store({
      state,
      mutations,
      actions
    })
    expect(state.categorySubCategoryArray).toStrictEqual([])
    expect(state.categorySubCategoryArray.length).toBe(0)

    store.dispatch('fetchCreateCategorySubCategory', { category: '食べ物', sub: 'おやつ'})
    expect(state.categorySubCategoryArray.length).toBe(1)
    expect(state.categorySubCategoryArray[0].category).toStrictEqual('食べ物')
    expect(state.categorySubCategoryArray[0].sub[0]).toStrictEqual('おやつ')
  })
})
