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
          v-if="permission.order_delete"
          @click="handleDelete"
        >删 除</el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import { getList, getDetail, add, update, remove } from "@/api/order/order";
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
        selection: true,
        column: [
          {
            searchLabelWidth: 100,
            search: true,
            label: "商户订单号",
            prop: "orderNo",
            rules: [
              {
                required: true,
                message: "请输入商户订单号",
                trigger: "blur"
              }
            ]
          },
          {
            searchLabelWidth: 100,
            search: true,
            label: "平台订单号",
            prop: "platformOrderNo",
            rules: [
              {
                required: true,
                message: "请输入平台订单号",
                trigger: "blur"
              }
            ]
          },
          {
            search: true,
            label: "商户编号",
            prop: "userCode",
            rules: [
              {
                required: true,
                message: "请输入商户编号",
                trigger: "blur"
              }
            ]
          },
          {
            label: "上级编号",
            prop: "parentCode",
            rules: [
              {
                required: true,
                message: "请输入上级编号",
                trigger: "blur"
              }
            ]
          },
          {
            search: true,
            label: "码商编号",
            prop: "merCode",
            rules: [
              {
                required: true,
                message: "请输入码商编号",
                trigger: "blur"
              }
            ]
          },
          {
            search: true,
            type: "date",
            format: "yyyy-MM-dd hh:mm:ss",
            label: "开始时间",
            prop: "startTime",
            rules: [
              {
                required: true,
                message: "请输入码商号编号",
                trigger: "blur"
              }
            ]
          },
          {
            search: true,
            type: "date",
            format: "yyyy-MM-dd hh:mm:ss",
            label: "结束时间",
            prop: "endTime",
            rules: [
              {
                required: true,
                message: "请输入码商号编号",
                trigger: "blur"
              }
            ]
          },
          {
            search: true,
            label: "最大金额",
            prop: "maxAmt",
            rules: [
              {
                required: true,
                message: "请输入码商号编号",
                trigger: "blur"
              }
            ]
          },
          {
            search: true,
            label: "最小金额",
            prop: "minAmt",
            rules: [
              {
                required: true,
                message: "请输入码商号编号",
                trigger: "blur"
              }
            ]
          },
          {
            searchLabelWidth: 100,
            search: true,
            label: "码商号编号",
            prop: "cmerCode",
            rules: [
              {
                required: true,
                message: "请输入码商号编号",
                trigger: "blur"
              }
            ]
          },
          {
            searchLabelWidth: 105,
            search: true,
            label: "跑分代理编号",
            prop: "agentCode",
            rules: [
              {
                required: true,
                message: "请输入跑分代理编号",
                trigger: "blur"
              }
            ]
          },
          {
            searchLabelWidth: 105,
            search: true,
            label: "app用户编号",
            prop: "memberCode",
            rules: [
              {
                required: true,
                message: "请输入app用户编号",
                trigger: "blur"
              }
            ]
          },
          {
            label: "订单金额",
            prop: "orderAmount",
            rules: [
              {
                required: true,
                message: "请输入订单金额",
                trigger: "blur"
              }
            ]
          },
          {
            search: true,
            type: "select",
            dicUrl: "/api/blade-system/dict-biz/dictionary?code=order_Status",
            props: {
              label: "dictValue",
              value: "dictKey"
            },
            dataType: "number",
            label: "订单状态",
            prop: "orderStatus",
            rules: [
              {
                required: true,
                message: "请选择订单状态",
                trigger: "blur"
              }
            ]
          },
          {
            type: "select",
            dicUrl:
              "/api/blade-system/dict-biz/dictionary?code=order_stlStatus",
            props: {
              label: "dictValue",
              value: "dictKey"
            },
            dataType: "number",
            search: true,
            label: "清算状态",
            prop: "stlStatus",
            rules: [
              {
                required: true,
                message: "请输入清算状态",
                trigger: "blur"
              }
            ]
          },
          {
            label: "清算时间",
            prop: "stlTime",
            rules: [
              {
                required: true,
                message: "请输入清算时间",
                trigger: "blur"
              }
            ]
          },
          {
            label: "订单手续费",
            prop: "orderFee",
            rules: [
              {
                required: true,
                message: "请输入订单手续费",
                trigger: "blur"
              }
            ]
          },
          {
            searchLabelWidth: 100,
            search: true,
            label: "产品通道id",
            prop: "channelId",
            rules: [
              {
                required: true,
                message: "请输入产品通道id",
                trigger: "blur"
              }
            ]
          },
          {
            label: "前台回调地址",
            prop: "frontUrl",
            rules: [
              {
                required: true,
                message: "请输入前台回调地址",
                trigger: "blur"
              }
            ]
          },
          {
            label: "后端回调地址",
            prop: "backUrl",
            rules: [
              {
                required: true,
                message: "请输入后端回调地址",
                trigger: "blur"
              }
            ]
          },
          {
            label: "备注",
            prop: "orderRemark",
            rules: [
              {
                required: true,
                message: "请输入备注",
                trigger: "blur"
              }
            ]
          },
          {
            label: "四方同步返回",
            prop: "bankMsg",
            rules: [
              {
                required: true,
                message: "请输入四方同步返回",
                trigger: "blur"
              }
            ]
          },
          {
            type: "select",
            dicUrl:
              "/api/blade-system/dict-biz/dictionary?code=order_responseMsg",
            props: {
              label: "dictValue",
              value: "dictKey"
            },
            dataType: "number",
            search: true,
            label: "商户回调",
            prop: "responseMsg",
            rules: [
              {
                required: true,
                message: "请选择商户回调",
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
        addBtn: this.vaildData(this.permission.order_add, false),
        viewBtn: this.vaildData(this.permission.order_view, false),
        delBtn: this.vaildData(this.permission.order_delete, false),
        editBtn: this.vaildData(this.permission.order_edit, false)
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
