<template>
  <transition :name="showAnimate || 'move-bottom-to-top'">
    <div id="key-board" v-if="value" :style="keyBoardStyle">
      <div class="key-board-container"></div>
      <div
        v-if="showHandleBar"
        class="key-board-drag-handle"
        @mousedown="handleBarMouseDown"
        @mousemove="handleBarMouseMove"
        @mouseup="handleBarMouseUp"
      >
        将键盘拖到您喜欢的位置
        <svg-icon icon-class="drag"></svg-icon>
      </div>
    </div>
  </transition>
</template>

<script>
import "@/libs/flexible";
import "@/assets/css/keyBoard.less";
import SvgIcon from "@/components/svgIcon/svgIcon";
const requireContext = require.context('./icons', false, /\.svg$/)
const importAll = r => r.keys().map(r)
importAll(requireContext);
export default {
  name: "KeyBoard",
  props: {
    value: Boolean,
    showHandleBar: Boolean,
    modeList: Array,
    defaultMode: String,
    showAnimate: String
  },
  data() {
    return {
      movePos: {
        x: 0,
        y: 0
      },
      isHandleBarMouseDown: false
    }
  },
  computed: {
    keyBoardStyle() {
      let style = {};

      // if (this.isHandleBarMouseDown) {
      //   style = {
      //     left: this.movePos.x,
      //     top: this.movePos.y,
      //     transform: "translate(0, 0)"
      //   }
      // }

      return {
        ...style
      }
    }
  },
  created() {

  },
  mounted() {
  },
  methods: {
    handleBarMouseDown() {
      if (!this.isHandleBarMouseDown) {
        this.isHandleBarMouseDown = true;
      }
    },
    handleBarMouseMove(event) {
      if (this.isHandleBarMouseDown) {
        this.movePos = {
          x: event.pageX,
          y: event.pageY
        }
      }
    },
    handleBarMouseUp() {
      this.isHandleBarMouseDown = false;
    },
  },
  components: {
    SvgIcon
  },
};
</script>
