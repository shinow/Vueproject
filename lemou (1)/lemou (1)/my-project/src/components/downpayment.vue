<template>
  <div>
    <header>
      <img @click="goback()" src="../assets/img/fanhui-2.png" alt />
      <span>收付款信息</span>
    </header>
    <div class="content">
      <button class="btn1">
        <p>今日付款</p>
        <p>{{(datak.todayCharge)/100}}</p>
      </button>
      <button class="btn2">
        <p>历史付费</p>
        <p>{{(datak.historyCharge)/100}}</p>
      </button>
      <div class="shoukuan">
        <ul>
          <li v-for="(item,index) in  Receivable" :key="index">
            <p>{{item.code}}今日收款:<span>{{(item.toDayMoney)/100}}</span></p>
             <p>{{item.code}}历史收款:<span>{{(item.historyMoney)/100}}</span></p>
          </li>
        </ul>
        <!-- <div class="shou">
          <span>微信今日收款：</span>
          <span>0.00</span>
        </div>
        <div class="shou">
          <span>微信历史收款：</span>
          <span>1994.40</span>
        </div>
        <div class="shou">
          <span>支付宝今日收款：</span>
          <span>0.00</span>
        </div>
        <div class="shou">
          <span>支付宝历史收款：</span>
          <span>0.00</span>
        </div>
        <div class="shou">
          <span>银行卡今日收款：</span>
          <span>0.00</span>
        </div>
        <div class="shou">
          <span>银行卡历史收款：</span>
          <span>0.00</span> -->
        <!-- </div> -->
      </div>
      <div class="shangxian">
        <div class="weixin">
          <img src="../assets/img/微信.png" alt />
          <span>微信今日上限：</span>
          <span>{{quotasS[0].remark}}</span>
        </div>
        <div class="zhifub">
          <img src="../assets/img/支付宝.png" alt />
          <span>支付宝今日上限：</span>
          <span>{{quotasS[1].remark}}</span>
        </div>
      </div>
      <div class="dibu">
        <p>注意：微信收款每日上限为{{quotasS[0].remark}}，支付宝每日上限为 {{quotasS[1].remark}}，</p>
        <p>微信支付宝每日上限后，将停止订单匹配</p>
      </div>
    </div>
      <div class="workL">
      <img src="../assets/image/图层 4 拷贝.png" alt />
    </div>
  </div>
</template>
<script>
export default {
  name: "downpayment",
  data() {
    return {
       Receivable:[],
      datak:"",
      quotasS:[]
    };
  },
  created() {
    this.statistics()
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    statistics() {
      this.Http.post(
        "/api/cjtpay-commercial-web/receipt/statistics",
      ).then(data => {
        if (data.httpCode == 0) {
          // 数据的返回接受
          console.log(data);
          this.Receivable=data.data.receipts
         this.datak=data.data
         this.quotasS=data.data.quotas
         this.Receivable.forEach((item,index)=>{
           if (item.code==0) {
             item.code="支付宝"
           }else if(item.code==1){
             item.code="微信"
           }else if(item.code==2){
             item.code="云闪付"
           }else if(item.code==3){
             item.code="银行卡"
           }
         })
        } else {
          // 数据错误提示
        }
      });
    }, 
  }
};
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  z-index: 2;
  padding: 0.89rem 0 0 0.34rem;
  .btn1 {
    width: 1.35rem;
    color: white;
    height: 0.74rem;
    background: linear-gradient(
      0deg,
      rgba(237, 100, 62, 1) 0%,
      rgba(240, 177, 108, 1) 100%
    );
    box-shadow: 0px 0.05rem 0.07rem 0px rgba(253, 60, 3, 0.6);
    border-radius: 0.06rem;
    // border-radius: 4px;
    p {
      font-size: 0.15rem;
    }
    p:nth-child(2) {
      margin-top: 0.1rem;
    }
  }
  .btn2 {
    width: 1.35rem;
    color: white;

    height: 0.74rem;
    background: linear-gradient(
      0deg,
      rgba(63, 97, 248, 1) 0%,
      rgba(120, 179, 250, 1) 100%
    );
    box-shadow: 0px 0.05rem 0.07rem 0px rgba(2, 51, 251, 0.6);
    // border-radius: 9px;
    border-radius: 0.06rem;
    margin-left: 0.41rem;
    p {
      font-size: 0.15rem;
    }
    p:nth-child(2) {
       margin-top: 0.1rem;
    }
  }

  .shoukuan {
    margin-top: 0.4rem;
    color: #1c1c1c;
    font-size: 0.14rem;
    ul{
      li{
        width: 1.7rem;
        // border: 1px solid red;
        p{
          margin-top: 0.2rem;
          span{
            float: right;
          }
        }
      }
    }
  }
  .shangxian {
    margin-top: 0.55rem;
    font-size: 0.14rem;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(28, 28, 28, 1);
    width: 100%;
    .weixin {
      overflow: hidden;
      width: 100%;
      img {
        float: left;
        width: 0.17rem;
        height: 0.16rem;
      }
      span:nth-child(2){
        margin: 0.03rem 0 0 0.13rem;
        float: left;
      }
      span:nth-child(3) {
        float: right;
        margin: 0.03rem 1.1rem 0 0;
      }
    }
    .zhifub {
      overflow: hidden;
      width: 100%;
      float: left;
      margin-top: 0.16rem;
      img {
        float: left;
        width: 0.17rem;
        height: 0.16rem;
        margin-top: 0.01rem;
      }
      span:nth-child(2) {
        margin: 0.04rem 0 0 0.13rem;
        float: left;
      }
      span:nth-child(3) {
        float: right;
        margin: 0.04rem 1.1rem 0 0;
      }
    }
  }
  .dibu {
    // position: absolute;
    // bottom: 60px;
    float: left;
    margin-top: 0.2rem;
    font-size: 0.12rem;
    color: red;
    line-height: 0.25rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(212, 2, 2, 1);
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
