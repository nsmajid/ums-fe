<template>
</template>
<script>
export default {
  name: 'PageUnavailableLanguageToast',
  data() {
    return {isTriggered: false}
  },
  computed: {
    isShowToast() {
      const {language} = this.$store.getters['page/getPageData'] ?? {};
      const {current, content} = language ?? {};
      return ((current !== undefined && content !== undefined) && current != content) ? true : false;
    }
  },
  watch: {
    isShowToast() {
      this.showToast();
    }
  },
  mounted(){
    this.showToast();
  },
  methods: {
    showToast() {
      if (this.isShowToast && !this.isTriggered)
      {
        this.isTriggered = true;
        this.$bvToast.toast('Halaman ini belum tersedia dengan bahasa yang anda pilih', {
          title: `Bahasa belum tersedia`,
          variant: 'warning',
          solid: true
        });
      }
    }
  }
}
</script>