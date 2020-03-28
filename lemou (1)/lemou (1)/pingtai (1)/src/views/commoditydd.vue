<template>
  <div class="commoditydd">
    <div class="wrap">
      <div class="yonghu">
        <span>订单号：</span>
        <el-input
          size="small"
            clearable
            @change="Administrators()"
          @keyup.enter.native="Administrators()"
          style="width:160px"
          v-model="orderNo"
          placeholder="请输入内容"
        ></el-input>
        <span>状态：</span>
        <el-select
          style="width:160px"
          v-model="value"
          size="small"
          @change="Administrators()"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span>所属经销商：</span>
        <el-input
          clearable
            @change="Administrators()"
          size="small"
          @keyup.enter.native="Administrators()"
          style="width:160px"
          v-model="dealerName"
          placeholder="请输入内容"
        ></el-input>
        <span>收货人：</span>
        <el-input
          clearable
            @change="Administrators()"
          size="small"
          @keyup.enter.native="Administrators()"
          style="width:160px"
          v-model="name"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="btn">
        <el-button type="primary" @click="Search()" icon="el-icon-search ">搜索</el-button>
        <!-- <button @click="Search()">搜索</button> -->
      </div>
      <div class="details">
        <el-table
          :stripe="true"
          highlight-current-row
          border
          :max-height="700"
          style="width: 100%"
          :data="tableData"
        >
          <el-table-column
            :show-overflow-tooltip="true"
            align="center"
            prop="orderNo"
            label="订单号"
            width="240"
          ></el-table-column>
          <el-table-column prop="dealerName" label="所属经销商" align="center" width="180"></el-table-column>
          <el-table-column prop="name" label="用户" align="center" width="180"></el-table-column>
          <el-table-column prop="status" label="状态" align="center" width="170"></el-table-column>
          <el-table-column prop="quota" align="center" label="总金额" width="160">
            <template slot-scope="scope">
              <span>{{(scope.row.quota)/100}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="totalQuota" label="已成交" align="center" width="170">
            <template slot-scope="scope">
              <span>{{(scope.row.totalQuota)/100}}</span>
            </template>
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="createTime"
            align="center"
            label="下单时间"
            width="260"
          ></el-table-column>
          <el-table-column prop="caozuo" label="操作" align="center" width="260">
            <template slot-scope="scope">
              <el-button
                style="
                      padding:3px 13px;
                      font-size:20px;
font-family:Songti SC;
font-weight:400;
color:rgba(255,104,82,1);
border:1px solid rgba(255,104,82,1);
border-radius:4px;;"
                @click="handleClick(scope.row,scope.row.id)"
                type="text"
                size="small"
              >成交明细</el-button>
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
  </div>
</template>
<script>
import { Orderlist } from "@/api";
export default {
  name: "commoditydd",
  data() {
    return {
      orderNo: "",
      dealerName: "",
      name: "",
      current: 1,
      size: 10,
      total: 0,
      value: "",
      datak: [],
      options: [
        {
          value: null,
          label: "请选择状态"
        },
        {
          value: 0,
          label: "待付款"
        },
        {
          value: 1,
          label: "待出售"
        },
        {
          value: 2,
          label: "交易中"
        },
        {
          value: 3,
          label: "售罄"
        },
        {
          value: 4,
          label: "完成"
        },
        {
          value: 5,
          label: "待审核"
        },
        {
          value: 6,
          label: "审核失败"
        }
      ],
      tableData: []
    };
  },
  created() {
    this.Administrators();
  },
  methods: {
    Search() {
        this.current=1;
      this.Administrators();
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
        orderNo: this.orderNo,
        dealerName: this.dealerName,
        dealerId: this.dealerId,
        status: this.value,
        name: this.name
      };
      Orderlist(par).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res);
          res.data.data.forEach((item, index) => {
            if (item.status == 0) {
              item.status = "待付款";
            } else if (item.status == 1) {
              item.status = "待出售";
            } else if (item.status == 2) {
              item.status = "交易中";
            } else if (item.status == 3) {
              item.status = "售罄";
            } else if (item.status == 4) {
              item.status = "完成";
            } else if (item.status == 5) {
              item.status = "审核中";
            } else if (item.status == 6) {
              item.status = "审核失败";
            }
          });
          this.tableData = res.data.data;
          this.total = Number(res.data.total);
        }
      });
    },
    handleClick(row, id) {
      this.$router.push({
        name: "cddming",
        query: {
          ids: id
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.commoditydd {
  overflow: hidden;
  .wrap {
    margin-top: 20px;
    margin-left: 50px;
    .yonghu {
      font-size: 20px;
      font-family: Songti SC;
      font-weight: 400;
      color: rgba(1, 1, 1, 1);
      line-height: 26px;
      span:nth-child(3) {
        margin-left: 80px;
      }
      span:nth-child(5) {
        margin-left: 90px;
      }
      span:nth-child(7) {
        margin-left: 80px;
      }
    }
    .btn {
      margin: 30px 0 0 1120px;
      // button:nth-child(1) {
      //   color: white;
      //   width: 110px;
      //   height: 42px;
      //   background: rgba(88, 104, 217, 1);
      //   border-radius: 4px;
      // }
      // button:nth-child(2) {
      //   color: white;
      //   width: 110px;
      //   height: 42px;
      //   background: rgba(70, 212, 186, 1);
      //   border-radius: 4px;
      //   margin-left: 22px;
      // }
    }
    .details {
      margin-top: 65px;
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