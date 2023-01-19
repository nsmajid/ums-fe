<template>
  <section
  :id="data.slug_id"
  class="fe-section fe-wrapper py-4">
    <div class="row mx-0">
      <div class="col col-12 col-lg-8 d-inline-flex align-items-center px-0">
        <div class="section-share-avatar-creator bg-secondary d-flex">
          <img alt="" draggable="false" src="~/assets/images/ums_multicolor.svg"/>
        </div>
        <div class="ml-3 w-100">
          <div class="d-flex justify-content-between">
            <div class="fs-content-1 fw-500">{{ body.card_title }}</div>
            <div class="d-inline-flex d-md-none">
              <ShareNetwork
              network="twitter"
              :url="shareUrl"
              :title="pageMeta.site_name">
                <div
                v-b-popover.hover.bottom="'Share Twitter'"
                class="section-share-platform-icon mr-2 d-flex">
                  <span class="mdi mdi-twitter m-auto text-white"/>
                </div>
              </ShareNetwork>
              <ShareNetwork
              network="facebook"
              :url="shareUrl">
                <div
                v-b-popover.hover.bottom="'Share Facebook'"
                class="section-share-platform-icon mr-2 d-flex">
                  <span class="mdi mdi-facebook m-auto text-white"/>
                </div>
              </ShareNetwork>
              <ShareNetwork
              network="linkedin"
              :url="shareUrl">
                <div
                v-b-popover.hover.bottom="'Share LinkedIn'"
                class="section-share-platform-icon square mr-2 d-flex">
                  <span class="mdi mdi-linkedin m-auto text-white"/>
                </div>
              </ShareNetwork>
              <div
              @click="copyLink"
              v-b-popover.hover.bottom="'Copy Link'"
              class="section-share-platform-icon square mr-2 d-flex cursor-pointer">
                <span class="mdi mdi-link-variant m-auto text-white"/>
              </div>
            </div>
          </div>
          <div class="fs-subtitle-1 fw-700 my-1">{{ body.date_format }}</div>
          <div class="fs-content-1 fw-500">
            <span>{{ body.read_time }}</span>
          </div>
        </div>
      </div>
      <div class="col col-12 col-lg-4 d-none d-md-inline-flex flex-wrap justify-content-end align-items-md-center px-0">
        <ShareNetwork
        network="twitter"
        :url="shareUrl"
        :title="pageMeta.site_name">
          <div
          v-b-popover.hover.bottom="'Share Twitter'"
          class="section-share-platform-icon mr-2 d-flex">
            <span class="mdi mdi-twitter m-auto text-white"/>
          </div>
        </ShareNetwork>
        <ShareNetwork
        network="facebook"
        :url="shareUrl">
          <div
          v-b-popover.hover.bottom="'Share Facebook'"
          class="section-share-platform-icon mr-2 d-flex">
            <span class="mdi mdi-facebook m-auto text-white"/>
          </div>
        </ShareNetwork>
        <ShareNetwork
        network="linkedin"
        :url="shareUrl">
          <div
          v-b-popover.hover.bottom="'Share LinkedIn'"
          class="section-share-platform-icon square mr-2 d-flex">
            <span class="mdi mdi-linkedin m-auto text-white"/>
          </div>
        </ShareNetwork>
        <div
        @click="copyLink"
        v-b-popover.hover.bottom="'Copy Link'"
        class="section-share-platform-icon square mr-2 d-flex cursor-pointer">
          <span class="mdi mdi-link-variant m-auto text-white"/>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SectionShare',
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      shareUrl: ''
    };
  },
  computed: {
    assetUrl() {
      return this.$store.getters['page/getAssetUrl'];
    },
    body() {
      return this.data.data;
    },
    pageMeta() {
      return this.$store.getters['page/getPageMeta'];
    }
  },
  mounted() {
    this.shareUrl = window.location.href;
  },
  methods: {
    copyLink() {
      let tempInput = document.createElement("input");
      tempInput.style = "position: absolute; left: -1000px; top: -1000px";
      tempInput.value = this.shareUrl;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      this.$bvToast.toast('Link copied to your clipboard', {
        title: `Success`,
        variant: 'success',
        solid: true,
        appendToast: 'b-toaster-bottom-right'
      });
    }
  }
}
</script>