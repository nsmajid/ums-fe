<template>
  <section
  :id="data.slug_id"
  class="fe-section">
    <div class="w-100" :style="{height: body.size_spacing}"/>
  </section>
</template>
<script>
export default {
  name: 'SectionSpace',
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