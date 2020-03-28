<template>
  <div class="Paycode">
    <v-touch v-on:swiperight="goback">
      <header>
        <img @click="goback()" src="../../assets/img/fanhu.png" alt />
        <span>邀请好友</span>
      </header>
      <div style="padding-top:0.65rem"></div>
      <div class="cont">
        <ul>
          <li>
            <div>
              <img src="../../assets/img/支付宝.png" alt />
              <span>支付宝</span>
            </div>
            <input placeholder="请输入费率" type="text" />
          </li>
          <li>
            <div>
              <img src="../../assets/img/微信.png" alt />
              <span>微信</span>
            </div>
            <input placeholder="请输入费率" type="text" />
          </li>
        </ul>
      </div>
      <div class="P1">请输入对应通道费率进行生成二维码邀请好友</div>
      <div class="btn">
        <button @click="Invitefdcode">生成二维码</button>
      </div>
    </v-touch>
  </div>
</template>
<script>
export default {
  name: "Invitefd",
  data() {
    return {};
  },
  created() {},
  methods: {
    goback() {
      this.$router.go(-1);
    },
    Invitefdcode() {
      this.$router.push("/Invitefdcode");
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
        div {
          width: 40%;
          img {
            width: 0.25rem;
            height: 0.25rem;
            float: left;
            margin: 0.06rem 0 0 0.01rem;
          }
          span {
            float: left;
            margin: 0.11rem 0 0 0.2rem;
          }
        }
        input {
          float: right;
          width: 55%;
          height: 0.4rem;
          line-height: 0.4rem;
          margin: -0.02rem 0.2rem 0 0;
          background: transparent;
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
  .P1 {
    color: white;
    width: 100%;
    font-size: 0.17rem;
    text-align: center;
    margin-top: 0.3rem;
  }
  .btn {
    width: 100%;
    color: white;
    text-align: center;
    margin-top: 1.3rem;
    button {
      width: 35%;
      height: 0.55rem;
      background: @btn2;
      border-radius: 4px;
    }
  }
}
</style>
