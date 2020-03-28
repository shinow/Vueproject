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
          v-if="permission.channel_delete"
          @click="handleDelete"
        >删 除</el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import { getList, getDetail, add, update, remove } from "@/api/product/channel";
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
        height: "auto",
        calcHeight: 30,
        tip: false,
        searchShow: true,
        searchMenuSpan: 6,
        border: true,
        index: true,
        viewBtn: true,
        column: [
          {
            search: true,
            label: "通道名称",
            prop: "channelName",
            rules: [
              {
                required: true,
                message: "请输入通道名称",
                trigger: "blur"
              }
            ]
          },
          {
            editDisplay: false,
            type: "select",
            dicUrl: "/api/blade-system/dict-biz/dictionary?code=channel_type",
            props: {
              label: "dictValue",
              value: "dictKey"
            },
            dataType: "number",
            search: true,
            label: "通道类型",
            prop: "type",
            rules: [
              {
                required: true,
                message: "请输入通道类型",
                trigger: "blur"
              }
            ]
          },
          {
            label: "产品名称",
            prop: "productId",
            editDisplay: false,
            hide: true,
            //搜索的文字宽度
            // searchLabelWidth: 90,
            //表格里面
            // labelWidth: 100,
            type: "select",
            dicUrl: "/api/blade-product/product/list",
            props: {
              label: "productName",
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
            labelWidth: 100,
            label: "费率（%）",
            prop: "rate",
            rules: [
              {
                required: true,
                message: "请输入费率（%）",
                trigger: "blur"
              }
            ]
          },
          {
            label: "提现费",
            prop: "cashFee",
            rules: [
              {
                required: true,
                message: "请输入提现费",
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
            labelWidth: 120,
            label: "单笔最低金额",
            prop: "minAmt",
            rules: [
              {
                required: true,
                message: "请输入单笔最低金额",
                trigger: "blur"
              }
            ]
          },
          {
            labelWidth: 120,
            label: "单笔最高金额",
            prop: "maxAmt",
            rules: [
              {
                required: true,
                message: "请输入单笔最高金额",
                trigger: "blur"
              }
            ]
          },
            {
            label: "通道限额",
            prop: "limitAmt",
            rules: [
              {
                required: true,
                message: "请输入通道限额",
                trigger: "blur"
              }
            ]
          },
        ]
      },
      data: []
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.channel_add, false),
        viewBtn: this.vaildData(this.permission.channel_view, false),
        delBtn: this.vaildData(this.permission.channel_delete, false),
        editBtn: this.vaildData(this.permission.channel_edit, false)
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
