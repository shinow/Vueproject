<template>
  <div class="dismingx">
    <div class="head">
      <span @click="distributor()">经销商列表 /</span>
      <span>查看明细</span>
    </div>
    <div class="yonghu">
      <span>流水号：</span>
      <el-input
        size="small"
        clearable
        @change="Administrators()"
        @keyup.enter.native="Administrators()"
        style="width:160px"
        v-model="bankFlowno"
        placeholder="请输入内容"
      ></el-input>
      <span>时间：</span>
      <el-date-picker
        size="small"
        @change="Administrators()"
        v-model="value4"
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
    <div class="BTld">
      <el-button type="primary" @click="Administrators()" icon="el-icon-search ">搜索</el-button>
    </div>
    <!-- <div class="btn">
      <button @click="Administrators()">搜索</button>
    </div>-->
    <div class="details">
      <el-table style="width:100%" :data="tableData" stripe border>
        <el-table-column align="center" show-overflow-tooltip prop="bankFlowno" label="流水号"></el-table-column>
        <el-table-column prop="money" show-overflow-tooltip label="金额" align="center">
          <template slot-scope="scope">
            <span>{{(scope.row.money)/100}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" show-overflow-tooltip label="时间" align="center"></el-table-column>
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
import { DecollectionScheduled } from "@/api";
export default {
  name: "diamingx",
  data() {
    return {
      id: "",
      bankFlowno: "",
      zheg: false,
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
      value4: "",
      tableData: []
    };
  },
  created() {
    this.id = this.$route.query.ID;
    this.Administrators();
  },
  methods: {
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
      var par = {};
      if (
        this.value4 === "" ||
        this.value4 == null ||
        this.value4 == undefined
      ) {
        par = {
          pageNum: this.current,
          pageSize: this.size,
          dealerId: this.id,
          bankFlowno: this.bankFlowno,
        };
      } else {
        par = {
          pageNum: this.current,
          pageSize: this.size,
          dealerId: this.id,
          bankFlowno: this.bankFlowno,
          startTime: this.value4[0] + " 00:00:00",
          endTime: this.value4[1] + " 23:59:59"
        };
      }
      DecollectionScheduled(par).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data);
          this.tableData = res.data.data;
          this.total = Number(res.data.total);
          if (!res.data.total) {
            this.total = 0;
          }
        }
      });
    },
    distributor() {
      this.$router.push({
        name: "distributor",
        query: {
          id: this.$route.query.yemian
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.dismingx {
  overflow: hidden;
  .head {
    margin: 20px 0 0 57px;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(24, 24, 24, 1);
  }
  .yonghu {
    margin: 30px 0 0 57px;
    font-size: 20px;
    font-family: Songti SC;
    font-weight: 400;
    color: rgba(1, 1, 1, 1);
    line-height: 26px;
    span:nth-child(3) {
      margin-left: 105px;
    }
  }
  .BTld {
    overflow: hidden;
    margin: 30px 0 20px 0;
    float: right;
    margin-right: 200px;
  }
  .details {
    background: rgba(255, 255, 255, 1);
    margin-top: 45px;
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