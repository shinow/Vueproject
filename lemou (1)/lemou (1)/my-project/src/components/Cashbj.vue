<template>
  <div>
    <header>
      <img @click="goback()" src="../assets/img/fanhui-2.png" alt />
      <span>新增提现</span>
      <!-- <p>取消</p> -->
    </header>
    <div class="content">
      <div class="name">
        <span>提现账号：</span>
        <input type="text" v-model="account" placeholder="请输入内容" />
      </div>
      <div class="name">
        <span>提现额度：</span>
        <input type="text" @blur.prevent="xiane(quota)" v-model="quota" placeholder="请输入内容" />
      </div>
      <div class="name">
        <span>提现备注：</span>
        <input type="text" v-model="remark" placeholder="请输入内容" />
      </div>
      <div class="name">
        <span>提现类型：</span>
        <el-select
          style="margin-left:0.15rem;width:160px"
          v-model="type"
          size="small"
          placeholder="请选择提现类型"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="name">
        <span>提现金额：</span>
        <input type="text" v-model="money" disabled="disabled" />
      </div>
      <button @click="addbank()">提交</button>
    </div>
      <div class="workL">
      <img src="../assets/image/图层 4 拷贝.png" alt />
      <p>请填写正确的信息哦</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Cashbj",
  data() {
    return {
      type: "",
      yongY: "",
      options: [
        {
          value: 0,
          label: "支付宝"
        },
        {
          value: 1,
          label: "微信"
        },
        {
          value: 2,
          label: "云闪付"
        },
        {
          value: 3,
          label: "银行卡"
        }
      ],
      quota: "",
      money: "",
      account: "",
      remark: "",
      Nald: true,
      id: ""
    };
  },
  created() {
    this.yongY = this.$route.query.ids;
  },
  mounted() {
     this.listt();
  },
  methods: {
    listt() {
      this.Http.post(
        "/api/cjtpay-commercial-web/commercial/withdraw/queryMoney"
      ).then(data => {
        if (data.httpCode == 0) {
          if (data.data == undefined || data.data == null) {
            console.log("1");
          } else {
            this.quota = data.data.quota / 100;
            this.money = data.data.money / 100;
          }
        } else {
          // 数据错误提示
          this.$toast(data.msg);
        }
      });
    },
    xiane(val) {
      this.Http.post(
        "/api/cjtpay-commercial-web/commercial/withdraw/queryMoneyQuota",
        "" + val,
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        }
      ).then(data => {
        if (data.httpCode == 0) {
          console.log(data);
          this.money = data.data / 100;
        } else {
          // 数据错误提示
          this.$toast(data.msg);
        }
      });
    },
    goback() {
      this.$router.push({
        name: "Cash",
        query: {
          ids: this.yongY
        }
      });
    },
    addbank() {
      if (
        this.account === "" ||
        this.money === "" ||
        this.quota === "" ||
        this.remark === "" ||
        this.type === ""
      ) {
        this.$toast("请输入对应内容哦");
        return;
      }
      this.$dialog
        .confirm({
          title: "提交提现",
          message: "请确认好信息，一但提交不可返回！"
        })
        .then(() => {
          if (this.Nald == true) {
            this.Http.post(
              "/api/cjtpay-commercial-web/commercial/withdraw/add",
              {
                account: this.account,
                money: this.money,
                quota: this.quota,
                remark: this.remark,
                type: this.type
              }
            ).then(data => {
              if (data.httpCode == 0) {
                console.log(data);
                this.$toast("提交成功");
                this.Nald = false;
                setTimeout(() => {
                  this.$router.push({
                    name: "Cash"
                  });
                }, 700);
              } else {
                // 数据错误提示
                this.$toast(data.msg);
              }
            });
          }
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style lang="scss" scoped>
header {
  width: 3.75rem;
  height: 0.55rem;
  background: linear-gradient(
    -45deg,
    rgba(51, 74, 201, 1) 0%,
    rgba(62, 89, 237, 1) 100%
  );
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  img {
    height: 0.25rem;
    position: absolute;
    left: 9%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  span:nth-child(1) {
    font-size: 0.2rem;
    color: white;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  p {
    font-size: 0.2rem;
    color: white;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(325%, -50%);
  }
}
.content {
  z-index: 2;
  position: fixed;
  top: 0.7rem;
  margin: 0rem 0 0 0.25rem;
  width: 85%;
  font-family: PingFangSC-Regular;
  font-weight: bold;
  color: rgba(81, 81, 81, 1);
  .name,
  .kahao,
  .yinhang,
  .dizhi {
    padding: 0.12rem 0 0.12rem 0;
    border-bottom: 0.01rem solid #a8a7a7;
    input {
      // border: 1px solid red;
      text-align: center;
      background-color: transparent;
      // width: 60%;
      border-radius: 0px;
      font-family: HiraginoSansGB-W3;
      font-weight: bold;
      color: black;
      font-size: 0.15rem;
    }
  }
  button {
    width: 1.5rem;
    height: 0.4rem;
    margin: 0.35rem 0 0 0.95rem;
    background: rgba(41, 126, 253, 1);
    box-shadow: 0.01rem 0.03rem 0.1rem 0px rgba(1, 102, 252, 0.61);
    border-radius: 40px;
    background-color: #297efd;
    border-radius: 0.2rem;
    color: white;
    font-size: 0.19rem;
  }
  .zhuangtai {
    padding: 0.12rem 0 0.12rem 0;
    border-bottom: 0.01rem solid #a8a7a7;
    span {
      // float: left;
      margin-top: 0.04rem;
    }
  }
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
