import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import storeConfig from '@/store/store'

let localVue = createLocalVue()
localVue.use(Vuex)

describe('Vuexのテスト', () => {
  it('仮テスト', () => {
    const store = storeConfig
    console.log(store.state.goods)
  })
})
