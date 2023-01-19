<template>
  <section
  :id="data.slug_id"
  class="fe-section w-100">
    <div class="row mx-0 bg-primary">
      <div
      class="col col-12 col-md-8 pr-md-5 order-2 order-md-1 fe-wrapper"
      :style="{
        paddingTop: '6rem',
        paddingBottom: '6rem',
      }">
        <span
        v-if="body.card_title"
        class="fs-title-1 fw-700 font-title text-white">
          {{ body.card_title }}
        </span>
        <p
        v-if="body.description"
        class="text-white mt-3 fs-content-1 fw-600">
          {{ body.description }}
        </p>
        <div class="row mx-0">
          <div class="col col-4 col-md-4 col-lg-4 px-0">
            <select
            v-if="(body.programs && body.programs.length > 0)"
            v-model="selectedIndexProgram"
            placeholder="Pilih"
            class="bg-white py-2 px-3 border-0 mr-0 fe-h-custom-search-1 fs-subtitle-2 fw-600 w-100 rounded-0 custom-select">
              <template v-for="(program, index) in body.programs">
                <option
                :value="index"
                :key="index">
                  {{ program.name }}
                </option>
              </template>
            </select>
          </div>
          <div class="col col-8 col-md-8 col-lg-7 px-0 d-flex">
            <div
            v-click-outside="function() { setShowSuggestion(false) }"
            class="position-relative d-flex w-100" style="padding-left: 0.15rem;">
              <input
              type="text"
              @focus="showSuggestion = true"
              v-model="searchedText"
              class="bg-white py-2 px-3 border-0 fe-h-custom-search-1 w-100 fs-subtitle-2 fw-600"/>
              <div
              v-if="(showSuggestion && suggestions && suggestions.length > 0)"
              class="position-absolute mt-1 bg-white w-100 section-searchbox-suggestion">
                <template v-for="(row, index) in suggestions">
                  <a
                  :key="index"
                  :href="row.url"
                  class="cursor-pointer d-flex fs-12 suggestion-item py-1 px-2 text-primary">
                    {{ row.name }}
                  </a>
                </template>
              </div>
            </div>
            <Button
            type="secondary"
            class="mr-2 rounded-0 fe-h-custom-search-1 px-4"
            iconCls="mdi-magnify fs-title-2 fw-700"/>
          </div>
        </div>
        <a
        v-if="(allProgramsLink && body.button_text)"
        :href="allProgramsLink">
          <Button
          type="secondary"
          class="fs-subtitle-2 fw-600 d-block mt-4"
          :title="body.button_text"
          iconCls="mdi-arrow-right-bold-circle"/>
        </a>
      </div>
      <div
      v-if="body.image_side"
      class="col col-12 col-md-4 fe-image-side-bg order-1 order-md-2"
      :style="{
        background: `url(${assetUrl + body.image_side})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }"/>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SectionImageWithSeachbox',
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      selectedIndexProgram: 0,
      searchedText: '',
      allProgramsLink: '',
      showSuggestion: false,
      suggestions: []
    }
  },
  computed: {
    assetUrl() {
      return this.$store.getters['page/getAssetUrl'];
    },
    body() {
      return {
        ...this.data.body,
        programs: (this.data?.body?.programs && this.data.body.programs.filter((r) => (r.items && r.items.length > 0))) || []
      };
    }
  },
  watch: {
    selectedIndexProgram() {
      this.searchedText = '';
      this.allProgramsLink = '';
      this.getSuggestions();
    },
    searchedText() {
      this.getSuggestions();
    },
    body: {
      deep: true,
      handler: function() {
        this.getSuggestions();
      }
    },
  },
  mounted() {
    this.getSuggestions();
  },
  methods: {
    getSuggestions() {
      let me = this;
      const {url, items} = this.body.programs.find((_, index) => index === me.selectedIndexProgram) || {};

      this.showSuggestion = true;
      this.allProgramsLink = url || '';

      const key = (this.searchedText || '').toLowerCase();
      this.suggestions = (items && items.filter((row) => {
        if (!key) return false;
        return (row.name || '').toLowerCase().includes(key);
      })) || [];
    },
    setShowSuggestion(value) {
      this.showSuggestion = value;
    }
  }
}
</script>