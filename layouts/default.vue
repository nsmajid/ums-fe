<template>
  <div class="w-100">
    <PreviewAlert/>
    <no-ssr>
      <PageUnavailableLanguageToast/>
      <LazyHeader/>
    </no-ssr>
    <Nuxt/>
    <no-ssr>
      <LazyFooter/>
    </no-ssr>
  </div>
</template>

<script>
export default {
  layout: 'default',
  mounted() {
    this.$store.dispatch('common/INIT_PAGE_WIDTH_LISTENER');
  }
}
</script>