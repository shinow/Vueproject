<template>
  <div class="me">
    <div class="title">
      <div style="overflow:hidden">
        <div class="imgL">
          <img :src="img1||img2" alt />
        </div>
        <div class="imgR">
          <p>{{datak.account}}</p>
          <p>ID：{{ID}}</p>
        </div>
        <div @click="chanegem()" class="changemm">
          <van-icon size="0.22rem" name="setting" />
        </div>
      </div>
      <div class="moyC">
        <ul>
          <li>
            <p>累计收益</p>
            <p>{{(zong)/100}}</p>
          </li>
          <li>
            <p>总价值</p>
            <p>{{Prqota}}</p>
          </li>
          <li>
            <p>今日付费</p>
            <p>{{0||(dataPatk.todayCharge)/100}}</p>
          </li>
        </ul>
      </div>
      <div class="Ente">
        <div class="texL">
          <p :style="{color:Swcolor}">{{P1}}</p>
          <p :style="{color:Swcolor}">{{P2}}</p>
        </div>
        <div class="texR">
          <van-switch
            :disabled="jinY"
            :value="chen"
            @input="Switchu"
            active-color="#07c160"
            inactive-color="#f44"
            size="23px"
          />
        </div>
      </div>
    </div>
    <div class="cont">
      <ul>
        <li @click="dianji()">
          <img src="@/assets/img/jiaoxuedangan.png" alt />
          <span>个人基本信息</span>
          <van-icon name="arrow" />
        </li>
        <li @click="jiaoxue()">
          <img src="@/assets/img/jiaoxue.png" alt />
          <span>教学和手机设置</span>
          <span style="color:red;margin-left:-0.02rem">【必读】</span>
          <van-icon name="arrow" />
        </li>
        <li @click="paymentcode()">
          <img src="../assets/img/图层 9.png" alt />
          <span>收款码管理</span>
          <van-icon name="arrow" />
        </li>
        <li @click="tiaozhuan()">
          <img src="../assets/img/图层 10.png" alt />
          <span>收款开关</span>
          <van-icon name="arrow" />
        </li>
        <li @click="Pddguan()">
          <img src="../assets/img/拼多多支付宝.jpg" alt />
          <span>拼多多管理</span>
          <van-icon name="arrow" />
        </li>
        <li @click="Cash()">
          <img src="../assets/img/dkttt.jpg" alt />
          <span>提现管理</span>
          <van-icon name="arrow" />
        </li>
        <li @click="shoufukuan()">
          <img src="@/assets/img/qian.png" alt />
          <span>收付款信息</span>
          <van-icon name="arrow" />
        </li>
        <!-- <li v-show="userType" @click="xinyong()">
          <img src="@/assets/img/xinyong-3.png" alt />
          <span>信用体系</span>
          <van-icon name="arrow" />
        </li> -->
      </ul>
    </div>
    <div class="lout" @click="logout()">
      <p>安全退出</p>
    </div>
  </div>
</template>

