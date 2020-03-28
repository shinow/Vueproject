<template>
  <div class="Paycode">
    <v-touch v-on:swiperight="goback">
      <header>
        <img @click="goback()" src="../../assets/img/fanhu.png" alt />
        <span>邀请好友</span>
      </header>
      <div style="padding-top:0.65rem"></div>

      <div class="cont">
        <div class="yao">您的邀请码</div>
        <ul>
          <li @click="codeYao()">
            <span v-if="show">1234567898</span>
            <div v-if="tu">
              <van-icon name="browsing-history" />
              <van-icon name="browsing-history" />
              <van-icon name="browsing-history" />
            </div>
          </li>
          <li>
            <span>复制邀请码</span>
          </li>
          <li>
            <span>此邀请码剩余时间</span>
            <van-count-down :time="time" format="mm:ss" style="font-size:0.25rem;color:red" />
            <span>分</span>
          </li>
        </ul>
      </div>
      <div class="ercode">
        <img src="../../assets/img/timg.jpg" alt />
        <p>识别二维码下载淘金APP</p>
      </div>
    </v-touch>
  </div>
</template>
<script>
export default {
  name: "Invitefdcode",
  data() {
    return {
      time: 10 * 60 * 1000,
      show: false,
      tu: true
    };
  },
  created() {},
  methods: {
    codeYao() {
      if (this.show == true) {
        this.show = false;
        this.tu = true;
      } else {
        this.show = true;
        this.tu = false;
      }
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
    position: relative;
    width: 85%;
    background: @contcolor;
    border-radius: 4px;
    border: 1px solid rgba(95, 108, 240, 1);
    text-align: center;
    margin: 0 auto;
    margin-top: 0.5rem;
    .yao {
      position: absolute;
      left: 30%;
      top: -0.2rem;
      width: 40%;
      height: 0.38rem;
      background: @bc;
      border-radius: 19px;
      border: 1px solid rgba(95, 108, 240, 1);
      font-size: 0.17rem;
      font-family: PingFangSC;
      color: rgba(255, 255, 255, 1);
      line-height: 0.38rem;
    }
    ul {
      overflow: hidden;
      li:nth-child(1) {
        width: 80%;
        height: 0.45rem;
        background: @bc;
        border-radius: 3px;
        border: 1px solid rgba(95, 108, 240, 1);
        margin: 0.35rem 0 0 10%;
        font-size: 24px;
        font-family: HiraginoSansGB-W6, HiraginoSansGB;
        font-weight: normal;
        color: rgba(255, 255, 255, 1);
        line-height: 0.45rem;
        letter-spacing: 2px;
      }
      li:nth-child(2) {
        font-size: 12px;
        font-family: PingFangSC;
        color: @btn2;
        line-height: 17px;
        letter-spacing: 1px;
        margin: 0.1rem 0 0 0;
      }
      li:nth-child(3) {
        margin: 0 auto;
        text-align: center;
        color: white;
        margin: 0.15rem 0 0.15rem 0;
        span:nth-child(1) {
          width: 50%;
          float: left;
          margin-left: 8%;
        }
        .van-count-down {
          width: 13%;
          float: left;
          margin-top: -0.02rem;
        }
      }
    }
  }
  .ercode {
    margin-top: 0.6rem;
    width: 100%;
    text-align: center;
    img {
      width: 1.4rem;
      height: 1.4rem;
    }
    p {
      margin-top: 0.15rem;
      font-size: 0.17rem;
      font-family: PingFangSC;
      color: rgba(255, 255, 255, 1);
      line-height: 20px;
      letter-spacing: 1px;
    }
  }
}
</style>
