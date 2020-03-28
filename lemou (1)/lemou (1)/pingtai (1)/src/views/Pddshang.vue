<template>
  <div class="Pddlink">
    <div class="BTld">
      <el-button type="primary" @click="add()">添加</el-button>
    </div>
    <div class="details" style="margin:50px 0 0 0">
      <el-table :data="tableData" style="width:100%" stripe border>
        <el-table-column align="center" show-overflow-tooltip prop="createTime" label="创建时间"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="money" label="金额">
          <template slot-scope="scope">
            <span>{{(scope.row.money)/100}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="caozuo" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row,scope.row.id)"
              type="danger"
              size="small"
            >删除拼多多通道入金管理</el-button>
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
    <!-- -------------------- -->
    <el-dialog title="添加拼多多通道入金管理" :visible.sync="baojin" width="30%">
      <ul>
        <li style="margin-left:30px">
          <span>金额：</span>
          <el-input style="width:160px" placeholder="请输入金额" v-model="depositJ"></el-input>
        </li>
      </ul>

      <span slot="footer" class="dialog-footer">
        <el-button @click="baojin = false">取 消</el-button>
        <el-button type="primary" @click="baojinB">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { pinduoduolist, pinduoduodelete, pinduoduoad } from "@/api";
export default {
  name: "Pddlink",
  data() {
    return {
      pddId: "",
      baojin: false,
      pid: "",
      type: "",
      depositJ: "",
      userId: "",
      status: "",
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
    add() {
      this.dealerTransaction();
      this.baojin=true;
      this.depositJ=""
    },
    baojinB() {
      if (this.depositJ==="") {
          this.$message.warning("请输入金额！")
          return
      }
      pinduoduoad(this.depositJ).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data.data);
          this.dealerTransaction();
            this.baojin=false;
        }
      });
    },
    handleClick(row, id) {
      this.$confirm("删除拼多多通道入金管理?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          pinduoduodelete(id).then(res => {
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
      pinduoduolist().then(res => {
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
.Pddlink {
  overflow: hidden;
  .block {
    position: fixed;
    right: 600px;
    bottom: 10px;
  }
}
</style>