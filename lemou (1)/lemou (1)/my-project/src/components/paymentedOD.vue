<template>
  <div>
    <van-tabs
      swipeable
      v-model="active"
      animated
      title-active-color="rgba(80, 100, 235, 1)"
      color="rgba(80, 100, 235, 1)"
    >
      <van-tab title="待付款">
        <money :Allquan="active"></money>
      </van-tab>
      <van-tab title="已提交">
        <Submitted :Allquan="active"></Submitted>
      </van-tab>
      <van-tab title="已完成">
        <mwanc :Allquan="active"></mwanc>
      </van-tab>
    </van-tabs>
    <div class="workL">
      <img src="../assets/image/图层 4 拷贝.png" alt />
      <p>开始接单吧，库存商品已上架～</p>
    </div>
  </div>
</template>

<script>
import money from "@/components/money";
import Submitted from "@/components/Submitted";
import mwanc from "@/components/mwanc";
export default {
  components: {
    money,
    Submitted,
    mwanc
  },
  name: "paymentedOD",
  data() {
    return {
      active: 0
    };
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

