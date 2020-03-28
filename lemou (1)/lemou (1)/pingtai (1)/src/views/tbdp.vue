<template>
  <div class="tbdp">
    <div class="btnw">
      <button @click="commoditylb()">日常任务商品</button>
      <button @click="tbrenw()">淘宝任务商品</button>
      <button @click="tbcz()">店铺充值记录</button>
      <button>店铺列表</button>
    </div>
    <div class="btn">
      <span>店铺可用额度：100，000</span>
      <button @click="tbdpxz()">+新增店铺</button>
      <button @click="tbdpxz()">充值</button>
    </div>
    <div class="details">
      <el-table style="width:89%" :data="tableData" stripe border>
        <el-table-column prop="name" label="名称" align="center" width="220"></el-table-column>
        <el-table-column prop="wangw" label="旺旺号" align="center" width="140"></el-table-column>
        <el-table-column prop="dizhi" align="center" label="地址" width="280"></el-table-column>
        <el-table-column prop="fah" align="center" label="发货信息" width="225"></el-table-column>
        <el-table-column prop="shenh" align="center" label="审核状态" width="140"></el-table-column>
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
            >授权</el-button>
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
           
    </div>-->
  </div>
</template>
<script>
export default {
  name: "tbdp",
  data() {
    return {
      jin: false,
      shanchu: false,
      input: "",
      value: true,
      // imgg: require("../assets/tieba-4 拷贝.png"),
      tableData: [
        {
          name: "吉吉哦哦司法 旗舰店",
          wangw: "啦啦小魔笛",
          dizhi: "http://taobao/sfjnvfvvv.com",
          fah: "浙江杭州江干区新药国际302是GV是是发深V.",
          shenh: "未通过"
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
    tbrenw() {
      this.$router.push({
        name: "tbrenw"
      });
    },
    tbdpxz() {
      this.$router.push({
        name: "tbdpxz"
      });
    },
    tbxinz() {
      this.$router.push({
        name: "tbxinz"
      });
    },
    commoditylb() {
      this.$router.push({
        name: "commoditylb"
      });
    },
    guan() {
      this.jin = false;
    },
    handleClick2() {
      // this.$router.push({
      //   name:"tbshenh"
      // })
      // this.jin=true
    },
    handleClick1() {
      this.$router.push({
        name: "tbbj"
      });
    },
    clbxinz() {
      this.$router.push({
        name: "clbxinz"
      });
    },
    handleClick() {
      this.$confirm("是否删除该角色?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      // this.shanchu=true
    },
    commoditydd() {
      this.$router.push({
        name: "commoditydd"
      });
    },
    tbcz() {
      this.$router.push({
        name: "tbcz"
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
.jinj {
  z-index: 5;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  .jin {
    position: relative;
    margin: 274px 0 0 521px;
    width: 841px;
    height: 530px;
    background: rgba(255, 255, 255, 1);
    border-radius: 12px;
    ul {
      position: absolute;
      margin: 52px 0 0 69px;
      width: 702px;
      height: 316px;
      // border:1px solid rgba(164,164,164,1);
      border-radius: 12px;
      li {
        // border:1px solid rgba(164,164,164,1);
        border-radius: 12px;
        span {
          // border-radius:12px;
          text-align: center;
          line-height: 104px;
          font-size: 24px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(45, 45, 45, 1);
          box-sizing: border-box;
          float: left;
          width: 140px;
          border: 1px solid rgba(164, 164, 164, 1);
          height: 104px;
        }
      }
    }
    button {
      width: 238px;
      height: 58px;
      background: rgba(71, 212, 185, 1);
      border-radius: 4px;
      font-size: 24px;
      font-family: Songti SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      position: absolute;
      bottom: 52px;
      left: 302px;
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
.tbdp {
  height: 100vh;
  background: #f7f7f7;
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
      background: rgba(249, 65, 65, 1);
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
      background: rgba(79, 202, 159, 1);
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
    //  margin-left: 72px;
    margin: 50px 0 0 72px;
    span {
      font-size: 20px;
      font-family: Songti SC;
      font-weight: 500;
      color: black;
    }
    button:nth-child(2) {
      margin-left: 820px;
      color: white;
      width: 110px;
      height: 42px;
      background: rgba(88, 104, 217, 1);
      border-radius: 4px;
    }
    button:nth-child(3) {
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
