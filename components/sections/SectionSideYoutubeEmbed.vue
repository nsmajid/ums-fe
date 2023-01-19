<template>
  <section
  :id="data.slug_id"
  class="fe-wrapper fe-section w-100">
    <div class="row mx-0">
      <div class="col col-12 col-md-6 order-2 order-md-1 py-4 pl-0">
        <div v-if="body.card_title" class="fs-title-2 font-title fw-700">
          {{ body.card_title }}
        </div>
        <div v-if="body.card_title" class="fe-separator mt-2 mb-3"/>
        <p class="fs-content-1 fw-500">{{ body.description }}</p>
        <div
        v-if="(body.button_link && body.button_text)"
        class="d-flex justify-content-end mt-5 mr-md-4">
          <a :href="body.button_link">
            <Button
            type="secondary"
            class="fs-content-1 fw-600"
            :title="body.button_text"
            iconCls="mdi-arrow-right-bold-circle"/>
          </a>
        </div>
      </div>
      <div class="col col-12 col-md-6 order-1 order-md-2 video-container side">
        <iframe
        :src="`https://www.youtube.com/embed/${body.youtube_code}`"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen/>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SectionSideYoutubeEmbed',
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