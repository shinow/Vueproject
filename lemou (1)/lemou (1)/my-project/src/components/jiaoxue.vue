<template>
  <div style="height:100vh;overflow:hidden">
    <header>
      <img @click="goback()" src="../assets/img/fanhui-2.png" alt />
      <span>设置教程</span>
    </header>
    <div class="content">
      <router-link style="color:black" to="./quanxian">
        <div class="shezhi">
          <img src="../assets/img/shezhizhi.png" alt />
          <span>手机权限设置</span>
          <img src="../assets/img/箭头 拷贝 2.png" alt />
        </div>
      </router-link>
      <router-link style="color:black" to="./wangzhuan">
        <div class="shezhi">
          <img src="../assets/img/kkuliu.png" alt />
          <span>网赚流程攻略</span>
          <img src="../assets/img/箭头 拷贝 2.png" alt />
        </div>
      </router-link>
      <div class="shezhi1" @click="tuihuo()">
        <img src="../assets/img/wenwen.png" alt />
        <span>退货操作流程</span>
        <img src="../assets/img/箭头 拷贝 2.png" alt />
      </div>
    </div>
    <div v-if="zhegai" @click="kefu()" class="zhegai">
      <div class="con">
        <p>退款条件:</p>
        <p>1.下架交易中商品;</p>
        <p>2.已付款货物总价值不超过100元;</p>
        <p>3.平台将以进货价格退还;</p>
        <p> 满足以上条件请加客服QQ:<span>{{QQ}}</span></p>
        <button  v-clipboard:copy="QQ"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError">复制QQ</button>
      </div>
    </div>
      <div class="workL">
      <img src="../assets/image/图层 4 拷贝.png" alt />
      <p>可查看教程哦！</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "jiaoxue",
  data() {
    return {
      zhegai: false,
      QQ:"565656565"
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    kefu() {
      this.zhegai = false;
    },
    tuihuo() {
      this.zhegai = true;
    },
    onCopy(e){
      console.log(e)
     this.$toast.success('复制成功');
    },
    onError(e){
      console.log(e)
       this.$toast.success('复制失败');
    }
  }
};
</script>
<style lang="scss"scoped>
.zhegai {
  z-index: 5;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  .con {
    font-size: 0.17rem;
    border-radius: 0.08rem;
    width: 3rem;
    // height: 1.4rem;
    background-color: white;
    position: absolute;
    left: 0.37rem;
    top: 2rem;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: black;
    font-size: 0.14rem;
    p:nth-child(1) {
      margin: 0.2rem 0 0 0.18rem;
    }
    p:nth-child(2) {
      margin: 0.1rem 0 0 0.28rem;
    }
    p:nth-child(3) {
      margin: 0.1rem 0 0 0.28rem;
    }
    p:nth-child(4) {
      margin: 0.1rem 0 0 0.28rem;
    }
    p:nth-child(5) {
      margin: 0.1rem 0 0 0.18rem;
    }
    button {
      margin: 0.27rem 0 0.22rem 1.1rem;
      height: 0.4rem;
      width: 0.8rem;
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
.content {

  width: 3.2rem;
  height: 1.5rem;
  margin: 0.8rem 0 0 0.18rem;
  background: rgba(255, 254, 254, 1);
  box-shadow: 0px 3px 19px 0px rgba(2, 2, 2, 0.13);
  border-radius: 0.12rem;
  padding: 0.1rem 0 0 0.15rem;
  font-size: 0.16rem;
  //  font-family:PingFang-SC-Regular;
  // font-weight:bold;
  color: rgba(25, 25, 25, 1);
  .shezhi {
    width: 92%;
    float: left;
    padding: 0.12rem 0;
    border-bottom: 0.01rem solid rgba(2, 2, 2, 0.13);
    img:nth-child(1) {
      float: left;
      margin-left: 0.08rem;
      margin-top: 0.02rem;
      width: 0.2rem;
      height: 0.2rem;
      // padding:4px 0 0 10px ;
    }
    span {
      font-family: PingFang-SC-Regular;
      font-weight: 500;
      color: rgba(25, 25, 25, 1);
      float: left;
      margin: 0.05rem 0 0 0.2rem;
    }
    img:nth-child(3) {
      float: right;
      padding: 0.05rem 0.2rem 0 0;
    }
  }
  
  .shezhi1 {
    width: 92%;
    float: left;
    padding: 0.12rem 0;
    img:nth-child(1) {
      float: left;
      margin-left: 0.08rem;
      margin-top: 0.02rem;
      width: 0.2rem;
      height: 0.2rem;
    }
    span {
      float: left;
      margin: 0.05rem 0 0 0.2rem;
      font-family: PingFang-SC-Regular;
      font-weight: 500;
      color: rgba(25, 25, 25, 1);
    }
    img:nth-child(3) {
      float: right;
      padding: 0.05rem 0.2rem 0 0;
    }
  }
}
</style>