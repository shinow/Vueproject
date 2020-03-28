<template>
  <div class="reflect">
    <div class="wrap">
      <div class="yonghu">
        <span>上游编号：</span>
        <el-input
          size="small"
          clearable
          @change="list()"
          @keyup.enter.native="list()"
          style="width:200px"
          v-model="mercCode"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="btn">
        <el-button type="primary" @click="Search()" icon="el-icon-search ">搜索</el-button>
        <el-button style="margin-left:22px" @click="XinZeng=true" type="warning">新增</el-button>
      </div>
    </div>
    <div class="details">
      <el-table style="width:100%" :max-height="700" :data="tableData" stripe border>
        <el-table-column prop="mercCode" label="上游编号" align="center"></el-table-column>
        <el-table-column prop="name" label="名称
" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>

        <el-table-column prop="status" align="remark" label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.status}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" align="remark" label="操作状态" width="300">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="handleClick(scope.row,scope.row.id)"
            >编辑上游管理详情</el-button>
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

    <div class="xiangq">
      <el-dialog title="编辑上游管理" :visible.sync="dialogVisible" width="30%">
        <ul>
          <li style="margin-left:30px">
            <span>上游编号:</span>
            <el-input style="width:160px" v-model="Detail.mercCode"></el-input>
          </li>
          <li style="margin-left:30px">
            <span>上游名称:</span>
            <el-input style="width:160px" v-model="Detail.name"></el-input>
          </li>
          <li style="margin-left:65px">
            <span>状态:</span>
            <el-select
              style="width:160px"
              v-model="CZtype"
              @change="changeZT(CZtype)"
              placeholder="请选择操作状态"
            >
              <el-option
                v-for="item in CZtypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </li>
          <li style="margin-left:65px">
            <span>备注:</span>
            <el-input style="width:160px" v-model="Detail.remark"></el-input>
          </li>
        </ul>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisibleA">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="xinz">
      <el-dialog title="添加上游" :visible.sync="XinZeng" width="30%">
        <ul>
          <li style="margin-left:30px">
            <span>上游编号:</span>
            <el-input style="width:160px" v-model="SYmercCode"></el-input>
          </li>
          <li style="margin-left:30px">
            <span>上游名称:</span>
            <el-input style="width:160px" v-model="SYname"></el-input>
          </li>
          <li style="margin-left:70px">
            <span>备注:</span>
            <el-input style="width:160px" v-model="SYmark"></el-input>
          </li>
        </ul>

        <span slot="footer" class="dialog-footer">
          <el-button @click="XinZeng = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisibleB">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { Uplist, Updetail, Dealist, Upupdate, Paydelete, Upadd } from "@/api";
export default {
  name: "upment",
  data() {
    return {
      SYname: "",
      SYmark: "",
      repeatbj: true,
      repeat: true,
      SYmercCode: "",
      input1: "",
      dialogVisible: false,
      current: 1,
      size: 10,
      value: "",
      mercCode: "",
      id: "",
      XinZeng: false,
      total: 0,
      CZtype: "",
      mercCode: "",
      dealerCode: "",
      tableData: [],
      Detail: "",
      options: [],
      CZtypes: [
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
    this.list();
  },
  methods: {
    Search() {
        this.current=1;
      this.list();
    },
    dialogVisibleA() {
      if (this.repeatbj == true) {
        this.repeatbj = false;
        if (this.CZtype == "开启") {
          this.CZtype = 0;
        } else if (this.CZtype == "关闭") {
          this.CZtype = 1;
        }
        let par = {
          name: this.Detail.name,
          id: this.id,
          mercCode: this.Detail.mercCode,
          status: this.CZtype,
          remark: this.Detail.remark
        };
        Upupdate(par).then(res => {
          if (res.data.httpCode == 0) {
            console.log(res.data.data);
            this.repeatbj = true;
            this.list();
            this.dialogVisible = false;
          }
        });
      }
    },
    dialogVisibleB() {
      if (this.SYmercCode === "" || this.SYname === "" || this.SYmark === "") {
        this.$message.warning("请输入对应内容！");
        return;
      }
      if (this.repeat == true) {
        this.repeat = false;
        let par = {
          mercCode: this.SYmercCode, //上游编号
          name: this.SYname, //上游名称
          remark: this.SYmark //备注
        };
        Upadd(par).then(res => {
          if (res.data.httpCode == 0) {
            this.XinZeng = false;
            console.log(res.data.data);
            setTimeout(() => {
              this.repeat = true;
              this.SYmercCode = "";
              this.SYname = "";
              this.SYmark = "";
            }, 2000);
            this.list();
          }
        });
      }
    },
    handleClick(row, ID) {
      this.dialogVisible = true;
      this.id = ID;
      Updetail(ID).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data.data);
          this.Detail = res.data.data;

          if (this.Detail.status == "0") {
            this.CZtype = "开启";
          } else if (this.Detail.status == "1") {
            this.CZtype = "关闭";
          }
        }
      });
    },
    change(val) {
      this.value = val;
      let obj = {};
      obj = this.options.find(item => {
        return item.id === val;
      });
      this.name = obj.name;
    },
    changeZT(val) {
      this.CZtype = val;
    },
    list() {
      let par = {
        pageNum: this.current,
        pageSize: this.size,
        mercCode: this.mercCode
      };
      Uplist(par).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data);
          this.tableData = res.data.data;
          this.total = Number(res.data.total);
          this.tableData.forEach((item, index) => {
            if (item.status == 0) {
              item.status = "开启";
            } else if (item.status == 1) {
              item.status = "关闭";
            }
          });
        }
      });
    },
    handleSizeChange(val) {
      this.size = val;
      this.current = 1;
      this.list();
    },
    handleCurrentChange(val) {
      this.current = val;
      this.list();
    }
  }
};
</script>
<style lang="less" scoped>
.reflect {
  overflow: hidden;
  .wrap {
    margin-left: 72px;
    margin-top: 20px;
    .yonghu {
      font-size: 20px;
      font-family: Songti SC;
      font-weight: 400;
      color: rgba(1, 1, 1, 1);
      line-height: 26px;
    }
    .btn {
      margin: 20px 0 30px 0;
      float: right;
      margin-right: 200px;
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
  .xiangq {
    ul {
      text-align: center;
      li {
        margin-top: 20px;
        font-size: 20px;
      }
    }
  }
  .xinz {
    ul {
      text-align: center;
      li {
        margin-top: 20px;
        font-size: 20px;
      }
    }
  }
}
</style>