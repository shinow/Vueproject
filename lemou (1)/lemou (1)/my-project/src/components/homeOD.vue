<template>
  <div class="home" style="height:100vh">
    <van-tabs
      swipeable
      v-model="active"
      animated
      @change="chengTab"
      line-width="0.2rem"
      title-active-color="rgba(80, 100, 235, 1)"
      color="rgba(80, 100, 235, 1)"
    >
      <van-tab title="日常任务">
        <div class="swipe">
          <van-swipe :autoplay="3000" indicator-color="white">
            <van-swipe-item @click="A">
              <img src="../assets/img/lun1.png" alt />
            </van-swipe-item>
            <van-swipe-item @click="B">
              <img src="../assets/img/lun2.png" alt />
            </van-swipe-item>
            <!-- <van-swipe-item @click="C">
              <img src="../assets/img/lun3.png" alt />
            </van-swipe-item> -->
          </van-swipe>
        </div>

        <div class="taskL" v-for="(item,index) in datak" :key="index">
          <p>{{item.name }} ({{item.num}})</p>
          <p>
            <span>¥{{item.stockPrice}}/组</span>
            <span>售价{{item.sellingPrice}}</span>
          </p>
          <div class="fanL">
            <p>充值范围(元)</p>
            <p>500~90000</p>
          </div>
          <div class="fanR">
            <p>赚</p>
            <p>{{item.commission}}/组</p>
          </div>
          <div @click="enter()" class="maZ">
            <p>马上赚</p>
          </div>
        </div>
      </van-tab>
      <van-tab title="进行中">
        <div v-if="Chus">
          <!-- 待出售 -->
          <div class="taskR" v-for="(item,index) in dataGor" :key="index">
            <div class="Rzuo">
              <img src="../assets/image/待出售.png" alt />
            </div>

            <div class="Rzhong">
              <p>{{item.commodityName}}</p>
              <p>( 总价值 ¥{{(item.quota)/100}} )</p>
              <p>赚 {{(item.commission)/100}}元/组</p>
            </div>
            <div @click="enter()" class="Ryou">
              <p>立即进货</p>
            </div>
          </div>
        </div>
        <div v-if="Jiaoy">
          <!-- 交易中 -->
          <div class="taskRT" v-for="(item,index) in dataGor" :key="index">
            <div class="RzuoT">
              <img src="../assets/image/交易中.png" alt />
            </div>

            <div class="RzhongT">
              <p>{{item.commodityName}}</p>
              <p>
                总价值
                <span>¥{{(item.quota)/100}}</span>
              </p>
              <p>
                赚
                <span>{{(item.commission)/100}}元/组</span>
              </p>
            </div>
          </div>
        </div>
        <div v-if="Shouq">
          <div class="taskRQ" v-for="(item,index) in dataGor" :key="index">
            <div class="RzuoQ">
              <img src="../assets/image/售罄.png" alt />
            </div>

            <div class="RzhongQ">
              <p>{{item.commodityName}}</p>
              <p>( 总价值 ¥{{(item.quota)/100}} )</p>
            </div>
            <div @click="enter()" class="RyouQ">
              <p>立即进货</p>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <div class="workL">
      <img src="../assets/image/图层 4 拷贝.png" alt />
      <p>开始接单吧，库存商品已上架～</p>
    </div>
    <!-- <div class="back">
      <img :src="background" alt />
    </div>
    <div class="wrr">
      <div class="header">日常任务</div>
      <article>
        <ul>
          <li style="margin-bottom:0.2rem" v-for="(item,index) in datak" :key="index">
            <img :src="item.imagesUrl" />
            <h2
              style=" font-size:0.17rem;
