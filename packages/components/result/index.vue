<template>
  <div class="key-board-result">
    <div class="key-board-code-show"></div>
    <div class="key-board-result-show"></div>
  </div>
</template>

<script>
export default {
  props: {
    isShowCode: Boolean,
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {},
};
</script>

<style scoped lang='less'>
.key-board-result {
  width: 1420px;
  height: 139px;
  border-bottom: 1px solid #707070;
  display: flex;
  flex-direction: column;
  align-items: center;

  .key-board-code-show {
    margin-top: 25px;
    width: 1420px;
    height: 40px;
    background: #f5f5f5;
    border-radius: 25px;
    font-size: 32px;
    font-family: Helvetica Neue;
    font-weight: 400;
    line-height: 40px;
    color: #eaa050;
  }

  .key-board-result-show {
    width: 100%;
    flex: 1;
  }
}
</style>
