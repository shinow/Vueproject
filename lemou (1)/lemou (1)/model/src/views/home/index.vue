<template>
  <div class="home">
    <v-touch v-on:swiperight="onSwipeLeft" v-on:swipeleft="onSwiperight">
      <div class="head">
        <van-icon name="bars" @click="sho" :dot="a" />
        <div class="titled">
          <span>接单</span>
          <span @click="Ongoing">进行中</span>
          <div class="hua"></div>
        </div>
        <van-icon name="location" />
      </div>
      <div class="cont">
        <p class="p1">MA为通用积分，1MA等于1RMB，MA和RMB等价交换， MA为本平台通用货币。</p>
        <div class="conLeft">
          <p>可用MA</p>
          <p>1234511.78</p>
          <p>MA 提现</p>
        </div>
        <div class="conright">
          <p>今日获取MA</p>
          <p>12345.78</p>
          <p @click="Rechargey">MA 充值</p>
        </div>
      </div>
      <div class="mssage">
        <ul>
          <li>
            <van-icon name="bell" />
            <span>消息</span>
          </li>
          <li>
            <p>APP维护结束通知</p>
            <p>2019-12-31 13:30</p>
          </li>
          <li>
            <p>APP无法正常登陆修复相关消息</p>
            <p>2019-12-31 13:30</p>
          </li>
        </ul>
      </div>
      <div class="bth">
        <button @click="orders">历史订单</button>
        <button @click="Ongoing">开启接单</button>
      </div>
    </v-touch>
    <!-- ////////////左边 -->
    <v-touch v-on:swipeleft="onSwiperight">
      <van-popup v-model="show" position="left" :style="{ height: '100%' }">
        <div class="popdia">
          <div class="co">
            <van-icon name="close" @click="onSwiperight" />
          </div>
          <div class="diahea">
            <img src="../../assets/img/timg.jpg" alt />
            <p>Hey baby</p>
            <p>ID：123456</p>
            <van-icon name="photo" />
          </div>
          <div class="disu">
            <ul>
              <li @click="onSwiperight">
                <van-icon name="stop-circle" />
                <span>我的首页</span>
                <van-icon name="arrow" />
              </li>
              <li @click="Pdodo">
                <van-icon name="bookmark" />
                <span>拼多多</span>
                <van-icon name="arrow" />
              </li>
              <li @click="Payswitch">
                <van-icon name="descending" />
                <span>收款开关</span>
                <van-icon name="arrow" />
              </li>
              <li @click="Paycode">
                <van-icon name="card" />
                <span>收款管理</span>
                <van-icon name="arrow" />
              </li>
              <li @click="commproblem">
                <van-icon name="more" />
                <span>常见问题</span>
                <van-icon name="arrow" />
              </li>
              <li @click="Setup">
                <van-icon name="setting" />
                <span>关于设置</span>
                <van-icon name="arrow" />
              </li>
              <li @click="Productrate">
                <van-icon name="cluster" />
                <span>产品汇率</span>
                <van-icon name="arrow" />
              </li>
              <li @click="Invitefd">
                <van-icon name="friends" />
                <span>邀请好友</span>
                <van-icon name="arrow" />
              </li>
              <li @click="newspro">
                <van-icon name="bell" :dot="a" />
                <span>消息中心</span>
                <van-icon name="arrow" />
              </li>
              <li>
                <van-icon name="manager" />
                <span>联系客服</span>
                <van-icon name="arrow" />
              </li>
            </ul>
          </div>
        </div>
      </van-popup>
    </v-touch>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      show: false,
      a: true
    };
  },
  created() {},
  methods: {
    Pdodo() {
      this.$router.push("/me/Pdodo");
    },
    commproblem() {
      this.$router.push("/commproblem");
    },
    Setup() {
      this.$router.push("/Setup");
    },
    Productrate() {
      this.$router.push("/Productrate");
    },
    Invitefd() {
      this.$router.push("/Invitefd");
    },
    Paycode() {
      this.$router.push("/Paycode");
    },
    Payswitch() {
      this.$router.push("/Paymentswitch");
    },
    orders() {
      this.$router.push("/orders");
    },
    newspro() {
      this.$router.push("/newspro");
    },
    Ongoing() {
      this.$router.push("/Ongoing");
    },
    Rechargey() {
      this.$router.push("/Rechargey");
    },
    onSwipeLeft() {
      this.show = true;
    },
    onSwiperight() {
      this.show = false;
    },
    sho() {
      this.show = true;
    }
  }
};
</script>
<style lang="less" scoped>
.van-popup {
  overflow: hidden;
  width: 3.75rem;
  background: @backc;
  box-shadow: 0px 3px 2px 0px rgba(0, 0, 0, 1);
  color: @white;
}
.home {
  overflow: hidden;
  width: 3.75rem;
  height: 100vh;
  background: @bc;
  .head {
    position: relative;
    height: 0.6rem;
    background: @backc;
    border-radius: 1px;
    font-size: 0.19rem;
    color: @white;
    .van-icon {
      font-size: 0.28rem;
      float: left;
    }
    .titled {
      float: left;
      margin: 0.22rem 0 0 0.51rem;
      span:nth-child(2) {
        margin-left: 0.8rem;
        color: @gray;
      }
      .hua {
        height: 2px;
        width: 0.7rem;
        background-color: @white;
        position: absolute;
        bottom: 0;
        left: 0.8rem;
        border-radius: 0.5rem;
      }
    }
    .van-icon:nth-child(1) {
      margin: 0.17rem 0 0 0.15rem;
    }
    .van-icon:nth-last-child(1) {
      font-size: 0.23rem;
      float: right;
      margin: 0.18rem 0.17rem 0 0;
    }
  }
  .cont {
    overflow: hidden;
    padding: 0.15rem 0 0 0.2rem;
    font-size: 0.17rem;
    font-family: PingFangSC;
    color: @white;
    line-height: 0.21rem;
    .p1 {
      font-size: 0.15rem;
      font-family: PingFangSC;
      color: @white;
      opacity: 0.4;
      line-height: 0.23rem;
      margin-bottom: 0.3rem;
    }
    .conLeft,
    .conright {
      width: 48%;
      float: left;
      p:nth-child(2) {
        font-size: 0.28rem;
        margin-top: 0.2rem;
      }
      p:nth-child(3) {
        width: 1.5rem;
        height: 0.4rem;
        margin-top: 0.34rem;
        border-radius: 4px;
        border: 1px solid @ziti;
        font-family: HiraginoSansGB-W3, HiraginoSansGB;
        font-weight: normal;
        color: @ziti;
        line-height: 0.4rem;
        text-align: center;
      }
    }
    .conright {
      margin-left: 0.1rem;
    }
  }
  .mssage {
    width: 3.32rem;
    margin: 0.4rem auto;
    background: @backc;
    border-radius: 4px;
    font-size: 0.16rem;
    font-family: HiraginoSansGB-W6, HiraginoSansGB;
    font-weight: normal;
    color: @white;
    height: 1.8rem;
    overflow-x: hidden;
    overflow-y: scroll;
    ul {
      padding-top: 0.04rem;
      padding-bottom: 0.25rem;
      li {
        margin-left: 0.33rem;
        margin-top: 0.16rem;
        p:nth-child(2) {
          color: @gray;
          margin-top: 0.08rem;
        }
      }
      li:nth-child(1) {
        margin-left: 0.15rem;
        margin-bottom: 0.25rem;
      }
    }
  }

  .mssage::-webkit-scrollbar {
    display: none;
  }
  .bth {
    width: 98%;
    margin: 0 auto;
    position: absolute;
    bottom: 0.2rem;
    font-size: 0.2rem;
    font-family: PingFangSC;
    color: @white;
    button:nth-child(1) {
      width: 35%;
      height: 0.55rem;
      background: @btn1;
      border-radius: 4px;
      margin-left: 1.3%;
    }
    button:nth-child(2) {
      width: 62%;
      height: 0.55rem;
      background: @btn2;
      border-radius: 4px;
    }
  }
  ///////////左边滑动样式
  .popdia {
    .co {
      width: 3.75rem;
      color: white;
      font-size: 0.3rem;
      overflow: hidden;
      .van-icon {
        float: right;
        margin: 0.2rem 0.2rem 0 0;
      }
    }
    .diahea {
      padding: 0.2rem 0 0 0.24rem;
      overflow: hidden;
      img {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 10%;
        margin-right: 0.2rem;
        float: left;
      }
      p:nth-child(2) {
        margin-top: 0.05rem;
      }
      p:nth-child(3) {
        margin-top: 0.15rem;
      }
      .van-icon {
        float: right;
        font-size: 0.2rem;
        margin: -0.4rem 0.2rem 0 0;
      }
    }
    .disu {
      margin: 0.5rem 0 0 0.2rem;
      ul {
        li {
          width: 90%;
          height: 0.4rem;
          line-height: 0.4rem;
          border-bottom: 1px solid @contcolor;
          .van-icon:nth-child(1) {
            margin: 0.105rem 0 0 0.1rem;
            float: left;
          }
          span {
            margin-left: 0.1rem;
            margin-top: -0.02rem;
          }
          .van-icon:nth-child(3) {
            float: right;
            margin: 0.1rem 0.1rem 0 0;
          }
        }
      }
    }
  }
}
</style>