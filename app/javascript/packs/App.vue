<template>
  <div id="app" class="all-body">
    <b-container>
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  html {
    background: rgb(0, 171, 255);
  }

  .all-body {
    background: rgb(0, 171, 255);
  }

  .title {
    text-align: center;
    color: rgb(255, 255, 255);
    font-size: 1.8rem;
    margin: 30px auto;
  }
</style>
