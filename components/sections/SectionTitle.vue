<template>
  <section
  v-if="body.card_title"
  :id="data.slug_id"
  class="fe-section w-100 fe-wrapper">
    <div class="my-3">
      <div
      :class="`text-${align} mb-2`">
        <span class="fs-title-2 fw-700 font-title">
          {{ body.card_title }}
        </span>
      </div>
      <div :class="`d-flex justify-content-${justify}`">
        <div class="fe-separator"/>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SectionTitle',
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
  },
  data() {
    return {
      align: 'center',
      justify: 'center'
    }
  },
  created() {
    switch (this.body.position)
    {
      case 'left':
        this.align = 'left';
        this.justify = 'start';
      break;
      case 'right':
        this.align = 'right';
        this.justify = 'end';
      break;
      default:
      break;
    }
  }
}
</script>