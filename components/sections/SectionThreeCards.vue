<template>
  <section
  :id="data.slug_id"
  class="fe-wrapper fe-section section-11-wrapper-on-small">
    <div class="d-block d-md-none">
      <vue-glide :perView="1" :peek="{ before: 0, after: 40 }" :gap="0">
        <vue-glide-slide class="text-center bg-primary text-white px-0">
          <div class="w-100 px-3 px-md-5 pt-5 pb-3">
            <img
            alt=""
            draggable="false"
            class="image-icon image-icon-responsive mb-2"
            v-if="body.image1"
            :src="assetUrl + body.image1"/>
            <span
            v-if="body.card_title1"
            class="fs-subtitle-1 fw-700 font-title d-block">
              {{ body.card_title1 }}
            </span>
            <p
            v-if="body.description1"
            class="mt-3 fs-content-1 fw-600">
              {{ body.description1 }}
            </p>
          </div>
          <div class="d-flex justify-content-start">
            <img
            alt=""
            draggable="false"
            class="fe-responsive-square bottom"
            :src="require('~/assets/images/squares-left.svg')"/>
          </div>
        </vue-glide-slide>
        <vue-glide-slide class="text-center bg-secondary text-primary px-0">
          <div class="w-100 px-3 px-md-5 pt-5 pb-3">
            <img
            alt=""
            draggable="false"
            class="image-icon image-icon-responsive mb-2"
            v-if="body.image2"
            :src="assetUrl + body.image2"/>
            <span
            v-if="body.card_title2"
            class="fs-subtitle-1 fw-700 font-title d-block">
              {{ body.card_title2 }}
            </span>
            <p
            v-if="body.description2"
            class="mt-3 fs-content-1 fw-600">
              {{ body.description2 }}
            </p>
          </div>
        </vue-glide-slide>
        <vue-glide-slide class="text-center bg-primary text-white px-0">
          <div class="w-100 px-3 px-md-5 pt-5 pb-3">
            <img
            alt=""
            draggable="false"
            class="image-icon image-icon-responsive mb-2"
            v-if="body.image3"
            :src="assetUrl + body.image3"/>
            <span
            v-if="body.card_title3"
            class="fs-subtitle-1 fw-700 font-title d-block">
              {{ body.card_title3 }}
            </span>
            <p
            v-if="body.description3"
            class="mt-3 fs-content-1 fw-600">
              {{ body.description3 }}
            </p>
          </div>
          <div class="d-flex justify-content-end">
            <img
            alt=""
            draggable="false"
            class="fe-responsive-square bottom"
            :src="require('~/assets/images/squares-right.svg')"/>
          </div>
        </vue-glide-slide>
      </vue-glide>
    </div>
    <div class="d-none d-md-block">
      <div class="row mx-0 bg-primary">
        <div class="col col-12 col-md-4 text-center text-white px-0">
          <div class="w-100 px-5 pt-5 pb-3">
            <img
            alt=""
            draggable="false"
            class="image-icon mb-2"
            v-if="body.image1"
            :src="assetUrl + body.image1"/>
            <span
            v-if="body.card_title1"
            class="fs-subtitle-1 fw-700 font-title d-block">
              {{ body.card_title1 }}
            </span>
            <p
            v-if="body.description1"
            class="mt-3 fs-content-1 fw-600">
              {{ body.description1 }}
            </p>
          </div>
          <div class="d-flex justify-content-start">
            <img
            alt=""
            draggable="false"
            class="fe-responsive-square bottom"
            :src="require('~/assets/images/squares-left.svg')"/>
          </div>
        </div>
        <div class="col col-12 col-md-4 p-5 text-center bg-secondary text-primary px-0">
          <img
          alt=""
          draggable="false"
          class="image-icon mb-2"
          v-if="body.image2"
          :src="assetUrl + body.image2"/>
          <span
          v-if="body.card_title2"
          class="fs-subtitle-1 fw-700 font-title d-block">
            {{ body.card_title2 }}
          </span>
          <p
          v-if="body.description2"
          class="mt-3 fs-content-1 fw-600">
            {{ body.description2 }}
          </p>
        </div>
        <div class="col col-12 col-md-4 text-center text-white px-0">
          <div class="w-100 px-5 pt-5 pb-3">
            <img
            alt=""
            draggable="false"
            class="image-icon mb-2"
            v-if="body.image3"
            :src="assetUrl + body.image3"/>
            <span
            v-if="body.card_title3"
            class="fs-subtitle-1 fw-700 font-title d-block">
              {{ body.card_title3 }}
            </span>
            <p
            v-if="body.description3"
            class="mt-3 fs-content-1 fw-600">
              {{ body.description3 }}
            </p>
          </div>
          <div class="d-flex justify-content-end">
            <img
            alt=""
            draggable="false"
            class="fe-responsive-square bottom"
            :src="require('~/assets/images/squares-right.svg')"/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { Glide, GlideSlide } from 'vue-glide-js';
import 'vue-glide-js/dist/vue-glide.css';

export default {
  name: 'SectionThreeCards',
  components: {
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide
  },
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
      return this.data.body;
    }
  }
}
</script>