<template>
  <div class="jingx">
    <div class="dingdan">
      <span style="margin-left:30px">姓名：</span>
      <el-input
        size="small"
        style="width:200px"
        @change="dealerTransaction()"
        @keyup.enter.native="dealerTransaction()"
        clearable
        v-model="userName"
        placeholder="请输入内容"
      ></el-input>
      <span style="margin-left:30px">用户ID编号：</span>
      <el-input
        size="small"
        style="width:200px"
        @change="dealerTransaction()"
        @keyup.enter.native="dealerTransaction()"
        clearable
        v-model="accountId"
        placeholder="请输入内容"
      ></el-input>
      <span style="margin-left:30px">所属经销商名称：</span>
      <el-input
        size="small"
        style="width:200px"
        @change="dealerTransaction()"
        @keyup.enter.native="dealerTransaction()"
        clearable
        v-model="dealerName"
        placeholder="请输入内容"
      ></el-input>
      <span style="margin-left:30px">状态：</span>
      <el-select v-model="locked" size="small" @change="dealerTransaction()" placeholder="请选择内容">
        <el-option
          v-for="item in optionss"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <div style="margin-top:20px">
        <span style="margin-left:30px">用户类型：</span>
        <el-select
          v-model="userType"
          size="small"
          @change="dealerTransaction()"
          placeholder="请选择内容"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
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
      </div>
    </div>
    <div class="BTld">
      <el-button type="primary" @click="Search()" icon="el-icon-search ">搜索</el-button>
    </div>
    <div class="details" style="margin:50px 0 0 0">
      <el-table :data="tableData" :max-height="700" style="width:100%" stripe border>
        <el-table-column align="center" show-overflow-tooltip prop="userCode" label="用户编号"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="userName" label="用户名称"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="account" label="联系方式"></el-table-column>

        <el-table-column prop="accountNum" show-overflow-tooltip label="消费额度" align="center">
          <template slot-scope="scope">
            <span>{{(scope.row.consumeMoney)/100}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="locked" show-overflow-tooltip label="状态" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.locked}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="tradingVolume" show-overflow-tooltip label="充值金额" align="center">
          <template slot-scope="scope">
            <span>{{(scope.row.rechargeMoney)/100}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="rebateAmount" show-overflow-tooltip align="center" label="剩余额度">
          <template slot-scope="scope">
            <span>{{(scope.row.residueMoney)/100}}</span>
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
import { UuserStatistics } from "@/api";
export default {
  name: "jingx",
  data() {
    return {
      accountId: "",
      dealerName: "",
      locked: "",
      userName: "",
      userType: "",
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
      tableData: [],
      optionss: [
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
      options: [
        {
          value: null,
          label: "请选择内容"
        },
        {
          value: 0,
          label: "一级"
        },
        {
          value: 1,
          label: "二级"
        }
      ]
    };
  },
  created() {
    this.dealerTransaction();
  },
  methods: {
    Search() {
        this.current=1;
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
    dealerTransaction() {
      var par = {};
      if (this.time === "" || this.time == null || this.time == undefined) {
        par = {
          pageNum: this.current,
          pageSize: this.size,
          accountId: this.accountId, //用户ID编号
          dealerName: this.dealerName, //所属经销商名称
          locked: this.locked, //是否锁定（0锁定；1未锁定）
          userName: this.userName, //姓名
          userType: this.userType //用户类型(0一级1二级)
        };
      } else {
        par = {
          pageNum: this.current,
          pageSize: this.size,
          accountId: this.accountId, //用户ID编号
          dealerName: this.dealerName, //所属经销商名称
          locked: this.locked, //是否锁定（0锁定；1未锁定）
          userName: this.userName, //姓名
          userType: this.userType, //用户类型(0一级1二级)
          startTime: this.time[0] + " 00:00:00",
          endTime: this.time[1] + " 23:59:59"
        };
      }
      UuserStatistics(par).then(res => {
        if (res.data.httpCode == 0) {
          this.tableData = res.data.data;
          this.total = Number(res.data.total);
          this.tableData.forEach((item, index) => {
            if (item.locked == 1) {
              item.locked = "开启";
            } else if (item.locked == 0) {
              item.locked = "关闭";
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.jingx {
  // width: 80%;
  overflow: hidden;
  .dingdan {
    overflow: hidden;
    margin-top: 30px;
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