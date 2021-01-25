<template>
  <svg
    class="svg-icon"
    :style="{
      stroke: this.color,
    }"
    v-on="$listeners"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>
<script>
export default {
  name: "SvgIcon",
  inject: ["color"],
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ""
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
  }
};
</script>
<style lang='less'>
.svg-icon {
  fill: none !important;
}
</style>