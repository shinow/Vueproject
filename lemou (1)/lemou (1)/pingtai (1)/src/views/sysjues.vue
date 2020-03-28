<template>
  <div class="sysjues">
    <div class="head">
      <span @click="system()">系统管理 /</span>
      <span>角色列表</span>
    </div>
    <div class="details">
      <el-table :data="tableData" style="width:88%" stripe  border>
        <el-table-column align="center" prop="ID" type="index" label="ID" width="105"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" align="center" width="275"></el-table-column>
        <el-table-column prop="caozuo" align="center" label="操作" width="352">
          <template slot-scope="scope">
            <el-button
              style="background:rgba(255,103,82,1);
border-radius:4px;
font-size:14px;
padding: 1px 12px;
color:rgba(254,254,254,1);"
              @click="handleClick(scope.row,scope.$index,scope.row.id)"
              type="text"
              size="small"
              v-show="scope.row.userType!='1'"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="text-align:center;margin-top: 10px;">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="current"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { Rlist, Rdelete } from "@/api";
export default {
  name: "sysjues",
  data() {
    return {
      current: 1,
      size: 10,
      total: 0,
      zheg: false,
      tableData: [],
      value: "",
      ids: "",
      lies: {
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  created() {
    //  this.qunax();
    this.Administrators();
    // this.chaxun()
  },
  methods: {
    Administrators() {
      Rlist(this.lies).then(res => {
        if (res.data.httpCode==0) {
              console.log(res);
        this.tableData = res.data.data;
        this.total = Number(res.data.total);
        }
      
      });
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
    yes() {
      Rdelete("" + this.ids).then(res => {
        if (res.data.httpCode==0) {
             console.log(res);
        this.zheg = false;
        this.Administrators();
        }
      });
    },
    no() {
      this.zheg = false;
    },
    handleClick(row, i, id) {
      this.$confirm("是否删除该角色?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.yes();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      this.ids = id;
    },
    commoditylb() {
      this.$router.push({
        name: "commoditylb"
      });
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
    parameter() {
      this.$router.push({
        name: "parameter"
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
    account() {
      this.$router.push({
        name: "account"
      });
    },
    system() {
      this.$router.push({
        name: "system"
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
.zheg {
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
.sysjues {
  overflow: hidden;
  .head {
    margin-left: 72px;
    margin: 20px;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(24, 24, 24, 1);
  }
  .details {
    font-size: 20px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: rgba(1, 1, 1, 1);
    line-height: 26px;
    margin: 98px 0 0 92px;

    .block {
      position: fixed;
      right: 600px;
      bottom: 10px;
    }
  }
}
</style>