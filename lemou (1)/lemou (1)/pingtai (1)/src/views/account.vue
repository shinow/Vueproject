<template>
  <div class="account">
    <div class="wrap">
      <div class="yonghu">
        <span>账户编号：</span>
        <el-input
          size="small"
          clearable
          @change="ACoot()"
          @keyup.enter.native="ACoot()"
          style="width:160px"
          v-model="accountId"
          placeholder="请输入内容"
        ></el-input>
        <span style="margin-left:30px">所属经销商编号：</span>
        <el-input
          size="small"
          clearable
          @change="ACoot()"
          @keyup.enter.native="ACoot()"
          style="width:160px"
          v-model="dealerCode"
          placeholder="请输入内容"
        ></el-input>
        <span style="margin-left:30px">所属用户编号：</span>
        <el-input
          size="small"
          clearable
          @change="ACoot()"
          @keyup.enter.native="ACoot()"
          style="width:160px"
          v-model="userCode"
          placeholder="请输入内容"
        ></el-input>
        <span style="margin-left:30px">备注：</span>
        <el-input
          size="small"
          clearable
          @change="ACoot()"
          @keyup.enter.native="ACoot()"
          style="width:160px"
          v-model="remarkA"
          placeholder="请输入内容"
        ></el-input>
         <span style="margin-left:30px">金额：</span>
        <el-input
          size="small"
          clearable
          @change="ACoot()"
          @keyup.enter.native="ACoot()"
          style="width:160px"
          v-model="amountD"
          placeholder="请输入内容"
        ></el-input>
        <div style="margin-top:20px">
       
        <!--  -->
        <span >状态：</span>
        <el-select
          style="width:160px;margin-left:30px"
          v-model="status"
          @change="ACoot()"
          size="small"
          placeholder="请选择状态"
        >
          <el-option

            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span style="margin-left:30px">账户类型：</span>
        <el-select
          style="width:160px;margin-left:50px"
          @keyup.enter.native="ACoot()"
          v-model="typeCode"
          size="small"
          @change="ACoot()"
          placeholder="请选择账户类型"
        >
          <el-option
            v-for="item in optionss"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        </div>
      </div>

      <div class="BTld">
        <el-button type="primary" @click="Search()" icon="el-icon-search ">搜索</el-button>
        <el-button type="success" @click="online()">一键上线</el-button>
        <el-button type="warning" @click="Offline()">一键下线</el-button>
      </div>
    </div>

    <div class="details">
      <el-table
        :max-height="700"
        :data="tableData"
        style="width:100%"
        ref="multipleTable"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        stripe
        border
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column align="center" prop="accountId" label="账户编号"></el-table-column>
        <el-table-column prop="dealerName" label="所属经销商" align="center"></el-table-column>
        <el-table-column prop="userName" label="用户名称" align="center"></el-table-column>
        <el-table-column prop="quota" label="剩余额度" align="center">
          <template slot-scope="scope">
            <span>{{(scope.row.quota)/100}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="typeCode" label="账户类型" align="center"></el-table-column>
        <el-table-column prop="name" width="200" show-overflow-tooltip label="备注" align="center"></el-table-column>
        <el-table-column prop="amount" align="center" label="金额">
          <template slot-scope="scope">
            <span>{{(scope.row.amount)/100}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="useQuota" align="center" label="今日已用额度">
          <template slot-scope="scope">
            <span>{{(scope.row.useQuota)/100}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span :style="{color:scope.row.Color}">{{scope.row.status}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="Editdes(scope.row.id)" type="primary" size="mini">测试</el-button>
            <el-button @click="Ediate(scope.row)" type="warning" size="mini">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="text-align:center;margin-top: 10px;">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>请输入测试金额：</span>
      <el-input style="width:160px" v-model="testPay" placeholder="请输入内容"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="Etest()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="手机扫描二维码" :visible.sync="dialogVisibleer" width="30%">
      <div style="margin:0 auto;text-align: center;">
        <div id="qrcode" style="margin: 0 auto;text-align: center;display: inline-block"></div>
        <div style="overflow:hidden">
          <a :href="PayUrl">
            <el-button style="margin-top:20px" type="warning">点击直接跳转</el-button>
          </a>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="Etester()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="Sedeatl" width="30%">
      <div style="margin:0 auto;text-align: center;;font-size:20px">
        <img :src="Tadetal.imageUrl" alt />
        <p style="margin-left:100px">姓名：{{Tadetal.name}}</p>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="SedeatlP" width="30%">
      <div style="margin:0 auto;text-align:center;font-size:20px">
        <p style="margin-left:100px">银行名称：{{Tadetal.bankName}}</p>
        <p style="margin-left:100px">银行编号：{{Tadetal.bankMark}}</p>
        <p style="margin-left:100px">银行卡号：{{Tadetal.cardNo}}</p>
        <p style="margin-left:100px">银行卡ID：{{Tadetal.cardId}}</p>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { AClist, Aaudit, ApayTest } from "@/api";
import QRCode from "qrcodejs2"; // 引入qrcode
export default {
  name: "account",
  data() {
    return {
      remarkA: "",
      flag: false,
      testPay: "",
      dialogVisible: false,
      dialogVisibleer: false,
      accountId: "",
      dealerCode: "",
      status: "",
      typeCode: "",
      userCode: "",
      idsarr: [],
      input: "",
      Sedeatl: false,
      SedeatlP: false,
      current: 1,
      Tadetal: "",
      size: 10,
      testID: "",
      total: 0,
      tableData: [],
      value: "",
      options: [
        {
          value: null,
          label: "请选择状态"
        },
        {
          value: 0,
          label: "关闭"
        },
        {
          value: 1,
          label: "开启"
        },
        {
          value: 2,
          label: "风控"
        }
      ],
      value1: "",
      amountD:"",
      optionss: [
        {
          value: null,
          label: "请选择账户类型"
        },
        {
          value: 0,
          label: "支付宝个码"
        },
        {
          value: 1,
          label: "微信个码"
        },
        {
          value: 2,
          label: "云闪付个码"
        },
        {
          value: 3,
          label: "支付宝商码"
        },
        {
          value: 4,
          label: "微信商码"
        },
        {
          value: 5,
          label: "银行卡"
        },
        {
          value: 6,
          label: "拼多多支付宝"
        },
        {
          value: 7,
          label: "拼多多微信"
        },
        {
          value: 8,
          label: "聚合码"
        },
        {
          value: 9,
          label: "支付宝固态码"
        }
      ],
      PayUrl: ""
    };
  },
  created() {
    this.ACoot();
  },
  methods: {
    Etester() {
      this.dialogVisibleer = false;
    },
    Ediate(row) {
      this.Tadetal = row;
      if (row.code == "3") {
        this.SedeatlP = true;
      } else {
        this.Sedeatl = true;
      }
    },
    Etest() {
      let pay = {
        id: this.testID,
        money: this.testPay
      };
      ApayTest(pay).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data);
          this.dialogVisible = false;
          this.dialogVisibleer = true;
          this.PayUrl = res.data.data.url;
          window.setTimeout(() => {
            document.getElementById("qrcode").innerHTML = "";
            new QRCode(
              document.getElementById("qrcode"),
              res.data.data.url // 二维码地址
            );
          }, 200);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    Editdes(id) {
      this.testID = id;
      this.dialogVisible = true;
    },
    handleSelectionChange(val) {
      this.idsarr = [];
      this.multipleSelection = val;
      val.forEach((item, index) => {
        this.idsarr.push(item.id);
      });
    },

    online() {
      if (this.idsarr == "") {
        this.$message.warning("请选择要上线的账户！");
        return;
      }
      this.$confirm("是否上线?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let par = {
            ids: this.idsarr,
            status: 1
          };
          Aaudit(par).then(res => {
            if (res.data.httpCode == 0) {
              console.log(res.data);
              this.ACoot();
              this.$message({
                type: "success",
                message: "已上线!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "已取消上线"
          });
        });
    },
    Offline() {
      if (this.idsarr == "") {
        this.$message.warning("请选择要下线的账户！");
        return;
      }
      this.$confirm("是否下线?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let par = {
            ids: this.idsarr,
            status: 0
          };
          Aaudit(par).then(res => {
            if (res.data.httpCode == 0) {
              console.log(res.data);
              this.ACoot();
              this.$message({
                type: "success",
                message: "已下线!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "已取消下线"
          });
        });
    },
    Search() {
      this.current = 1;
      this.ACoot();
    },
    ACoot() {
      //remarkA备注
      let par = {
        amount:this.amountD,
        name: this.remarkA,
        accountId: this.accountId,
        dealerCode: this.dealerCode, //所属经销商编号
        pageNum: this.current, //当前页数
        pageSize: this.size, //每页条数
        status: this.status, //账户状态 是否锁定（0锁定；1未锁定）
        typeCode: this.typeCode, //账户类型0支付宝个码，1微信个码，2云闪付个码，3支付宝商码，4微信商码，5银行卡
        userCode: this.userCode // 所属用户编号
      };
      AClist(par).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data.data);
          this.tableData = res.data.data;
          this.total = Number(res.data.total);
          this.tableData.forEach((item, index) => {
            item.Color = "black";
            if (item.code == 3) {
              item.name = item.bankName;
            }
            if (item.amount==""||item.amount==undefined) {
              item.amount=0
            }
            if (item.typeCode == "0") {
              item.typeCode = "支付宝个码";
            } else if (item.typeCode == "1") {
              item.typeCode = "微信个码";
            } else if (item.typeCode == "2") {
              item.typeCode = "云闪付个码";
            } else if (item.typeCode == "3") {
              item.typeCode = "支付宝商码";
            } else if (item.typeCode == "4") {
              item.typeCode = "微信商码";
            } else if (item.typeCode == "5") {
              item.typeCode = "银行卡";
            } else if (item.typeCode == "6") {
              item.typeCode = "拼多多支付宝";
            } else if (item.typeCode == "7") {
              item.typeCode = "拼多多微信";
            } else if (item.typeCode == "8") {
              item.typeCode = "聚合码";
            } else if (item.typeCode == "9") {
              item.typeCode = "支付宝固态码";
            }
            if (item.status == "0") {
              item.status = "关闭";
              item.Color = "black";
            } else if (item.status == "1") {
              item.status = "开启";
              item.Color = "green";
            } else if (item.status == "2") {
              item.status = "风控";
              item.Color = "red";
            }
          });
        }
      });
    },
    handleSizeChange(val) {
      this.size = val;
      this.current = 1;
      this.ACoot();
    },
    handleCurrentChange(val) {
      this.current = val;
      this.ACoot();
    }
  }
};
</script>
<style lang="less" scoped>
.account {
  overflow: hidden;
  .wrap {
    overflow: hidden;
    margin-top: 20px;
    .BTld {
      overflow: hidden;
      margin: 0 0 25px 0;
      float: right;
      margin-right: 200px;
    }
  }

  .details {
    font-size: 20px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: rgba(1, 1, 1, 1);
    line-height: 26px;
    margin-bottom: 30px;
    .block {
      position: fixed;
      right: 600px;
      bottom: 10px;
    }
  }
}
</style>