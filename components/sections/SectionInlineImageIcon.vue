<template>
  <section
  :id="data.slug_id"
  v-if="(body.images || []).length > 0"
  class="fe-wrapper fe-section bg-light-gray py-4">
    <div :class="`${(body.images || []).length > 3 ? 'd-block d-md-none' : 'd-none'}`">
      <vue-glide :perView="3" :peek="{ before: 0, after: 40 }" :gap="0">
        <vue-glide-slide
        v-for="(row, index) in (body.images || [])"
        :key="index"
        class="px-1">
          <a
          class="text-black"
          :href="row.url">
            <div
            v-if="row.image"
            class="d-flex justify-content-center mb-1">
              <img
              alt=""
              class="image-icon p-2"
              draggable="false"
              :src="assetUrl + row.image"/>
            </div>
            <div class="w-100 text-center">
              <span
              v-if="row.main_text"
              class="fs-content-1 fw-700 font-title d-block mb-1">
                {{ row.main_text }}
              </span>
              <span
              v-if="row.secondary_text"
              class="fs-content-2 fw-600 d-block">
                {{ row.secondary_text }}
              </span>
            </div>
          </a>
        </vue-glide-slide>
      </vue-glide>
    </div>
    <div :class="`${(body.images || []).length > 3 ? 'd-none d-md-block' : 'd-block'}`">
      <div class="row mx-0 mx-md-3 mx-lg-5 justify-content-center">
        <div 
        :class="`col col-4 col-sm-3 ${(body.images || []).length > 3 ? 'col-md-2' : 'col-md-3'}`"
        v-for="(row, index) in (body.images || [])"
        :key="index">
          <a
          class="text-black"
          :href="row.url">
            <div
            v-if="row.image"
            class="d-flex justify-content-center mb-1">
              <img
              alt=""
              class="image-icon p-2"
              draggable="false"
              :src="assetUrl + row.image"/>
            </div>
            <div class="w-100 text-center">
              <span
              v-if="row.main_text"
              class="fs-content-1 fw-700 font-title d-block mb-1">
                {{ row.main_text }}
              </span>
              <span
              v-if="row.secondary_text"
              class="fs-content-2 fw-600 d-block">
                {{ row.secondary_text }}
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { Glide, GlideSlide } from 'vue-glide-js';
import 'vue-glide-js/dist/vue-glide.css';
export default {
  name: 'SectionInlineImageIcon',
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  components: {
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide
  },
  computed: {
    assetUrl() {
      return this.$store.getters['page/getAssetUrl'];
    },
    body() {
      return this.data.body;
    }
  }
}
</script>