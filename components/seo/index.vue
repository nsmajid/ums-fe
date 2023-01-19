<template>
  <fragment/>
</template>
<script>
import {Fragment} from 'vue-fragment';
export default {
  name: 'Seo',
  head() {
    const {seo_meta} = this.seoMeta ?? {};
    return seo_meta ?? {};
  },
  components: {
    Fragment
  },
  computed: {
    seoMeta() {
      return this.$store.getters['page/getPageMeta'];
    }
  }
}
</script>