<template>
  <div class="tbcz">
          <div class="btnw">
            <button @click="commoditylb()">日常任务商品</button>
            <button @click="tbrenw()">淘宝任务商品</button>
             <button>店铺充值记录</button>
            <button @click="tbdp()">店铺列表</button>
          </div>
          <div class="yonghu">
            <span>店铺：</span>
            <el-select style="width:100px" v-model="value2" size="small" placeholder="请选择">
              <el-option
                v-for="item in optionss"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span>所属经销商：</span>
            <el-select style="width:100px" v-model="value3" size="small" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span>充值日期：</span>
            <el-date-picker
                v-model="value4"
                size="small"
                type="datetimerange"
                :picker-options="pickerOptions2"
                range-separator="至"
                start-placeholder="请选择开始时间"
                end-placeholder="请选择结束时间"
                align="right"
              ></el-date-picker>
          </div>
          <div class="btn">
            <button>搜索</button>
          </div>
          <div class="details">
            <el-table style="width:86.8%" :data="tableData" stripe>
              <el-table-column align="center" prop="name" label="店铺名称" width="250"></el-table-column>
              <el-table-column prop="jingx" label="所属经销商" align="center" width="250"></el-table-column>
              <el-table-column prop="jine" label="充值金额" align="center" width="230"></el-table-column>
              <el-table-column prop="time" align="center" label="日期" width="290"></el-table-column>
              <el-table-column prop="caozuo" label="操作" align="center" width="352">
                <template slot-scope="scope">
                  <el-button
                    style="background:rgba(255,103,82,1);
border-radius:4px;
font-size:14px;
padding: 3px 12px;
color:rgba(254,254,254,1);"
                    @click="handleClick(scope.row)"
                    type="text"
                    size="small"
                  >待审核</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
         <div v-if="shanchu" class="shanchu">
            <div class="jues">
              <p>是否通过审核</p>
              <span @click="yes()">是</span>
              <span @click="no()">否</span>
            </div>
          </div>
  </div>
