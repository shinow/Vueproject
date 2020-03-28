<template>
  <div class="Paycode">
    <v-touch v-on:swiperight="goback">
      <header>
        <img @click="goback()" src="../../assets/img/fanhu.png" alt />
        <span>安全中心</span>
      </header>
      <div style="padding-top:0.65rem"></div>
      <div class="cont">
        <ul>
          <li @click="changelogin">
            <span>修改登录密码</span>
            <van-icon name="arrow" />
          </li>
          <li @click="Payzhi">
            <span>支付密码设置</span>
            <van-icon name="arrow" />
          </li>
          <li @click="changepay">
            <span>修改支付密码</span>
            <van-icon name="arrow" />
          </li>
          <li @click="Gesture">
            <span>手势密码设置</span>
            <van-icon name="arrow" />
          </li>
          <li @click="Chaddress">
            <span>修改地址</span>
            <van-icon name="arrow" />
          </li>
          <li>
            <span>谷歌验证器</span>
            <van-icon name="arrow" />
          </li>
        </ul>
      </div>
    </v-touch>
  </div>
</template>
<script>
export default {
  name: "security",
  data() {
    return {};
  },
  created() {},
  methods: {
    Chaddress() {
      this.$router.push("/Chaddress");
    },
    Gesture() {
      this.$router.push("/Gesture");
    },
    changepay() {
      this.$router.push("/changepay");
    },
    Payzhi() {
      this.$router.push("/Payzhi");
      console.log(this.$router);
    },
    changelogin() {
      this.$router.push("/changelogin");
    },
    security() {
      this.$router.push("/security");
    },
    goback() {
      this.$router.go(-1);
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
        span {
          float: left;
          margin: 0.11rem 0 0 0.1rem;
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
