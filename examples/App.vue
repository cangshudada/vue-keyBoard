<template>
  <div class="demo">
    <input type="text" v-model="value" @focus="visible = true" />
    <input type="text" v-model="value" @focus="visible = true" />
    <Key-Board
      v-model="value"
      :visible="visible"
      showHandleBar
      @close="close"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      value: ""
    };
  },
  methods: {
    close() {
      this.visible = false;
    }
  },
  components: {},
};
</script>

<style scoped lang='less'>
.demo {
  width: 100%;
  height: 100%;
}
</style>

