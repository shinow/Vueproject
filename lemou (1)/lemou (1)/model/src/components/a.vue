<template>
  <div>
    <v-touch
      class="animated bounceInLeft a"
      v-on:swiperight="onSwipeLeft"
    >进来啦啦啦啦啦啦啦啦啦saaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa是速速深V是订单深V是大V吃饭吗扩木木木木木木木木木木木木木木木木木</v-touch>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    onSwipeLeft() {
      this.$router.push("/");
    }
  }
};
</script>
<style lang="less" scoped>
.a {
  height: 100vh;
  width: 100vh;
}
</style>