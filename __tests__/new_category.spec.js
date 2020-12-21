import { mount, createLocalVue} from '@vue/test-utils'
import NewCategory from '@/components/NewCategory'
import Vuex from 'vuex'
import axios from 'axios'

const localVue = createLocalVue()
localVue.use(Vuex)
jest.mock('axios')

describe('NewCategoryテスト', () => {
  let store
  let actions
  let state
  let getters
  beforeEach(() => {
    state =  {
      categorySubCategoryArray: [],
      categoryNameArray: []
    }

    getters =  {
      categoryAndSub: jest.fn((state) => {
        return state.categorySubCategoryArray
      }),
      subCategoryIndex: jest.fn((state) => {
        return index => {
          if(state.categorySubCategoryArray[index]) {
            return state.categorySubCategoryArray[index].sub
          } else {
            return
          }
        }
      })
    }

    actions = {
      fetchCreateCategorySubCategory: jest.fn((category, sub) => {
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
      })
    }

    store = new Vuex.Store({
      state,
      getters,
      actions
    })
  })

  it('成功', async () => {
    let response_create_category
    let second_response_create_category
    let response_get_category
    let second_response_get_category
    let response_category
    let second_response_category
    let third_response_create_category
    let third_response_get_category
    let third_response_category

    const new_category_wrapper = mount(NewCategory, { store, localVue,
      data() {
        return {
          categoryName: '',
          subCategoryName: '',
          categoryIndex: 0,
          error_message: ''
        }
      },
      mock() {
        $store: store
      }
    })

    new_category_wrapper.setData({
      categoryName: '生活費',
      subCategoryName: 'ベット'
    })

    new_category_wrapper.find('#category-create').trigger('submit')

    response_create_category = {category: new_category_wrapper.vm.categoryName, sub: new_category_wrapper.vm.subCategoryName}

    response_get_category = axios.post.mockResolvedValue(response_create_category)

    response_category = await response_get_category()

    actions.fetchCreateCategorySubCategory(response_category.category, response_category.sub)
    //
    expect(store.state.categorySubCategoryArray[0].category).toEqual('生活費')
    expect(store.state.categorySubCategoryArray[0].sub[0]).toEqual('ベット')


    new_category_wrapper.setData({
      categoryName: '生活費',
      subCategoryName: 'トイレシート'
    })

    new_category_wrapper.find('#category-create').trigger('submit')

    second_response_create_category = { category: new_category_wrapper.vm.categoryName, sub: new_category_wrapper.vm.subCategoryName}

    second_response_get_category = axios.post.mockResolvedValue(second_response_create_category)
    second_response_category = await second_response_get_category()

    actions.fetchCreateCategorySubCategory(second_response_category.category, second_response_category.sub)

    expect(store.state.categorySubCategoryArray.length).toBe(1)
    expect(store.state.categorySubCategoryArray[0].category).toEqual('生活費')
    expect(store.state.categorySubCategoryArray[0].sub[1]).toEqual('トイレシート')
    expect(store.state.categorySubCategoryArray[0].sub.length).toBe(2)

    new_category_wrapper.setData({
      categoryName: 'ご飯',
      subCategoryName: 'ドッグフード'
    })

    new_category_wrapper.find('#category-create').trigger('submit')

    third_response_create_category = { category: new_category_wrapper.vm.categoryName, sub: new_category_wrapper.vm.subCategoryName }
    third_response_get_category = axios.post.mockResolvedValue(third_response_create_category)
    third_response_category = await third_response_get_category()
    actions.fetchCreateCategorySubCategory(third_response_category.category, third_response_category.sub)

    expect(store.state.categorySubCategoryArray.length).toBe(2)
    expect(store.state.categorySubCategoryArray[1].category).toEqual('ご飯')
    expect(store.state.categorySubCategoryArray[1].sub[0]).toEqual('ドッグフード')
    expect(store.state.categorySubCategoryArray[1].sub.length).toBe(1)
  })
})
