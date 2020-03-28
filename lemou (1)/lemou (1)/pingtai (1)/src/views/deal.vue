<template>
  <div class="deal">
    <div class="wrap">
      <div class="yonghu">
        <span>订单号：</span>
        <el-input
          @change="Search"
          style="width:200px"
          @keyup.enter.native="Administrators()"
          v-model="orderNo"
          placeholder="请输入内容"
          clearable
        ></el-input>
        <span style="margin-left:20px">账户编号：</span>
        <el-input
          @change="Search"
          style="width:200px"
          @keyup.enter.native="Administrators()"
          v-model="accountCode"
          placeholder="请输入内容"
          clearable
        ></el-input>
        <span style="margin-left:20px">用户编号：</span>
        <el-input
          @change="Search"
          style="width:200px"
          @keyup.enter.native="Administrators()"
          v-model="userCode"
          placeholder="请输入内容"
          clearable
        ></el-input>

        <span style="margin-left:20px">流水号：</span>
        <el-input
          @change="Search"
          @keyup.enter.native="Administrators()"
          style="width:200px;margin-left:20px"
          v-model="bankFlowno"
          placeholder="请输入内容"
          clearable
        ></el-input>
        <span style="margin-left:20px">代理账号：</span>
        <el-input
          @change="Search"
          @keyup.enter.native="Administrators()"
          style="width:200px;"
          v-model="Daccount"
          placeholder="请输入内容"
          clearable
        ></el-input>
      </div>
      <div class="name">
        <span>日志：</span>
        <el-input
          @change="Search"
          @keyup.enter.native="Administrators()"
          style="width:200px;margin-left:22px"
          v-model="orderLog"
          placeholder="请输入内容"
          clearable
        ></el-input>

        <span style="margin-left:20px">订单状态：</span>
        <el-select
          style="width:200px"
          v-model="status"
          @change="Administrators()"
          placeholder="请选择状态"
        >
          <el-option
            v-for="item in optionss"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span style="margin-left:20px">账户类型：</span>
        <el-select
          style="width:200px"
          @change="Administrators()"
          v-model="typeCode"
          placeholder="请选择支付类型"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span style="margin-left:20px">交易日期：</span>
        <el-date-picker
          v-model="value2"
          align="right"
          style="width:200px"
          @change="Administrators"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions1"
        ></el-date-picker>
      </div>
      <div class="btn">
        <el-button type="primary" @click="Search()" icon="el-icon-search ">搜索</el-button>
        <el-button style="margin-left: 22px;" @click="resendNotice()" type="warning">重发通知</el-button>
      </div>
      <div class="details">
        <div>
          <el-table
            :max-height="700"
            @row-click="showRow"
            :data="tableData3"
            border
            highlight-current-row
            style="width: 100%"
            stripe
          >
            <el-table-column label="操作" align="center" width="50">
              <template slot-scope="scope">
                <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column label="订单号" :show-overflow-tooltip="true" align="center" width="190">
              <template slot-scope="scope">
                <span
                  @dblclick="handleCopy(scope.$index, scope.row.orderNo)"
                >{{ scope.row.orderNo }}</span>
              </template>
            </el-table-column>
            <el-table-column label="代理账号" width="100" align="center">
              <!-- scope.row.agentAccount -->
              <template slot-scope="scope">{{ scope.row.agentAccount }}</template>
            </el-table-column>
            <el-table-column label="代理名称" align="center">
              <!-- scope.row.agentName -->
              <template slot-scope="scope">{{ scope.row.agentName }}</template>
            </el-table-column>
            <el-table-column label="经销商编号" width="100" align="center">
              <template slot-scope="scope">{{ scope.row.dealerCode }}</template>
            </el-table-column>
            <el-table-column label="收款人" width="80" align="center">
              <template slot-scope="scope">{{ scope.row.payeeName }}</template>
            </el-table-column>
            <el-table-column label="收款账户" :show-overflow-tooltip="true" align="center">
              <template slot-scope="scope">{{ scope.row.typeCode }}</template>
            </el-table-column>
            <el-table-column label="手机号" width="130" :show-overflow-tooltip="true" align="center">
              <template slot-scope="scope">{{ scope.row.phone }}</template>
            </el-table-column>
            <el-table-column label="账户编号" align="center">
              <template slot-scope="scope">
                <span :style="{color:scope.row.Colr}">{{ scope.row.accountCode }}</span>
              </template>
            </el-table-column>
            <el-table-column label="订单金额" width="80" align="center">
              <template slot-scope="scope">{{( scope.row.realAmt )/100}}</template>
            </el-table-column>

            <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                <span :style="{color:scope.row.activeColor}">{{scope.row.status}}</span>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center" width="180" :show-overflow-tooltip="true">
              <template slot-scope="scope">{{ scope.row.createTime }}</template>
            </el-table-column>

            <el-table-column label="日志" align="center" width="190" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.orderLog}}</span>
              </template>
            </el-table-column>
            <el-table-column label="流水号" :show-overflow-tooltip="true" align="center" width="160">
              <template slot-scope="scope">
                <span
                  @dblclick="handleCopy(scope.$index, scope.row.bankFlowno)"
                >{{ scope.row.bankFlowno }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
    </div>
  </div>
</template>
<script>
import { Paylistt, userMenu, PayresendNotice } from "@/api";
export default {
  name: "deal",
  data() {
    return {
      radio: "",
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value2: "",
      accountCode: "",
      bankFlowno: "",
      orderLog: "",
      orderNo: "",
      pageNum: "",
      pageSize: "",
      id: "",
      status: "",
      time: "",
      typeCode: "",
      Daccount: "",
      userCode: "",
      orderNo: "",
      dealerName: "",
      name: "",
      current: 1,
      size: 10,
      total: 0,
      value: "",
      optionss: [
        {
          value: null,
          label: "请选择状态"
        },
        {
          value: 0,
          label: "等待支付"
        },
        {
          value: 1,
          label: "支付成功"
        },
        {
          value: 2,
          label: "支付失败"
        },
        {
          value: 3,
          label: "手工补单"
        }
      ],
      options: [
        {
          value: null,
          label: "请选择支付类型"
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
      tableData3: [],
      input: ""
    };
  },
  created() {
    // this.setTable()
    this.Administrators();
    this.Concealment();
  },
  methods: {
    Concealment() {
      userMenu({
        menuType: 1,
        parentId: this.$route.query.id
      }).then(res => {
        var concea = res.data.data;
      });
    },
    Search() {
      this.current = 1;
      this.Administrators();
    },
    showRow(row) {
      this.radio = this.tableData3.indexOf(row);
      this.id = row.id;
      this.Tstatus = row.status;
    },
    handleCopy(index, row) {
      this.copyData = row;
      this.copy(this.copyData);
    },
    copy(data) {
      let url = data;
      let oInput = document.createElement("input");
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      console.log(oInput.value);
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.$message({
        message: "复制成功",
        type: "success"
      });
      oInput.remove();
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
    Administrators() {
      if (this.userCode == "") {
        this.userCode = null;
      }
      let pay = {
        account: this.Daccount,
        pageNum: this.current,
        pageSize: this.size,
        accountCode: this.accountCode,
        bankFlowno: this.bankFlowno,
        orderLog: this.orderLog,
        orderNo: this.orderNo,
        status: this.status,
        time: this.value2,
        typeCode: this.typeCode,
        userCode: this.userCode
      };
      Paylistt(pay).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res);
          this.tableData3 = res.data.data;
          this.total = Number(res.data.total);
          this.tableData3.forEach((item, index) => {
            item.activeColor = "";
            item.Colr = "";
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
              item.accountCode = "拼多多";
              item.Colr = "red";
            } else if (item.typeCode == "7") {
              item.typeCode = "拼多多微信";
              item.accountCode = "拼多多";
              item.Colr = "red";
            } else if (item.typeCode == "8") {
              item.typeCode = "聚合码";
            } else if (item.typeCode == "9") {
              item.typeCode = "支付宝固态码";
            }
            if (item.status == "0") {
              item.status = "等待支付";
              item.activeColor = "black";
            } else if (item.status == "1") {
              item.status = "支付成功";
              item.activeColor = "green";
            } else if (item.status == "2") {
              item.status = "支付失败";
            } else if (item.status == "3") {
              item.status = "手工补单";
            }
          });
        }
      });
    },
    resendNotice() {
      PayresendNotice(this.id).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data.data);
          this.$message({
            showClose: true,
            message: "已重发",
            type: "success"
          });
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error"
          });
        }
      });
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.deal {
  overflow: hidden;
  .wrap {
    margin-top: 20px;
    // margin-left: 72px;
    .yonghu {
      font-size: 20px;
      font-family: Songti SC;
      color: rgba(1, 1, 1, 1);
      line-height: 26px;
    }
    .name {
      font-family: Songti SC;
      font-weight: 400;
      font-size: 20px;
      color: rgba(1, 1, 1, 1);
      line-height: 26px;
      margin-top: 20px;
    }
    .btn {
      float: right;
      margin: 20px 30px 20px 0;
    }
    .details {
      margin-top: 35px;
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
}
</style>