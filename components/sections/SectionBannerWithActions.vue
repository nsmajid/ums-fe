<template>
  <section
  :id="data.slug_id"
  class="d-flex w-100 position-relative fe-section"
  :style="{minHeight: '36rem'}">
    <img
    v-if="body.image_background"
    draggable="false"
    class="w-100 fe-section-bg fe-fit-cover"
    alt="banner"
    :src="assetUrl + body.image_background"/>
    <div :class="`w-100 fe-wrapper text-center ${body.image_background ? 'text-white position-absolute top-0 pb-inherit' : 'my-auto'} h-100 d-flex align-items-center py-5`">
      <div class="w-100 my-auto">
        <span
        v-if="body.card_title"
        class="fs-title-1 fw-700 font-title pb-2 fe-bottom-separator mx-auto">
          {{ body.card_title }}
        </span>
        <p
        v-if="body.description"
        class="fs-content-1 fw-600 mt-3 mb-4">
          {{ body.description }}
        </p>
        <div
        v-if="(body.buttons && body.buttons.length > 0)"
        class="d-inline-flex flex-wrap justify-content-center">
          <template v-for="(button, index) in body.buttons">
            <a
            :key="index"
            v-if="(button.button_text && button.button_link)"
            :href="button.button_link">
              <Button
              type="secondary"
              class="fs-content-1 fw-600 mr-3"
              :title="button.button_text"
              iconCls="mdi-arrow-right-bold-circle"/>
            </a>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SectionBannerWithActions',
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