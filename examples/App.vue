<template>
  <div class="demo">
    <input type="text" @focus="visible = true" />
    <input type="text" @focus="visible = true" />
    <Key-Board v-model="value" :visible="visible" showHandleBar />
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

