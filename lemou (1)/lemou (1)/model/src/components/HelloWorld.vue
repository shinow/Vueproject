<template>
  <div class="HelloWorld">
    <v-touch    v-on:swiperight="onSwipeLeft">
      <p >qwwwwwwwwwwwwww访问二二二二二二无无无无qwwwwwwwwwwwwww访问二二二二二二无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无</p>
      <van-popup v-model="show" position="left" @close="close" :style="{ height: '100%' }">
        <div>
          <p>1.555</p>
          <p>2.555</p>
          <p>3.555</p>
        </div>
      </van-popup>
      <h1 class="animated bounceInLeft" :class="{ active: isActive }" @click="sho">Example</h1>
    </v-touch>
  </div>
</template>
<script>
import animate from "animate.css";
export default {
  name: "HelloWorld",
  data() {
    return {
      show: false,
      isActive: false
    };
  },
  methods: {
    onSwipeLeft() {
      this.$router.push("a");
    },
    sho() {
      this.show = true;
      this.isActive = true;
    },
    close() {
      this.isActive = false;
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
.HelloWorld {
  overflow: hidden;
  .van-popup {
    width: 150px;
    background: darkcyan;
  }
  .active {
    position: relative;
    animation-name: FromLeftToRight;
    animation-duration: 0.42s;
  }
  @keyframes FromLeftToRight {
    0% {
      left: 0;
    }
    100% {
      left: 150px;
    }
  }
}
</style>
