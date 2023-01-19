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
        <div class="row fe-wrapper mx-0 mt-5">
          <div class="col col-12 col-md-8 order-2 order-md-1 pt-5">
            <h3
            v-if="body.card_title"
            class="fs-title-1 fw-700 font-title mb-3">
              {{ body.card_title }}
            </h3>
            <div
            v-if="body.card_title"
            class="fe-separator mb-4"/>
            <p
            v-if="body.description"
            class="fs-content-1 fw-600">
              {{ body.description }}
            </p>
          </div>
          <div
          v-if="(body.image_side || body.image_title)"
          class="col col-12 col-md-4 order-1 order-md-2 text-center">
            <div class="d-flex justify-content-center px-5 px-sm-5 px-md-0">
              <img
              v-if="body.image_side"
              draggable="false"
              class="w-75 pb-inherit"
              alt=""
              :src="assetUrl + body.image_side"/>
            </div>
            <span
            v-if="body.image_title"
            class="fs-content-1 fw-600 my-2">
              {{ body.image_title }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SectionSideImage',
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