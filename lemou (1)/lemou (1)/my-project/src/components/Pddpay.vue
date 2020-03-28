<template>
  <div class="pddpay">
    <header>
      <img @click="goback()" src="../assets/img/fanhui-2.png" alt />
      <span>拼多多统计</span>
    </header>
    <div class="cont">
      <van-tabs
        swipeable
        @change="list()"
        v-model="active"
        animated
        title-active-color="rgba(80, 100, 235, 1)"
        color="rgba(80, 100, 235, 1)"
      >
        <van-tab title="支付宝通道支付订单统计">
          <div class="alipayL">
            <Pdalipay :data="ListArr"></Pdalipay>
          </div>
          <div class="Lp">
            <p>买家数量：{{buyerCount}}</p>
            <p>商品数量：{{sellerCount}}</p>
            <p>支付订单数量：{{payCount}}</p>
          </div>
          <div class="ali">
            <ul>
              <li>买家日成交量限额：{{(zhifuL.buyerMake)/100}}</li>
              <li>买家限制支付订单数量：{{zhifuL.buyerNum}}</li>
              <li>商品日成交量限额：{{(zhifuL.sellerMake)/100}}</li>
              <li>商品限制支付订单数量：{{zhifuL.sellerNum}}</li>
              <li>用户拼多多剩余限额：{{(zhifuL.surplusQuota)/100}}</li>
              <li>类型：{{zhifuL.type}}</li>
              <li>用户拼多多已跑额度：{{(zhifuL.userConsume)/100}}</li>
              <li>用户拼多多总限额：{{(zhifuL.userQuota)/100}}</li>
            </ul>
          </div>
        </van-tab>
        <van-tab title="微信通道支付订单统计">
          <div class="alipayL">
            <Pdweix :data="ListArrW"></Pdweix>
          </div>
          <div class="Lp">
            <p>买家数量：{{buyerCount}}</p>

            <p>商品数量：{{sellerCount}}</p>
            <p>支付订单数量：{{payCount}}</p>
          </div>
          <div class="ali">
            <ul>
              <li>买家日成交量限额：{{(weixiR.buyerMake)/100}}</li>
              <li>买家限制支付订单数量：{{weixiR.buyerNum}}</li>
              <li>商品日成交量限额：{{(weixiR.sellerMake)/100}}</li>
              <li>商品限制支付订单数量：{{weixiR.sellerNum}}</li>
              <li>用户拼多多剩余限额：{{(weixiR.surplusQuota)/100}}</li>
              <li>类型：{{weixiR.type}}</li>
              <li>用户拼多多已跑额度：{{(weixiR.userConsume)/100}}</li>
              <li>用户拼多多总限额：{{(weixiR.userQuota)/100}}</li>
            </ul>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import Pdalipay from "@/components/Pdalipay";
import Pdweix from "@/components/Pdweix";

export default {
  components: {
    Pdalipay,
    Pdweix
  },
  name: "Pddpay",
  data() {
    return {
      active: 0,
      ListArr: [],
      ListArrW: [],
      buyerCount: "",
      payCount: "",
      sellerCount: "",
      zhifuL: "",
      weixiR: ""
    };
  },
  created() {
    this.list();
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    list() {
      this.Http.post(
        "/api/cjtpay-commercial-web/commodityPay/statistics",
        {}
      ).then(data => {
        if (data.httpCode == 0) {
          console.log(data.data);
          console.log(data.data.vos[0].statistics);
          this.buyerCount = data.data.buyerCount;
          this.payCount = data.data.payCount;
          this.sellerCount = data.data.sellerCount;
          data.data.vos[0].statistics.forEach((item, index) => {
            if (item.status == 0) {
              item.status = "可用";
            } else if (item.status == 1) {
              item.status = "已用";
            } else if (item.status == 2) {
              item.status = "已匹配";
            } else if (item.status == 3) {
              item.status = "更新中";
            }
          });
          data.data.vos[1].statistics.forEach((item, index) => {
            if (item.status == 0) {
              item.status = "可用";
            } else if (item.status == 1) {
              item.status = "已用";
            } else if (item.status == 2) {
              item.status = "已匹配";
            } else if (item.status == 3) {
              item.status = "更新中";
            }
          });
          this.zhifuL = data.data.vos[0];
          this.weixiR = data.data.vos[1];
          this.ListArr = data.data.vos[0].statistics;
          this.ListArrW = data.data.vos[1].statistics;
          if (this.zhifuL.type == 0) {
            this.zhifuL.type = "拼多多支付宝";
          } else if ((this.zhifuL.type = 1)) {
            this.zhifuL.type = "拼多多微信";
          }
          if (this.weixiR.type == 0) {
            this.weixiR.type = "拼多多支付宝";
          } else if ((this.weixiR.type = 1)) {
            this.weixiR.type = "拼多多微信";
          }
        } else {
          this.$toast(data.msg);
        }
      });
    }
  }
};
</script>
<style lang="less"  scoped>
.pddpay {
  .cont {
    padding-top: 0.57rem;
    .alipayL {
      padding-left: 0.15rem;
      width: 3.75rem;
      text-align: center;
      margin-top: -0.2rem;
    }
    .Lp {
      margin-bottom: 0.05rem;
      margin-top: -0.5rem;
      font-size: 0.18rem;
      color: green;
      padding-left: 0.3rem;
      p {
        margin-top: 0.1rem;
      }
    }
    .ali {
      font-size: 0.18rem;
      border-top: 1px dashed green;
      ul {
        li {
          margin-top: 0.1rem;
          margin-bottom: 0.2rem;
          padding-left: 0.3rem;
        }
      }
    }
  }
}
</style>