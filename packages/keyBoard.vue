<template>
  <transition :name="animateClass || 'move-bottom-to-top'">
    <div id="key-board" v-if="visible">
      <div class="key-board-container">
        <!-- 结果展示 -->
        <Result />
        <div class="key-board-area">
          <!-- 默认键盘 -->
          <DefaultBoard
            v-if="showMode === 'default'"
            @modeChange="modeChange"
          />
          <!-- 标签 -->
          <SymbolBoard v-if="showMode === 'symbol'" @modeChange="modeChange" />
          <!-- 手写键盘 -->
          <HandBoard v-if="showMode === 'handwrite'" @modeChange="modeChange" />
        </div>
      </div>
      <div v-if="showHandleBar" class="key-board-drag-handle" v-handleDrag>
        将键盘拖到您喜欢的位置
        <svg-icon icon-class="drag" />
      </div>
    </div>
  </transition>
</template>

<script>
import "@/libs/flexible";
import "@/assets/css/keyBoard.less";
import handleDrag from "@/directive/drag";
import Result from "@/components/result/index";
import SvgIcon from "@/components/svgIcon/svgIcon";
import SymbolBoard from "@/components/symbol/index";
import DefaultBoard from "@/components/default/index";
import HandBoard from "@/components/handBoards/index";
const requireContext = require.context('./icons', false, /\.svg$/);
const importAll = r => r.keys().map(r);
importAll(requireContext);
export default {
  name: "KeyBoard",
  props: {
    visible: {
      type: Boolean,
      require: true
    },
    modeList: {
      type: Array,
      default: () => ["handwrite", "symbol"]
    },
    defaultMode: {
      type: String,
      default: "default"
    },
    value: String,
    showHandleBar: Boolean,
    animateClass: String
  },
  provide() {
    return {
      modeList: this.modeList,
    }
  },
  directives: { handleDrag },
  data() {
    return {
      showMode: "default"
    }
  },
  created() {
    // 设置默认键盘显示模式
    this.setDefaultKeyBoardMode();
  },
  methods: {
    // 设置默认键盘显示模式
    setDefaultKeyBoardMode() {
      switch (this.defaultMode) {
        case "handwrite":
          this.showMode = "handwrite";
          break;
        case "symbol":
          this.showMode = "symbol";
          break;
        default:
          this.showMode = "default";
          break;
      }
    },
    // 模式切换
    modeChange(mode) {
      console.log('mode', mode)
    }
  },
  components: {
    Result,
    SvgIcon,
    HandBoard,
    SymbolBoard,
    DefaultBoard
  },
};
</script>
