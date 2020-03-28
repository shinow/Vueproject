<template>
  <div>
    <van-tabs
      swipeable
      v-model="active"
      animated
      @change="change"
      title-active-color="rgba(80, 100, 235, 1)"
      color="rgba(80, 100, 235, 1)"
    >
      <van-tab title="全部" :name="0">
        <BGorder :Allquan="active"></BGorder>
      </van-tab>
      <van-tab title="已发货" :name="1">
        <shipped :Allquan="active"></shipped>
      </van-tab>
      <van-tab title="已完成" :name="2">
        <completed :Allquan="active"></completed>
      </van-tab>
    </van-tabs>
    <div class="workL">
      <img src="../assets/image/图层 4 拷贝.png" alt />
      <p>开始接单吧，库存商品已上架～</p>
    </div>
  </div>
</template>
<script>
import BGorder from "@/components/BGorder";
import shipped from "@/components/shipped";
import completed from "@/components/completed";
export default {
  components: {
    BGorder,
    shipped,
    completed
  },
  name: "orderOD",
  data() {
    return {
      active: 0
    };
  },
  beforeDestroy() {
    if (window.timerOrder1) {
      clearInterval(window.timerOrder1); //关闭
    }
    if (window.timerOrder) {
      clearInterval(window.timerOrder); //关闭
    }
  },
  methods: {
    change(val) {
      console.log("看下这个打印的值 在子组件中判断用", val);
      this.active = val;
      if (val == 0 || val == 2) {
        if (window.timerOrder1) {
          clearInterval(window.timerOrder1); //关闭
        }
      } else if (val == 1 || val == 2) {
        if (window.timerOrder) {
          clearInterval(window.timerOrder); //关闭
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.van-tabs {
  z-index: 555;
}
.workL {
  width: 100%;
  text-align: center;
  position: fixed;
  top: 2.7rem;
  img {
    width: 2.3rem;
    height: 2.03rem;
  }
  p {
    font-size: 0.2rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    opacity: 0.45;
    margin-top: 0.15rem;
  }
}
</style>