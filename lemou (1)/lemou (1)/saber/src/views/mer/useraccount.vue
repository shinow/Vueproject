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
      @row-del="rowDel"
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
          type="danger"
          size="small"
          icon="el-icon-delete"
          plain
          v-if="permission.useraccount_delete"
          @click="handleDelete"
        >删 除</el-button>
      </template>
    </avue-crud>
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
  </basic-container>
</template>

<script>
import {
  getList,
  getDetail,
  add,
  update,
  remove
} from "@/api/cmer/useraccount";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {},

      gool: false,
      ruleForm: {
        goole: ""
      },
      rules: {
        goole: [
          { required: true, message: "请输入谷歌验证码", trigger: "change" }
        ]
      },
      query: {},
      loading: true,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      selectionList: [],
      option: {
        calcHeight: 30,
        tip: false,
        searchShow: true,
        searchMenuSpan: 6,
        border: true,
        index: true,
        viewBtn: true,
        selection: true,
        column: [
          {
            label: "通道",
            prop: "channelName",
            editDisplay: false,
            search: true,
            type: "select",
            dicUrl: "/api/blade-product/channel/list",
            props: {
              label: "channelName",
              value: "id"
            },
            rules: [
              {
                required: true,
                message: "请选择通道",
                trigger: "blur"
              }
            ]
          },
          {
            editDisplay: false,
            label: "用户类型",
            prop: "type",
            rules: [
              {
                required: true,
                message: "请输入用户类型",
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
            label: "用户等级",
            prop: "userGrade",
            rules: [
              {
                required: true,
                message: "请输入用户等级",
                trigger: "blur"
              }
            ]
          },
          {
            editDisplay: false,
            search: true,
            label: "上级编号",
            prop: "parentCode",
            rules: [
              {
                required: true,
                message: "请输入余额",
                trigger: "blur"
              }
            ]
          },
          {
            editDisplay: false,
            label: "租户id",
            prop: "tenantId",
            rules: [
              {
                required: true,
                message: "请输入余额",
                trigger: "blur"
              }
            ]
          },
          {
            editDisplay: false,
            search: true,
            label: "用户编号",
            prop: "userCode",
            rules: [
              {
                required: true,
                message: "请输入余额",
                trigger: "blur"
              }
            ]
          },
          {
            editDisplay: false,
            search: true,
            type: "select",
            dicUrl: "/api/blade-system/dict-biz/dictionary?code=product_status",
            props: {
              label: "dictValue",
              value: "dictKey"
            },
            dataType: "number",
            label: "状态",
            prop: "status",
            rules: [
              {
                required: true,
                message: "请输入状态",
                trigger: "blur"
              }
            ]
          },
          {
            editDisplay: false,
            search: true,
            label: "用户名称",
            prop: "realName",
            rules: [
              {
                required: true,
                message: "请输入余额",
                trigger: "blur"
              }
            ]
          },
          {
            label: "余额",
            prop: "balance",
            rules: [
              {
                required: true,
                message: "请输入余额",
                trigger: "blur"
              }
            ]
          },
          {
            label: "冻结余额",
            prop: "freezeBalance",
            rules: [
              {
                required: true,
                message: "请输入冻结余额",
                trigger: "blur"
              }
            ]
          },
          {
            label: "保证金",
            prop: "margin",
            rules: [
              {
                required: true,
                message: "请输入保证金",
                trigger: "blur"
              }
            ]
          },
          {
            label: "冻结保证金",
            prop: "freezeMargin",
            rules: [
              {
                required: true,
                message: "请输入冻结保证金",
                trigger: "blur"
              }
            ]
          },
          {
            label: "限额",
            prop: "limitAmt",
            rules: [
              {
                required: true,
                message: "请输入限额",
                trigger: "blur"
              }
            ]
          }
        ]
      },
      data: [],
      row: {}
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.useraccount_add, false),
        viewBtn: this.vaildData(this.permission.useraccount_view, false),
        delBtn: this.vaildData(this.permission.useraccount_delete, false),
        editBtn: this.vaildData(this.permission.useraccount_edit, false)
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
  methods: {
    submitFormgool(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.row.code = this.ruleForm.goole;
          update(this.row).then(res => {
              if (res.data.code == 200) {
              this.gool = false;
              this.onLoad(this.page);
              this.$message({
                type: "success",
                message: "操作成功!"
              });
            }
            },
          );
        } else {
        }
      });
    },
    rowSave(row, loading, done) {
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
      this.gool = true;
      this.row = row;
    },
    rowDel(row) {
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return remove(row.id);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        });
    },
    handleDelete() {
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return remove(this.ids);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          this.$refs.crud.toggleSelection();
        });
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
    }
  }
};
</script>

<style>
</style>
