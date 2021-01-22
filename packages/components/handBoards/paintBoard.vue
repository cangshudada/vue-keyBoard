<template>
  <div class="paint-board">
    <canvas
      ref="canvas"
      :width="width"
      :height="height"
      @touchstart="down"
      @touchmove="move"
      @touchend="mouseup"
      @mousedown="down"
      @mousemove="move"
      @mouseup="mouseup"
      @mouseleave="leave"
    ></canvas>
  </div>
</template>

<script>
import variables from "@/assets/css/theme.less";
export default {
  data() {
    return {
      // 宽
      width: 0,
      // 高
      height: 0,
      // canvas dom
      canvas: null,
      // canvas上下文
      ctx: null,
      // 是否按下
      isMouseDown: false,
      // 当前canvas相距左上角x
      x: 0,
      // 当前canvas相距左上角y
      y: 0,
      // 旧x坐标
      oldX: 0,
      // 旧y坐标
      oldY: 0,
      //轨迹X
      clickX: [],
      //轨迹Y
      clickY: [],
      //轨迹标志位，为1则是终点
      clickC: [],
      // 定时器id
      timer: 0,
    };
  },
  mounted() {
    // 面板初始化
    this.paintBoardInit();
  },
  methods: {
    paintBoardInit() {
      this.$nextTick(() => {
        this.canvas = this.$refs.canvas;
        this.ctx = this.canvas.getContext("2d");
        this.reload();
        this.updateBound();
        window.addEventListener("animationend", this.updateBound);
        window.addEventListener("resize", this.updateBound);
        window.addEventListener("scroll", this.updateBound);
      });
    },
    updateBound() {
      if (!this.canvas) return;
      const bound = this.canvas.getBoundingClientRect();
      this.x = bound.x;
      this.y = bound.y;
      this.width = parseFloat(window.getComputedStyle(document.querySelector(".paint-board")).width);
      this.height = parseFloat(window.getComputedStyle(document.querySelector(".paint-board")).height);
    },
    reload() {
      if (!this.canvas || !this.ctx) return;
      this.clickX = [];
      this.clickY = [];
      this.clickC = [];
      this.ctx.clearRect(0, 0, this.width, this.height);
    },
    getCx(event) {
      return Math.floor(
        (event.clientX ||
          event.targetTouches[0].clientX) - this.x
      );
    },
    getCy(event) {
      return Math.floor(
        (event.clientY ||
          event.targetTouches[0].clientY) - this.y
      );
    },
    // 按下
    down(event) {
      if (!this.ctx) return;
      const cx = this.getCx(event);
      const cy = this.getCy(event);
      clearTimeout(this.timer);
      this.oldX = cx;
      this.oldY = cy;
      this.ctx.beginPath();
      this.isMouseDown = true;
    },
    // 移动
    move(event) {
      if (!this.ctx) return;
      event.preventDefault();
      if (this.isMouseDown) {
        const cx = this.getCx(event);
        const cy = this.getCy(event);
        this.clickX.push(cx);
        this.clickY.push(cy);
        this.clickC.push(0);
        //画图
        this.ctx.strokeStyle = variables.primaryColor;
        this.ctx.fillStyle = variables.primaryColor;
        this.ctx.lineWidth = 4;
        this.ctx.lineCap = "round";
        this.ctx.moveTo(this.oldX, this.oldY);
        this.ctx.lineTo(cx, cy);
        this.ctx.stroke();
        this.oldX = cx;
        this.oldY = cy;
      }
    },
    // 松开
    mouseup() {
      if (this.isMouseDown) {
        this.isMouseDown = false;
        this.timer = setTimeout(() => {
          this.reload();
        }, 1500);
        //标记最后一点为终点
        this.clickC.pop();
        this.clickC.push(1);
      }
    },
    // 离开
    leave() {
      if (this.isMouseDown) {
        this.isMouseDown = false;
        this.timer = setTimeout(() => {
          this.reload();
        }, 1500);
        //标记最后一点为终点
        this.clickC.pop();
        this.clickC.push(1);
      }
    },
  },
  components: {

  },
};
</script>
