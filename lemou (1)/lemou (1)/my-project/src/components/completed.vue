<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="SreachD">
          <input
            placeholder="请输入订单号查询"
            v-model="sms"
            @input="SERano()"
            @focus="changeCountt()"
            @keyup.enter="SERano"
            type="text"
          />
          <img src="../assets/image/图层 7.png" alt @click="SERano()" />
          <van-icon v-if="Icon" @click="focuss" name="cross" />
        </div>
        <div class="wrr">
          <div style class="content" v-for="(item,index) in datak" :key="index">
            <ul>
              <li class="Li1">
                <span>【{{item.code}}】</span>
                <img :src="item.imagre" alt />
              </li>
              <li class="Li2">
                <span>订单号：</span>
                <span>{{item.orderNo}}</span>
                <van-tag
                  :type="item.COlr"
                  size="medium"
                  v-clipboard:copy="item.orderNo"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                >复制</van-tag>
              </li>
              <li class="Li3">
                <div class="Spam1">备注：</div>
                <div class="Beiz">
                  <span>{{item.accountName}}</span>
                </div>
                <van-tag
                  :type="item.COlr"
                  size="medium"
                  v-clipboard:copy="item.accountName"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                >复制</van-tag>
              </li>
              <li class="Li4">
                <span>{{item.dityName}}</span>
                <span>￥{{(item.orderAmt)/100}}</span>
              </li>
              <li class="Li5">
                <span>发货：</span>
                <span>{{item.createTime}}</span>
              </li>
              <li class="Li6">
                <span>好评：</span>
                <span>{{item.updateTime}}</span>
              </li>
            </ul>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <!------------------------>
  </div>
