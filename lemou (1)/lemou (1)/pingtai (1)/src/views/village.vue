<template>
  <div id="village">
    <el-card shadow="never" body-style="padding:0px">
      <el-row slot="header">
        <el-col :span="17">
          <el-button :span="2" size="small" type="primary" :icon="power.add.iconcls" :disabled="disableds" v-if="power.add.permission" @click="addMessage()">{{power.add.menuName}}</el-button>
          <el-button :span="2" size="small" type="primary" :icon="power.enable.iconcls" :disabled="agree" v-if="power.enable.permission" @click="enableMessage()">{{power.enable.menuName}}</el-button>
          <el-button :span="2" size="small" type="danger" :icon="power.discontInuation.iconcls" :disabled="noagree" v-if="power.discontInuation.permission" @click="discontInuation()">{{power.discontInuation.menuName}}</el-button>
          <el-button :span="2" size="small" type="primary" icon="iconfont icon-xiangqing" @click="deletMessage()">查看详情</el-button>
        </el-col>
        <el-col :span="7" class="pull-right">
          <el-button class="pull-right" :span="2" size="small" type="primary" icon="el-icon-search" @click="getAllList"></el-button>
          <el-input class="pull-right ss" size="small" placeholder="请输入小区名称进行搜索" v-model="listQuery.name" @change="getAllList"></el-input>
        </el-col>
      </el-row>
    </el-card>
    <div class="content">
      <div class="pull-left">
        <scrollBar class="scrollBar-left">
          <el-tree v-loading="load" ref="allCity" node-key="id" :check-on-click-node="true" :data="treeData" :props="defaultProps" accordion @node-click="getCurrentNode"></el-tree>
        </scrollBar>
      </div>
      <scrollBar class="scrollBar-right">
        <el-table
          v-loading="loading"
          :stripe="true"
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
          <el-table-column show-overflow-tooltip prop="name" label="小区名称" width="180"></el-table-column>
          <el-table-column show-overflow-tooltip prop="companyName" label="所属物业公司"></el-table-column>
          <el-table-column show-overflow-tooltip prop="headName" label="负责人"></el-table-column>
          <el-table-column show-overflow-tooltip prop="headPhone" label="负责人电话"></el-table-column>
          <el-table-column show-overflow-tooltip prop="isChecked" :formatter="formaRole" label="审核状态">
          </el-table-column>
          <el-table-column show-overflow-tooltip  prop="isLocked" label="账号状态">
            <template slot-scope="scope">
              <!--isLocked ：0=>启用  1=>停用  -->
              <!-- <span v-if="scope.row.isLocked == 0"><el-tag>启用</el-tag></span>
              <span v-else><el-tag type="warning">停用</el-tag></span> -->
              {{scope.row.isLocked? '停用' : '启用'}}
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="address" label="小区详细地址"></el-table-column>
          <el-table-column show-overflow-tooltip prop="updateTime" label="审核时间"></el-table-column>
        </el-table>
      </scrollBar>
      <pagination class="pagination" :listQuery='listQuery' :total="total" @getTableData="getData"></pagination>
    </div>
      <!--弹框-->
    <el-row>
      <!--审核-->
      <el-dialog title="审核" :visible.sync="add" width="990px" left>
        <el-form ref="detail" :rules="checkRules" label-position="top" label-width="80px" :model="detail" size="mini">
          <el-row :gutter="32">
            <el-col :span="8">
              <el-form-item label="小区名称" prop="name">
                <el-input v-model.trim="detail.name" placeholder="请输入小区名称" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="负责人" prop="headName">
                <el-input v-model.trim="detail.headName" placeholder="请输入负责人" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话" prop="headPhone">
                <el-input v-model.trim="detail.headPhone" placeholder="请输入联系电话" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="小区位置" prop="selectdOp">
                <el-cascader
                  :disabled="true"
                  style="width: 100%"
                  v-model="selectdOp"
                  :options="options"
                  :props="props"
                  change-on-select>
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="详细地址" prop="address">
                <el-input v-model.trim="detail.address" placeholder="请输入详细地址" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="楼宇数量" prop="buildingBum">
                <el-input v-model.trim="detail.buildingBum" placeholder="请输入楼宇数量" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="占地面积（m2）" prop="areaTotal">
                <el-input v-model.trim="detail.areaTotal" placeholder="请输入占地面积" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="建筑面积（m2）" prop="areaBuilding">
                <el-input v-model.trim="detail.areaBuilding" placeholder="请输入建筑面积" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="绿地面积（m2）" prop="areaGreen">
                <el-input v-model.trim="detail.areaGreen" placeholder="请输入绿地面积" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="道路面积（m2）" prop="areaRoad">
                <el-input v-model.trim="detail.areaRoad" placeholder="请输入道路面积" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="开工日期" prop="dateStart">
                <el-date-picker
                  :disabled="true"
                  :editable="false"
                  v-model="detail.dateStart"
                  type="date"
                  placeholder="请选择开工日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="竣工日期" prop="dateEnd">
                <el-date-picker
                  :disabled="true"
                  :editable="false"
                  v-model="detail.dateEnd"
                  type="date"
                  placeholder="请选择竣工日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="移交日期" prop="dateChange">
                <el-date-picker
                  :disabled="true"
                  :editable="false"
                  v-model="detail.dateChange"
                  type="date"
                  placeholder="请选择移交日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24" class="kaiFaS">
              所属物业公司信息：
            </el-col>
            <el-col :span="8">
              <el-form-item label="公司名称" prop="companyName">
                <el-input v-model.trim="detail.companyName" placeholder="请输入公司名称" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人" prop="userName">
                <el-input v-model.trim="detail.userName" placeholder="请输入联系人" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话" prop="phone">
                <el-input v-model.trim="detail.phone" placeholder="请输入联系电话" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注" prop="remark">
                <el-input type="textarea" v-model="detail.remark" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-dialog class="fall" title="请填写该小区审核失败原因" :visible.sync="adds" width="30%" append-to-body left>
          <el-form class="shen" ref="form" :model="detail">
            <el-input size="middle" v-model="noCheck.explain" placeholder="请填写审核失败原因"></el-input>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="nocheckVillData">确 定</el-button>
          </span>
        </el-dialog>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="checkVillData">通 过</el-button>
          <el-button type="primary" @click="adds = true">不 通 过</el-button>
        </span>
      </el-dialog>
      <!--查看详情-->
      <el-dialog title="详情" :visible.sync="delet" width="990px" left>
        <el-form ref="detail" :rules="checkRules" label-position="top" label-width="80px" :model="detail" size="mini">
          <el-row :gutter="32">
            <el-col :span="8">
              <el-form-item label="小区名称" prop="name">
                <el-input v-model.trim="detail.name" placeholder="请输入小区名称" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="负责人" prop="headName">
                <el-input v-model.trim="detail.headName" placeholder="请输入负责人" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话" prop="headPhone">
                <el-input v-model.trim="detail.headPhone" placeholder="请输入联系电话" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="小区位置" prop="selectdOp">
                <el-cascader
                  :disabled="true"
                  style="width: 100%"
                  v-model="selectdOp"
                  :options="options"
                  :props="props"
                  change-on-select>
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="详细地址" prop="address">
                <el-input v-model.trim="detail.address" placeholder="请输入详细地址" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="楼宇数量" prop="buildingBum">
                <el-input v-model.trim="detail.buildingBum" placeholder="请输入楼宇数量" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="占地面积（m2）" prop="areaTotal">
                <el-input v-model.trim="detail.areaTotal" placeholder="请输入占地面积" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="建筑面积（m2）" prop="areaBuilding">
                <el-input v-model.trim="detail.areaBuilding" placeholder="请输入建筑面积" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="绿地面积（m2）" prop="areaGreen">
                <el-input v-model.trim="detail.areaGreen" placeholder="请输入绿地面积" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="道路面积（m2）" prop="areaRoad">
                <el-input v-model.trim="detail.areaRoad" placeholder="请输入道路面积" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="开工日期" prop="dateStart">
                <el-date-picker
                  :disabled="true"
                  :editable="false"
                  v-model="detail.dateStart"
                  type="date"
                  placeholder="请选择开工日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="竣工日期" prop="dateEnd">
                <el-date-picker
                  :disabled="true"
                  :editable="false"
                  v-model="detail.dateEnd"
                  type="date"
                  placeholder="请选择竣工日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="移交日期" prop="dateChange">
                <el-date-picker
                  :disabled="true"
                  :editable="false"
                  v-model="detail.dateChange"
                  type="date"
                  placeholder="请选择移交日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24" class="kaiFaS">
              所属物业公司信息：
            </el-col>
            <el-col :span="8">
              <el-form-item label="公司名称" prop="companyName">
                <el-input v-model.trim="detail.companyName" placeholder="请输入公司名称" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人" prop="userName">
                <el-input v-model.trim="detail.userName" placeholder="请输入联系人" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话" prop="phone">
                <el-input v-model.trim="detail.phone" placeholder="请输入联系电话" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注" prop="remark">
                <el-input type="textarea" v-model="detail.remark" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="delet = false">关 闭</el-button>
        </span>
      </el-dialog>
      <el-dialog title="启用" :visible.sync="enable" width="20%" left>
        <span>
                      您确定要启用该小区账号吗？
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="openVillData">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="停用" :visible.sync="discontinuation" width="20%" left>
        <span>
                      您确定要停用该小区账号吗？
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="closeVillData">确 定</el-button>
        </span>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
