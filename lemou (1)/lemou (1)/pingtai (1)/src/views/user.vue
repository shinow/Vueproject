<template>
  <div class="user">
    <div class="wrap">
      <div class="yonghu">
        <span>用户ID：</span>
        <el-input
          size="small"
          @change="Administrators()"
          clearable
          @keyup.enter.native="Administrators()"
          style="width:160px"
          v-model="accountId"
          placeholder="请输入内容"
        ></el-input>
        <span>所属经销商：</span>
        <el-input
          size="small"
          clearable
          @change="Administrators()"
          @keyup.enter.native="Administrators()"
          style="width:160px"
          v-model="dealerName"
          placeholder="请输入内容"
        ></el-input>
        <span>描述：</span>
        <el-input
          size="small"
          clearable
          @change="Administrators()"
          @keyup.enter.native="Administrators()"
          style="width:160px"
          v-model="remark"
          placeholder="请输入内容"
        ></el-input>
        <span>状态：</span>
        <el-select
          style="width:160px"
          v-model="value"
          size="small"
          @change="Administrators()"
          placeholder="请选择状态"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span>姓名：</span>
        <el-input
          clearable
          @change="Administrators()"
          @keyup.enter.native="Administrators()"
          size="small"
          style="width:160px"
          v-model="userName"
          placeholder="请输入内容"
        ></el-input>
      </div>

      <div class="BTld">
        <el-button
          type="warning"
          :icon="power.liushui.iconcls"
          v-if="power.liushui.permission"
          @click="Lookwa()"
        >{{power.liushui.menuName}}</el-button>
        <!--         
        <el-button type="warning" @click="Lookwa()" icon="el-icon-search ">查看用户流水</el-button>-->
        <el-button type="primary" @click="Search()" icon="el-icon-search ">搜索</el-button>
      </div>
    </div>
    <div class="details">
      <el-table
        style="width:100%"
        @row-click="showRow"
        :max-height="700"
        :data="tableData"
        stripe
        border
      >
        <el-table-column label="操作" align="center" width="70">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="accountId" label="ID" width="60"></el-table-column>
        <el-table-column prop="account" show-overflow-tooltip label="账号" align="center"></el-table-column>
        <el-table-column prop="userName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="userType" label="等级" align="center"></el-table-column>
        <el-table-column prop="dealerName" align="center" label="所属经销商"></el-table-column>
        <el-table-column prop="locked" label="状态" align="center"></el-table-column>
        <el-table-column prop="totalMoney" align="center" label="今日进货">
          <template slot-scope="scope">
            <span>{{(scope.row.totalMoney)/100}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalQuota" label="今日额度" align="center">
          <template slot-scope="scope">
            <span>{{(scope.row.totalQuota)/100}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalSum" align="center" label="今日成交">
          <template slot-scope="scope">
            <span>{{(scope.row.totalSum)/100}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalEarnings" label="总收益" align="center">
          <template slot-scope="scope">
            <span>{{(scope.row.totalEarnings)/100}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="money" align="center" label="金额"></el-table-column>
        <el-table-column prop="remark" label="描述" align="center"></el-table-column>
        <el-table-column prop="cuozuo" align="center" label="操作" width="140">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row,scope.row.id)" type="warning" size="mini">编辑详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="text-align:center;margin-top: 10px;">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="current"
          :page-sizes="[10, 20, 50,100]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <!-- --------------------------------------------------- -->
    <el-dialog :visible.sync="dialogVisibleD" @close="closeL" width="80%">
      <span>动作：</span>
      <el-select
        style="width:160px"
        v-model="actionD"
        @change="dealerTransaction()"
        size="small"
        placeholder="请选择状态"
      >
        <el-option
          v-for="item in optionsD"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span style="margin-left:30px">类型：</span>
      <el-select
        style="width:160px"
        v-model="typeD"
        @change="dealerTransaction()"
        size="small"
        placeholder="请选择状态"
      >
        <el-option
          v-for="item in optionsType"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span style="margin-left:30px">备注：</span>
      <el-input
        size="small"
        style="width:200px"
        @change="dealerTransaction()"
        @keyup.enter.native="dealerTransaction()"
        clearable
        v-model="remarkD"
        placeholder="请输入内容"
      ></el-input>
      <span style="margin-left:30px">交易日期：</span>
      <el-date-picker
        size="small"
        v-model="time"
        @change="dealerTransaction()"
        type="daterange"
        align="right"
        value-format="yyyy-MM-dd"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions2"
      ></el-date-picker>
      <el-button
        style="margin-left:70px"
        type="primary"
        @click="dealerTransaction()"
        icon="el-icon-search "
        size="small"
      >搜索</el-button>
      <el-table :data="tableData3" style="width:100%;margin-top:20px" stripe border>
        <el-table-column align="center" prop="direction" label="方向"></el-table-column>
        <el-table-column prop="type" label="用户佣金" align="center"></el-table-column>
        <el-table-column prop="typeCode" label="返利通道" align="center"></el-table-column>

        <el-table-column prop="money" label="金额" align="center">
          <template slot-scope="scope">
            <span>{{(scope.row.money)/100}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" align="center" label="创建时间"></el-table-column>
        <el-table-column prop="remark" align="center" label="备注"></el-table-column>
      </el-table>
      <div style="text-align:center;margin-top:10px;">
        <el-pagination
          background
          @size-change="handleSizeChange3"
          @current-change="handleCurrentChange3"
          :current-page="current3"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="size3"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total3"
        ></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { commerciallist, userMenu, CommtransactionLog, Commquota } from "@/api";
export default {
  name: "user",
  data() {
    return {
      accountId: "",
      time: "",
      remarkD: "",
      typeD: "",
      dealerName: "",
      remark: "",
      dialogVisibleD: false,
      userName: "",
      current: 1,
      size: 10,
      power: {
        liushui: false
      },
      current3: 1,
      size3: 10,
      total: 0,
      valueD: "",
      actionD: "",
      ID: "",
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      optionsType: [
        {
          value: null,
          label: "请选择"
        },
        {
          value: 1,
          label: "返利"
        },
        {
          value: 0,
          label: "佣金"
        },
        {
          value: 2,
          label: "资金变动"
        }
      ],
      optionsD: [
        {
          value: null,
          label: "请选择"
        },
        {
          value: 1,
          label: "减少"
        },
        {
          value: 0,
          label: "增加"
        }
      ],
      options: [
        {
          value: null,
          label: "请选择状态"
        },
        {
          value: 1,
          label: "开启"
        },
        {
          value: 0,
          label: "关闭"
        }
      ],
      Lid: "",
      name: "",
      tableData: [],
      input: "",
      radio: "",
      total3: 0,
      options: [
        {
          value: null,
          label: "请选择状态"
        },
        {
          value: 1,
          label: "开启"
        },
        {
          value: 0,
          label: "关闭"
        }
      ],
      value: "",
      tableData3: []
    };
  },
  created() {
    this.Administrators();
  },
  mounted() {
    this.Concealment();
  },
  methods: {
    Concealment() {
      userMenu({
        menuType: 1,
        parentId: this.$route.query.id
      }).then(res => {
        var concea = res.data.data;
        concea.map(item => {
          if (item.permission == "sys.tem.liushui") {
            this.power.liushui = item;
          }
        });
      });
    },
    closeL() {
      this.Administrators();
      this.radio = "";
    },
    dealerTransaction() {
      var par = {};
      if (this.time === "" || this.time == undefined || this.time == null) {
        par = {
          pageNum: this.current3,
          pageSize: this.size3,
          direction: this.actionD, ////方向：0 增加 1 减少
          remark: this.remarkD,
          type: this.typeD,
          userId: this.Lid
        };
      } else {
        par = {
          pageNum: this.current3,
          pageSize: this.size3,
          direction: this.actionD, ////方向：0 增加 1 减少
          remark: this.remarkD,
          type: this.typeD,
          userId: this.Lid,
          startTime: this.time[0] + " 00:00:00",
          endTime: this.time[1] + " 23:59:59"
        };
      }
      CommtransactionLog(par).then(res => {
        if (res.data.httpCode == 0) {
          this.tableData3 = res.data.data;
          this.total3 = Number(res.data.total);
          this.tableData3.forEach((item, index) => {
            if (item.direction == 0) {
              item.direction = "增加";
            } else if (item.direction == 1) {
              item.direction = "减少";
            }
            if (item.type == 0) {
              item.type = "佣金";
            } else if (item.type == 1) {
              item.type = "返利";
            } else if (item.type == 2) {
              item.type = "资金变动";
            }
            if (item.typeCode == 0) {
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
            }else if (item.typeCode == "9") {
              item.typeCode = "支付宝固态码";
            }
          });
        }
      });
    },
    Lookwa() {
      this.actionD = "";
      this.remarkD = "";
      this.typeD = "";
      this.time="";
      if (this.radio === "") {
        this.$message.warning("请选择要查看的数据！");
        return;
      }
      this.dialogVisibleD = true;
      this.dealerTransaction();
    },
    showRow(row) {
      this.radio = this.tableData.indexOf(row);
      this.Lid = row.id;
    },
    Search() {
       this.current=1;
      this.Administrators();
    },
    handleSizeChange(val) {
      this.size = val;
      this.current = 1;
      this.Administrators();
    },
    handleCurrentChange(val) {
      this.current = val;
      this.Administrators();
    },
    handleSizeChange3(val) {
      this.size3 = val;
      this.current3 = 1;
      this.dealerTransaction();
    },
    handleCurrentChange3(val) {
      this.current3 = val;
      this.dealerTransaction();
    },
    Administrators() {
      let par = {
        pageNum: this.current,
        pageSize: this.size,
        accountId: this.accountId,
        dealerName: this.dealerName,
        locked: this.value,
        remark: this.remark,
        userName: this.userName
      };
      commerciallist(par).then(res => {
        if (res.data.httpCode == 0) {
          this.tableData = res.data.data;
          this.total = Number(res.data.total);
          this.tableData.forEach((item, index) => {
            if (item.locked == 0) {
              item.locked = "关闭";
            } else if (item.locked == 1) {
              item.locked = "开启";
            }
            if (item.userType == 0) {
              item.userType = "一级";
            } else if (item.userType == 1) {
              item.userType = "二级";
            }
          });
        }
      });
    },
    handleClick(row, id) {
      this.$router.push({
        name: "actdetails",
        query: {
          ids: id
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.user {
  overflow: hidden;
  .wrap {
    margin-top: 20px;
    .yonghu {
      font-size: 20px;
      font-family: Songti SC;
      font-weight: 400;
      color: rgba(1, 1, 1, 1);
      line-height: 26px;
      span:nth-child(3) {
        margin-left: 50px;
      }
      span:nth-child(5) {
        margin-left: 50px;
      }
      span:nth-child(7) {
        margin-left: 50px;
      }
      span:nth-child(9) {
        margin-left: 50px;
      }
    }
    .name {
      font-size: 20px;
      font-family: Songti SC;
      font-weight: 400;
      color: rgba(1, 1, 1, 1);
      line-height: 26px;
      margin-top: 30px;
    }
    .BTld {
      margin: 30px 0 20px 0;
      float: right;
      margin-right: 200px;
    }
  }
  .details {
    margin-top: 65px;
    font-size: 20px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: rgba(1, 1, 1, 1);
    line-height: 26px;
    .block {
      position: fixed;
      right: 600px;
      bottom: 10px;
    }
  }
}
</style>