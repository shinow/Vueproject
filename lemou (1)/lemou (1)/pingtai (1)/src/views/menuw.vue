<template>
  <div id="hello">
      <el-card shadow="never" body-style="padding:0px">
        <el-row slot="header">
          <el-col :span="17">
            <el-button size="small" type="success" :icon="power.add.iconcls" v-if="power.add.permission"  @click="add = true">{{power.add.menuName}}</el-button>
            <el-button size="small" type="success" :icon="power.edit.iconcls" v-if="power.edit.permission" @click="editMessage()">{{power.edit.menuName}}</el-button>
            <el-button size="small" type="danger" :icon="power.delet.iconcls" v-if="power.delet.permission" @click="deletMessage()">{{power.delet.menuName}}</el-button>
          </el-col>
          <el-col :span="7" class="pull-right">
            <el-button class="pull-right" :span="2" size="small" type="primary" icon="iconfont icon-sousuo" @click="getAllList()"></el-button>
            <el-input class="pull-right ss" size="small" placeholder="请输入菜单名称进行搜索" v-model="listQuery.menuName" @change="getAllList"></el-input>
          </el-col>
        </el-row>
      </el-card>
      <div class="content">
        <div class="pull-left">
          <scrollBar class="scrollBar-left">
            <el-tree v-loading="load" :data="data" :props="defaultProps" accordion @node-click="handleNodeClick"></el-tree>
          </scrollBar>
        </div>
        <scrollBar class="scrollBar-right">
          <el-table
            :stripe="true"
            v-loading="loading"
            @row-click="showRow"
            highlight-current-row
            :data="tableData"
            border style="width: 100%">
            <el-table-column label="选中" width="55">
              <template slot-scope="scope">
                <el-radio v-model="radio" :label="scope.$index">&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column type="index" :index="num" label="序号" width="60"></el-table-column>
            <el-table-column show-overflow-tooltip prop="id" label="菜单编号" width="180"></el-table-column>
            <el-table-column show-overflow-tooltip prop="menuName" label="菜单名称"></el-table-column>
            <el-table-column show-overflow-tooltip prop="iconcls" label="图标">
              <template slot-scope="scope">
                <i :class="scope.row.iconcls"></i>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="request" label="请求地址"></el-table-column>
          </el-table>
        </scrollBar>
        <pagination class="pagination" :listQuery='listQuery' :total="total" @getTableData="getData"></pagination>
      </div>
      <!--新增-->
      <el-row>
        <el-dialog title="新增" :visible.sync="add" width="400px" left>
          <el-form ref="addData" :model="addData" :rules="addRules">
            <span style="color: red">*号为必填项</span>
            <el-form-item label="菜单类型" prop="type">
              <el-select size="small" v-model="addData.type" filterable placeholder="请选择">
                <el-option v-for="item in types" :key="item.code" :label="item.name" :value="item.code"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上级菜单" prop="select">
              <el-cascader
                size="small"
                :props="props"
                placeholder="可搜索"
                :options="options"
                v-model="addData.select"
                filterable
                change-on-select
                style="width:100%">
              </el-cascader>
            </el-form-item>
            <el-form-item label="菜单名称" prop="menuName">
              <el-input size="small" v-model="addData.menuName" placeholder="请输入菜单名称"></el-input>
            </el-form-item>
            <el-form-item label="菜单功能" prop="menuType">
              <el-select size="small" v-model="addData.menuType"  placeholder="请选择">
                <el-option v-for="item in menuTypes" :key="item.code" :label="item.name" :value="item.code"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="权限标识" prop="permission">
              <el-input size="small" v-model="addData.permission" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="请求地址" prop="request">
              <el-input size="small" v-model="addData.request" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="排序号" prop="sortNo">
              <el-input size="small" v-model="addData.sortNo" placeholder=""></el-input>
            </el-form-item>
            <span>图标</span>
            <iconDrop v-model="icon"></iconDrop>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addMessage('addData')">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="修改" :visible.sync="edit" width="400px" left>
          <el-form ref="editData" :model="editData" :rules="editRules">
            <span style="color: red">*号为必填项</span>
            <el-form-item label="选择系统" prop="type">
              <el-select size="small" v-model="editData.type" filterable placeholder="请选择">
                <el-option v-for="item in types" :key="item.code" :label="item.name" :value="item.code"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上级菜单" prop="editSelect">
              <el-cascader
                size="small"
                class="plac"
                :props="propss"
                :placeholder="editPlac.label"
                :options="options"
                v-model="editSelect"
                filterable
                change-on-select
                style="width:100%">
              </el-cascader>
            </el-form-item>
            <el-form-item label="菜单名称" prop="menuName">
              <el-input size="small" v-model="editData.menuName" placeholder="请输入菜单名称"></el-input>
            </el-form-item>
            <el-form-item label="菜单类型" prop="menuType">
              <el-select size="small" v-model="editData.menuType"  placeholder="请选择">
                <el-option v-for="item in menuTypes" :key="item.code" :label="item.name" :value="item.code"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="权限标识" prop="permission">
             <el-input size="small" v-model="editData.permission" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="请求地址" prop="request">
              <el-input size="small" v-model="editData.request" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="排序号" prop="sortNo">
              <el-input size="small" v-model="editData.sortNo" placeholder=""></el-input>
            </el-form-item>
            <span>图标</span>
            <iconDrop v-model="icons"></iconDrop>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="editList('editData')">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog class="delete" title="删除" :visible.sync="delet" width="20%" left>
          <span>
                        您确定要删除此信息？
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="deleteData()">确 定</el-button>
          </span>
        </el-dialog>
      </el-row>
  </div>
