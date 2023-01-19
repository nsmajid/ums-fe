<template>
  <section
  :id="data.slug_id"
  class="h-auto fe-wrapper bg-light-gray fe-section">
    <div class="w-100 p-4">
      <div class="row justify-content-center mx-0">
        <div
        v-if="body.card_title"
        class="col col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 py-3 text-uppercase fs-subtitle-2 fw-700 d-flex align-items-center justify-content-end pr-3 border-right border-primary text-right">
          {{ body.card_title }}
        </div>
        <div
        v-if="(body.image_socials && body.image_socials.length > 0)"
        class="col col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7 py-3 d-inline-flex flex-wrap align-items-center">
          <a
          v-for="(social, index) in (body.image_socials || [])"
          :key="index"
          :href="social.url"
          class="mr-2 mb-2">
            <img
            v-if="social.image"
            alt=""
            draggable="false"
            class="social-icon rounded-circle"
            :src="assetUrl + social.image"/>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SectionSocials',
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