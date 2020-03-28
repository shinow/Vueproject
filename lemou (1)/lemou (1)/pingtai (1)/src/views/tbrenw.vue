<template>
  <div class="tbrenw">
          <div class="btnw">
            <button @click="commoditylb()">日常任务商品</button>
            <button>淘宝任务商品</button>
             <button @click="tbcz()">店铺充值记录</button>
            <button @click="tbdp()">店铺列表</button>
          </div>
          <div class="yonghu">
            <span>商品ID：</span>
            <el-input size="small" style="width:160px" v-model="input" placeholder="请输入内容"></el-input>
            <span>状态：</span>
            <el-select style="width:100px" v-model="value2" size="small" placeholder="开启">
              <el-option
                v-for="item in optionss"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span>名称：</span>
            <el-input size="small" style="width:160px" v-model="input" placeholder="请输入内容"></el-input>
          </div>
          <div class="btn">
            <button>搜索</button>
            <button @click="tbxinz()">+ 新增</button>
          </div>
          <div class="details">
            <el-table style="width:84.1%" :data="tableData" stripe  border>
              <el-table-column align="center" prop="ID" label="ID" width="100"></el-table-column>
              <el-table-column prop="name" label="名称" align="center" width="130"></el-table-column>
              <el-table-column prop="jiag" label="价格" align="center" width="140"></el-table-column>
              <el-table-column prop="lianj" align="center" label="链接" width="290"></el-table-column>
              <el-table-column prop="dianp" align="center" label="店铺" width="175"></el-table-column>
              <el-table-column prop="shangj" align="center" label="上下架" width="140">
                <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
              </el-table-column>
              <el-table-column prop="caozuo" label="操作" align="center" width="352">
                <template slot-scope="scope">
                  <el-button
                    style="background:rgba(255,103,82,1);
border-radius:4px;
font-size:14px;
padding: 1px 12px;
color:rgba(254,254,254,1);"
                    @click="handleClick(scope.row)"
                    type="text"
                    size="small"
                  >删除</el-button>

                  <el-button
                    style="background:rgba(255,103,82,1);
border-radius:4px;
font-size:14px;
padding: 1px 12px;
color:rgba(254,254,254,1);"
                    @click="handleClick1(scope.row)"
                    type="text"
                    size="small"
                  >编辑</el-button>
                  <!-- <img src="../assets/tieba-4 拷贝.png" alt=""> -->
                  <el-button
                    style="background:rgba(255,103,82,1);
border-radius:4px;
font-size:14px;
padding: 1px 12px;
color:rgba(254,254,254,1);"
                    @click="handleClick2(scope.row)"
                    type="text"
                    size="small"
                  >审核口令</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
         <div v-if="shanchu" class="shanchu">
            <div class="jues">
              <p>是否删除该商品</p>
              <span @click="yes()">是</span>
              <span @click="no()">否</span>
            </div>
          </div>
          <!-- <div v-if="jin" class="jinj">
            <div class="jin">
              <ul>
                <li>
              <span>单元(元)</span>
              <span>支付宝</span>
              <span>微信</span>
              <span>云闪付</span>
              <span>银行卡</span>
                </li>
                <li>
                  <span>一级用户</span>
              <span>99.7</span>
              <span>99.7</span>
              <span>99.8</span>
              <span>99.9</span>
                </li>
                <li>
                   <span>一级用户</span>
              <span>99.7</span>
              <span>99.7</span>
              <span>99.8</span>
              <span>99.9</span>
                </li>
              </ul>
               <button @click="guan()">
              关闭
            </button>
            </div>
           
          </div> -->
  </div>
</template>
<script>
export default {
  name: "tbrenw",
  data() {
    return {
      jin:false,
      shanchu:false,
      input: "",
      value: true,
      // imgg: require("../assets/tieba-4 拷贝.png"),
      tableData: [
        {
          ID: "567",
          name: "贴吧点赞",
          jiag: "130.00",
          lianj: "http://taobao/sfjnvfvvv.com",
          dianp: "分力好鞋业旗舰店"
        }
      ],
      value2: "",
      optionss: [
        {
          value: "选项1",
          label: "开启"
        },
        {
          value: "选项2",
          label: "关闭"
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
      this.$confirm('是否删除该商品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.yes();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      // this.shanchu=true
    },
    yes(){
      // this.shanchu=false
    },
     no(){
      // this.shanchu=false
    },
    commoditydd() {
      this.$router.push({
        name: "commoditydd"
      });
    },
    tbcz(){
      this.$router.push({
        name:"tbcz"
      })
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
  background: rgb(37, 118, 251);
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
.tbrenw {
  height: 100vh;
  background: rgba(247, 247, 247, 1);
  padding: 55px 0 0 72px;
  .btnw {
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
    margin: 50px 0 0 1020px;
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
