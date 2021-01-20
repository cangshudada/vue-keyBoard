<template>
  <svg class="svg-icon" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script>
export default {
  name: "SvgIcon",
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
@import url("../../assets/css/theme.less");
.svg-icon {
  fill: none !important;
  stroke: @primaryColor!important;
}
</style>