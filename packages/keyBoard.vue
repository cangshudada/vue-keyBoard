<template>
  <transition :name="animateClass || 'move-bottom-to-top'">
    <div id="key-board" v-if="visible" @mousedown.prevent>
      <div class="key-board-container">
        <!-- 结果展示 -->
        <Result />
        <div class="key-board-area">
          <!-- 默认键盘 -->
          <DefaultBoard
            ref="defaultBoardRef"
            v-if="showMode === 'default'"
            @trigger="trigger"
            @change="change"
          />
          <!-- 手写键盘 -->
          <HandBoard
            v-if="showMode === 'handwrite'"
            @trigger="trigger"
            @change="change"
          />
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
import DefaultBoard from "@/components/default/index";
import HandBoard from "@/components/handBoards/index";
const requireContext = require.context('./icons', false, /\.svg$/);
const importAll = r => r.keys().map(r);
importAll(requireContext);
export default {
  name: "KeyBoard",
  props: {
    modeList: {
      type: Array,
      default: () => ["handwrite", "symbol"]
    },
    blurHide: {
      type: Boolean,
      default: true
    },
    value: String,
    showHandleBar: Boolean,
    animateClass: String
  },
  provide() {
    return {
      modeList: this.modeList,
      closeKeyBoard: function () {
        this.$parent.visible = false;
        this.$parent.currentInput.blur();
      }
    }
  },
  directives: { handleDrag },
  data() {
    return {
      // 展示模式
      showMode: "default",
      // 注册的输入框列表
      inputList: [],
      // 显隐
      visible: false,
      // 当前注册的input
      currentInput: null
    }
  },
  mounted() {
    // 注册键盘
    this.signUpKeyboard();
  },
  methods: {
    // 注册键盘
    signUpKeyboard() {
      this.inputList = [...document.querySelectorAll("input")].filter(item => item.getAttribute("data-mode") !== null);
      this.inputList.forEach((input) => {
        input.addEventListener("focus", this.showKeyBoard);
        // this.blurHide && input.addEventListener("blur", this.hideKeyBoard);
      });
    },
    // 显示键盘
    showKeyBoard({ target }) {
      this.visible = true;
      this.currentInput = target;
      this.setDefaultKeyBoardMode(target.getAttribute("data-mode"));
    },
    // 关闭键盘
    hideKeyBoard() {
      this.visible = false;
    },
    // 设置默认键盘显示模式
    setDefaultKeyBoardMode(mode) {
      switch (mode) {
        case "handwrite":
          this.showMode = "handwrite";
          break;
        case "symbol":
          this.showMode = "default";
          this.$nextTick(() => {
            this.$refs.defaultBoardRef.click({
              data: ".?123",
              type: "change2num"
            });
            this.$refs.defaultBoardRef.click({
              data: "#+=",
              type: "#+="
            })
          })
          break;
        default:
          this.showMode = "default";
          break;
      }
    },
    // 模式切换
    trigger({ type }) {
      switch (type) {
        case "handwrite": {
          this.showMode = "handwrite";
        }
          break;
        case "delete": {
          this.$emit("input", this.value.substr(0, this.value.length - 1));
        }
          break;
      }
    },
    // 文字改变
    change(value) {
      this.$emit("input", this.value + value);
      this.$emit("keyChange", value);
    }
  },
  beforeDestroy() {
    this.inputList.forEach(input => {
      input.removeEventListener("focus", this.showKeyBoard);
      input.removeEventListener("blur", this.hideKeyBoard);
    });
  },
  components: {
    Result,
    SvgIcon,
    HandBoard,
    DefaultBoard
  },
};
</script>
