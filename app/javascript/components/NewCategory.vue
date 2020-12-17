<template>
  <div>
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
      <li v-for="(result, index) in categoryAndSub" :key="result.category" v-on:click="subCategoryDisplay(index)">{{ result.category }} <button v-on:click="deleteCategory(result.category)">削除</button></li>

    </ul>

    <ul>
      <li v-for="sub in subCategoryIndex(categoryIndex)" :key="sub">{{ sub }} <button v-on:click="deleteSub(sub, categoryIndex)">削除</button></li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        categoryName: '',
        subCategoryName: '',
        categoryIndex: 0,
      }
    },
    computed: mapGetters(['categoryAndSub', 'subCategoryIndex']),
    mounted() {
    },
    methods: {
      createCategory() {
        this.$store.dispatch('fetchCreateCategorySubCategory', { category: this.categoryName, sub: this.subCategoryName })
      },
      deleteCategory(result) {
        this.$store.dispatch('fetchDeleteCategory', result)
      },
      subCategoryDisplay(index) {
        this.categoryIndex = index
        return this.subCategoryIndex(this.categoryIndex)
      },
      deleteSub(result, index) {
        this.$store.dispatch('fetchDeleteSubCategory', { subCategory: result, index: index })
      }
    }
  }
</script>
