<template>
  <div>
    <header>
      <img @click="goback()" src="../assets/img/fanhui-2.png" alt />
      <span>收款开关</span>
    </header>
    <div class="content">
      <img class="img1" src="../assets/img/图层 5@3x.png" alt />
      <img class="img2" src="../assets/img/温馨提示.png" alt />
      <div class="text">
        <p style="margin-top:0.06rem">1.交易中不可操作；</p>
        <!-- <p >2.当日仅可操作一次；</p> -->
        <p style="margin:0.1rem 0 0.03rem 0">2.只能开启一种收款方式；</p>
      </div>
    </div>
    <div class="weibu">
      <div class="shou1" v-for="(item,index) in datas " :key="index">
        <img :src="icons[item.name]" alt />
        <span>{{item.name}}收款</span>

        <div class="sth">
          <van-switch
            style="float:right;margin-right:0.07rem"
            v-model="item.status == 0 ? true : false"
            @change="changeSwith(item.id,item.status)"
            active-color="#07c160"
            inactive-color="#f44"
            size="14px"
          />
        </div>
      </div>
    </div>
    <div class="workL">
      <img src="../assets/image/图层 4 拷贝.png" alt />
    </div>
  </div>
</template>
<script>
export default {
  name: "paymentswitch",
  data() {
    return {
      icons: {
        银行卡: require("../assets/img/银行卡.png"),
        云闪付: require("../assets/img/云闪付.png"),
        微信: require("../assets/img/微信.png"),
        支付宝: require("../assets/img/支付宝.png"),
        拼多多支付宝:require("../assets/img/拼多多支付宝.jpg"),
        拼多多微信:require("../assets/img/拼多多微信.jpg"),
        聚合码:require("../assets/img/聚合码.jpg"),
        支付宝固码:require("../assets/img/支付宝固码.jpg")
      },
      datas: []
    };
  },
  created() {
    this.switchh();
    // console.log(this.status);
    this.openFullScreen2();
  },
  methods: {
    openFullScreen2() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        mask: true,
        message: "加载中..."
      });
    },

    switchh() {
      this.Http.post("/api/cjtpay-commercial-web/payment/list", {}).then(
        data => {
          if (data.httpCode == 0) {
            this.$toast.clear();
            // 数据的返回接受
            console.log(data);
            this.datas = data.data;
          } else {
            // 数据错误提示
            this.$toast(data.msg);
          }
        }
      );
    },
    changeSwith(e, i) {
      console.log(i, e);
      if (i == true) {
        i = 0;
      } else {
        i = 1;
      }
      this.Http.post("/api/cjtpay-commercial-web/payment/status", {
        id: e,
        status: i
      }).then(data => {
        if (data.httpCode == 0) {
          // 数据的返回接受
          this.$toast.clear();

          console.log(data);
          this.switchh();
        } else {
          // 数据错误提示
          this.$toast(data.msg);
        }
      });
    },
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  padding-top: 0.7rem;
}
.img1 {
  width: 2.68rem;
  height: 1.52rem;
  margin: 0.32rem 0px 0 0.59rem;
}
.img2 {
  width: 0.72rem;
  height: 0.17rem;
  position: absolute;
  left: 0.79rem;
  top: 1.29rem;
}
.text {
  font-size: 0.14rem;
  color: #3957fb;
  position: absolute;
  right: 0.85rem;
  top: 1.58rem;
}
.weibu {
  position: relative;
  z-index: 2;
  margin: 0.2rem 0 0 0.3rem;
  .shou1 {
    height: 0.14rem;
    border-bottom: 0.01rem solid #a8a7a7;
    padding: 0.11rem 0;
    width: 90%;
    img {
      width: 0.18rem;
      height: 0.16rem;
      float: left;
    }
    span {
      font-size: 0.14rem;
      float: left;
      margin: 0.02rem 0 0 0.15rem;
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
    opacity: 0.4;
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
