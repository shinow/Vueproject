<template>
  <div class="Paycode">
    <v-touch v-on:swiperight="goback">
      <header>
        <img @click="goback()" src="../../assets/img/fanhu.png" alt />
        <span>添加收款码</span>
      </header>
      <div style="padding-top:0.65rem"></div>
      <div class="cont">
        <ul>
          <li @click="payalicode">
            <img src="../../assets/img/支付宝.png" alt />
            <span>支付宝收款码</span>
            <van-icon name="scan" />
          </li>
          <li @click="WXcode">
            <img src="../../assets/img/微信.png" alt />
            <span>微信收款码</span>
            <van-icon name="scan" />
          </li>
          <li @click="Flashcode">
            <img src="../../assets/img/云闪付.png" alt />
            <span>云闪付收款码</span>
            <van-icon name="scan" />
          </li>
          <li @click="bankcard">
            <img src="../../assets/img/银行卡.png" alt />
            <span>银行卡</span>
            <van-icon name="scan" />
          </li>
          <li @click="jvhee">
            <img src="../../assets/img/聚合码.jpg" alt />
            <span>聚合码</span>
            <van-icon name="scan" />
          </li>
          <li @click="SolidCode">
            <img src="../../assets/img/支付宝固码.jpg" alt />
            <span>支付宝固码</span>
            <van-icon name="scan" />
          </li>
        </ul>
      </div>
    </v-touch>
  </div>
</template>
<script>
export default {
  name: "Paycode",
  data() {
    return {};
  },
  created() {},
  methods: {
    goback() {
      this.$router.push("/home");
    },
    jvhee() {
      this.$router.push({
        name: "jvhee"
      });
    },
    payalicode() {
      this.$router.push({
        name: "payalicode"
      });
    },
    WXcode() {
      this.$router.push({
        name: "WXcode"
      });
    },
    SolidCode() {
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
<style lang="less" scoped>
.Paycode {
  width: 3.75rem;
  height: 100vh;
  background: @bc;
  .cont {
    width: 3.6rem;
    background: @contcolor;
    border-radius: 4px;
    font-size: 14px;
    margin: 0 auto;
    font-family: HiraginoSansGB-W3, HiraginoSansGB;
    font-weight: normal;
    color: rgba(255, 255, 255, 1) !important;
    ul {
      z-index: 2;
      color: white;
      padding-bottom: 0.2rem;
      li {
        margin-top: 0.07rem;
        width: 90%;
        margin-left: 0.2rem;
        height: 0.45rem;
        border-bottom: 0.01rem solid #232b5a;
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
          font-size: 0.2rem;
          float: right;
          margin: 0.08rem 0.13rem 0 0;
        }
      }
      li:nth-child(1) {
        padding-top: 0.1rem;
      }
    }
  }
}
</style>
