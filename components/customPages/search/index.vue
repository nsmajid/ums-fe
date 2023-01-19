<template>
  <section
  :id="data.slug_id"
  class="fe-section">
    <div
    v-if="body.key"
    class="w-100">
      <div class="fe-wrapper bg-light-gray pt-5 w-100">
        <div class="row mx-0 bg-white align-items-center mb-4">
          <div class="col col-10 col-md-11 px-0">
            <input
            v-model="keyword"
            @keyup.enter="onSearch(false)"
            class="w-100 border-0 p-3 fs-content-1 fw-500"
            :placeholder="body.label.placeholder"/>
          </div>
          <div class="col col-2 col-md-1 px-0 justify-content-center d-flex align-self-stretch bg-secondary">
            <button
            @click="onSearch(false)"
            class="border-0 d-flex align-items-center h-100 bg-secondary w-100 justify-content-center">
              <span v-if="searching" class="fe-loading m-0"/>
              <span v-else class="mdi mdi-magnify fs-subtitle-1 fw-700"/>
            </button>
          </div>
        </div>
        <div
        v-if="segments.length > 0"
        class="d-flex flex-wrap text-primary fs-content-1 fw-600">
          <div class="pr-3 py-2">
            {{ body.label.navbar }}
          </div>
          <div
          v-for="(row, index) in segments"
          :key="index"
          @click="onSegmentChange(row.segment)"
          :class="`px-3 py-2 ${(segment === row.segment) ? 'text-secondary bg-white' : 'cursor-pointer'}`">
            {{ row.label }}
          </div>
        </div>
      </div>
      <div class="bg-white w-100 fe-wrapper pt-4 pb-5">
        <template v-if="items.length > 0">
          <template v-for="(row, index) in items">
            <LazyCustomPagesSearchItem :key="index" :data="row"/>
          </template>
        </template>
        <template v-else>
          <div class="row mx-0">
            <div class="col col-12 col-md-4 col-xl-3">
              <img
              draggable="false"
              class="w-100"
              alt=""
              src="~/assets/images/search-not-found.gif"
              :style="{
                height: '20rem',
                objectFit: 'contain',
                objectPosition: 'center'
              }"/>
            </div>
            <div class="col col-12 col-md-8 col-xl-9 pt-5">
              <div class="fs-title-2 font-title fw-700 text-black mb-3">
                {{ body.no_result.title }}
              </div>
              <div class="fs-content-1 text-gray" v-html="body.no_result.description"/>
            </div>
          </div>
        </template>
        <div class="d-flex mt-4">
          <div v-if="loading_more" class="fe-loading mx-auto"/>
          <Button
          @click.native="fetchMore"
          v-if="has_more && !loading_more"
          class="fs-content-1 fw-600 mx-auto"
          title="Load More"
          type="secondary"
          iconCls="mdi-arrow-right-bold-circle"/>
        </div>
      </div>
    </div>
    <div
    v-else
    class="fe-wrapper row align-items-center justify-content-center pt-3 pb-5">
      <div class="col col-12 col-md-6">
        <img
        draggable="false"
        class="w-100"
        alt=""
        src="~/assets/images/search-image.gif"
        :style="{
          height: '22rem',
          objectFit: 'cover',
          objectPosition: 'center'
        }"/>
        <div class="row mx-0 bg-white align-items-center mb-4">
          <div class="col col-10 col-md-10 px-0">
            <input
            v-model="keyword"
            @keyup.enter="onSearch(true)"
            class="w-100 p-3 fs-content-1 fw-500"
            :placeholder="body.label.placeholder"/>
          </div>
          <div class="col col-2 col-md-2 px-0 justify-content-center d-flex align-self-stretch bg-secondary">
            <button
            @click="onSearch(true)"
            class="border-0 d-flex align-items-center h-100 bg-secondary w-100 justify-content-center">
              <span v-if="searching" class="fe-loading m-0"/>
              <span v-else class="mdi mdi-magnify fs-subtitle-1 fw-700"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Search',
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      keyword: '',
      segment: null,
      segments: [],
      items: [],
      loading_more: false,
      has_more: false,
      more_api: '',
      searching: false
    }
  },
  created() {
    const {items, key, segment, navbar, pagination} = this.body;
    if ((items || []).length > 0) this.items = items;
    if (key) this.keyword = key;
    if (segment) this.segment = segment;
    if ((navbar || []).length > 0) this.segments = navbar;
    this.has_more = pagination?.has_more_pages || false;
    this.more_api = pagination?.next_page_url || this.more_api;
  },
  computed: {
    body() {
      return this.data.body;
    },
    widget() {
      const {widget} = this.$store.getters['mainLayout/getMainLayoutData'] ?? {};
      return widget ?? {};
    }
  },
  methods: {
    getSearchUrl(queryString) {
      const {action_path} = this.widget.search;
      return `${window.location.origin}/${action_path}${(queryString ? '?'+queryString : '')}`;
    },
    onSearch(resetSegment = false) {
      const whiteListQuery = ['key','debug','segment'];
      const {keyword, searching} = this;
      if (!searching && (keyword || '').trim())
      {
        this.searching = true;
        let params = {
          ...this.$route.query,
          key: keyword.trim()
        };

        // remove params by white list
        Object.keys(params).map(key => {
          if (!whiteListQuery.includes(key)) delete params[key];
          if (resetSegment && key === 'segment' && params.hasOwnProperty('segment')) delete params[key];
        });

        const queryString = this.$helpers.convertQueryString(params);
        window.location = this.getSearchUrl(queryString);
      }
    },
    onSegmentChange(segmentKey) {
      if (this.segment !== segmentKey)
      {
        this.searching = false;
        let params = {
          ...this.$route.query,
          segment: segmentKey
        };
        if (!params.segment) delete params['segment'];
        const queryString = this.$helpers.convertQueryString(params);
        window.location = this.getSearchUrl(queryString);
      }
    },
    async fetchMore() {
      if (!this.has_more) return;
      try {
        this.$nuxt.$loading.start();
        this.loading_more = true;
        const {data} = await this.$axios.get(this.more_api);
        const {items, pagination} = data ?? {};
        this.more_api = pagination?.next_page_url ?? this.more_api;
        this.has_more = pagination?.has_more_pages ?? false;
        if (items && items.length > 0) this.items = [...this.items, ...items];
        this.$nuxt.$loading.finish();
      } catch (error) {
        this.$nuxt.$loading.fail();
        throw error;
      } finally {
        this.loading_more = false;
      }
    }
  }
}
</script>