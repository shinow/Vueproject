<template>
  <div>
    <header>
      <img @click="goback()" src="../assets/img/fanhui-2.png" alt />
      <span>确认信息</span>
    </header>
    <div class="wrap">
      <div v-if="shi" class="jishi">
        <span>订单关闭时间</span>
        <van-count-down class="a1" :time="datas.CountDown" format="mm ： ss " />
      </div>
      <div style="margin-top:0.1rem" class="tixing">
        <p>重要提醒</p>
        <div class="zi">
          <span>请务必使用姓名为【{{datas.payerName}}】的账户进行转账,金额为{{zongjia}}元，并填写好备注信息，才能及时发货。 谢谢 ！</span>
        </div>
      </div>
      <p class="p1" style="color:red">请转账到以下银行账户~</p>
      <div class="xinxi">
        <div class="cont">
          <div class="name" style="margin-top:-0.07rem">
            <span>收款人：</span>
            <span>{{datas.payee}}</span>
            <span
              v-clipboard:copy="datas.payee"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            >复制</span>
          </div>
          <div class="name">
            <span>{{paubank}}：</span>
            <span>{{datas.cardNumber}}</span>
            <span
              v-clipboard:copy="datas.cardNumber"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            >复制</span>
          </div>
          <div class="name">
            <span>{{erweima}}：</span>
           
            <span v-if="zhifub">{{datas.openingBank}}</span>
            <span v-if="zhifub"
              v-clipboard:copy="datas.openingBank"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            >复制</span>
             <img @click="dianjijj()" v-if="immmmm" style="width:0.5rem;height:0.5rem;margin-left:0.5rem" :src="datas.openingBank" alt="">
            <van-dialog
  v-model="show"
  title="扫描二维码"
  show-cancel-button
>
<div style="margin:0 auto;  text-align: center">
      <img style="width:2rem;height:2rem;;" :src="datas.openingBank">