<script>
import { Loading } from "element-ui";
let loadingInstance;
export default {
  name: "Memess",
  data() {
    return {
      zong: "",
      P1: "",
      jinY: false,
      P2: "",
      Swcolor: "",
      userType: false,
      yonghu1: "",
      ID: "",
      zfbaccount: "",
      password1: "",
      account: "",
      img2: require("../assets/img/7.png"),
      img1: "",
      count: 0,
      datak: [],
      chen: true,
      dataPatk: "",
      timerOrder: "",
      Prqota: ""
    };
  },
  created() {
    this.shouyi();
    this.account = localStorage.account;
    this.account = this.$route.query.account1;
    this.password1 = this.$route.query.password;
    this.$store.state.password = this.password1;
    this.$store.state.account = this.account;
    this.current();
    this.yonghu1 = this.$route.query.yonghuu;
    this.queryOrderStatus();
    this.openFullScreen2();
    this.goR();
    this.statistics();
  },
  mounted() {
    this.timerOrder = setInterval(() => {
      this.goR();
    }, 180000);
  },
  beforeDestroy() {
    if (this.timerOrder) {
      clearInterval(this.timerOrder); //关闭
    }
  },
  methods: {
    goR() {
      this.Http.post("/api/cjtpay-commercial-web/commodity/order/list", {
        pageNum: 1,
        pageSize: 10,
        status: 1
      }).then(data => {
        if (data.httpCode == 0) {
          // 数据的返回接受
          console.log(data);
          if (data.data == undefined) {
            this.Prqota = 0;
          } else {
            this.Prqota = data.data[0].quota / 100;
          }
        } else {
          // 数据错误提示
        }
      });
    },
    Switchu() {
      console.log(this.chen);
      if (this.datak == undefined) {
        if (this.chen == this.false) {
          this.$toast("快去下单吧!");
          return;
        }
      }
      if (this.jinY == true) {
        this.$toast("已审核，不可操作!");
      } else {
        if (this.chen == false) {
          this.$dialog
            .confirm({
              title: "是否要开始赚"
            })
            .then(() => {
              let status;
              if (this.chen == false) {
                status = 2;
              } else if (this.chen == true) {
                status = 1;
              }
              console.log(status);
              this.Http.post(
                "/api/cjtpay-commercial-web/commercial/updateOrderStatus",
                "" + status,
                {
                  headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                  }
                }
              ).then(data => {
                if (data.httpCode == 0) {
                  // 数据的返回接受
                  console.log(data);
                  this.queryOrderStatus();
                } else {
                  // 数据错误提示
                }
              });
            });
        } else {
          this.$dialog
            .confirm({
              title: "是否下架所有在售商品"
            })
            .then(() => {
              let status;
              if (this.chen == false) {
                status = 2;
              } else if (this.chen == true) {
                status = 1;
              }
              console.log(status);
              this.Http.post(
                "/api/cjtpay-commercial-web/commercial/updateOrderStatus",
                "" + status,
                {
                  headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                  }
                }
              ).then(data => {
                if (data.httpCode == 0) {
                  // 数据的返回接受
                  console.log(data);
                  this.queryOrderStatus();
                } else {
                  // 数据错误提示
                }
              });
            });
        }
      }
    },
    openFullScreen2() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        mask: true,
        message: "加载中..."
      });
    },
    queryOrderStatus() {
      this.Http.post(
        "/api/cjtpay-commercial-web/commercial/queryOrderStatus",
        {}
      ).then(data => {
        if (data.httpCode == 0) {
          this.$toast.clear();
          console.log(data);
          if (data.data == 1) {
            this.chen = false;
            this.P1 = "已下线";
            this.P2 = "已关闭上线状态，不可接单";
            this.Swcolor = "red";
          } else if (data.data == 2) {
            this.chen = true;
            this.P1 = "接单中";
            this.P2 = "已开启，正在接单中~";
            this.Swcolor = "green";
          } else if (data.data == 3) {
            this.jinY = true;
            this.P1 = "提现中";
            this.P2 = "正在提现，不可接单";
            this.Swcolor = "rgb(166,233,198)";
          }
          this.datas = data.data;
        } else {
          // 数据错误提示
        }
      });
    },

    current() {
      this.Http.post("/api/cjtpay-commercial-web/currentUser").then(data => {
        if (data.httpCode == 0) {
          this.$toast.clear();
          this.datak = data.data;
          localStorage.Usertype = this.datak.userType;
          if (this.datak.userType == "0") {
            this.userType = true;
          }
          this.account = this.datak.account;
          this.yonghu1 = this.datak.userName;
          this.ID = this.datak.accountId;
          this.zfbaccount = this.datak.alipay;
          this.img1 = this.datak.portraitUrl;
          localStorage.yaoCOde = this.datak.invitationCode;
          test.login(this.datak.id);
        } else {
          this.$toast(data.msg);
          if (data.msg == "登录超时" || data.msg == "网络异常") {
            this.$router.push({
              name: "login"
            });
            localStorage.clear();
            this.$toast.clear();
          }
        }
      });
    },
    chanegem() {
      this.$router.push({
        name: "changepassword"
      });
    },
    Pddguan() {
      this.$router.push({
        name: "Pddpay"
      });
    },
    earning() {
      this.$router.push({
        name: "paymented"
      });
    },
    shouyi() {
      this.Http.post(
        "/api/cjtpay-commercial-web/commercial/accumulatedEarnings",
        {}
      ).then(data => {
        if (data.httpCode == 0) {
          this.$toast.clear();
          this.zong = data.data;
        } else {
          this.$toast(data.msg);
          if (data.msg == "登录超时" || data.msg == "网络异常") {
            this.$router.push({
              name: "login"
            });
            localStorage.clear();
            this.$toast.clear();
          }
        }
      });
    },
    logout() {
      this.$dialog
        .confirm({
          title: "是否要退出吗?"
        })
        .then(() => {
          this.Http.post("/api/cjtpay-commercial-web/logout", {}).then(data => {
            if (data.httpCode == 0) {
              localStorage.clear();
              this.$router.push({
                name: "login"
              });
              test.logout();
            }
          });
        });
    },
    dianji() {
      this.$router.push({
        name: "username",
        query: {
          yonghuu: this.yonghu1,
          zfbaccount1: this.zfbaccount,
          account1: this.account,
          imgt: this.img1
        }
      });
    },
    paymentcode() {
      if (this.datas == require("../assets/img/jiedanzhong.png")) {
        this.$toast("接单中，不可进行此操作");
      } else {
        this.$router.push({
          name: "CodeS"
        });
      }
    },
    chuanzhi() {
      if (this.datas == require("../assets/img/jiedanzhong.png")) {
        this.$toast("接单中，不可进行此操作");
      } else {
        this.$router.push({
          name: "bankcard",
          query: {
            yonghu: this.yonghu1
          }
        });
      }
    },
    statistics() {
      this.Http.post("/api/cjtpay-commercial-web/receipt/statistics").then(
        data => {
          if (data.httpCode == 0) {
            // 数据的返回接受
            this.dataPatk = data.data;
          } else {
            // 数据错误提示
          }
        }
      );
    },
    tiaozhuan() {
      this.$router.push({
        name: "paymentswitch"
      });
    },
    shoufukuan() {
      this.$router.push({
        name: "downpayment"
      });
    },
    Cash() {
      this.$router.push({
        name: "Cash",
        query: {
          ids: this.ID
        }
      });
    },
    xinyong() {
      this.$router.push({
        name: "xinyong",
        query: {
          yqma: this.datak.invitationCode
        }
      });
    },
    jiaoxue() {
      this.$router.push({
        name: "jiaoxue"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
[v-cloak] {
  display: none !important;
}
.me {
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
  .title {
    color: white;
    width: 3.75rem;
    height: 2.3rem;
    background: rgba(80, 100, 235, 1);
    opacity: 0.9;
    .imgL {
      width: 0.52rem;
      height: 0.52rem;
      border-radius: 50%;
      float: left;
      margin: 0.3rem 0 0 0.13rem;
      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
    .imgR {
      float: left;
      margin: 0.35rem 0 0 0.15rem;
      p:nth-child(2) {
        margin-top: 0.12rem;
      }
    }
    .changemm {
      float: right;
      margin: 0.31rem 0.2rem 0 0;
    }
    .moyC {
      margin-top: 0.3rem;
      ul {
        li {
          width: 1.2rem;
          float: left;
          text-align: center;
          p:nth-child(1) {
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            opacity: 0.7;
          }
          p:nth-child(2) {
            margin-top: 0.14rem;
          }
        }
      }
    }
    .Ente {
      margin: 0 auto;
      height: 0.9rem;
      width: 3.45rem;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 3px 15px 1px rgba(0, 0, 0, 0.06);
      border-radius: 20px;
      margin-top: 1rem;
      .texL {
        float: left;
        p:nth-child(1) {
          font-size: 0.17rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(24, 24, 24, 1);
          // opacity:0.9;
          margin: 0.21rem 0 0 0.22rem;
        }
        p:nth-child(2) {
          font-size: 0.17rem;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(82, 82, 82, 1);
          opacity: 0.8;
          margin: 0.14rem 0 0 0.22rem;
        }
      }
      .texR {
        float: right;
        margin: 0.32rem 0.24rem 0 0;
      }
    }
  }
  .cont {
    margin-top: 0.5rem;
    width: 95%;
    ul {
      li {
        margin-top: 0.07rem;
        width: 90%;
        margin-left: 0.2rem;
        height: 0.35rem;
        border-bottom: 0.01rem solid rgba(236, 236, 236, 1);
        img {
          width: 0.25rem;
          height: 0.25rem;
          float: left;
          margin: 0.01rem 0 0 0.01rem;
        }
        span {
          float: left;
          margin: 0.06rem 0 0 0.2rem;
        }
      }
      .van-icon {
        float: right;
        margin: 0.06rem 0.1rem 0 0;
      }
    }
  }
  .lout {
    width: 3.45rem;
    height: 0.43rem;
    background: rgba(80, 100, 235, 1);
    opacity: 0.9;
    border-radius: 43px;
    margin: 0 auto;
    margin-top: 0.2rem;
    margin-bottom: 0.7rem;
    p {
      width: 100%;
      text-align: center;
      font-family: PingFang SC;
      font-weight: bold;
      padding-top: 0.16rem;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
