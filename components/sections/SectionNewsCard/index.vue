<template>
  <section
  :id="data.slug_id"
  v-if="(body.items || []).length > 0"
  class="py-5 fe-section fe-wrapper">
    <div class="d-block d-md-none">
      <template v-for="(row, index) in (body.items || [])">
        <LazySectionsSectionNewsCardFullItem :data="row" :key="index"/>
      </template>
    </div>
    <div class="d-none d-md-block">
      <div class="row mx-0">
        <div
        v-for="(row, index) in (body.items || [])"
        :key="index"
        class="col col-12 col-sm-6 col-md-2 col-lg-4 mb-4">
          <LazySectionsSectionNewsCardItem :data="row"/>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SectionNewsCard',
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