<template>
  <svg :class="svgClass" :style="svgStyle" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    width: {
      type: [Number, String],
      default: 24
    },
    height: {
      type: [Number, String],
      default: 24
    }
  },
  computed: {
    iconName({ iconClass }) {
      return `#icon-${iconClass}`
    },
    svgClass({ className }) {
      if (className) {
        return 'svg-icon ' + className
      } else {
        return 'svg-icon'
      }
    },
    svgStyle({ width, height }) {
      return {
        width: `${width}px`,
        height: `${height}px`
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  overflow: hidden;
  fill: currentcolor;
}
</style>
