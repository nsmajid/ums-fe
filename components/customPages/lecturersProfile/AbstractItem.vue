<template>
  <div class="w-100">
    <div class="mb-2">Abstrak : <span class="text-underlined text-primary cursor-pointer" @click="collapsed = !collapsed">CLICK TO EXPAND</span></div>
    <b-collapse
    :visible="collapsed"
    class="w-100">
      <p class="text-italic">{{ content }}</p>
    </b-collapse>
  </div>
</template>
<script>
export default {
  name: 'AbstractItem',
  props: {
    content: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      collapsed: false
    }
  }
}
</script>