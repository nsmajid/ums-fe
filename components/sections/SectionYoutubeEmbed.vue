<template>
  <section
  :id="data.slug_id"
  class="w-100 fe-section">
    <div class="video-container">
      <iframe
      :src="`https://www.youtube.com/embed/${body.youtube_code}`"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen/>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SectionYoutubeEmbed',
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  computed: {
    body() {
      return this.data.body;
    }
  }
}
</script>