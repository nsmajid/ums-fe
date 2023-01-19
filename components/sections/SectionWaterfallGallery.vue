<template>
  <section
  :id="data.slug_id"
  class="fe-section fe-wrapper">
    <div class="row mx-0 my-4">
      <div
      v-for="(images, index) in columns"
      :key="index"
      class="col col-4 p-1">
        <div
        class="position-relative mb-2"
        v-for="(row, i) in (images || [])"
        :key="i">
          <img
          class="w-100 rounded"
          alt=""
          :src="assetUrl + row.image"/>
          <div
          v-if="row.card_text"
          style="background: linear-gradient(180deg, rgba(1, 1, 1, 0) 0%, rgba(81, 202, 195, 0.7) 100%);"
          class="position-absolute bottom-0 left-0 right-0 p-2">
            <div class="fs-subtitle-2 text-white mb-2 font-weight-bold">{{ row.card_text }}</div>
            <div class="fe-separator"/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SectionWaterfallGallery',
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      columns: []
    }
  },
  computed: {
    assetUrl() {
      return this.$store.getters['page/getAssetUrl'];
    },
    body() {
      return this.data.body;
    }
  },
  async created() {
    let lastIndex = 0;
    const theColumns = [[],[],[]];
    await (this.body.images || []).map((row) => {
      theColumns[lastIndex].push(row);
      switch (lastIndex) {
        case 0: lastIndex = 1; break;
        case 1: lastIndex = 2; break;
        case 2: lastIndex = 0; break;
        default: lastIndex = 0; break;
      }
    });
    this.columns = theColumns;
  }
}
</script>