<template>
  <div class="Paymentswitch">
    <v-touch v-on:swiperight="goback">
      <header>
        <img @click="goback()" src="../../assets/img/fanhu.png" alt />
        <span>收款开关</span>
      </header>
      <div class="content"></div>
      <div class="cont">
        <ul v-for="(item,index) in datas " :key="index">
          <li>
            <img :src="icons[item.name]" alt />
            <span>{{item.name}}收款</span>
            <van-switch
              style="float:right;margin-right:0.07rem"
              v-model="item.status == 0 ? true : false"
              @change="changeSwith(item.id,item.status)"
              active-color="#07c160"
              inactive-color="#f44"
              size="14px"
            />
          </li>
        </ul>
      </div>
    </v-touch>
  </div>
</template>
<script>
export default {
  name: "Paymentswitch",
  data() {
    return {
      icons: {
        银行卡: require("../../assets/img/银行卡.png"),
        云闪付: require("../../assets/img/云闪付.png"),
        微信: require("../../assets/img/微信.png"),
        支付宝: require("../../assets/img/支付宝.png"),
        拼多多支付宝: require("../../assets/img/拼多多支付宝.jpg"),
        拼多多微信: require("../../assets/img/拼多多微信.jpg"),
        聚合码: require("../../assets/img/聚合码.jpg"),
        支付宝固码: require("../../assets/img/支付宝固码.jpg")
      },
      datas: [
        {
          createBy: "1", //创建人ID
          createTime: "2019-08-13 16:05:34", //创建时间
          enable: "1", //是否可用
          id: "1161187022416031746", //id
          name: "银行卡", //名称
          remark: "", //备注
          status: "1", //账户状态0 开启 1 关闭
          type: "3", //收款类型  0支付宝 1微信 2云闪付 3银行卡
          updateBy: "1", //修改人ID
          updateTime: "2019-08-13 16:05:34", //修改时间
          userId: "1161187020704755714" //用户ID
        },
        {
          createBy: "1",
          createTime: "2019-08-13 16:05:34",
          enable: "1",
          id: "1161187022407643137",
          name: "云闪付",
          remark: "",
          status: "1",
          type: "2",
          updateBy: "1",
          updateTime: "2019-08-13 16:05:34",
          userId: "1161187020704755714"
        },
        {
          createBy: "1",
          createTime: "2019-08-13 16:05:34",
          enable: "1",
          id: "1161187022395060226",
          name: "微信",
          remark: "",
          status: "1",
          type: "1",
          updateBy: "1",
          updateTime: "2019-08-13 16:05:34",
          userId: "1161187020704755714"
        },
        {
          createBy: "1",
          createTime: "2019-08-13 16:05:34",
          enable: "1",
          id: "1161187022336339969",
          name: "支付宝",
          remark: "",
          status: "1",
          type: "0",
          updateBy: "1",
          updateTime: "2019-08-13 16:05:34",
          userId: "1161187020704755714"
        }
      ]
    };
  },
  created() {
    // this.switchh();
    // this.openFullScreen2();
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
<style lang="less" scoped>
.Paymentswitch {
  width: 3.75rem;
  height: 100vh;
  background: @bc;
}
.content {
  padding-top: 0.7rem;
}
.cont {
  width: 3.6rem;
  background: @contcolor;
  border-radius: 4px;
  font-size: 14px;
  margin: 0 auto;
  font-family: HiraginoSansGB-W3, HiraginoSansGB;
  font-weight: normal;
  color: rgba(255, 255, 255, 1) !important;
  padding-bottom: 0.25rem;
  ul {
    z-index: 2;
    color: white;
    li {
      width: 90%;
      margin-left: 0.2rem;
      height: 0.4rem;
      border-bottom: 0.01rem solid #232b5a;
      img {
        width: 0.25rem;
        height: 0.25rem;
        float: left;
        margin: 0.04rem 0 0 0.01rem;
      }
      span {
        float: left;
        margin: 0.11rem 0 0 0.2rem;
      }
      .van-switch {
        font-size: 0.2rem;
        float: right;
        margin: 0.1rem 0.13rem 0 0;
      }
    }
    li:nth-child(1) {
      padding-top: 0.1rem;
    }
  }
}
</style>
