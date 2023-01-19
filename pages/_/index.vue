<template>
  <div class="w-100">
    <Seo/>
    <template v-if="pageStatus == PAGE_STATUS_SUCCESS">
      <Sections/>
    </template>
    <LazyPageNotFound v-if="pageStatus == PAGE_STATUS_NOT_FOUND"/>
    <LazyPageUnderMaintenance v-if="pageStatus == PAGE_STATUS_MAINTENANCE"/>
    <div
    v-if="toggleSearchbox"
    class="content-overlay"/>
  </div>
</template>
<script>
import {
  PAGE_STATUS_SUCCESS,
  PAGE_STATUS_NOT_FOUND,
  PAGE_STATUS_MAINTENANCE
} from '~/constants';

export default {
  name: 'Page',
  fetchOnServer() {
    const {debug} = this?.$route?.query ?? {};
    return !(debug == 'true');
  },
  computed: {
    pageType() {
      return this.$store.getters['page/getPageType'];
    },
    pageStatus() {
      return this.$store.getters['page/getPageStatus'];
    },
    toggleSearchbox() {
      return this.$store.getters['common/getToggleSearchbox'];
    },
  },
  async fetch() {
    const {path, query} = this.$route;
    await this.$store.dispatch('page/FETCH_PAGE_DATA', {
      params: {
        url: path.substring(1).replace(/\/$/, "") ?? null,
        ...query
      }
    });
  },
  data() {
    return {
      PAGE_STATUS_SUCCESS: PAGE_STATUS_SUCCESS,
      PAGE_STATUS_NOT_FOUND: PAGE_STATUS_NOT_FOUND,
      PAGE_STATUS_MAINTENANCE: PAGE_STATUS_MAINTENANCE
    }
  },
  mounted() {
    document.body.style.zoom = '90%';
  }
}
</script>