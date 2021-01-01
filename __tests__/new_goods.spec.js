// import { mount, createLocalVue } from '@vue/test-utils'
// import Home from '@/components/Home.vue'
// import Vuex from 'vuex'
// import axios from 'axios'
// import { state, getters, mutations, actions } from '@/store/store'
//
// let goodsCreateLocalVue = createLocalVue()
// goodsCreateLocalVue.use(Vuex)
// jest.mock('axios')
//
// describe('NewGoods成功', () => {
//   let store
//   let state
//   let getters
//   let mutations
//   let actions
//
//   beforeEach(() => {
//     store = new Vuex.Store({
//       state: {
//         categorySubCategoryArray: [{ category: '健康', sub: ['医者代', '市販薬']}],
//         categoryNameArray: [],
//         goods: []
//       },
//
//       getters,
//       mutations,
//       actions,
//     })
//
//   })
//   it('成功', () => {
//     const new_goods = mount(Home, { store, goodsCreateLocalVue,
//       data() {
//         return {
//           selected: null,
//           subCategories: null,
//           categories: '',
//           goods_name: '',
//           goods_price: '',
//           dateValue: '',
//           success_message: '',
//           error_message: ''
//         }
//       }
//     })
//
//     new_goods.find('.add-btn').trigger('click')
//     new_goods.vm.$nextTick(() => {
//       console.log(new_goods.html())
//     })
//     //expect(new_goods.find('option').text()).toContain('健康')
//
//   })
// })
