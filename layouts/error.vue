<template>
  <div class="error-page">
    <div class="error-container">
      <h1>{{ error.statusCode }}</h1>
      <div v-if="error.message">
        {{ error.message }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['error'],
  layout: 'blank',
  mounted() {
    const errorMessage = new Error(`Page: ${this.error.message}`);
    if (this.$sentry) this.$sentry.captureException(errorMessage);
    if (this.$apm) this.$apm.captureError(errorMessage);
    if (this.$apmNode) this.$apmNode.captureError(errorMessage);
  },
  // computed: {
  //   errorLogResponse() {
  //     if (this.error?.errorContext) {
  //       const {config, data, status, statusText} = this.error?.errorContext || {};
  //       return JSON.stringify({config, data, status, statusText}, null, 2);
  //     }
  //     return null;
  //   }
  // }
}
</script>