<template>
  <section
  :id="data.slug_id"
  class="position-relative fe-section"
  style="min-height: 60vh;">
    <img
    draggable="false"
    class="w-100 fe-section-bg"
    alt="banner"
    :src="assetUrl + body.image_background"/>
    <div
    v-if="body.image_top_center"
    class="row w-100 justify-content-center position-absolute top-0">
      <div class="col col-8 col-sm-6 col-md-4">
        <img
        draggable="false"
        class="w-100 section-banner-image-top"
        alt=""
        :src="assetUrl + body.image_top_center"/>
      </div>
    </div>
    <div class="fe-wrapper position-absolute fe-section-banner row mx-0 w-100">
      <div class="col col-12 col-lg-6">
        <div>
          <div class="d-block">
            <div
            v-if="body.card_title"
            class="bg-secondary d-inline-flex fs-title-2 fw-700 font-title mb-0 p-4">
              {{ body.card_title }}
            </div>
          </div>
          <div
          v-if="(body.card_text || (body.button_link && body.button_text))"
          class="bg-primary mb-0 p-4 opacity-9 d-inline-flex">
            <div>
              <p
              v-if="body.card_text"
              class="text-white fs-subtitle-2 fw-600 mb-3">
                {{ body.card_text }}
              </p>
              <a
              v-if="(body.button_link && body.button_text)"
              :href="body.button_link">
                <Button
                class="fs-subtitle-2 fw-600"
                :title="body.button_text"
                type="secondary"
                iconCls="mdi-arrow-right-bold-circle"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SectionBanner',
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