</div>

  </van-dialog>
          </div>
          <div class="name2">
            <span>金额：</span>
            <span>{{zongjia}}</span>
            <span
              v-clipboard:copy="zongjia"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            >复制</span>
          </div>
        </div>
        <div class="namee bobb">
          <span>备注：</span>
          <span>{{datas.remark}}</span>
          <span
            v-clipboard:copy="datas.remark"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          >复制</span>
        </div>
        <div
          style="color:red;margin:10px 0 10px 56px;font-size:14px;
      
  font-weight: 600"
          class="text"
        >转账请复制以上备注信息到转账留言/备注中</div>
        <div class="dding">
          <div class="name">
            <span>订单号：</span>
            <span>{{datas.orderNo}}</span>
            <span
              v-clipboard:copy="datas.orderNo"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            >复制</span>
          </div>
          <div class="name1">
            <span>下单时间</span>
            <span>{{datas.updateTime}}</span>
          </div>
        </div>
      </div>
      <div v-if="bthh" class="jinhuo">
        <van-button   @click="Submitted()" type="warning">再想想</van-button>
        <van-button style="margin-left:0.2rem" @click="zhuangtai()" type="primary">已付款，点我提交</van-button>
        <!-- <button ></button> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "enterxx",
  data() {
    return {
      time: 20 * 60 * 1000,
      zongjia: "",
      name: "",
      zhifub:"",
      immmmm:"",
      erweima:"",
      bthh:true,
      danhao: "KKJ2D5FKJ",
      shu: "",
      paubank:"",
      shi:true,
      jiaqian1: "",
      datas: "",
      id: "",
       show: false
    };
  },
  created() {
    this.id = this.$route.query.ids;
    this.bakt = this.$route.query.bak;
    if (this.bakt=="失败") {
      this.shi=false
      this.bthh=false
    }
    this.payDetails();
  },
  methods: {
    dianjijj(){
      this.show=true
    },
    payDetails() {
      this.Http.post(
        "/api/cjtpay-commercial-web/commodity/order/payDetails",
        "" + this.id,
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        }
      ).then(data => {
        if (data.httpCode == 0) {
          // 数据的返回接受
          console.log(data);
          this.datas = data.data;
          console.log(this.datas);
           if (this.datas.type=="0") {
              this.zhifub=true;
              this.paubank="银行卡号"
              this.erweima="开户行"
              this.immmmm=false
            }else if(this.datas.type==1){
              this.zhifub=false
                this.immmmm=true
              this.paubank="支付宝账号"
              this.erweima="支付宝二维码"
            }else if(this.datas.type==2){
              this.immmmm=true
              this.zhifub=false
              this.paubank="微信账号"
              this.erweima="微信二维码"
            }
          this.zongjia = this.datas.money / 100;
           let dateTmp =this.datas.createTime.replace(/-/g, "/");
            let timestamp = Date.parse(dateTmp);
            let getDate = new Date(this.datas.createTime);
            let delDate = getDate.getTime();
            let dateLate = delDate + 20 * 60 * 1000;
            this.timestampToTime(dateLate);
            let dk = new Date();
            let dangqian = Date.parse(dk);
            this.$set(this.datas, "CountDown", dateLate - dangqian);
           
        } else {
          // 数据错误提示
          this.$toast(data.msg);
        }
      });
    },
    timestampToTime(val) {
      var date = new Date(val);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return m + s;
    },
    goback() {
     this.$router.push({name:"homeOD"})
    },
  
    // 复制成功
    onCopy(e) {
      this.$toast("复制成功");
    },
    // 复制失败
    onError(e) {
      this.$toast("失败");
    },
      Submitted(){
      this.$router.push({
        name: "paymentedOD"
      });
    },
    zhuangtai() {
      this.Http.post(
        "/api/cjtpay-commercial-web/commodity/order/submit",
        "" + this.id,
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        }
      ).then(data => {
        if (data.httpCode == 0) {
          // 数据的返回接受
          console.log(data);
          this.$router.push({
            name: "paymentedOD"
          });
        } else {
          // 数据错误提示
          this.$toast(data.msg);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  padding-top: 0.45rem;
}
.boby {
  padding-bottom: 0.05rem;
}
.dding {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 17px 0px rgba(1, 1, 1, 0.13);
}
.cont {
  padding: 0.05rem 0 0.1rem 0;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 17px 0px rgba(1, 1, 1, 0.13);
}
.jishi {
  overflow: hidden;
  color: red;
  padding: 0.2rem 0 0.07rem 0.25rem;
  font-size: 0.18rem;
  span {
    float: left;
  }
  .a1 {
    position: absolute;
    right: 0.25rem;
    top: 0.62rem;
    // float: right;
    color: red;
    font-size: 0.18rem;
  }
}
.tixing {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0 0.7rem 0 rgba(1, 1, 1, 0.13);

  width: 100%;
  p:nth-child(1) {
    font-size: 0.19rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 50, 50, 1);
    padding: 0.09rem 0 0.01rem 0.25rem;
  }
}
.p1 {
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 50, 50, 1);
  font-size: 0.15rem;
  padding: 0.07rem 0 0.05rem 0.25rem;
}
.zi {
  width: 90%;
  font-size: 0.155rem;
  padding: 0.04rem 0.1rem 0.06rem 0.25rem;
  line-height: 0.23rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 50, 50, 1);
}
.namee {
  // overflow: hidden;
  // width: 95%;
  margin-top: 0.1rem;
  padding: 0.11rem 0 0.11rem 0.25rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 17px 0px rgba(1, 1, 1, 0.13);
  span:nth-child(2) {
    margin-left: 0.08rem;
  }
  span:nth-child(3) {
    font-size: 0.1rem;
    padding: 0.04rem 0.05rem 0.02rem 0.05rem;
    color: white;
    float: right;
    margin-top: 0.02rem;
    margin-right: 0.23rem;
    line-height: 0.1rem;
    background-color: #ff8248;
    border-radius: 0.04rem;
  }
}
.xinxi {
  width: 100%;
  font-size: 0.16rem;
  padding: 0.03rem 0 0 0;
  .name {
    font-family: PingFangSC-Regular;
    font-weight: 450;
    color: rgba(51, 50, 50, 1);
    width: 90%;
    margin-left: 0.24rem;
    padding: 0.12rem 0;
    border-bottom: 0.01rem solid rgba(160, 159, 159, 1);
    span:nth-child(2) {
      margin-left: 0.08rem;
    }
    span:nth-child(3) {
      font-size: 0.1rem;
      line-height: 0.1rem;
      padding: 0.03rem 0.05rem 0.02rem 0.05rem;
      //  padding: 0.00rem 0.05rem;
      color: white;
      float: right;
      margin-top: 0.02rem;
      margin-right: 0.1rem;
      background-color: #ff8248;
      border-radius: 0.04rem;
    }
  }
  .name2 {
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 50, 50, 1);
    width: 90%;
    margin-left: 0.24rem;
    padding: 0.08rem 0;
    border-bottom: 0.01rem solid rgba(160, 159, 159, 1);
    span:nth-child(2) {
      margin-left: 0.08rem;
    }
    span:nth-child(3) {
      font-size: 0.1rem;
      line-height: 0.1rem;
      padding: 0.03rem 0.05rem 0.02rem 0.05rem;
      //  padding: 0.00rem 0.05rem;
      color: white;
      float: right;
      margin-top: 0.02rem;
      margin-right: 0.1rem;
      background-color: #ff8248;
      border-radius: 0.04rem;
    }
  }
  .name1 {
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 50, 50, 1);
    padding: 0.08rem 0 0.08rem 0.25rem;
    //  border-bottom: 0.03px solid #BFBFBFFF;
    span:nth-child(2) {
      margin-left: 0.12rem;
    }
    span:nth-child(3) {
      margin-left: 0.18rem;
    }
  }
}
.jinhuo {
  width: 3.75rem;
  // border: 1px solid red;
  margin: 0.3rem 0 0.15rem 0;
  text-align: center;
  // button {
  //   background: rgba(41, 126, 253, 1);
  //   box-shadow: 0.01rem 0.02rem 0.03rem rgba(1, 102, 252, 0.61);
  //   // position: absolute;
  //   // bottom: 20px;
  //   // left: 0;
  //   width: 1.2rem;
  //   height: 0.3rem;
  //   border-radius: 0.18rem;
  //   color: white;
  //   font-size: 0.14rem;
  //   margin: 0.25rem 0 0.5rem 1.32rem;
  //   // margin: 0 auto;
  // }
}
</style>