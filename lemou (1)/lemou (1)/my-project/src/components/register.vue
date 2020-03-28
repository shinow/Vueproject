<template>
  <div class="register" style="overflow: hidden;">
    <div class="back">
      <img src="../assets/image/图层 2.png" alt />
    </div>
    <div class="lo">
      <p>注册</p>
    </div>
    <div class="imGG">
      <img src="../assets/image/a03e7b680b98e.png" alt />
    </div>
    <div class="content">
      <div class="title">
        <span @click="login">登录</span>
        <span>注册</span>
        <img src="../assets/image/形状 1.png" alt />
      </div>
      <div class="cot">
        <ul>
          <li v-show="imggF">
            <input
              type="text"
              maxlength="8"
              @change="yaoq(code1)"
              v-model="code1"
              placeholder="请输入邀请码"
            />
          </li>
          <li class="Uocode">
            <input
              type="text"
              maxlength="11"
              @change="shou()"
              v-model="account1"
              placeholder="请输入手机号"
            />
            <span v-if="huoqu" @click="ercode()">获取验证码</span>
            <van-count-down class="a1" @finish="finish" v-if="jishi" :time="time" format="mm:ss " />
          </li>
          <li>
            <input type="text" @change="yyz()" maxlength="6" v-model="verify1" placeholder="请输入验证码" />
          </li>
          <li>
            <input type="text" @change="name()" v-model="userName1" placeholder="请输入姓名" />
          </li>
          <li>
            <input type="password" @change="pos()" v-model="password1" placeholder="请输入密码" />
          </li>
          <li>
            <input type="password" @change="pos()" v-model="bGpassword1" placeholder="请确认密码" />
          </li>
        </ul>
        <div class="btn" @click="register()">
        <img src="../assets/image/圆角矩形 2 副本 2.png" alt />
        <p >注册</p>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      background: require("../assets/img/bggggg.png"),
      code1: "", //邀请码
      account1: "", //账号/手机号
      verify1: "", //验证码
      userName1: "", //名称
      password1: "", //密码
      phone: "",
      time: 60 * 1000,
      huoqu: true,
      jishi: false,
      code: "",
      bGpassword1: "",
      Jump: ""
    };
  },
  created() {
    console.log(location);
    let loc = location.href;
    this.code1 = loc.substr(-8, 8);
    if (this.code1 == "register") {
      this.code1 = "";
      this.Jump = "register";
      this.imggF = true;
    } else {
      this.imggF = false;
    }
  },
  methods: {
    yaoq(val) {
      if (val == "") {
        this.$toast("请输入正确的邀请码哦！");
        // alert();
        setTimeout(() => {
          this.code1 = "";
        }, 150);
      }
    },
    shou() {
      if (!/^1[3456789]\d{9}$/.test(this.account1)) {
        this.$toast("亲，请输入正确的账号哦！");
        // alert();
        setTimeout(() => {
          this.account1 = "";
        }, 150);
      } else {
      }
    },
    yyz() {
      if (!/^\d{6}$/.test(this.verify1)) {
        this.$toast("亲，请输入正确的验证码哦！");
        // alert();
        setTimeout(() => {
          this.verify1 = "";
        }, 150);
      }
    },
    name() {
      if (!/^[\u4e00-\u9fff\w]{2,13}$/.test(this.userName1)) {
        this.$toast("亲，请输入正确的用户名哦！");
        // alert(;
        setTimeout(() => {
          this.userName1 = "";
        }, 150);
      }
    },
    pos() {
      let reg = /^[0-9a-zA-Z_#.!@$%^&*-`~]{6,16}$/;
      if (!reg.test(this.password1)) {
        this.$toast("亲，请输入正确的密码哦！");
        // alert("亲，请输入正确的密码哦！");
        setTimeout(() => {
          this.password1 = "";
        }, 150);
      }
    },
    // goReturn() {
    //   this.$router.go(-1);
    // },
    login() {
      this.$router.push({ name: "login" });
    },
    register() {
      if (this.userName1 == "" && this.account1 == "") {
        // alert("1")
        this.$toast("您输入对应信息");
        return;
      }
      if (this.bGpassword1 != this.password1) {
        this.$toast("您输入的密码不一致");
        return;
      }
      this.Http.post("/api/cjtpay-commercial-web/commercial/register", {
        code: this.code1, //邀请码
        account: this.account1, //账号/手机号
        verify: this.verify1, //验证码
        userName: this.userName1, //名称
        password: this.password1 //密码
        // phone:""
      }).then(data => {
        if (data.httpCode == 0) {
          // 数据的返回接受
          console.log(data);
          this.$toast("注册成功");
          if (this.Jump == "register") {
            setTimeout(() => {
              this.$router.push({
                name: "login"
              });
            }, 700);
          } else {
            setTimeout(() => {
              this.$router.push({
                name: "download"
              });
            }, 700);
          }
        } else {
          // console.log(this.this.this.this)
          // 数据错误提示
          this.$toast(data.msg);
        }
      });
    },
    finish() {
      this.jishi = false;
      this.huoqu = true;
    },
    ercode() {
      console.log(this.account1);
      if (this.account1 == "") {
        this.$toast("请输入手机号");
      } else {
        this.Http.post(
          "/api/cjtpay-commercial-web/mobileCode",
          "" + this.account1,
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
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.register {
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
        margin-left: 0.37rem;
      }
      span:nth-child(2) {
        color: rgba(80, 100, 235, 1);
        margin-left: 0.29rem;
      }
      img:nth-child(3) {
        position: absolute;
        left: 1.25rem;
        top: 0.6rem;
      }
    }
    .cot {
      // border: 1px solid red;
      ul {
        margin-top: 0.1rem;
        li {
          width: 85%;
          margin-left: 0.3rem;
          //  border: 1px solid red;
          font-size: 0.2rem;
          font-family: PingFang SC;
          font-weight: 400;
          margin-top: 0.07rem;
          color: rgba(80, 100, 235, 1);
          height: 0.44rem;
          border-bottom: 0.01rem solid rgba(236, 236, 236, 1);
          input {
            // border: 1px solid red;
             height: 0.44rem;
            line-height: 0.4rem;
            margin-top: -0.05rem;
            width: 50%;
            color: rgba(80, 100, 235, 1);
          }
          input::-webkit-input-placeholder {
            color: rgba(80, 100, 235, 1);
          }
        }
        .Uocode {
          span {
            font-size: 0.18rem;
            // border: 1px solid red;
            background: rgba(80, 100, 235, 1);
            color: white;
            font-family: PingFang SC;
            font-weight: 400;
            border-radius: 0.2rem;
            
           float: right;
           padding: 0.1rem 0.1rem;
           margin-right: 0.1rem;
           margin-top: -0.01rem;
          }
        }
        .a1{
          color: red;
          float: right;
          font-size: 0.22rem;
          margin: 0.06rem 0.5rem 0 0;
        }
      }
    }
    .btn {
      // text-align: center;
      // border: 1px solid red;
      // position: absolute;
      // top: 2.6rem;
      margin-top: 0.2rem;
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
        // position: absolute;
        // top: -0.01rem;
        margin-top: -0.45rem;
        // left: 1.23rem;
      }
    }
  }
}
</style>
