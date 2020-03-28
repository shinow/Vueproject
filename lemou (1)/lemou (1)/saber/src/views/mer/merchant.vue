<template>
  <basic-container>
    <avue-crud
      :option="option"
      :table-loading="loading"
      :data="data"
      :page="page"
      :permission="permissionList"
      :before-open="beforeOpen"
      v-model="form"
      ref="crud"
      @row-update="rowUpdate"
      @row-save="rowSave"
      @search-change="searchChange"
      @search-reset="searchReset"
      @selection-change="selectionChange"
      @current-change="currentChange"
      @size-change="sizeChange"
      @refresh-change="refreshChange"
      @on-load="onLoad"
    >
      <template slot="menuLeft">
        <el-button
          type="success"
          size="small"
          icon="el-icon-check"
          plain
          @click="handleDelete('0','一键上线')"
        >一键上线</el-button>
        <el-button
          type="danger"
          size="small"
          icon="el-icon-close"
          plain
          @click="handleDelete('1','一键下线')"
        >一键下线</el-button>
      </template>
      <template slot="menu" slot-scope="{row}">
        <el-button
          size="mini"
          v-if="USERcode!==row.userCode  || USERcode =='000000'"
          type="warning"
          @click="rowUpdate(row)"
        >编辑</el-button>
        <el-button
          size="mini"
          v-if="USERcode!==row.parentCode || USERcode =='000000'"
          type="warning"
          @click="setpws(row.id)"
        >密码设置</el-button>
      </template>
    </avue-crud>
    <!-- //密码设置 -->
    <el-dialog append-to-body :visible.sync="posbox" width="400px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="登录密码" prop="passd">
          <el-input style="width:200px" v-model="ruleForm.passd"></el-input>
        </el-form-item>
        <el-form-item label="支付密码" prop="paypassd">
          <el-input style="width:200px" v-model="ruleForm.paypassd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormpos('ruleForm')">设置密码</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 谷歌验证码 -->
    <el-dialog append-to-body :visible.sync="gool" width="400px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="谷歌验证码" prop="goole">
          <el-input style="width:200px" v-model="ruleForm.goole"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormgool('ruleForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 上线  下线 -->
    <el-dialog append-to-body :title="uptitle" :visible.sync="box" width="400px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="通道类型" prop="region">
          <el-select @change="change" v-model="ruleForm.region" placeholder="请选择通道类型">
            <el-option
              v-for="item in ruleForm.options"
              :key="item.id"
              :label="item.channelName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="银行编码" v-if="Bankchil" prop="Bank">
          <el-select @change="Bankchange" v-model="ruleForm.Bank" placeholder="请选择银行编码">
            <el-option
              v-for="item in ruleForm.Bankoptions"
              :key="item.dictKey"
              :label="item.dictValue"
              :value="item.dictKey"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即更改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </basic-container>
</template>

<script>
import {
  getList,
  getDetail,
  add,
  update,
  updatePassword,
  remove,
  RolegetList
} from "@/api/cmer/mer";
import { getbankMarklList, getchannelList, getonline } from "@/api/cmer/cmer";
import { mapGetters } from "vuex";

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      //
      USERcode: localStorage.userCode,
      //行id
      id: "",
      //谷歌验证码
      gool: false,
      //密码
      posbox: false,
      //一键上线
      Bankchil: true,
      uptitle: "",
      ruleForm: {
        region: "",
        options: [],
        Bankoptions: [],
        Bank: "",
        goole: "",
        passd: "",
        paypassd: ""
      },
      rules: {
        goole: [
          { required: true, message: "请输入谷歌验证码", trigger: "change" }
        ],
        region: [
          { required: true, message: "请选择通道类型", trigger: "change" }
        ],
        Bank: [{ required: true, message: "请选择银行", trigger: "change" }],
        passd: [
          { required: true, message: "请输入登录密码", trigger: "change" }
        ],
        paypassd: [
          { required: true, message: "请输入支付密码", trigger: "change" }
        ]
      },
      box: false,
      ////
      roleId: "",
      form: {},
      query: {},
      loading: true,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      selectionList: [],
      option: {
        tip: false,
        searchShow: true,
        searchMenuSpan: 6,
        border: true,
        //添加按钮
        // addBtn:false,
        //隐藏表格数据
        columnBtn: false,
        //删除按钮
        delBtn: false,
        index: true,
        editBtn: false,
        viewBtn: true,
        selection: true,
        column: [
          {
            hide: true,
            editDisplay: false,
            viewDisplay: false,
            label: "登录账号",
            prop: "account",
            rules: [
              {
                required: true,
                message: "请输入登录账号",
                trigger: "blur"
              }
            ]
          },
          {
            editDisplay: false,
            viewDisplay: false,
            label: "码商昵称",
            prop: "name",
            hide: true,
            rules: [
              {
                required: true,
                message: "请输入码商昵称",
                trigger: "blur"
              }
            ]
          },
          {
            search: true,
            label: "码商姓名",
            prop: "realName",
            rules: [
              {
                required: true,
                message: "请输入码商姓名",
                trigger: "blur"
              }
            ] //729546
          },
          {
            type: "password",
            label: "密码",
            prop: "password",
            hide: true,
            editDisplay: false,
            viewDisplay: false,
            rules: [
              { required: true, validator: validatePass, trigger: "blur" }
            ]
          },
          {
            type: "password",
            label: "确认密码",
            prop: "password2",
            hide: true,
            editDisplay: false,
            viewDisplay: false,
            rules: [
              { required: true, validator: validatePass2, trigger: "blur" }
            ]
          },

          {
            search: true,
            label: "租户ID",
            addDisplay: false,
            editDisplay: false,
            viewDisplay: false,
            prop: "tenantId",
            rules: [
              {
                required: true,
                message: "请输入租户ID",
                trigger: "blur"
              }
            ]
          },
          {
            editDisplay: false,
            addDisplay: false,
            search: true,
            label: "码商编号",
            prop: "userCode",
            rules: [
              {
                required: true,
                message: "请输入码商编号",
                trigger: "blur"
              }
            ]
          },
          {
            editDisplay: false,
            viewDisplay: false,
            addDisplay: true,
            // hide: true,
            search: true,
            label: "上级编号",
            prop: "parentCode"
          },
          {
            addDisplay: false,
            type: "select",
            dicUrl: "/api/blade-system/dict-biz/dictionary?code=user_status",
            props: {
              label: "dictValue",
              value: "dictKey"
            },
            dataType: "number",
            label: "码商状态",
            prop: "status",
            rules: [
              {
                required: true,
                message: "请输入码商状态",
                trigger: "blur"
              }
            ]
          },
          {
            editDisplay: false,
            addDisplay: false,
            search: true,
            type: "select",
            dicUrl: "/api/blade-system/dict-biz/dictionary?code=user_Grade",
            props: {
              label: "dictValue",
              value: "dictKey"
            },
            dataType: "number",
            label: "码商等级",
            prop: "userGrade",
            rules: [
              {
                required: true,
                message: "请输入码商等级",
                trigger: "blur"
              }
            ]
          },
          {
            editDisplay: false,
            addDisplay: false,
            labelWidth: 110,
            label: "最后登录时间",
            prop: "loginTime",
            rules: [
              {
                required: true,
                message: "请输入最后登录时间",
                trigger: "blur"
              }
            ]
          },
          {
            editDisplay: false,
            viewDisplay: false,
            hide: true,
            label: "手机号码",
            prop: "phone",
            overHidden: true
          },
          {
            editDisplay: false,
            viewDisplay: false,
            label: "电子邮箱",
            prop: "email",
            hide: true,
            overHidden: true
          },
          {
            editDisplay: false,
            viewDisplay: false,
            hide: true,
            label: "码商性别",
            prop: "sex",
            type: "select",
            dicData: [
              {
                label: "男",
                value: 1
              },
              {
                label: "女",
                value: 2
              },
              {
                label: "未知",
                value: 3
              }
            ],
            hide: true
          },
          {
            editDisplay: false,
            viewDisplay: false,
            label: "码商生日",
            type: "date",
            prop: "birthday",
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
            hide: true
          }
        ]
      },
      data: []
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.merchant_add, false),
        viewBtn: this.vaildData(this.permission.merchant_view, false),
        editBtn: this.vaildData(this.permission.merchant_edit, false)
      };
    },
    ids() {
      let ids = [];
      this.selectionList.forEach(ele => {
        ids.push(ele.id);
      });
      return ids.join(",");
    }
  },
  created() {
    this.ChaBankList();
    this.option.column.forEach((item, index) => {
      if (item.label == "上级编号") {
        if (localStorage.real_name === "管理员") {
          item.addDisplay = true;
        } else {
          item.addDisplay = false;
        }
      }
    });
  },
  methods: {
    submitFormgool(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let pey = {
            password: this.ruleForm.passd,
            payPassword: this.ruleForm.paypassd,
            code: this.ruleForm.goole,
            userId: this.id
          };
          updatePassword(pey).then(res => {
            if (res.data.code == 200) {
              this.gool = false;
              this.onLoad(this.page);
              this.$message({
                type: "success",
                message: "操作成功!"
              });
            }
          });
        } else {
        }
      });
    },
    submitFormpos(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.gool = true;
          this.posbox = false;
        } else {
        }
      });
    },
    setpws(val) {
      this.id = val;
      this.posbox = true;
    },
    Bankchange(val) {
      console.log(val);
    },
    ChaBankList() {
      getbankMarklList().then(res => {
        let data = res.data.data;
        let Uesid = [];
        data.forEach((item, index) => {
          Uesid.push(item.id);
        });
        data.unshift({ dictValue: "全部", dictKey: Uesid });
        this.ruleForm.options = data;
        this.ruleForm.Bankoptions = data;
      });
      getchannelList().then(res => {
        let data = res.data.data;
        let Uesid = [];
        data.forEach((item, index) => {
          Uesid.push(item.id);
          if (item.channelName.includes("转卡")) {
            this.Dataid = item.id;
          }
        });
        data.push({ channelName: "全部", id: Uesid });
        this.ruleForm.options = data;
      });
    },
    change(val) {
      if (this.Dataid === val) {
        this.Bankchil = true;
      } else {
        this.Bankchil = false;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        let textUS = 0;
        if (valid) {
          if (this.UPda === "0") {
            textUS = "上线";
          } else {
            textUS = "下线";
          }
          this.$confirm(`确定将选择${textUS}?`, {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              let params = {
                bankMark: this.ruleForm.Bank,
                channelId: this.ruleForm.region,
                status: this.UPda,
                userIds: this.ids
              };
              getonline(params).then(res => {
                console.log(res.data.data);
              });
            })
            .then(() => {
              this.onLoad(this.page);
              this.$message({
                type: "success",
                message: "操作成功!"
              });
              this.box = false;
              this.$refs.crud.toggleSelection();
            });
        } else {
        }
      });
    },
    handleDelete(v, title) {
      this.uptitle = title;
      this.UPda = v;
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      this.box = true;
    },
    rowSave(row, loading, done) {
      row.roleId = this.roleId;
      console.log(row);
      add(row).then(
        () => {
          loading();
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        },
        error => {
          done();
          console.log(error);
        }
      );
    },
    rowUpdate(row, index, loading, done) {
      for (const key in row) {
        if (row.hasOwnProperty(key)) {
          const element = row[key];
          if (row[key] === "") {
            delete row[key];
          }
        }
      }
      update(row).then(
        () => {
          loading();
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        },
        error => {
          done();
          console.log(error);
        }
      );
    },
    beforeOpen(done, type) {
      if (["edit", "view"].includes(type)) {
        getDetail(this.form.id).then(res => {
          this.form = res.data.data;
        });
      }
      done();
    },
    searchReset() {
      this.query = {};
      this.onLoad(this.page);
    },
    searchChange(params, done) {
      this.query = params;
      this.page.currentPage = 1;
      this.onLoad(this.page, params);
      done();
    },
    selectionChange(list) {
      this.selectionList = list;
    },
    selectionClear() {
      this.selectionList = [];
      this.$refs.crud.toggleSelection();
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    refreshChange() {
      this.onLoad(this.page, this.query);
    },
    onLoad(page, params = {}) {
      this.loading = true;
      getList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then(res => {
        const data = res.data.data;
        this.page.total = data.total;
        this.data = data.records;
        this.loading = false;
        this.selectionClear();
      });
      RolegetList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then(res => {
        const data = res.data.data;
        data.forEach((item, index) => {
          if (item.roleName == "码商") {
            this.roleId = item.id;
          }
        });
      });
    }
  }
};
</script>

<style>
</style>
