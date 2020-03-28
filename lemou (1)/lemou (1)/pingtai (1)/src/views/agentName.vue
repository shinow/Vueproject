<template>
  <div id="acount">
    <el-card shadow="never" body-style="padding:0px">
      <el-row slot="header">
        <el-col :span="18">
          <el-button
            :span="2"
            size="small"
            type="success"
            :icon="power.add.iconcls"
            v-if="power.add.permission"
            @click="add = true"
          >{{power.add.menuName}}</el-button>
          <el-button
            :span="2"
            size="small"
            type="success"
            :icon="power.edit.iconcls"
            v-if="power.edit.permission"
            @click="editMessage()"
          >{{power.edit.menuName}}</el-button>
          <el-button
            :span="2"
            size="small"
            type="danger"
            :icon="power.delet.iconcls"
            v-if="power.delet.permission"
            @click="deletMessage()"
          >{{power.delet.menuName}}</el-button>
          <!-- <el-button
            :span="2"
            size="small"
            type="success"
            :icon="power.distribution.iconcls"
            v-if="power.distribution.permission"
            :disabled="disableds.permission"
            @click="permissionsMe()"
          >{{power.distribution.menuName}}</el-button>-->
          <el-button
            :span="2"
            size="small"
            type="success"
            :icon="power.distributionArea.iconcls"
            v-if="power.distributionArea.permission"
            :disabled="disableds.distributionArea"
            @click="regionMessage()"
          >{{power.distributionArea.menuName}}</el-button>
          <el-button
            :span="2"
            size="small"
            type="warning"
            :icon="power.resetPass.iconcls"
            v-if="power.resetPass.permission"
            @click="resetMessage()"
          >{{power.resetPass.menuName}}</el-button>
          <el-button
            :span="2"
            size="small"
            type="success"
            :icon="power.enable.iconcls"
            v-if="power.enable.permission"
            :disabled="disableds.agree"
            @click="enableMessage()"
          >{{power.enable.menuName}}</el-button>
          <el-button
            :span="2"
            size="small"
            type="danger"
            :icon="power.discontInuation.iconcls"
            v-if="power.discontInuation.permission"
            :disabled="disableds.noagree"
            @click="discontInuation()"
          >{{power.discontInuation.menuName}}</el-button>
          <!-- //***// */ -->
          <el-button
            :span="2"
            size="small"
            type="warning"
            :icon="power.yue.iconcls"
            v-if="power.yue.permission"
            @click="Usyue()"
          >{{power.yue.menuName}}</el-button>
          <el-button
            :span="2"
            size="small"
            type="warning"
            :icon="power.fenrui.iconcls"
            v-if="power.fenrui.permission"
            @click="Usfen()"
          >{{power.fenrui.menuName}}</el-button>

          <el-button
            :span="2"
            size="small"
            type="warning"
            :icon="power.liushui.iconcls"
            v-if="power.liushui.permission"
            @click="Lookwa()"
          >{{power.liushui.menuName}}</el-button>

          <el-button
            :span="2"
            size="small"
            type="warning"
            :icon="power.shen.iconcls"
            v-if="power.shen.permission"
            @click="yishen()"
          >{{power.shen.menuName}}</el-button>
          <el-button
            :span="2"
            size="small"
            type="warning"
            :icon="power.tong.iconcls"
            v-if="power.tong.permission"
            @click="Tongdao()"
          >{{power.tong.menuName}}</el-button>
          <el-button
            :span="2"
            size="small"
            type="warning"
            :icon="power.bao.iconcls"
            v-if="power.bao.permission"
            @click="Baojinj()"
          >{{power.bao.menuName}}</el-button>
          <!-- ////// -->
        </el-col>

        <el-col :span="6" class="pull-right">
          <el-button
            class="pull-right"
            :span="2"
            size="small"
            type="success"
            icon="el-icon-search"
            @click="getAllList"
          ></el-button>
          <el-input
            clearable
            class="pull-right ss"
            size="small"
            placeholder="请输入用户名进行搜索"
            v-model="listQuery.userName"
            @change="getAllList"
          ></el-input>
        </el-col>
      </el-row>
    </el-card>
    <div>
      <scrollBar class="scrollBar">
        <el-table
          v-loading="loading"
          :stripe="true"
          @row-click="showRow"
          highlight-current-row
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column label="选中" width="55">
            <template slot-scope="scope">
              <el-radio v-model="radio" :label="scope.$index">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column type="index" :index="num" label="序号" width="60"></el-table-column>
          <el-table-column show-overflow-tooltip prop="account" width="180" label="账号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="userName" label="用户姓名"></el-table-column>
          <el-table-column show-overflow-tooltip prop="money" label="余额">
            <template slot-scope="scope">
              <span>{{(scope.row.money)/100}}</span>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="rating" label="分润"></el-table-column>

          <el-table-column show-overflow-tooltip prop="deposit" label="保证金">
            <template slot-scope="scope">
              <span>{{(scope.row.deposit)/100}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="consumeMoney" width="200" label="已跑额度">
            <template slot-scope="scope">
              <div class="Scoprshop">
                <span>{{(scope.row.consumeMoney) / 100}}</span>
                <el-button type="primary" size="small" @click="xiangs()" style="margin-left:20px">详情</el-button>
              </div>
            </template>
          </el-table-column>
          <!-- /// -->
          <el-table-column show-overflow-tooltip prop="locked" :formatter="formaRole" label="状态">
            <!-- <template slot-scope="scope">
              {{scope.row.locked? '启用' : '停用'}}
            </template>-->
          </el-table-column>
          <el-table-column show-overflow-tooltip width="180" prop="createTime" label="创建时间"></el-table-column>
          <el-table-column show-overflow-tooltip prop="roles" label="角色"></el-table-column>
          <el-table-column show-overflow-tooltip prop="remark" label="备注"></el-table-column>
        </el-table>
      </scrollBar>
      <pagination class="pagination" :listQuery="listQuery" :total="total" @getTableData="getData"></pagination>
    </div>
    <!--新增-->
    <el-row>
      <el-dialog title="新增" :visible.sync="add" width="400px" left>
        <el-form ref="addData" :model="addData" :rules="addRules">
          <span style="color: red">*号为必填项</span>
          <el-form-item label="账号" prop="account">
            <el-input size="small" v-model="addData.account" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="用户姓名" prop="userName">
            <el-input size="small" v-model="addData.userName" placeholder></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input
              type="textarea"
              maxlength="50"
              size="small"
              v-model="addData.remark"
              placeholder
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addUser('addData')">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="修改" :visible.sync="edit" width="400px" left>
        <el-form ref="editData" :model="editData" :rules="editRules">
          <span style="color: red">*号为必填项</span>
          <el-form-item label="账号" prop="account">
            <el-input size="small" v-model="editData.account" placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item label="用户姓名" prop="userName">
            <el-input size="small" v-model="editData.userName" placeholder></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input
              type="textarea"
              maxlength="50"
              size="small"
              v-model="editData.remark"
              placeholder
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="editUser('editData')">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="删除" :visible.sync="delet" width="300px" left>
        <span>您确定要删除此信息？</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="deleteUser()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- ------修改余额 -->
      <el-dialog title="修改余额" :visible.sync="Yuez" width="20%">
        <span>金额：</span>
        <el-input size="small" v-model="Usmoney"></el-input>
        <span slot="footer">
          <el-button type="primary" @click="Enteryue()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- ---------- -->
      <el-dialog title="修改分润" :visible.sync="Fenz" width="20%">
        <span>分润：</span>
        <el-input size="small" v-model="Usrating"></el-input>
        <span slot="footer">
          <el-button type="primary" @click="Enterfen()">确 定</el-button>
        </span>
      </el-dialog>
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
        <span style="margin-left:30px">订单号：</span>
        <el-input
          size="small"
          style="width:200px"
          @change="dealerTransaction()"
          @keyup.enter.native="dealerTransaction()"
          clearable
          v-model="orderOnD"
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
          <el-table-column prop="orderOn" show-overflow-tooltip label="订单号" align="center"></el-table-column>
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
      <!-- ----------------- -->
      <el-dialog class="qx" title="权限分配" :visible.sync="permissions" width="400px" left>
        <span>
          <el-checkbox
            ref="allCity"
            v-model="item.isSelected"
            v-for="(item, index) in userMenu"
            :key="index"
            :label="item.label"
          >{{item.roleName}}</el-checkbox>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="getPerm">确 定</el-button>
        </span>
      </el-dialog>
      <!-- ///// -->
      <!-- ------------------------------------------------------------- -->
      <el-dialog title="已跑额度设置" :visible.sync="shenhe" width="30%">
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
          icon="el-icon-search"
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
      <!-- / -->
      <el-dialog title="通道设置" :visible.sync="UPyou" width="20%">
        <div style="margin-bottom:20px">
          <el-button type="primary" size="mini" @click="UPmontlist('全选')">全选</el-button>
          <el-button type="primary" size="mini" @click="UPmontlist('反选')">反选</el-button>
        </div>
        <span class="qxfp">
          <el-tree
            :data="dataTree"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            :default-checked-keys="Treelistup"
            highlight-current
            :props="defaultPropsS"
          ></el-tree>
        </span>
        <span slot="footer">
          <el-button type="primary" @click="EnterUPyou()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- ---------- -->
      <el-dialog class="fpqy" title="分配区域" :visible.sync="region" width="400px" left>
        <span>
          <el-tree
            ref="allCity"
            v-loading="load"
            :default-expanded-keys="idChecked"
            :default-checked-keys="idChecked"
            node-key="id"
            :check-on-click-node="false"
            show-checkbox
            :data="datas"
            :props="defaultProps"
            accordion
            @check="handleNodeClick"
            @node-click="handleNodeClick"
          ></el-tree>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" :loading="loads" @click="upRegListData()">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="重置密码" :visible.sync="resetPassword" width="300px" left>
        <span>您确定要恢复该账号的初始密码吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="resetPsdData()">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="启用" :visible.sync="enable" width="300px" left>
        <span>您确定要启用该平台账号吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="allOpenData()">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="停用" :visible.sync="discontinuation" width="300px" left>
        <span>您确定要停用该平台账号吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="allLockedData()">确 定</el-button>
        </span>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
import {
  Uplist,
  USupdateBalance,
  USupdateRating,
  accountData,
  UserqueryLinks,
  DearunAmountSetting,
  UserrunAmountSetting,
  addUserData,
  detailUser,
  editUserData,
  delUserData,
  UserdepositSetting,
  CommtransactionLog,
  userData,
  UserrunAmounQuery,
  UseraddLink,
  updateUserData,
  regionList,
  upRegList,
  allOpen,
  allLocked,
  resetPsd,
  userMenu
} from "@/api";
import pagination from "@/components/pagination";
import scrollBar from "@/components/scrollBarContainner";
import { validatename } from "@/util/validate";
import { findParent } from "@/util/util";
export default {
  components: {
    pagination,
    scrollBar
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不可为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    const isvalidatename = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("姓名不能为空"));
      } else if (!validatename(value)) {
        return callback(new Error("请输入正确的姓名"));
      } else {
        callback();
      }
    };
    var funChina = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不可为空"));
      } else {
        const regs = /^[0-9a-zA-Z]+$/;
        if (regs.test(value)) {
          callback();
        } else {
          return callback(new Error("账号只可为数字与字母"));
        }
      }
    };
    return {
      // 表格数据
      tableData: [],
      radio: "",
      loading: false,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        userName: "",
        roleName: "代理"
      },
      total: null,
      // 树数据
      data: [],
      datas: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 新增
      add: false,
      addData: {
        locked: "1"
      },
      // 修改
      edit: false,
      editData: {
        id: "",
        account: "",
        phone: "",
        remark: "",
        userName: ""
      },
      //一审金额设置

      // 删除
      delet: false,
      // 分配权限
      permissions: false,
      userMenu: [],
      userId: "",
      preData: {
        roleId: [],
        userId: ""
      },
      //修改余额
      Usmoney: "",
      Yuez: false,
      //修改分润
      Usrating: "",
      Fenz: false,
      // 分配区域
      region: false,
      codes: [],
      load: false,
      loads: false,
      //流水
      Userdown: false,
      totalU: 0,
      sizeU: 10,
      tableDataU: [],
      currentU: 1,
      remarkU: "",
      timeU: "",
      //
      idChecked: [],
      resetPassword: false,
      enable: false,
      discontinuation: false,
      // 判断停用启用
      disableds: {
        agree: false,
        noagree: false,
        permission: false,
        distributionArea: false
      },
      // 判断按钮是否隐藏
      power: {
        add: false,
        edit: false,
        delet: false,
        distribution: false,
        distributionArea: false,
        resetPass: false,
        enable: false,
        discontInuation: false,
        yue: false,
        fenrui: false,
        liushui: false,
        shen: false,
        tong: false,
        bao: false
      },
      addRules: {
        account: [
          { required: true, trigger: "blur", validator: funChina },
          { max: 11, message: "不超过11个字符", trigger: "change" }
        ],
        phone: [
          { required: true, trigger: ["change", "blur"], validator: checkPhone }
        ],
        userName: [
          {
            required: true,
            trigger: ["blur", "change"],
            validator: isvalidatename
          }
        ]
      },
      editRules: {
        account: [
          { required: true, trigger: "blur", validator: funChina },
          { max: 11, message: "不超过11个字符", trigger: "change" }
        ],

        userName: [
          {
            required: true,
            trigger: ["blur", "change"],
            validator: isvalidatename
          }
        ]
      },
      //一审金额
      shenhe: false,
      actionS: "",
      moneyS: "",
      remarkS: "",
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
      //上游
      dataTree: [],
      UPyou: false,
      defaultPropsS: {
        label: "mercCode"
      },
      Treelistup: [],
      //保证金设置
      baojin: false,
      depositJ: "",

      //明细
      dialogVisibleD: false,
      actionD: "",
      valueD: "",
      remarkD: "",
      tableData3: [],
      current3: 1,
      total3: 0,
      size3: 10,
      orderOnD: "",
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
      ]
    };
  },
  computed: {
    num(val) {
      const { pageNum, pageSize } = this.listQuery;
      return (pageNum - 1) * pageSize + 1;
    }
  },
  methods: {
    //保证金
    Baojinj() {
      if (this.radio === "") {
        this.$message.warning("请选择一条需要修改的数据");
      } else {
        this.baojin = true;
      }
    },
    baojinB() {
 let reg = /^[\+\-]?\d+(\.\d{0,2})?$/;
      if (!reg.test(this.depositJ)) {
        this.$message.error("请输入正确的格式哦！");
        this.depositJ = "";
        return;
      }

      if (this.depositJ === "") {
        this.$message.warning("请输入金额！");
        return;
      }
      let par = {
        deposit: this.depositJ,
        id: this.userId
      };
      UserdepositSetting(par).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res);
          this.baojin = false;
          this.radio = "";
          this.getData();
          this.Concealment();
        }
      });
    },
    //明细
    xiangs() {
      this.dialogVisibleD = true;
      setTimeout(() => {
        this.dealerTransaction();
      }, 200);
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
    dealerTransaction() {
      var par = {
        action: this.actionD, //动作：0 增加 1 减少
        createTime: this.valueD, //时间 2019-12-10
        userId: this.userId, //经销商ID
        remark: this.remarkD, //备注
        orderOn: this.orderOnD, //订单号
        pageNum: this.current3,
        pageSize: this.size3
      };
      UserrunAmounQuery(par).then(res => {
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
    //上游
    EnterUPyou() {
      console.log(this.$refs.tree.getCheckedKeys());
      let pay = {
        mercIds: this.$refs.tree.getCheckedKeys(),
        id: this.userId
      };
      UseraddLink(pay).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data);
          this.UPyou = false;
          this.radio = "";
        }
      });
    },
    Tongdao() {
      this.UPyou = true;
      UserqueryLinks(this.userId).then(res => {
        if (res.data.httpCode == 0) {
          //////////////////
          console.log(res.data.data);
          this.Treelistup = res.data.data;
        }
      });
      setTimeout(() => {
        this.UPmontlist();
      }, 200);
    },
    UPmontlist(i) {
      let par = {
        pageNum: 1,
        pageSize: 99999
      };
      Uplist(par).then(res => {
        if (res.data.httpCode == 0) {
          this.dataTree = res.data.data;
          if (i == "全选") {
            res.data.data.forEach((item, index) => {
              this.Treelistup.push(item.id);
            });
          }
          if (i == "反选") {
            this.Treelistup = this.$refs.tree.getCheckedKeys();
            let arrA = [];
            res.data.data.forEach((item, index) => {
              arrA.push(item.id);
            });
            for (let i = 0; i < this.Treelistup.length; i++) {
              for (let j = 0; j < arrA.length; j++) {
                if (this.Treelistup[i] === arrA[j]) {
                  const position = arrA.indexOf(this.Treelistup[i]);
                  arrA.splice(position, 1);
                }
              }
            }
            this.Treelistup = arrA;
          }
        }
      });
    },
    //已跑额度
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
        id: this.userId,
        money: this.moneyS,
        remark: this.remarkS
      };
      UserrunAmountSetting(par).then(res => {
        if (res.data.httpCode == 0) {
          this.shenhe = false;
          this.radio = "";
          this.getData();
          this.Concealment();
        }
      });
    },
    //流水
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
          userId: this.userId
        };
      } else {
        par = {
          pageNum: this.currentU,
          pageSize: this.sizeU,
          direction: 0, ////方向：0 增加 1 减少
          remark: this.remarkU,
          type: 1,
          userId: this.userId,
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
    //余额
    Usyue() {
      this.Yuez = true;
      this.Usmoney = "";
    },
    Enteryue() {
       let reg = /^[\+\-]?\d+(\.\d{0,2})?$/;
      if (!reg.test(this.Usmoney)) {
        this.$message.error("请输入正确的格式哦！");
        this.Usmoney = "";
        return;
      }
      let pay = {
        id: this.userId,
        balance: this.Usmoney
      };
      if (this.Usmoney === "") {
        this.$message.warning("请输入金额！");
        return;
      }
      USupdateBalance(pay).then(res => {
        if (res.data.httpCode == 0) {
          this.Yuez = false;
          this.radio = "";
          this.getData();
          this.Concealment();
        }
      });
    },
    //分润
    Usfen() {
      this.Fenz = true;
      this.Usrating = "";
    },
    Enterfen() {
       let reg = /^[\+\-]?\d+(\.\d{0,2})?$/;
      if (!reg.test(this.Usrating)) {
        this.$message.error("请输入正确的格式哦！");
        this.Usrating = "";
        return;
      }
      let pay = {
        id: this.userId,
        rating: this.Usrating
      };
      if (this.Usrating === "") {
        this.$message.warning("请输入分润！");
        return;
      }
      USupdateRating(pay).then(res => {
        if (res.data.httpCode == 0) {
          this.Fenz = false;
          this.radio = "";
          this.getData();
          this.Concealment();
        }
      });
    },
    getData() {
      this.loading = true;
      console.log(this.listQuery);
      accountData(this.listQuery).then(res => {
        this.total = parseInt(res.data.total);
        res.data.data.map(item => {
          item.locked = parseInt(item.locked);
          if (item.roles != null) {
            item.roles = item.roles.join("、");
          }
        });
        this.tableData = res.data.data;
        this.tableData.forEach((item, index) => {
          if (
            item.consumeMoney == null ||
            item.consumeMoney == undefined ||
            item.consumeMoney === ""
          ) {
            item.consumeMoney = 0;
          }
          if (
            item.deposit == null ||
            item.deposit == undefined ||
            item.deposit === ""
          ) {
            item.deposit = 0;
          }
          if (
            item.rating == null ||
            item.rating == undefined ||
            item.rating === ""
          ) {
            item.rating = 0;
          }
          if (
            item.money == null ||
            item.money == undefined ||
            item.money === ""
          ) {
            item.money = 0;
          }
        });
        this.loading = false;
      });
    },
    // 表格数据转换
    formaRole(row, column) {
      return row.locked == 0 ? "停用" : "启用";
    },
    // 新增
    addUser(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addUserData(this.addData).then(res => {
            this.add = false;
            this.getData();
            this.radio = "";
          });
        }
      });
    },
    // 停用提示
    discontInuation() {
      if (!(this.radio !== "")) {
        this.$message({
          showClose: true,
          message: "请选择一条数据",
          type: "warning"
        });
        return false;
      }
      this.discontinuation = true;
    },
    allLockedData() {
      allLocked(this.editData.id).then(res => {
        this.discontinuation = false;
        this.getData();
        this.radio = "";
      });
    },
    // 启用提示
    enableMessage() {
      if (!(this.radio !== "")) {
        this.$message({
          showClose: true,
          message: "请选择一条数据",
          type: "warning"
        });
        return false;
      }
      this.enable = true;
    },
    allOpenData() {
      allOpen(this.editData.id).then(res => {
        this.enable = false;
        this.getData();
        this.radio = "";
      });
    },
    // 重置密码提示
    resetMessage() {
      if (!(this.radio !== "")) {
        this.$message({
          showClose: true,
          message: "请选择一条数据",
          type: "warning"
        });
        return false;
      }
      this.resetPassword = true;
    },
    resetPsdData() {
      resetPsd(this.editData.id).then(res => {
        this.resetPassword = false;
        this.getData();
        this.radio = "";
      });
    },
    // 修改判断提示
    editMessage() {
      if (!(this.radio !== "")) {
        this.$message({
          showClose: true,
          message: "请选择一条需要修改的数据",
          type: "warning"
        });
        return false;
      }
      detailUser(this.editData.id).then(res => {
        this.editData = res.data.data;
      });
      this.edit = true;
    },
    editUser(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          editUserData(this.editData).then(res => {
            this.edit = false;
            this.getData();
            this.radio = "";
          });
        }
      });
    },
    // 删除判断提示
    deletMessage() {
      if (!(this.radio !== "")) {
        this.$message({
          showClose: true,
          message: "请选择一条要删除的数据",
          type: "warning"
        });
        return false;
      }
      this.delet = true;
    },
    deleteUser() {
      delUserData(this.editData.id).then(res => {
        this.delet = false;
        this.getData();
        this.radio = "";
      });
    },
    // 分配权限提示
    permissionsMe() {
      if (!(this.radio !== "")) {
        this.$message({
          showClose: true,
          message: "请选择",
          type: "warning"
        });
        return false;
      }
      userData(this.userId).then(res => {
        this.userMenu = res.data.data;
        this.userMenu.map(item => {
          item.isSelected = Boolean(Number(item.isSelected));
        });
      });
      this.permissions = true;
    },
    getPerm() {
      const UserRole = {
        userId: this.userId,
        roleIds: []
      };
      this.userMenu.map(item => {
        if (item.isSelected) {
          UserRole.roleIds.push(item.id);
        }
      });
      updateUserData(UserRole).then(res => {
        this.getData();
        this.radio = "";
        this.permissions = false;
      });
    },
    // 分配区域提示
    regionMessage() {
      if (!(this.radio !== "")) {
        this.$message({
          showClose: true,
          message: "请选择",
          type: "warning"
        });
        return false;
      }
      this.idChecked = [];
      this.load = true;
      regionList({
        parentCode: 0,
        userId: this.editData.id
      }).then(res => {
        this.datas = res.data.data.vOElementTree;
        this.load = false;
        const rolId = res.data.data.idChecked || [];
        rolId.map((item, index) => {
          if (findParent(this.datas, item).children === null) {
            this.idChecked.push(item);
          }
        });
      });
      this.region = true;
    },
    upRegListData() {
      this.loads = true;
      this.handleNodeClick();
      upRegList({
        codes: this.codes,
        userId: this.userId
      }).then(res => {
        if (res.data.httpCode == "0") {
          this.loads = false;
          this.region = false;
          this.getData();
          this.radio = "";
          this.idChecked = [];
        }
      });
    },
    // 查询
    getAllList() {
      this.listQuery.pageNum = 1;
      this.getData();
      this.radio = "";
    },
    // 树节点
    handleNodeClick(data) {
      this.codes = [];
      var checkedCity = this.codes.concat(
        this.$refs.allCity.getHalfCheckedNodes(),
        this.$refs.allCity.getCheckedNodes()
      );
      checkedCity.map(item => {
        this.codes.push(item.id);
      });
    },
    showRow(row) {
      // 赋值给radio
      this.radio = this.tableData.indexOf(row);
      this.editData.id = row.id;
      this.userId = row.id;
      this.disableds.agree = false;
      this.disableds.noagree = false;
      this.disableds.permission = false;
      this.disableds.distributionArea = false;
      if (row.locked == "0") {
        this.disableds.noagree = true;
        this.disableds.permission = true;
        this.disableds.distributionArea = true;
      } else if (row.locked == "1") {
        this.disableds.agree = true;
      }
    },
    // 判断按钮是否隐藏
    Concealment() {
      userMenu({
        menuType: 1,
        parentId: this.$route.query.id
      }).then(res => {
        var concea = res.data.data;
        concea.map(item => {
          if (item.permission == "sys.user.add") {
            this.power.add = item;
          } else if (item.permission == "sys.user.edit") {
            this.power.edit = item;
          } else if (item.permission == "sys.user.delete") {
            this.power.delet = item;
          } else if (item.permission == "sys.user.updateUserRole") {
            this.power.distribution = item;
          } else if (item.permission == "sys.user.updateRegion") {
            this.power.distributionArea = item;
          } else if (item.permission == "sys.user.resetPsd") {
            this.power.resetPass = item;
          } else if (item.permission == "sys.user.allOpen") {
            this.power.enable = item;
          } else if (item.permission == "sys.user.allLocked") {
            this.power.discontInuation = item;
          } else if (item.permission == "sys.User.fen") {
            //查看分润
            this.power.fenrui = item;
          } else if (item.permission == "sys.User.yue") {
            //查看余额
            this.power.yue = item;
          } else if (item.permission == "sys.tem.liushui") {
            //查看流水
            this.power.liushui = item;
          } else if (item.permission == "sys.user.shen") {
            //已跑额度
            this.power.shen = item;
          } else if (item.permission == "sys.user.tong") {
            //通道设置
            this.power.tong = item;
          } else if (item.permission == "sys.user.bao") {
            //保证金
            this.power.bao = item;
          }
          //保证金  一跑金额
        });
      });
    },
    click(id) {
      你获取到的数据.map(item => {
        if (item.id == id) {
          let arr = [];
          arr.push("{" + "aj:" + item.aj + "," + "ad:" + item.ad + "}");
        }
      });
    }
  },
  mounted() {
    this.getData();
    this.Concealment();
  }
};
</script>
<style lang="less">
#acount {
  .ss {
    width: 50%;
    margin-right: 20px;
  }
  .el-select {
    width: 100%;
  }
  .scrollBar {
    top: 90px;
    left: 0px;
    right: 0px;
    bottom: 50px;
    padding-top: 20px;
  }
  .Scoprshop {
    line-height: 35px;
    span {
      float: left;
      width: 60%;
    }
    button {
      width: 30%;
    }
  }
  .pagination {
    position: absolute;
    bottom: 0px;
    right: 0px;
  }
  .el-dialog__footer {
    background: #f3f3f3;
    padding: 10px 10px 10px;
    text-align: center;
  }
  .el-dialog__header {
    border-bottom: 1px solid #dcdcdc;
    padding: 10px 20px 10px;
    .el-dialog__title {
      color: #367be2;
    }
  }
  .el-dialog__body {
    padding: 10px 20px;
    .el-checkbox + .el-checkbox {
      width: 100%;
      margin-left: 0px;
    }
    .qxfp .el-tree {
      height: 200px;
      overflow: auto;
    }
  }
  .fpqy .el-tree {
    height: 200px;
    overflow: auto;
  }
}
</style>
