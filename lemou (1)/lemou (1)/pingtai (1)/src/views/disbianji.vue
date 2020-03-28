<template>
  <div class="disbianji">
    <div class="head">
      <span @click="distributor()">经销商列表 /</span>
      <span>编辑</span>
      <div class="wrap">
        <div class="zz">
          <ul>
            <li>
              <span>姓名：</span>
              <el-input
                size="small"
                style="width:160px;margin-left:83px"
                v-model="datas.name"
                placeholder="请输入内容"
              ></el-input>
            </li>
            <li>
              <span>账号：</span>
              <el-input
                :disabled="true"
                size="small"
                style="width:160px;margin-left:83px"
                v-model="datas.account"
                placeholder="请输入内容"
              ></el-input>
            </li>
            <li>
              <span>密码：</span>
              <button
                @click="chongz()"
                v-if="lan"
                style="width:160px;
height:35px;
background:rgba(88,104,217,1);
border-radius:4px;
margin-left:83px;
font-size:18px;
font-family:Songti SC;
font-weight:400;
color:rgba(255,255,255,1);"
              >重置密码</button>
              <button
                v-if="chong"
                style="width:160px;
height:35px;
background:gray;
border-radius:4px;
margin-left:83px;
font-size:18px;
font-family:Songti SC;
font-weight:400;
color:rgba(255,255,255,1);"
              >重置密码</button>
            </li>
            <li>
              <span>权重：</span>
              <el-input
                size="small"
                style="width:160px;
                  margin-left:83px"
                v-model="datas.weight"
                placeholder="请输入内容"
              ></el-input>
            </li>

            <li>
              <span>状态：</span>
              <el-select
                style="width:160px;margin-left:83px"
                v-model="datas.locked"
                size="small"
                @change="zhuangt(datas.locked)"
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
              <span>专属邀请码：</span>
              <span style="font-size:16px;margin-left:20px">{{datas.invitationCode}}</span>
              <button
                @click="chongzD()"
                v-if="lanD"
                style="width:80px;height:30px;
                   margin-left:-5.5px; 
background:rgba(88,104,217,1);
border-radius:0px 4px 4px 0px;
font-size:13px;
color:rgba(255,255,255,1);"
              >重置邀请码</button>
              <button
                v-if="chongD"
                style="width:80px;height:30px;
                   margin-left:-5.5px; 
background:gray;
border-radius:0px 4px 4px 0px;
font-size:13px;
color:rgba(255,255,255,1);"
              >重置邀请码</button>
            </li>
            <li>
              <span>分润：</span>
              <el-input
                :disabled="true"
                size="small"
                style="width:160px;
                  margin-left:83px"
                v-model="datas.rating"
                placeholder="请输入内容"
              ></el-input>
            </li>
            <li>
              <span>描述：</span>
              <el-input
                style="width:200px;margin-left:90px"
                type="textarea"
                :rows="5"
                placeholder="请输入内容"
                v-model="datas.remark"
              ></el-input>
            </li>
          </ul>
        </div>
        <div class="yy">
          <ul>
            <li v-for="(item,index) in arrList" :key="index">
              <span>{{item.name}}：</span>
              <el-select
                style="width:160px; float:right;margin-right:60px"
                v-model="item.status"
                placeholder="请选择"
                @change="changeSelOption(index,item.id,item.status)"
              >
                <el-option
                  v-for="item in optionsArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </li>
          </ul>
        </div>
        <button class="btn" @click="update()">确认修改</button>
      </div>
    </div>
  </div>
