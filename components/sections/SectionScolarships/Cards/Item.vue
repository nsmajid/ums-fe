<template>
  <a :href="data.url" class="text-black">
    <div class="bg-light-gray rounded fe-zoom-effect">
      <div class="position-relative">
        <div
        v-if="(data.date_event_format_d && data.date_event_format_m)"
        class="position-absolute top-0 text-center text-white bg-dark-green px-3 py-2 opacity-8"
        :style="{left: '2rem'}">
          <span class="h3 font-weight-bolder d-block mb-1">{{ data.date_event_format_d }}</span>
          <span class="h6 font-weight-bold d-block mb-0">{{ data.date_event_format_m }}</span>
        </div>
        <img
        draggable="false"
        class="w-100 rounded-top image-fit-cover-center"
        alt=""
        v-if="data.image_featured"
        :src="assetUrl + data.image_featured"/>
      </div>
      <div class="p-3 position-relative">
        <div
        :class="`bg-${statusColor[data.status]} py-2 px-3 text-white position-absolute fs-content-1 fw-600 rounded-pill d-inline-flex mb-3`"
        :style="{top: '-1rem', left: '2rem'}">
          {{ data.status }}
        </div>
        <a
        v-if="data.url"
        :href="data.url"
        class="bg-secondary text-primary p-3 position-absolute cursor-pointer"
        :style="{top: '-2rem', right: 0}">
          <i class="mdi mdi-arrow-top-right fs-title-2 fw-700"/>
        </a>
        <div class="p-3">
          <div class="d-inline-flex flex-wrap">
            <span
            v-if="data.date_format"
            class="mr-3 fs-content-2 fw-700 d-inline-flex align-items-center">
              <i class="mdi mdi-calendar fs-content-1 mr-1"/>
              {{ data.date_format }}
            </span>
          </div>
          <div class="fs-title-2 font-title fw-700 my-3">
            {{ data.title }}
          </div>
          <p class="fw-600 fs-content-1">{{ data.summary }}</p>
          <div class="row mx-0">
            <div class="col col-6 fs-content-1 px-0 pb-3">
              <div class="fw-700 mb-1">{{ labels.level }}</div>
              <div class="fw-500">{{ data.level }}</div>
            </div>
            <div class="col col-6 fs-content-1 px-0 pb-3">
              <div class="fw-700 mb-1">{{ labels.source }}</div>
              <div class="fw-500">{{ data.source }}</div>
            </div>
            <div class="col col-6 fs-content-1 px-0 pb-3">
              <div class="fw-700 mb-1">{{ labels.goal }}</div>
              <div class="fw-500">{{ data.goal }}</div>
            </div>
            <div class="col col-6 fs-content-1 px-0 pb-3">
              <div class="fw-700 mb-1">{{ labels.target }}</div>
              <div class="fw-500">{{ data.target }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>
<script>
export default {
  name: 'Item',
  props: {
    data: {
      type: Object,
      default: {}
    },
    labels: {
      type: Object,
      default: {}
    }
  },
  computed: {
    assetUrl() {
      return this.$store.getters['page/getAssetUrl'];
    }
  },
  data() {
    return {
      statusColor: {
        'On-Going': 'success',
        'Coming Soon': 'warning',
        'Closed': 'danger'
      }
    }
  }
}
</script>