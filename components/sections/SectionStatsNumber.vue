<template>
  <section
  :id="data.slug_id"
  class="py-5 fe-section fe-wrapper"
  :style="{
    height: 'auto',
    background: `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%), url(${assetUrl + body.image_background})`,
    backgroundSize: '100% 100% cover'
  }">
    <div class="mt-5 top-15 z-index-1 w-100 px-0 px-md-5">
      <div class="row justify-content-center mx-0">
        <div
        v-if="body.card_title"
        class="col col-12 text-center mb-3">
          <div class="fs-title-2 fw-700 font-title pb-2">
            {{ body.card_title }}
          </div>
          <div class="d-flex justify-content-center">
            <div class="fe-separator"/>
          </div>
        </div>
        <p
        v-if="body.description"
        class="text-center fs-content-1 fw-600 mb-3">
          {{ body.description }}
        </p>
        <div
        v-for="(row, index) in (body.component_items || [])"
        :key="index"
        class="col col-6 col-sm-4 text-center py-4">
          <div
          :data-counter-ref="`counter_${sectionId}-${index}_content`"
          v-waypoint="{ active: true, callback: onWaypoint }"
          class="font-title fs-title-1 fw-700 font-weight-bolder mb-2">
            <countTo
            :autoplay="false"
            :ref="`counter_${sectionId}-${index}_content`"
            :startVal="0"
            :endVal="Number(row.number)"
            :duration="3000"/>
          </div>
          <div class="fs-content-1 fw-600 font-weight-bolder">{{ row.text }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import countTo from 'vue-count-to';
export default {
  name: 'SectionStatsNumber',
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  components: {countTo},
  computed: {
    assetUrl() {
      return this.$store.getters['page/getAssetUrl'];
    },
    body() {
      return this.data.body;
    },
    sectionId() {
      return this.data.id;
    }
  },
  methods: {
    onWaypoint({el, going}) {
      if ((going && going.toLowerCase() == 'in') && (el.childNodes.length > 0)) {
        const attrKey = 'data-counter-ref';
        const counterRef = el.getAttribute(attrKey);
        this.$refs[counterRef][0].start();
        el.removeAttribute(attrKey);
      }
    }
  }
}
</script>