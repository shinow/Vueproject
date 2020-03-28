<template>
  <div class="reflect">
    <div class="wrap">
      <div class="yonghu">
        <span>代理账号：</span>
        <el-input
          size="small"
          @change="check()"
          @keyup.enter.native="check()"
          style="width:200px"
          clearable
          v-model="accountA"
          placeholder="请输入内容"
        ></el-input>
        <span style="margin-left:20px">备注：</span>
        <el-input
          size="small"
          @change="check()"
          @keyup.enter.native="check()"
          style="width:200px"
          clearable
          v-model="remark"
          placeholder="请输入内容"
        ></el-input>
        <span style="margin-left:20px">交易日期：</span>
        <el-date-picker
          size="small"
          v-model="time"
          @change="chengeZT"
          type="daterange"
          align="right"
          value-format="yyyy-MM-dd"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2"
        ></el-date-picker>
        <span style="margin-left:20px">审核状态：</span>
        <el-select
          style="width:160px"
          @change="chengeZT"
          v-model="states"
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
      <div style="overflow:hidden">
        <div style="margin-top:20px;width:500px;float: left;" class="zong">
          <p>
            代理已充值金额转平台可消费额度(单位：元)：
            <span style="color:red">{{Ramt}}</span>
          </p>
          <p style="margin-top:10px">
            代理已消费额度转金额(单位：元)：
            <span style="color:red">{{Rmoney}}</span>
          </p>
        </div>
        <div style="margin-top:20px;width:400px;float: left;" class="zong">
          <p>
            代理剩余可消费额度(单位：元)：
            <span style="color:red">{{RsurplusAmt}}</span>
          </p>
          <p style="margin-top:10px">
            代理剩余金额(单位：元)：
            <span style="color:red">{{RsurplusMoney}}</span>
          </p>
        </div>
        <div style="margin-top:20px;width:400px;float: left;" class="zong">
          <p>
            代理已消费额度(单位：元)：
            <span style="color:red">{{RtotalAmt}}</span>
          </p>
          <p style="margin-top:10px">
            代理已充值金额(单位：元)：
            <span style="color:red">{{RtotalMoney}}</span>
          </p>
        </div>
        <div>
          <p style="margin-top:20px">
            代理总分润(单位：元)：
            <span style="color:red">{{agentFenRun}}</span>
          </p>
          <p style="margin-top:10px">
            代理分润点(单位：元)：
            <span style="color:red">{{rating}}</span>
          </p>
        </div>
      </div>
      <div class="btn">
        <el-button type="primary" @click="Search()" icon="el-icon-search ">搜索</el-button>
        <div v-if="Caiw">
          <el-button
            type="primary"
            :icon="power.add.iconcls"
            v-if="power.add.permission"
            @click="dialo()"
          >{{power.add.menuName}}</el-button>
        </div>
        <div v-if="T">
          <el-button
            type="danger"
            :icon="power.error.iconcls"
            v-if="power.error.permission"
            @click="fail()"
          >{{power.error.menuName}}</el-button>
        </div>
        <div v-if="T">
          <el-button
            type="success"
            :icon="power.success.iconcls"
            v-if="power.success.permission"
            @click="Success()"
          >{{power.success.menuName}}</el-button>
        </div>
        <div v-if="Caiw">
          <el-button
            type="warning"
            :icon="power.updata.iconcls"
            v-if="power.updata.permission"
            @click="Achnge()"
          >{{power.updata.menuName}}</el-button>
        </div>
        <el-button type="warning" @click="ecip()">导出充值记录</el-button>
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
          <el-table-column label="请选择" width="70">
            <template slot-scope="scope">
              <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="account" show-overflow-tooltip align="center" label="卡号"></el-table-column>
          <el-table-column prop="bank" show-overflow-tooltip align="center" label="银行名称"></el-table-column>
          <el-table-column prop="money" align="center" label="金额"></el-table-column>
          <el-table-column prop="consumableAmount" align="center" label="可消费额度"></el-table-column>
          <el-table-column
            prop="createTime"
            :show-overflow-tooltip="true"
            label="创建时间"
            align="center"
          >
            <template slot-scope="scope">{{ scope.row.createTime }}</template>
          </el-table-column>
          <el-table-column prop="remark" show-overflow-tooltip align="center" label="备注信息">
            <template slot-scope="scope">{{ scope.row.remark }}</template>
          </el-table-column>
          <el-table-column prop="states" align="remark" label="状态">
            <template slot-scope="scope">
              <span :style="{color:scope.row.activeColor}">{{scope.row.states}}</span>
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
    <div class="tank">
      <el-dialog :visible.sync="dialogVisible" width="30%">
        <ul>
          <li>
            <span>充值卡号：</span>
            <el-input style="width:200px" v-model="Aaccount" placeholder="请输入充值卡号"></el-input>
          </li>
          <li>
            <span>银行名称：</span>
            <el-input style="width:200px" v-model="Abank" placeholder="请输入银行名称"></el-input>
          </li>
          <li>
            <span>充值金额：</span>
            <el-input style="width:200px" v-model="Amoney" placeholder="请输入充值金额"></el-input>
          </li>
          <li>
            <span>充值备注：</span>
            <el-input style="width:200px" v-model="Aremark" placeholder="请输入充值备注"></el-input>
          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisiblee()">{{Aenter}}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  Relist,
  Readd,
  user,
  Reaudit,
  Redetail,
  Reupdate,
  ReownerExport,
  userMenu
} from "@/api";
export default {
  name: "payaudit",
  data() {
    return {
      T: true,
      accountA: "",
      Aenter: "确认添加",
      dialogVisible: false,
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      Ramt: "",
      Rmoney: "",
      RsurplusAmt: "",
      RsurplusMoney: "",
      RtotalAmt: "",
      RtotalMoney: "",
      agentFenRun: "",
      current: 1,
      repeat: true,
      size: 10,
      states: "",
      Ahea: "",
      total: 0,
      Tstates: "",
      remark: "",
      time: "",
      radio: "",
      id: "",
      states: "",
      Caiw: true,
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
        success: false,
        add: false,
        updata: false
      },
      Aid: "",
      fenr: "",
      repeat: true,
      Aaccount: "",
      Abank: "",
      Amoney: "",
      Aremark: "",
      rating: ""
    };
  },
  created() {
    this.getUser();
  },
  mounted() {
    this.check();
    this.Concealment();
  },
  methods: {
    getUser() {
      user().then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data);
          if (res.data.data.account == "caiwu") {
            this.Caiw = false;
          } else {
            this.T = false;
          }
        }
      });
    },
    Achnge() {
      if (this.radio === "") {
        this.$message.warning("请选择一条要修改的数据！");
        return;
      }
      if (this.Tstates == "审核失败" || this.Tstates == "审核成功") {
        this.$message.warning("这单已有审核结果！");
        return;
      }
      Redetail("" + this.id).then(res => {
        if (res.data.httpCode == "0") {
          this.dialogVisible = true;
          this.Aaccount = res.data.data.account;
          this.Abank = res.data.data.bank;
          this.Amoney = res.data.data.money / 100;
          this.Aremark = res.data.data.remark;
          this.Aid = res.data.data.id;
          this.Aenter = "确认修改";
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    dialo() {
      (this.Aaccount = ""),
        (this.Abank = ""),
        (this.Amoney = ""),
        (this.Aremark = ""),
        (this.Aenter = "确认添加"),
        (this.dialogVisible = true);
    },
    dialogVisiblee() {
      if (
        this.Aaccount === "" ||
        this.Abank === "" ||
        this.Amoney === "" ||
        this.Aremark === ""
      ) {
        this.$message.warning("请输入对应内容！");
        return;
      }
      if (this.Aenter == "确认修改") {
        let doy = {
          account: this.Aaccount, //卡号
          bank: this.Abank, //银行名称
          id: this.Aid,
          money: this.Amoney, //金额  单位元
          remark: this.Aremark //备注
        };
        Reupdate(doy).then(res => {
          if (res.data.httpCode == 0) {
            console.log(res.data);
            this.dialogVisible = false;
            this.check();
            this.radio = "";
          } else {
            this.$message.error(res.data.msg);
          }
        });
      } else {
        if (this.repeat == true) {
          let pay = {
            account: this.Aaccount, //卡号
            bank: this.Abank, //银行名称
            money: this.Amoney, //金额  单位元
            remark: this.Aremark //备注
          };
          Readd(pay).then(res => {
            this.repeat = false;
            if (res.data.httpCode == 0) {
              console.log(res.data);
              this.Aaccount = "";
              this.Abank = "";
              this.Amoney = "";
              this.Aremark = "";
              this.dialogVisible = false;
              this.check();
              setTimeout(() => {
                this.repeat = true;
              }, 2000);
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }
      }
    },
    Concealment() {
      userMenu({
        menuType: 1,
        parentId: this.$route.query.id
      }).then(res => {
        var concea = res.data.data;
        concea.map(item => {
          if (item.permission == "sys.Recg.error") {
            this.power.error = item;
          } else if (item.permission == "sys.Recg.cusser") {
            this.power.success = item;
          } else if (item.permission == "sys.Recg.add") {
            this.power.add = item;
          } else if (item.permission == "sys.Recg.updata") {
            this.power.updata = item;
          }
        });
      });
    },
    chengeZT() {
      this.check();
    },
    Search() {
      this.current = 1;
      this.check();
    },
    showRow(row) {
      this.radio = this.tableData.indexOf(row);
      this.id = row.id;
      this.Tstates = row.states;
    },
    Success() {
      if (this.radio === "") {
        this.$message.warning("请选择要审核的数据！");
        return;
      }
      if (this.Tstates != "待审核") {
        this.$message.warning("这单已有审核结果！");
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
                states: 1
              };
              Reaudit(pay).then(res => {
                if (res.data.httpCode == 0) {
                  this.radio = "";
                  this.check();
                  setTimeout(() => {
                    this.repeat = true;
                  }, 1000);
                  console.log(res.data.data);
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
              }, 1000);
            });
        }
      }
    },
    fail() {
      if (this.radio === "") {
        this.$message.warning("请选择要审核的数据！");
        return;
      }
      if (this.Tstates != "待审核") {
        this.$message.warning("这单已有审核结果！");
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
                states: 2
              };
              Reaudit(pay).then(res => {
                if (res.data.httpCode == 0) {
                  this.radio = "";
                  this.check();
                  setTimeout(() => {
                    this.repeat = true;
                  }, 1000);
                  console.log(res.data.data);
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
              }, 1000);
            });
        }
      }
    },
    ecip() {
      var xport = {};
      if (this.time === "" || this.time == null || this.time == undefined) {
        xport = {
          states: this.states,
          remark: this.remark,
          account: this.accountA
        };
      } else {
        xport = {
          states: this.states,
          remark: this.remark,
          account: this.accountA,
          startTime: this.time[0] + " 00:00:00",
          endTime: this.time[1] + " 23:59:59"
        };
      }

      ReownerExport(xport).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data);
          this.Ahea = res.data.downUrl;
          window.open(res.data.downUrl);
        }
      });
    },
    check() {
      var par = {};
      if (this.time === "" || this.time == null || this.time == undefined) {
        par = {
          states: this.states,
          pageNum: this.current,
          remark: this.remark,
          account: this.accountA,
          pageSize: this.size
        };
      } else {
        par = {
          states: this.states,
          pageNum: this.current,
          remark: this.remark,
          pageSize: this.size,
          account: this.accountA,
          startTime: this.time[0] + " 00:00:00",
          endTime: this.time[1] + " 23:59:59"
        };
      }
      Relist(par).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data);
          this.tableData = res.data.data.page.records;
          this.total = Number(res.data.data.page.total);
          this.Ramt = res.data.data.amt;
          this.Rmoney = res.data.data.money;
          this.RsurplusAmt = res.data.data.surplusAmt;
          this.RsurplusMoney = res.data.data.surplusMoney;
          this.RtotalAmt = res.data.data.totalAmt;
          this.agentFenRun = res.data.data.agentFenRun;
          this.RtotalMoney = res.data.data.totalMoney;
          this.rating = res.data.data.rating;
          this.tableData.forEach((item, index) => {
            item.activeColor = "";
            if (item.states == "0") {
              item.states = "待审核";
              item.activeColor = "black";
            } else if (item.states == "1") {
              item.states = "审核成功";
              item.activeColor = "green";
            } else if (item.states == "2") {
              item.states = "审核失败";
              item.activeColor = "red";
            }
            //（金额 /100）/（（100-rating）/100）
            item.money = item.money / 100;
            let fe = (100 - this.rating) / 100;
            item.consumableAmount = (item.money / fe).toFixed(2);

            if (item.consumableAmount == undefined) {
              item.consumableAmount = 0;
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
    .btn {
      margin: 15px 0 0 0;
      button:nth-child(1) {
        margin: 0 50px 20px 0;
        float: right;
      }
      button:nth-child(2) {
        margin: 0 40px 20px 0;
        float: right;
      }
      button:nth-child(3) {
        margin: 0 40px 20px 0;
        float: right;
      }
      button:nth-child(4) {
        margin: 0 40px 20px 0;
        float: right;
      }
      button:nth-child(5) {
        margin: 0 40px 20px 0;
        float: right;
      }
    }
  }
  .details {
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
  .tank {
    ul {
      margin-top: -20px;
      li {
        text-align: center;
        margin: 20px 0 0 0;
      }
    }
  }
}
</style>