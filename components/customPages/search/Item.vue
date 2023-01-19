<template>
  <div class="bg-light-gray rounded w-100 mb-3 position-relative fe-zoom-effect">
    <a :href="data.url" class="text-black">
      <a
      v-if="data.url"
      :href="data.url"
      class="bg-secondary text-primary p-0 p-md-3 position-absolute cursor-pointer top-0 right-0 z-index-1">
        <i class="mdi mdi-arrow-top-right fs-subtitle-2 fs-md-title-2 fw-700"/>
      </a>
      <div class="d-inline-flex p-3">
        <img
        draggable="false"
        class="responsive-news-thumbnail-square"
        alt=""
        v-if="data.image_featured"
        :src="assetUrl + data.image_featured"/>
        <div class="pl-3">
          <div class="fs-title-2 font-title fw-700 mb-1 mb-md-3">
            {{ data.title }}
          </div>
          <p class="fw-600 fs-content-1">{{ data.description }}</p>
        </div>
      </div>
    </a>
  </div>
</template>
<script>
export default {
  name: 'Item',
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  computed: {
    assetUrl() {
      return this.$store.getters['page/getAssetUrl'];
    }
  }
}
</script>