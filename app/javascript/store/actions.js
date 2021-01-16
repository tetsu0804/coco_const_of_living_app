export default {
  actions: {
    fetchCreateCategorySubCategory( {commit}, {category: category, sub: sub} ) {
      commit('createCategorySubCategory', {category: category, sub: sub})
    },
    fetchCreateGoods( {commit}, { id: id, goods_name: goods_name, price: price, create_day: create_day, sub_category: sub_category, category: category }) {
      commit('createGoods', { id: id, goods_name: goods_name, price: price, create_day: create_day, sub_category: sub_category, category: category })
    },
    fetchDeleteCategory({commit}, category) {
      commit('deleteCategory', category)
    },
    fetchDeleteSubCategory({commit}, { subCategory: subCategory, index: index }) {
      commit('deleteSubCategory', { subCategory: subCategory, index: index })
    },
    fetchDeleteAllCategory({commit}) {
      commit('deleteAllCategory')
    },
    fetchDeleteGoodsId({commit}, id) {
      commit('deleteGoodsId', id)
    },
    fetchDeleteAllGoos({commit}) {
      commit('deleteAllGoos')
    }
  }
}
