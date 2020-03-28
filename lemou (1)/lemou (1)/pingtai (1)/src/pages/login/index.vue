<template>
  <div id="login">
    <div class="topp"></div>
    <div class="bot"></div>
    <div class="login-container">
      <el-form
        :model="loginInfo"
        @keyup.enter.native="submitForm('loginInfo')"
        :rules="loginRules"
        class="demo-ruleForm"
        ref="loginInfo"
      >
        <el-form-item label="用户名" prop="account">
          <el-input
            prefix-icon="iconfont icon-shouji"
            size="large"
            type="text"
            v-model="loginInfo.account"
            placeholder="账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            prefix-icon="iconfont icon-mima"
            type="password"
            v-model="loginInfo.password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="谷歌验证码  -(如未绑定，请输入登录密码)" prop="code">
          <el-input
            prefix-icon="iconfont icon-mima"
            type="password"
            v-model="loginInfo.code"
            placeholder="谷歌验证码"
          ></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;margin-top:10px" @click="submitForm('loginInfo')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var funChina = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不可为空"));
      } else {
        const regs = /^[0-9a-zA-Z]+$/;
        if (regs.test(value)) {
          callback();
        } else {
          return callback(new Error("账号只可为数字与字母"));
        }
      }
    };
    return {
      loginInfo: {
        account: "",
        password: "",
        code:""
      },
      loginRules: {
        account: [
          { required: true, trigger: ["blur", "change"], validator: funChina },
          {
            max: 11,
            message: "密码长度最少为11位",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["blur", "change"]
          },
          { min: 5, message: "密码长度最少为6位", trigger: ["blur", "change"] }
        ],
        code: [
          {
            required: true,
            message: "请输入谷歌验证码",
            trigger: ["blur", "change"]
          },
          { min: 5, message: "验证码长度最少为6位", trigger: ["blur", "change"] }
        ]
      }
    };
  },
  computed: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch("LoginByUsername", this.loginInfo);
          this.$store.commit("SET_MENU", []);
        }
      });
    }
  },
  created() {}
};
</script>
<style lang="less">
#login {
  .topp {
    background: rgba(56, 71, 98, 1);
    opacity: 0.9481;
    width: 100%;
    height: 50vh;
  }
  .bot {
    background: rgba(56, 71, 98, 1);
    width: 100%;
    height: 50vh;
  }
  .login-container {
    z-index: 55;
    position: absolute;
    top: 30%;
    left: 36.4%;
    width: 24%;
    // height: 35%;
    border-radius: 5px;
    background-clip: padding-box;
    margin: auto;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0px 13px 23px -3px rgba(2, 2, 2, 0.3);
    .el-input__inner {
      height: 46px;
    }
  }
}
</style>
