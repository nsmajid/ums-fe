<template>
  <section
  :id="data.slug_id"
  class="fe-section fe-wrapper py-4">
    <div class="row mx-0">
      <div class="col col-3 col-md-2 border-right">
        <h3 class="text-right mb-2 font-weight-bolder">
          The Title
        </h3>
        <div class="d-flex justify-content-end mb-4">
          <span class="fe-separator"/>
        </div>
        <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="`mb-3 text-right ${index == activeTabIndex ? 'text-tosca font-weight-bolder' : 'cursor-pointer font-weight-bold'}`"
        @click="handleChangeTab(index)">
          {{ tab.title }}
        </div>
      </div>
      <div
      class="col col-9 col-md-10"
      v-html="tabs[activeTabIndex].content || '-'"/>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SectionTabs',
  data() {
    return {
      activeTabIndex: 0,
      tabs: [
        {
          title: 'Tab 1',
          content: 'lorem ipsum 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam dignissimos culpa eos similique eaque dolorem vitae. Explicabo, necessitatibus dignissimos fugiat consectetur accusantium dicta quod quos numquam distinctio cupiditate alias voluptas.'
        },
        {
          title: 'Tab 2',
          content: 'lorem ipsum 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam dignissimos culpa eos similique eaque dolorem vitae. Explicabo, necessitatibus dignissimos fugiat consectetur accusantium dicta quod quos numquam distinctio cupiditate alias voluptas.'
        },
        {
          title: 'Tab 3',
          content: 'lorem ipsum 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam dignissimos culpa eos similique eaque dolorem vitae. Explicabo, necessitatibus dignissimos fugiat consectetur accusantium dicta quod quos numquam distinctio cupiditate alias voluptas.'
        }
      ]
    }
  },
  methods: {
    handleChangeTab(index) {
      if (index !== this.activeTabIndex) {
        this.activeTabIndex = index || 0;
      }
    }
  },
}
</script>