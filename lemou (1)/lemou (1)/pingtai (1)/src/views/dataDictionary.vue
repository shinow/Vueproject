<template>
  <div id="zidian">
    <el-card shadow="never" body-style="padding:0px">
      <el-row slot="header">
        <el-col :span="17">
          <el-button
            :span="2"
            size="small"
            type="success"
            :icon="power.add.iconcls"
            v-if="power.add.permission"
            @click="addTree()"
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
            type="success"
            :icon="power.delet.iconcls"
            v-if="power.delet.permission"
            @click="deletMessage()"
          >{{power.delet.menuName}}</el-button>
        </el-col>
        <el-col :span="7" class="pull-right">
          <el-button
            class="pull-right"
            :span="2"
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="getAllList()"
          ></el-button>
          <el-input
            class="pull-right ss"
            size="small"
            v-model="listQuery.name"
            placeholder="请输入名称进行搜索"
            @change="getAllList"
          ></el-input>
        </el-col>
      </el-row>
    </el-card>
    <div class="content">
      <div class="pull-left">
        <scrollBar class="scrollBar-left">
          <el-tree
            v-loading="load"
            :data="data"
            :props="defaultProps"
            accordion
            @node-click="handleNodeClick"
          ></el-tree>
        </scrollBar>
      </div>
      <scrollBar class="scrollBar-right">
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
          <el-table-column show-overflow-tooltip type="index" :index="num" label="序号" width="60"></el-table-column>
          <el-table-column show-overflow-tooltip prop="sortNo" label="排序号" width="180"></el-table-column>
          <el-table-column show-overflow-tooltip prop="name" label="名称" width="180"></el-table-column>
          <el-table-column show-overflow-tooltip prop="code" label="编码"></el-table-column>
          <el-table-column show-overflow-tooltip prop="type" label="类型"></el-table-column>
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
          <el-form-item label="选择上级" prop="select">
            <el-cascader
              size="small"
              :props="propes"
              placeholder="可搜索"
              :options="options"
              filterable
              v-model="addData.select"
              change-on-select
              style="width:100%"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="字典名称" prop="name">
            <el-input size="small" v-model="addData.name" placeholder="请输入菜单名称"></el-input>
          </el-form-item>
          <el-form-item label="排序号" prop="sortNo">
            <el-input size="small" v-model="addData.sortNo" placeholder="请输入排序号"></el-input>
          </el-form-item>
          <el-form-item label="编码" prop="code">
            <el-input size="small" v-model="addData.code" placeholder="请输入编码"></el-input>
          </el-form-item>
          <el-form-item label="是否可编辑" prop="editable">
            <el-select size="small" v-model="addData.editable" filterable placeholder="请选择">
              <el-option
                v-for="item in editables"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-input size="small" v-model="addData.type" placeholder></el-input>
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
          <el-button type="primary" @click="addDicData('addData')">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="修改" :visible.sync="edit" width="400px" left>
        <el-form ref="editData" :model="editData" :rules="editRules">
          <span style="color: red">*号为必填项</span>
          <el-form-item label="选择上级" prop="select">
            <el-cascader
              class="plac"
              size="small"
              :props="propss"
              :placeholder="editPlac.name"
              :options="optiones"
              filterable
              v-model="selects"
              change-on-select
              style="width:100%"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="字典名称" prop="name">
            <el-input size="small" v-model="editData.name" placeholder="请输入菜单名称"></el-input>
          </el-form-item>
          <el-form-item label="排序号" prop="sortNo">
            <el-input size="small" v-model="editData.sortNo" placeholder="请输入排序号"></el-input>
          </el-form-item>
          <el-form-item label="编码" prop="code">
            <el-input size="small" v-model="editData.code" placeholder="请输入编码"></el-input>
          </el-form-item>
          <el-form-item label="是否可编辑" prop="editable">
            <el-select size="small" v-model="editData.editable" filterable placeholder="请选择">
              <el-option
                v-for="item in editables"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-input size="small" v-model="editData.type" placeholder></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input size="small" maxlength="50" v-model="editData.remark" placeholder></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="editDicData('editData')">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog class="delete" title="删除" :visible.sync="delet" width="300px" left>
        <span>您确定要删除此信息？</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="deleteDicData()">确 定</el-button>
        </span>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
