<template>
  <div class="quota">
    <div class="head">
      <span @click="user()">用户列表 /</span>
      <span @click="actdetails()">账户详情 /</span>
      <span>编辑每日限额</span>
    </div>
    <div class="cont">
      <p>账户每日限额</p>
      <ul>
        <li v-for="(item,index) in dataK" :key="index">
          <span>{{item.code}}：</span>
          <input
            @blur.prevent="changeCount(item.id,item.remark)"
            type="number"
            v-model="item.remark"
            :placeholder="item.remark"
          />
        </li>
      </ul>
      <button @click="update()">保存</button>
    </div>
  </div>
</template>
<script>
import { CommupdateQuota, CommqueryQuota } from "@/api";
export default {
  name: "quota",
  data() {
    return {
      id: "",
      dataK: [],
      xiugid: "",
      xiuged: "",
      repeat: true
    };
  },
  created() {
    this.id = this.$route.query.ids;
    this.accountQuota();
  },
  methods: {
    changeCount(i, z) {},
    update() {
      if (this.repeat == true) {
        this.repeat = false;
        let arr = [];
        this.dataK.forEach((item, index) => {
          let obj = {
            id: "",
            remark: ""
          };
          obj = {
            id: item.id,
            remark: item.remark
          };
          arr.push(obj);
        });
        let par = { quotas: arr };
        CommupdateQuota(par).then(res => {
          if (res.data.httpCode == 0) {
            console.log(res.data);
            this.repeat = true;
            this.$router.push({
              name: "actdetails",
              query: {
                ids: this.id
              }
            });
          }
        });
      }
    },

    accountQuota() {
      CommqueryQuota(this.id).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data);
          res.data.data.forEach((item, index) => {
            if (item.code == 0) {
              item.code = "支付宝";
            } else if (item.code == 1) {
              item.code = "微信";
            } else if (item.code == 2) {
              item.code = "云闪付";
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
          this.dataK = res.data.data;
        }
      });
    },
    actdetails() {
      this.$router.push({
        name: "actdetails",
        query: {
          ids: this.id
        }
      });
    },
    user() {
      this.$router.push({
        name: "user"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.quota {
  overflow: hidden;
  .head {
    margin-left: 72px;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(24, 24, 24, 1);
  }
  .cont {
    margin: 10px 0 0px 200px;
    width: 833px;
    // height: 658px;
    border: 1px solid rgba(112, 112, 112, 1);
    border-radius: 16px;
    p {
      font-size: 22px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(71, 70, 70, 1);
      margin: 10px 0 0 10px;
    }
    ul {
      margin: 16px 0 0 236px;
      li {
        width: 70%;
        padding: 10px 0;
        span {
          font-size: 20px;
          font-family: Songti SC;
          font-weight: 400;
          color: rgba(35, 35, 35, 1);
        }
        input {
          margin-top: 0;
          float: right;
          margin-right: 50px;
          width: 193px;
          height: 35px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(194, 194, 194, 1);
          border-radius: 2px;
          font-size: 20px;
          font-family: Songti SC;
          font-weight: 400;
          color: rgba(35, 35, 35, 1);
          text-align: center;
        }
      }
      li:nth-child(1) {
        padding-top: 0;
      }
    }
    button {
      font-size: 18px;
      font-family: Songti SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      width: 194px;
      height: 32px;
      background: rgba(71, 212, 185, 1);
      border-radius: 4px;

      text-align: center;
      margin: 30px 0 30px 320px;
    }
  }
}
</style>