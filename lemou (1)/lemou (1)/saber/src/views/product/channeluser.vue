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
    </avue-crud>
  </basic-container>
</template>

<script>
import {
  getList,
  getDetail,
  add,
  update,
  remove
} from "@/api/product/channeluser";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
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
        index: true,
        viewBtn: true,
        selection: true,
        column: [
          {
            
            label: "通道名称",
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
                message: "请选择通道名称",
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
                message: "请输入用户id",
                trigger: "blur"
              }
            ]
          },
          {
            label: "费率",
               type: 'number',
            prop: "rate",
            rules: [
              {
                required: true,
                message: "请输入费率",
                trigger: "blur"
              }
            ]
          },//
          {
            label: "权重",
            prop: "weight",
            maxlength:3,
            type: 'number',
            rules: [
              {
                required: true,
                message: "请输入权重",
                trigger: "blur",
                
              }
            ]
          },
          {
            label: "提现费",
            prop: "cashFee",
               type: 'number',
            rules: [
              {
                required: true,
                message: "请输入费率",
                trigger: "blur"
              }
            ]
          },
          {
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
            addDisplay: false,
            editDisplay: false,
            search: true,
            type: "select",
            dicUrl:
              "/api/blade-system/dict-biz/dictionary?code=channeluser_type",
            props: {
              label: "dictValue",
              value: "dictKey"
            },
            dataType: "number",
            label: "类型",
            prop: "type",
            rules: [
              {
                required: true,
                message: "请输入类型",
                trigger: "blur"
              }
            ]
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
        addBtn: this.vaildData(this.permission.channeluser_add, false),
        viewBtn: this.vaildData(this.permission.channeluser_view, false),
        delBtn: this.vaildData(this.permission.channeluser_delete, false),
        editBtn: this.vaildData(this.permission.channeluser_edit, false)
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
      console.log(row);
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
