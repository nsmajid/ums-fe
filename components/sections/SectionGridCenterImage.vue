<template>
  <section
  :id="data.slug_id"
  v-if="body.card_title1"
  class="fe-wrapper no-wrapper-on-small fe-section">
    <div class="row mx-0 bg-primary">
      <a
      :href="body.url1"
      :class="`card-hoverable-primary ${body.url1 ? '' : 'disabled'} col col-6 col-lg-4 order-1 order-lg-1 p-1 px-sm-2 px-md-3 p-lg-4 text-center text-white px-0 d-flex align-items-center`">
        <div class="w-100 py-2 py-sm-2 py-md-3 py-lg-4 px-1 px-sm-2 px-md-3 px-lg-3 text-white">
          <img
          alt=""
          draggable="false"
          class="image-icon image-icon-responsive image-icon-responsive-smaller mb-2"
          v-if="body.image_logo1"
          :src="assetUrl + body.image_logo1"/>
          <span
          v-if="body.card_title1"
          class="fs-title-2 font-title fw-700 d-block">
            {{ body.card_title1 }}
          </span>
          <p
          v-if="body.description1"
          class="mt-2 mt-md-3 fs-content-1 fw-600">
            {{ body.description1 }}
          </p>
        </div>
      </a>
      <div
      class="col col-6 col-lg-4 order-3 order-lg-2 fe-image-as-grid"
      :style="{
        background: `url(${assetUrl + body.image_side2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'none'
      }"/>
      <a
      :href="body.url3"
      :class="`card-hoverable-primary ${body.url3 ? '' : 'disabled'} col col-6 col-lg-4 order-5 order-lg-3 p-1 px-sm-2 px-md-3 p-lg-4 text-center text-white px-0 d-flex align-items-center`">
        <div class="w-100 py-2 py-sm-2 py-md-3 py-lg-4 px-1 px-sm-2 px-md-3 px-lg-3 text-white">
          <img
          alt=""
          draggable="false"
          class="image-icon image-icon-responsive image-icon-responsive-smaller mb-2"
          v-if="body.image_logo3"
          :src="assetUrl + body.image_logo3"/>
          <span
          v-if="body.card_title3"
          class="fs-title-2 font-title fw-700 d-block">
            {{ body.card_title3 }}
          </span>
          <p
          v-if="body.description3"
          class="mt-2 mt-md-3 fs-content-1 fw-600">
            {{ body.description3 }}
          </p>
        </div>
      </a>
      <div
      class="col col-6 col-lg-4 order-2 order-lg-4 fe-image-as-grid"
      :style="{
        background: `url(${assetUrl + body.image_side1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'none'
      }"/>
      <a
      :href="body.url2"
      :class="`card-hoverable-secondary ${body.url2 ? '' : 'disabled'} col col-6 col-lg-4 order-4 order-lg-5 p-1 px-sm-2 px-md-3 p-lg-4 text-center text-primary px-0 d-flex align-items-center`">
        <div class="w-100 py-2 py-sm-2 py-md-3 py-lg-4 px-1 px-sm-2 px-md-3 px-lg-3 text-primary">
          <img
          alt=""
          draggable="false"
          class="image-icon image-icon-responsive image-icon-responsive-smaller mb-2"
          v-if="body.image_logo2"
          :src="assetUrl + body.image_logo2"/>
          <span
          v-if="body.card_title2"
          class="fs-title-2 font-title fw-700 d-block">
            {{ body.card_title2 }}
          </span>
          <p
          v-if="body.description2"
          class="mt-2 mt-md-3 fs-content-1 fw-600">
            {{ body.description2 }}
          </p>
        </div>
      </a>
      <div
      class="col col-6 col-lg-4 order-6 order-lg-6 fe-image-as-grid"
      :style="{
        background: `url(${assetUrl + body.image_side3})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'none'
      }"/>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SectionGridCenterImage',
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