import {
  dicList,
  diccList,
  addDic,
  detailDic,
  editDic,
  deleteDic,
  userMenu
} from "@/api";
import pagination from "@/components/pagination";
import scrollBar from "@/components/scrollBarContainner";
import { findParent } from "@/util/util";
// import { validatenumord } from '@/util/validate'
export default {
  components: {
    pagination,
    scrollBar
  },
  data() {
    const isvalidatenum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不可为空"));
      } else {
        const reg = /^([1-9]\d*|[0]{1,1})$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("输入整数"));
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
        parentId: ""
      },
      total: null,
      // 树数据
      data: [],
      load: false,
      defaultProps: {
        children: "children",
        label: "name"
      },
      // 新增
      add: false,
      addData: {
        code: "",
        editable: 1,
        name: "",
        parentId: "",
        remark: "",
        sortNo: "",
        type: ""
      },
      editables: [
        {
          value: 0,
          label: "否"
        },
        {
          value: 1,
          label: "是"
        }
      ],
      // 上级菜单
      options: [],
      optiones: [],
      propes: {
        value: "id",
        label: "name",
        children: "children"
      },
      propss: {
        value: "id",
        label: "name",
        children: "children"
      },
      select: [],
      selects: [],
      // 修改
      edit: false,
      editData: {
        id: "",
        code: "",
        editable: "",
        name: "",
        parentId: "",
        remark: "",
        sortNo: "",
        type: ""
      },
      editPlac: {
        id: "",
        name: ""
      },
      // 删除
      delet: false,
      // 判断按钮是否隐藏
      power: {
        add: false,
        edit: false,
        delet: false
      },
      addRules: {
        select: [
          {
            required: true,
            message: "上级菜单不可为空",
            trigger: ["blur", "change"]
          }
        ],
        name: [
          {
            required: true,
            message: "上级菜单不可为空",
            trigger: ["blur", "change"]
          },
          { max: 10, message: "不超过10个字符", trigger: ["blur", "change"] }
        ],
        sortNo: [
          {
            required: true,
            trigger: ["blur", "change"],
            validator: isvalidatenum
          }
        ],
        code: [
          {
            required: true,
            trigger: ["blur", "change"],
            validator: isvalidatenum
          }
        ],
        type: [
          { required: true, message: "不可为空", trigger: ["blur", "change"] },
          { max: 10, message: "不可超过10个字符", trigger: ["blur", "change"] }
        ]
      },
      editRules: {
        name: [
          {
            required: true,
            message: "上级菜单不可为空",
            trigger: ["blur", "change"]
          },
          { max: 10, message: "不超过10个字符", trigger: ["blur", "change"] }
        ],
        sortNo: [
          {
            required: true,
            trigger: ["blur", "change"],
            validator: isvalidatenum
          }
        ],
        code: [
          {
            required: true,
            trigger: ["blur", "change"],
            validator: isvalidatenum
          }
        ],
        type: [
          { required: true, message: "不可为空", trigger: ["blur", "change"] },
          { max: 10, message: "不可超过10个字符", trigger: ["blur", "change"] }
        ]
      }
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
      diccList(this.listQuery).then(res => {
        this.tableData = res.data.data;
        this.total = parseInt(res.data.total);
        this.loading = false;
      });
    },
    getTree() {
      this.load = true;
      this.data = [];
      dicList({ child: true }).then(res => {
        res.data.data.map(item => {
          if (item.children) {
            this.data.push(item);
          }
        });
        this.load = false;
      });
    },
    // 新增里的下拉树
    addTree() {
      dicList({ ischild: true }).then(res => {
        res.data.data.map(item => {
          if (item.children) {
            this.options.push(item);
          }
        });
        this.add = true;
      });
    },
    // 新增
    addDicData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addData.parentId = this.addData.select[
            this.addData.select.length - 1
          ];
          addDic(this.addData).then(res => {
            this.add = false;
            this.getData();
            this.getTree();
            this.radio = "";
            this.addData = {};
            this.select = [];
          });
        }
      });
    },
    // 修改上级菜单获取
    getdicList() {
      dicList({ ischild: true }).then(res => {
        res.data.data.map(item => {
          if (item.children) {
            this.optiones.push(item);
          }
        });
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
      detailDic(this.editData.id).then(res => {
        this.editData = res.data.data;
        this.editData.editable = parseInt(this.editData.editable);
        var myArr = findParent(this.optiones, this.editData.parentId);
        this.editPlac = myArr;
      });
      this.edit = true;
    },
    // 修改
    editDicData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.selects.length == "") {
            this.editData.parentId = this.editPlac.id;
          } else if (this.selects.length !== "") {
            this.editData.parentId = this.selects[this.selects.length - 1];
          }
          editDic(this.editData).then(res => {
            this.edit = false;
            this.getData();
            this.getTree();
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
    // 删除
    deleteDicData() {
      deleteDic(this.editData.id).then(res => {
        this.delet = false;
        this.getData();
        this.getTree();
        this.radio = "";
      });
    },
    // 查询
    getAllList() {
      this.listQuery.parentId = "";
      this.listQuery.pageNum = 1;
      this.getData();
      this.radio = "";
    },
    // 树节点
    handleNodeClick(node) {
      this.listQuery.parentId = "";
      this.listQuery.parentId = node.id;
      this.getData();
      this.radio = "";
    },
    showRow(row) {
      // 赋值给radio
      this.radio = this.tableData.indexOf(row);
      this.editData.id = row.id;
    },
    // 判断按钮是否隐藏
    Concealment() {
      userMenu({
        menuType: 1,
        parentId: this.$route.query.id
      }).then(res => {
        var concea = res.data.data;
        concea.map(item => {
          if (item.permission == "sys.dic.add") {
            this.power.add = item;
          } else if (item.permission == "sys.dic.edit") {
            this.power.edit = item;
          } else if (item.permission == "sys.dic.delete") {
            this.power.delet = item;
          }
        });
      });
    }
  },
  mounted() {
    this.getData();
    this.getTree();
    this.Concealment();
    this.getdicList();
  }
};
</script>
<style lang="less">
#zidian {
  .content {
    position: absolute;
    top: 90px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
  .plac {
    input::-webkit-input-placeholder {
      color: #606266;
    }
    input::-moz-placeholder {
      color: #606266;
    }
    input:-moz-placeholder {
      color: #606266;
    }
    input:-ms-input-placeholder {
      color: #606266;
    }
  }
  .ss {
    width: 50%;
    margin-right: 20px;
  }
  .el-select {
    width: 100%;
  }
  .pull-left {
    width: 220px;
    height: 100%;
    border-right: 1px solid #bfbfbf;
    box-sizing: border-box;
    position: relative;
    z-index: 9;
  }
  .scrollBar-right {
    overflow: hidden;
    padding-left: 220px;
    left: 15px;
    right: 0px;
    bottom: 50px;
    .el-button {
      padding-left: 42px;
      padding-right: 42px;
      margin-top: 28px;
      margin-left: 100px;
    }
    .el-input,
    .el-textarea {
      width: 340px;
    }
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
    height: 400px;
    overflow-y: auto;
  }
  .delete .el-dialog__body {
    height: 50px;
  }
  .pagination {
    position: absolute;
    bottom: 0px;
    right: 0px;
  }
}
</style>
