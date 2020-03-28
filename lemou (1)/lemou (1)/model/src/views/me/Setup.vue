<template>
  <div class="Paycode">
    <v-touch v-on:swiperight="goback">
      <header>
        <img @click="goback()" src="../../assets/img/fanhu.png" alt />
        <span>关于设置</span>
      </header>
      <div style="padding-top:0.65rem"></div>
      <div class="cont">
        <ul>
          <li @click="security">
            <span>安全中心</span>
            <van-icon name="arrow" />
          </li>
          <li>
            <span>清除缓存</span>
            <van-icon name="arrow" />
          </li>
          <li>
            <span>软件版本</span>
            <span>1.0.0</span>
          </li>
        </ul>
      </div>
      <div class="btn" @click="goout">
        <button>退出登录</button>
      </div>
    </v-touch>
  </div>
</template>
<script>
export default {
  name: "Setup",
  data() {
    return {};
  },
  created() {},
  methods: {
    security() {
      this.$router.push("/security");
    },
    goback() {
      this.$router.go(-1);
    },
    goout() {
      this.$router.push("/");
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
        span:nth-child(1) {
          float: left;
          margin: 0.11rem 0 0 0.1rem;
        }
        .van-icon,
        span:nth-child(2) {
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
  .btn {
    width: 100%;
    margin: 0 auto;
    font-size: 0.2rem;
    font-family: PingFangSC;
    color: @white;
    margin-top: 1rem;
    button:nth-child(1) {
      width: 96%;
      height: 0.55rem;
      background: @btn2;
      margin-left: 2%;
      border-radius: 4px;
    }
  }
}
</style>
