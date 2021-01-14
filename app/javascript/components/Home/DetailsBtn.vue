<template>
  <div>
    <b-row>
      <b-col offset="7" offset-xl="8" class="mt-2">
        <router-link to="#" class="text-white" style="text-decoration: none;">{{ lastGoods }}</router-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    props: ["monthLastGoods", "num"],
    computed: {
      lastGoods() {
        return this.monthLastGoods(this.num)
      }
    }
  }
</script>
