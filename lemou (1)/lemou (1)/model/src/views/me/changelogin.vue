<template>
  <div class="Paycode">
        <v-touch v-on:swiperight="goback">
    <header>
      <img @click="goback()" src="../../assets/img/fanhu.png" alt />
      <span>修改登录密码</span>
    </header>
    <div style="padding-top:0.65rem"></div>
    <div class="cont">
      <ul>
        <li>
          <input placeholder="请输入原登录密码" type="text" />
        </li>
        <li>
          <input placeholder="请输入新登陆密码" type="text" />
        </li>
        <li>
          <input placeholder="请再次输入新密码" type="text" />
        </li>
      </ul>
    </div>
    <div class="btn1">
      <button>确认修改</button>
    </div>
        </v-touch>
  </div>
</template>
<script>
export default {
  name: "changelogin",
  data() {
    return {};
  },
  created() {},
  methods: {
    goback() {
      this.$router.go(-1);
    },
    Invitefdcode(){
      this.$router.push("/Invitefdcode")
    },
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
        input {
          width: 100%;
          height: 0.4rem;
          line-height: 0.4rem;
          background: transparent;
          padding-left: 0.15rem;
        }
        input::-webkit-input-placeholder {
          color: white;
        }
      }
      li:nth-child(1) {
        padding-top: 0.1rem;
      }
    }
  }
   .btn1 {
    width: 100%;
    margin: 0 auto;
    font-size: 0.2rem;
    font-family: PingFangSC;
    color: @white;
    margin-top: 1rem;
    button:nth-child(1) {
      width: 60%;
      height: 0.55rem;
      background: @btn2;
      margin-left: 20%;
      border-radius: 4px;
    }
  }
}
</style>
