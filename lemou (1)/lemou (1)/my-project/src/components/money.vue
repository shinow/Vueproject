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
        <div class="wrr">
          <div style class="content" v-for="(item,index) in datak" :key="index">
            <ul>
              <li>
                <span>{{item.commodityName}}({{item.quota}})</span>
                <span>￥{{(item.price)/100}}</span>
              </li>
              <li>
                <span>
                  <van-count-down
                    @finish="finish"
                    v-if="item.jiaji"
                    class="a1"
                    :time="item.CountDown"
                    format="mm:ss "
                  />
                </span>
                <span>x {{item.num}}组</span>
              </li>
              <li>
                <span>支付金额：</span>
                <span>￥{{(item.amount)/100}}</span>
              </li>
              <li>
                <span>订单号：</span>

                <span>{{item.orderNo}}</span>
                <van-tag
                  type="danger"
                  size="medium"
                  v-clipboard:copy="item.orderNo"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                >复制</van-tag>
              </li>
              <li>
                <van-button
                  size="small"
                  @click="service(item.quxiao,item.id)"
                  round
                  type="warning"
                >{{item.quxiao}}</van-button>
                <van-button size="small" @click="paymentxx(item.id)" round type="info">付款信息</van-button>
              </li>
            </ul>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  props: {
    Allquan: Number
  },
  name: "money",
  data() {
    return {
      isLoading: false,
      datak: [],
      total: "",
      loading: false,
      finished: false,
      pageSize: 10
    };
  },
  created() {
    this.list();
  },
  watch: {
    Allquan: function(val) {
      if (val == 0) {
        this.pageSize = 10;
        this.list();
      } else {
        return;
      }
    }
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.finished = false;
        this.pageSize = 10;
        this.list();
      }, 500);
    },
    onLoad() {
      // 异步更新数据
      console.log(this.finished);
      this.finished = false;
      if (this.datak== undefined || this.datak== null) {
        // this.$toast("快去下单吧！");
         this.loading = false;
          this.finished = true;
        return
      } else {
        if (this.datak.length >= this.total) {
          this.loading = false;
          this.finished = true;
          return;
        }
      }
      setTimeout(() => {
        this.list();
      }, 500);
    },
    // 复制成功
    onCopy(e) {
      console.log(e);
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
    list() {
      this.openFullScreen2();
      this.Http.post("/api/cjtpay-commercial-web/commodity/order/list", {
        pageNum: 1,
        pageSize: this.pageSize,
        status: 0
      }).then(data => {
        if (data.httpCode == 0) {
          this.pageSize = this.pageSize + 10;
          // 数据的返回接受
          console.log(data.data);
          this.loading = false;
          if (data.data == undefined) {
            this.$toast("快去下单吧！");
          }
          this.datak = data.data;
          this.total = data.total;
          console.log(this.datak);
          if (this.datak.length != 0) {
            this.datak.forEach((item, index) => {
              this.$set(this.datak[index], "jiaji", true);
              item.jiaji = true;
              item.ji = true;
              item.guanbi = false;
              item.quxiao = "取消订单";
              let dateTmp = item.createTime.replace(/-/g, "/");
              let timestamp = Date.parse(dateTmp);
              // console.log(dateTmp);
              let getDate = new Date(item.createTime);
              let delDate = getDate.getTime();
              let dateLate = delDate + 20 * 60 * 1000;
              this.timestampToTime(dateLate);
              let dk = new Date();
              let dangqian = Date.parse(dk);
              this.$set(this.datak[index], "CountDown", dateLate - dangqian);
            });
            this.$toast.clear();
          } else {
            this.$toast("快去下单吧！");
          }

          //
        } else {
          // 数据错误提示
          this.$toast(data.msg);
          if (data.msg == "登录超时") {
            localStorage.clear();
            this.$toast.clear();
            router.push({
              path: "/login"
            });
          }
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
    service(i, id) {
      console.log(id);
      if (i == "联系客服") {
        this.$dialog.confirm({
          title: "联系客服",
          message: "请加客服QQ:1234567899"
        });
      }
      if (i == "取消订单") {
        this.$dialog
          .confirm({
            title: "是否要取消订单"
          })
          .then(() => {
            // on confirm
            this.Http.post(
              "/api/cjtpay-commercial-web/commodity/order/delete",
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
              } else {
                // 数据错误提示
              }
            });
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    paymentxx(id) {
      console.log(id);
      this.$router.push({
        name: "enterxx",
        query: {
          ids: id
        }
      });
    },
    finish() {
      this.list();
    }
  }
};
</script>
<style lang="scss" scoped>
[v-cloak] {
  display: none !important;
}
.wrr {
  position: relative;
  top: 0.1rem;
  padding-bottom: 0.7rem;
  .content {
    margin: 0 auto;
    margin-bottom: 0.15rem;
    overflow: hidden;
    width: 3.55rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0.04rem 0.23rem 0 rgba(41, 41, 41, 0.13);
    border-radius: 0.08rem;
    ul {
      li:nth-child(1) {
        margin: 0.2rem 0 0 0.15rem;
        span:nth-child(1) {
          font-size: 0.18rem;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(36, 36, 36, 1);
          opacity: 0.9;
        }
        span:nth-child(2) {
          font-size: 0.18rem;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(48, 48, 48, 1);
          opacity: 0.8;
          float: right;
          margin-right: 0.2rem;
        }
      }
      li:nth-child(2) {
        overflow: hidden;
        margin: 0.13rem 0 0 0.15rem;
        font-size: 0.18rem;
        font-family: Myriad Pro;
        font-weight: 400;
        color: rgba(48, 48, 48, 1);
        opacity: 0.7;
        .van-count-down {
          color: red;
          font-size: 0.2rem;
        }
        span:nth-child(2) {
          font-size: 0.18rem;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(48, 48, 48, 1);
          opacity: 0.8;
          float: right;
          margin: -0.2rem 0.2rem 0 0;
        }
      }
      li:nth-child(3) {
        margin: 0.2rem 0 0 0.15rem;
        span:nth-child(1) {
          font-size: 0.18rem;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(48, 48, 48, 1);
        }
        span:nth-child(2) {
          font-size: 0.18rem;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(48, 48, 48, 1);

          float: right;
          margin-right: 0.2rem;
        }
      }
      li:nth-child(4) {
        margin: 0.2rem 0 0 0.15rem;
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
      li:nth-child(5) {
        float: right;
        margin: 0.15rem 0.2rem 0.15rem 0;
      }
    }
  }
}
</style>
