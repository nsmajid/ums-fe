<template>
  <section
  :id="data.slug_id"
  v-if="(body.buttons || []).length > 0"
  class="fe-wrapper fe-section">
    <div class="d-flex justify-content-center flex-wrap py-4">
      <template v-for="(button, index) in (body.buttons || [])">
        <a
        :key="index"
        v-if="(button.button_text && button.button_link)"
        :href="button.button_link">
          <Button
          type="secondary"
          class="fs-content-1 fw-600 mr-3 mb-2"
          :title="button.button_text"
          iconCls="mdi-arrow-right-bold-circle"/>
        </a>
      </template>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SectionButtons',
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