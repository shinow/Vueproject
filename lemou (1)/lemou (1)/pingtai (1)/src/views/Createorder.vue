<template>
  <div class="huidiao">
    <ul>
      <li>
        <span>支付类型：</span>
        <el-input
          v-model="payType"
          @blur.prevent="changeCount(payType)"
          style="width:200px"
          placeholder="请输入支付类型"
        ></el-input>
      </li>
      <li>
        <span>支付金额：</span>
        <el-input
          v-model="orderAmt"
          @blur.prevent="changeCountO(orderAmt)"
          style="width:200px"
          placeholder="请输入支付金额"
        ></el-input>
      </li>
      <li>
        <span style="margin-left:15px">订单号：</span>
        <el-input
          v-model="orderNo"
          @blur.prevent="changeCountN(orderNo)"
          style="width:200px"
          placeholder="请输入订单号"
        ></el-input>
      </li>
      <li>
        <span>回调地址：</span>
        <el-input
          v-model="notifyNrl"
          @blur.prevent="changeCountL(notifyNrl)"
          style="width:200px"
          placeholder="请输入回调地址"
        ></el-input>
      </li>

      <el-button style="margin-top:30px;margin-left:150px" type="primary" @click="enter()">确认</el-button>
    </ul>
  </div>
</template>
<script>
import { PAYpayTest, PAYgetOrder } from "@/api";
export default {
  name: "Createorder",
  data() {
    return {
      payType: "",
      orderAmt: "",
      orderNo: "",
      notifyNrl: "",
      age: "",
      dataT: "",
      Urll: ""
    };
  },
  methods: {
    changeCount(val) {
      this.payType = val.replace(/\s*/g, "");
    },
    changeCountO(val) {
      this.orderAmt = val.replace(/\s*/g, "");
    },
    changeCountN(val) {
      this.orderNo = val.replace(/\s*/g, "");
    },
    changeCountL(val) {
      this.notifyNrl = val.replace(/\s*/g, "");
    },
    enter() {
      let par = {
        payType: this.payType,
        orderAmt: this.orderAmt,
        orderNo: this.orderNo,
        notifyNrl: this.notifyNrl
      };
      PAYpayTest(par).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data);
          this.dataT = res.data.data;
          //  Window.open("www.baidu.com")
          this.getOrder();
        } else {
          this.$message(res.data.data.message);
        }
      });
    },
    getOrder() {
      let key = JSON.stringify(this.dataT);
      PAYgetOrder(key).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data);
          this.Urll = res.data.data.url;
          if (
            this.Urll === "" ||
            this.Urll === null ||
            this.Urll === undefined
          ) {
            this.$message.error(res.data.data.message);
            //  alert("1")
            return;
          } else {
            this.open();
          }

          //  Window.open("https://www.baidu.com")
        } else {
          this.$message(res.data.data.message);
        }
      });
    },
    open() {
      window.open(this.Urll);
    }
  }
};
</script>
<style lang="less" scoped>
.huidiao {
  margin: 80px 0 0 700px;
  ul {
    li {
      margin-top: 30px;
    }
  }
}
</style>