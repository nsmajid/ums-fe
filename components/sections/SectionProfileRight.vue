<template>
  <section
  :id="data.slug_id"
  class="position-relative fe-section section_5_container">
    <img
    v-if="body.image_background"
    draggable="false"
    class="w-100 fe-section-bg fe-section-bg-lg section_5_bg_content"
    alt="banner"
    :src="assetUrl + body.image_background"/>
    <div :class="`${body.image_background && 'position-relative position-lg-absolute top-0 pb-inherit'} w-100 h-100 d-flex`">
      <div class="mt-auto w-100 position-lg-relative section_5_content">
        <div class="row mx-0 mt-1 mt-sm-3 mt-lg-5">
          <div class="col col-12 col-lg-8 pt-5 px-0" style="margin-bottom: 10rem;">
            <div class="d-flex d-lg-none align-items-center justify-content-center my-3 position-relative">
              <img
              draggable="false"
              class="rounded-circle bg-secondary"
              alt="rector image"
              style="width: 36vw; height: 36vw; object-fit: cover; z-index: 2;"
              :src="assetUrl + body.image_side_mobile"/>
              <div class="position-absolute w-100 bg-light-gray" style="height: 0.25rem;"/>
            </div>
            <div class="fe-wrapper">
              <h3
              v-if="body.card_title"
              class="font-title fw-700 fs-title-1 mb-3">
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
              <h5
              v-if="body.text_bold"
              class="fs-subtitle-1 fw-600 text-primary mb-3">
                {{ body.text_bold }}
              </h5>
              <a
              v-if="(body.button_text && body.button_link)"
              :href="body.button_link">
                <Button
                type="secondary"
                class="fs-content-1 fw-600"
                :title="body.button_text"
                iconCls="mdi-arrow-right-bold-circle"/>
              </a>
            </div>
          </div>
          <div
          v-if="body.image_side"
          class="col col-12 col-lg-4 d-none d-lg-flex justify-content-center pl-0 fe-wrapper">
            <img
            draggable="false"
            class="fe-image-side position-absolute bottom-0 z-index-1 pb-inherit"
            alt="rector image"
            :src="assetUrl + body.image_side"/>
          </div>
        </div>
        <div class="w-100 d-none d-lg-flex h-mini-footer bg-primary position-absolute bottom-0 pb-inherit"/>
      </div>
    </div>
    <div class="w-100 d-flex d-lg-none h-mini-footer bg-primary position-absolute bottom-0 pb-inherit"/>
  </section>
</template>
<script>
export default {
  name: 'SectionProfileRight',
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {resolverInterval: null};
  },
  computed: {
    assetUrl() {
      return this.$store.getters['page/getAssetUrl'];
    },
    body() {
      return this.data.body;
    },
    pageWidth() {
      return this.$store.getters['common/getPageWidth'];
    }
  },
  watch: {
    pageWidth() {
      this.$helpers.resolveSectionHeight('section_5');
    }
  },
  mounted() {
    let me = this;
    this.resolverInterval = setInterval(() => {
      me.$helpers.resolveSectionHeight('section_5');
    }, 1000);
  },
  destroyed() {
    clearInterval(this.resolverInterval);
  }
}
</script>