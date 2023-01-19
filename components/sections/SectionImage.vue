<template>
  <section
  :id="data.slug_id"
  class="fe-wrapper fe-section">
    <div class="py-5 d-flex justify-content-center flex-wrap">
      <img
      alt=""
      class="w-75 mx-5"
      :src="assetUrl + body.image"/>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SectionImage',
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  computed: {
    assetUrl() {
      return this.$store.getters['page/getAssetUrl'];
    },
    body() {
      return this.data.body;
    }
  }
}
</script>