<template>
  <no-ssr>
    <b-alert
    class="mb-0"
    :show="isPreview"
    dismissible
    variant="warning">
      <div class="d-flex flex-wrap align-items-center">
        <span class="mdi mdi-alert fs-10"/>
        <span class="ml-2 font-weight-bold">Halaman ini ditampilkan dalam mode preview</span>
      </div>
    </b-alert>
  </no-ssr>
</template>
<script>
export default {
  name: 'PreviewAlert',
  computed: {
    isPreview() {
      return this.$store.getters['page/pageIsPreview'];
    }
  }
}
</script>