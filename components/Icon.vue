<template>
  <span class="material-icons">
    {{ type }}
  </span>
</template>
<script>
export default {
  name: 'Icon',
  props: {
    type: {
      type: String,
      default: ''
    }
  }
}
</script>