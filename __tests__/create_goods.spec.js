import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Home from '@/components/Home'

const homeLocalVue = createLocalVue()

homeLocalVue.use(Vuex)

describe('Home成功', () => {
  let storeOptions
  let store

  beforeEach(() => {
    storeOptions = {
      state: {
        categorySubCategoryArray: [{ category: '健康', sub: ['医者代', '市販薬']}],
        categoryNameArray: [],
        goods: []
      },
      getters: {
        homeUseCategory: jest
      }
    }
  })
})