</template>
<script>
export default {
  props: {
    Allquan: Number
  },
  name: "completed",
  data() {
    return {
      sms: "",
      Icon: false,
      total: "",
      loading: false,
      finished: false,
      isLoading: false,
      pageSize: 10,
      datak: []
    };
  },
  created() {
    this.list();
  },
  watch: {
    Allquan: function(val) {
      if (val == 2) {
        this.pageSize = 10;
        this.list();
        if (window.timerOrder1) {
          clearInterval(window.timerOrder1); //关闭
        }
        if (window.timerOrder) {
          clearInterval(window.timerOrder); //关闭
        }
      }
    }
  },
  methods: {
    SERano() {
      this.Http.post("/api/cjtpay-commercial-web/payment/order/list", {
        orderNo: this.sms,
        status: 1
      }).then(data => {
        if (data.httpCode == 0) {
          // 数据的返回接受
          console.log(data);
          this.datak = data.data;
          this.datak.forEach((item, index) => {
            item.Backcol = "info";
            item.COlr = "primary";
            if (item.code == 0) {
              item.code = "支付宝";
            } else if (item.code == 1) {
              item.code = "微信";
            } else if (item.code == 2) {
              item.code = "云闪付";
            } else if (item.code == 3) {
              item.code = "银行卡";
            } else if (item.code == 4) {
              item.code = "拼多多支付宝";
            } else if (item.code == 5) {
              item.code = "拼多多微信";
            }else if (item.code == 6) {
              item.code = "聚合码";
            } else if (item.code == 7) {
              item.code = "支付宝固码";
            }
            if (item.status == 1) {
              item.imagre = require("../assets/image/wancheng.png");
            } else if (item.status == 3) {
              item.imagre = require("../assets/image/wancheng.png");
            }
          });
        } else {
          this.$toast(data.msg);
          // 数据错误提示
        }
      });
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.sms = "";
        this.Icon = false;
        this.isLoading = false;
        this.finished = false;
        this.pageSize = 10;
        this.list();
      }, 500);
    },
    // 复制成功
    onCopy(e) {
      this.$toast("复制成功");
    },
    // 复制失败
    onError(e) {
      this.$toast("复制失败");
    },
    openFullScreen2() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        mask: true,
        message: "加载中..."
      });
    },
    onLoad() {
      // 异步更新数据
      console.log(this.finished);
      this.finished = false;
      if (this.datak == undefined || this.datak == null) {
        this.loading = false;
        this.finished = true;
        return;
      } else {
        if (this.datak.length >= this.total) {
          this.loading = false;
          this.finished = true;
          this.sms = "";
          this.Icon = false;
          return;
        }
      }
      setTimeout(() => {
        this.sms = "";
        this.Icon = false;
        this.list();
      }, 500);
    },
    changeCountt() {
      this.Icon = true;
    },
    focuss() {
      this.Icon = false;
      this.sms = "";
      this.pageSize = 10;
      this.list();
    },
    list() {
      this.Http.post("/api/cjtpay-commercial-web/payment/order/list", {
        pageNum: 1,
        pageSize: this.pageSize,
        status: 1
      }).then(data => {
        if (data.httpCode == 0) {
          this.pageSize = this.pageSize + 10;
          this.loading = false;
          // 数据的返回接受
          console.log(data);
          this.datak = data.data;
          this.total = data.total;
          console.log(this.datak);
          this.datak.forEach((item, index) => {
            item.Backcol = "info";
            item.COlr = "primary";
            if (item.code == 0) {
              item.code = "支付宝";
            } else if (item.code == 1) {
              item.code = "微信";
            } else if (item.code == 2) {
              item.code = "云闪付";
            } else if (item.code == 3) {
              item.code = "银行卡";
            } else if (item.code == 4) {
              item.code = "拼多多支付宝";
            } else if (item.code == 5) {
              item.code = "拼多多微信";
            }else if (item.code == 6) {
              item.code = "聚合码";
            } else if (item.code == 7) {
              item.code = "支付宝固码";
            }
            if (item.status == 1) {
              item.imagre = require("../assets/image/wancheng.png");
            } else if (item.status == 3) {
              item.imagre = require("../assets/image/wancheng.png");
            }
          });
          this.$toast.clear();
        } else {
          // 数据错误提示
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
[v-cloak] {
  display: none !important;
}
.SreachD {
  position: relative;
  width: 100%;
  text-align: center;
  margin-top: 0.1rem;
  input {
    width: 3.55rem;
    height: 0.35rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 6px;
    padding-left: 0.1rem;
  }
  img {
    position: absolute;
    right: 0.25rem;
    width: 0.24rem;
    height: 0.24rem;
    margin-top: 0.05rem;
  }
  .van-icon {
    position: absolute;
    right: 0.6rem;
    margin-top: 0.1rem;
  }
}
.wrr {
  position: relative;
  top: 0.1rem;
  padding-bottom: 1rem;
  .content {
    margin: 0 auto;
    margin-bottom: 0.15rem;
    overflow: hidden;
    width: 3.55rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0.04rem 0.23rem 0 rgba(41, 41, 41, 0.13);
    border-radius: 0.08rem;
    padding-bottom: 0.2rem;
    ul {
      .Li1 {
        overflow: hidden;
        span:nth-child(1) {
          float: left;
          margin: 0.2rem 0 0 0.15rem;
          font-size: 0.18rem;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(36, 36, 36, 1);
          opacity: 0.9;
        }
        img {
          width: 0.7rem;
          height: 0.7rem;
          float: right;
        }
      }
      .Li2 {
        margin: -0.15rem 0 0 0.15rem;
        span:nth-child(1) {
          font-size: 0.16rem;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(48, 48, 48, 1);
        }
        span:nth-child(2) {
          font-size: 0.16rem;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(48, 48, 48, 1);
        }
        span:nth-child(3) {
          font-size: 0.16rem;
          font-family: PingFang SC;
          font-weight: 400;
          margin-left: 0.1rem;
        }
      }
      .Li3 {
        overflow: hidden;
        margin: 0.1rem 0 0 0.15rem;

        // width: 2.4rem;
        color: red;
        height: 0.27rem;
        line-height: 0.27rem;
        width: 100%;
        .Spam1 {
          font-size: 0.18rem;
          font-family: PingFang SC;
          font-weight: 400;
          color: red;
          float: left;
        }
        .Beiz {
          float: left;
          font-size: 0.18rem;
          font-family: PingFang SC;
          font-weight: 400;
          color: red;
          width: 1.8rem;
          overflow: hidden; /*设置超出的部分进行影藏*/
          text-overflow: ellipsis; /*设置超出部分使用省略号*/
          white-space: nowrap;
        }
        span:nth-child(3) {
          font-size: 0.16rem;
          font-family: PingFang SC;
          font-weight: 400;
          margin-left: 0.1rem;
        }
      }
      .Li4 {
        overflow: hidden;
        margin: 0.1rem 0 0 0.15rem;
        font-size: 0.18rem;
        font-family: Myriad Pro;
        font-weight: 400;
        color: rgba(48, 48, 48, 1);
        span:nth-child(2) {
          font-size: 0.22rem;
          font-family: PingFang SC;
          font-weight: 400;
          margin-left: 0.15rem;
          color: red;
          opacity: 0.8;
        }
      }
      .Li5 {
        margin: 0.12rem 0 0 0.15rem;
        span:nth-child(1) {
          font-size: 0.18rem;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(36, 36, 36, 1);
        }
        span:nth-child(2) {
          font-size: 0.18rem;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(48, 48, 48, 1);
          margin-left: 0.15rem;
        }
      }
      .Li6 {
        margin: 0.12rem 0 0 0.15rem;
        span:nth-child(1) {
          font-size: 0.18rem;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(36, 36, 36, 1);
        }
        span:nth-child(2) {
          font-size: 0.18rem;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(48, 48, 48, 1);
          margin-left: 0.15rem;
        }
      }
    }
  }
}
</style>

