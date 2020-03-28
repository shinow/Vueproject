<template>
  <div class="menu">
    <el-menu :default-active="tagCurrent.value" :collapse="$store.state.common.isCollapse" router active-text-color='#367be4' :unique-opened='true' class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
      <MenuTree v-for="(item, index) in userMenu" :key="index" :items="item"></MenuTree>
    </el-menu>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import MenuTree from '@/components/MenuTree'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      tagCurrent: state => state.tag.tagCurrent,
      userMenu: state => state.common.userMenu
    })
  },
  methods: {
    getMenuData () {
      this.$store.dispatch('GetMenuList')
    },
    handleOpen (key, keyPath) {
    },
    handleClose (key, keyPath) {
    }
  },
  components: {
    'MenuTree': MenuTree
  },
  created () {
    this.getMenuData()
  }
}
</script>
<style type="text/css">
	.el-menu-item-group__title{
    padding: 0
  }
</style>
<style lang="less" scoped>
.menu{
  height: 100%;
  background-color: #f5f5f5;
  border-right: 1px solid #c0c0c0;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    height: auto;
    overflow: hidden;
  }
  .el-submenu .el-menu-item, .el-menu-item, .el-submenu__title{
    height: 42px;
    line-height: 42px;
    min-width: auto;
    box-sizing: border-box;
    border-bottom: 1px solid #c0c0c0;
  }
  .el-submenu .el-submenu__title{
    background-color: #f5f5f5 !important
  }
  // .el-submenu{
  //   background: #f5f5f5
  // }
}
</style>
