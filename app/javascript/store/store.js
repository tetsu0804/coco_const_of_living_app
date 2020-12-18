import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categorySubCategoryArray: [],
    categoryNameArray: [],
  },
  getters: {
    categoryAndSub(state) {
      return state.categorySubCategoryArray
    },
    subCategoryIndex(state) {
      return index => {
        if(state.categorySubCategoryArray[index]) {
          return state.categorySubCategoryArray[index].sub
        } else {
          return
        }
      }
    }
  },
  mutations: {
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
    },
    deleteCategory(state, category) {
      state.categorySubCategoryArray = state.categorySubCategoryArray.filter( result => {
        if(result.category !== category) {
          return result
        }
      })

      state.categoryNameArray = state.categoryNameArray.filter( result => {
        if(result !== category) {
          return result
        }
      })
    },
    deleteSubCategory(state, { subCategory: subCategory, index: index }) {
      state.categorySubCategoryArray[index].sub = state.categorySubCategoryArray[index].sub.filter(result => {
        if(result !== subCategory) {
          return result
        }
      })
    },
    deleteAllCategory( state ) {
      state.categorySubCategoryArray.splice(0, state.categorySubCategoryArray.length)
      state.categoryNameArray.splice(0, state.categoryNameArray.length)
    }
  },
  actions: {
    fetchCreateCategorySubCategory( {commit}, {category: category, sub: sub} ) {
      commit('createCategorySubCategory', {category: category, sub: sub})
    },
    fetchDeleteCategory({ commit }, category) {
      commit('deleteCategory', category)
    },
    fetchDeleteSubCategory({ commit }, { subCategory: subCategory, index: index }) {
      commit('deleteSubCategory', { subCategory: subCategory, index: index })
    },
    fetchDeleteAllCategory({ commit }) {
      commit('deleteAllCategory')
    }
  },
  plugins: [
    createPersistedState(
      { key: "coco_const_of_living_app"}
    )
  ]
})
