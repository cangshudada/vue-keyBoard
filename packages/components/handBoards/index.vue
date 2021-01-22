<template>
  <!-- 手写 -->
  <div class="hand-write-board">
    <!-- 手写板 -->
    <PaintBoard />
    <!-- 操作按钮栏 -->
    <div class="hand-write-board-opers"></div>
  </div>
</template>

<script>
import PaintBoard from "./paintBoard";
export default {
  props: {

  },
  data() {
    return {

    };
  },
  computed: {

  },
  created() {

  },
  mounted() {

  },
  watch: {

  },
  methods: {

  },
  components: {
    PaintBoard
  }
};
</script>

<style scoped lang='less'>
.hand-write-board {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .paint-board {
    margin: 0 35px;
    width: 1185px;
    height: 450px;
    background: #ededed;
    border-radius: 30px;

    canvas {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
