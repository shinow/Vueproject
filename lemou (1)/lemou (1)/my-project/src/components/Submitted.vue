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
                <img :src="item.imagre" alt />
              </li>
              <li>
                <span>单价：￥{{(item.price)/100}}</span>
                <span>x {{item.num}}组</span>
              </li>
              <li>
                <span>总支付金额：</span>
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
                  @click="changezt(index,item.fast)"
                  round
                  type="warning"
                >{{item.fast}}</van-button>
                <van-button
                  v-if="item.fukuanMs"
                  size="small"
                  @click="paymentxx(item.status,item.id)"
                  round
                  type="info"
                >付款信息</van-button>
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
  name: "Submitted",
  data() {
    return {
      loading: false,
      isLoading: false,
      finished: false,
      total: "",
      datak: [],
      pageSize: 10
    };
  },
  created() {
    this.list();
  },
  watch: {
    Allquan: function(val) {
      if (val == 1) {
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
      if (this.datak == undefined || this.datak == null) {
        // this.$toast("快去下单吧！");
        this.loading = false;
        this.finished = true;
        return;
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
        status: 3
      }).then(data => {
        if (data.httpCode == 0) {
          // 数据的返回接受
          if (data.data == undefined) {
            this.$toast("快去下单吧！");
          }
          this.pageSize = this.pageSize + 10;
          this.loading = false;
          this.total = data.total;
          console.log(data.data);
          this.datak = data.data;
          if (this.datak.length != 0) {
            this.datak.forEach((item, index) => {
              console.log(item.fast);
              if (item.status == "5") {
                item.status = "审核中";
                item.fukuanMs = true;
                item.imagre = require("../assets/image/shenhe.png");
              } else if (item.status == "6") {
                item.status = "审核失败";
                item.fukuanMs = false;
                item.fast = "联系客服";
                item.imagre = require("../assets/image/shibai.png");
              }
              if (item.fast != "联系客服") {
                item.fast = "加急";
              }
            });
            this.$toast.clear();
          } else {
            this.$toast("快去下单吧！");
          }
        } else {
          // 数据错误提示
          this.$toast(data.msg);
        }
      });
    },
    // 复制成功
    onCopy(e) {
      this.$toast("复制成功");
    },
    // 复制失败
    onError(e) {
      this.$toast("复制失败");
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
    paymentxx(val, id) {
      console.log(val, id);
      this.$router.push({
        name: "enterxx",
        query: {
          ids: id,
          bak: "失败"
        }
      });
    },
    earning() {
      this.$router.push({
        name: "paymented"
      });
    },
    finish() {
      this.list();
    },
    changezt(i, val) {
      console.log(val);
      if (val == "加急") {
        console.log(this.datak[i]);
        this.$set(this.datak[i], "fast", "联系客服");
        this.$forceUpdate();
      }
      if (val == "联系客服") {
        this.$dialog.confirm({
          title: "联系客服",
          message: "请加客服QQ:1234567899"
        });
      }
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
  padding-bottom: 1rem;
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
      li:nth-child(2) {
        overflow: hidden;
        margin: 0rem 0 0 0.15rem;
        font-size: 0.18rem;
        font-family: Myriad Pro;
        font-weight: 400;
        color: rgba(48, 48, 48, 1);
        opacity: 0.7;
        span {
        }
        span:nth-child(2) {
          font-size: 0.18rem;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(48, 48, 48, 1);
          opacity: 0.8;
          float: right;
          margin: 0 0.2rem 0 0;
        }
      }
      li:nth-child(3) {
        margin: 0.22rem 0 0 0.15rem;
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