font-family:PingFangSC-Semibold;
font-weight:600;
color:rgba(53,52,52,1);"
            >{{item.name}}({{item.num}})</h2>
            <p>¥{{item.stockPrice}}/组</p>
            <p class="p1">售价{{item.sellingPrice}}</p>
            <i>
              赚
              <em></em>元/组
            </i>
            <div  class="btn1">
              <img src="../assets/img/马上赚.png" alt />
            </div>
          </li>
        </ul>
      </article>
    </div>-->

    <!-- <div class="taobao">
      <div class="ttex">淘宝任务</div>
      <div class="cont">
        <div class="zuo">
          <img src="../assets/img/tiebaba.png" alt />
        </div>
        <div class="you">
          <h2>剩余时间</h2>
          <van-count-down class="a1" :time="time" format="mm:ss " />
          <p>商品价格: ￥ 150</p>
          <span>返利金额:</span>
          <span>￥</span>
          <span>150</span>
          <div @click="tbdetails()" class="img11">
            <img src="../assets/img/gogogo.png" alt />
          </div>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "homeOD",
  data() {
    return {
      BDurl: "https://www.baidu.com/",
      Chus: false,
      Jiaoy: false,
      Shouq: false,
      active: 0,
      time: 10.3 * 60 * 1000,
      datak: [],
      id: "",
      jiaji: "",
      dataGor: []
    };
  },

  created() {
    this.list();
  },
  mounted() {
    this.goR();
  },
  methods: {
    chengTab() {
      this.list();
      this.goR();
    },
    goR() {
      this.Http.post("/api/cjtpay-commercial-web/commodity/order/list", {
        pageNum: 1,
        pageSize: 10,
        status: 1
      }).then(data => {
        if (data.httpCode == 0) {
          // 数据的返回接受
          console.log(data);
          this.dataGor = data.data;
          if (this.dataGor == undefined) {
            return;
          }
          this.dataGor.forEach((item, index) => {
            if (item.status == "0") {
            } else if (item.status == "1") {
              item.status = "待出售";
              this.Chus = true;
            } else if (item.status == "2") {
              item.status = "交易中";
              this.Jiaoy = true;
            } else if (item.status == "3") {
              item.status = "售罄";
              this.Shouq = true;
            }
          });
        } else {
          // 数据错误提示
        }
      });
    },
    list() {
      this.Http.post("/api/cjtpay-commercial-web/commodity/list", {}).then(
        data => {
          if (data.httpCode == 0) {
            // 数据的返回接受
            console.log(data);
            this.datak = data.data;
          } else {
            // 数据错误提示
          }
        }
      );
    },
    earning() {
      this.$router.push({
        name: "paymented"
      });
    },
    enter() {
      this.$router.push({
        name: "enterdd"
      });
    },
    tbdetails() {
      this.$router.push({
        name: "tbdetails"
      });
    },
    A() {
      this.$router.push({
        name: "Pddpay"
      });
    },
    B() {
      this.$router.push({
        name: "download"
      });
    },
    C() {
      if (localStorage.Usertype == "1") {
        this.$toast("等级不符合，请升级!");
        return;
      }
      this.$router.push({
        name: "xinyong",
        query: {
          yqma: localStorage.yaoCOde
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
.home {
  overflow: hidden;
  .van-tabs {
    z-index: 555;
  }
  .swipe {
    width: 3.75rem;
    img {
      width: 100%;
      height: 1.5rem;
    }
  }
  .workL {
    width: 100%;
    text-align: center;
    position: absolute;
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
  .taskL {
    overflow: hidden;
    width: 3.56rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 0.07rem;
    padding-bottom: 0.2rem;
    p:nth-child(1) {
      font-family: PingFang SC;
      font-weight: bold;
      color: rgba(62, 62, 62, 1);
      font-size: 0.19rem;
      padding: 0.21rem 0 0 0.15rem;
    }
    p:nth-child(2) {
      font-size: 0.14rem;
      padding: 0.27rem 0 0 0.15rem;
      color: rgba(80, 100, 235, 1);
      span {
        width: 0.4rem;
        height: 0.4rem;
        border: 1px solid rgba(80, 100, 235, 1);
        padding: 0.03rem 0.05rem;
        border-radius: 0.04rem;
      }
    }
    .fanL {
      padding-top: 0.11rem;
      float: left;
      text-align: center;
      width: 1.3rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(81, 81, 81, 1);
      p:nth-child(1) {
        color: rgba(81, 81, 81, 1);
        opacity: 0.9;
      }
      p:nth-child(2) {
        padding-top: 0.2rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(76, 76, 76, 1);
        font-size: 0.19rem;
      }
    }
    .fanR {
      padding-top: 0.11rem;
      float: left;
      text-align: center;
      width: 1.3rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(81, 81, 81, 1);
      opacity: 0.9;
      p:nth-child(1) {
        color: rgba(81, 81, 81, 1);
        opacity: 0.9;
      }
      p:nth-child(2) {
        padding-top: 0.2rem;
        font-size: 0.19rem;
      }
    }
    .maZ {
      width: 1.05rem;
      height: 0.43rem;
      background-color: rgb(79, 97, 244);
      border-radius: 0.4rem;
      text-align: center;
      float: right;
      margin: -1.1rem 0.12rem 0 0;
      p {
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin: -0.1rem 0.12rem 0 0;
      }
    }
  }
  .taskR {
    z-index: 2;
    overflow: hidden;
    width: 3.56rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 0.07rem;
    padding-bottom: 0.2rem;
    .Rzuo {
      width: 0.59rem;
      height: 0.59rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .Rzhong {
      float: left;
      margin: -0.4rem 0 0 0.7rem;
      p:nth-child(1) {
        font-size: 0.22rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(28, 28, 28, 1);
      }
      p:nth-child(2) {
        font-size: 0.18rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-top: 0.15rem;
      }
      p:nth-child(3) {
        font-size: 0.2rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(80, 100, 235, 1);
        margin-top: 0.2rem;
      }
    }
    .Ryou {
      width: 1.05rem;
      height: 0.43rem;
      background-color: rgb(79, 97, 244);
      border-radius: 0.4rem;
      text-align: center;
      float: right;
      margin: -0.1rem 0.1rem 0 0;
      p {
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin: 0.13rem 0rem 0 0;
      }
    }
  }
  .taskRT {
    z-index: 555 !important;
    overflow: hidden;
    width: 3.56rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 0.07rem;
    padding-bottom: 0.2rem;
    .RzuoT {
      width: 0.59rem;
      height: 0.59rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .RzhongT {
      width: 78%;
      float: left;
      margin: -0.4rem 0 0 0.7rem;
      p:nth-child(1) {
        font-size: 0.22rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(28, 28, 28, 1);
      }
      p:nth-child(2) {
        font-size: 0.22rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(80, 100, 235, 1);
        margin-top: 0.15rem;
      }
      p:nth-child(3) {
        font-size: 0.22rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(80, 100, 235, 1);
        margin-top: 0.2rem;
      }
      span {
        float: right;
      }
    }
  }
  .taskRQ {
    z-index: 555 !important;
    overflow: hidden;
    width: 3.56rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 0.07rem;
    padding-bottom: 0.2rem;
    .RzuoQ {
      width: 0.59rem;
      height: 0.59rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .RzhongQ {
      width: 78%;
      float: left;
      margin: -0.4rem 0 0 0.7rem;
      p:nth-child(1) {
        font-size: 0.22rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(28, 28, 28, 1);
      }
      p:nth-child(2) {
        font-size: 0.22rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(80, 100, 235, 1);
        margin-top: 0.15rem;
      }
      p:nth-child(3) {
        font-size: 0.22rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(80, 100, 235, 1);
        margin-top: 0.2rem;
      }
      span {
        float: right;
      }
    }
    .RyouQ {
      width: 1.05rem;
      height: 0.43rem;
      background-color: rgb(79, 97, 244);
      border-radius: 0.4rem;
      text-align: center;
      // float: right;
      margin: 0.4rem 0 0 0.73rem;
      p {
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin: 0.1rem 0 0 0;
        height: 0.43rem;
        line-height: 0.43rem;
      }
    }
  }
}
</style>

