<template>
  <div>
    <b-row>
      <b-col cols="2" md="3" class="d-flex align-items-center justify-content-end">
        <b-icon icon="arrow-left-circle-fill" scale="3" variant="white" v-on:click="nextMonth" v-if="nextBtn"></b-icon>
      </b-col>

      <b-col cols="8" md="6" class="text-center">
        <b-col class="display-2 text-white">
          {{ monthPrice }}円
        </b-col>
      </b-col>

      <b-col cols="2" md="3" class="d-flex align-items-center  justify-content-start">
        <b-icon icon="arrow-right-circle-fill" scale="3" variant="white" v-on:click="prevMonth" v-if="prevBtn"></b-icon>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    props: ['priceMonthGoodsArray', 'num', 'prevHideOrDisplay', 'nextHideOrDisplay'],
    computed: {
      monthPrice() {
        return this.priceMonthGoodsArray(this.num)
      },
      prevBtn() {
        return this.prevHideOrDisplay
      },
      nextBtn() {
        return this.nextHideOrDisplay
      }
    },
    methods: {
      prevMonth() {
        this.$emit('numPlus', 1)
      },
      nextMonth() {
        this.$emit('numPull', 1)
      }
    }
  }
</script>
