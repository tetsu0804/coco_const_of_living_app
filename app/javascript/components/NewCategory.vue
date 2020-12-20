<template>
  <div class="all-body">
    <b-row>
      <b-col class="title">カテゴリ作成</b-col>
    </b-row>

    <b-row v-if="error_message">
      <b-alert class="text-center" variant="danger" >{{ error_message }}</b-alert>
    </b-row>

    <b-form @submit="createCategory">
      <b-row>
        <b-col cols="4">
          <b-form-group
            id="input-group-1"
            label="カテゴリ名:"
            label-for="input-1"
            class="text-white"
          >
            <b-form-input
              id="input-1"
              v-model="categoryName"
              type="text"
              placeholder="食べ物"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="4" class="ml-2">
          <b-form-group
            id="input-group-2"
            label="サブカテゴリ名:"
            label-for="input-2"
            class="text-white"
          >
            <b-form-input
              id="input-2"
              v-model="subCategoryName"
              type="text"
              placeholder="おやつ"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="3" class="text-center category-btn pl-0">
          <b-button class="border-white" type="submit" variant="success">登録</b-button>
        </b-col>
      </b-row>
    </b-form>

      <b-row class="mt-5">
        <b-col class="text-white">カテゴリ一覧</b-col>
      </b-row>

      <b-row>
        <b-col cols="12">
          <b-list-group class="list-group-horizontal mt-1">
            <b-list-group-item v-for="(result, index) in categoryAndSub" :key="result.category" class="text-info rounded mr-2 text-center">{{ result.category }}
              <br>
              <b-button class="mt-1" size="sm" variant="success" v-on:click="subCategoryDisplay(index)">
                <b-icon icon="justify" aria-hidden="true"></b-icon>
              </b-button>
              <b-button class="mt-1" size="sm" variant="danger" v-on:click="deleteCategory(result.category)">
                <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
              </b-button>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>


      <b-row class="mt-5">
        <b-col class="text-white">サブカテゴリ一覧</b-col>
      </b-row>
      <b-list-group class="list-group-horizontal mt-1">
       <b-list-group-item class="text-info mr-3 rounded text-center" v-for="sub in subCategoryIndex(categoryIndex)" :key="sub">{{ sub }}
       <br>
       <b-button  class="mt-1" variant="danger" v-on:click="deleteSub(sub, categoryIndex)">
         <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
       </b-button>
       </b-list-group-item>
     </b-list-group>
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

<style scoped>
  .category-btn {
    padding-top: 30px;
  }
</style>
