<template>
  <div class="reflect">
    <div class="wrap">
      <div class="yonghu">
        <span>经销商编号：</span>
        <el-input
          size="small"

           clearable
            @change="list()"
          @keyup.enter.native="list()"
          style="width:200px"
          v-model="dealerCode"
          placeholder="请输入内容"
        ></el-input>
        <span>路由编号：</span>
        <el-input
          size="small"
           clearable
            @change="list()"
          @keyup.enter.native="list()"
          style="width:200px"
          v-model="AmercCode"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="btn">
        <el-button type="primary" @click="Search()" icon="el-icon-search ">搜索</el-button>
        <el-button style="margin-left:22px" @click="XinZeng=true" type="warning">新增</el-button>
      </div>
  
    </div>
        <div style="margin-top:20px" class="details">
        <el-table style="width:100%" :data="tableData"  border stripe>
          <el-table-column prop="mercCode" label="路由编号" align="center" ></el-table-column>
          <el-table-column prop="mercName" label="路由名称
" align="center" ></el-table-column>
          <el-table-column prop="dealerName" label="经销商名称" align="center" ></el-table-column>
          <el-table-column prop="status" align="remark" label="状态" >
            <template slot-scope="scope">
              <span>{{scope.row.status}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" align="remark" label="操作状态" width="450">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="handleClick(scope.row,scope.row.id)">编辑路由管理详情</el-button>
              <el-button type="danger" size="small" @click="DehandleClick(scope.row,scope.row.id)">删除路由管理表</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="text-align:center;margin-top: 10px;">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="current"
            :page-sizes="[10, 20,50, 100]"
            :page-size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>

      <div class="xiangq">
        <el-dialog title="编辑路由管理" :visible.sync="dialogVisible" width="30%">
          <ul>
            <!-- <li>
              <span>经销商Code:</span>
              <el-input style="width:160px" v-model="Detail.dealerCode" :disabled="true"></el-input>
            </li>-->
            <li style="margin-left:10px;margin-left:50px">
              <span>经销商:</span>
              <el-select v-model="valueh" style="width:160px;" @change="change" placeholder="请选择经销商">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.dealerId"
                  :value="item.id"
                ></el-option>
              </el-select>
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
            <li style="margin-left:30px">
              <span>路由编号:</span>
              <el-input style="width:160px" v-model="Detail.mercCode"></el-input>
            </li>
            <li style="margin-left:30px">
              <span>路由名称:</span>
              <el-input style="width:160px" v-model="Detail.mercName" :disabled="true"></el-input>
            </li>
          </ul>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisibleA">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <div class="xinz">
        <el-dialog title="添加路由" :visible.sync="XinZeng" width="30%">
          <ul>
            <li style="margin-left:10px;margin-left:30px">
              <span>经销商：</span>
              <el-select v-model="value" style="width:160px;" @change="change" placeholder="请选择经销商">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.dealerId"
                  :value="item.id"
                ></el-option>
              </el-select>
            </li>
            <li style="margin-left:30px">
              <span>路由编号:</span>
              <el-input style="width:160px" v-model="mercCode"></el-input>
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
import {
  Paylist,
  Paydetail,
  Dealist,
  Payupdate,
  Paydelete,
  Payadd
} from "@/api";
export default {
  name: "routement",
  data() {
    return {
      input1: "",
      dialogVisible: false,
      current: 1,
      size:10,
      value: "",
      valueh:"",
      mercCode: "",
      id: "",
      AmercCode: "",
      XinZeng: false,
      total: 0,
      CZtype: "",
      // XinZeng:"",
      mercCode: "",
      dealerCode: "",
      tableData: [],
      Detail: "",
      options: [],
      repeat: true,
      repeatbj: true,
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
    this.Administrators();
  },
  methods: {
    Search() {
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
          dealerId: this.valueh,
          id: this.id,
          mercCode: this.Detail.mercCode,
          status: this.CZtype
        };
        Payupdate(par).then(res => {
          if (res.data.httpCode == 0) {
            console.log(res.data.data);

            this.list();
            this.dialogVisible = false;
            setTimeout(() => {
              this.repeatbj = true;
            }, 2000);
          }
        });
      }
    },
    dialogVisibleB() {
      if (this.value===""||this.mercCode==="") {
           this.$message.warning("请输入对应内容！");
        return
      }
      if (this.repeat == true) {
        this.repeat = false;
        let par = {
          dealerId: this.value,
          mercCode: this.mercCode
        };
        Payadd(par).then(res => {
          if (res.data.httpCode == 0) {
            console.log(res.data.data);

            this.list();
            this.XinZeng = false;
            setTimeout(() => {
              this.repeat = true;
            }, 2000);
          }
        });
      }
    },
    Administrators() {
      let par = {
        pageNum: this.current, //当前页数
        pageSize: this.size //每页条数
      };
      Dealist(par).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data);
          this.options = res.data.data;
        }
      });
    },
    handleClick(row, ID) {
      this.dialogVisible = true;
      this.id = ID;
      Paydetail(ID).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data.data);
          this.Detail = res.data.data;
          if (this.Detail.status == "0") {
            this.CZtype = "开启";
          } else if (this.Detail.status == "1") {
            this.CZtype = "关闭";
          }
          this.valueh=this.Detail.dealerId
        }
      });
    },
    DehandleClick(row, ID) {
      this.$confirm("是否删除该路由信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Paydelete(ID).then(res => {
            if (res.data.httpCode == 0) {
              console.log(res.data.data);
              this.list();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      // this.list();
    },
    change(val) {
      this.value = val;
      let obj = {};
      obj = this.options.find(item => {
        return item.id === val;
      });
      this.name = obj.dealerId;
    },
    changeZT(val) {
      this.CZtype = val;
    },
    list() {
      var par = {
        pageNum: this.current,
        pageSize: this.size,
        dealerCode: this.dealerCode,
        mercCode: this.AmercCode
      };
      if (
        this.dealerCode == null ||
        this.dealerCode === "" ||
        this.dealerCode == undefined
      ) {
        par = {
          pageNum: this.current,
          pageSize: this.size,
          mercCode: this.AmercCode
        };
      }
      Paylist(par).then(res => {
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
      span:nth-child(3) {
        margin-left: 50px;
      }
      span:nth-child(5) {
        margin-left: 50px;
      }
      span:nth-child(7) {
        margin-left: 50px;
      }
    }
    .btn {
      overflow: hidden;
      margin: 20px 0 30px 0;
      float: right;
      margin-right: 200px;
    }
  
  }
    .details {
      margin-top: 80px;
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