<template>
  <div class="regLogin" style="overflow: hidden;">
    <div class="back">
      <img src="../assets/image/图层 2.png" alt />
    </div>
    <div class="i" @click="goReturn">
      <img src="../assets/img/返回.png" />
    </div>
    <div class="lo">
      <p>验证码登录</p>
    </div>
    <div class="imGG">
      <img src="../assets/image/a03e7b680b98e.png" alt />
    </div>
    <div class="content">
      <div class="title">
        <span>登录</span>
        <span @click="goZhuCe">注册</span>
        <img src="../assets/image/形状 1.png" alt />
      </div>

      <div class="inp">
        <img src="../assets/image/圆角矩形 2.png" alt />
        <img src="../assets/image/账户.png" alt />
        <input type="text" maxlength="11" @change="shou()" v-model="account" placeholder="请输入手机号" />
        <span v-if="huoqu" @click="ercode()">获取验证码</span>
        <van-count-down class="a1" @finish="finish" v-if="jishi" :time="time" format="mm:ss " />
      </div>
      <div class="inp1">
        <img src="../assets/image/圆角矩形 2.png" alt />
        <img src="../assets/image/密码.png" alt />
        <input type="text" v-model="yanz" placeholder="请输入验证码" />
      </div>
      <div class="btn" @click="login()">
        <img src="../assets/image/圆角矩形 2 副本 2.png" alt />
        <p>立即登录</p>
      </div>
    </div>
    <!-- <div class="back">
      <img :src="background" alt />
    </div>
    <div class="box1">
      <img src="../assets/img/返回.png" @click="goReturn" />
      <span>验证登录</span>
    </div>
    <div class="box2">
      <li>
        <input />
        <span v-if="huoqu" >获取验证码</span>
        <van-count-down class="a1" @finish="finish" v-if="jishi" :time="time" format="mm:ss " />
      </li>
      <li style="border-bottom: 0.01rem solid rgba(228,233,251,1);">
        <input />
      </li>
      <button >登录</button>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "regLogin",
  data() {
    return {
      background: require("../assets/img/bggggg.png"),
      account: "",
      yanz: "",
      time: 60 * 1000,
      jishi: false,
      huoqu: true
    };
  },
  methods: {
    shou() {
      if (!/^1[3456789]\d{9}$/.test(this.account)) {
        this.$toast("亲，请输入正确的手机号哦！");
        // alert();
        setTimeout(() => {
          this.account = "";
        }, 150);
      }
    },
    goReturn() {
      console.log("1");
      this.$router.push({ name: "login" });
    },
    finish() {
      this.jishi = false;
      this.huoqu = true;
    },
    goZhuCe() {
      this.$router.push("/register");
    },
    ercode() {
      if (this.account == "" || !/^1[3456789]\d{9}$/.test(this.account)) {
        this.$toast("亲，请输入手机号哦！");
        return;
      }
      console.log(this.account);
      this.Http.post(
        `/api/cjtpay-commercial-web/mobileCode?code=${this.yanz}`,
        "" + this.account,
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        }
      ).then(data => {
        console.log(data);
        if (data.httpCode == 0) {
          this.$toast("验证码已发送");
          // 数据的返回接受
          console.log(data);
          this.huoqu = false;
          this.jishi = true;
        } else {
          this.$toast(data.msg);
          // 数据错误提示
        }
      });
    },

    login() {
      if (this.account == "") {
        this.$toast("请输入手机号");
        return;
      }
      if (this.yanz == "") {
        this.$toast("请输入邀请码");
        return;
      }
      this.Http.post("/api/cjtpay-commercial-web/login", {
        account: this.account,
        code: this.yanz
      }).then(data => {
        localStorage.account = this.account;
        console.log(localStorage.account);
        if (data.httpCode == "0") {
          this.$router.push({
            name: "Memess"
          });
          // 数据的返回接受
          console.log(this.account);
        } else {
          this.$toast(data.msg);
          // 数据错误提示
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.regLogin {
   height: 100%;
  background-color: rgba(255, 255, 255, 1);
  overflow: hidden;
  .back {
    overflow: hidden;
    height: 2.185rem;
    img {
      width: 3.75rem;
      height: 100%;
    }
  }
  .i {
    z-index: 555;
    width: 0.15rem;
    height: 0.2rem;
    position: absolute;
    top: 0.25rem;
    left: 0.2rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .lo {
    color: white;
    position: absolute;
    top: 0rem;
    text-align: center;
    width: 100%;
    margin: 0 auto;
    font-size: 0.22rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    line-height: 0.72rem;
  }
  .imGG {
    width: 2rem;
    height: 1.66rem;
    overflow: hidden;
    position: absolute;
    right: 0rem;
    top: 0.4rem;
    z-index: 55;
    img {
      overflow: hidden;
      width: 100%;
      height: 100%;
      margin-left: 0.3rem;
    }
  }
  .content {
    position: absolute;
    top: 1.5rem;
    width: 93%;
    height: 3.75rem;
    left: 3.3%;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.1rem;

    .title {
      font-size: 0.22rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: black;
      line-height: 72px;
      span:nth-child(1) {
        color: rgba(80, 100, 235, 1);
        margin-left: 0.37rem;
      }
      span:nth-child(2) {
        margin-left: 0.29rem;
      }
      img:nth-child(3) {
        position: absolute;
        left: 0.45rem;
        top: 0.6rem;
      }
    }
    .inp {
      z-index: 5;
      font-size: 0.19rem;
      margin-top: 0.29rem;
      img:nth-child(1) {
        width: 85%;
        margin-left: 7%;
        height: 0.44rem;
        position: absolute;
        top: 1.02rem;
      }
      img:nth-child(2) {
        width: 0.16rem;
        height: 0.2rem;
        position: absolute;
        left: 0.41rem;
        top: 1.12rem;
      }
      input {
        width: 70%;
        height: 0.44rem;
        position: absolute;
        top: 0.99rem;
        left: 7%;
        background: transparent;
        padding-left: 0.5rem;
        padding-top: 0.02rem;
        color: rgba(80, 100, 235, 1);
      }
      input::-webkit-input-placeholder {
        color: rgba(80, 100, 235, 1);
      }
      span {
        font-size: 0.12rem;
        // border: 1px solid red;
        background: rgba(80, 100, 235, 1);
        color: white;
        font-family: PingFang SC;
        font-weight: 400;
        border-radius: 0.2rem;
        float: right;
        padding: 0.1rem 0.1rem;
        position: absolute;
        right: 0.41rem;
        top: 1.075rem;
      }
      .a1 {
        color: red;
        font-size: 0.22rem;
        position: absolute;
        right: 0.5rem;
        top: 1.14rem;
      }
    }
    .inp1 {
      z-index: 555;
      font-size: 0.19rem;
      margin-top: 0.29rem;
      img:nth-child(1) {
        width: 85%;
        margin-left: 7%;
        height: 0.44rem;
        position: absolute;
        top: 1.7rem;
      }
      img:nth-child(2) {
        width: 0.16rem;
        height: 0.2rem;
        position: absolute;
        left: 0.41rem;
        top: 1.82rem;
      }
      input {
        background: transparent;
        width: 70%;
        height: 0.44rem;
        position: absolute;
        top: 1.7rem;
        left: 7%;
        padding-left: 0.5rem;
        color: rgba(80, 100, 235, 1);
      }
      input::-webkit-input-placeholder {
        color: rgba(80, 100, 235, 1);
      }
    }
    .btn {
      // text-align: center;
      // border: 1px solid red;
      position: absolute;
      top: 2.6rem;
      margin-left: 8%;
      img {
        width: 90%;
        height: 0.44rem;
        // margin-left: 0.05rem;
      }
      p {
        width: 90%;
        text-align: center;
        font-size: 0.2rem;
        // border: 1px solid red;
        font-family: PingFang SC;
        font-weight: 500;
        z-index: 5555;
        color: rgba(255, 255, 255, 1);
        line-height: 0.44rem;
        position: absolute;
        top: -0.01rem;
        // left: 1.23rem;
      }
    }
  }
}
</style>
