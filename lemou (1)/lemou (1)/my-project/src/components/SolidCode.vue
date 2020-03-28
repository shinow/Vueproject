<template>
  <div>
    <header>
      <img @click="goback()" src="../assets/img/fanhui-2.png" alt />
      <span>支付宝固码</span>
    </header>
    <ul>
      <li @click="MoneCode(item.name)" v-for="(item,index) in listD" :key="index">
        <img src="../assets/img/支付宝固码.jpg" alt />
        <span>{{item.name}}￥ 支付宝固码</span>
        <van-icon name="arrow" />
      </li>
    </ul>
    <div class="workL">
      <img src="../assets/image/图层 4 拷贝.png" alt />
      <p>快去上传收款码下单吧！</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "SolidCode",
  data() {
    return {
      listD: []
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    goback() {
      this.$router.push({ name: "CodeS" });
    },
    getdata() {
      // let a =
      this.Http.post(
        "http://47.52.240.147:8090/cjtpay-system-web/system/dic/public/list",
        {
          child: true, //是否包含子类 false 不包含  true包含  null查询所有
          type: "GMATP"
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        }
      ).then(data => {
        if (data.httpCode == 0) {
          console.log(data);
          this.listD = data.data;
        } else {
          this.$toast(data.msg);
        }
      });
    },
    MoneCode(v) {
      console.log(v);
      this.$router.push({
        name: "MoneCode",
        query: {
          MoenyC: v
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
ul {
  position: relative;
  padding-top: 0.8rem;
  z-index: 2;
  li {
    z-index: 1;
    width: 90%;
    margin-left: 0.2rem;
    height: 0.45rem;
    border-bottom: 0.01rem solid rgba(236, 236, 236, 1);
    img {
      width: 0.25rem;
      height: 0.25rem;
      float: left;
      margin: 0.1rem 0 0 0.01rem;
    }
    span {
      float: left;
      margin: 0.15rem 0 0 0.2rem;
    }
    .van-icon {
      float: right;
      margin: 0.15rem 0.1rem 0 0;
    }
  }
}
.workL {
  width: 100%;
  text-align: center;
  position: fixed;
  opacity: 0.4;
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
