<template>
  <div style="height: 100vh;
 background: rgba(255, 255, 255, 1);">
    <header>
      <img @click="goback()" src="../assets/img/fanhui-2.png" alt />
      <span>确认订单</span>
    </header>
    <div class="text">注意：目前用户充值，请务必正确填写，你相对应的账户姓名，以保正常转账。</div>
    <div class="content">
      <div class="zhifu">
        <!-- <img src="../assets/img/银行卡.png" alt /> -->
        <!-- <span>银行卡支付</span> -->
        <el-select v-model="value" size="small" placeholder="请选择支付通道">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <img src="../assets/img/tubiaolunkuohua41-2.png" alt />
      </div>
      <div class="name">
        <div class="shuru" style="border-bottom:0px solid red">
          <input type="text" v-model="name" placeholder="请输入您的账户姓名" />
        </div>
      </div>
      <ul>
        <li>
          <span>{{datak.name}}({{datak.num}}个)</span>
          <span>￥{{jiaqian}}</span>
        </li>
        <li>
          <span>售价￥{{datak.sellingPrice}}</span>
        </li>
        <li>
          <span>赚 {{datak.commission}}元 /组</span>
        </li>
        <li>
          <span>购买数量</span>
          <span>
            <van-stepper
              v-model="shuliang"
              integer
              @plus="tianjia"
              @minus="jianshao"
              @blur="xiaoshi"
            />
          </span>
        </li>
      </ul>
    </div>
    <div class="dibu2">
      <div class="jin">
        <span>支付金额：</span>
        <span>￥</span>
        <span>{{zongjia}}</span>
        <img src="../assets/img/duanjv.png" alt />
        <span @click="enter()">提交订单</span>
      </div>
    </div>
    <div class="workL">
      <img src="../assets/image/图层 4 拷贝.png" alt />
      <p>填写订单信息下单哦</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "enterdd",
  data() {
    return {
      name: "",
      options: [
        {
          value: 0,
          label: "银行卡"
        },
        {
          value: 1,
          label: "支付宝"
        },
        {
          value: 2,
          label: "微信"
        }
      ],
      value: "",
      shuliang: "",
      jiaqian: "",
      zongjia: "",
      datak: [],
      id: ""
      // numberr:""
    };
  },
  created() {
    this.list();
    // this.datak = this.$route.query.dataa;
    // this.datak = this.$route.query.datad;
    console.log(this.datak);

    console.log(this.zongjia);
    this.id = this.$route.query.ids;
    console.log(this.id);
    console.log(this.zongjia);
  },
  methods: {
    list() {
      console.log(this.post);
      this.Http.post("/api/cjtpay-commercial-web/commodity/list", {}).then(
        data => {
          if (data.httpCode == 0) {
            // 数据的返回接受
            console.log(data);
            this.datak = data.data[0];
            this.jiaqian = this.datak.stockPrice;
            this.zongjia = this.jiaqian;
            console.log(this.datak.id);
          } else {
            // 数据错误提示
          }
        }
      );
    },
    goback() {
      this.$router.go(-1);
    },
    enter() {
      if (this.value === "") {
        this.$toast("亲，请选择支付通道！");
        return;
      }
      if (this.name === "") {
        this.$toast("亲，请输入姓名哦！");
      } else {
        this.Http.post("/api/cjtpay-commercial-web/commodity/order/add", {
          commodityId: this.datak.id,
          type: this.value,
          amount: Number(this.zongjia),
          bankName: this.name,
          num: this.shuliang,
          price: Number(this.jiaqian)
        }).then(data => {
          if (data.httpCode == 0) {
            // 数据的返回接受
            console.log(data.data);
            this.$router.push({
              name: "enterxx",
              query: {
                ids: data.data
              }
            });
          } else {
            // 数据错误提示
            this.$toast(data.msg);
          }
        });
      }
    },
    tianjia() {
      this.shuliang++;
      this.zongjia = (this.shuliang * this.jiaqian).toFixed(2);
    },
    xiaoshi() {
      this.zongjia = (this.shuliang * this.jiaqian).toFixed(2);
    },
    jianshao() {
      this.shuliang--;
      this.zongjia = (this.shuliang * this.jiaqian).toFixed(2);
    }
  }
};
</script>
<style lang="scss" scoped>
.text {
  width: 89%;
  padding: 0.7rem 0 0 0.2rem;
  font-size: 0.13rem;
  line-height: 0.23rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(43, 42, 42, 1);
}
.content {
  position: relative;
  z-index: 2;
  width: 85%;
  margin: 0.2rem 0 0 0.18rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0.03rem 0.1rem 0 rgba(1, 1, 1, 0.09);
  border-radius: 0.1rem;
  overflow: hidden;
  padding: 0.2rem 0 0 0.2rem;
  .zhifu {
    float: left;
    width: 3.4rem;
    img {
      float: right;
      // margin-left: 1.55rem;
      margin-right: 0.5rem;
      margin-top: 0.05rem;
      width: 0.22rem;
      height: 0.22rem;
    }
  }
  .name {
    .shuru {
      padding-bottom: 0.25rem;
      width: 92%;
      border-bottom: 0.01rem solid rgba(160, 159, 159, 1);
      input {
        height: 0.2rem;
        width: 2.91rem;
        margin-top: 0.17rem;
        border: 0.01rem solid gray;
        font-size: 0.12rem;
        text-align: center;
        padding: 0.03rem 0 0 0;
        border-radius: 0rem;
      }
    }
  }
  ul {
    padding-bottom: 0.12rem;
    li:nth-child(1) {
      font-size: 0.17rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(48, 48, 48, 1);
      span:nth-child(2) {
        float: right;
        margin-right: 0.22rem;
      }
    }
    li:nth-child(2) {
      margin-top: 0.12rem;
      font-size: 0.17rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(48, 48, 48, 1);
      opacity: 0.7;
    }
    li:nth-child(3) {
      margin-top: 0.12rem;
      font-size: 0.2rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(80, 100, 235, 1);
    }
    li:nth-child(4) {
      height: 0.3rem;
      // border: 1px solid red;
       margin-top: 0.1rem;
      overflow: hidden;
      font-size: 0.17rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(48, 48, 48, 1);
      line-height: 0.4rem;
      span:nth-child(2) {
        float: right;
        margin:0  0.22rem 0 0;
      }
    }
  }
}
.dibu2 {
  width: 100%;
  height: 0.8rem;
  position: absolute;
  bottom: 0;
  left: 0;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(43, 42, 42, 1);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0 0.08rem 0 rgba(0, 0, 0, 0.13);
  .jin {
    // position: absolute;
    // top: 30px;
    // left: 35px;
    margin-top: 0.3rem;
    margin-left: 0.25rem;
  }
  span:nth-child(1) {
    // font-size: 0.1rem; font-size: 0.14rem;
    font-size: 0.14rem;
  }
  span:nth-child(2) {
    // font-size: 0.1rem;
    font-size: 0.14rem;
    color: red;
  }
  span:nth-child(3) {
    // font-size: 0.1rem;
    font-size: 0.14rem;
    color: red;
  }
  img {
    width: 1.3rem;

    position: absolute;
    right: 0.12rem;
    top: 0.16rem;
  }
  span:nth-child(5) {
    // width: 70%;
    font-size: 0.2rem;
    font-family: PingFangSC-Semibold;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    position: absolute;
    right: 0.37rem;
    top: 0.32rem;
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