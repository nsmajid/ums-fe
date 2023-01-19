<template>
  <div class="w-100">
    <Sections/>
  </div>
</template>
<script>
export default {
  name: 'SectionPreview',
  layout: 'blank',
  fetchOnServer() {
    const {debug} = this?.$route?.query ?? {};
    return !(debug == 'true');
  },
  async fetch() {
    const {params, query} = this.$route;
    const {id} = params ?? {};
    await this.$store.dispatch('page/FETCH_PAGE_PREVIEW_DATA', {id, params: {
      ...query
    }});
  }
}
</script>