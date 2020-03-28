<template>
  <div class="jingx">
    <div class="dingdan">
      <span>经销商：</span>
      <el-select v-model="JXvalue" @change="change" size="small" placeholder="请选择经销商">
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <span style="margin-left:20px">支付通道：</span>
      <el-select v-model="valuet" size="small" @change="dealerTransaction()" placeholder="请选择支付通道">
        <el-option
          v-for="item in optionss"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span style="margin-left:20px">交易日期：</span>
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
    </div>
    <div style="margin-top:20px;margin-left:50px" class="zong">
      <p>
        成交总金额(单位：元)：
        <span style="color:red">{{(totalMoney)/100}}</span>
      </p>
      <p style="margin-top:20px">
        成交总单数(单位：元)：
        <span style="color:red">{{totalBill}}</span>
      </p>
      <div class="BTld">
        <el-button type="primary" @click="Search()" icon="el-icon-search ">搜索</el-button>
      </div>
    </div>
    <div class="details" style="margin:50px 0 0 0">
      <el-table :data="tableData" style="width:100%" stripe border>
        <el-table-column align="center" show-overflow-tooltip prop="dealerName" label="经销商"></el-table-column>
        <el-table-column prop="accountNum" show-overflow-tooltip label="下级用户数量" align="center"></el-table-column>
        <el-table-column prop="orderNum" show-overflow-tooltip label="成交单数" align="center"></el-table-column>

        <el-table-column prop="tradingVolume" show-overflow-tooltip label="成交额" align="center">
          <template slot-scope="scope">
            <span>{{(scope.row.tradingVolume)/100}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="rebateAmount" show-overflow-tooltip align="center" label="返利金额">
          <template slot-scope="scope">
            <span>{{(scope.row.rebateAmount)/100}}</span>
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
  </div>
</template>
<script>
import {
  Dealist,
  StdealerTransaction,
  StplatformData,
  StchannelStatistics
} from "@/api";
export default {
  name: "jingx",
  data() {
    return {
      totalBill: "",
      totalMoney: "",
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
      current: 1,
      size: 10,
      total: 0,
      time: "",
      name: "",
      tableData: [],
      options: [],
      JXvalue: "",
      value: "",
      optionss: [
        {
          value: null,
          label: "请选择支付通道"
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
        }
      ],
      valuet: ""
    };
  },
  created() {
    this.Administrators();
    this.dealerTransaction();
  },
  methods: {
    Search() {
      this.dealerTransaction();
    },
    handleSizeChange(val) {
      this.size = val;
      this.current = 1;
      this.dealerTransaction();
    },
    handleCurrentChange(val) {
      this.current = val;
      this.dealerTransaction();
    },
    change(val) {
      this.JXvalue = val;
      let obj = {};
      obj = this.options.find(item => {
        return item.id === val;
      });
      this.name = obj.name;
    },
    Administrators() {
      let par = {
        pageNum: 1, //当前页数
        pageSize: 999 //每页条数
      };
      Dealist(par).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data.data);
          this.options = res.data.data;
        }
      });
    },
    dealerTransaction() {
      var par = {};
      if (this.time === "" || this.time == null || this.time == undefined) {
        par = {
          pageNum: this.current,
          pageSize: this.size,
          dealerId: this.JXvalue,
          typeCode: this.valuet //0 支付宝个码  1 微信个码 2云闪付个码 3支付宝商码 4微信商码 5 银行卡
        };
      } else {
        par = {
          pageNum: this.current,
          pageSize: this.size,
          dealerId: this.JXvalue,
          startTime: this.time[0] + " 00:00:00",
          endTime: this.time[1] + " 23:59:59",
          typeCode: this.valuet //0 支付宝个码  1 微信个码 2云闪付个码 3支付宝商码 4微信商码 5 银行卡
        };
      }
      StdealerTransaction(par).then(res => {
        if (res.data.httpCode == 0) {
          this.tableData = res.data.data.dealerTransactions;
          this.totalBill = res.data.data.totalBill;
          this.total = res.data.data.dealerTransactions.length;
          this.totalMoney = res.data.data.totalMoney;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.jingx {
  overflow: hidden;
  .dingdan {
    overflow: hidden;
    margin-left: 50px;
  }
  .block {
    position: fixed;
    right: 600px;
    bottom: 10px;
  }
  .BTld {
    float: right;
    margin-right: 200px;
  }
}
</style>