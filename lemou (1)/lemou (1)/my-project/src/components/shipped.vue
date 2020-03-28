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
            @input="SERano()"
            placeholder="请输入订单号查询"
            v-model="sms"
            @focus="changeCountt()"
            @keyup.enter="SERano()"
            type="text"
          />
          <van-switch
            v-if="Icon"
            :value="checked"
            active-color="#07c160"
            inactive-color="#f44"
            size="18px"
            @input="onInput"
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
              <li class="Li7">
                <van-button :type="item.Backcol" @click="replacement(item,item.id)">确定收货</van-button>
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
  name: "shipped",
  data() {
    return {
      sms: "",
      checked: true,
      loading: false,
      finished: false,
      isLoading: false,
      pageSize: 10,
      datak: [],
      Icon: false,
      total: "",
      timerOrder1: ""
    };
  },

  created() {
    console.log(this.Allquan);
    this.list();
    this.Cresta();
  },
  watch: {
    Allquan: function(val) {
      console.log("第二个val:" + val);
      if (val == 1) {
        this.pageSize = 10;
        this.list();
        window.timerOrder1 = setInterval(() => {
          this.pageSize = 10;
          this.list();
        }, 30000);
      } else {
        if (window.timerOrder1) {
          clearInterval(window.timerOrder1); //关闭
        }
      }
    }
  },
  mounted() {
    window.timerOrder1 = setInterval(() => {
      this.pageSize = 10;
      this.list();
    }, 30000);
  },
  beforeDestroy() {
    if (window.timerOrder1) {
      clearInterval(window.timerOrder1); //关闭
    }
  },
  methods: {
    Cresta() {
      this.Http.post(
        "/api/cjtpay-commercial-web/commercial/queryOrderListStatus",
        {}
      ).then(data => {
        if (data.httpCode == 0) {
          console.log(data.data);
          if (data.data == 0) {
            this.checked = false;
          } else {
            this.checked = true;
          }
        }
      });
    },
    onInput(checked) {
      if (this.checked == false) {
        this.$dialog
          .confirm({
            title: "是否隐藏超出15分钟订单"
          })
          .then(() => {
            this.Http.post(
              "/api/cjtpay-commercial-web/commercial/updateOrderListStatus",
              "" + 1,
              {
                headers: {
                  "Content-Type": "application/json;charset=UTF-8"
                }
              }
            ).then(data => {
              if (data.httpCode == 0) {
                // 数据的返回接受
                console.log(data);
                this.Cresta();
                this.list();
              } else {
                // 数据错误提示
              }
            });
          });
      } else {
        this.$dialog
          .confirm({
            title: "是否显示超出15分钟订单"
          })
          .then(() => {
            this.Http.post(
              "/api/cjtpay-commercial-web/commercial/updateOrderListStatus",
              "" + 0,
              {
                headers: {
                  "Content-Type": "application/json;charset=UTF-8"
                }
              }
            ).then(data => {
              if (data.httpCode == 0) {
                // 数据的返回接受
                console.log(data);
                this.Cresta();
                this.list();
              } else {
                // 数据错误提示
              }
            });
          });
      }
    },
    SERano() {
      this.Http.post("/api/cjtpay-commercial-web/payment/order/list", {
        orderNo: this.sms,
        status: 0
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
            } else if (item.code == 6) {
              item.code = "聚合码";
            } else if (item.code == 7) {
              item.code = "支付宝固码";
            }
            if (item.status == 0) {
              item.imagre = require("../assets/image/yifahguo.png");
            } else if (item.status == 2) {
              item.imagre = require("../assets/image/yifahguo.png");
            }
            console.log(item.status);
          });
          this.datak.forEach((item, index) => {
            let dateTmp = item.createTime.replace(/-/g, "/");
            let timestamp = Date.parse(dateTmp);
            let getDate = new Date(item.createTime);
            let delDate = getDate.getTime();
            let dateLate = delDate + 10 * 60 * 1000;
            this.timestampToTime(dateLate);
            let dk = new Date();
            let dangqian = Date.parse(dk);
            if (dateLate < dangqian) {
              if (item.status == "0") {
                item.Backcol = "danger";
                item.COlr = "danger";
                item.imagre = require("../assets/image/已发货。.png");
              }
            }
          });
        } else {
          this.$toast(data.msg);
          // 数据错误提示
        }
      });
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
    openFullScreen2() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        mask: true,
        message: "加载中..."
      });
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.finished = false;
        this.pageSize = 10;
        this.list();
        this.Cresta();
        this.sms = "";
        this.Icon = false;
      }, 500);
    },
    onCopy(e) {
      console.log(e);
      this.$toast("复制成功");
    },
    // 复制失败
    onError(e) {
      this.$toast("复制失败");
    },
    replacement(row, id) {
      console.log(row, id);
      this.$dialog
        .confirm({
          title: "核实收款信息，是否确定收货?",
          confirmButtonText: "审核",
          message: `<p style="color:green;font-size:0.18rem">订单号：${
            row.orderNo
          }</p><p style="color:green;margin-top:0.07rem;font-size:0.18rem">订单金额：<span style="color:red">${row.orderAmt /
            100}</span></p><p style="color:green;margin-top:0.07rem;font-size:0.18rem">备注：${
            row.accountName
          }</p><p style="color:green;margin-top:0.07rem;font-size:0.18rem">时间：${
            row.createTime
          }</p><p style="color:red;margin-top:0.1rem;font-size:0.22rem">请核实准确！！！</p>`
        })
        .then(() => {
          setTimeout(() => {
            this.replacementOrder(id);
          }, 200);
        });
    },
    replacementOrder(id) {
      this.$dialog
        .confirm({
          title: "是否确定收货?",
          message: `<p style="color:red">重要提示：确认收货后<span style="font-size:0.22rem">不可撤回</span></p><p style="color:red;margin-top:0.07rem">丢失金额不补，<span style="font-size:0.22rem">请慎重操作！</span></p>`
        })
        .then(() => {
          this.openFullScreen2();
          this.Http.post(
            "/api/cjtpay-commercial-web/payment/order/replacementOrder",
            "" + id,
            {
              headers: {
                "Content-Type": "application/json;charset=UTF-8"
              }
            }
          ).then(data => {
            if (data.httpCode == 0) {
              // 数据的返回接受
              console.log(data);
              this.list();
              this.$toast.clear();
            } else {
              // 数据错误提示
              this.$toast.clear();
              this.$toast(data.msg);
              // 数据错误提示
            }
          });
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
    list() {
      this.Http.post("/api/cjtpay-commercial-web/payment/order/list", {
        pageNum: 1,
        pageSize: this.pageSize,
        status: 0
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
            console.log(item.status);
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
            } else if (item.code == 6) {
              item.code = "聚合码";
            } else if (item.code == 7) {
              item.code = "支付宝固码";
            }
            if (item.status == 0) {
              item.imagre = require("../assets/image/yifahguo.png");
            } else if (item.status == 2) {
              item.imagre = require("../assets/image/yifahguo.png");
            }
          });
          this.datak.forEach((item, index) => {
            let dateTmp = item.createTime.replace(/-/g, "/");
            let timestamp = Date.parse(dateTmp);
            let getDate = new Date(item.createTime);
            let delDate = getDate.getTime();
            let dateLate = delDate + 10 * 60 * 1000;
            this.timestampToTime(dateLate);
            let dk = new Date();
            let dangqian = Date.parse(dk);
            console.log(item.status);
            if (dateLate < dangqian) {
              if (item.status == "0") {
                item.Backcol = "danger";
                item.COlr = "danger";
                item.imagre = require("../assets/image/已发货。.png");
              }
            }
          });
          this.$toast.clear();
        } else {
          // 数据错误提示
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
  .van-switch {
    position: absolute;
    right: 0.9rem;
    margin-top: 0.07rem;
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
      .Li7 {
        width: 100%;
        text-align: center;
        margin: 0.15rem 0 0 0;
        button {
          width: 3rem;
        }
      }
    }
  }
}
</style>

