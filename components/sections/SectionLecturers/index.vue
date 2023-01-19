<template>
  <section
  v-if="(body.items || []).length > 0"
  :id="data.slug_id"
  class="py-4 fe-section fe-wrapper">
    <a
    :href="body.label_section.search_link"
    v-if="(body.label_section.search_label && body.label_section.search_link)"
    class="bg-light-gray rounded w-100 mb-3 py-3 px-4 d-flex justify-content-between cursor-pointer">
      <span class="text-gray fs-content-1 fw-600">{{ body.label_section.search_label }}</span>
      <span class="mdi mdi-magnify text-gray fs-subtitle-2 fw-600"/>
    </a>
    <div
    v-for="(row, index) in (body.items || [])"
    :key="index"
    class="w-100 mb-3">
      <LazySectionsSectionLecturersItem
      :data="row"
      :labels="body.label_items"/>
    </div>
    <div
    v-if="(body.label_section.more_button_label && body.label_section.more_button_link)"
    class="d-flex justify-content-center">
      <a :href="body.label_section.more_button_link">
        <Button
        type="secondary"
        class="fs-content-1 fw-600 mr-3 mb-2"
        :title="body.label_section.more_button_label"
        iconCls="mdi-arrow-right-bold-circle"/>
      </a>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SectionLecturers',
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