<template>
  <div class="reflect">
    <div class="wrap">
      <div class="yonghu">
        <span>经销商名称：</span>
        <el-input
          size="small"
          style="width:200px"
          @change="check()"
          @keyup.enter.native="check()"
          clearable
          v-model="dealerName"
          placeholder="请输入内容"
        ></el-input>
        <span>订单号：</span>
        <el-input
          size="small"
          style="width:200px"
          @change="check()"
          @keyup.enter.native="check()"
          clearable
          v-model="orderNo"
          placeholder="请输入内容"
        ></el-input>
        <span>用户编号：</span>
        <el-input
          size="small"
          style="width:200px"
          @change="check()"
          @keyup.enter.native="check()"
          clearable
          v-model="userCode"
          placeholder="请输入内容"
        ></el-input>
        <span>状态：</span>
        <el-select
          style="width:160px"
          v-model="status"
          @change="chengeZT"
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
      </div>
      <div class="btn">
        <el-button type="primary" @click="Search()" icon="el-icon-search ">搜索</el-button>

        <el-button
          type="success"
          :icon="power.success.iconcls"
          v-if="power.success.permission"
          @click="Success()"
        >{{power.success.menuName}}</el-button>
        <el-button
          type="danger"
          :icon="power.error.iconcls"
          v-if="power.error.permission"
          @click="fail()"
        >{{power.error.menuName}}</el-button>
      </div>
    </div>
    <div class="details">
      <div>
        <el-table
          :max-height="700"
          highlight-current-row
          @row-click="showRow"
          style="width:100%"
          :data="tableData"
          stripe
          border
        >
          <el-table-column label="请选择" width="80">
            <template slot-scope="scope">
              <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
            </template>
          </el-table-column>

          <el-table-column align="center" prop="userCode" label="用户编号">
            <template slot-scope="scope">{{ scope.row.userCode }}</template>
          </el-table-column>
          <el-table-column prop="userName" label="用户名称" align="center">
            <template slot-scope="scope">{{ scope.row.userName }}</template>
          </el-table-column>
          <el-table-column prop="userName" label="账号" width="220" align="center">
            <template slot-scope="scope">{{ scope.row.bankNo }}</template>
          </el-table-column>
          <el-table-column prop="userName" label="类型" align="center">
            <template slot-scope="scope">{{ scope.row.type }}</template>
          </el-table-column>
          <el-table-column prop="shopName" label="商品名称
" align="center">
            <template slot-scope="scope">{{ scope.row.shopName }}</template>
          </el-table-column>
          <el-table-column
            prop="orderNo"
            :show-overflow-tooltip="true"
            label="流水号"
            align="center"
            width="220"
          >
            <template slot-scope="scope">{{ scope.row.orderNo }}</template>
          </el-table-column>
          <el-table-column prop="money" align="center" label="金额">
            <template slot-scope="scope">
              <span>{{(scope.row.money)/100}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            :show-overflow-tooltip="true"
            label="创建时间"
            align="center"
            width="220"
          >
            <template slot-scope="scope">{{ scope.row.createTime }}</template>
          </el-table-column>
          <el-table-column prop="remark" align="center" label="备注信息">
            <template slot-scope="scope">{{ scope.row.remark }}</template>
          </el-table-column>
          <el-table-column prop="status" align="remark" label="状态">
            <template slot-scope="scope">
              <span :style="{color:scope.row.activeColor}">{{scope.row.status}}</span>
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
</template>
<script>
import { Shopcheck, Shoplist, Paydetail, userMenu } from "@/api";
export default {
  name: "payaudit",
  data() {
    return {
      current: 1,
      repeat: true,
      dealerName: "",
      size: 10,
      total: 0,
      Tstatus: "",
      radio: "",
      id: "",
      orderNo: "",
      status: "",
      userCode: "",
      options: [
        {
          value: null,
          label: "请选择状态"
        },
        {
          value: 1,
          label: "审核成功"
        },
        {
          value: 0,
          label: "待审核"
        },
        {
          value: 2,
          label: "审核失败"
        }
      ],
      tableData: [],
      power: {
        error: false,
        success: false
      }
    };
  },
  created() {
    this.check();
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
          if (item.permission == "sys.Menu.error") {
            this.power.error = item;
          } else if (item.permission == "sys.Menu.cusser") {
            this.power.success = item;
          }
        });
      });
    },
    chengeZT() {
      this.check();
    },
    Search() {
        this.current=1;
      this.check();
    },
    showRow(row) {
      this.radio = this.tableData.indexOf(row);
      this.id = row.id;
      this.Tstatus = row.status;
    },
    Success() {
      if (this.Tstatus != "待审核") {
        this.$message("这单已有审核结果！");
      } else {
        if (this.repeat == true) {
          this.repeat = false;
          this.$confirm("是否审核成功?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              let pay = {
                id: this.id,
                status: 1
              };
              Shopcheck(pay).then(res => {
                if (res.data.httpCode == 0) {
                  setTimeout(() => {
                    this.repeat = true;
                  }, 2000);
                  this.radio = "";
                  this.check();
                } else {
                  setTimeout(() => {
                    this.repeat = true;
                  }, 2000);
                }
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消审核"
              });
              setTimeout(() => {
                this.repeat = true;
              }, 2000);
              this.check();
            });
        }
      }
    },
    fail() {
      if (this.Tstatus != "待审核") {
        this.$message("这单已有审核结果！");
      } else {
        if (this.repeat == true) {
          this.repeat = false;
          this.$confirm("是否审核失败?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              let pay = {
                id: this.id,
                status: 2
              };
              Shopcheck(pay).then(res => {
                if (res.data.httpCode == 0) {
                  setTimeout(() => {
                    this.repeat = true;
                  }, 2000);
                  this.radio = "";
                  this.check();
                } else {
                  setTimeout(() => {
                    this.repeat = true;
                  }, 1000);
                }
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消审核"
              });
              setTimeout(() => {
                this.repeat = true;
              }, 2000);
              this.check();
            });
        }
      }
    },
    check() {
      let par = {
        dealerName: this.dealerName,
        status: this.status,
        pageNum: this.current,
        pageSize: this.size,
        orderNo: this.orderNo,
        userCode: this.userCode
      };
      Shoplist(par).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data);
          this.tableData = res.data.data;
          this.total = Number(res.data.total);
          this.tableData.forEach((item, index) => {
            item.activeColor = "";
            if (item.status == 0) {
              item.status = "待审核";
              item.activeColor = "black";
            } else if (item.status == 1) {
              item.status = "审核成功";
              item.activeColor = "green";
            } else if (item.status == 2) {
              item.status = "审核失败";
              item.activeColor = "red";
            }
            if (item.type == 0) {
              item.type = "银行卡";
            } else if (item.type == 1) {
              item.type = "支付宝";
            } else if (item.type == 2) {
              item.type = "微信";
            }
          });
        }
      });
    },
    handleSizeChange(val) {
      this.size = val;
      this.current = 1;
      this.check();
    },
    handleCurrentChange(val) {
      this.current = val;
      this.check();
    }
  }
};
</script>
<style lang="less" scoped>
.reflect {
  overflow: hidden;
  .wrap {
    margin-top: 20px;
    margin-left: 72px;
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
    }
    .btn {
      margin: 30px 0 0 0;
      button:nth-child(1) {
        margin: 0 120px 40px 0;
        float: right;
      }
      button:nth-child(2) {
        margin: 0 40px 40px 0;
        float: right;
      }
      button:nth-child(3) {
        margin: 0 40px 40px 0;
        float: right;
      }
    }
  }
  .details {
    margin-top: 85px;
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