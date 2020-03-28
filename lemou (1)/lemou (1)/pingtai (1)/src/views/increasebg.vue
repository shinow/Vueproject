<template>
  <div class="increase">
    <div class="head">
      <span @click="user()">用户列表 /</span>
      <span @click="actdetails()">账户详情 /</span>
      <span>编辑基本信息</span>
    </div>
    <div class="cont">
      <p>基本信息</p>
      <ul>
        <li>
          <span>姓名：</span>
          <input type="text" v-model="datas.userName" placeholder="请输入内容" />
        </li>
        <li>
          <span>账号：</span>
          <input v-model="datas.account" type="text" placeholder="请输入内容" />
        </li>
        <li style="padding: 5px 0">
          <span>支付宝：</span>
          <input v-model="datas.alipay" type="text" placeholder="请输入内容" />
        </li>
        <li v-if="mashang" style="padding: 15px 0">
          <span>所属码商：</span>
          <el-select
            @change="change"
            v-model="value"
            size="small"
            style="width:100px;margin-left:50px"
            placeholder="请输入内容"
          >
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </li>

        <li v-if="Grade" style="padding: 15px 0">
          <span>等级：</span>
          <el-select
            @change="dengjii(datas.userType)"
            v-model="datas.userType"
            size="small"
            style="width:100px;margin-left:92px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in dengjiK"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </li>
        <li style="padding: 15px 0">
          <span>重置密码：</span>
          <button @click="chongz()" v-if="czz" style="margin: 0 0 0 80px;">重置密码</button>
          <button v-if="cz" style="margin: 0 0 0 80px;background:gray">重置密码</button>
        </li>
        <li style="padding: 15px 0">
          <span>状态：</span>
          <el-select
            @change="zhuangt(datas.locked)"
            v-model="datas.locked"
            size="small"
            style="width:120px;margin-left:120px"
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
        <li style="padding:5px 0 ">
          <span>描述：</span>
          <input type="text" v-model="datas.remark" style="margin-left:15px" placeholder="请输入内容" />
        </li>
      </ul>
      <button @click="update()">保存</button>
    </div>
  </div>
</template>
<script>
import {
  commercialreset,
  Dealist,
  commpersonalDetails,
  commercialupdate
} from "@/api";
export default {
  name: "increase",
  data() {
    return {
      repeat: true,
      shen: false,
      accountt: "",
      alipay: "",
      flag: "",
      idss: "",
      locked: "",
      parentId: "",
      dengji: "",
      // flag
      czz: true,
      cz: false,
      passdd: "",
      remark: "",
      Grade: "",
      mashang: "",
      userType: "",
      value: "",
      id: "",
      datas: "",
      // zhuangt:"",
      options: [],
      dengjiK: [
        {
          value: 0,
          label: "一级"
        }
      ],
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
    this.id = this.$route.query.ids;
    this.personalDetails();
    this.Administrators();
  },
  methods: {
    chongz() {
      this.$confirm("是否重置密码?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "重置密码成功!"
          });
          // this.yes();
          this.flag = true;
          this.czz = false;
          this.cz = true;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置密码"
          });
          this.flag = false;
        });
    },
    zhuangt(val) {
      this.locked = val;
    },
    dengjii(val) {
      this.userType = val;
      if (val == 0) {
        this.mashang = true;
        // this.Grade=false
      }
    },
    change(val) {
      if (this.datas.userType == "二级" || this.datas.userType == 1) {
      }
      if (this.datas.userType == "一级" || this.datas.userType == 0) {
        this.value = val;
        let obj = {};
        obj = this.options.find(item => {
          return item.id === val;
        });
        this.name = obj.name;
      }
    },
    Administrators() {
      let par = {
        pageNum: this.current,
        pageSize: this.size
      };
      Dealist(par).then(res => {
        if (res.data.httpCode == 0) {
          this.options = res.data.data;
        }
      });
    },

    update() {
      if(this.datas.userName===""){
        this.$message.error("请输入姓名！")
        return
      }
      if (this.repeat == true) {
            this.repeat = false;
        if (this.flag == null || this.flag == undefined || this.flag == "") {
          this.flag = false;
        }
        if (this.datas.locked=="关闭") {
        this.datas.locked=0
      }else if(this.datas.locked=="开启"){
        this.datas.locked=1
      }
        let par = {
          account: this.datas.account,
          alipay: this.datas.alipay,
          flag: this.flag,
          id: this.id,
          locked: this.datas.locked,
          parentId: this.value,
          remark: this.datas.remark,
          userName: this.datas.userName,
          userType: this.userType
        };
        commercialupdate(par).then(res => {
          if (res.data.httpCode == 0) {
            console.log(res.data);
            this.repeat = true;
            this.$router.push({
              name: "user"
            });
          }
        });
      }
    },
    personalDetails() {
      commpersonalDetails(this.id).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data);
          if (res.data.data.locked == 1) {
            res.data.data.locked = "开启";
          }
          if (res.data.data.locked == 0) {
            res.data.data.locked = "关闭";
          }
          this.datas = res.data.data;
          this.userType = this.datas.userType;
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
    user(){
      this.$router.push({
        name: "user",
      });
    },
  }
};
</script>
<style lang="less" scoped>
.increase {
  overflow: hidden;
  .head {
    margin-top: 20px;
    margin-left: 72px;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(24, 24, 24, 1);
  }
  .cont {
    margin: 30px 0 80px 200px;
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
          background: rgba(247, 247, 247, 1);
          height: 50px;
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
      // li:nth-child(3) {
      //   padding: 5px 0;
      // }
      li:nth-child(4) {
        padding: 20px 0;
        span:nth-child(2) {
          margin-left: 90px;
          font-size: 20px;
          font-family: Songti SC;
          font-weight: 400;
          color: rgba(81, 81, 81, 1);
        }
      }
      li:nth-child(5) {
        padding: 20px 0;
        span:nth-child(2) {
          margin-left: 120px;
          font-size: 20px;
          font-family: Songti SC;
          font-weight: 400;
          color: rgba(81, 81, 81, 1);
        }
      }
      li:nth-child(3) {
        padding: 15px 0;
      }
      li:nth-child(6) {
        padding: 15px 0;
      }
      li:nth-child(7) {
        padding: 5px 0;
        input {
          margin-left: 20px;
        }
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