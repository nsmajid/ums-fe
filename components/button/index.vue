<template>
  <button :class="`btn ${btnClass} rounded-${pill ? 'pill' : '0'} ${unbold ? '' : 'font-weight-bold'} border-0 d-inline-flex align-items-center d-flex justify-content-between`">
    <span>{{ title }}</span>
    <span v-if="iconCls" :class="'mdi '+ iconCls + ' ' + (title ? 'ml-1' : '')"/>
  </button>
</template>
<script>
export default {
  name: 'Button',
  props: {
    title: {
      default: ''
    },
    iconCls: {
      default: ''
    },
    type: {
      type: String,
      default: 'primary'
    },
    pill: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'normal'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    unbold: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      btnClass: ''
    };
  },
  mounted() {
    switch (this.type)
    {
      case 'secondary':
        this.btnClass = 'btn-secondary text-primary';
      break;
      case 'dark-green':
        this.btnClass = 'btn-dark-green text-white';
      break;
      case 'primary':
      default:
        this.btnClass = 'btn-primary text-white';
      break;
    }

    switch (this.size)
    {
      case 'small':
        this.btnClass += ' fs-12 px-2 px-md-3 py-1';
      break;
      case 'normal':
      default:
        this.btnClass += ' fs-11 p-3';
      break;
    }
  }
}
</script>