<template>
  <div>
    <AlertMessage
      :success_message="success_message"
      :error_message="error_message"
    >
    </AlertMessage>

    <HomeChildDisplay>
      <template slot="monthDisplay">
      {{yearAndMonth(num)[1]}}の合計金額 ({{ yearAndMonth(num)[0]}})
      </template>

      <NextPrevPriceDisplay
        :priceMonthGoodsArray="priceMonthGoodsArray"
        :num="num"
        :prevHideOrDisplay="prevHideOrDisplay"
        :nextHideOrDisplay="nextHideOrDisplay"
        v-on:numPlus="num += $event"
        v-on:numPull="num -= $event"
      >
      </NextPrevPriceDisplay>
    </HomeChildDisplay>

    <b-row>
      <b-col sm="12" offset-md="1" md="10" offset-lg="2" lg="8" class="mt-5">
          <b-button block class="add-btn" v-b-modal.modal-no-backdrop   variant="success">追加</b-button>
      </b-col>
    </b-row>

    <DetailsBtn
      :monthLastGoods="monthLastGoods"
      :num="num"
    >
    </DetailsBtn>

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
  import HomeChildDisplay from './Home/HomeChildDisplay.vue'
  import NextPrevPriceDisplay from './Home/NextPrevPriceDisplay.vue'
  import AlertMessage from './Home/AlertMessage.vue'
  import DetailsBtn from './Home/DetailsBtn.vue'
  export default {
    components: {
      GoodsCreateModal,
      HomeChildDisplay,
      NextPrevPriceDisplay,
      AlertMessage,
      DetailsBtn
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
        num: 0
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
