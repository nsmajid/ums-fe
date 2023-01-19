<template>
  <section
  :id="data.slug_id"
  class="position-relative fe-section fe-section-banner-youtube"
  style="min-height: 60vh;">
    <div class="yt-video-container">
      <iframe
      :src="`https://www.youtube.com/embed/${body.youtube_code}?autoplay=1&rel=0&controls=0&showinfo=0&mute=1&loop=1&enablejsapi=1`"
      frameborder="0"
      allow="autoplay; encrypted-media"
      style="z-index: -100;"/>
    </div>
    <div class="fe-wrapper position-absolute row mx-0 w-100 h-100 align-items-end content">
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
  name: 'SectionBannerYoutube',
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