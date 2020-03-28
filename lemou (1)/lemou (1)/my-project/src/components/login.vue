<template>
  <div class="login">
    <div class="back">
      <img src="../assets/image/图层 2.png" alt />
    </div>
    <div class="lo">
      <p>登录</p>
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
        <input
          type="text"
          autocomplete="on"
          @change="shou()"
          v-model="account1"
          placeholder="请输入账号"
          @keyup.enter="qingqiu()"
        />
      </div>
      <div class="inp1">
        <img src="../assets/image/圆角矩形 2.png" alt />
        <img src="../assets/image/密码.png" alt />
        <input type="password" @keyup.enter="qingqiu()" v-model="password1" placeholder="请输入密码" />
      </div>
      <div class="btn" @click="qingqiu()">
        <img src="../assets/image/圆角矩形 2 副本 2.png" alt />
        <p>立即登录</p>
      </div>
      <div class="codelo">
        <p @click="goRegLogin">验证码登录</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      active: "",
      background: require("../assets/img/bggggg.png"),
      account1: "",
      password1: "",
      userName1: ""
    };
  },
  created() {
    this.userName1 = this.$route.query.userName;
    if (
      localStorage.password != undefined &&
      localStorage.account != undefined
    ) {
      this.Http.post("/api/cjtpay-commercial-web/login", {
        account: localStorage.account,
        password: localStorage.password
      }).then(data => {
        if (data.httpCode == 0) {
          console.log(data);
          this.$router.push({
            name: "Memess",
            query: {
              userName: this.userName1,
              account: this.account1
            }
          });
        } else {
          this.$toast(data.msg);
        }
      });
    }
  },
  methods: {
    shou() {
      if (!/^1[3456789]\d{9}$/.test(this.account1)) {
        this.$toast("亲，请输入正确的账号哦！");
        this.account1 = "";
      }
    },
    goZhuCe() {
      this.$router.push("/register");
    },
    goRegLogin() {
      this.$router.push("/regLogin");
    },
    qingqiu() {
      if (this.account1 == "") {
        this.$toast("亲，请输入账号哦！");
        return;
      }
      if (this.password1 == "") {
        this.$toast("亲，请输入密码哦！");
        return;
      }
      this.Http.post("/api/cjtpay-commercial-web/login", {
        account: this.account1,
        password: this.password1
      })
        .then(data => {
          if (data.httpCode == 0) {
            localStorage.password = this.password1;
            localStorage.account = this.account1;
            this.$router.push({
              name: "Memess",
              query: {
                userName: this.userName1,
                account: this.account1
              }
            });
          } else {
            this.$toast(data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
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
    .codelo {
      font-size: 0.18rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(80, 100, 235, 1);
      position: absolute;
      top: 3.3rem;
      width: 100%;
      text-align: center;
    }
  }
}
</style>
