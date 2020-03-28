<template>
  <div class="login">
    <div class="toptit"></div>
    <div class="Right"></div>
    <div class="Left"></div>
    <div class="inp1">
      <van-icon name="phone" />
      <input type="text" placeholder="请输入手机号" />
    </div>
    <div class="inp2">
      <van-icon name="lock" />
      <input type="text" placeholder="请输入密码" />
    </div>
    <div class="inp3">
      <van-icon name="more" />
      <input type="text" placeholder="请输入谷歌验证码" />
    </div>
    <div class="btn" @click="login">立即登陆</div>
    <div class="Register">
      <span @click="Register">立即注册</span>
      <span>|</span>
      <span>手机号登录</span>
    </div>
    <div class="butto"></div>
  </div>
</template>
<script>
import { loginByUsername } from "@/Http/api";
export default {
  name: "login",
  data() {
    return {
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      }
    };
  },
  created() {
    // getList(this.page).then(res=>{
    // })
  },
  methods: {
    login() {
      let pau = {
        tenantId: "000000",
        username: "admin",
        password: "admin",
        grant_type: "password",
        scope: "all",
        type: "account"
      };
      loginByUsername(pau).then(res => {
        
      });
    },
    Register() {
      this.$router.push("/Register");
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
    top: -1.4rem;
    left: -0.05rem;
  }
  .Right {
    width: 0.65rem;
    height: 0.8rem;
    background: rgba(248, 70, 96, 1);
    border-radius: 50%;
    position: absolute;
    right: -0.33rem;
    top: 1rem;
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
  .inp3 {
    width: 80%;
    height: 0.53rem;
    background: rgba(35, 36, 80, 1);
    border-radius: 4px;
    position: absolute;
    left: 10%;
    top: 2rem;
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
    top: 2.8rem;
  }
  .inp3 {
    position: absolute;
    left: 10%;
    top: 3.6rem;
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
    top: 4.6rem;
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
  .Register {
    width: 100%;
    text-align: center;
    color: white;
    position: absolute;
    top: 5.4rem;
  }
}
</style>