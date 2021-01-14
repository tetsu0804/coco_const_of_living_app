<template>
  <div>
    <b-row>
      <b-col class="mt-5 h3 text-center text-white">
        <slot name="monthDisplay">
        </slot>
      </b-col>
    </b-row>

    <slot>
    </slot>
  </div>
</template>

<script>
  export default {

  }
</script>
