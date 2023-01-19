<template>
  <section
  :id="data.slug_id"
  class="fe-section position-relative">
    <img
    v-if="body.image_background"
    draggable="false"
    class="w-100 fe-section-bg fe-section-bg-lg"
    alt="banner"
    :src="assetUrl + body.image_background"/>
    <div :class="`${body.image_background && 'position-relative position-lg-absolute top-0 pb-inherit'} w-100 h-100 d-flex`">
      <div class="my-auto w-100 position-lg-relative">
        <div class="row justify-content-center fe-wrapper mx-0 mt-5">
          <div
          v-if="(body.image_logo || body.image_title)"
          class="col col-12 col-md-4 text-center">
            <div class="d-flex justify-content-center">
              <img
              v-if="body.image_logo"
              draggable="false"
              class="w-75 pb-inherit"
              alt=""
              :src="assetUrl + body.image_logo"/>
            </div>
            <div
            v-if="body.main_title"
            class="fs-subtitle-2 fw-700 my-2">
              {{ body.main_title }}
            </div>
            <div
            v-if="body.secondary_title"
            class="fs-content-1 fw-600 mb-2">
              {{ body.secondary_title }}
            </div>
          </div>
          <div
          v-if="(body.component_items && body.component_items.length > 0)"
          class="col col-12 col-md-7 pt-5" style="margin-bottom: 10rem;">
            <div
            v-for="(item, index) in body.component_items"
            :key="index"
            class="row mx-0 mb-2">
              <div class="col col-6 fs-content-1 fw-600 font-weight-bold d-flex align-items-top">
                <img
                v-if="item.image_icon"
                draggable="false"
                class="metadata-icon mr-2"
                alt=""
                :src="assetUrl + item.image_icon"/>
                {{ item.name }}
              </div>
              <div class="col col-6 fs-content-1 fw-600 font-weight-bold d-flex align-items-top">
                {{ item.value }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SectionSideImageMeta',
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