<template>
  <div class="tbbj">
          <div class="head">
            <span @click="tbrenw()">商品列表 /</span>
            <span>编辑</span>
          </div>
          <div class="cont">
            <ul>
              <li>
                <span>选择店铺：</span>
                <el-select
                  style="width:250px;margin-left:30px
                 "
                  v-model="value2"
                  size="small"
                  placeholder="佛家哦高级旗舰店"
                >
                  <el-option
                    v-for="item in optionss"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
               
              </li>
              <li>
                <span>名称：</span>
                <el-input
                  size="small"
                  style="width:200px;margin-left:80px"
                  v-model="input"
                  placeholder="马丁鞋"
                ></el-input>
              </li>
              <li>
                <span>价格：</span>
                <el-input
                  size="small"
                  style="width:200px;margin-left:80px"
                  v-model="input"
                  placeholder="123"
                ></el-input>
              </li>
              <li>
                <span>链接：</span>
                <el-input
                  size="small"
                  style="width:280px;
                margin-left:80px"
                  v-model="input"
                  placeholder="http://taobao/sfjnvfvvv.com"
                ></el-input>
              </li>
              <li>
                <span>状态：</span>
                <el-select
                  style="width:120px;margin-left:80px
                 "
                  v-model="value3"
                  size="small"
                  placeholder="上架"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </li>
            </ul>
            <button>确认修改</button>
          </div>
  </div>
</template>
<script>
export default {
  name: "tbbj",
  data() {
    return {
      input: "",
      value: true,
      value2: "",
      optionss: [
        {
          value: "选项1",
          label: "佛家哦高级旗舰店"
        },
        {
          value: "选项2",
          label: "盛大恢复健康旗舰店"
        }
      ],
      value3: "",
      options: [
        {
          value: "选项1",
          label: "开启"
        },
        {
          value: "选项2",
          label: "关闭"
        }
      ]
    };
  },
  methods: {
    handleClick() {
      this.shanchu = true;
    },
    yes() {
      this.shanchu = false;
    },
    no() {
      this.shanchu = false;
    },
    commoditydd() {
      this.$router.push({
        name: "commoditydd"
      });
    },
    tbrenw() {
      this.$router.push({
        name: "tbrenw"
      });
    },
    user() {
      this.$router.push({
        name: "user"
      });
    },
    deal() {
      this.$router.push({
        name: "deal"
      });
    },
    commoditylb() {
      this.$router.push({
        name: "commoditylb"
      });
    },
    increasebg() {
      this.$router.push({
        name: "increasebg"
      });
    },
    quota() {
      this.$router.push({
        name: "quota"
      });
    },
    distributor() {
      this.$router.push({
        name: "distributor"
      });
    },
    transaction() {
      this.$router.push({
        name: "transaction"
      });
    },
    user() {
      this.$router.push({
        name: "user"
      });
    },
    parameter() {
      this.$router.push({
        name: "parameter"
      });
    },
    system() {
      this.$router.push({
        name: "system"
      });
    },
    account() {
      this.$router.push({
        name: "account"
      });
    },
    reflect() {
      this.$router.push({
        name: "reflect"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.el-header {
  background: rgba(0, 89, 165, 1);
  opacity: 0.53;
  height: 80px;
  span:nth-child(1) {
    float: left;
    font-size: 22px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 26px;
    margin: 15px 0 0 46px;
  }
  .rightt {
    float: right;
    margin-right: 140px;
    margin-top: 20px;
    img {
      float: left;
    }
    span:nth-child(2) {
      float: left;
      margin-left: 8px;
      margin-top: 3px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
    span:nth-child(3) {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      float: left;
      margin-left: 15px;
      margin-top: 2px;
    }
  }
}
.el-aside {
  background: rgb(56, 71, 98);
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  ul {
    li {
      width: 212px;
      height: 54px;
      margin: 15px 0 0 24px;
      img {
         width: 29px;
        height: 30px;
        float: left;
        margin: 14px 0 0 45px;
      }
      span {
        float: left;
        margin: 20px 0 0 20px;
        font-family: MicrosoftYaHei;
        color: rgba(255, 255, 255, 1);
      }
    }
    li:nth-child(1) {
      margin-top: 40px;
    }
    li:nth-child(7) {
      background-color: rgb(37, 118, 251);
    }
  }
}
.tbbj{
  height: 100vh;
  background: rgba(247, 247, 247, 1);
  padding: 55px 0 0 0;
  .head {
    margin-left: 72px;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(24, 24, 24, 1);
  }
  .cont {
    margin: 60px 0 0 353px;
    width: 772px;
    height: 625px;
    border: 1px solid rgba(112, 112, 112, 1);
    border-radius: 16px;
    ul {
      font-size: 24px;
      font-family: Songti SC;
      font-weight: 400;
      color: rgba(71, 70, 70, 1);
      margin: 60px 0 0 87px;
      li:nth-child(1) {
        .tu {
          width: 200px;
          height: 113px;
          background: rgba(210, 210, 210, 1);
          border-radius: 4px;
          // float: right;
          // margin-right: 150px;
          margin: -20px 0 0 160px;
        }
      }
      li {
        margin-top: 43px;
      }
    }
    button {
      margin: 74px 0 0 268px;
      width: 238px;
      height: 58px;
      background: rgba(71, 212, 185, 1);
      border-radius: 4px;
      font-size: 24px;
      font-family: Songti SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
