<template>
  <section
  :id="data.slug_id"
  class="py-5 fe-section fe-wrapper">
    <div class="row mx-0">
      <div
      v-for="(row, index) in (body.component_items || [])"
      :key="index"
      class="col col-6 col-sm-6 col-md-4 col-lg-3 text-center mb-4">
        <a
        :href="row.url"
        :disabled="!row.url">
          <div
          v-if="row.main_text"
          class="text-primary font-weight-bolder mb-1">
            <span class="fs-title-2 fw-700 font-title">{{ row.main_text }}</span>
            <span
            v-if="row.popover"
            class="mdi mdi-information-outline fs-11"
            v-b-popover.hover.auto="row.popover"/>
          </div>
          <div
          v-if="row.secondary_text"
          class="text-black fs-content-1 fw-600"
          v-html="row.secondary_text"/>
        </a>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SectionItemsPopover',
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