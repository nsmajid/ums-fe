<template>
  <section
  :id="data.slug_id"
  class="py-5 fe-section fe-wrapper">
    <template v-for="(faculty, index) in body">
      <div
      :key="index"
      class="w-100 my-5">
        <div class="d-inline-flex align-items-start mb-2">
          <span class="mdi mdi-chevron-right fs-title-1 text-tosca"/>
          <a
          :href="faculty.url"
          class="text-black fs-title-1 fw-700 font-title">
            {{ faculty.name }}
          </a>
        </div>
        <div class="row mx-0 py-4">
          <div
          v-for="(prodi, i) in faculty.label_items"
          :key="i"
          class="col col-6 col-sm-4 col-md-3 col-lg-2 mb-5">
            <a
            :href="prodi.url"
            class="w-100 text-black">
              <div class="d-flex justify-content-center">
                <img
                :alt="prodi.name"
                draggable="false"
                :class="`prodi-image ${prodi.international && 'bg-secondary'} p-1`"
                :src="assetUrl + prodi.image"/>
              </div>
              <div
              v-if="prodi.name"
              class="w-100 text-center py-1 fs-content-1 fw-600">
                {{ prodi.name }}
              </div>
            </a>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>
<script>
export default {
  name: 'SectionFaculties',
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  computed: {
    assetUrl() {
      return this.$store.getters['page/getAssetUrl'];
    },
    body() {
      return (this.data.body || []).filter((r) => (r.label_items && r.label_items.length > 0));
    }
  }
}
</script>