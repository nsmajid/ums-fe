<template>
  <section
  :id="data.slug_id"
  class="position-relative fe-section section_10_container">
    <img
    v-if="body.image_background"
    draggable="false"
    class="w-100 fe-section-bg fe-section-bg-lg section_10_bg_content"
    alt="banner"
    :src="assetUrl + body.image_background"/>
    <div :class="`${body.image_background && 'position-relative position-lg-absolute top-0 pb-inherit'} w-100 h-100 d-flex`">
      <div class="w-100 position-lg-relative mt-auto section_10_content">
        <div class="row justify-content-center fe-wrapper mx-0 mt-3 mt-lg-5">
          <div class="col col-12 d-flex d-lg-none align-items-center justify-content-center my-3">
            <img
            draggable="false"
            class="rounded-circle bg-secondary"
            alt="rector image"
            style="width: 26vw; height: 26vw; object-fit: cover;"
            :src="assetUrl + body.image_side_mobile"/>
          </div>
          <div :class="`col col-12 col-lg-4 ${body.image_side_position == 'right' && 'order-2'} d-none d-lg-block`">
            <img
            v-if="body.image_side"
            draggable="false"
            class="w-100 position-absolute bottom-0 z-index-1"
            alt="rector image"
            :src="assetUrl + body.image_side"/>
          </div>
          <div
          :class="`col col-12 col-lg-7 pt-5 ${body.image_side_position == 'right' && 'order-1 text-left text-lg-right'}`"
          style="margin-bottom: 10rem;">
            <h4 class="fs-subtitle-1 fw-500" v-if="body.light_title">
              {{ body.light_title }}
            </h4>
            <h3
            v-if="body.card_title"
            class="mb-2 fs-title-1 fw-700 font-title">
              {{ body.card_title }}
            </h3>
            <div
            v-if="body.card_title"
            :class="`${body.image_side_position == 'right' && 'd-flex justify-content-start justify-content-lg-end'} mb-3`">
              <span class="fe-separator mb-3"/>
            </div>
            <p
            v-if="body.description"
            class="font-weight-bold fs-content-1 fw-600">
              {{ body.description }}
            </p>
            <a
            v-if="(body.button_text1 && body.button_link1)"
            :href="body.button_link1">
              <Button
              type="secondary"
              class="fs-content-1 fw-600"
              :title="body.button_text1"
              iconCls="mdi-arrow-right-bold-circle"/>
            </a>
            <a
            v-if="(body.button_text2 && body.button_link2)"
            :href="body.button_link2">
              <Button
              type="secondary"
              class="fs-content-1 fw-600"
              :title="body.button_text2"
              iconCls="mdi-arrow-right-bold-circle"/>
            </a>
          </div>
        </div>
        <div class="w-100 h-mini-footer bg-primary row justify-content-lg-center fe-wrapper position-absolute bottom-0 mx-0">
          <div :class="`col col-12 col-lg-4 ${body.image_side_position == 'right' && 'order-2'}`"/>
          <div :class="`col col-12 col-lg-7 fs-content-1 fw-700 text-white py-3 z-index-1 ${body.image_side_position == 'right' && 'order-1 text-right'}`">
            {{ body.bottom_text }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SectionProfileWithActions',
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
    },
    pageWidth() {
      return this.$store.getters['common/getPageWidth'];
    }
  },
  watch: {
    pageWidth() {
      this.$helpers.resolveSectionHeight('section_10');
    }
  },
  mounted() {
    let me = this;
    this.resolverInterval = setInterval(() => {
      me.$helpers.resolveSectionHeight('section_10');
    }, 1000);
  },
  destroyed() {
    clearInterval(this.resolverInterval);
  }
}
</script>