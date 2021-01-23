<template>
  <!-- 默认键盘 -->
  <div class="default-key-board">
    <div
      :class="['line', `line${index + 1}`]"
      v-for="(line, index) in lineList"
      :key="index"
    >
      <KeyCodeButton
        :isUpper="isUpper"
        v-for="key in line"
        :key="key"
        :type="key"
        :data="key"
        :isSymbol="isSymbol"
        @click="click"
      />
    </div>
    <div class="line line4">
      <KeyCodeButton
        v-for="key in line4"
        :key="key.type"
        :type="key.type"
        :data="key.data"
        :isCn="isCn"
        :isNum="isNum"
        @click="click"
      />
    </div>
  </div>
</template>

<script>
const defaultLineList = [
  {
    data: ".?123",
    type: "change2num",
  },
  {
    data: "",
    type: "change2lang",
  },
  {
    data: " ",
    type: "space",
  },
  {
    data: "",
    type: "close",
  },
];
import { useDeepCopy } from "@/utils";
import KeyCodeButton from "@/components/keyCodeButtton/index";
import { DEFAULT_CODE, NUMBER_CODE, SYMBOL_CODE } from "@/constants/key_code";
export default {
  inject: ["modeList", "closeKeyBoard"],
  data() {
    return {
      lineList: [DEFAULT_CODE.line1, DEFAULT_CODE.line2, DEFAULT_CODE.line3],
      line4: [],
      // 是否大写
      isUpper: false,
      //  中英文模式
      isCn: true,
      // 是否显示数字键盘
      isNum: false,
      // 是否显示符号键盘
      isSymbol: false,
    };
  },
  created() {
    this.getLine4Code();
  },
  methods: {
    // 计算第四行code
    getLine4Code() {
      this.line4 = useDeepCopy(defaultLineList);
      if (this.modeList.find((mode) => mode === "handwrite")) {
        this.line4.splice(2, 0, {
          data: "",
          type: "handwrite",
        });
      }
    },
    // 按钮点击事件
    click({ data, type }) {
      switch (type) {
        //  关闭
        case "close":
          {
            this.closeKeyBoard();
          }
          break;
        //  大小写
        case "upper":
          {
            this.isUpper = !this.isUpper;
          }
          break;
        //   语言
        case "change2lang":
          {
            this.isCn = !this.isCn;
          }
          break;
        //  数字键盘
        case "change2num":
          {
            this.isNum = !this.isNum;
            this.isSymbol = false;
            if (this.isNum) {
              const numberCodeLine3List = useDeepCopy(NUMBER_CODE.line3);
              if (!this.modeList.find((mode) => mode === "symbol")) {
                numberCodeLine3List.shift();
                numberCodeLine3List.unshift("+");
              }
              this.lineList = [
                NUMBER_CODE.line1,
                NUMBER_CODE.line2,
                numberCodeLine3List,
              ];
            } else {
              this.lineList = [
                DEFAULT_CODE.line1,
                DEFAULT_CODE.line2,
                DEFAULT_CODE.line3,
              ];
            }
          }
          break;
        // 切换符号显示
        case "#+=":
          {
            this.isSymbol = !this.isSymbol;
            if (this.isSymbol) {
              this.lineList = [
                SYMBOL_CODE.line1,
                SYMBOL_CODE.line2,
                SYMBOL_CODE.line3,
              ];
            } else {
              this.lineList = [
                NUMBER_CODE.line1,
                NUMBER_CODE.line2,
                NUMBER_CODE.line3,
              ];
            }
          }
          break;
        // 切换手写板以及删除
        case "handwrite":
        case "delete":
          {
            this.$emit("trigger", {
              data,
              type,
            });
          }
          break;
        default:
          {
            // 中文需要转
            if (this.isCn && !this.isNum && !this.isSymbol) {
              // TODO
            } else {
              // 英文直接输出
              this.$emit("change", data);
            }
          }
          break;
      }
    },
  },
  components: {
    KeyCodeButton,
  },
};
</script>

<style scoped lang='less'>
.default-key-board {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .line {
    height: 90px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1350px;

    &.line1 {
      margin-top: 50px;
    }
    &.line2 {
      width: 1210px;
    }
    &.line4 {
      margin-top: 40px;

      .key-board-button {
        & + .key-board-button {
          margin-left: 40px;
        }
      }
    }
  }
}
</style>
