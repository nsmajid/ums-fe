<template>
  <section
  :id="data.slug_id"
  class="fe-section">
    <div class="w-100 position-relative study-profile">
      <img
      class="w-100 banner-image fe-fit-cover"
      alt=""
      style="min-height: 16vh;"
      draggable="false"
      :src="assetUrl + body.banner"/>
      <div class="w-100 fe-wrapper position-absolute banner-content">
        <div class="row mx-0 px-1 px-lg-3 py-3 py-lg-4 bg-light-gray fe-shadow rounded">
          <div class="col col-4 col-md-4 col-xl-3 border-separator">
            <div class="fs-content-2 fs-md-subtitle-2 fw-400">{{ body.code_label }}</div>
            <div class="fs-subtitle-2 fs-md-title-2 fw-700">{{ body.code }}</div>
          </div>
          <div class="col col-6 col-md-6 col-xl-8">
            <div class="fs-content-2 fs-md-subtitle-2 fw-400">{{ body.name_label }}</div>
            <div class="fs-subtitle-2 fs-md-title-2 fw-700">{{ body.name }}</div>
          </div>
          <div class="col col-2 col-md-2 col-xl-1 d-flex align-items-center justify-content-end">
            <div>
              <div class="fs-subtitle-2 fs-md-title-1 fw-700 text-center">{{ body.sks }}</div>
              <div class="fs-content-2 fs-md-subtitle-2 fw-400 text-center">{{ body.sks_label }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SectionStudyProfile',
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