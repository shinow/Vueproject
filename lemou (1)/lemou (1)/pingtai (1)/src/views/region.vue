<template>
  <div id="region">
    <el-card shadow="never" body-style="padding:0px">
      <el-row slot="header">
        <el-button :span="2" size="small" type="primary" :icon="power.add.iconcls" v-if="power.add.permission" @click="openUp = true" :disabled="disabled">{{power.add.menuName}}</el-button>
      </el-row>
    </el-card>
    <div class="content">
        <div class="pull-left">
          <scrollBar class="scrollBar-left">
            <h1>全部城市</h1>
            <el-tree v-loading="load" ref='allCity' :default-checked-keys="newIdChecked" node-key="id" :check-on-click-node="false" show-checkbox :data="data" :props="defaultProp" accordion @check='getCurrentNode' @node-click="getCurrentNode"></el-tree>
          </scrollBar>
        </div>
        <scrollBar class="scrollBar-right">
          <h1>已开通城市</h1>
          <el-tree v-loading="load" node-key="code" :check-on-click-node="false" :data="treeData" :props="defaultProps" accordion :load="loadNode" lazy @node-click="handleNodeClick"></el-tree>
        </scrollBar>
      </div>
      <!--一键开通-->
      <el-row>
        <el-dialog title="一键开通" :visible.sync="openUp" width="20%" left>
          <span>
            您确定要开通<span>{{cityName}}</span>城市吗？
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" :loading="loads" @click="regOpendData">确 定</el-button>
          </span>
        </el-dialog>
      </el-row>
  </div>
</template>

<script>
import cityData from '@/assets/city-data'
import {regList, regOpend, userMenu, regListA} from '@/api'
import scrollBar from '@/components/scrollBarContainner'

export default {
  name: 'HelloWorld',
  components: {
    scrollBar
  },
  data () {
    return {
      // 树数据
      loading: false,
      load: false,
      loads: false,
      data: [],
      treeData: [],
      disabled: false,
      defaultProps: {
        id: 'code',
        label: 'name',
        isLeaf: 'leaf'
      },
      defaultProp: {
        id: 'value',
        children: 'children',
        label: 'label'
      },
      currentNode: {},
      idcCeck: [],
      // 一键开通
      openUp: false,
      codes: [],
      idChecked: [],
      newIdChecked: [],
      cityName: '',
      cityNames: [],
      power: {
        add: false
      }
    }
  },
  methods: {
    // 异步树节点点击事件
    handleNodeClick (data) {
    },
    // 异步树叶子节点懒加载逻辑
    loadNode (node, resolve) {
      console.log(node)
      // 一级节点处理
      if (node.level === 0) {
        this.requestTree(resolve)
      }
      // 其余节点处理
      if (node.level >= 1) {
        // 注意！把resolve传到你自己的异步中去
        this.getIndex(node, resolve)
      }
    },
    // 异步加载叶子节点数据函数
    getIndex (node, resolve) {
      console.log(23131)
      console.log(node)
      regListA(node.key).then(res => {
        console.log(res)
        if (res.data.httpCode == 0) {
          // 处理节点是否是叶子节点
          console.log(123131)
          let data = res.data.data
          resolve(data)
        }
      })
    },
    // 首次加载一级节点数据函数
    requestTree (resolve) {
      regListA(0).then((res) => {
        console.log(res)
        if (res.data.httpCode == 0) {
          let data = res.data.data
          resolve(data)
        }
      })
    },
    // 全部城市树
    // 已开通城市树
    getTreeData () {
      this.load = true
      regList(0).then((res) => {
        this.idcCeck = res.data.data.idChecked
        this.load = false
        var arr = []
        for (var i = 0; i < res.data.data.idChecked.length; i++) {
          if (res.data.data.idChecked[i].length > 4) {
            arr.push(res.data.data.idChecked[i])
          }
        }
        this.newIdChecked = arr
        this.data = cityData
        this.getMenuName(this.data)
      })
    },
    /**
     * 开通城市
     * 参数 id字符串
     */
    regOpendData () {
      this.loads = true
      const codes1 = this.codes.join(',')
      // 拼接传输字符串
      let aaa = '"' + codes1 + '"'
      regOpend(aaa).then((res) => {
        if (res.data.httpCode == '0') {
          this.loads = false
          this.getTreeData()
          this.openUp = false
        }
      })
    },
    // 判断是否重复开通
    noOpen () {
      if (this.newIdChecked.toString() === this.idcCeck.toString()) {
        this.disabled = true
      } else {
        for (var i = 0; i < this.idcCeck.length; i++) {
          for (var j = 0; j < this.codes.length; j++) {
            if (this.idcCeck[i] == this.codes[j]) {
              this.codes.splice(j, 1)
              j = j - 1
              this.disabled = false
              if (this.codes.length == '') {
                this.disabled = true
              }
            } else if (this.codes.length !== '') {
              this.disabled = false
            }
          }
        }
      }
    },
    // 树节点
    getCurrentNode (data) {
      this.codes = []
      this.cityName = []
      var checkedCity = this.codes.concat(this.$refs.allCity.getHalfCheckedNodes(), this.$refs.allCity.getCheckedNodes())
      checkedCity.map((item) => {
        this.codes.push(Number(item.id))
      })
      if (data.id.length == 4) {
        data.children.map((item) => {
          this.cityNames.push(item.label)
          this.cityName = data.label + ',' + this.cityNames.slice(0, 3)
        })
      } else if (data.id.length == 2) {
        this.cityName = data.label + '所有'
      } else if (data.id.length == 6) {
        this.cityName = data.label + '此'
      }
      this.noOpen()
    },
    // 遍历树加属性disabled
    getMenuName (item) {
      for (var value of item) {
        if (value.children) {
          this.getMenuName(value.children)
          value.disabled = false
          for (var i = 0; i < this.idcCeck.length; i++) {
            if (value.id === this.idcCeck[i]) {
              value.disabled = true
            }
          }
        }
        value.disabled = false
        for (var x = 0; x < this.idcCeck.length; x++) {
          if (value.id === this.idcCeck[x]) {
            value.disabled = true
          }
        }
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
          if (item.permission == 'sys.region.yiJkaiT') {
            this.power.add = item
          }
        })
      })
    }
  },
  mounted () {
    this.Concealment()
    this.getTreeData()
    this.noOpen()
  }
}
</script>
<style lang="less">
#region{
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
    bottom: 50px
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
  .tree-left{
    border-right: 1px solid #BFBFBF;
    .el-tree{
      height: 90%;
      overflow: auto;
    }
  }
  .tree-right .el-tree{
    height: 90%;
    overflow: auto;
  }
}
</style>
