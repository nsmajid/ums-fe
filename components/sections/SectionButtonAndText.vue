<template>
  <section
  :id="data.slug_id"
  class="fe-section fe-wrapper">
    <div class="w-100 bg-tosca p-4 d-flex flex-wrap justify-content-between align-items-center">
      <div class="text-white fs-content-1 fw-600 mb-2">
        {{ body.card_text }}
      </div>
      <a
      v-if="(body.button_text && body.button_link)"
      :href="body.button_link">
        <Button
        type="secondary"
        class="fs-content-1 fw-600"
        :title="body.button_text"
        iconCls="mdi-arrow-right-bold-circle"/>
      </a>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SectionButtonAndText',
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