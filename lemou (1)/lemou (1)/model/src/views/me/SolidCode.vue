<template>
  <div class="payalicode">
    <header>
      <img @click="goback()" src="../../assets/img/fanhu.png" alt />
      <span>支付宝固码</span>
    </header>
    <div style="padding-top:0.65rem"></div>
    <ul>
      <li @click="MoneCode(item.name)" v-for="(item,index) in listD" :key="index">
        <img src="../../assets/img/支付宝固码.jpg" alt />
        <span>{{item.name}}￥ 支付宝固码</span>
        <van-icon name="arrow" />
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "SolidCode",
  data() {
    return {
      listD: [{ name: 1515 }, { name: 122 }, { name: 22 }]
    };
  },
  created() {
    // this.getdata();
  },
  methods: {
    goback() {
      this.$router.push("/Paycode");
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
<style lang="less" scoped>
.payalicode {
  width: 3.75rem;
  height: 100vh;
  background: @bc;
  overflow: auto;
  ul {
    width: 95%;
    margin-left: 2%;
    color: white;
    background-color: @contcolor;
    z-index: 2;
    padding-bottom: 0.2rem;
    li {
      z-index: 1;
      width: 90%;
      margin-left: 0.2rem;
      height: 0.45rem;
      border-bottom: 0.01rem solid @bc;
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
}
</style>
