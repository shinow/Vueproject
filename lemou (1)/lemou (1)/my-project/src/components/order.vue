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
      <div class="dingdan1">
        <img src="../assets/img/dingdan-4.png" alt />
        <p style="color:rgb(75,107,246);">订单</p>
        
      </div>
      <router-link style="color:grey" to="./me">
        <div class="my1">
          <img src="../assets/img/profile.png" alt />
          <p>我的</p>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "order",
 
};
</script>
<style lang="scss" scoped>
[v-cloak] {
  display: none !important;
}

</style>

