<template>
  <div class="payalicode">
    <header>
      <img @click="goback()" src="../../assets/img/fanhu.png" alt />
      <span>{{Addlis}}银行卡</span>
      <!-- <p>取消</p> -->
    </header>
    <div class="content">
      <div class="name">
        <span>持卡人名称：</span>
        <input type="text" v-model="userName" style="margin-left:0.07rem" placeholder="请输入内容" />
      </div>
      <div class="name">
        <span>卡号：</span>
        <input
          type="text"
          @blur.prevent="changeCount(cardNo)"
          v-model="cardNo"
          style="margin-left:0.52rem"
          placeholder="请输入内容"
        />
      </div>

      <div class="name">
        <span>银行名称：</span>
        <!-- <input type="text" v-model="bankName" style="margin-left:0.2rem" placeholder="请输入内容" /> -->
        <el-select
          style="margin-left:0.15rem;width:160px"
          @change="change"
          v-model="value"
          size="small"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.dealerId"
            :value="item.name"
          ></el-option>
        </el-select>
      </div>
      <!-- <div class="name">
        <span>银行编号：</span>
        <input type="text" v-model="bankMark" style="margin-left:0.2rem" placeholder="请输入内容" />
      </div>-->
      <button @click="addbank()">保存</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "bianjibank",
  data() {
    return {
      type: "",
      checked: true,
      userName: "",
      cardNo: "",
      bankName: "",
      bankMark: "",
      options: [],
      Nald: true,
      value: "",
      Addlis: "",
      id: ""
    };
  },
  created() {
    this.Addlis = this.$route.query.value;
    this.id = this.$route.query.ids;
    this.userName = this.$route.query.names;
    this.cardNo = this.$route.query.coads;
    this.value = this.$route.query.bakname;
    console.log(this.Addlis);
    // this.Bank();
  },
  methods: {
    changeCount(val) {
      console.log(val);
      let reg = /^([1-9]{1})(\d{15}|\d{18})$/;
      console.log(val);
      if (!reg.test(val)) {
        val = "";
        this.$toast("银行卡格式不正确");
        this.cardNo = val;
      } //
    },
    change(val) {
      this.value = val;
      let obj = {};
      obj = this.options.find(item => {
        return item.name === val;
      });
      console.log(obj);
      this.type = obj.remark;
    },
    Bank() {
      //18657173438
      this.Http.post(
        "http://47.52.240.147:8090/cjtpay-system-web/system/dic/public/list",
        {
          child: false,
          type: "BANK"
        }
      ).then(data => {
        if (data.httpCode == 0) {
          console.log(data);
          this.options = data.data;
        } else {
          // 数据错误提示
          this.$toast(data.msg);
        }
      });
    },
    goback() {
      this.$router.push({
        name: "bankcard"
      });
    },
    addbank() {
      if (this.Addlis == "编辑") {
        if (this.userName == "" || this.cardNo == "" || this.value == "") {
          this.$toast("请输入对应内容");
          return;
        }
        if (this.Nald == true) {
          this.Http.post("/api/cjtpay-commercial-web/account/updateBank", {
            bankMark: this.type,
            bankName: this.value,
            cardNo: this.cardNo,
            id: this.id,
            userName: this.userName
          }).then(data => {
            if (data.httpCode == 0) {
              console.log(data);
              this.$toast("修改成功");
              this.Nald = false;
              setTimeout(() => {
                this.$router.push({
                  name: "bankcard"
                });
              }, 700);
            } else {
              // 数据错误提示
              this.$toast(data.msg);
            }
          });
        }
      } else {
        if (this.userName == "" || this.cardNo == "" || this.value == "") {
          this.$toast("请输入对应内容");
          return;
        }
        if (this.Nald == true) {
          this.Http.post("/api/cjtpay-commercial-web/account/addBank", {
            bankMark: this.type,
            bankName: this.value,
            cardNo: this.cardNo,
            userName: this.userName
          }).then(data => {
            if (data.httpCode == 0) {
              console.log(data);
              this.$toast("添加成功");
              this.Nald = false;
              setTimeout(() => {
                this.$router.push({
                  name: "bankcard"
                });
              }, 700);
            } else {
              // 数据错误提示
              this.$toast(data.msg);
            }
          });
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.payalicode {
  width: 3.75rem;
  height: 100vh;
  background: @bc;
  .content {
    position: fixed;
    z-index: 2;
    top: 0.7rem;
    margin: 0rem 0 0 0.25rem;
    width: 85%;
    font-family: PingFangSC-Regular;
    font-weight: bold;
    color: white;
    .name,
    .kahao,
    .yinhang,
    .dizhi {
      padding: 0.12rem 0 0.12rem 0;
      border-bottom: 0.01rem solid #a8a7a7;
      input {
        // border: 1px solid red;
        background-color: transparent;
        // width: 60%;
        border-radius: 0px;
        font-family: HiraginoSansGB-W3;
        font-weight: bold;
        color: white;
        font-size: 0.15rem;
      }
      input::-webkit-input-placeholder {
        color: white;
      }
    }
    span {
      color: white;
      font-size: 0.15rem;
      font-family: PingFangSC-Regular;
    }
    button {
      width: 1.5rem;
      height: 0.4rem;
      margin: 0.35rem 0 0 0.95rem;
      background: @btn2;
      box-shadow: 0.01rem 0.03rem 0.1rem 0px rgba(1, 102, 252, 0.61);
      border-radius: 40px;
      background-color: @btn2;
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
}
</style>
