<template>
  <div class="reflect">
    <div class="wrap">
      <div class="yonghu">
        <span>姓名：</span>
        <el-input
          size="small"
          clearable
          @change="list()"
          @keyup.enter.native="list()"
          style="width:140px"
          v-model="Aname"
          placeholder="请输入内容"
        ></el-input>
        <span>状态：</span>
        <el-select
          style="width:140px"
          v-model="status"
          @change="list()"
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
        <span>提现类型：</span>
        <el-select
          style="width:140px"
          @change="list()"
          v-model="Ttype"
          size="small"
          placeholder="请选择账户类型"
        >
          <el-option
            v-for="item in optionss"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span>时间：</span>
        <el-date-picker
          size="small"
          v-model="time"
          type="daterange"
          @change="list()"
          align="right"
          value-format="yyyy-MM-dd"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2"
        ></el-date-picker>
      </div>
      <div class="btn">
        <span></span>
        <el-button
          type="success"
          :icon="power.success.iconcls"
          v-if="power.success.permission"
          @click="Success()"
        >{{power.success.menuName}}</el-button>

        <el-button
          type="info"
          :icon="power.error.iconcls"
          v-if="power.error.permission"
          @click="info()"
        >{{power.error.menuName}}</el-button>
        <el-button style="margin-left:50px" type="primary" icon="el-icon-search" @click="list()">搜索</el-button>
        <el-button
          type="warning"
          :icon="power.add.iconcls"
          v-if="power.add.permission"
          @click="dialogVisible = true"
        >{{power.add.menuName}}</el-button>
      </div>
    </div>

    <div class="details">
      <el-table
        :max-height="700"
        highlight-current-row
        @row-click="showRow"
        style="width:100%"
        :data="tableData"
        stripe
        border
      >
        <el-table-column align="center" prop="userCode" label="请选择" width="85">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="userName" label="姓名"></el-table-column>
        <el-table-column prop="account" label="账号" align="center"></el-table-column>
        <el-table-column prop="money" label="提现金额" align="center">
          <template slot-scope="scope">
            <span>{{(scope.row.money)/100}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="quota" label="提现限额" align="center">
          <template slot-scope="scope">
            <span>{{(scope.row.quota)/100}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" align="center" label="提现类型"></el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column prop="remark" align="center" label="备注信息"></el-table-column>
        <el-table-column prop="status" align="remark" label="状态">
          <template slot-scope="scope">
            <span :style="{color:scope.row.activeColor}">{{scope.row.status}}</span>
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
    <div class="tank" style="width:500px">
      <el-dialog title="新增提现" :visible.sync="dialogVisible" width="30%">
        <ul>
          <li>
            <span>用户编号：</span>
            <el-input
              style="width:200px"
              @blur.prevent="changeCount(userCode)"
              v-model="userCode"
              placeholder="请输入用户编号"
            ></el-input>
          </li>
          <li>
            <span>提现卡号：</span>
            <el-input style="width:200px" v-model="account" placeholder="请输入提现卡号"></el-input>
          </li>
          <li>
            <span>提现额度：</span>
            <el-input
              @blur.prevent="changeCounted(quota)"
              style="width:200px"
              v-model="quota"
              placeholder="请输入提现额度"
            ></el-input>
          </li>
          <li>
            <span>提现备注：</span>
            <el-input style="width:200px" v-model="remark" placeholder="请输入提现备注"></el-input>
          </li>
          <li>
            <span>提现类型：</span>
            <el-select style="width:200px" v-model="Actype" placeholder="请选择提现类型">
              <el-option
                v-for="item in Actypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </li>
          <li>
            <span>提现金额：</span>
            <el-input style="width:200px" :disabled="true" v-model="money" placeholder="请输入内容"></el-input>
          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisiblee()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  userMenu,
  Winlist,
  Winaudit,
  WitqueryMoney,
  WitqueryMoneyQuota,
  Witadd
} from "@/api";
export default {
  name: "reflect",
  data() {
    return {
      power: {
        error: false,
        success: false,
        add: false
      },
      time: "",
      account: "",
      money: "",
      quota: "",
      remark: "",
      userCode: "",
      activeColor: "",
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
      dialogVisible: false,
      Actype: "",

      Actypes: [
        {
          value: 0,
          label: "支付宝"
        },
        {
          value: 1,
          label: "微信"
        },
        {
          value: 2,
          label: "云闪付"
        },
        {
          value: 3,
          label: "银行卡"
        }
      ],
      options: [
        {
          value: null,
          label: "请选择状态"
        },
        {
          value: 0,
          label: "已提交"
        },
        {
          value: 1,
          label: "审核成功"
        },
        {
          value: 2,
          label: "审核失败"
        }
      ],
      Aname: "",
      Tstatus: "",
      radio: "",
      id: "",
      optionss: [
        {
          value: null,
          label: "请选择账户类型"
        },
        {
          value: 0,
          label: "支付宝"
        },
        {
          value: 1,
          label: "微信"
        },
        {
          value: 2,
          label: "云闪付"
        },
        {
          value: 3,
          label: "银行卡"
        }
      ],

      input: "",
      Ttype: "",
      status: "",
      current: 1,
      size: 10,
      total: 0,
      tableData: [],
      repeat: true,
      PaY: {}
    };
  },
  created() {
    this.list();
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
          if (item.permission == "sys.add") {
            this.power.add = item;
          } else if (item.permission == "sys.error") {
            this.power.error = item;
          } else if (item.permission == "sys.scor") {
            this.power.success = item;
          }
        });
      });
    },
    Search() {
        this.current=1;
      this.list();
    },
    // Winaudit
    showRow(row) {
      this.radio = this.tableData.indexOf(row);
      this.id = row.id;
      this.Tstatus = row.status;
    },
    Success() {
      if (this.radio === "") {
        this.$message.warning("请选择一条需要审核的数据");
        return;
      }
      if (this.Tstatus != "待审核") {
        this.$message.warning("这单已有审核结果！");
      } else {
        if (this.repeat == true) {
          this.repeat = false;
          let pay = {
            id: this.id,
            status: 1
          };
          Winaudit(pay).then(res => {
            if (res.data.httpCode == 0) {
              this.radio = "";
              console.log(res.data.data);
              this.list();
              setTimeout(() => {
                this.repeat = true;
              }, 2000);
            }else{
              this.$message.error(res.data.msg)
            }
          });
        }
      }
    },
    info() {
      if (this.radio === "") {
        this.$message.warning("请选择一条需要审核的数据");
        return;
      }
      if (this.Tstatus != "待审核") {
        this.$message.warning("这单已有审核结果！");
      } else {
        if (this.repeat == true) {
          this.repeat = false;
          let pay = {
            id: this.id,
            status: 2
          };
          Winaudit(pay).then(res => {
            if (res.data.httpCode == 0) {
              this.radio = "";
              console.log(res.data.data);
              this.list();

              setTimeout(() => {
                this.repeat = true;
              }, 2000);
            }else{
              this.$message.error(res.data.msg)
            }
          });
        }
      }
    },
    dialogVisiblee() {
      if (
        this.account === "" ||
        this.money === "" ||
        this.quota === "" ||
        this.remark === "" ||
        this.Actype === "" ||
        this.userCode === ""
      ) {
        this.$message.warning("请输入对应的内容！");
        return;
      }
      if (this.repeat == true) {
        this.repeat = false;
        let par = {
          account: this.account, //卡号
          money: this.money, //金额 单位（元）
          quota: this.quota, //限额 单位（元）
          remark: this.remark,
          type: this.Actype, //提现类型0支付宝，1微信，2云闪付，3银行卡
          userCode: this.userCode //用户编号
        };

        Witadd(par).then(res => {
          if (res.data.httpCode == 0) {
            console.log(res);
            this.dialogVisible = false;
            this.list();
            setTimeout(() => {
              this.repeat = true;
            }, 2000);
          } else {
            setTimeout(() => {
              this.repeat = true;
            }, 2000);
          }
        });
      }
    },
    changeCount(val) {
      let userco = JSON.stringify(val);
      WitqueryMoney(userco).then(res => {
        if (res.data.httpCode == 0) {
          this.money = res.data.data.money / 100;
          this.quota = res.data.data.quota / 100;
        }
      });
    },
    changeCounted(val) {
      let par = {
        quota: val,
        userCode: this.userCode
      };
      WitqueryMoneyQuota(par).then(res => {
        if (res.data.httpCode == 0) {
          this.money = res.data.data / 100;
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
    },
    list() {
      var pay = {};
      if (this.time === "" || this.time == null || this.time == undefined) {
        pay = {
          pageNum: this.current,
          pageSize: this.size,
          name: this.Aname,
          status: this.status,
          type: this.Ttype
        };
      } else {
        pay = {
          startTime: this.time[0] + " 00:00:00",
          endTime: this.time[1] + " 23:59:59",
          pageNum: this.current,
          pageSize: this.size,
          name: this.Aname,
          status: this.status,
          type: this.Ttype
        };
      }
      Winlist(pay).then(res => {
        if (res.data.httpCode == 0) {
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
            // alert(item.activeColor)
            if (item.type == 0) {
              item.type = "支付宝";
            } else if (item.type == 1) {
              item.type = "微信";
            } else if (item.type == 2) {
              item.type = "云闪付";
            } else if (item.type == 3) {
              item.type = "银行卡";
            }
          });
        }
      });
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
      span:nth-child(7) {
        margin-left: 50px;
      }
    }
    .btn {
      margin: 30px 0 0 0;
      span {
        font-size: 22px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(1, 1, 1, 1);
        line-height: 26px;
      }
      button:nth-child(2) {
        margin-left: 780px;
      }
      button:nth-child(3) {
        margin-left: 22px;
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