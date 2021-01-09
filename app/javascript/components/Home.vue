<template>
  <div>
  home
    <router-link to='/new_category' exact tag='button'>new Category </router-link>
    <b-row v-if="success_message">
      <b-col><b-alert show variant="success">{{ success_message }}</b-alert></b-col>
    </b-row>

    <b-row v-if="error_message">
      <b-col><b-alert show variant="danger">{{ error_message }}</b-alert></b-col>
    </b-row>

    <b-row>
      <b-col sm="12" offset-md="1" md="10" offset-lg="2" lg="8">
          <b-button block class="add-btn" v-b-modal.modal-no-backdrop   variant="success">追加</b-button>
      </b-col>
    </b-row>

    <GoodsCreateModal
      :homeUseCategory="homeUseCategory"
      :selected="selected"
      :subCategories="subCategories"
      :dateValue="dateValue"
      :goods_price="goods_price"
      :goods_name="goods_name"
      :error_message="error_message"
      v-on:childSuccessMessage="MessageSuccess"
      v-on:childErrorMessage="MessageError"
    ></GoodsCreateModal>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import GoodsCreateModal from './Home/GoodsCreateModal.vue'

  export default {
    components: {
      GoodsCreateModal
    },
    data() {
      return {
        selected: null,
        subCategories: null,
        categories: '',
        goods_name: '',
        goods_price: '',
        dateValue: '',
        success_message: '',
        error_message: ''
      }
    },
    computed: mapGetters(['homeUseCategory']),
    mounted() {
    },
    methods: {
      MessageSuccess(e) {
        this.success_message = e
      },
      MessageError(e) {
        this.error_message = e
      }
    }
  }
</script>

<style scoped>
  .add-btn {
    border: 1px solid rgb(255, 255, 255);
  }
</style>
