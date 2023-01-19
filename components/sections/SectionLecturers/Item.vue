<template>
  <div class="bg-light-gray rounded w-100 mb-3 position-relative fe-zoom-effect py-4">
    <a :href="data.profile" class="text-black">
      <a
      v-if="data.profile"
      :href="data.profile"
      class="bg-secondary text-primary p-0 p-md-3 position-absolute cursor-pointer top-0 right-0 z-index-1">
        <i class="mdi mdi-arrow-top-right fs-subtitle-2 fs-md-title-2 fw-700"/>
      </a>
      <div class="row mx-0">
        <div class="col col-3 col-md-2 col-lg-2">
          <img
          :alt="data.name"
          class="w-100 px-0 px-lg-3"
          :src="(data.profile_image && data.profile_image.includes('http')) ? data.profile_image : 'data:image/*;base64,' + data.profile_image"/>
        </div>
        <div class="col col-9 col-md-10 col-lg-10 pt-2 pr-2 pr-xl-5">
          <div class="fs-title-2 font-title fw-700 mb-2">{{ data.name }}</div>
          <div class="fs-subtitle-2 fw-500"
          v-if="(data.jabatan_organisasi && data.jabatan_organisasi.length > 0)">
            <template v-for="(row, index) in (data.jabatan_organisasi || [])">
              <span :key="index">{{ row.nama }}</span>&nbsp;di&nbsp;
              <span :key="index">{{ row.unit }}</span>
              <template v-if="index < data.jabatan_organisasi.length - 1">
                ,&nbsp;
              </template>
            </template>
          </div>
          <div class="my-4 w-100">
            <div class="fs-subtitle-2 fw-700 mb-2">{{ labels.contact_label }}</div>
            <div class="d-inline-flex flex-wrap">
              <div class="mr-4 fs-content-1 fw-500">
                <span class="mdi mdi-map-marker mr-1"/>
                {{ data.lokasi_kantor || '-' }}
              </div>
              <div class="mr-4 fs-content-1 fw-500">
                <span class="mdi mdi-email-outline mr-1"/>
                {{ data.email || '-' }}
              </div>
            </div>
          </div>
          <div class="fs-subtitle-2 fw-700 mb-2">{{ labels.expertise_label }}</div>
          <div class="expertise">
            <span :class="`${showAllText ? '' : 'expertise-text'} fs-content-1 fw-500`">
              {{ data.expertise }}
            </span>
            <span
            v-if="!showAllText"
            @click.prevent="showAllText = true"
            class="fs-content-1 fw-500 text-primary ml-2 text-underlined expertise-show-all">
              {{ labels.expertise_show_label }}
            </span>
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
      showAllText: false
    }
  }
}
</script>