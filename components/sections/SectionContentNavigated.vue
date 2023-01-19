<template>
  <section
  :id="data.slug_id"
  class="fe-section fe-wrapper">
    <div class="row mx-0 my-5">
      <div class="col col-12 col-md-3">
        <div class="section-28-navigation pr-2 pr-lg-4 flex-wrap d-none d-md-block mb-4">
          <template v-for="(row, index) in (items || [])">
            <div
            :key="index"
            v-if="row.title"
            class="mb-2 fs-subtitle-2 fw-600 text-right mr-3 mr-lg-0">
              <span 
              @click="scrollTo(`s28${index}_${$helpers.strToSlug(row.title)}`)"
              class="cursor-pointer text-black">
                {{ row.title }}
              </span>
            </div>
          </template>
        </div>
      </div>
      <div class="col col-12 col-md-9">
        <div
        v-for="(row, index) in (items || [])"
        :key="index"
        class="w-100 mb-4"
        :id="`s28${index}_${$helpers.strToSlug(row.title)}`">
          <template v-if="row.type == 'text'">
            <div class="fs-subtitle-2 fw-600 mb-2">
              {{ row.title }}
            </div>
            <div class="fe-separator mb-3"/>
            <div v-html="row.text"/>
          </template>
          <template v-if="row.type == 'button'">
            <div class="w-100 bg-tosca p-3 d-flex flex-wrap justify-content-between align-items-center">
              <div class="text-white fs-content-1 fw-600 mb-2">
                {{ row.card_text }}
              </div>
              <a
              v-if="(row.button_text && row.button_link)"
              :href="row.button_link">
                <Button
                type="secondary"
                class="fs-content-1 fw-600"
                :title="row.button_text"
                iconCls="mdi-arrow-right-bold-circle"/>
              </a>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SectionContentNavigated',
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  computed: {
    body() {
      return this.data.body;
    },
    items() {
      return (this.body.component_items || []).filter(({type, text, button_text}) => {
        if (type === 'text') return !!text
        if (type === 'button') return !!button_text
        return true
      });
    }
  },
  methods: {
    scrollTo(elementId) {
      document.getElementById(elementId).scrollIntoView();
      setTimeout(function(){
        let scrolledY = window.scrollY;
        if (scrolledY) window.scroll(0, scrolledY - document.querySelector("header.fe-ums-header").offsetHeight);
      }, 500);
    }
  }
}
</script>