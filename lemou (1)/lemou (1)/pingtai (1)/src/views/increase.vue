<template>
  <div class="increase">
    <div class="head">
      <span @click="user()">用户列表 /</span>
      <span>新增</span>
    </div>
    <div class="cont">
      <p>基本信息</p>
      <ul>
        <li>
          <span>姓名：</span>
          <input type="text" v-model="userName" placeholder="请输入内容"/>
        </li>
        <li>
          <span>支付宝：</span>
          <input type="text" v-model="alipay" placeholder="请输入内容"/>
        </li>
        <li>
          <span>所属码商：</span>
          <el-select
            @change="change"
            v-model="value"
            size="small"
            style="width:160px;margin-left:80px"
            placeholder="请选择"
          >
            <el-option v-for="item in options" :key="item.id" :label="item.dealerId" :value="item.id"></el-option>
          </el-select>
        </li>
        <li>
          <span>账户：</span>
          <input  type="text" v-model="accountt" placeholder="请输入手机号" />
        </li>
        <li>
          <span>密码：</span>
          <input type="text" v-model="password" placeholder="初始密码123456" />
        </li>
        <li>
          <span>状态：</span>
          <el-select
            v-model="value1"
            @change="chge(value1)"
            size="small"
            style="width:160px;margin-left:120px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in optionss"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </li>
        <li>
          <span>描述</span>
          <input  placeholder="请输入内容" v-model="remark" type="text" />
        </li>
      </ul>
      <button @click="xinx()">确认新增</button>
    </div>
  </div>
</template>
<script>
import { Dealerlist, Commreadd } from "@/api";
export default {
  name: "increase",
  data() {
    return {
      value: "",
      userName: "",
      alipay: "",
      locked: "",
      password: "",
      remark: "",
      parentId: "",
      repeat:true,
      accountt: "",
       current: 1,
      size: 10,
      total: 0,
      options: [],
      value1: "",
      optionss: [
        {
          value: 1,
          label: "开启"
        },
        {
          value: 0,
          label: "关闭"
        }
      ]
    };
  },
  created() {
    this.Administrators();
  },
  methods: {
    chge(val) {
      this.value1 = val;
    },
    change(val) {
      this.value = val;
      let obj = {};
      obj = this.options.find(item => {
        return item.id === val;
      });
      this.name = obj.name;
    },
    commoditylb() {
      this.$router.push({
        name: "commoditylb"
      });
    },
    commoditydd() {
      this.$router.push({
        name: "commoditydd"
      });
    },
    system() {
      this.$router.push({
        name: "system"
      });
    },
    parameter() {
      this.$router.push({
        name: "parameter"
      });
    },
    increase() {
      this.$router.push({
        name: "increase"
      });
    },
    Administrators() {
      let par = {
        pageNum: this.current,
        pageSize: this.size
      };
      Dealerlist(par).then(res => {
        if (res.data.httpCode==0) {
             console.log(res);
        this.options = res.data.data;
        }
       
      });
    },
    xinx() {
       if (this.repeat==true) {
            this.repeat=false
      let apr = {
        account: this.accountt,
        alipay: this.alipay,
        locked: this.value1,
        parentId: this.value,
        password: this.password,
        remark: this.remark,
        userName: this.userName
      };
     
        Commreadd(apr).then(res => {
       if (res.data.httpCode==0) {
           this.repeat=true
          this.$router.push({
          name: "user"
        });
     
       }
      });

      }
      
    },
    distributor() {
      this.$router.push({
        name: "distributor"
      });
    },
    transaction() {
      this.$router.push({
        name: "transaction"
      });
    },
    account() {
      this.$router.push({
        name: "account"
      });
    },
    user() {
      this.$router.push({
        name: "user"
      });
    },
    reflect() {
      this.$router.push({
        name: "reflect"
      });
    },
    deal() {
      this.$router.push({
        name: "deal"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.increase {
  overflow: hidden;
  .head {
    margin: 25px 0 0 72px;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(24, 24, 24, 1);
  }
  .cont {
    margin: 30px 0 0 200px;
    width: 833px;
    // height: 638px;
    border: 1px solid rgba(112, 112, 112, 1);
    border-radius: 16px;
    p {
      font-size: 22px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(71, 70, 70, 1);
      margin: 39px 0 0 49px;
    }
    ul {
      margin: 26px 0 0 216px;
      li {
        overflow: hidden;
        width: 70%;
        border-bottom: 1px solid rgba(181, 181, 181, 1);
        padding: 20px 0;
        span {
          font-size: 20px;
          font-family: Songti SC;
          font-weight: 400;
          color: rgba(35, 35, 35, 1);
        }
        input {
          // border: 1px solid red;
          background: rgba(247, 247, 247, 1);
          height: 50px;
          // margin-left: 20px;
          float: right;
          margin-right: 30px;
          width: 70%;
          font-size: 20px;
          font-family: Songti SC;
          font-weight: 400;
          color: rgba(81, 81, 81, 1);
          text-align: center;
        }
      }
      li:nth-child(1) {
        padding: 0 0 5px 0;
      }
      li:nth-child(2) {
        padding: 5px 0;
      }
      li:nth-child(4) {
        padding: 5px 0;
      }
      li:nth-child(5) {
        padding: 5px 0;
      }
      li:nth-child(3) {
        padding: 15px 0;
      }
      li:nth-child(6) {
        padding: 15px 0;
      }
      li:nth-child(7) {
        padding: 5px 0;
      }
    }
    button {
      width: 119px;
      height: 32px;
      font-size: 18px;
      font-family: Songti SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      background: rgba(71, 212, 185, 1);
      border-radius: 4px;
      text-align: center;
      margin: 50px 357px;
    }
  }
}
</style>