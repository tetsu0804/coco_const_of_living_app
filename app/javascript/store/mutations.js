export default {
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
    createGoods(state, { id: id, goods_name: goods_name, price: price, create_day: create_day, sub_category: sub_category, category: category }) {
      let get_goods = { id: id, goods_name: goods_name, price: price, create_day: create_day, sub_category: sub_category, category: category }
      state.goods.unshift(get_goods)
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
    deleteAllCategory(state) {
      state.categorySubCategoryArray.splice(0, state.categorySubCategoryArray.length)
      state.categoryNameArray.splice(0, state.categoryNameArray.length)
    },
    deleteGoodsId(state, id) {
      state.goods = state.goods.filter( result => {
        if( id !== result.id) {
          return result
        }
      })
    },
    deleteAllGoos(state) {
      state.goods.splice(0, state.goods.length)
    }
  }
}
