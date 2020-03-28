<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style  lang="less">
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
.van-cell,
.van-collapse-item__content,
.van-hairline--top-bottom {
  background: @contcolor;
  color: white;
  border-width: 0 !important;
}
.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border-width: 0;
}
.van-cell:not(:last-child)::after {
  border-bottom: 1px solid @digba;
}
.van-cell--clickable:active {
  background: @contcolor !important;
}
</style>
