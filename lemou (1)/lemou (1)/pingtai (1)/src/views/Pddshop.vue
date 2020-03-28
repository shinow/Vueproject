<template>
  <div class="Pddshop">
    <div class="dingdan">
      <span style="margin-left:30px">用户编号：</span>
      <el-input
        size="small"
        style="width:200px"
        @change="dealerTransaction()"
        @keyup.enter.native="dealerTransaction()"
        clearable
        v-model="accountId"
        placeholder="请输入内容"
      ></el-input>
      <span style="margin-left:30px">代理名称：</span>
      <el-input
        size="small"
        style="width:200px"
        @change="dealerTransaction()"
        @keyup.enter.native="dealerTransaction()"
        clearable
        v-model="dealerName"
        placeholder="请输入内容"
      ></el-input>
    </div>
    <div class="BTld">
      <el-button type="primary" @click="Search()" icon="el-icon-search">搜索</el-button>
      <el-button type="primary" @click="SearchLink()" icon="el-icon-search">查看拼多多链接</el-button>
    </div>
    <div class="details" style="margin:50px 0 0 0">
      <el-table
        :max-height="700"
        @row-click="showRow"
        :data="tableData"
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
        <el-table-column prop="accountNum" show-overflow-tooltip label="金额" align="center">
          <template slot-scope="scope">
            <span>{{(scope.row.amount)/100}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="createTime" label="创建时间"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="goodsId" label="商品编号"></el-table-column>
        <el-table-column prop="caozuo" label="操作" align="center" width="250">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row,scope.row.id)"
              type="danger"
              size="small"
            >删除拼多多商品表</el-button>
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
    <el-dialog :visible.sync="dialogVisible" width="80%" @close="closeDio">
      <span>状态：</span>
      <el-select
        style="width:160px"
        v-model="status"
        @change="Linklist()"
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
      <span style="margin-left:20px">类型：</span>
      <el-select
        style="width:160px"
        v-model="type"
        @change="Linklist()"
        size="small"
        placeholder="请选择状态"
      >
        <el-option
          v-for="item in optionsT"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-table
        :data="tableData3"
        border
        highlight-current-row
        style="width: 100%;margin-top:20px"
        stripe
      >
        <el-table-column
          align="center"
          width="300px"
          show-overflow-tooltip
          prop="orderSn"
          label="订单编号"
        ></el-table-column>
        <el-table-column prop="status" show-overflow-tooltip label="使用状态" align="center"></el-table-column>
        <el-table-column prop="type" show-overflow-tooltip label="类型" align="center"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="createTime" label="创建时间"></el-table-column>
        <el-table-column align="center" width="200px" show-overflow-tooltip prop="url" label="支付地址"></el-table-column>
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
import { PDlist, PDdelete, pddpayList } from "@/api";
export default {
  name: "Pddshop",
  data() {
    return {
      type: "",
      userId: "",
      dialogVisible: false,
      status: "",
      options: [
        {
          value: null,
          label: "请选择状态"
        },
        {
          value: 1,
          label: "已使用"
        },
        {
          value: 0,
          label: "待使用"
        },
        {
          value: 2,
          label: "已匹配"
        },
        {
          value: 3,
          label: "更新中"
        }
      ],
      optionsT: [
        {
          value: null,
          label: "请选择类型"
        },
        {
          value: 1,
          label: "微信"
        },
        {
          value: 0,
          label: "支付宝"
        }
      ],
      accountId: "",
      dealerName: "",
      current: 1,
      current3: 1,
      size3: 10,
      total3: 0,
      size: 10,
      tableData3: [],
      total: 0,
      tableData: [],
      radio: "",
      RadioPay: ""
    };
  },
  created() {
    this.dealerTransaction();
  },
  methods: {
    closeDio() {
      this.dealerTransaction();
    },
    showRow(row) {
      this.radio = this.tableData.indexOf(row);
      this.RadioPay = row;
    },
    Search() {
        this.current=1;
      this.dealerTransaction();
    },
    SearchLink() {
      this.status = "";
      this.type = "";
      if (this.radio === "") {
        this.$message.warning("请选择一条数据");
      } else {
        this.dialogVisible = true;
        this.Linklist();
      }
    },
    Linklist() {
      var par = {
        pageNum: this.current3,
        pageSize: this.size3,
        pddId: this.RadioPay.id, //拼多多商品ID
        status: this.status, //状态 0暂未使用 1已使用 2 已匹配 3 更新中
        type: this.type, //类型 0 支付宝 1 微信
        userId: this.RadioPay.userId //用户ID
      };
      pddpayList(par).then(res => {
        if (res.data.httpCode == 0) {
          this.tableData3 = res.data.data;
          this.tableData3.forEach((item, index) => {
            if (item.status == "0") {
              item.status = "待使用";
            } else if (item.status == "1") {
              item.status = "已使用";
            } else if (item.status == "2") {
              item.status = "已匹配";
            } else if (item.status == "3") {
              item.status = "更新中";
            }
            if (item.type == "0") {
              item.type = "支付宝";
            } else if (item.type == "1") {
              item.type = "微信";
            }
          });
          this.total3 = Number(res.data.total);
        }
      });
    },
    handleClick(row, id) {
      this.$confirm("是否删除该拼多多商品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          PDdelete(id).then(res => {
            if (res.data.httpCode == 0) {
              console.log(res.data.data);
              this.dealerTransaction();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
    handleSizeChange3(val) {
      this.size3 = val;
      this.current3 = 1;
      this.Linklist();
    },
    handleCurrentChange3(val) {
      this.current3 = val;
      this.Linklist();
    },
    dealerTransaction() {
      var par = {
        pageNum: this.current,
        pageSize: this.size,
        accountId: this.accountId, //用户编号
        dealerName: this.dealerName //代理名称
      };
      PDlist(par).then(res => {
        if (res.data.httpCode == 0) {
          this.tableData = res.data.data;
          this.total = Number(res.data.total);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.Pddshop {
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