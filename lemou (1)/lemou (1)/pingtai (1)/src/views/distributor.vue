<template>
  <div class="distributor">
    <div class="wrap">
      <div class="yonghu">
        <span>经销商ID：</span>
        <el-input
          size="small"
          clearable
          @change="Administrators()"
          @keyup.enter.native="Administrators()"
          style="width:160px"
          v-model="dealerId"
          placeholder="请输入内容"
        ></el-input>
        <span>状态：</span>
        <el-select
          style="width:160px"
          @change="Administrators()"
          v-model="value"
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
        <span>账号：</span>
        <el-input
          size="small"
          clearable
          @change="Administrators()"
          @keyup.enter.native="Administrators()"
          style="width:160px"
          v-model="account"
          placeholder="请输入内容"
        ></el-input>
        <span>姓名：</span>
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
      <div class="BTld">
        <el-button
          @click="yuechengAA()"
          type="danger"
          :icon="power.yue.iconcls"
          v-if="power.yue.permission"
        >{{power.yue.menuName}}</el-button>
        <el-button
          type="warning"
          :icon="power.ticheng.iconcls"
          v-if="power.ticheng.permission"
          @click="XinZengAA()"
        >{{power.ticheng.menuName}}</el-button>
        <el-button
          type="success"
          :icon="power.add.iconcls"
          v-if="power.add.permission"
          @click="jingxiaojia()"
        >{{power.add.menuName}}</el-button>
        <el-button
          type="primary"
          :icon="power.bao.iconcls"
          v-if="power.bao.permission"
          @click="Baojinj()"
        >{{power.bao.menuName}}</el-button>
        <el-button
          type="primary"
          :icon="power.shenj.iconcls"
          v-if="power.shenj.permission"
          @click="yishen()"
        >{{power.shenj.menuName}}</el-button>
        <el-button
          type="warning"
          :icon="power.liushui.iconcls"
          v-if="power.liushui.permission"
          @click="Lookwa()"
        >{{power.liushui.menuName}}</el-button>
        <el-button type="primary" @click="Search()" icon="el-icon-search ">搜索</el-button>
      </div>
    </div>
    <div class="details">
      <el-table
        style="width:100%"
        :data="tableData"
        :max-height="700"
        stripe
        @row-click="showRow"
        border
      >
        <el-table-column label="操作" align="center" width="70">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="dealerId" label="ID" width="70"></el-table-column>
        <el-table-column prop="account" label="账号" align="center" width="125"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="totalRebate" label="总返利" align="center">
          <template slot-scope="scope">
            <span>{{0||(scope.row.totalRebate)/100}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="balance" align="center" label="余额">
          <template slot-scope="scope">
            <span>{{0||(scope.row.balance)/100}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalSum" label="成交总额" align="center">
          <template slot-scope="scope">
            <span>{{(scope.row.totalSum)/100}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="balance" align="center" label="保证金">
          <template slot-scope="scope">
            <span>{{0||(scope.row.deposit)/100}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="balance" width="180" align="center" label="已审核金额">
          <template slot-scope="scope">
            <div class="Scoprshop">
              <span>{{0||(scope.row.quota)/100}}</span>
              <el-button
                type="primary"
                size="small"
                style="margin-left:20px"
                @click="DOustal(scope.row.id)"
              >详情</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="weight" align="center" label="权重"></el-table-column>
        <el-table-column prop="rating" align="center" label="分润"></el-table-column>
        <el-table-column prop="locked" label="状态" align="center"></el-table-column>
        <el-table-column prop="totalAccount" align="center" label="账户数量">
          <template slot-scope="scope">
            <span>{{scope.row.totalAccount}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="描述" align="center"></el-table-column>
        <el-table-column prop="caozuo" label="操作" align="center" width="302">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row,scope.row.id)" type="primary" size="small">查看明细</el-button>
            <el-button
              @click="handleClick1(scope.row,scope.row.id)"
              type="warning"
              size="small"
            >编辑详情</el-button>
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
    <!-- ------------------------------------------------------------- -->
    <div class="xinz">
      <el-dialog title="修改分润" :visible.sync="XinZeng" width="30%">
        <ul>
          <li style="margin-left:30px">
            <span>分润：</span>
            <el-input style="width:160px" v-model="rating"></el-input>
          </li>
        </ul>

        <span slot="footer" class="dialog-footer">
          <el-button @click="XinZeng = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisibleB">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- ------------------------------------------------------------- -->
    <div class="yuex">
      <el-dialog title="修改余额" :visible.sync="yuecheng" width="30%">
        <ul>
          <li style="margin-left:30px">
            <span>修改余额：</span>
            <el-input style="width:160px" @blur.native.capture="testUser()" v-model="chengye"></el-input>
          </li>
        </ul>

        <span slot="footer" class="dialog-footer">
          <el-button @click="yuecheng = false">取 消</el-button>
          <el-button type="primary" @click="yuechengB">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- -------------------------------------- -->
    <el-dialog :visible.sync="dialogVisibleD" width="80%">
      <span>动作：</span>
      <el-select
        style="width:160px"
        v-model="actionD"
        @change="dealerTransaction()"
        size="small"
        placeholder="请选择状态"
      >
        <el-option
          v-for="item in optionsD"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span style="margin-left:30px">备注：</span>
      <el-input
        size="small"
        style="width:200px"
        @change="dealerTransaction()"
        @keyup.enter.native="dealerTransaction()"
        clearable
        v-model="remarkD"
        placeholder="请输入内容"
      ></el-input>
      <span style="margin-left:30px">交易日期：</span>
      <el-date-picker
        v-model="valueD"
        @change="dealerTransaction()"
        align="right"
        size="small"
        value-format="yyyy-MM-dd"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions1"
      ></el-date-picker>
      <el-button
        style="margin-left:70px"
        type="primary"
        size="small"
        @click="dealerTransaction()"
        icon="el-icon-search "
      >搜索</el-button>
      <el-table
        :data="tableData3"
        border
        highlight-current-row
        style="width: 100%;margin-top:20px"
        stripe
      >
        <el-table-column prop="action" show-overflow-tooltip label="动作" align="center"></el-table-column>
        <el-table-column prop="money" show-overflow-tooltip label="金额" align="center">
          <template slot-scope="scope">
            <span>{{(scope.row.money)/100}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" show-overflow-tooltip label="备注" align="center"></el-table-column>
        <el-table-column prop="createTime" show-overflow-tooltip label="创建时间" align="center"></el-table-column>
      </el-table>
      <div style="text-align:center;margin-top:10px;">
        <el-pagination
          background
          @size-change="handleSizeChange3"
          @current-change="handleCurrentChange3"
          :current-page="current3"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="size3"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total3"
        ></el-pagination>
      </div>
    </el-dialog>
    <!-- ------------------------------------------------------------- -->
    <el-dialog title="保证金设置" :visible.sync="baojin" width="30%">
      <ul>
        <li style="margin-left:30px">
          <span>金额：</span>
          <el-input style="width:160px" v-model="depositJ"></el-input>
        </li>
      </ul>

      <span slot="footer" class="dialog-footer">
        <el-button @click="baojin = false">取 消</el-button>
        <el-button type="primary" @click="baojinB">确 定</el-button>
      </span>
    </el-dialog>
    <!-- ------------------------------------------------------------- -->
    <el-dialog title="已审金额设置" :visible.sync="shenhe" width="30%">
      <ul style="font-size:20px">
        <li style="margin-left:50px;">
          <span>动作：</span>
          <el-select style="width:160px" v-model="actionS" placeholder="请选择状态">
            <el-option
              v-for="item in optionsS"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </li>
        <li style="margin-left:50px;margin-top:20px">
          <span>金额：</span>
          <el-input style="width:160px" v-model="moneyS"></el-input>
        </li>
        <li style="margin-left:50px;margin-top:20px">
          <span>备注：</span>
          <el-input style="width:160px" v-model="remarkS"></el-input>
        </li>
      </ul>

      <span slot="footer" class="dialog-footer">
        <el-button @click="shenhe = false">取 消</el-button>
        <el-button type="primary" @click="shenheB">确 定</el-button>
      </span>
    </el-dialog>
    <!-- ------------------------添加------------------------ -->
    <el-dialog title="添加经销商" :visible.sync="tian" width="30%">
      <ul style="font-size:20px;text-align: center">
        <li style="margin-top:10px">
          <span>姓名：</span>
          <el-input style="width:200px" v-model="Tname" placeholder="请输入内容"></el-input>
        </li>
        <li style="margin-top:10px">
          <span>账号：</span>
          <el-input style="width:200px" v-model="Taccount" placeholder="请输入内容"></el-input>
        </li>
        <li style="margin-top:10px">
          <span>分润：</span>
          <el-input v-model="Trating" style="width:200px" placeholder="请输入内容"></el-input>
        </li>
        <li style="margin-top:10px">
          <span>密码：</span>
          <el-input v-model="Tpassword" style="width:200px" placeholder="请输入内容"></el-input>
        </li>
        <li style="margin-top:10px">
          <span>权重：</span>
          <el-input style="width:200px" v-model="Tweight" placeholder="请输入内容"></el-input>
        </li>
        <li style="margin-top:10px">
          <span>状态：</span>
          <el-select v-model="Tvalue" style="width:200px" placeholder="请选择状态">
            <el-option
              v-for="item in optionsT"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </li>
        <li style="margin-top:10px">
          <span>描述：</span>
          <el-input style="width:200px" v-model="Tremark" placeholder="请输入内容"></el-input>
        </li>
      </ul>

      <span slot="footer" class="dialog-footer">
        <el-button @click="tian = false">取 消</el-button>
        <el-button type="primary" @click="tianJ">确 定</el-button>
      </span>
    </el-dialog>
    <!-- ////////////////////////////////////////// -->
    <!-- --------------------------------------------------- -->
    <el-dialog :visible.sync="Userdown" width="80%">
      <span style="margin-left:30px">备注：</span>
      <el-input
        size="small"
        style="width:200px"
        @change="Userlist()"
        @keyup.enter.native="Userlist()"
        clearable
        v-model="remarkU"
        placeholder="请输入内容"
      ></el-input>
      <span style="margin-left:30px">交易日期：</span>
      <el-date-picker
        size="small"
        v-model="timeU"
        @change="Userlist()"
        type="daterange"
        align="right"
        value-format="yyyy-MM-dd"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button
        style="margin-left:70px"
        type="primary"
        @click="Userlist()"
        icon="el-icon-search "
        size="small"
      >搜索</el-button>
      <el-table :data="tableDataU" style="width:100%;margin-top:20px" stripe border>
        <el-table-column align="center" prop="direction" label="方向"></el-table-column>
        <el-table-column prop="type" label="用户佣金" align="center"></el-table-column>
        <el-table-column prop="typeCode" label="返利通道" align="center"></el-table-column>

        <el-table-column prop="money" label="金额" align="center">
          <template slot-scope="scope">
            <span>{{(scope.row.money)/100}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" align="center" label="创建时间"></el-table-column>
        <el-table-column prop="remark" align="center" label="备注"></el-table-column>
      </el-table>
      <div style="text-align:center;margin-top:10px;">
        <el-pagination
          background
          @size-change="handleSizeChangeU"
          @current-change="handleCurrentChangeU"
          :current-page="currentU"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="sizeU"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalU"
        ></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  Dealist,
  userMenu,
  Deadd,
  DearunAmounQuery,
  DeadepositSetting,
  CommtransactionLog,
  DearunAmountSetting,
  Deaupdate,
  DeaupdateBalance
} from "@/api";
export default {
  name: "distributor",
  data() {
    return {
      Tremark: "",
      tian: false,
      Tname: "",
      Trating: "",
      Tpassword: "",
      Tweight: "",
      Tvalue: "",
      Taccount: "",
      actionD: "",
      actionS: "",
      moneyS: "",
      remarkS: "",
      shenhe: false,
      baojin: false,
      valueD: "",
      depositJ: "",
      tableData3: [],
      dealerIdD: "",
      optionsT: [
        {
          value: 1,
          label: "开启"
        },
        {
          value: 0,
          label: "关闭"
        }
      ],
      remarkD: "",
      value: "",
      radio: "",
      rating: "",
      dialogVisibleD: false,
      chengye: "",
      repeat: true,
      yuecheng: false,
      XinZeng: false,
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      optionsD: [
        {
          value: null,
          label: "请选择"
        },
        {
          value: 1,
          label: "减少"
        },
        {
          value: 0,
          label: "增加"
        }
      ],
      options: [
        {
          value: null,
          label: "请选择状态"
        },
        {
          value: 1,
          label: "开启"
        },
        {
          value: 0,
          label: "关闭"
        }
      ],
      optionsS: [
        {
          value: 0,
          label: "增加"
        },
        {
          value: 1,
          label: "减少"
        }
      ],
      current: 1,
      size: 10,
      current3: 1,
      size3: 10,
      total: 0,
      total3: 0,
      pageNum: "",
      pageSize: "",
      DOliid: "",
      account: "",
      dealerId: "",
      StrY: {},
      Userdown: false,
      power: {
        add: false,
        ticheng: false,
        yue: false,
        shenj: false,
        bao: false,
        liushui: false
      },
      currentU: "",
      remarkU: "",
      timeU: "",
      name: "",
      totalU: 0,
      sizeU: "",
      tableDataU: [],
      tableData: []
    };
  },
  created() {
    this.Administrators();
  },
  mounted() {
    this.Concealment();
  },
  methods: {
    Lookwa() {
      if (this.radio === "") {
        this.$message.warning("请选择要查看的数据！");
        return;
      }
      this.remarkU = "";
      this.timeU = "";
      this.Userdown = true;
      this.Userlist();
    },
    handleSizeChangeU(val) {
      this.sizeU = val;
      this.currentU = 1;
      this.Userlist();
    },
    handleCurrentChangeU(val) {
      this.currentU = val;
      this.Userlist();
    },
    Userlist() {
      var par = {};
      if (this.timeU === "" || this.timeU == undefined || this.timeU == null) {
        par = {
          pageNum: this.currentU,
          pageSize: this.sizeU,
          direction: 0, ////方向：0 增加 1 减少
          remark: this.remarkU,
          type: 1,
          userId: this.id
        };
      } else {
        par = {
          pageNum: this.currentU,
          pageSize: this.sizeU,
          direction: 0, ////方向：0 增加 1 减少
          remark: this.remarkU,
          type: 1,
          userId: this.id,
          startTime: this.timeU[0] + " 00:00:00",
          endTime: this.timeU[1] + " 23:59:59"
        };
      }
      CommtransactionLog(par).then(res => {
        if (res.data.httpCode == 0) {
          this.tableDataU = res.data.data;
          this.totalU = Number(res.data.total);
          this.tableDataU.forEach((item, index) => {
            if (item.direction == 0) {
              item.direction = "增加";
            } else if (item.direction == 1) {
              item.direction = "减少";
            }
            if (item.type == 0) {
              item.type = "佣金";
            } else if (item.type == 1) {
              item.type = "返利";
            } else if (item.type == 2) {
              item.type = "资金变动";
            }
            if (item.typeCode == 0) {
              item.typeCode = "支付宝个码";
            } else if (item.typeCode == "1") {
              item.typeCode = "微信个码";
            } else if (item.typeCode == "2") {
              item.typeCode = "云闪付个码";
            } else if (item.typeCode == "3") {
              item.typeCode = "支付宝商码";
            } else if (item.typeCode == "4") {
              item.typeCode = "微信商码";
            } else if (item.typeCode == "5") {
              item.typeCode = "银行卡";
            } else if (item.typeCode == "6") {
              item.typeCode = "拼多多支付宝";
            } else if (item.typeCode == "7") {
              item.typeCode = "拼多多微信";
            } else if (item.typeCode == "8") {
              item.typeCode = "聚合码";
            } else if (item.typeCode == "9") {
              item.typeCode = "支付宝固态码";
            }
          });
        }
      });
    },
    tianJ() {
      let reg = /^[\+\-]?\d+(\.\d{0,2})?$/;
      if (!reg.test(this.Trating)) {
        this.$message.error("请输入正确的格式哦！");
        this.Trating = "";
        return;
      }

      if (
        this.Taccount === "" ||
        this.Tpassword === "" ||
        this.Tname === "" ||
        this.Trating === "" ||
        this.Tvalue === "" ||
        this.Tweight === ""
      ) {
        this.$message.warning("请输入对应内容！");
        return;
      }
      if (this.repeat == true) {
        this.repeat = false;
        let par = {
          account: this.Taccount,
          locked: this.Tvalue,
          password: this.Tpassword,
          name: this.Tname,
          rating: this.Trating,
          remark: this.Tremark,
          weight: Number(this.Tweight)
        };
        Deadd(par).then(res => {
          if (res.data.httpCode == 0) {
            console.log(res);
            this.Administrators();
            this.tian = false;
            setTimeout(() => {
              this.repeat = true;
            }, 2000);
          } else {
            this.Administrators();
            this.$message(res.data.msg);
            setTimeout(() => {
              this.repeat = true;
            }, 2000);
          }
        });
      }
    },
    yishen() {
      if (this.radio === "") {
        this.$message.warning("请选择一条需要修改的数据");
      } else {
        this.shenhe = true;
      }
      this.actionS = "";
      this.moneyS = "";
      this.remarkS = "";
    },
    shenheB() {
      let reg = /^[\+\-]?\d+(\.\d{0,2})?$/;
      if (!reg.test(this.moneyS)) {
        this.$message.error("请输入正确的格式哦！");
        this.moneyS = "";
        return;
      }

      if (this.actionS === "" || this.moneyS === "" || this.remarkS === "") {
        this.$message.warning("请输入对应内容！");
        return;
      }
      let par = {
        action: this.actionS,
        id: this.id,
        money: this.moneyS,
        remark: this.remarkS
      };
      DearunAmountSetting(par).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res);
          this.shenhe = false;
          this.radio = "";
          this.Administrators();
        }
      });
    },
    baojinB() {
      let reg = /^[\+\-]?\d+(\.\d{0,2})?$/;
      if (!reg.test(this.depositJ)) {
        this.$message.error("请输入正确的格式哦！");
        this.depositJ = "";
        return;
      }
      let par = {
        deposit: this.depositJ,
        id: this.id
      };
      DeadepositSetting(par).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res);
          this.baojin = false;
          this.radio = "";
          this.Administrators();
        }
      });
    },
    dealerTransaction() {
      var par = {
        action: this.actionD, //动作：0 增加 1 减少
        createTime: this.valueD, //时间 2019-12-10
        dealerId: this.DOliid, //经销商ID
        remark: this.remarkD, //备注
        pageNum: this.current3,
        pageSize: this.size3
      };
      DearunAmounQuery(par).then(res => {
        if (res.data.httpCode == 0) {
          this.tableData3 = res.data.data;
          this.tableData3.forEach((item, index) => {
            if (item.action == "0") {
              item.action = "增加";
            } else if (item.action == "1") {
              item.action = "减少";
            }
          });
          this.total3 = Number(res.data.total);
        }
      });
    },
    DOustal(id) {
      this.DOliid = id;
      this.dialogVisibleD = true;
      this.dealerTransaction();
    },
    Baojinj() {
      if (this.radio === "") {
        this.$message.warning("请选择一条需要修改的数据");
      } else {
        this.baojin = true;
      }
    },
    yuechengAA() {
      if (this.radio === "") {
        this.$message.warning("请选择一条需要修改的数据");
      } else {
        this.yuecheng = true;
      }
    },
    XinZengAA() {
      if (this.radio === "") {
        this.$message.warning("请选择一条需要修改的数据");
      } else {
        this.XinZeng = true;
      }
    },
    yuechengB() {
      let reg = /^[\+\-]?\d+(\.\d{0,2})?$/;
      if (!reg.test(this.chengye)) {
        this.$message.error("请输入正确的格式哦！");
        this.chengye = "";
        return;
      }
      if (this.repeat == true) {
        this.repeat = false;
        let pat = {
          id: this.StrY.id,
          balance: this.chengye
        };
        DeaupdateBalance(pat).then(res => {
          if (res.data.httpCode == 0) {
            console.log(res);
            this.yuecheng = false;
            this.radio = "";
            this.Administrators();
            this.chengye = "";
            setTimeout(() => {
              this.repeat = true;
            }, 2000);
          }
        });
      }
    },
    dialogVisibleB() {
      //////
      let reg = /^[\+\-]?\d+(\.\d{0,2})?$/;
      if (!reg.test(this.rating)) {
        this.$message.error("请输入正确的格式哦！");
        this.rating = "";
        return;
      }
      let par = {
        rating: this.rating,
        account: this.StrY.account,
        codeFlag: false,
        id: this.StrY.id,
        name: this.StrY.name,
        pwdFlag: false,
        remark: this.StrY.remark,
        weight: Number(this.StrY.weight)
      };
      Deaupdate(par).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res);
          this.XinZeng = false;
          this.radio = "";
          this.Administrators();
        }
      });
    },
    showRow(row) {
      this.radio = this.tableData.indexOf(row);
      this.id = row.id;
      this.StrY = row;
      this.rating = row.rating;
    },
    Concealment() {
      userMenu({
        menuType: 1,
        parentId: this.$route.query.id
      }).then(res => {
        var concea = res.data.data;
        concea.map(item => {
          if (item.permission == "sys.userdis.add") {
            this.power.add = item;
          } else if (item.permission == "sys.dis.tich") {
            this.power.ticheng = item;
          } else if (item.permission == "sys.dis.yue") {
            this.power.yue = item;
          } else if (item.permission == "sys.tem.baojin") {
            this.power.bao = item;
          } else if (item.permission == "sys.tem.shenjin") {
            this.power.shenj = item;
          } else if (item.permission == "sys.tem.liushui") {
            this.power.liushui = item;
          }
        });
      });
    },
    Search() {
      this.current = 1;
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
    handleSizeChange3(val) {
      this.size3 = val;
      this.current3 = 1;
      this.dealerTransaction();
    },
    handleCurrentChange3(val) {
      this.current3 = val;
      this.dealerTransaction();
    },
    Administrators() {
      let par = {
        pageNum: this.current,
        pageSize: this.size,
        account: this.account,
        dealerId: this.dealerId,
        locked: this.value,
        name: this.name
      };
      Dealist(par).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res);
          res.data.data.forEach((item, index) => {
            if (item.locked == 0) {
              item.locked = "关闭";
            }
            if (item.locked == 1) {
              item.locked = "开启";
            }
            if (item.totalAccount == undefined) {
              item.totalAccount = 0;
            }
            if (
              item.quota == "" ||
              item.quota == "NaN" ||
              item.quota == undefined
            ) {
              item.quota = 0;
            }
            if (item.balance == null) {
              item.balance = 0;
            }
          });
          this.tableData = res.data.data;
          this.total = Number(res.data.total);
        }
      });
    },
    handleClick(row, id) {
      this.$router.push({
        name: "dismingx",
        query: {
          ID: id,
          yemian: this.$route.query.id
        }
      });
    },
    handleClick1(row, id) {
      this.$router.push({
        name: "disbianji",
        query: {
          ids: id,
          yemian: this.$route.query.id
        }
      });
    },
    jingxiaojia() {
      this.tian = true;
      this.Taccount = "";
      this.Tvalue = "";
      this.Tpassword = "";
      this.Tname = "";
      this.Trating = "";
      this.Tremark = "";
      this.Tweight = "";
    }
  }
};
</script>
<style lang="less" scoped>
.distributor {
  overflow: hidden;
  .wrap {
    margin-top: 10px;
    .yonghu {
      //  margin-left: 72px;
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
    .BTld {
      margin: 20px 0 20px 10px;
    }
  }
  .details {
    font-size: 20px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: rgba(1, 1, 1, 1);
    line-height: 26px;
    .Scoprshop {
      line-height: 35px;
      button {
        float: right;
      }
    }
    .block {
      position: fixed;
      right: 600px;
      bottom: 10px;
    }
  }
}
</style>