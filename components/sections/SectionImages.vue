<template>
  <section
  :id="data.slug_id"
  v-if="(body.images || []).length > 0"
  class="h-auto fe-section"
  :style="body.image_background && {
    background: `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 70%), url(${assetUrl + body.image_background})`,
    backgroundSize: 'cover'
  }">
    <div class="fe-wrapper py-5 pt-5 top-25 z-index-1 w-100">
      <div class="row justify-content-center">
        <div 
        :class="`col ${(body.images || []).length > 2 ? 'col-3 col-md-2' : 'col-6 col-md-4'} d-flex align-items-center`"
        v-for="(path, index) in (body.images || [])"
        :key="index">
          <img
          draggable="false"
          class="w-100"
          alt=""
          :src="assetUrl + path"/>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SectionImages',
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