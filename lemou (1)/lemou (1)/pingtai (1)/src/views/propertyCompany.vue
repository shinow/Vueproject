<template>
  <div id="wuye">
    <el-card shadow="never" body-style="padding:0px">
        <el-row slot="header">
          <el-col :span="17">
            <el-button :span="2" size="small" type="primary" :icon="power.add.iconcls" :disabled="disableds" v-if="power.add.permission"  @click="addMessage()">{{power.add.menuName}}</el-button>
            <el-button :span="2" size="small" type="primary" :icon="power.edit.iconcls" :disabled="permiss" @click="editMessage()" v-if="power.edit.permission">{{power.edit.menuName}}</el-button>
            <el-button :span="2" size="small" type="primary" :icon="power.enable.iconcls" :disabled="agree" @click="enableMessage()" v-if="power.enable.permission">{{power.enable.menuName}}</el-button>
            <el-button :span="2" size="small" type="danger" :icon="power.discontInuation.iconcls" :disabled="noagree" @click="discontInuation" v-if="power.discontInuation.permission">{{power.discontInuation.menuName}}</el-button>
            <el-button :span="2" size="small" type="primary" icon="iconfont icon-xiangqing" @click="deletMessage()">查看详情</el-button>
          </el-col>
          <el-col :span="7" class="pull-right">
            <el-button class="pull-right" :span="2" size="small" type="primary" icon="el-icon-search" @click="getAllList"></el-button>
            <el-input class="pull-right ss" size="small" v-model="listQuery.name" placeholder="请输入公司名称进行搜索" @change="getAllList"></el-input>
          </el-col>
        </el-row>
      </el-card>
      <div class="content">
        <div class="pull-left">
          <scrollBar class="scrollBar-left">
            <el-tree v-loading="load" :data="treeData" :props="defaultProps" node-key="id" accordion @node-click="getCurrentNode"></el-tree>
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
            <el-table-column show-overflow-tooltip prop="userName" label="联系人" width="180"></el-table-column>
            <el-table-column show-overflow-tooltip prop="phone" label="联系电话" width="180"></el-table-column>
            <el-table-column show-overflow-tooltip prop="name" label="公司名称" width="180"></el-table-column>
            <el-table-column show-overflow-tooltip prop="legalPerson" label="公司法人"></el-table-column>
            <el-table-column show-overflow-tooltip prop="region" label="区域"></el-table-column>
            <el-table-column show-overflow-tooltip prop="isChecked" :formatter="formaRole" label="审核状态"></el-table-column>
            <el-table-column show-overflow-tooltip prop="createName" label="审核人"></el-table-column>
            <el-table-column show-overflow-tooltip prop="isLocked" label="账号状态">
              <template slot-scope="scope">
                {{scope.row.isLocked? '停用' : '启用'}}
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="updateTime" label="提交审核时间"></el-table-column>
            <el-table-column show-overflow-tooltip prop="remark" label="备注"></el-table-column>
          </el-table>
        </scrollBar>
        <pagination class="pagination" :listQuery='listQuery' :total="total" @getTableData="getData"></pagination>
      </div>
      <!--弹框-->
      <el-row>
        <!--审核-->
        <el-dialog title="审核" :visible.sync="add" width="60%" left>
          <el-form ref="check" :model="check" :rules="checkRules">
            <el-row>
              <el-col :span="9" :offset="8">
                <h1 class="iconfont icon-xiangqing" style="color: #367be3;width: 100%;">请审核人员完善部分物业公司信息(以下*号为必填项)</h1>
              </el-col>
            </el-row>
            <el-row class="shen" :gutter="20">
                <el-col :span="8" style="display: flex;align-items: center;justify-content: center;">
                  <div style="width:100%;height:100%"><img :src="detail.licenseImage ? detail.licenseImage:require('../assets/img/loading.gif')" :onerror="errorImg01" :class="{'active':flag}" @click="bigImg()"/></div>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="公司名称" prop="name">
                    <el-input v-model="check.name" size="small" placeholder="请输入物业公司名称"></el-input>
                  </el-form-item>
                  <el-form-item label="申请账号" prop="phone">
                    <el-input size="small" v-model="check.phone" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="联系人" prop="userName">
                    <el-input v-model="check.userName" size="small" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="区域" prop="selectdOpEdit">
                    <el-cascader
                      :options="options"
                      :props="props"
                      filterable
                      v-model="check.selectdOpEdit"
                      change-on-select
                      size="small"
                      style="width: 100%">
                    </el-cascader>
                  </el-form-item>
                  <el-form-item label="详细地址" prop="address">
                    <el-input v-model="check.address" style="margin-top: 5px;" size="small" placeholder="请输入详细地址"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="统一社会信用代码/纳税人识别号" title="统一社会信用代码/纳税人识别号" prop="licenseCode">
                  <el-input v-model="check.licenseCode" size="small" placeholder="请输入纳税人识别号"></el-input>
                </el-form-item>
                <el-form-item label="截止时间" prop="limitTime">
                  <el-date-picker
                    size="small"
                    v-model="check.limitTime"
                    type="datetime"
                    style="width: 100%;"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="法人" prop="legalPerson">
                  <el-input v-model="check.legalPerson" size="small" placeholder="请输入法人姓名"></el-input>
                </el-form-item>
                <el-form-item label="法人身份证号" prop="legalPersonCode">
                  <el-input size="small" v-model="check.legalPersonCode" placeholder="请输入法人身份证号"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-dialog class="fall" title="请填写该物业公司审核失败原因" :visible.sync="adds" width="30%" append-to-body left>
            <el-form ref="noCheck" :model="noCheck" :rules="nocheckRules">
              <el-form-item label="请填写审核失败原因" prop="remark">
                <el-input type="textarea" maxlength="50" v-model="noCheck.remark" size="middle" placeholder="请填写审核失败原因"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="noCheckComData('noCheck')">确 定</el-button>
            </span>
          </el-dialog>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="checkComData('check')">通 过</el-button>
            <el-button type="primary" @click="adds = true">不 通 过</el-button>
          </span>
        </el-dialog>
        <!--附加权限-->
        <el-dialog class="fjqx" title="附加权限" :visible.sync="edit" width="400px" left>
          <span>
            <el-tree ref="allCity" v-loading="loading" :default-expanded-keys="idChecked" :default-checked-keys="idChecked" node-key="id" show-checkbox :data="treeMenu" :props="defaultProps" accordion  @check="handleNodeClick" @node-click="handleNodeClick"></el-tree>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" :loading="loads" @click="updateMenu">确 定</el-button>
          </span>
        </el-dialog>
        <!--查看详情-->
        <el-dialog title="详情" :visible.sync="delet" width="60%" left>
          <el-form ref="form" :model="detail">
            <el-row>
              <el-col :span="9" :offset="8">
                <h1 class="el-icon-circle-plus-outline" style="color: #367be3;width: 100%;">物业公司详情</h1>
              </el-col>
            </el-row>
            <el-row class="shen" :gutter="20">
                <el-col :span="8" style="display: flex;align-items: center;justify-content: center;">
                  <span><img :src="detail.licenseImage ? detail.licenseImage:require('../assets/img/loading.gif')" :onerror="errorImg01" :class="{'active':flag}" @click="bigImg()"/></span>
                </el-col>
                <el-col :span="8">
                  <span>公司名称</span>
                  <el-input v-model="detail.name" size="small" placeholder="请输入物业公司名称" :disabled="true"></el-input>
                  <span>申请账号</span>
                  <el-input size="small" v-model="check.phone" placeholder="13216549874" :disabled="true"></el-input>
                  <span>联系人</span>
                  <el-input v-model="check.userName" size="small" placeholder="张三" :disabled="true"></el-input>
                  <span>区域</span><br />
                  <el-cascader
                    :disabled="true"
                    :options="options"
                    :props="props"
                    filterable
                    v-model="selectdOp"
                    change-on-select
                    size="small"
                    style="width: 100%">
                  </el-cascader>
                  <span>详细地址</span>
                  <el-input v-model="detail.address" style="margin-top: 5px;" size="small" placeholder="请输入详细地址" :disabled="true"></el-input>
                </el-col>
                <el-col :span="8">
                <p style="white-space:nowrap;text-overflow: ellipsis;overflow: hidden;width:100%" title="统一社会信用代码/纳税人识别号">统一社会信用代码/纳税人识别号</p>
                <el-input v-model="detail.licenseCode" size="small" placeholder="请输入纳税人识别号" :disabled="true"></el-input>
                <span>截止时间</span>
                <el-date-picker
                  :disabled="true"
                  size="small"
                  v-model="detail.limitTime"
                  type="datetime"
                  style="width: 100%;"
                  placeholder="选择日期时间">
                </el-date-picker>
                <span>法人</span>
                <el-input v-model="detail.legalPerson" size="small" placeholder="请输入法人姓名" :disabled="true"></el-input>
                <span>法人身份证号</span>
                <el-input v-model="detail.legalPersonCode" size="small" placeholder="请输入法人身份证号" :disabled="true"></el-input>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="delet = false">关 闭</el-button>
          </span>
        </el-dialog>
        <el-dialog title="启用" :visible.sync="enable" width="20%" left>
          <span>
                        您确定要启用该物业平台账号吗？
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="openComData">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="停用" :visible.sync="discontinuation" width="20%" left>
          <span>
                        您确定要停用该物业平台账号吗？
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="closeComData">确 定</el-button>
          </span>
        </el-dialog>
      </el-row>
  </div>
