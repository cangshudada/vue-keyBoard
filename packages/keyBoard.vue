<template>
  <transition :name="animateClass || 'move-bottom-to-top'">
    <div class="key-board" v-if="visible" @mousedown.prevent>
      <div class="key-board-container">
        <!-- 结果展示 -->
        <Result :data="resultVal" @change="change" />
        <div class="key-board-area">
          <!-- 默认键盘 -->
          <DefaultBoard
            ref="defaultBoardRef"
            v-if="showMode === 'default'"
            @trigger="trigger"
            @change="change"
            @translate="translate"
          />
          <!-- 手写键盘 -->
          <HandBoard
            v-if="showMode === 'handwrite'"
            @trigger="trigger"
            @change="change"
          />
        </div>
      </div>
      <div
        v-if="showHandleBar"
        class="key-board-drag-handle"
        :style="{ color }"
        v-handleDrag
      >
        拖到您喜欢的位置
        <svg-icon icon-class="drag" />
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from "vue";
import "@/libs/flexible";
import "@/assets/css/keyBoard.less";
import handleDrag from "@/directive/drag";
import Result from "@/components/result/index";
import SvgIcon from "@/components/svgIcon/svgIcon";
import { axiosConfig } from "./helper/axiosConfig";
import DefaultBoard from "@/components/default/index";
import HandBoard from "@/components/handBoards/index";
import pinYinNote from "@/constants/pinyin_dict_note";
const requireContext = require.context("./icons", false, /\.svg$/);
const importAll = (r) => r.keys().map(r);
importAll(requireContext);
Vue.prototype.$EventBus = new Vue();
export default {
  name: "KeyBoard",
  inheritAttrs: false,
  props: {
    // 主题色
    color: {
      type: String,
      default: "#eaa050",
    },
    // 显示的模式列表
    modeList: {
      type: Array,
      default: () => ["handwrite", "symbol"],
    },
    // 是否blur状态下自动隐藏
    blurHide: {
      type: Boolean,
      default: true,
    },
    // 是否显示拖拽句柄
    showHandleBar: {
      type: Boolean,
      default: true,
    },
    // v-modl
    value: String,
    // 手写识别接口  如果不存在则不会显示手写面板
    handApi: String,
    // 动画的className
    animateClass: String,
  },
  provide() {
    return {
      color: this.color,
      modeList: this.modeList,
      handApi: this.handApi,
      closeKeyBoard: () => {
        this.visible = false;
        this.currentInput.blur();
      },
      changeDefaultBoard: () => {
        this.showMode = "default";
      },
    };
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
      currentInput: null,
      // 显示字符
      resultVal: {},
    };
  },
  mounted() {
    // 注册键盘
    this.signUpKeyboard();

    this.$EventBus?.$on("resultReset", () => {
      this.resultVal = {};
    });
  },
  methods: {
    // 注册键盘
    signUpKeyboard() {
      // 设置baseUrl
      axiosConfig(this.handApi);
      this.inputList = [...document.querySelectorAll("input")].filter(
        (item) => item.getAttribute("data-mode") !== null
      );
      this.inputList.forEach((input) => {
        input.addEventListener("focus", this.showKeyBoard);
        this.blurHide && input.addEventListener("blur", this.hideKeyBoard);
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
      this.showMode = "default";
      this.resultVal = {};
    },
    // 设置默认键盘显示模式
    setDefaultKeyBoardMode(mode) {
      // 默认初始化都是中文键盘
      this.$nextTick(() => {
        this.$EventBus?.$emit("keyBoardChange", "CN");
      });
      switch (mode) {
        // 手写键盘
        case "handwrite":
          if (
            this.modeList.find((mode) => mode === "handwrite") &&
            this.handApi
          ) {
            this.showMode = "handwrite";
            this.$nextTick(() => {
              this.$EventBus?.$emit("keyBoardChange", "handwrite");
            });
          } else {
            this.showMode = "default";
          }
          break;
        // 标点键盘
        case "symbol":
          this.showMode = "default";
          // 如果存在标点键盘才允许切换
          if (this.modeList.find((mode) => mode === "symbol")) {
            this.$nextTick(() => {
              this.$refs.defaultBoardRef.click({
                data: ".?123",
                type: "change2num",
              });
              this.$refs.defaultBoardRef.click({
                data: "#+=",
                type: "#+=",
              });
            });
          }
          break;
        // 默认
        default:
          this.showMode = "default";
          break;
      }
    },
    // 模式切换
    trigger({ type }) {
      switch (type) {
        case "handwrite":
          {
            this.showMode = "handwrite";
          }
          break;
        case "delete":
          {
            this.$emit("input", this.value.substr(0, this.value.length - 1));
          }
          break;
      }
    },
    // 文字改变
    change(value) {
      this.$emit("input", this.value + value);
      this.$emit("keyChange", value);
    },
    // 拼音转中文
    translate(value) {
      const reg = new RegExp(`^${value}\\w*`);
      const keys = Object.keys(pinYinNote)
        .filter((key) => reg.test(key))
        .sort();
      this.resultVal = {
        code: value,
        value: value ? keys.length > 1
          ? keys.reduce((a, b) => a + pinYinNote[b], "")
          : pinYinNote[keys[0]]
          : "",
      };
      this.$emit("keyChange", value);
    },
  },
  beforeDestroy() {
    this.inputList.forEach((input) => {
      input.removeEventListener("focus", this.showKeyBoard);
      input.removeEventListener("blur", this.hideKeyBoard);
    });
  },
  components: {
    Result,
    SvgIcon,
    HandBoard,
    DefaultBoard,
  },
};
</script>
