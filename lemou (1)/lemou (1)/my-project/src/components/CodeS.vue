<template>
  <div>
    <header>
      <img @click="goback()" src="../assets/img/fanhui-2.png" alt />
      <span>收款码管理</span>
    </header>
    <ul>
      <li @click="paymentcode">
        <img src="../assets/img/支付宝.png" alt />
        <span>支付宝收款码</span>
        <van-icon name="arrow" />
      </li>
      <li @click="WXcode">
        <img src="../assets/img/微信.png" alt />
        <span>微信收款码</span>
        <van-icon name="arrow" />
      </li>
      <li @click="Flashcode">
        <img src="../assets/img/云闪付.png" alt />
        <span>云闪付收款码</span>
        <van-icon name="arrow" />
      </li>
      <li @click="bankcard">
        <img src="../assets/img/银行卡.png" alt />
        <span>银行卡</span>
        <van-icon name="arrow" />
      </li>
      <li @click="jvhee">
        <img src="../assets/img/聚合码.jpg" alt />
        <span>聚合码</span>
        <van-icon name="arrow" />
      </li>
      <li @click="SolidCode">
        <img src="../assets/img/支付宝固码.jpg" alt />
        <span>支付宝固码</span>
        <van-icon name="arrow" />
      </li>
    </ul>
    <div class="workL">
      <img src="../assets/image/图层 4 拷贝.png" alt />
      <p>快去上传收款码下单吧！</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "CodeS",
  data() {
    return {};
  },
  created() {},
  methods: {
    goback() {
      this.$router.push({ name: "Memess" });
    },
    jvhee() {
      this.$router.push({
        name: "jvhe"
      });
    },
    paymentcode() {
      this.$router.push({
        name: "paymentcode"
      });
    },
    WXcode() {
      this.$router.push({
        name: "WXcode"
      });
    },
    SolidCode(){
       this.$router.push({
        name: "SolidCode"
      });
    },
    bankcard() {
      this.$router.push({
        name: "bankcard"
      });
    },
    Flashcode() {
      this.$router.push({
        name: "Flashcode"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
ul {
  position: relative;
  padding-top: 0.8rem;
  z-index: 2;
  li {
    z-index: 1;
    margin-top: 0.07rem;
    width: 90%;
    margin-left: 0.2rem;
    height: 0.45rem;
    border-bottom: 0.01rem solid rgba(236, 236, 236, 1);
    img {
      width: 0.25rem;
      height: 0.25rem;
      float: left;
      margin: 0.06rem 0 0 0.01rem;
    }
    span {
      float: left;
      margin: 0.11rem 0 0 0.2rem;
    }
    .van-icon {
      float: right;
      margin: 0.11rem 0.1rem 0 0;
    }
  }
}
.workL {
  width: 100%;
  text-align: center;
  position: fixed;
  opacity: 0.4;
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
