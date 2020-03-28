<template>
  <div class="zhuangt">
          <div class="wrap">
            <div class="head">
              <span @click="user()">用户列表 /</span>
              <span @click="actdetails()">账号详情</span>
              <span>/ 编辑账户状态</span>
            </div>
            <div class="cont">
              <p>账户状态：</p>
              <ul>
                <li v-for="(item,index) in arrList" :key="index">
                  <span>{{item.typeCode}}：</span>
                  <el-select
                    style="width:160px; float:right;margin-right:100px;"
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

              <button @click="update()">保存</button>
            </div>
          </div>
  </div>
</template>
<script>
import {commqueryAccount,CommupdateAccount} from '@/api'
export default {
  name: "zhuangt",
  data() {
    return {
      arrList: [
        {
          //这个改成赋值后台给你的数据
          name: "w",
          id: "1",
          status: 0
        }
      ],
      lan: true,
      optionsArr: [
        {
          value: 1,
          label: "开启"
        },
        {
          value: 0,
          label: "关闭"
        }
      ],
      id: "",
      value: "",
    };
  },
  created() {
    this.id = this.$route.query.ids;
    this.queryAccount();
  },
  methods: {
    changeSelOption(index, id, status) {
      this.arrList[index].status = status;
      //最后把这 this.arrList 传给后台就行了 id是不会改变的 变得之有状态 只操作状态就行
    },
    queryAccount() {
      commqueryAccount(this.id).then(res=>{
          if (res.data.httpCode == 0) {
            console.log(res.data);
            res.data.data.forEach((item, index) => {
              if (item.typeCode == 0) {
                item.typeCode = "支付宝个码";
              } else if (item.typeCode == 1) {
                item.typeCode = "微信个码";
              } else if (item.typeCode == 2) {
                item.typeCode = "云闪付个码";
              } else if (item.typeCode == 3) {
                item.typeCode = "支付宝商码";
              } else if (item.typeCode == 4) {
                item.typeCode = "微信商码";
              }
              if (item.status == 1) {
                item.status = "开启";
              } else if (item.status == 0) {
                item.status = "关闭";
              }
            });
            this.arrList = res.data.data;
          }
     })
    },
    update() {
      let arr = [];
      this.arrList.forEach((item, index) => {
        if (item.status == "开启") {
          item.status = 1;
        }
        if (item.status == "关闭") {
          item.status = 0;
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
      let par={
        accounts: arr
      }
      CommupdateAccount(par).then(res=>{
         if (res.data.httpCode == 0) {
            console.log(res.data);
            this.$router.push({
              name: "actdetails",
              query: {
                ids: this.id
              }
            });
          }
      })
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
    },
  }
};
</script>
<style lang="less" scoped>
.zhuangt{
  overflow: hidden;
  .wrap {
    margin: 0 0 0 79px;
    .head {
      margin-top: 20px;
      span {
        font-size: 20px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(24, 24, 24, 1);
      }
    }
    .cont {
      // margin: 80px 0 0 120px;
      margin: 30px 0 0 200px;
      width: 833px;
      // height: 648px;
      border: 1px solid rgba(112, 112, 112, 1);
      border-radius: 16px;
      p {
        margin: 30px 0 0 50px;
        font-size: 25px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(24, 24, 24, 1);
      }
      ul {
        width: 500px;
        margin: 20px 0 0 190px;
        // border: 1px solid red;
        li {
          font-size: 20px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          margin-top: 55px;
          // border: 1px solid red;
        }
        li:nth-child(1) {
          margin-top: 40px;
        }
      }
      button {
        color: white;
        width: 150px;
        height: 42px;
        background: rgba(88, 104, 217, 1);
        border-radius: 4px;
        margin: 50px 0 50px 380px;
      }
    }
  }
}
</style>