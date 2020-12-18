<template>
  <div>
    <div v-if="error_message">{{ error_message }}</div>
    <label>カテゴリ:
      <input type="text" v-model="categoryName"></input>
    </label>
    <div> {{ categoryName }} </div>

    <label>サブカテゴリ:
      <input type="text" v-model="subCategoryName"></input>
    </label>
    <div> {{ subCategoryName }} </div>

    <button v-on:click="createCategory">登録</button>

    <ul>
      <li v-for="(result, index) in categoryAndSub" :key="result.category" >{{ result.category }} <button v-on:click="subCategoryDisplay(index)">サブカテゴリ</button> <button v-on:click="deleteCategory(result.category)">削除</button></li>
    </ul>

    <ul>
     <li v-for="sub in subCategoryIndex(categoryIndex)" :key="sub">{{ sub }} <button v-on:click="deleteSub(sub, categoryIndex)">削除</button></li>
   </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import axios from 'axios'

  export default {
    data() {
      return {
        categoryName: '',
        subCategoryName: '',
        categoryIndex: 0,
        error_message: ''
      }
    },
    computed: mapGetters(['categoryAndSub', 'subCategoryIndex']),
    mounted() {
    },
    methods: {
      createCategory() {
        axios.post('/api/v1/category', { category_name: this.categoryName, sub_category_name: this.subCategoryName})
        .then(response => {
          this.$store.dispatch('fetchCreateCategorySubCategory', { category: response.data.category.category_name, sub: response.data.sub_category.sub_category_name})
          this.categoryName = ''
          this.subCategoryName = ''
        })
      },
      deleteCategory(result) {
        axios.delete(`/api/v1/category/${result}`)
        .then(response => {
          this.$store.dispatch('fetchDeleteCategory', result)
          this.error_message = `カテゴリ: ${result} を削除しました。`
        })

      },
      subCategoryDisplay(index) {
        this.categoryIndex = index
        return this.subCategoryIndex(this.categoryIndex)
      },
      deleteSub(result, index) {
        axios.delete(`/api/v1/sub_category/${result}`)
        .then(response => {
          this.$store.dispatch('fetchDeleteSubCategory', { subCategory: result, index: index })
          this.error_message = `サブカテゴリ: ${result} を削除しました。`
        })

      }
    }
  }
</script>
