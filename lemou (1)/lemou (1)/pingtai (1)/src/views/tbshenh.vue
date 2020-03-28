<template>
  <div class="tbshenh">
          <div class="head">
            <span @click="tbrenw()">淘宝商品列表 / </span>
            <span> 审核口令  </span>
           
          </div>
          <div class="yonghu">
            <span>用户ID：</span>
            <el-input size="small" style="width:160px" v-model="input" placeholder="请输入内容"></el-input>
            <span>用户名：</span>
            <el-input size="small" style="width:160px" v-model="input" placeholder="请输入内容"></el-input>
            <span>经销商ID：</span>
            <el-input size="small" style="width:160px" v-model="input" placeholder="请输入内容"></el-input>
            
          </div>
          <div class="shij">
            <span>时间：</span>
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
              <span>所属码商：</span>
            <el-select style="width:120px" v-model="value2" size="small" placeholder="请选择">
              <el-option
                v-for="item in optionss"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="btn">
            <button>搜索</button>
          </div>
          <div class="details">
            <el-table style="width:89%" :data="tableData" stripe  border>
              <el-table-column align="center" prop="name" label="用户名" width="220"></el-table-column>
              <el-table-column prop="mashang" label="所属码商" align="center" width="220"></el-table-column>
              <el-table-column prop="koul" label="吱口令" align="center" width="220"></el-table-column>
              <el-table-column prop="time" align="center" label="生成日期" width="290"></el-table-column>
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
  name: "tbshenh",
  data() {
    return {
      jin:false,
      shanchu:false,
      input: "",
      value: true,
      // imgg: require("../assets/tieba-4 拷贝.png"),
      tableData: [
        {
          
          name: "张潇洒",
          mashang: "王小二",
          koul: "MaGbjil3kj3",
          time: "2019-08-19"
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
          label: "张三也"
        },
         {
          value: "选项3",
          label: "李希跟"
        },
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
    guan(){
      this.jin=false
    },
    handleClick2(){
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
    tbrenw(){
      this.$router.push({
        name:"tbrenw"
      })
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
.tbshenh{
  height: 100vh;
  background: rgba(247, 247, 247, 1);
  padding: 55px 0 0 0;
  .head {
    margin-left: 72px;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(24, 24, 24, 1);
  }
  .shij{
     margin-left: 72px;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(24, 24, 24, 1);
    margin-top: 30px;
    span:nth-child(3){
      margin-left: 50px;
    }
  }
  .yonghu {
     margin-left: 72px;
    margin-top: 50px;
    font-size: 20px;
    font-family: Songti SC;
    font-weight: 400;
    color: rgba(1, 1, 1, 1);
    line-height: 26px;
    span:nth-child(3) {
      margin-left: 100px;
    }
    span:nth-child(5) {
      margin-left: 100px;
    }
    span:nth-child(7) {
      margin-left: 100px;
    }
  }
  .btn {
    margin: 50px 0 0 1070px;
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
}

</style>
