<template>
  <section
  :id="data.slug_id"
  class="py-5 fe-section fe-wrapper">
    <div class="mt-5 top-15 z-index-1 w-100 px-section-stats">
      <div class="row justify-content-center">
        <div 
        v-for="(row, index) in (body.component_items || [])"
        :key="index"
        class="col col-6 col-sm-6 col-md-4 pb-2 pb-md-4 pb-lg-5 px-1 px-md-2 px-lg-4">
          <a
          :href="row.url"
          :disabled="!row.url"
          class="card text-black bg-light-blue mb-4 border-primary box-shadow h-100">
            <img
            draggable="false"
            v-if="row.image"
            :src="assetUrl + row.image"
            alt=""
            class="card-img-top">
            <div class="card-body">
              <div class="fs-subtitle-1 fw-700 font-title mb-3 d-block">{{ row.text }}</div>
              <p class="fs-content-1 fw-600" v-html="row.description"/>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SectionStatsCardImage',
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