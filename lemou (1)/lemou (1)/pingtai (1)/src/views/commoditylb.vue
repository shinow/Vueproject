<template>
  <div class="commoditylb">
    <!-- <div class="btnw">
            <button>日常任务商品</button>
            <button @click="tbrenw()">淘宝任务商品</button>
    </div>-->
    <div class="yonghu">
      <span>商品ID：</span>
      <el-input
        size="small"
          clearable
            @change="Administrators()"
        @keyup.enter.native="Administrators()"
        style="width:160px"
        v-model="dityId"
        placeholder="请输入内容"
      ></el-input>
      <span>状态：</span>
      <el-select
        style="width:160px"
        @change="Administrators()"
        v-model="value2"
        size="small"
        placeholder="请选择状态"
      >
        <el-option
          v-for="item in optionss"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span>名称：</span>
      <el-input
        size="small"
          clearable
            @change="Administrators()"
        @keyup.enter.native="Administrators()"
        style="width:160px"
        v-model="name"
        placeholder="请输入内容"
      ></el-input>
    </div>
    <div class="btn">
      <el-button type="primary" @click="Search()" icon="el-icon-search ">搜索</el-button>
      <!-- <button @click="Search()">搜索</button> -->

      <el-button style="margin-left:22px" @click="clbxinz()" type="warning">新增</el-button>
      <!-- <button >+ 新增</button> -->
    </div>
    <div class="details">
      <el-table style="width:100%" :data="tableData" stripe border>
        <el-table-column align="center" prop="dityId" label="ID" width="70"></el-table-column>
        <el-table-column prop="imagesUrl" label="图片" align="center" >
          <template slot-scope="scope">
            <img style="width:60px;height:60px" :src="scope.row.imagesUrl" alt />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" align="center" ></el-table-column>
        <el-table-column prop="num" label="数量(组)" align="center" ></el-table-column>
        <el-table-column prop="sellPrice" align="center" label="售价(组)" >
          <template slot-scope="scope">
            <span>{{(scope.row.sellPrice)/100}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" align="center" label="上下架">
          <template slot-scope="scope">
            <el-switch
              @change="change(scope.row.id,scope.row.status)"
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="caozuo" label="操作" align="center" >
          <template slot-scope="scope">
            <!-- <el-button
              style="background:rgba(255,103,82,1);
border-radius:4px;
font-size:14px;
padding: 1px 12px;
color:rgba(254,254,254,1);"
              @click="handleClick(scope.row,scope.row.id)"
              type="text"
              size="small"
            >删除</el-button>-->

            <el-button
              style="background:rgba(255,103,82,1);
border-radius:4px;
font-size:14px;
padding: 1px 12px;
color:rgba(254,254,254,1);"
              @click="handleClick1(scope.row,scope.row.id)"
              type="text"
              size="small"
            >编辑</el-button>
            <!-- <img src="../assets/tieba-4 拷贝.png" alt=""> -->
            <!-- <el-button
              style="background:rgba(255,103,82,1);
border-radius:4px;
font-size:14px;
padding: 1px 12px;
color:rgba(254,254,254,1);"
              @click="handleClick2(scope.row,scope.row.id)"
              type="text"
              size="small"
            >查看进价</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="text-align:center;margin-top: 10px;">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="current"
          :page-sizes="[5, 20, 50,100]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { Commstatus, Commlist, CommwholesalePrice, Commdelete } from "@/api";
export default {
  name: "commoditylb",
  data() {
    return {
      Price: [],
      datas: [],
      dityId: "", //商品ID编号
      name: "", //商品名称
      orderBy: "", //根据字段排序
      // status: 0,//商品状态 0上架 1下架
      current: 1,
      size: 5,
      total: 0,
      dialogVisible: false,
      jin: false,
      // prices: "",
      ZPrices: [],
      shanchu: false,
      input: "",
      value: true,
      id: "",
      tableData: [],
      value2: "",
      optionss: [
        {
          value: null,
          label: "请选择状态"
        },
        {
          value: 0,
          label: "开启"
        },
        {
          value: 1,
          label: "关闭"
        }
      ]
    };
  },
  created() {
    this.Administrators();
  },
  methods: {
    Search() {
      this.Administrators();
    },
    change(e, i) {
      if (i == true) {
        i = 0;
      } else if (i == false) {
        i = 1;
      }
      let par = {
        id: e,
        status: i
      };
      Commstatus(par).then(res => {
        console.log(res);
        // i = true;
        this.Administrators();
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
        pageNum: this.current, //当前页数
        pageSize: this.size, //每页条数
        dityId: this.dityId, //商品ID编号
        name: this.name, //商品名称
        status: this.value2 //商品状态 0上架 1下架
      };
      Commlist(par).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res);
          this.tableData = res.data.data;

          this.tableData.forEach((item, index) => {
            if (item.status == 0) {
              item.status = true;
            } else if (item.status == 1) {
              item.status = false;
            }
          });
          this.total = Number(res.data.total);
        }
      });
    },
    handleClick2(row, i) {
      this.dialogVisible = true;
      CommwholesalePrice(i).then(res => {
        if (res.data.httpCode == 0) {
          this.Price = res.data.data;
          let arr = [];
          res.data.data.forEach((item, index) => {
            arr.push(item.prices);
          });
          this.ZPrices = arr[0];
        }
      });
    },
    tbrenw() {
      this.$router.push({
        name: "tbrenw"
      });
    },
    handleClick1(row, i) {
      this.$router.push({
        name: "clbbz",
        query: {
          ids: i
        }
      });
    },
    clbxinz() {
      this.$router.push({
        name: "clbxinz"
      });
    },
    handleClick(row, i) {
      this.$confirm("是否删除该商品?", "提示", {
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
      this.id = i;
    },
    yes() {
      Commdelete(this.id).then(res => {
        if (res.data.httpCode == 0) {
          this.Administrators();
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.commoditylb {
  overflow: hidden;
  .btnw {
    margin-left: 72px;
    button:nth-child(1) {
      width: 123px;
      height: 49px;
      background: rgba(18, 229, 0, 1);
      border-radius: 9px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      color: rgba(255, 255, 255, 1);
      line-height: 19px;
    }
    button:nth-child(2) {
      margin-left: 50px;
      width: 123px;
      height: 49px;
      background: rgba(254, 154, 13, 1);
      border-radius: 8px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      color: rgba(255, 255, 255, 1);
      line-height: 19px;
    }
  }
  .yonghu {
    margin-left: 72px;
    margin-top: 20px;
    font-size: 20px;
    font-family: Songti SC;
    font-weight: 400;
    color: rgba(1, 1, 1, 1);
    line-height: 26px;
    span:nth-child(3) {
      margin-left: 60px;
    }
    span:nth-child(5) {
      margin-left: 60px;
    }
    span:nth-child(7) {
      margin-left: 60px;
    }
  }
  .btn {
    margin: 30px 0 0 1020px;
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
