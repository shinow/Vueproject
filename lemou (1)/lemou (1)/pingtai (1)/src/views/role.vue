<template>
  <div id="role">
    <el-card shadow="never" body-style="padding:0px">
      <el-row slot="header">
        <el-col :span="17">
          <el-button size="small" type="success" :icon="power.add.iconcls" v-if="power.add.permission"  @click="add = true">{{power.add.menuName}}</el-button>
          <el-button size="small" type="success" :icon="power.edit.iconcls" v-if="power.edit.permission" @click="editMessage()">{{power.edit.menuName}}</el-button>
          <el-button size="small" type="danger" :icon="power.delet.iconcls" v-if="power.delet.permission" @click="deletMessage()">{{power.delet.menuName}}</el-button>
          <el-button size="small" type="success" :icon="power.distribution.iconcls" v-if="power.distribution.permission" @click="permissionsMe()">{{power.distribution.menuName}}</el-button>
          <el-button size="small" type="success" @click="sysxinn()">新增角色</el-button>
          <el-button size="small" type="success" @click="sysguan()">新增管理员</el-button>
        </el-col>
        <!-- <el-col :span="7" class="pull-right">
          <el-button class="pull-right" size="small" type="primary" icon="el-icon-search" @click="getAllList()"></el-button>
          <el-input class="pull-right ss" size="small" placeholder="请输入角色名进行搜索" v-model="listQuery.roleName" @change="getAllList"></el-input>
        </el-col> -->
      </el-row>
    </el-card>
    <div>
      <scrollBar class="scrollBar">
        <el-table
          v-loading="loading"
          @row-click="showRow"
          :stripe="true"
          highlight-current-row
          :data="tableData"
          border style="width: 100%">
          <el-table-column label="选中" width="55">
            <template slot-scope="scope">
              <el-radio v-model="radio" :label="scope.$index">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column type="index" :index="num" label="序号" width="60"></el-table-column>
          <el-table-column show-overflow-tooltip prop="roleName" label="角色" width="180"></el-table-column>
          <el-table-column show-overflow-tooltip prop="id" label="创建人" width="180"></el-table-column>
          <el-table-column show-overflow-tooltip prop="remark" label="备注"></el-table-column>
          <el-table-column show-overflow-tooltip prop="createTime" label="创建时间"></el-table-column>
        </el-table>
      </scrollBar>
      <pagination class="pagination" :listQuery='listQuery' :total="total" @getTableData="getData"></pagination>
    </div>
      <!--新增-->
    <el-row>
      <el-dialog title="新增" :visible.sync="add" width="400px" left>
        <el-form ref="addData" :model="addData" :rules="roleRules">
          <span style="color: red">*号为必填项</span>
          <el-form-item label="角色" prop="roleName">
            <el-input size="small" v-model="addData.roleName" placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" maxlength="50" size="small" v-model="addData.remark" placeholder=""></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addRoleList('addData')">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="修改" :visible.sync="edit" width="400px" left>
        <el-form ref="editData" :model="editData" :rules="editRules">
          <span style="color: red">*号为必填项</span>
          <el-form-item label="角色" prop="roleName">
            <el-input size="small" v-model="editData.roleName" placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" maxlength="50" size="small" v-model="editData.remark" placeholder=""></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="editRoleList('editData')">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="删除" :visible.sync="delet" width="300px" left>
        <span>
                      您确定要删除此信息？
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="deleteRoleList()">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="权限分配" :visible.sync="permissions" width="400px" left>
        <span class="qxfp">
          <el-tree ref="allCity" v-loading="load" :check-strictly="false" :default-expanded-keys="idChecked" :default-checked-keys="idChecked" node-key="id" show-checkbox :data="data" :props="defaultProps" accordion @check="getCurrentNode" @node-click="getCurrentNode"></el-tree>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" :loading="yes" @click="updatelRoleList()">确 定</el-button>
        </span>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