</template>

<script>
import {tableData, menuTree, addMenu, detailData, deleteMenu, editMenu, userMenu, dicList} from '@/api'
import pagination from '@/components/pagination'
import scrollBar from '@/components/scrollBarContainner'
import iconDrop from '@/components/iconDrop'
import {findParent} from '@/util/util'
export default {
  name: 'HelloWorld',
  components: {
    pagination,
    scrollBar,
    iconDrop
  },
  data () {
    return {
      // 表格数据
      tableData: [],
      radio: '',
      loading: false,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        parentId: '',
        menuName: ''
      },
      total: null,
      // 树数据
      data: [],
      load: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 新增
      icon: '',
      add: false,
      addData: {},
      types: [],
      parentIds: [],
      menuTypes: [],
      // 修改
      icons: '',
      edit: false,
      editData: {},
      editPlac: {
        id: '',
        label: ''
      },
      // 删除
      delet: false,
      // 判断按钮是否隐藏
      power: {
        add: false,
        edit: false,
        delet: false
      },
      // 上级菜单选择
      options: [],
      props: {
        value: 'id',
        label: 'label',
        children: 'children'
      },
      propss: {
        value: 'id',
        label: 'label',
        children: 'children'
      },
      select: [],
      editSelect: [],
      iconcls: '',
      // 表单验证
      addRules: {
        type: [
          {required: true, message: '系统不可为空', trigger: 'change'}
        ],
        menuName: [
          {required: true, message: '菜单名称不可为空', trigger: 'blur'},
          { max: 10, message: '最多10个字符', trigger: 'blur' }
        ],
        menuType: [{required: true, message: '类型不可为空', trigger: 'change'}],
        select: [
          { required: true, message: '上级菜单不可为空', trigger: ['change', 'blur'] }
        ]
      },
      editRules: {
        type: [
          {required: true, message: '系统不可为空', trigger: 'change'}
        ],
        menuName: [
          {required: true, message: '菜单名称不可为空', trigger: 'blur'},
          { max: 10, message: '最多10个字符', trigger: 'change' }
        ],
        menuType: [{required: true, message: '类型不可为空', trigger: 'change'}]
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
    getData () {
      this.loading = true
      tableData(this.listQuery).then((res) => {
        if (res.data.httpCode == 0) {
          this.tableData = res.data.data
          this.total = parseInt(res.data.total)
          this.loading = false
        } else {
          this.$message({
            message: res.data.msg,
            type: 'danger'
          })
          this.loading = false
        }
      })
    },
    getTree () {
      // 菜单树
      this.load = true
      menuTree().then((res) => {
        if (res.data.data != null) {
          this.data = res.data.data.vOSysMenuTree
          this.load = false
          // this.types = this.data
          // this.types.map((item, index) => {
          //   let types = {
          //     '平台菜单': 0,
          //     '公司菜单': 1,
          //     '小区菜单': 2
          //   }
          //   item.type = types[item.label]
          // })
        }
      })
    },
    // 角色下拉菜单
    getMenuSelect () {
      menuTree().then((res) => {
        if (res.data.data != null) {
          this.options = res.data.data.vOSysMenuTree
        }
      })
    },
    // 新增/修改 菜单类型
    getType () {
      dicList({child: true, type: 'MENUTYPE'}).then((res) => {
        this.types = res.data.data
      })
    },
    // 新增/修改 菜单功能
    getFun () {
      dicList({child: true, type: 'MENUSTYLE'}).then((res) => {
        console.log(res)
        this.menuTypes = res.data.data
      })
    },
    // 新增接口
    addMessage (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addData.iconcls = 'iconfont icon-' + this.icon
          this.addData.parentId = this.addData.select[this.addData.select.length - 1]
          addMenu(this.addData).then((res) => {
            this.data = res.data.data
            this.add = false
            this.getTree()
            this.getData()
            this.reloadMenu()
            this.radio = ''
            this.addData = {}
            this.select = []
            this.getMenuSelect()
          })
        }
      })
    },
    reloadMenu () {
      this.$store.dispatch('GetMenuList')
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
      detailData(this.editData.id).then((res) => {
        this.editData = res.data.data
        this.editData.type = this.editData.type
        var myArr = findParent(this.options, this.editData.parentId)
        this.editPlac = myArr
      })
      this.edit = true
    },
    // 查询
    getAllList () {
      this.listQuery.parentId = ''
      this.listQuery.pageNum = 1
      this.getData()
      this.radio = ''
    },
    /**
     * 修改
     * fly
     */
    editList (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editData.iconcls = 'iconfont icon-' + this.icons
          if (this.editSelect.length == '') {
            this.editData.parentId = this.editPlac.id
          } else if (this.editSelect.length !== '') {
            this.editData.parentId = this.editSelect[this.editSelect.length - 1]
          }
          editMenu(this.editData).then((res) => {
            this.edit = false
            this.getTree()
            this.getData()
            this.radio = ''
            this.Concealment()
            this.getMenuSelect()
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
      this.delet = true
    },
    deleteData () {
      deleteMenu(this.editData.id).then((res) => {
        this.delet = false
        this.getTree()
        this.getData()
        this.radio = ''
        this.getMenuSelect()
      })
    },
    // 树节点
    handleNodeClick (data) {
      this.listQuery.parentId = data.id
      this.getData()
      this.radio = ''
    },
    showRow (row) {
      // 赋值给radio
      var reString = row.iconcls.replace('iconfont icon-', '')
      this.icons = reString
      this.editSelect = []
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
          if (item.permission == 'sys.menu.add') {
            this.power.add = item
          } else if (item.permission == 'sys.menu.edit') {
            this.power.edit = item
          } else if (item.permission == 'sys.menu.delete') {
            this.power.delet = item
          }
        })
      })
    }
  },
  mounted () {
    this.getData()
    this.getTree()
    this.getMenuSelect()
    this.Concealment()
    this.getType()
    this.getFun()
  }
}
</script>
<style lang="less">
#hello{
  .content{
    position: absolute;
    top: 90px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
  .plac{
    input::-webkit-input-placeholder{
      color: #606266;
    }
    input::-moz-placeholder{
      color:#606266;
    }
    input:-moz-placeholder{
      color:#606266;
    }
    input:-ms-input-placeholder{
      color:#606266;
    }
  }
  .ss{
    width: 50%;
    margin-right: 20px
  }
  .pull-left{
    width: 220px;
    height: 100%;
    border-right: 1px solid #bfbfbf;
    box-sizing: border-box;
    position: relative;
    z-index: 9;
  }
  .scrollBar-right{
    overflow: hidden;
    padding-left: 220px;
    left: 15px;
    right: 0px;
    bottom: 50px;
    .el-button{
      padding-left: 42px;
      padding-right: 42px;
      margin-top: 28px;
      margin-left: 100px
    }
    .el-input, .el-textarea{
      width: 340px
    }
  }
  .el-select{
    width: 100%;
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
    height: 400px;
    overflow-y: auto
  }
  .delete .el-dialog__body{
    height: 50px;
  }
  .pagination{
    position: absolute;
    bottom: 0px;
    right: 0px
  }
  .el-table .iconfont{
    font-size: 16px
  }
}
</style>
