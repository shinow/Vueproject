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
          >{{power.distribution.menuName}}</el-button> -->
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
          <!-- /// -->
          <el-table-column show-overflow-tooltip prop="locked" :formatter="formaRole" label="状态">
            <!-- <template slot-scope="scope">
              {{scope.row.locked? '启用' : '停用'}}
            </template>-->
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="createTime" label="创建时间"></el-table-column>
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
      <!-- / -->
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
        roleName: "客服"
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
      loading:false,
      delet: false,
      // 分配权限
      permissions: false,
      userMenu: [],
      userId: "",
      preData: {
        roleId: [],
        userId: ""
      },
      // 分配区域
      region: false,
      codes: [],
      load: false,
      loads: false,
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
    };
  },
  computed: {
    num(val) {
      const { pageNum, pageSize } = this.listQuery;
      return (pageNum - 1) * pageSize + 1;
    }
  },
  methods: {
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
          }
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
