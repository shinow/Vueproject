<template>
<div>
 <router-view />
 <div class="tail">
    
    <router-link style="color:grey" to="./home">
      <div class="shouye1">
        <img src="../assets/img/shouye-4.png" alt />
        <p>首页</p>
      </div>
    </router-link>
    <router-link style="color:grey" to="./paymented">
      <div class="caifu1">
        <img src="../assets/img/caifu.png" alt />
        <p>财富</p>
      </div>
    </router-link>
    <router-link style="color:grey" to="./order">
      <div class="dingdan1">
        <img src="../assets/img/dingdan-2.png" alt />
        <p>订单</p>
      </div>
    </router-link>
    <div class="my1">
      <img src="../assets/img/wode-2.png" alt />
      <p style="color:rgb(75,107,246);">我的</p>
    </div>
 
  </div>
</div>
 
</template>

<script>
import { Loading } from "element-ui";
let loadingInstance;
export default {
  name: "me"
};
</script>
<style lang="scss" scoped>
[v-cloak] {
  display: none !important;
}
.tail{
  z-index: 555 !important;
    background-color: rgba(255, 255, 255, 1);
}
</style>