</template>
<script>
import { Deadetail, Deaupdate } from "@/api";
export default {
  name: "disbianji",
  data() {
    return {
      arrList: [],
      lan: true,
      lanD: true,
      optionsArr: [
        {
          value: 0,
          label: "开启"
        },
        {
          value: 1,
          label: "关闭"
        }
      ],
      ids: "",
      id: "",
      chong: false,
      chongD: false,
      repeat: true,
      zheg: false,
      value: "",
      textarea: "",
      input: "",
      datas: [],
      chongzz: "",
      yaioq: "",
      options: [
        {
          value: 0,
          label: "开启"
        },
        {
          value: 1,
          label: "关闭"
        }
      ],
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
    this.detail();
  },
  methods: {
    changeSelOption(index, id, status) {
      this.arrList[index].status = status;
      //最后把这 this.arrList 传给后台就行了 id是不会改变的 变得之有状态 只操作状态就行
    },
    detail() {
      Deadetail(this.id).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res);
          res.data.data.aisles.forEach((item, index) => {
            if (item.status == 0) {
              item.status = "开启";
            }
            if (item.status == 1) {
              item.status = "关闭";
            }
          });
          if (res.data.data.dealer.locked == 0) {
            res.data.data.dealer.locked = "关闭";
          }
          if (res.data.data.dealer.locked == 1) {
            res.data.data.dealer.locked = "开启";
          }
          this.datas = res.data.data.dealer;
          this.arrList = res.data.data.aisles;
        }
      });
    },
    chongzD() {
      this.$confirm("是否重置邀请码?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "重置邀请码成功!"
          });
          this.yaioq = true;
          this.lanD = false;
          this.chongD = true;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置邀请码"
          });
          this.yaioq = false;
        });
    },
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
          this.chongzz = true;
          this.lan = false;
          this.chong = true;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置密码"
          });
          this.chongzz = false;
        });
    },
    update() {
      if (this.repeat == true) {
        let arr = [];
        this.arrList.forEach((item, index) => {
          if (item.status == "开启") {
            item.status = 0;
          }
          if (item.status == "关闭") {
            item.status = 1;
          }
          let obj = {
            id: "",
            status: ""
          };

          obj = {
            id: item.id,
            status: item.status
          };
          arr.push(obj);
        });
        if (
          this.chongzz === null ||
          this.chongzz === undefined ||
          this.chongzz === ""
        ) {
          this.chongzz = false;
        }
        if (
          this.yaioq === null ||
          this.yaioq === undefined ||
          this.yaioq === ""
        ) {
          this.yaioq = false;
        }
        if (this.datas.locked == "关闭") {
          this.datas.locked = 0;
        } else if (this.datas.locked == "开启") {
          this.datas.locked = 1;
        }
        let par = {
          account: this.datas.account,
          aisles: arr,
          codeFlag: this.yaioq,
          id: this.id,
          locked: this.datas.locked,
          name: this.datas.name,
          pwdFlag: this.chongzz,
          rating: this.datas.rating,
          remark: this.datas.remark,
          weight: Number(this.datas.weight)
        };
        Deaupdate(par).then(res => {
          if (res.data.httpCode == 0) {
            console.log(res);
            this.repeat = false;
            this.$router.push({
              name: "distributor",
              query: {
                id: this.$route.query.yemian
              }
            });
          }
        });
      }
    },
    enter() {
      this.zheg = false;
    },
    distributor() {
      this.$router.push({
        name: "distributor",
        query: {
          id: this.$route.query.yemian
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.disbianji {
  overflow: hidden;
  .head {
    margin-top: 10px;
    margin-left: 72px;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(24, 24, 24, 1);

    .wrap {
      margin: 15px 0 0 52px;
      width: 1136px;
      // height: 747px;
      border: 1px solid rgba(112, 112, 112, 1);
      border-radius: 16px;
      font-size: 20px;
      font-family: Songti SC;
      font-weight: 400;
      color: rgba(35, 35, 35, 1);
      .zz {
        float: left;
        ul {
          width: 400px;
          // border: 1px solid red;
          margin: 39px 0 0 153px;
          li {
            margin-top: 26px;
          }
          li:nth-child(1) {
            margin-top: 0;
          }
          li:nth-child(8) {
            span {
              float: left;
            }
            .qin {
              margin-left: 150px;
              width: 242px;
              height: 125px;
              border: 1px solid rgba(164, 164, 164, 1);
              border-radius: 4px;
            }
          }
        }
      }
      .yy {
        float: left;
        width: 500px;
        // border: 1px solid red;
        margin: 10px 0 0 53px;
        ul {
          // border: 1px solid red;
          li {
            //  border: 1px solid red;
            margin-top: 20px;
          }
        }
      }
      .btn {
        // margin-top: 20px;
        margin: 35px 0 30px 455px;
        width: 246px;
        height: 49px;
        background: rgba(71, 212, 185, 1);
        border-radius: 6px;
        font-size: 22px;
        font-family: Songti SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>