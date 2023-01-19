<template>
  <section
  :id="data.slug_id"
  v-if="body.card_title"
  class="fe-section">
    <div class="mt-5 top-15 z-index-1 w-100 fe-wrapper">
      <div
      v-if="body.card_title"
      class="text-center mb-4">
        <span class="fs-title-2 fw-700 font-title pb-2 fe-bottom-separator">
          {{ body.card_title }}
        </span>
      </div>
      <p
      class="mb-3"
      v-if="body.card_text"
      v-html="body.card_text"/>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SectionFreeText',
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