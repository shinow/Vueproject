<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        van-clearfix
        v-model="loading"
        :finished="finished"
        loading-text
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="wrr" van-clearfix>
          <div style class="content" v-for="(item,index) in datak" :key="index">
            <ul>
              <li>
                <span>{{item.commodityName}}</span>
                <span>赚{{(item.commission)/100}}元/组</span>
              </li>
              <li></li>
              <li>
                <span>时间：</span>
                <span>{{item.updateTime}}</span>
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
  name: "mwanc",
  data() {
    return {
      loading: false,
      isLoading: false,
      pageSize: 10,
      finished: false,
      datak: [],
      total: ""
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
    openFullScreen2() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        mask: true
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
    list() {
      this.openFullScreen2();
      this.Http.post("/api/cjtpay-commercial-web/commodity/order/list", {
        pageNum: 1,
        pageSize: this.pageSize,
        status: 2
      }).then(data => {
        if (data.httpCode == 0) {
          this.pageSize = this.pageSize + 10;
          this.loading = false;
          // 数据的返回接受
          console.log(data);
          this.datak = data.data;
          this.total = Number(data.total);
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
.wrr {
  position: relative;
  top: 0.1rem;
  padding-bottom: 0.6rem;
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
        margin: 0.2rem 0 0.15rem 0.15rem;
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
    }
  }
}
</style>

