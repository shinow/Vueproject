<template>
  <div class="Channel">
    <div class="cont">
      <div class="Left">
        <p>{{Palipay.type}}</p>
        <ul>
          <li>
            <span>买家日成交额度：</span>
            <el-input
              style="width:180px;margin-left:25px"
              clearable
              v-model="Palipay.buyerMake"
              placeholder="请输入内容"
            ></el-input>
          </li>
          <li>
            <span>买家限制链接数量：</span>
            <el-input style="width:180px" clearable v-model="Palipay.buyerNum" placeholder="请输入内容"></el-input>
          </li>
          <li>
            <span>商品日成交总额：</span>
            <el-input
              style="width:180px;margin-left:25px"
              clearable
              v-model="Palipay.sellerMake"
              placeholder="请输入内容"
            ></el-input>
          </li>
          <li>
            <span>商品限制链接数量：</span>
            <el-input style="width:180px" clearable v-model="Palipay.sellerNum" placeholder="请输入内容"></el-input>
          </li>
        </ul>
      </div>
      <div class="Right">
        <p>{{Pweix.type}}</p>
        <ul>
          <li>
            <span>买家日成交额度：</span>
            <el-input
              style="width:180px;margin-left:25px"
              clearable
              v-model="Pweix.buyerMake"
              placeholder="请输入内容"
            ></el-input>
          </li>
          <li>
            <span>买家限制链接数量：</span>
            <el-input style="width:180px" clearable v-model="Pweix.buyerNum" placeholder="请输入内容"></el-input>
          </li>
          <li>
            <span>商品日成交总额：</span>
            <el-input
              style="width:180px;margin-left:25px"
              clearable
              v-model="Pweix.sellerMake"
              placeholder="请输入内容"
            ></el-input>
          </li>
          <li>
            <span>商品限制链接数量：</span>
            <el-input style="width:180px" clearable v-model="Pweix.sellerNum" placeholder="请输入内容"></el-input>
          </li>
        </ul>
      </div>
    </div>

    <div class="btn">
      <el-button type="primary" @click="ChangeCo()">保存</el-button>
    </div>
  </div>
</template>
<script>
import { PqueryQuotaPdd, PupdateQuotaPdd } from "@/api";
export default {
  name: "Channel",
  data() {
    return {
      Palipay: "",
      Pweix: "",
      datak: []
    };
  },
  created() {
    this.list();
  },
  methods: {
    ChangeCo() {
      this.modifyZ();
    },
    list() {
      PqueryQuotaPdd(1).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data.data);
          this.datak = res.data.data;
          this.datak.forEach((item, index) => {
            item.buyerMake = item.buyerMake / 100;
            item.sellerMake = item.sellerMake / 100;
            if (item.type == "0") {
              item.type = "拼多多支付宝";
              this.Palipay = item;
            } else if (item.type == "1") {
              item.type = "拼多多微信";
              this.Pweix = item;
            }
          });
        }
      });
    },
    modifyZ() {
      if (
        this.Palipay.buyerMake === "" ||
        this.Palipay.buyerNum === "" ||
        this.Palipay.sellerMake === "" ||
        this.Palipay.sellerNum === ""
      ) {
        this.$message.error("请输入拼多多支付宝对应内容！");
        return;
      }
      let pay = {
        buyerMake: this.Palipay.buyerMake, //买家日成交额度
        buyerNum: this.Palipay.buyerNum, //买家限制链接数量
        id: this.Palipay.id,
        sellerMake: this.Palipay.sellerMake, //商品日成交总额
        sellerNum: this.Palipay.sellerNum //商品限制链接数量
      };
      PupdateQuotaPdd(pay).then(res => {
        if (res.data.httpCode == 0) {
          this.modifyW();
        } else {
          this.$message.error(res.data.mag);
        }
      });
    },
    modifyW() {
      if (
        this.Pweix.buyerMake === "" ||
        this.Pweix.buyerNum === "" ||
        this.Pweix.sellerMake === "" ||
        this.Pweix.sellerNum === ""
      ) {
        this.$message.error("请输入拼多多微信对应内容！");
        return;
      }
      let pay = {
        buyerMake: this.Pweix.buyerMake, //买家日成交额度
        buyerNum: this.Pweix.buyerNum, //买家限制链接数量
        id: this.Pweix.id,
        sellerMake: this.Pweix.sellerMake, //商品日成交总额
        sellerNum: this.Pweix.sellerNum //商品限制链接数量
      };
      PupdateQuotaPdd(pay).then(res => {
        if (res.data.httpCode == 0) {
        } else {
          this.$message.error(res.data.mag);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.Channel {
  overflow: hidden;
  text-align: center;
  font-size: 25px;
  .cont {
    margin-top: 30px;
    overflow: hidden;
    height: 70%;
    .Left {
      width: 50%;
      float: left;
      border-right: 1px dashed red;
      p {
        margin-left: 30px;
      }
      ul {
        margin-top: 50px;
        li {
          margin-top: 30px;
        }
      }
    }
    .Right {
      float: left;
      width: 45%;
      p {
        margin-left: 50px;
      }
      ul {
        margin-top: 50px;
        li {
          margin-top: 30px;
        }
      }
    }
  }
  .btn {
    margin: 0 auto;
  }
}
</style>