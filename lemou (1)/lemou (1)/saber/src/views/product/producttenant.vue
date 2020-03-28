<template>
  <basic-container>
    <avue-crud
      :option="option"
      :table-loading="loading"
      :data="data"
      @row-update="rowUpdate"
      :page="page"
      :permission="permissionList"
      :before-open="beforeOpen"
      v-model="form"
      ref="crud"
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
          @click="handleDelete('0')"
        >开启</el-button>
        <el-button
          type="danger"
          size="small"
          icon="el-icon-close"
          plain
          @click="handleDelete('1')"
        >关闭</el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import {
  getList,
  getDetail,
  add,
  updateStatus,
  update,
  remove
} from "@/api/product/producttenant";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {},
      query: {},
      loading: true,
      Openstatus: {},
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      selectionList: [],
      option: {
        calcHeight: 30,
        tip: false,
        //操作栏
        searchShow: true,
        searchMenuSpan: 6,
        border: true,
        index: true,
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
            search: true,
            addDisplay: false,
            editDisplay: false,
            label: "产品名称",
            prop: "productName",
            rules: [
              {
                required: true,
                message: "请输入产品名称",
                trigger: "blur"
              }
            ]
          },
          {
            search: true,
            editDisplay: false,
            label: "租户id",
            prop: "tenantId",
            rules: [
              {
                required: true,
                message: "请输入租户id",
                trigger: "blur"
              }
            ]
          },
          {
            label: "提成",
            prop: "rate",
            rules: [
              {
                required: true,
                message: "请输入提成",
                trigger: "blur"
              }
            ]
          },
          {
            addDisplay: false,
            editDisplay: false,
            search: true,
            type: "select",
            dicUrl: "/api/blade-system/dict-biz/dictionary?code=product_type",
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
        addBtn: this.vaildData(this.permission.producttenant_add, false),
        viewBtn: this.vaildData(this.permission.producttenant_view, false),
        delBtn: this.vaildData(this.permission.producttenant_delete, false)
        // editBtn: this.vaildData(this.permission.producttenant_edit, false)
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
          return updateStatus(this.ids, v);
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