</template>

<script>
/* eslint-disable */
import {companyData, companyTree, detailCom, openCom, closeCom, checkCom, menuChec, updateMenuChec, userMenu, getUserTree} from '@/api'
import pagination from '@/components/pagination'
import scrollBar from '@/components/scrollBarContainner'
import {validatename} from '@/util/validate'
import cityData from '@/assets/city-data'
import {findParent, deepQuery, deleteNullRegion} from '@/util/util'
export default {
  name: 'HelloWorld',
  components: {
    pagination,
    scrollBar
  },
  data () {
    var Ancodevalue = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'))
      } else {
        const reg = /^[0-9A-Z]+$/
        if ((value.length != 18) || (reg.test(value) == false)) {
          return callback(new Error('不是有效的统一社会信用编码'))
        } else {
          var Ancode// 信用代码/税号的每一个值
          var Ancodevalue// 信用代码/税号每一个值的权重
          var total = 0
          var weightedfactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28]// 加权因子
          var str = '0123456789ABCDEFGHJKLMNPQRTUWXY'
          // 不用I、O、S、V、Z
          for (var i = 0; i < value.length - 1; i++) {
            Ancode = value.substring(i, i + 1)
            Ancodevalue = str.indexOf(Ancode)
            total = total + Ancodevalue * weightedfactors[i]
            // 权重与加权因子相乘之和
          }
          var logiccheckcode = 31 - total % 31
          if (logiccheckcode == 31) {
            logiccheckcode = 0
          }
          var Str = '0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y'
          var Array_Str = Str.split(',')
          logiccheckcode = Array_Str[logiccheckcode]
          var checkcode = value.substring(17, 18)
          if (logiccheckcode != checkcode) {
            return callback(new Error('不是有效的统一社会信用编码'))
            // alert("不是有效的统一社会信用编码！");
          } else {
            callback()
          }
        }
      }
    }
    const isvalidatename = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('姓名不能为空'))
      } else if (!validatename(value)) {
        callback(new Error('请输入正确的姓名'))
      } else {
        callback()
      }
    }
    const isCardid = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'))
      } else {
        const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的身份证号'))
        }
      }
    }
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不可为空'))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    return {
      // 表格数据
      tableData: [],
      radio: '',
      loading: false,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        name: '',
        region: ''
      },
      total: null,
      // 树数据
      treeData: [],
      load: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 审核
      add: false,
      adds: false,
      disableds: false,
      // 通过
      check: {
        name: '',
        id: '',
        userName: '',
        phone: '',
        isChecked: 1,
        legalPerson: '',
        legalPersonCode: '',
        licenseCode: '',
        limitTime: '',
        region: '',
        address: '',
        licenseImage: '',
        selectdOpEdit: []
      },
      // 不通过
      noCheck: {
        id: '',
        isChecked: 2,
        remark: ''
      },

      // 附加权限
      edit: false,
      update: {
        companyId: '',
        menuIds: []
      },
      idChecked: [],
      rolId: [],
      // 查看详情
      delet: false,
      treeMenu: [],
      codes: [],
      // 启用
      enable: false,
      agree: false,
      noagree: false,
      permiss: false,
      // 停用
      discontinuation: false,
      // 获取实体
      detail: {
        name: '',
        id: '',
        isChecked: 1,
        legalPerson: '',
        legalPersonCode: '',
        licenseCode: '',
        limitTime: '',
        region: '',
        address: '',
        licenseImage: ''
      },
      errorImg01: 'this.src="' + require('../assets/img/loading.gif') + '"',
      // 选择器
      options: [],
      selectdOp: [],
      selectdOpEdit: [],
      props: {
        value: 'id',
        label: 'label',
        children: 'children'
      },
      value: '',
      // 判断按钮是否隐藏
      power: {
        add: false,
        edit: false,
        enable: false,
        discontInuation: false
      },
      checkRules: {
        name: [
          {required: true, message: '不可为空', trigger: 'change'},
          {max: 20, message: '不超过10个字符', trigger: 'change'}
        ],
        selectdOpEdit: [{required: true, message: '不可为空', trigger: 'change'},],
        licenseCode: [
          {required: true, trigger: ['blur', 'change'], validator: Ancodevalue}
        ],
        limitTime: [
          {required: true, message: '不可为空', trigger: ['blur', 'change']}
        ],
        legalPerson: [
          {required: true, trigger: 'blur', validator: isvalidatename}
        ],
        legalPersonCode: [
          // {trigger: ['blur', 'change'], validator: isCardid}
        ],
        phone: [
          {required: true, trigger: 'change', validator: checkPhone}
        ],
        userName: [
          {required: true, trigger: 'change', validator: isvalidatename}
        ]
      },
      nocheckRules: {
        remark: [
          {required: true, message: '不可为空', trigger: 'blur'}
        ]
      },
      loads: false,
      // 图片放大缩小
      flag: false
    }
  },
  methods: {
    getData () {
      this.loading = true
      companyData(this.listQuery).then((res) => {
        this.tableData = res.data.data
        this.total = parseInt(res.data.total)
        this.tableData.map((item) => {
          item.isLocked = parseInt(item.isLocked)
          if (item.region.length < 4) {
            let node = deepQuery(cityData, item.region)
            if (node != null){
              item.region = node.label
            }
          } else if (item.region.length > 4) {
            var provincial = item.region.slice(0, 2)
            let node = deepQuery(cityData, provincial)
            if (node != null){
              var provincialLeval = node.label
            }
            var district = item.region.slice(0, 4)
            let node1 = deepQuery(cityData, district)
            if (node1 != null){
              var districtLeval = node1.label
            }
            let node2 = deepQuery(cityData, item.region)
            if (node2 != null){
              var township = node2.label
            }
            item.region = provincialLeval + '/' + districtLeval + '/' + township
          } else {
            var provincial = item.region.slice(0, 2)
            let node = deepQuery(cityData, provincial)
            if (node != null){
              var provincialLeval = node.label
            }
            let node2 = deepQuery(cityData, item.region)
            if (node2 != null){
              var township = node2.label
            }
            item.region = provincialLeval + '/' + township
          }
        })
        this.loading = false
      })
    },
    // 表格数据转换
    formaRole (row, column) {
      return row.isChecked == '0' ? '未审核' : row.isChecked == '1' ? '通过' : row.isChecked == '2' ? '未通过' : '审核中'
    },
    // 获取区域树
    companyTreeData () {
      this.load = true
      companyTree(0).then((res) => {
        // this.treeData = res.data.data.vOElementTree
        this.options = res.data.data.vOElementTree
        this.load = false
      })
      getUserTree().then((res) => {
        if (res.data.data != '' || res.data.data != null) {
          let treeDatas = res.data.data
          this.treeData = deleteNullRegion(treeDatas)
          this.load = false
        } else {
          this.load = false
        }
      })
    },
    // 审核提示
    addMessage () {
      if (!(this.radio !== '')) {
        this.$message({
          showClose: true,
          message: '请选择一条数据',
          type: 'warning'
        })
        return false
      }
      detailCom(this.detail.id).then((res) => {
        this.detail = res.data.data
      })
      this.flag = false
      this.add = true
    },
    // 通过
    checkComData (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.selectdOpEdit = this.check.selectdOpEdit
          this.check.region = this.selectdOpEdit[this.selectdOpEdit.length - 1]
          checkCom(this.check).then((res) => {
            this.add = false
            this.getData()
            this.radio = ''
          })
        }
      })
    },
    // 不通过
    noCheckComData (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          checkCom(this.noCheck).then((res) => {
            this.add = false
            this.adds = false
            this.getData()
            this.radio = ''
          })
        }
      })
    },
    // 停用提示
    discontInuation () {
      if (!(this.radio !== '')) {
        this.$message({
          showClose: true,
          message: '请选择一条数据',
          type: 'warning'
        })
        return false
      }
      detailCom(this.check.id).then((res) => {
        this.check = res.data.data
      })
      this.discontinuation = true
    },
    closeComData () {
      closeCom(this.check.id).then((res) => {
        this.getData()
        this.radio = ''
        this.discontinuation = false
      })
    },
    // 启用提示
    enableMessage () {
      if (!(this.radio !== '')) {
        this.$message({
          showClose: true,
          message: '请选择一条数据',
          type: 'warning'
        })
        return false
      }
      detailCom(this.check.id).then((res) => {
        this.check = res.data.data
      })
      this.enable = true
    },
    openComData () {
      openCom(this.check.id).then((res) => {
        this.getData()
        this.enable = false
        this.radio = ''
      })
    },
    // 附加权限
    editMessage () {
      if (!(this.radio !== '')) {
        this.$message({
          showClose: true,
          message: '请选择一条数据',
          type: 'warning'
        })
        return false
      }
      this.idChecked = []
      detailCom(this.check.id).then((res) => {
        this.detail = res.data.data
      })
      this.edit = true
      this.getMenuChec()
    },
    // 附加权限树
    getMenuChec () {
      menuChec(this.detail.id).then((res) => {
        this.treeMenu = res.data.data.vOSysMenuTree
        this.rolId = res.data.data.idChecked
        const rolIds = res.data.data.idChecked || []
        rolIds.map((item, index) => {        
          if((findParent(this.treeMenu, item) || {}).hasOwnProperty('children')){
            if (findParent(this.treeMenu, item).children == null) {
              this.idChecked.push(item)
            }
          }
        })
        this.getMenuName(this.treeMenu)
      })
    },
    updateMenu () {
      this.handleNodeClick()
      this.loads = true
      updateMenuChec(this.update).then((res) => {
        this.edit = false
        this.loads = false
      })
    },
    // 遍历树加属性disabled
    getMenuName (item) {
      for (var value of item) {
        if (value.children) {
          this.getMenuName(value.children)
          value.disabled = false
          for (var i = 0; i < this.rolId.length; i++) {
            if (value.id === this.rolId[i]) {
              value.disabled = true
            }
          }
        }
        value.disabled = false
        for (var i = 0; i < this.rolId.length; i++) {
          if (value.id === this.rolId[i]) {
            value.disabled = true
          }
        }
      }
    },
    // 查看详情提示
    deletMessage () {
      if (!(this.radio !== '')) {
        this.$message({
          showClose: true,
          message: '请选择一条数据',
          type: 'warning'
        })
        return false
      }
      this.flag = false
      detailCom(this.detail.id).then((res) => {
        this.detail = res.data.data
        // 区域显示转换
      this.codes = this.detail.region.split(',')
      // 将获取到的区域id拆分
      var aaa = this.detail.region.split('')
      if (aaa.length == 4) {
        // 获取拆分后的前两位
        var firstOne = aaa.slice(0, 2)
        // 将获取到的前两位合并转成数组
        var ccc = (firstOne[0] + firstOne[1]).split(',')
        // 将两个数组合并
        this.selectdOp = ccc.concat(this.codes)
      } else if (aaa.length > 4) {
        // 获取拆分后的前两位 与 前4位
        var firstYi = aaa.slice(0, 2)
        var arrFirstOne = (firstYi[0] + firstYi[1]).split(',')
        var firstFour = aaa.slice(0, 4)
        // 将获取到的前两位合并转成数组
        var arrFirstFour = (firstFour[0] + firstFour[1] + firstFour[2] + firstFour[3]).split(',')
        var selectdOp1 = arrFirstOne.concat(arrFirstFour)
        this.selectdOp = selectdOp1.concat(this.codes)
      } else if (aaa.length < 4) {
        this.selectdOp = this.codes
      }
      })
      this.delet = true
    },
    // 查询列表
    getAllList () {
      this.listQuery.pageNum = 1
      this.listQuery.region = ''
      this.getData()
      this.radio = ''
    },
    // 树节点
    handleNodeClick (data) {
      this.update.menuIds = []
      var menuId = this.update.menuIds.concat(this.$refs.allCity.getHalfCheckedNodes(), this.$refs.allCity.getCheckedNodes())
      menuId.map((item) => {
        this.update.menuIds.push(item.id)
      })
    },
    getCurrentNode (data) {
      this.listQuery.region = data.id
      this.getData()
      this.radio = ''
    },
    showRow (row) {
      // 赋值给radio
      this.check.userName = row.userName
      this.check.phone = row.phone
      // this.check.name = row.name
      this.radio = this.tableData.indexOf(row)
      this.detail.id = row.id
      this.update.companyId = row.id
      this.check.id = row.id
      this.noCheck.id = row.id
      this.agree = false
      this.noagree = false
      this.disableds = false
      this.permiss = false
      if (row.isLocked == '0') {
        this.agree = true
      } else if (row.isLocked == '1') {
        this.noagree = true
        this.permiss = true
      }
      if (row.isChecked == '1') {
        this.disableds = true
      } else if (row.isChecked == '2') {
        this.agree = true
        this.noagree = true
        this.permiss = true
      } else if (row.isChecked == '0') {
        this.agree = true
        this.noagree = true
        this.permiss = true
      } else {
        this.agree = true
        this.noagree = true
        this.permiss = true
      }
    },
    //图片点击放大
    bigImg() {
      this.flag = !this.flag
    },
    // 判断按钮是否隐藏
    Concealment () {
      userMenu({
        menuType: 1,
        parentId: this.$route.query.id
      }).then((res) => {
        var concea = res.data.data
        concea.map((item) => {
          if (item.permission == 'jichu.wuye.shenhe') {
            this.power.add = item
          } else if (item.permission == 'jichu.wuye.allOpen') {
            this.power.enable = item
          } else if (item.permission == 'jichu.wuye.allLocked') {
            this.power.discontInuation = item
          } else if (item.permission == 'jichu.wuye.fujiaqx') {
            this.power.edit = item
          }
        })
      })
    }
  },
  computed: {
    num (val) {
      const {pageNum, pageSize} = this.listQuery
      return (pageNum - 1) * pageSize + 1
    }
  },
  mounted () {
    this.companyTreeData()
    this.getData()
    this.Concealment()
  }
}
</script>
<style lang="less">
#wuye{
  .ss{
    width: 50%;
  }
  .content{
    position: absolute;
    top: 90px;
    left: 0px;
    right: 0px;
    bottom: 0px;
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
  .pagination{
    position: absolute;
    bottom: 0px;
    right: 0px
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
  }
  .shen .el-select{
    width: 32%;
  }
  .shen img{
    width: 100%;
    height: 100%;
  }
  .fjqx .el-tree{
    height: 200px;
    overflow: auto;
  }
}
.fall .el-dialog__title{
  color: #367BE2;
}
.fall .el-dialog__header{
  border-bottom: 1px solid #dcdcdc;
  padding: 10px 20px 10px;
}
.fall .el-dialog__footer{
  text-align: center;
  background: #f3f3f3;
  padding: 10px 10px 10px;
}
.shen .el-input.is-disabled .el-input__inner{
  color: #000
}
.shen .el-cascader.is-disabled .el-cascader__label{
  color: #000
}
.shen img{
  width: 100%;
  height: 100%;
  transform: scale(1);
  transition: all ease 0.5s;
  cursor: pointer
}
img.active{
  transform: scale(1.5);
  z-index: 100;
  padding-right: 350px 
}
</style>
