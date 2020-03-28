<template>
  <div class="wrap">
    <header>
      <img @click="goback()" src="../assets/img/fanhui-2.png" alt />
      <span>个人信息</span>
      <p @click="edit()">{{bianji}}</p>
    </header>
    <div class="ccc">
      <div class="txiang">
        <span>头像：</span>
        <span class="tupian">
          <img :src="img1||img2" alt />
          <van-uploader :after-read="afterRead" />
        </span>
      </div>
      <div class="cont">
        <div class="name">
          <span>姓名：</span>
          <input
            placeholder="请输入姓名！"
            @blur.prevent="changeCount(yonghu)"
            @focus="focus($event,yonghu)"
            type="text"
            v-model="yonghu"
          />
        </div>
        <div class="zhanghao">
          <span>账号：</span>
          <span>{{account}}</span>
        </div>
        <div class="zfbzh">
          <span>支付宝账号：</span>
          <input
            type="text"
            maxlength="11"
            @blur.prevent="changeCountt(alipay)"
            @focus="focuss($event,alipay)"
            placeholder="请输入支付宝账号！"
            v-model="alipay"
          />
        </div>
      </div>
    </div>

    <div class="workL">
      <img src="../assets/image/图层 4 拷贝.png" alt />
      <p>可修改个人信息哦！</p>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  name: "username",
  data() {
    return {
      img2: require("../assets/img/7.png"),
      img1: "",
      bianji: "",
      yonghu: "",
      alipay: "", //支付宝
      // portraitUrl: "", //头像
      userName: "", //名字
      wenjiant: "",
      fileNames: "",
      account: "",
      xing: "",
      fuCode: ""
    };
  },

  created() {
    this.img1 = this.$route.query.imgt;
    this.account = this.$route.query.account1;
    this.yonghu = this.$route.query.yonghuu;
    this.alipay = this.$route.query.zfbaccount1;
    this.bianji = "";
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
    changeCountt(val) {
      if (val != this.fuCode) {
        this.bianji = "完成";
      }
    },
    focuss(event, val) {
      event.currentTarget.select();
      this.fuCode = val;
    },
    changeCount(val) {
      if (val != this.xing) {
        this.bianji = "完成";
        //  this.alipay
      }
    },
    focus(event, val) {
      event.currentTarget.select();
      console.log(val);
      this.xing = val;
      console.log(this.xing);
    },
    afterRead(file) {
      if (file && file.file) {
        let params = new FormData();
        params.append("file", file.file);
        console.log(file);
        if (this.yonghu == "" && this.alipay == "") {
          this.yonghu = this.xing;
          this.alipay = this.fuCode;
          this.bianji = "完成";
        }
        this.axios
          .post("/api/cjtpay-commercial-web/upload/file", params, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(res => {
            this.$toast.clear();
            this.img1 = res.fileNames["0"];
            this.Http.post(
              "/api/cjtpay-commercial-web/commercial/personalDetails/update",
              {
                portraitUrl: this.img1
              }
            ).then(data => {
              if (data.httpCode == 0) {
                this.$toast.clear();
              }
            });
          })
          .catch(err => {
            this.$toast(err);
          });
      } else {
        this.$toast("图片过去失败...");
      }
    },
    goback() {
      this.$router.push({
        name: "Memess",
        query: {
          yonghuu: this.yonghu,
          fileNames: this.img1
        }
      });
    },
    edit() {
      if (this.yonghu == "" || this.yonghu == null) {
        this.$toast("请输入姓名！");
        return;
      }
      if (!/^[\u4e00-\u9fff\w]{2,13}$/.test(this.yonghu) || this.yonghu == "") {
        this.$toast("请输入姓名！");
        return;
      }
      if (!/^1[3456789]\d{9}$/.test(this.alipay) || this.alipay == "") {
        this.$toast("请输入支付宝账号！");
        return;
      }
      this.Http.post(
        "/api/cjtpay-commercial-web/commercial/personalDetails/update",
        {
          alipay: this.alipay,
          userName: this.yonghu
        }
      ).then(data => {
        if (data.httpCode == 0) {
          this.$toast.clear();
          // 数据的返回接受
          this.bianji = "";
          this.$router.push({
            name: "me"
          });
        } else {
          // 数据错误提示
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.van-uploader {
  position: absolute;
  right: 0.3rem;
  top: 0.8rem;
  border-radius: 50%;
  width: 1rem;
  opacity: 0;
  // height: 0.4rem;
  background-color: #fff;
}
.ccc {
  width: 3.75rem;
  position: fixed;
  z-index: 2;
}
.cont {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);
  margin-top: 0.15rem;
}
header {
  z-index: 3;
  p {
    font-size: 0.2rem;
    color: white;
    position: absolute;
    right: 0%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.txiang {
  color: #1e1e1eff;
  font-family: PingFangSC-Regular;
  font-size: 0.17rem;
  margin-top: 0.8rem;
  padding: 0.3rem 0 0.3rem 0.35rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);

  .tupian {
    float: right;
    margin: -0.1rem 0.75rem 0 0;
    width: 0.5rem;
    height: 0.7rem;
    border-radius: 50%;
  }
  img {
    position: absolute;
    border-radius: 50%;
    width: 0.6rem;
    height: 0.6rem;
    margin-top: -0.1rem;
    margin-right: 0.02rem;
  }
}
.name {
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(30, 30, 30, 1);
  padding: 0.15rem 0 0.15rem 0.35rem;
  border-bottom: 0.01rem solid #dad8d8;
  input {
    float: right;
    text-align: center;
    margin-right: 0rem;
  }
}
.zhanghao {
  color: #1e1e1eff;
  font-family: PingFangSC-Regular;
  padding: 0.15rem 0 0.15rem 0.35rem;
  // line-height: 45px;
  border-bottom: 0.01rem solid #dad8d8;
  span:nth-child(2) {
    float: right;
    margin-right: 0.5rem;
  }
}
.zfbzh {
  color: #1e1e1eff;
  font-family: PingFangSC-Regular;
  // font-size: 19px;
  // width: 375px;
  padding: 0.15rem 0 0.15rem 0.35rem;
  // line-height: 45px;
  border-bottom: 0.01rem solid #dad8d8;
  input {
    float: right;
    text-align: center;
  }
}
.tbzh {
  color: #1e1e1eff;
  font-family: PingFangSC-Regular;
  // font-size: 19px;
  // width: 375px;
  padding: 0.15rem 0 0.15rem 0.35rem;
  // line-height: 45px;
  // border-bottom: 0.01rem solid #DAD8D8;
  span:nth-child(2) {
    float: right;
    margin-right: 0.6rem;
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
