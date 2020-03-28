<template>
  <el-submenu :index="items.id">
    <template slot="title">
      <i :class="items.iconcls"></i><span slot="title">{{items.menuName}}</span>
    </template>
    <template v-for="(item, cindex) in items.childList">
      <el-menu-item v-if="item.childList ? false : true" :index="`${item.request}?id=${item.id}`" :key="cindex">
        <i :class="item.iconcls"></i><span>{{item.menuName}}</span>
      </el-menu-item>
      <MenuTree v-else :items="item" :key="cindex"></MenuTree>
    </template>
  </el-submenu>
</template>
<script>
export default {
  name: 'MenuTree',
  props: ['items'],
  data () {
    return {}
  }
}
</script>