// import cityData from '@/assets/city-data'
import {villageData, getUserTree, detailVill, openVill, closeVill, checkVill, userMenu, regList} from '@/api'
import pagination from '@/components/pagination'
import scrollBar from '@/components/scrollBarContainner'
import {deleteNullRegion} from '@/util/util'
import {validatename} from '@/util/validate'
export default {
  name: 'HelloWorld',
  components: {
    pagination,
    scrollBar
  },
  data () {
    const isvalidatename = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('姓名不能为空'))
      } else if (!validatename(value)) {
        callback(new Error('请输入正确的姓名'))
      } else {
        callback()
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
        label: 'label',
        id: 'id'
      },
      // 审核
      disableds: false,
      add: false,
      adds: false,
      // 通过参数
      yesCheck: {
        id: '',
        isChecked: 1,
        companyId: '',
        name: ''
      },
      // 不通过参数
      noCheck: {
        id: '',
        isChecked: 2,
        explain: ''
      },
      // 启用与停用
      agree: false,
      noagree: false,
      delet: false,
      enable: false,
      discontinuation: false,
      detail: {
      },
      // 选择器
      options: [],
      selectdOp: [],
      props: {
        value: 'id',
        label: 'label',
        children: 'children'
      },
      value1: '',
      value: '',
      // 判断按钮是否隐藏
      power: {
        add: false,
        enable: false,
        discontInuation: false
      },
      filterText: '',
      checkRules: {
        name: [
          {required: true, message: '不可为空', trigger: 'change'},
          {max: 20, message: '不超过20个字符', trigger: 'change'}
        ],
        headName: [
          {required: true, message: '不可为空', trigger: 'change'},
          {message: '请输入正确的姓名', validator: isvalidatename}
        ],
        headPhone: [
          {required: true, message: '不可为空', trigger: 'change'},
          {message: '请输入正确的手机号', validator: checkPhone}
        ],
        selectdOp: [{required: true, trigger: 'blur', message: '不可为空'}],
        address: [{required: true, message: '不可为空', trigger: 'change'}]
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
      villageData(this.listQuery).then((res) => {
        this.tableData = res.data.data
        this.total = parseInt(res.data.total)
        this.tableData.map((item) => {
          item.isLocked = parseInt(item.isLocked)
        })
        this.loading = false
      })
    },
    // 表格数据转换
    formaRole (row, column) {
      return row.isChecked == '0' ? '未审核' : row.isChecked == '1' ? '通过' : row.isChecked == '2' ? '未通过' : '审核中'
    },
    getTreeData () {
      this.load = true
      regList(0).then((res) => {
        console.log(res)
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
      detailVill(this.detail.id).then((res) => {
        console.log(res)
        this.detail = res.data.data.item
        this.detail.userName = res.data.data.userName
        this.detail.phone = res.data.data.phone
      })
      this.add = true
    },
    // 通过
    checkVillData () {
      checkVill(this.yesCheck).then((res) => {
        this.add = false
        this.getData()
        this.radio = ''
      })
    },
    // 不通过
    nocheckVillData () {
      checkVill(this.noCheck).then((res) => {
        this.add = false
        this.adds = false
        this.getData()
        this.radio = ''
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
      detailVill(this.detail.id).then((res) => {
        this.detail = res.data.data
      })
      this.discontinuation = true
    },
    closeVillData () {
      closeVill(this.detail.id).then((res) => {
        this.discontinuation = false
        this.getData()
        this.radio = ''
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
      detailVill(this.detail.id).then((res) => {
        this.detail = res.data.data
      })
      this.enable = true
    },
    openVillData () {
      openVill(this.detail.id).then((res) => {
        this.enable = false
        this.getData()
        this.radio = ''
      })
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
      detailVill(this.detail.id).then((res) => {
        this.detail = res.data.data.item
        this.detail.userName = res.data.data.userName
        this.detail.phone = res.data.data.phone
      })
      this.delet = true
    },
    // 树节点
    getCurrentNode (data) {
      this.listQuery.region = data.id
      this.getData()
      this.radio = ''
    },
    getAllList () {
      this.listQuery.region = ''
      this.listQuery.pageNum = 1
      this.getData()
      this.radio = ''
    },
    showRow (row) {
      this.yesCheck.companyId = row.companyId
      this.yesCheck.name = row.name
      // 赋值给radio
      this.radio = this.tableData.indexOf(row)
      this.selectdOp = row.region
      this.codes = row.region.split(',')
      // 将获取到的区域id拆分
      var aaa = row.region.split('')
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
      this.detail.id = row.id
      this.yesCheck.id = row.id
      this.noCheck.id = row.id
      this.disableds = false
      this.agree = false
      this.noagree = false
      if (row.isChecked == '1') {
        this.disableds = true
      } else if (row.isChecked == '2') {
        this.agree = true
        this.noagree = true
      } else if (row.isChecked == '0') {
        this.disableds = true
        this.agree = true
        this.noagree = true
      } else if (row.isChecked == '3') {
        this.disableds = false
        this.agree = true
        this.noagree = true
      }
      if (row.isLocked == '0') {
        this.agree = true
      } else if (row.isLocked == '1') {
        this.noagree = true
      }
    },
    // 判断按钮是否隐藏
    Concealment () {
      userMenu({
        menuType: 1,
        parentId: this.$route.query.id
      }).then((res) => {
        var concea = res.data.data
        concea.map((item) => {
          if (item.permission == 'jichu.village.shenhe') {
            this.power.add = item
          } else if (item.permission == 'jichu.village.allOpen') {
            this.power.enable = item
          } else if (item.permission == 'jichu.village.allLocked') {
            this.power.discontInuation = item
          }
        })
      })
    }
  },
  mounted () {
    this.getData()
    this.getTreeData()
    this.Concealment()
  }
}
</script>
<style lang="less">
#village{
  .content{
    position: absolute;
    top: 90px;
    left: 0px;
    right: 0px;
    bottom: 0px;
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
  }
  .shen .el-select{
    width: 32%;
  }
  .shen img{
    width: 100%;
    height: 100%;
  }
  .pagination{
    position: absolute;
    bottom: 0px;
    right: 0px
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
.el-input.is-disabled .el-input__inner{
  color: #000
}
.el-input.is-disabled .el-input__inner{
  color: #000
}
.el-cascader.is-disabled .el-cascader__label{
  color: #000
}
.el-textarea.is-disabled .el-textarea__inner{
  color: #000
}
</style>
