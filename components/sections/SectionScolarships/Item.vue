<template>
  <div class="bg-light-gray rounded w-100 mb-3 position-relative fe-zoom-effect">
    <a :href="data.url" class="text-black" :class="data.url ? '' : 'disabled-link'">
      <a
      v-if="data.url"
      :href="data.url"
      class="bg-secondary text-primary p-0 p-md-3 position-absolute cursor-pointer top-0 right-0 z-index-1">
        <i class="mdi mdi-arrow-top-right fs-subtitle-2 fs-md-title-2 fw-700"/>
      </a>
      <div class="w-100 p-4">
        <div class="fs-title-2 fw-700 font-title">{{ data.title }}</div>
        <div class="mt-2 mb-3 fs-content-1 fw-600">
          {{ labels.date_start }}&nbsp;{{ data.date_start_format }}
          <span class="mx-2">|</span>
          {{ labels.date_end }}&nbsp;{{ data.date_end_format }}
        </div>
        <div :class="`bg-${statusColor[data.status]} py-2 px-3 text-white fs-content-1 fw-600 rounded-pill d-inline-flex mb-3`">
          {{ data.status }}
        </div>
        <div class="fs-content-1 fw-500 mb-3">{{ data.summary }}</div>
        <div class="row mx-0">
          <div class="col col-3 fs-content-1 px-0">
            <div class="fw-700 mb-1">{{ labels.level }}</div>
            <div class="fw-500">{{ data.level }}</div>
          </div>
          <div class="col col-3 fs-content-1 px-0">
            <div class="fw-700 mb-1">{{ labels.source }}</div>
            <div class="fw-500">{{ data.source }}</div>
          </div>
          <div class="col col-3 fs-content-1 px-0">
            <div class="fw-700 mb-1">{{ labels.goal }}</div>
            <div class="fw-500">{{ data.goal }}</div>
          </div>
          <div class="col col-3 fs-content-1 px-0">
            <div class="fw-700 mb-1">{{ labels.target }}</div>
            <div class="fw-500">{{ data.target }}</div>
          </div>
        </div>
      </div>
    </a>
  </div>
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