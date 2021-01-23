<template>
  <button
    :class="[
      'key-board-button',
      `key-board-button-${type}`,
      {
        'key-board-button-active':
          (isUpper && type === 'upper') ||
          (isNum && type === 'change2num') ||
          (isSymbol && type === '#+='),
      },
    ]"
    @click="click"
  >
    <svg-icon
      v-if="
        type === 'upper' ||
        type === 'delete' ||
        type === 'handwrite' ||
        type === 'close'
      "
      :icon-class="type"
    />
    <span v-else v-html="getCode"></span>
  </button>
</template>

<script>
import SvgIcon from "@/components/svgIcon/svgIcon";
export default {
  props: {
    type: String,
    data: String,
    isCn: Boolean,
    isNum: Boolean,
    isUpper: Boolean,
    isSymbol: Boolean,
  },
  computed: {
    getCode() {
      if (this.type === "change2lang") {
        return this.isCn ? "<label>中</label>/EN" : "<label>EN</label>/中";
      }
      return this.isUpper ? this.data.toUpperCase() : this.data;
    },
  },
  methods: {
    click(event) {
      event.preventDefault();
      this.$emit("click", {
        data: this.isUpper ? this.data.toUpperCase() : this.data,
        type: this.type,
      });
    },
  },
  components: {
    SvgIcon,
  },
};
</script>

<style lang='less'>
@import url("../../assets/css/theme.less");

.key-board-button {
  padding: 0;
  width: 90px;
  height: 90px;
  background: #f5f5f5;
  border-radius: 50%;
  font-size: 35px;
  text-align: center;
  font-family: Helvetica Neue;
  font-weight: 400;
  line-height: 90px;
  color: @primaryColor;
  cursor: pointer;
  outline: none;
  border: none;
  transition: all 0.35s;
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    cursor: pointer;
    font-size: 35px !important;
  }

  svg {
    width: 30px;
    height: 30px;
  }

  &.key-board-button-close {
    svg {
      width: 50px;
      height: 50px;
    }
  }

  &:hover,
  &.key-board-button-active {
    background: @primaryColor;
    color: #f5f5f5;

    svg {
      fill: none !important;
      stroke: #f5f5f5 !important;
    }
  }

  &.key-board-button-delete {
    width: 230px;
    height: 90px;
    border-radius: 45px;
    svg {
      width: 65px;
      height: 28px;
    }
  }

  &.key-board-button-change2num,
  &.key-board-button-change2lang {
    width: 135px;
    height: 90px;
    border-radius: 45px;
  }

  &.key-board-button-space {
    flex: 1;
    height: 90px;
    border-radius: 45px;
  }

  &.key-board-button-change2num,
  &.key-board-button-change2lang {
    font-size: 30px;
  }
}
</style>
