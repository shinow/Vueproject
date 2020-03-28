<template>
  <div>
    <header>
      <img @click="goback()" src="../assets/img/fanhui-2.png" alt />
      <span>修改密码</span>
    </header>
    <div class="content">
      <div class="yuanshi">
        <span>原始密码:</span>
        <input type="password" v-model="oldPassword" placeholder="请输入原始密码" />
      </div>
      <div class="newmima">
        <span>新密码:</span>
        <input type="password" @change="pos()" v-model="neWPassword"  placeholder="请输入新密码" />
      </div>
      <div class="chongfu">
        <span>重复新密码:</span>
        <input type="password" @change="pos()" v-model="bgneWPassword" placeholder="请重复新密码" />
      </div>
    </div>
    <button @click="change()">确认修改</button>
       <div class="workL">
      <img src="../assets/image/图层 4 拷贝.png" alt />
      <p>输入正确密码进行修改</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "changepassword",
  data() {
    return {
      oldPassword: "",
      neWPassword: "",
      bgneWPassword: "",
      bendi: ""
    };
  },
  created() {
    console.log(this.$store.state.password);
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    change() {
      if (this.oldPassword=="" || this.neWPassword=="") {
          this.$toast("亲，请您输入密码！");
          return
      }
      this.bendi = localStorage.password;
      if (this.bendi) {
        if (this.neWPassword != this.bgneWPassword) {
          this.$toast("亲，您输入的密码不一致哦！");
          // alert("亲，您输入的密码不一致哦！")
          this.neWPassword = "";
          this.bgneWPassword = "";
        } else {
          this.Http.post(
            "/api/cjtpay-commercial-web/commercial/updatePassword",
            {
              oldPassword: this.oldPassword,
              neWPassword: this.neWPassword
            }
          ).then(data => {
            if (data.httpCode == 0) {
              console.log(data);
              localStorage.removeItem("password");
              // 数据的返回接受
              this.$store.state.password = this.neWPassword;
              localStorage.password = this.neWPassword;
              this.$toast("修改成功");
              setTimeout(() => {
                this.$router.push({
                  name: "Memess"
                });
              }, 500);
            } else {
              this.$toast(data.msg);
              // alert(data.msg)
              // 数据错误提示
            }
          });
        }
        console.log(this.$store.state.password);
      }
    },
    pos() {
      let reg = /^[0-9a-zA-Z_#.!@$%^&*-`~]{6,16}$/;
      if (!reg.test(this.neWPassword || this.bgneWPassword)) {
        this.$toast("亲，请输入正确的密码哦！");
        // alert("亲，请输入正确的密码哦！");
        setTimeout(() => {
          this.neWPassword = "";
        }, 150);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  z-index: 1;
  position: fixed;
  top: 0.9rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0.01rem 0.03rem 0.13rem 0 rgba(0, 0, 0, 0.13);
  border-radius: 0.12rem;
  // box-shadow: darkgrey 0px 1px 5px 0.5px;
  width: 3.25rem;
  height: 1.75rem;
  margin: 0 0 0.2rem 0.25rem;
  .yuanshi,
  .newmima,
  .chongfu {
    padding-bottom: 0.12rem;
    width: 87%;
    font-size: 0.18rem;
    // padding-left: 0.1rem;
    margin: 0.15rem 0 0 0.3rem;
    border-bottom: 0.01rem solid rgba(194, 194, 194, 1);
    input {
      font-size: 0.15rem;
      width: 38%;
      float: right;
      padding-bottom: 0.01rem solid rgba(194, 194, 194, 1);
      margin-right: 0.5rem;
      margin-top: 0rem;
    }
  }
  .yuanshi {
    padding-top: 0.2rem;
  }
  .chongfu {
    border-bottom: 0 solid rgba(194, 194, 194, 1);
  }
}
button {
  z-index: 1;
  width: 1.75rem;
  height: 0.42rem;
  background: rgba(41, 126, 253, 1);
  box-shadow: 0.01rem 0.03rem 0.13rem 0 rgba(1, 102, 252, 0.61);
  border-radius: 0.4rem;
  color: white;
  font-size: 0.18rem;
  position: fixed;
  top: 3rem;
  margin: 0 0 0 1.03rem;
}
.workL {
  width: 100%;
  text-align: center;
  position: fixed;
  top: 2.7rem;
  img {
    width: 2.3rem;
    height: 2.03rem;
  }
  p {
    font-size: 0.2rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    opacity: 0.45;
    margin-top: 0.15rem;
  }
}
</style>