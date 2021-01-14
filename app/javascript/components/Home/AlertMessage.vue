<template>
  <div>
    <b-row v-if="success_message">
      <b-col class="mt-2"><b-alert show variant="success">
        {{ success_message }}
      </b-alert></b-col>
    </b-row>

    <b-row v-if="error_message">
      <b-col class="mt-2"><b-alert show variant="danger">
        {{ error_message }}
      </b-alert></b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    props: ["success_message", "error_message"]
  }
</script>
