<template>
  <div class="transaction">
    <div class="platform">
      <div class="wrapo">
        <ul>
          <li style="margin-left:5%">
            <p>今日订单</p>
            <div>
              <echartsA :data="Eorders"></echartsA>
            </div>
          </li>
          <li>
            <p>今日返利</p>
            <div>
              <echartsB :data="Erebates"></echartsB>
            </div>
          </li>
          <li>
            <p>今日佣金</p>
            <div>
              <echartsC :data="Ecommissions"></echartsC>
            </div>
          </li>
          <div class="liang">
            <li>
              <p>用户数量</p>
              <div>
                <echartsD :data="Eusers"></echartsD>
              </div>
            </li>
            <li>
              <p>账户数量</p>
              <div>
                <echartsE :data="Eaccounts"></echartsE>
              </div>
            </li>
          </div>
          <div class="passageway">
            <theCaseBarThree :data="ListArr"></theCaseBarThree>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import theCaseBarThree from "./theCaseBarThree";
import echartsA from "./echartsA";
import echartsB from "./echartsB";
import echartsC from "./echartsC";
import echartsD from "./echartsD";
import echartsE from "./echartsE";
import {
  Dealist,
  StdealerTransaction,
  StplatformData,
  StchannelStatistics
} from "@/api";
export default {
  name: "transaction",
  components: {
    echartsB,
    echartsE,
    echartsC,
    echartsD,
    theCaseBarThree,
    echartsA
  },
  data() {
    return {
      ListArr: [],
      Eorders: [],
      Erebates: [],
      Ecommissions: [],
      Eusers: [],
      Eaccounts: []
    };
  },

  created() {
    if (window.name == "") {
      console.log("首次被加载");
      window.name = "isReload"; // 在首次进入页面时我们可以给window.name设置一个固定值
    } else if (window.name == "isReload") {
      console.log("页面被刷新");
    }
  },
  mounted() {
    this.platformData();
    this.channelStatistics();
  },
  beforeDestroy() {
    window.name = "";
  },
  methods: {
    platformData() {
      StplatformData().then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data.data);
          this.datas = res.data.data;
          this.Eorders = this.datas.orders;
          this.Eorders.forEach((item, index) => {
            if (item.key == 1) {
              item.key = "商品订单";
            } else if (item.key == 2) {
              item.key = "用户额度";
            } else if (item.key == 3) {
              item.key = "成交订单";
            }
          });
          this.Erebates = this.datas.rebates;
          this.Erebates.forEach((item, index) => {
            if (item.key == 1) {
              item.key = "经销商";
            } else if (item.key == 2) {
              item.key = "一级";
            } else if (item.key == 3) {
              item.key = "总计";
            }
          });
          this.Ecommissions = this.datas.commissions;
          this.Ecommissions.forEach((item, index) => {
            if (item.key == 1) {
              item.key = "一级";
            } else if (item.key == 2) {
              item.key = "二级";
            } else if (item.key == 3) {
              item.key = "总计";
            }
          });
          this.Eusers = this.datas.users;
          this.Eusers.forEach((item, index) => {
            if (item.key == 1) {
              item.key = "已开通";
            } else if (item.key == 2) {
              item.key = "已关闭";
            }
          });
          this.Eaccounts = this.datas.accounts;
          this.Eaccounts.forEach((item, index) => {
            if (item.key == 1) {
              item.key = "已开通";
            } else if (item.key == 2) {
              item.key = "已关闭";
            }
          });
        }
      });
    },
    channelStatistics() {
      StchannelStatistics().then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data.data);
          res.data.data.forEach((item, index) => {
            if (item.code == 0) {
              item.code = "支付宝个码";
            } else if (item.code == 1) {
              item.code = "微信个码";
            } else if (item.code == 2) {
              item.code = "云闪付个码";
            } else if (item.code == 3) {
              item.code = "支付宝商码";
            } else if (item.code == 4) {
              item.code = "微信商码";
            } else if (item.code == 5) {
              item.code = "银行卡";
            } else if (item.code == 6) {
              item.code = "拼多多支付宝";
            } else if (item.code == 7) {
              item.code = "拼多多微信";
            } else if (item.code == 8) {
              item.code = "聚合码";
            } else if (item.code == 9) {
              item.code = "支付宝固态码";
            }
          });
          res.data.data.forEach((item, index) => {
            item.money = item.money / 100;
          });
          this.ListArr = res.data.data;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.platform {
  overflow: hidden;
  float: left;
  p {
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
  }
  .wrapo {
    float: left;
    ul {
      width: 100%;
      .liang {
        float: left;
        width: 26%;
        margin-left: 5%;
        li {
          margin-left: 0;
          width: 100%;
          float: left;
        }
        p {
          margin-left: 0;
        }
        div {
          margin-top: -80px;
          margin-left: 3%;
        }
      }

      li {
        width: 26%;
        float: left;
        margin-left: 7%;
        p {
          color: green;
        }
        div {
          margin-top: -110px;
        }
      }
    }
  }
}
.passageway {
  float: left;
  margin: 5% 0 0 15%;
  p {
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: green;
  }
}
</style>