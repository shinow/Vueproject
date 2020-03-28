<template>
  <div class="home">
    <v-touch v-on:swiperight="onSwipeLeft" v-on:swipeleft="onSwiperight">
      <div>
        <div class="head">
          <van-icon name="bars" @click="sho" />
          <div class="titled">
            <span @click="home">接单</span>
            <span>进行中</span>
            <div class="hua"></div>
          </div>
          <van-icon name="location" />
        </div>
        <div class="cont">
          <div class="coLeft">
            <ul>
              <li>订单编号： M123456789</li>
              <li>订单金额：123.00</li>
              <li>备注：牛魔王</li>
            </ul>
          </div>
          <div class="coright">
            <button @click="enterOI">确认收款</button>
          </div>
        </div>
        <div class="bth">
          <button @click="orders">历史订单</button>
          <button>关闭接单</button>
        </div>
      </div>
    </v-touch>

    <!-- ////弹窗 -->
    <van-dialog v-model="dialoga" @close="closedis" :showConfirmButton="false">
      <div class="diacont">
        <ul>
          <li>
            <span>订单编号:</span>
            <span>M123456789</span>
          </li>
          <li>
            <span>订单金额:</span>
            <span>123.00</span>
          </li>
          <li>
            <span>订单时间:</span>
            <span>11-11 15.00</span>
          </li>
          <li>
            <span>账户编号:</span>
            <span>qwes</span>
          </li>
          <li>
            <span>订单备注:</span>
            <span>牛魔王</span>
          </li>
        </ul>
        <div class="disp" v-if="frist">
          <p>
            <van-icon name="fire-o" />
            <span style="margin-left:0.07rem">注意：请核对好订单编号，订单金额 订单时间，备注等信息！</span>
          </p>
        </div>
        <div class="disp" v-if="secod">
          <p>
            <van-icon name="fire-o" />
            <span style="margin-left:0.07rem">注意：请再次核对信息，如确认无误 再点击确认收款，请及时联系 客服处理！</span>
          </p>
          <p>（注：误点击确认收款，追回几率极低 造成损失由用户自己承担。）</p>
        </div>
        <div class="digbtn">
          <button @click="close">取消</button>
          <button @click="exam" :class="{bon:secod}">{{examine}}</button>
        </div>
      </div>
    </van-dialog>
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
                <van-icon name="bell" />
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
  name: "Ongoing",
  data() {
    return {
      examine: "审核",
      frist: true,
      secod: false,
      dialoga: false,
      active: 0,
      show: false
    };
  },
  methods: {
    orders() {
      this.$router.push("/orders");
    },
    Pdodo() {
      this.$router.push("/Pdodo");
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
    Paycode() {
      this.$router.push("/Paycode");
    },
    Payswitch() {
      this.$router.push("/Paymentswitch");
    },
    closedis() {
      this.examine = "审核";
      this.frist = true;
      this.secod = false;
    },
    exam() {
      if (this.examine == "审核") {
        this.examine = "确认收款";
        this.frist = false;
        this.secod = true;
      }
    },
    close() {
      this.dialoga = false;
    },
    enterOI() {
      this.dialoga = true;
    },
    home() {
      this.$router.push("/home");
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
.bon {
  background: rgba(95, 108, 240, 1) !important;
  color: white !important;
}
.van-popup {
  overflow: hidden;
  width: 3.75rem;
  background: @backc;
  box-shadow: 0px 3px 2px 0px rgba(0, 0, 0, 1);
  color: white;
}
.home {
  width: 3.75rem;
  height: 100vh;
  overflow: auto;
  background: @bc;
  .head {
    position: relative;
    height: 0.6rem;
    background: @backc;
    border-radius: 1px;
    font-size: 0.19rem;
    color: white;
    .van-icon {
      font-size: 0.28rem;
      float: left;
    }
    .titled {
      float: left;
      margin: 0.22rem 0 0 0.51rem;
      span:nth-child(1) {
        color: gray;
      }
      span:nth-child(2) {
        margin-left: 0.8rem;
      }
      .hua {
        height: 2px;
        width: 0.7rem;
        background-color: #fff;
        position: absolute;
        bottom: 0;
        left: 2.1rem;
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
    width: 3.45rem;
    background: @contcolor;
    border-radius: 4px;
    margin: 0.1rem auto;
    color: white;
    overflow: hidden;
    padding-bottom: 0.2rem;
    .coLeft {
      width: 60%;
      float: left;
      ul {
        padding-top: 0.02rem;
        margin-left: 0.15rem;
        li {
          margin-top: 0.15rem;
        }
        li:nth-child(1) {
          width: 150%;
        }
      }
    }
    .coright {
      margin: 0.4rem 0 0 0;
      button {
        width: 1.2rem;
        height: 0.48rem;
        background: rgba(248, 70, 96, 1);
        border-radius: 6px;
        color: rgba(255, 255, 255, 1);
        line-height: 0.25rem;
      }
    }
  }
  .bth {
    width: 98%;
    margin: 0 auto;
    position: absolute;
    bottom: 0.2rem;
    font-size: 0.2rem;
    font-family: PingFangSC;
    color: rgba(255, 255, 255, 1);
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
  ///////弹窗
  .van-dialog {
    background: @digba;
  }
  .diacont {
    margin: 0.15rem auto;
    border-radius: 4px;
    font-size: 0.13rem;
    font-family: HiraginoSansGB-W3, HiraginoSansGB;
    font-weight: normal;
    color: rgba(255, 255, 255, 1);
    ul {
      margin-left: 0.2rem;
      font-size: 0.15rem;
      li {
        margin-top: 0.15rem;
        span:nth-child(2) {
          margin-left: 0.3rem;
        }
      }
    }
    .disp {
      margin-top: 0.3rem;
      margin-left: 0.2rem;
      font-size: 0.16rem;
      line-height: 0.22rem;
      .van-icon {
        color: yellow;
      }
      p:nth-child(2) {
        margin-top: 0.15rem;
      }
    }
    .digbtn {
      width: 100%;
      margin-top: 0.15rem;
      text-align: center;
      button:nth-child(1) {
        width: 1.3rem;
        height: 0.48rem;
        background: @colrdig;
        border-radius: 6px;
        font-size: 0.16rem;
        font-family: HiraginoSansGB-W3, HiraginoSansGB;
        font-weight: normal;
        color: rgba(255, 255, 255, 1);
      }
      button:nth-child(2) {
        margin-left: 0.1rem;
        width: 1.3rem;
        height: 0.48rem;
        background: @btn2;
        border-radius: 6px;
        font-size: 0.16rem;
        font-family: HiraginoSansGB-W3, HiraginoSansGB;
        font-weight: normal;
        color: rgba(255, 255, 255, 1);
      }
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
