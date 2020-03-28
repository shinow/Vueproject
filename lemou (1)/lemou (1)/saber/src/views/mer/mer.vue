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
          type="success"
          size="small"
          icon="el-icon-check"
          plain
          @click="handleDelete('0')"
        >一键上线</el-button>
        <el-button
          type="danger"
          size="small"
          icon="el-icon-close"
          plain
          @click="handleDelete('1')"
        >一键下线</el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import {
  getList,
  getDetail,
  add,
  update,
  getonline,
  remove
} from "@/api/cmer/cmer";
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
    return {
      form: {},
      formtip: {},
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
        viewBtn: false,
        selection: true,
        column: [
          {
            editDisplay: false,
            label: "账号",
            prop: "account",
            rules: [
              {
                required: true,
                message: "请输入账号",
                trigger: "blur"
              }
            ]
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
            search: true,
            label: "姓名",
            prop: "cmerName",
            rules: [
              {
                required: true,
                message: "请输入姓名",
                trigger: "blur"
              }
            ]
          },
          {
            label: "通道",
            prop: "channelName",
            editDisplay: false,
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
            addDisplay: false,
            search: true,
            label: "商户编号",
            prop: "cmerCode",
            rules: [
              {
                required: true,
                message: "请输入商户编号",
                trigger: "blur"
              }
            ]
          },
          {
            editDisplay: false,
            addDisplay: false,
            search: true,
            label: "用户编号",
            prop: "userCode",
            rules: [
              {
                required: true,
                message: "请输入用户编号",
                trigger: "blur"
              }
            ]
          },
          {
            addDisplay: false,
            search: true,
            editDisplay: false,
            label: "租户ID",
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
            search: true,
            addDisplay: false,
            type: "select",
            dicUrl: "/api/blade-system/dict-biz/dictionary?code=user_status",
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
                message: "请选择状态",
                trigger: "blur"
              }
            ]
          },
          {
            search: true,
            searchLabelWidth: 100,
            labelWidth: 100,
            label: "支付宝账号",
            prop: "alipayAccount"
          },
          {
            label: "支付宝uid",
            prop: "alipayUid"
          },
          {
            label: "银行卡id",
            prop: "cardIndex"
          },
          {
            search: true,
            label: "银行卡号",
            prop: "cardNo",
          },
          {
            label: "银行编码",
            prop: "bankMark",
            type: "select",
            dicUrl: "/api/blade-system/dict-biz/dictionary?code=user_bankMark",
            props: {
              label: "dictValue",
              value: "dictKey"
            }
          },
          {
            label: "描述",
            prop: "cmerDesc"
          }
        ]
      },
      data: [],
      Dataid: "",
      UPda: ""
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.mer_add, false),
        viewBtn: this.vaildData(this.permission.mer_view, false),
        delBtn: this.vaildData(this.permission.mer_delete, false),
        editBtn: this.vaildData(this.permission.mer_edit, false)
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
    rowSave(row, loading, done) {
      row.channelId = row.channelName;
      delete row.channelName;
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
    handleDelete(v) {
      console.log(v);
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      let stat;
      if (v === "0") {
        stat = "开启";
      } else {
        stat = "关闭";
      }
      console.log(stat);
      this.$confirm(`确定将选择状态${stat}?`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            status: v,
            ids: this.ids
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
