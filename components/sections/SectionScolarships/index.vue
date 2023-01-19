<template>
  <section
  v-if="(body.items || []).length > 0"
  :id="data.slug_id"
  class="py-5 fe-section fe-wrapper">
    <template v-for="(row, index) in (body.items || [])">
      <LazySectionsSectionScolarshipsItem
        :key="index"
        :data="row"
        :labels="body.labels"/>
    </template>
  </section>
</template>
<script>
export default {
  name: 'SectionScolarships',
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