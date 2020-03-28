<template>
  <div>
    <header>
      <img @click="goback()" src="../assets/img/fanhui-2.png" alt />
      <span>信用体系</span>
    </header>
    <div class="content">
      <div class="www">
        <div class="zong">
          <p>{{(datak.totalMoney)/100 ? (datak.totalMoney)/100 :huo}}</p>
          <p>返利总金额</p>
        </div>
        <div class="fen"></div>
        <div class="renshu">
          <p>{{datak.number?datak.number:huo}}</p>
          <p>下级人数</p>
        </div>
      </div>

      <button>
        <p>注意：每笔收益金将直接转换成</p>
        <p>商品价值加到当前交易商品中！</p>
      </button>
    </div>
    <div class="yaoqing">
      <span>我的下级</span>
      <span></span>
      <span></span>
      <span></span>
      <span @click="yaoqing()">邀请好友</span>
    </div>
    <div class="cont">
      <div class="title">
        <div>头像</div>
        <div>昵称</div>
        <div>收益（元）</div>
      </div>
      <div class="ren" style="margin-bottom:0.15rem" v-for="(item,index) in xiaji" :key="index">
        <div class="ttou">
          <img :src="img2||item.portraitUrl" />
        </div>
        <div style="margin-top:0.05rem">{{item.userName?item.userName:huo}}</div>
        <div style="margin-top:0.05rem">{{(item.money)/100||huo}}</div>
      </div>
      <div v-if="wei" class="wei">
        <p>您还没有下级用户哦！</p>
        <p style="margin:0.1rem 0 0 0.1rem">点击邀请好友吧！</p>
      </div>
    </div>

    <div v-show="yaoqinghy" class="zhegai">
      <img src="../assets/img/邀请好友.png" alt />
      <img @click="guanbi()" src="../assets/img/关闭.png" alt />
      <p style="margin-left:0.3rem">邀请码：{{yqm}}</p>
      <button
        v-clipboard:copy="this.yqm"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
      >复制邀请码</button>
    </div>
    <div class="a" v-show="yaoqinghy">
      <p id="qrcode"></p>
    </div>
    <!-- <span id="qrcode">二维码位置</span> -->
    <div class="workL">
      <img src="../assets/image/图层 4 拷贝.png" alt />
    </div>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
