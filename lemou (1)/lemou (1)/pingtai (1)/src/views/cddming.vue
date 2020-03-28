<template>
  <div class="cddming">
    <div class="head">
      <span @click="commoditydd()">商品订单 /</span>
      <span>成交明细</span>
    </div>
    <div class="cont">
      <div class="details">
        <el-table style="width:75.5%" :data="tableData" stripe border>
          <el-table-column align="center" prop="bankFlowno" label="流水号" width="320"></el-table-column>
          <el-table-column prop="jine" label="成交金额" align="center" width="225">
            <template slot-scope="scope">
              <span>{{(scope.row.money)/100}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="时间" align="center" width="305"></el-table-column>
          <el-table-column prop="balance" label="剩余额度" align="center" width="235">
            <template slot-scope="scope">
              <span>{{(scope.row.balance)/100}}</span>
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
  </div>
</template>
<script>
import { Orderdetail } from "@/api";
export default {
  name: "cddming",
  data() {
    return {
      id: "",
      orderNo: "",
      dealerName: "",
      name: "",
      current: 1,
      size: 10,
      total: 0,
      value: "",
      datak: [],
      tableData: []
    };
  },
  created() {
    this.id = this.$route.query.ids;
    this.Administrators();
  },
  methods: {
    commoditydd() {
      this.$router.push({
        name: "commoditydd"
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
    Administrators() {
      let par = {
        pageNum: this.current,
        pageSize: this.size,
        orderId: this.id
      };
      Orderdetail(par).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data);
          this.tableData = res.data.data;
          this.total = Number(res.data.total);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.cddming {
  overflow: hidden;
  .head {
    margin-top: 20px;
    margin-left: 50px;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(24, 24, 24, 1);
  }
  .cont {
    margin: 40px 0 0 129px;
    .details {
      margin-left: 50px;
      margin-top: 100px;

      .block {
        position: fixed;
        right: 600px;
        bottom: 10px;
      }
    }
  }
}
</style>