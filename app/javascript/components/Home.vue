<template>
  <div>

    <b-row>
      <b-col class="mt-5 h3 text-center text-white">{{yearAndMonth(num)[1]}}の合計金額 ({{ yearAndMonth(num)[0]}})</b-col>
    </b-row>

    <b-row>
      <b-col cols="2" md="3" class="d-flex align-items-center justify-content-end">
        <b-icon icon="arrow-left-circle-fill" scale="3" variant="white" v-on:click="nextMonth" v-if="nextHideOrDisplay"></b-icon>
      </b-col>
      <b-col cols="8" md="6" class="text-center">
        <b-col class="display-2 text-white">{{ priceMonthGoodsArray(num)}}円</b-col>
      </b-col>
      <b-col cols="2" md="3" class="d-flex align-items-center  justify-content-start">
        <b-icon icon="arrow-right-circle-fill" scale="3" variant="white" v-on:click="prevMonth" v-if="prevHideOrDisplay"></b-icon>
      </b-col>
    </b-row>

    <b-row v-if="success_message">
      <b-col><b-alert show variant="success">{{ success_message }}</b-alert></b-col>
    </b-row>

    <b-row v-if="error_message">
      <b-col><b-alert show variant="danger">{{ error_message }}</b-alert></b-col>
    </b-row>

    <b-row>
      <b-col sm="12" offset-md="1" md="10" offset-lg="2" lg="8" class="mt-5">
          <b-button block class="add-btn" v-b-modal.modal-no-backdrop   variant="success">追加</b-button>
      </b-col>
    </b-row>

    <b-row>
      <b-col offset="7" offset-xl="8" class="mt-2">
        <router-link to="#" class="text-white" style="text-decoration: none;">{{ monthLastGoods(num) }}</router-link>
      </b-col>
    </b-row>
    <GoodsCreateModal
      :homeUseCategory="homeUseCategory"
      :selected="selected"
      :subCategories="subCategories"
      :dateValue="dateValue"
      :goods_price="goods_price"
      :goods_name="goods_name"
      v-on:childSuccessMessage="MessageSuccess"
      v-on:childErrorMessage="MessageError"
    ></GoodsCreateModal>
    <b-row>
      <router-link to='/new_category' exact tag='button' class="bg-success text-white border-white rounded">new Category </router-link>
    </b-row>

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
        error_message: '',
        this_date: new Date,
        this_month: null,
        this_year: null,
        num: 0,
      }
    },
    created() {

    },
    computed: {
      prevHideOrDisplay() {
        return this.prv = this.preveTrueOrFalse(this.num)
      },
      nextHideOrDisplay() {
        if(this.num === 0) {
          return false
        } else {
          return true
        }
      },
      ...mapGetters(['homeUseCategory', 'monthGoodsArray', 'priceMonthGoodsArray', 'monthLastGoods', 'yearAndMonth', 'preveTrueOrFalse'])},
    mounted() {
this.preveTrueOrFalse(this.num)
    },
    methods: {
      MessageSuccess(e) {
        this.success_message = e
      },
      MessageError(e) {
        this.error_message = e
      },
      prevMonth() {
        this.num ++
      },
      nextMonth() {
        this.num --
      }
    }
  }
</script>

<style scoped>
  .add-btn {
    border: 1px solid rgb(255, 255, 255);
  }
</style>
