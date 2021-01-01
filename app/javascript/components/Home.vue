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

    <b-row>
      <b-col>
        <b-modal id="modal-no-backdrop" hide-backdrop content-class="shadow" title="購入品追加" hide-footer>
          <b-form>
            <b-form-select v-model="subCategories" :options="categoryGetters" :select-size="4"></b-form-select>
            
            <b-form-select class="mt-2" v-model="selected" :options="subCategories" :select-size="4"></b-form-select>
            <b-row>
              <b-col> {{ selected }} </b-col>
            </b-row>

            <label for="example-datepicker" class="mt-2">購入日:</label>
            <b-form-datepicker id="example-datepicker" v-model="dateValue" class="mb-2" placeholder="クリックするとカレンダー表示"></b-form-datepicker>

            <b-row v-if="dateValue">
              <b-col>購入日: {{ dateValue }}</b-col>
            </b-row>

            <b-form-group
              id="input-group-1"
              label="値段:"
              label-for="input-1"
              class="mt-2"
            >
              <b-form-input
                id="input-1"
                v-model.lazy.number="goods_price"
                type="number"
                placeholder="1000"
                required
              ></b-form-input>
            </b-form-group>

            <b-row v-if="goods_price">
              <b-col>{{ goods_price}} 円</b-col>
            </b-row>

            <b-form-group
              id="input-group-2"
              label="商品名:"
              label-for="input-2"
              class="mt-2"
            >
              <b-form-input
                id="input-2"
                v-model.lazy="goods_name"
                type="text"
                placeholder="ロイヤルカナン 満腹感サポート 2kg"
                required
              ></b-form-input>
            </b-form-group>

            <b-row v-if="goods_name">
              <b-col>{{ goods_name }}</b-col>
            </b-row>

            <b-row>
              <b-col cols="6">
                <b-button block v-on:click="handleCancel">キャンセル</b-button>
              </b-col>
              <b-col cols="6">
                <b-button block v-on:click="handleOk" variant="success">登録</b-button>
              </b-col>
            </b-row>
          </b-form>
        </b-modal>
      </b-col>
    </b-row>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import axios from 'axios'

  export default {
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
    computed: {
      categoryGetters() {
        return this.categories = this.homeUseCategory
      },
      ...mapGetters(['homeUseCategory'])
    },
    mounted() {
    debugger
    },
    methods: {
      handleOk() {
        this.dateParse(this.dateValue)
        axios.post('/api/v1/goods', { goods_name: this.goods_name, price: this.goods_price, create_day: this.dateValue, sub_category_name: this.selected})
        .then(response => {
          this.$store.dispatch('fetchCreateGoods', { id: response.data.goods.id, goods_name: response.data.goods.goods_name, price: response.data.goods.price, create_day: response.data.goods.create_day, sub_category: response.data.sub_category, category: response.data.category })
          this.success_message = `${response.data.goods.goods_name} を追加しました。`
          this.$bvModal.hide('modal-no-backdrop')
        }).catch(error => {
          this.error_message = error.response.data || '不正な値がある可能性がある為失敗しました。'
          this.selected =  null
          this.subCategories = null
          this.categories =  ''
          this.goods_name = ''
          this.goods_price = ''
          this.dateValue = ''
          this.$bvModal.hide('modal-no-backdrop')
        })
      },
      handleCancel() {
        this.selected = null
        this.subCategories = null
        this.categories = ''
        this.goods_name = ''
        this.goods_price = ''
        this.dateValue = ''
      },
      dateParse(date) {
        let split_date = date.split('-')
        this.dateValue = new Date(`${split_date[0]} ${split_date[1]} ${split_date[2]}`).toLocaleString()
      }
    }
  }
</script>

<style scoped>
  .add-btn {
    border: 1px solid rgb(255, 255, 255);
  }
</style>
