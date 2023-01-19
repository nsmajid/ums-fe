<template>
  <div class="w-100 mb-1">
    <div
    @click="handleCollapse"
    class="w-100 bg-primary row px-2 py-3 mx-0 cursor-pointer">
      <div class="col col-10 col-sm-11 d-flex flex-wrap align-items-center">
        <span class="text-white fs-subtitle-2 fw-700">{{ title }}</span>
      </div>
      <div class="col col-2 col-sm-1 text-white d-flex justify-content-end d-flex flex-wrap align-items-center">
        <span :class="`mdi ${isCollapsed ? 'mdi-chevron-up-circle-outline' : 'mdi-chevron-down-circle-outline'} my-auto fs-subtitle-2`"/>
      </div>
    </div>
    <b-collapse
    :visible="isCollapsed"
    class="w-100">
      <slot/>
    </b-collapse>
  </div>
</template>
<script>
export default {
  name: 'Accordion',
  props: {
    title: {
      type: String,
      default: ''
    },
    defaultCollapsed: {
      type: Boolean,
      default: false
    },
    // onCollapse: {
    //   type: Function,
    //   // default: (isCollapsed) => {
    //   //   console.log(isCollapsed);
    //   // }
    // }
  },
  watch: {
    defaultCollapsed: function (newValue){
      this.isCollapsed = newValue;
    }
  },
  data() {
    return {
      isCollapsed: false
    };
  },
  created() {
    this.isCollapsed = this.defaultCollapsed ? true : false ;
  },
  methods: {
    handleCollapse: function() {
      this.isCollapsed = !this.isCollapsed;
    }
  }
}
</script>