</template>
<script>
export default {
  name: "tbcz",
  data() {
    return {
      jin:false,
      shanchu:false,
      input: "",
      value: true,
      // imgg: require("../assets/tieba-4 拷贝.png"),
      tableData: [
        {
          name: "名利马丁靴旗舰店",
          jingx: "管都",
          jine: "22000",
          time: "2019-08-21"
        }
      ],
      value2: "",
      optionss: [
        {
          value: "选项1",
          label: "请选择"
        },
        {
          value: "选项2",
          label: "岘港旗舰店"
        }
      ],
       value3: "",
      options: [
        {
          value: "选项1",
          label: "请选择"
        },
        {
          value: "选项2",
          label: "张三"
        }
      ]
    };
  },
  methods: {
    tbxinz(){
      this.$router.push({
        name:"tbxinz"
      })
    },
    commoditylb(){
      this.$router.push({
        name:"commoditylb"
      })
    },
    tbdp(){
      this.$router.push({
        name:"tbdp"
      })
    },
    guan(){
      this.jin=false
    },
    handleClick2(){
      this.$router.push({
        name:"tbshenh"
      })
      // this.jin=true
    },
    handleClick1(){
       this.$router.push({
        name:"tbbj"
      })
    },
    clbxinz(){
      this.$router.push({
        name:"clbxinz"
      })
    },
    handleClick(){
      this.$confirm('是否通过审核?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '通过审核!'
          });
          // this.yes();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '未通过审核'
          });          
        });
      // this.shanchu=true
    },
    yes(){
      this.shanchu=false
    },
     no(){
      this.shanchu=false
    },
    commoditydd() {
      this.$router.push({
        name: "commoditydd"
      });
    },
    user() {
      this.$router.push({
        name: "user"
      });
    },
    deal() {
      this.$router.push({
        name: "deal"
      });
    },
    increasebg() {
      this.$router.push({
        name: "increasebg"
      });
    },
    quota() {
      this.$router.push({
        name: "quota"
      });
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
    user() {
      this.$router.push({
        name: "user"
      });
    },
    tbrenw(){
      this.$router.push({
        name:"tbrenw"
      })
    },
    parameter() {
      this.$router.push({
        name: "parameter"
      });
    },
    system() {
      this.$router.push({
        name: "system"
      });
    },
    account() {
      this.$router.push({
        name: "account"
      });
    },
    reflect() {
      this.$router.push({
        name: "reflect"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.jinj{
  z-index: 5;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  .jin{
    position: relative;
    margin: 274px 0 0 521px;
width:841px;
height:530px;
background:rgba(255,255,255,1);
border-radius:12px;
ul{
  position: absolute;
  margin: 52px 0 0 69px;
  width:702px;
height:316px;
// border:1px solid rgba(164,164,164,1);
border-radius:12px;
li{
  // border:1px solid rgba(164,164,164,1);
  border-radius:12px;
  span{
    // border-radius:12px;
    text-align: center;
    line-height: 104px;
    font-size:24px;
font-family:Source Han Sans CN;
font-weight:400;
color:rgba(45,45,45,1);
    box-sizing:border-box;
    float: left;
  width: 140px;
  border:1px solid rgba(164,164,164,1);
  height: 104px;
  
  }
}
}
button{
  width:238px;
height:58px;
background:rgba(71,212,185,1);
border-radius:4px;
font-size:24px;
font-family:Songti SC;
font-weight:400;
color:rgba(255,255,255,1);
position: absolute;
bottom: 52px;
left:302px
}
  }
}
.shanchu {
  z-index: 5;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  .jues {
    position: relative;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    margin: 285px 0 0 695px;
    width: 796px;
    height: 405px;
    font-size: 26px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(35, 35, 35, 1);
    p {
      margin-top: 65px;
      position: absolute;
      left: 308px;
    }
    span:nth-child(2) {
      position: absolute;
      margin: 287px 0 0 96px;
    }
    span:nth-child(3) {
      position: absolute;
      margin: 287px 0 0 675px;
    }
  }
}
.el-header {
 background: rgba(0, 89, 165, 1);
  opacity: 0.53;
  height: 80px;
  span:nth-child(1) {
    float: left;
    font-size: 22px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 26px;
    margin: 15px 0 0 46px;
  }
  .rightt {
    float: right;
    margin-right: 140px;
    margin-top: 20px;
    img {
      float: left;
    }
    span:nth-child(2) {
      float: left;
      margin-left: 8px;
      margin-top: 3px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
    span:nth-child(3) {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      float: left;
      margin-left: 15px;
      margin-top: 2px;
    }
  }
}
.el-aside {
  background: rgb(56, 71, 98);
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  ul {
    li {
      width: 212px;
      height: 54px;
      margin: 15px 0 0 24px;
      img {
       width: 29px;
        height: 30px;
        float: left;
        margin: 14px 0 0 45px;
      }
      span {
        float: left;
        margin: 20px 0 0 20px;
        font-family: MicrosoftYaHei;
        color: rgba(255, 255, 255, 1);
      }
    }
    li:nth-child(1) {
      margin-top: 40px;
    }
    li:nth-child(7) {
      background-color: rgb(37, 118, 251);
    }
  }
}
.tbcz {
  height: 100vh;
  background: rgba(247, 247, 247, 1);
  padding: 55px 0 0 0;
  .btnw {
    margin-left: 72px;
    button:nth-child(1) {
      width: 123px;
      height: 49px;
      background: rgba(18, 229, 0, 1);
      border-radius: 9px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      color: rgba(255, 255, 255, 1);
      line-height: 19px;
    }
    button:nth-child(2) {
      margin-left: 50px;
      width: 123px;
      height: 49px;
      background: rgba(254, 154, 13, 1);
      border-radius: 8px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      color: rgba(255, 255, 255, 1);
      line-height: 19px;
    }
    button:nth-child(3) {
      margin-left: 50px;
      width: 123px;
      height: 49px;
     background:rgba(249,65,65,1);
      border-radius: 8px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      color: rgba(255, 255, 255, 1);
      line-height: 19px;
    }
    button:nth-child(4) {
      margin-left: 50px;
      width: 123px;
      height: 49px;
     background:rgba(79,202,159,1);
      border-radius: 8px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      color: rgba(255, 255, 255, 1);
      line-height: 19px;
    }
  }
  // .wrap {
  .yonghu {
     margin-left: 72px;
    margin-top: 50px;
    font-size: 20px;
    font-family: Songti SC;
    font-weight: 400;
    color: rgba(1, 1, 1, 1);
    line-height: 26px;
    span:nth-child(3) {
      margin-left: 60px;
    }
    span:nth-child(5) {
      margin-left: 60px;
    }
    span:nth-child(7) {
      margin-left: 60px;
    }
  }
  .btn {
    margin: 50px 0 0 1150px;
    button:nth-child(1) {
      color: white;
      width: 110px;
      height: 42px;
      background: rgba(88, 104, 217, 1);
      border-radius: 4px;
    }
    button:nth-child(2) {
      color: white;
      width: 110px;
      height: 42px;
      background: rgba(70, 212, 186, 1);
      border-radius: 4px;
      margin-left: 22px;
    }
  }
  .details {
     margin-left: 72px;
    margin-top: 85px;
    font-size: 20px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: rgba(1, 1, 1, 1);
    line-height: 26px;
  }
  // }
}
// .yonghu {
//       font-size: 20px;
//       font-family: Songti SC;
//       font-weight: 400;
//       color: rgba(1, 1, 1, 1);
//       line-height: 26px;
//       span:nth-child(3) {
//         margin-left: 60px;
//       }
//       span:nth-child(5) {
//         margin-left: 60px;
//       }
//       span:nth-child(7) {
//         margin-left: 60px;
//       }
//     }
//     .btn {
//       margin: 80px 0 0 1120px;
//       button:nth-child(1) {
//         color: white;
//         width: 110px;
//         height: 42px;
//         background: rgba(88, 104, 217, 1);
//         border-radius: 4px;
//       }
//       button:nth-child(2) {
//         color: white;
//         width: 110px;
//         height: 42px;
//         background: rgba(70, 212, 186, 1);
//         border-radius: 4px;
//         margin-left: 22px;
//       }
//     }
//     .details {
//       margin-top: 85px;
//       font-size: 20px;
//       font-family: Adobe Heiti Std;
//       font-weight: normal;
//       color: rgba(1, 1, 1, 1);
//       line-height: 26px;
//     }
</style>
