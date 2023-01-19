<template>
  <section
  :id="data.slug_id"
  class="py-5 fe-section fe-wrapper">
    <div
    v-if="body.card_title"
    class="fs-title-2 fw-700 font-title mb-2">
      {{ body.card_title }}
    </div>
    <div
    v-if="body.card_title"
    class="fe-separator mb-5"/>
    <div class="row mx-0">
      <div
      v-for="(row, index) in (body.component_items || [])"
      :key="index"
      class="col col-12 col-sm-12 col-md-6 px-0 mb-4">
        <a
        :href="row.url"
        :disabled="!row.url"
        class="row mx-0 text-black">
          <div class="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-2 px-5 px-md-0">
            <div class="d-flex justify-content-center">
              <img
              draggable="false"
              alt=""
              class="avatar-thumb mb-3"
              :src="assetUrl + row.image"/>
            </div>
            <div
            v-if="row.image_label"
            class="fs-content-1 d-none d-md-block fw-700 mb-1 w-100 text-center">
                {{ row.image_label }}
              </div>
          </div>
          <div class="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-10 d-flex pl-0 pl-md-3 pr-0">
            <div class="w-100 my-auto text-center text-md-left">
              <div
              v-if="row.text"
              class="fs-subtitle-2 fw-700 mb-1">
                {{ row.text }}
              </div>
              <div
              v-if="row.top_description"
              class="fs-content-1 fw-600">
                {{ row.top_description }}
              </div>
              <div class="d-flex justify-content-center justify-content-md-start">
                <div
                v-if="((row.text || row.top_description) && row.bottom_description)"
                class="fe-separator my-2"/>
              </div>
              <div
              v-if="row.bottom_description"
              class="fs-content-1 fw-600"
              v-html="row.bottom_description"/>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SectionProfileMiniThumb',
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