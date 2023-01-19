<template>
  <section
  :id="data.slug_id"
  class="fe-section bg-light-gray">
    <div class="w-100 position-relative"
    :style="{minHeight: '30rem'}">
      <img
      draggable="false"
      class="w-100 fe-section-bg fe-fit-cover"
      alt="banner"
      :src="assetUrl + body.image_background"/>
      <div class="fe-wrapper py-5 z-index-1 w-100 position-absolute top-25">
        <h4
        v-if="body.light_title"
        class="text-center fs-title-2 fw-600">
          {{ body.light_title }}
        </h4>
        <h2
        v-if="body.card_title"
        class="text-center fs-title-1 fw-700 font-title fe-bottom-separator">
          {{ body.card_title }}
        </h2>
        <div class="d-flex flex-wrap justify-content-center mt-4">
          <a
          v-if="(body.button_text1 && body.button_link1)"
          :href="body.button_link1">
            <Button
            type="primary"
            class="fs-subtitle-2 fw-600"
            :style="{minWidth: '10rem'}"
            :title="body.button_text1"
            iconCls="mdi-arrow-right-bold-circle"/>
          </a>
          <a
          v-if="(body.button_text2 && body.button_link2)"
          :href="body.button_link2">
            <Button
            type="secondary"
            class="fs-subtitle-2 fw-600"
            :style="{minWidth: '10rem'}"
            :title="body.button_text2"
            iconCls="mdi-arrow-right-bold-circle"/>
          </a>
        </div>
      </div>
    </div>
    <div
    v-if="body.bottom_text"
    class="w-100 bg-secondary text-primary py-3 text-center font-weight-bold fe-wrapper fs-subtitle-2 fw-600">
      {{ body.bottom_text }}
    </div>
  </section>
</template>
<script>
export default {
  name: 'SectionBannerFooterWithActions',
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