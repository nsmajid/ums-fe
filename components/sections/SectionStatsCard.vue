<template>
  <section
  :id="data.slug_id"
  class="py-5 fe-section fe-wrapper">
    <div class="mt-5 top-15 z-index-1 w-100 px-section-stats">
      <div class="row justify-content-center">
        <div 
        v-for="(row, index) in (body.component_items || [])"
        :key="index"
        class="col col-6 col-sm-6 col-md-4 pb-2 pb-md-4 pb-lg-5 px-1 px-md-2 px-lg-3 px-xl-4">
          <a
          :href="row.url"
          :disabled="!row.url"
          class="card text-black bg-light-blue mb-4 border-primary box-shadow h-100">
            <div class="card-body">
              <div class="d-flex justify-content-center d-sm-inline-flex justify-content-sm-start">
                <div class="fs-3 pb-2 fe-bottom-separator-full-width fw-700">
                  {{ row.number }}
                </div>
              </div>
              <div class="fs-subtitle-1 fs-sm-title-2 fw-700 font-title mt-3 mt-sm-5 mb-0 mb-sm-3 d-flex justify-content-center d-sm-block">{{ row.text }}</div>
              <p class="fs-content-1 fw-600 d-none d-sm-block">{{ row.description }}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SectionStatsCard',
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  computed: {
    body() {
      return this.data.body;
    }
  }
}
</script>