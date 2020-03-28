<template>
  <div class="Pddlink">
    <div class="dingdan">
      <span style="margin-left:30px">拼多多商品ID：</span>
      <el-input
        size="small"
        style="width:200px"
        @change="dealerTransaction()"
        @keyup.enter.native="dealerTransaction()"
        clearable
        v-model="pddId"
        placeholder="请输入内容"
      ></el-input>
      <span style="margin-left:30px">买家ID：</span>
      <el-input
        size="small"
        style="width:200px"
        @change="dealerTransaction()"
        @keyup.enter.native="dealerTransaction()"
        clearable
        v-model="pid"
        placeholder="请输入内容"
      ></el-input>
      <span>状态：</span>
      <el-select
        style="width:160px"
        v-model="status"
        @change="Search()"
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
      <span>类型：</span>
      <el-select
        style="width:160px"
        v-model="type"
        @change="Search()"
        size="small"
        placeholder="请选择类型"
      >
        <el-option
          v-for="item in optionsT"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span style="margin-left:30px">用户ID：</span>
      <el-input
        size="small"
        style="width:200px"
        @change="dealerTransaction()"
        @keyup.enter.native="dealerTransaction()"
        clearable
        v-model="userId"
        placeholder="请输入内容"
      ></el-input>
    </div>
    <div class="BTld">
      <el-button type="primary" @click="Search()" icon="el-icon-search ">搜索</el-button>
    </div>
    <div class="details" style="margin:50px 0 0 0">
      <el-table :data="tableData" style="width:100%" stripe border>
        <el-table-column
          align="center"
          width="300px"
          show-overflow-tooltip
          prop="orderSn"
          label="订单编号"
        ></el-table-column>
        <el-table-column prop="remark" show-overflow-tooltip label="备注" align="center"></el-table-column>
        <el-table-column prop="status" show-overflow-tooltip label="使用状态" align="center"></el-table-column>
        <el-table-column prop="type" show-overflow-tooltip label="类型" align="center"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="createTime" label="创建时间"></el-table-column>
        <el-table-column align="center" width="200px" show-overflow-tooltip prop="url" label="支付地址"></el-table-column>
        <!-- <el-table-column prop="caozuo" label="操作" align="center" width="250">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row,scope.row.id)"
              type="danger"
              size="small"
            >删除拼多多买家</el-button>
          </template>
        </el-table-column>-->
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
import { pddpayList } from "@/api";
export default {
  name: "Pddlink",
  data() {
    return {
      pddId: "",
      pid: "",
      type: "",
      userId: "",
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
          label: "暂未使用"
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
      current: 1,
      size: 10,
      total: 0,
      tableData: []
    };
  },
  created() {
    this.dealerTransaction();
  },
  methods: {
    Search() {
      this.dealerTransaction();
    },
    handleClick(row, id) {
      this.$confirm("是否删除该拼多多买家?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          pddUserdelete(id).then(res => {
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
    dealerTransaction() {
      var par = {
        pageNum: this.current,
        pageSize: this.size,
        pddId: this.pddId, //拼多多商品ID
        pid: this.pid, //买家ID
        status: this.status, //状态 0暂未使用 1已使用 2 已匹配 3 更新中
        type: this.type, //类型 0 支付宝 1 微信
        userId: this.userId //用户ID
      };
      pddpayList(par).then(res => {
        if (res.data.httpCode == 0) {
          this.tableData = res.data.data;
          this.tableData.forEach((item, index) => {
            if (item.status == "0") {
              item.status = "暂未使用";
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
          this.total = Number(res.data.total);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.Pddlink {
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