import {roleData, addRole, detailRole, editlRole, deletelRole, menuTree, updatelRole, userMenu, ifUse} from '@/api'
import pagination from '@/components/pagination'
import scrollBar from '@/components/scrollBarContainner'
import {findParent} from '@/util/util'
export default {
  name: 'HelloWorld',
  components: {
    pagination,
    scrollBar
  },
  data () {
    return {
      yes: false,
      // 表格数据
      tableData: [],
      radio: '',
      loading: false,
      load: false,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        roleName: ''
      },
      total: null,
      // 树数据
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 新增
      add: false,
      addData: {},
      // 修改
      edit: false,
      editData: {},
      // 删除
      delet: false,
      // 分配权限
      permissions: false,
      menuId: [],
      idChecked: [],
      // 判断按钮是否隐藏
      power: {
        add: false,
        edit: false,
        delet: false,
        distribution: false
      },
      // 表单验证
      roleRules: {
        roleName: [
          {required: true, message: '角色不可为空', trigger: 'blur'},
          {max: 10, message: '最多10个字符', trigger: ['blur', 'change']}
        ],
        remark: [
          {max: 100, message: '最多100个字符', trigger: ['blur', 'change']}
        ]
      },
      editRules: {
        roleName: [
          {required: true, message: '角色不可为空', trigger: 'blur'},
          {max: 10, message: '最多10个字符', trigger: ['blur', 'change']}
        ]
      }
    }
  },
  computed: {
    num (val) {
      const {pageNum, pageSize} = this.listQuery
      return (pageNum - 1) * pageSize + 1
    }
  },
  methods: {
    sysxinn(){
      this.$router.push({
        name:"sysxinn"
      })
    },
    sysguan(){
      this.$router.push({
        name:"sysguan"
      })
    },
    getData () {
      this.loading = true
      roleData(this.listQuery).then((res) => {
        this.tableData = res.data.data
        this.total = parseInt(res.data.total)
        this.loading = false
      })
    },
    // 添加
    addRoleList (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addRole(this.addData).then((res) => {
            this.data = res.data.data
            this.add = false
            this.getData()
            this.radio = ''
            this.addData = {}
          })
        }
      })
    },
    // 修改判断提示
    editMessage () {
      if (!(this.radio !== '')) {
        this.$message({
          showClose: true,
          message: '请选择一条需要修改的数据',
          type: 'warning'
        })
        return false
      }
      // detailRole(this.editData.id).then((res) => {
      //   this.editData = res.data.data
      // })
      this.edit = true
    },
    editRoleList (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editlRole(this.editData).then((res) => {
            this.edit = false
            this.getData()
            this.radio = ''
          })
        }
      })
    },
    // 删除判断提示
    deletMessage () {
      if (!(this.radio !== '')) {
        this.$message({
          showClose: true,
          message: '请选择一条要删除的数据',
          type: 'warning'
        })
        return false
      }
      ifUse(this.editData.id).then((res) => {
        if (res.data.data > 0) {
          this.$message({
            showClose: true,
            message: '此角色正在使用，不可删除！',
            type: 'warning'
          })
        } else {
          this.delet = true
        }
      })
    },
    deleteRoleList () {
      deletelRole(this.editData.id).then((res) => {
        this.delet = false
        this.getData()
        this.radio = ''
      })
    },
    // 分配权限提示
    permissionsMe () {
      if (!(this.radio !== '')) {
        this.$message({
          showClose: true,
          message: '请选择',
          type: 'warning'
        })
        return false
      }
      this.load = true
      var ids = '"' + this.editData.id + '"'
      this.idChecked = []
      menuTree(ids).then((res) => {
        this.data = res.data.data.vOSysMenuTree
        const rolId = res.data.data.idChecked || []
        rolId.map((item, index) => {
          if (findParent(this.data, item).children === null) {
            this.idChecked.push(item)
          }
        })
        if (this.idChecked !== null) {
          this.idChecked.map((item) => {
            item = item.toString()
          })
        }
        this.load = false
      })
      this.permissions = true
    },
    updatelRoleList () {
      this.getCurrentNode()
      this.yes = true
      updatelRole({
        menuIds: this.menuId,
        roleId: this.editData.id
      }).then((res) => {
        this.yes = false
        this.permissions = false
        this.getData()
        this.radio = ''
      })
    },
    // 查询
    getAllList () {
      this.listQuery.pageNum = 1
      this.getData()
      this.radio = ''
    },
    // 树节点
    getCurrentNode (data) {
      this.menuId = []
      var menusId = this.menuId.concat(this.$refs.allCity.getHalfCheckedNodes(), this.$refs.allCity.getCheckedNodes())
      menusId.map((item) => {
        this.menuId.push(item.id)
      })
    },
    showRow (row) {
      // 赋值给radio
      console.log(row)
      this.radio = this.tableData.indexOf(row)
      this.editData.id = row.id
    },
    // 判断按钮是否隐藏
    Concealment () {
      userMenu({
        menuType: 1,
        parentId: this.$route.query.id
      }).then((res) => {
        var concea = res.data.data
        concea.map((item) => {
          if (item.permission == 'sys.role.add') {
            this.power.add = item
          } else if (item.permission == 'sys.role.edit') {
            this.power.edit = item
          } else if (item.permission == 'sys.role.delete') {
            this.power.delet = item
          } else if (item.permission == 'sys.role.updateRoleMenu') {
            this.power.distribution = item
          }
        })
      })
    }
  },
  mounted () {
    this.getData()
    this.Concealment()
  }
}
</script>
<style lang="less">
#role{
  .ss{
    width: 50%;
    margin-right: 20px
  }
  .el-select{
    width: 100%;
  }
  .scrollBar{
    top: 90px;
    left: 0px;
    right: 0px;
    bottom: 50px;
  }
  .pagination{
    position: absolute;
    bottom: 0px;
    right: 0px
  }
  .el-dialog__footer{
    background: #f3f3f3;
    padding: 10px 10px 10px;
    text-align: center;
  }
  .el-dialog__header{
    border-bottom: 1px solid #dcdcdc;
    padding: 10px 20px 10px;
    .el-dialog__title{
      color: #367be2;
    }
  }
  .el-dialog__body{
    padding: 10px 20px;
    .qxfp .el-tree{
      height: 200px;
      overflow: auto;
    }
  }
}
</style>