export default {
  name: "xinyong",
  inject: ["reload"],
  data() {
    return {
      img2: require("../assets/img/7.png"),
      yqm: "",
      wei: true,
      huo: "0",
      yaoqinghy: false,
      datak: "",
      xiaji: []
    };
  },
  created() {
    this.yqm = this.$route.query.yqma;
    this.list();
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

    qrcode() {
      document.getElementById("qrcode").innerHTML = "";
      let qrcode = new QRCode("qrcode", {
        width: 100,
        height: 100, // 高度
        // http://47.75.1.131/dist/#/register?code=(周先生)
        // http://47.91.210.105/dist/#/register?code=(十方)
        // http://47.56.80.83/dist/#/register?code=(祝国情)
        // http://47.90.59.167/dist/#/register?code=(庄周)
        text: "http://47.90.59.167/dist/#/register?code=" + this.yqm
      });
    },
    list() {
      this.Http.post("/api/cjtpay-commercial-web/commission/credit", {}).then(
        data => {
          if (data.httpCode == 0) {
            this.$toast.clear();
            console.log(data);
            if (data.data.rebates != "") {
              this.datak = data.data;
              this.xiaji = data.data.rebates;
              if (this.xiaji != "") {
                this.wei = false;
              }
            }
          }
        }
      );
    },
    onCopy(e) {
      this.$toast("复制成功");
    },
    onError(e) {
      this.$toast("复制失败");
    },
    goback() {
      this.$router.go(-1);
    },
    yaoqing() {
      this.qrcode();
      this.yaoqinghy = true;
    },
    guanbi() {
      this.yaoqinghy = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.a {
  z-index: 5;
  width: 1.07rem;
  height: 1.04rem;
  position: fixed;
  left: 1.4rem;
  bottom: 2.72rem;
}

#qrcode {
  z-index: 5;
}
.cont {
  width: 3.25rem;
  margin: 0.3rem 0 0 0.25rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 5px 29px 0px rgba(41, 41, 41, 0.09);
  border-radius: 0.09rem;
  position: relative;
  z-index: 1;
  padding-bottom: 0.2rem;
  .title {
    padding: 0.15rem 0 0.1rem 0;
    font-size: 0.14rem;
    div {
      text-align: center;
      width: 32%;
      float: left;
      text-overflow: ellipsis; /*让截断的文字显示为点点。还有一个值是clip意截断不显示点点*/
      white-space: nowrap; /*让文字不换行*/
      overflow: hidden; /*超出要隐藏*/
    }
  }
  .ren {
    padding-bottom: 0.2rem;
    margin: 0.3rem 0 0.1rem 0;
    font-size: 0.14rem;
    overflow: hidden;
    div {
      text-align: center;
      width: 32%;
      float: left;
      text-overflow: ellipsis; /*让截断的文字显示为点点。还有一个值是clip意截断不显示点点*/
      white-space: nowrap; /*让文字不换行*/
      overflow: hidden; /*超出要隐藏*/
      img {
        width: 0.24rem;
        height: 0.24rem;
        border-radius: 50%;
      }
    }
  }
}
.wei {
  margin: 0.4rem 0 0 1rem;
}
.zhegai {
  z-index: 5;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  img:nth-child(1) {
    width: 2.67rem;
    height: 3.8rem;
    position: absolute;
    left: 0.55rem;
    top: 1.2rem;
  }
  img:nth-child(2) {
    position: absolute;
    left: 1.75rem;
    top: 5.18rem;
  }
  #qrcode {
    z-index: 5;
    width: 1rem;
    height: 1rem;
    position: absolute;
    left: 1.45rem;
    top: 2.2rem;
  }
  p {
    font-size: 0.17rem;
    position: absolute;
    left: 0.9rem;
    top: 3.95rem;
  }
  button {
    width: 2.12rem;
    height: 0.35rem;
    background-color: rgba(252, 3, 3, 1);
    border-radius: 0.15rem;
    color: white;
    font-size: 0.18rem;
    position: absolute;
    left: 0.85rem;
    top: 4.5rem;
  }
}
.content {
  padding-top: 0.95rem;
  .zong,
  .renshu {
    width: 45%;
    float: left;
  }
  .zong {
    p:nth-child(1) {
      text-align: center;
      margin: 0 0 0.12rem 0.55rem;
      font-size: 0.3rem;
      // color: #ff8246;
      font-family: PingFangSC-Regular;
      font-weight: bold;
      color: rgba(252, 3, 3, 1);
      width: 50%;
      // border: 1px solid red;
    }
    p:nth-child(2) {
      margin: 0 0 0.12rem 0.62rem;
      font-size: 0.15rem;
    }
  }
  .renshu {
    p:nth-child(1) {
      margin: 0 0 0.12rem 0.85rem;
      font-size: 0.3rem;
      font-family: PingFangSC-Regular;
      font-weight: bold;
      color: rgba(252, 3, 3, 1);
      // border: 1px solid red;
      width: 34%;
      text-align: center;
    }
    p:nth-child(2) {
      margin: 0 0 0.12rem 0.82rem;
      font-size: 0.15rem;
    }
  }
  button {
    width: 2.2rem;
    background: white;
    border: 0.01rem solid rgba(255, 130, 70, 1);
    border-radius: 0.04rem;
    color: rgba(255, 130, 70, 1);
    font-size: 0.1rem;
    margin: 0.2rem 0 0 0.8rem;
    p:nth-child(1) {
      margin-top: 0.08rem;
    }
    p:nth-child(2) {
      margin: 0.08rem 0;
    }
  }
  .fen {
    width: 0.02rem;
    height: 0.35rem;
    background: rgba(66, 124, 245, 1);
    // box-shadow:0px 0.02rem 0.03rem 0px rgba(252,82,1,0.6);
    border-radius: 0.05rem;
    position: absolute;
    left: 1.89rem;
    top: 1.05rem;
    border-radius: 0.03rem;
  }
}
.yaoqing {
  z-index: 2;
  position: relative;
  font-size: 0.15rem;
  margin: 0.32rem 0 0 0.27rem;
  span:nth-child(1) {
    color: rgba(66, 124, 245, 1);
    font-size: 0.22rem;
    font-weight: 600;
  }
  span:nth-child(5) {
    padding: 0.06rem 0.1rem;
    background: rgba(66, 124, 245, 1);
    box-shadow: 0px 0.04rem 0.09rem 0.01rem rgba(1, 82, 252, 0.34);
    border-radius: 0.06rem;
    color: white;
    float: right;
    margin-right: 0.4rem;
    margin-top: -0.03rem;
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
