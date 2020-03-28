<template>
  <div class="login">
    <!-- <div class="toptit"></div> -->
    <div class="Right"></div>
    <div class="Left"></div>
    <div class="inp1">
      <van-icon name="cluster" />
      <input type="text" placeholder="请输入邀请码" />
    </div>
    <div class="inp2">
      <van-icon name="phone" />
      <input type="text" placeholder="请输入手机号" />
    </div>
    <div class="inp3">
      <van-icon name="comment-circle" />
      <input type="text" placeholder="请输入验证码" />
      <button @click="ObtainCode">
        <span v-if="codeER">获取验证码</span>
        <div v-if="codetime" class="timeDown">
          <van-count-down
            :time="time"
            @finish="ObtainCode"
            format="mm:ss"
            style="font-size:0.2rem;color:red"
          />
        </div>
      </button>
    </div>
    <div class="inp4">
      <van-icon name="lock" />
      <input type="text" placeholder="请输入密码" />
    </div>
    <div class="inp5">
      <van-icon name="lock" />
      <input type="text" placeholder="请重复密码" />
    </div>
    <div class="btn" @click="login">立即注册</div>
    <div class="butto"></div>
  </div>
</template>
<script>
export default {
  name: "Register",
  data() {
    return {
      time: 1 * 60 * 1000,
      codetime: false,
      codeER: true
    };
  },
  methods: {
    login() {
      this.$router.push("/home");
    },
    ObtainCode() {
      if (this.codeER == true) {
        this.codeER = false;
        this.codetime = true;
      } else {
        this.codeER = true;
        this.codetime = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  overflow: hidden;
  width: 3.75rem;
  height: 100vh;
  background: rgba(47, 49, 98, 1);
  position: relative;
  .toptit {
    width: 3.8rem;
    height: 2.8rem;
    background: rgba(35, 36, 80, 1);
    border-radius: 55%;
    position: absolute;
    top: -1.2rem;
    left: -0.05rem;
  }
  .Right {
    width: 0.65rem;
    height: 0.8rem;
    background: rgba(248, 70, 96, 1);
    border-radius: 50%;
    position: absolute;
    right: -0.33rem;
    top: 1.24rem;
  }
  .Left {
    width: 0.65rem;
    height: 0.9rem;
    background: rgba(93, 107, 239, 1);
    border-radius: 50%;
    position: absolute;
    left: -0.32rem;
    bottom: 1.24rem;
  }
  .inp1,
  .inp2,
  .inp3,
  .inp4,
  .inp5 {
    width: 80%;
    height: 0.53rem;
    background: rgba(35, 36, 80, 1);
    border-radius: 4px;
    position: absolute;
    left: 10%;
    top: 1.1rem;
    font-size: 0.17rem;
    font-family: PingFangSC;
    color: rgba(255, 255, 255, 1);
    line-height: 0.53rem;
    .van-icon {
      float: left;
      margin: 0.17rem 0 0 0.2rem;
    }
    input {
      width: 2.4rem;
      height: 0.4rem;
      line-height: 0.4rem;
      margin-left: 0.12rem;
      background: transparent;
    }
    input::-webkit-input-placeholder {
      color: white;
    }
  }
  .inp2 {
    position: absolute;
    left: 10%;
    top: 1.8rem;
  }
  .inp3 {
    position: absolute;
    left: 10%;
    top: 2.5rem;
    .van-icon {
      width: 6%;
    }
    input {
      width: 42%;
    }
    button {
      width: 40%;
      height: 0.53rem;
      background-color: @btn2;
      float: right;
    }
  }
  .inp4 {
    position: absolute;
    left: 10%;
    top: 3.2rem;
  }
  .inp5 {
    position: absolute;
    left: 10%;
    top: 3.9rem;
  }
  .btn {
    width: 65%;
    height: 0.53rem;
    background: rgba(47, 49, 98, 1);
    box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.15);
    border-radius: 27px;
    font-size: 0.19rem;
    font-family: PingFangSC;
    color: rgba(255, 255, 255, 1);
    position: absolute;
    left: 17%;
    top: 4.8rem;
    line-height: 0.53rem;
    text-align: center;
  }
  .butto {
    width: 0.9rem;
    height: 0.9rem;
    background: rgba(249, 201, 39, 1);
    position: absolute;
    border-radius: 50%;
    right: -0.45rem;
    bottom: -0.45rem;
  }
}
</style>