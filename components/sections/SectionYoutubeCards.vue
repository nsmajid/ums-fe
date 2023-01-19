<template>
  <section
  :id="data.slug_id"
  class="w-100 fe-section fe-wrapper my-5">
    <div class="grid-videos">
      <div class="grid-videos-primary mb-2">
        <div class="grid-videos-card w-100 bg-light-gray">
          <div class="embed-container">
            <iframe
            :src="`https://www.youtube.com/embed/${body.youtube_code1}`"
            frameborder="0"
            class="w-100 iframe-youtube-embed"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen/>
          </div>
          <div class="px-4 py-3">
            <div class="fs-subtitle-1 fw-700">
              {{ body.card_title1 }}
            </div>
            <p
            v-if="body.card_description1"
            class="fs-content-1 fw-400 mt-2">
              {{ body.card_description1 }}
            </p>
          </div>
        </div>
      </div>
      <div class="grid-videos-secondary mb-2">
        <div class="grid-videos-card w-100 bg-light-gray mb-2">
          <div class="embed-container">
            <iframe
            :src="`https://www.youtube.com/embed/${body.youtube_code2}`"
            frameborder="0"
            class="w-100 iframe-youtube-embed"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen/>
          </div>
          <div class="fs-content-1 fw-700 px-3 py-2">
            {{ body.card_title3 }}
          </div>
        </div>
        <div class="grid-videos-card w-100 bg-light-gray">
          <div class="embed-container">
            <iframe
            :src="`https://www.youtube.com/embed/${body.youtube_code3}`"
            frameborder="0"
            class="w-100 iframe-youtube-embed"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen/>
          </div>
          <div class="fs-content-1 fw-700 px-3 py-2">
            {{ body.card_title3 }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SectionYoutubeCards',
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