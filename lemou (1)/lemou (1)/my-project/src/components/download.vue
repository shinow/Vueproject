<template>
  <div class="yindao">
    <div class="back">
      <img :src="background" alt />
    </div>
    <div id="qrcode"></div>
    <div class="And">
      <!-- http://47.75.1.131/app/messageWatch.apk(周先生) -->
      <!-- http://47.91.210.105/app/messageWatch.apk(新十方) -->
      <!-- http://47.56.80.83/app/messageWatch.apk(祝国情) -->
      <!-- http://47.90.59.167/app/messageWatch.apk(庄周) -->
      <a href="http://47.90.59.167/app/messageWatch.apk">
        <van-button round type="info">Android版本下载</van-button>
      </a>
    </div>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
export default {
  name: "download",
  data() {
    return {
      background: require("../assets/img/yaoqingbei.png")
    };
  },
  mounted() {
    this.qrcode();
  },
  methods: {
    qrcode() {
      let qrcode = new QRCode("qrcode", {
        width: 145,
        height: 145,
        // http://47.75.1.131/app/messageWatch.apk(周先生)
        // http://47.91.210.105/app/messageWatch.apk(新十方)
        // http://47.56.80.83/app/messageWatch.apk(祝国情)
        // http://47.90.59.167/app/messageWatch.apk(庄周)
        text: "http://47.90.59.167/app/messageWatch.apk", // 二维码地址
        colorDark: "#000",
        colorLight: "#fff"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.yindao {
  overflow: hidden;
  .back {
    z-index: 5;
    position: fixed;
    left: 0;
    top: 0;
    img {
      width: 3.75rem;
      height: 100vh;
    }
  }
  .AP {
    z-index: 5555 !important;
    position: fixed;
    left: 1.2rem;
    top: 0.7rem;
    // border: 1px solid red;
    font-size: 0.4rem;
    color: white;
  }
  #qrcode {
    position: fixed;
    left: 30.7%;
    top: 35%;
    z-index: 5555 !important;
    display: inline-block;
    img {
      width: 1.07rem;
      height: 1.04rem;
      background-color: #fff; //设置白色背景色
      padding: 6px; // 利用padding的特性，挤出白边
    }
  }
  .p1 {
    //  border: 1px solid red;
    position: fixed;
    left: 1.3rem;
    top: 3.3rem;
    font-size: 0.25rem;
    z-index: 5555 !important;
    color: white;
  }
  .And {
    position: fixed;
    left: 20%;
    bottom: 28%;
    font-size: 0.25rem;
    z-index: 5555 !important;
    color: white;
  }
}
</style>