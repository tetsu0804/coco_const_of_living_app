export default {
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
    },
    homeUseCategory(state) {
      let categories = []
      state.categorySubCategoryArray.forEach( result => {
        let valueText = { value: result.sub, text: result.category }
        categories.push(valueText)
      })
      return categories
    },
    monthGoodsArray(state) {
      return (this_number) => {
        let basic_date = new Date
        if(this_number > 0) {
            let change_date = new Date(basic_date.setMonth(-this_number))
          let get_month = state.goods.filter(result => {
            let change_date_object = new Date(result.create_day)
            let change_month = change_date_object.getMonth()
            let change_year = change_date_object.getFullYear()
            if(change_year === change_date.getFullYear() && change_month === change_date.getMonth()) {
              return result
            }
          })
          return get_month
        } else {
          let this_month_date = new Date(basic_date.setMonth(this_number))
            let get_this_month = state.goods.filter(result => {

              let date_object = new Date(result.create_day)

              let this_month = date_object.getMonth()
              let this_year = date_object.getFullYear()

              if(this_year === this_month_date.getFullYear() && this_month === this_month_date.getMonth()) {
                return result
              }
            })
            return get_this_month
        }
      }
    },
    monthLastGoods(state, getters) {
      return (this_number) => {
        let this_month = getters.monthGoodsArray(this_number)

        if(this_month.length > 0) {
          let last_goods = this_month.slice(0, 1)
          return `最後のお買い物は${last_goods[0].goods_name}`
        } else {
           return '登録されていません。'
        }
      }
    },
    yearAndMonth(state) {
      return (this_number) => {
        let yearOfMonthArray = []
        let date = new Date
        let change_date_number = date.setMonth(-this_number)
        let change_date = new Date(change_date_number)
        let format_year_date = 'YYYY'
        let format_month_date = 'MM月'
        let year_string
        let month_string

        if(this_number !== 0) {
          year_string = change_date.getFullYear()
          month_string = 1+ change_date.getMonth()

          yearOfMonthArray.push(format_year_date.replace(/YYYY/g, year_string))
          yearOfMonthArray.push(format_month_date.replace(/MM/g, month_string))
        } else {
          year_string = change_date.getFullYear()

          yearOfMonthArray.push(format_year_date.replace(/YYYY/g, year_string))
          yearOfMonthArray.push('今月')
        }
        return yearOfMonthArray
      }
    },
    priceMonthGoodsArray(state, getters) {
      return (this_number) => {
          let month_total_price = 0
          let month_goods_array = getters.monthGoodsArray(this_number)
          month_goods_array.forEach(result => {
            month_total_price += result.price
          })
          return month_total_price
      }
    },
    preveTrueOrFalse(state) {
      let today = new Date
      let last_goods = state.goods.slice(state.goods.length -1, state.goods.length)
      let last_goods_date = new Date(last_goods[0].create_day)
      let last_goods_month_number = last_goods_date.getFullYear() * 12 + last_goods_date.getMonth()
      let today_month_number = today.getFullYear() * 12 + today.getMonth()
      let difference_month_number = today_month_number - last_goods_month_number

      return (this_number) => {
        if(this_number === difference_month_number) {
          return false
        } else {
          return true
        }
      }
    }
  }
}
