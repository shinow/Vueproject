<template>
  <div>
    
    <div class="text">
      <img  src="../assets/img/imgggg.png" alt="">
    </div>
    <header>
      <img @click="goback()" src="../assets/img/fanhui-2.png" alt="">
      <span>手机权限设置</span>
    </header>
  </div>
</template>
<script>
export default {
  name:"quanxian",
  data() {
    return {
      
    }
  },
  methods:{
     goback(){
         this.$router.go(-1);
      },
  }
}
</script>
<style lang="scss"  scoped>
    
.text{
  // margin-top: 0.8rem;
   width: 3.75rem;
    position: absolute;
    left: 0;
    top:-0.53rem;
  img{
    width: 3.75rem;
    //  z-index: 1;
   margin-top: 0.2rem;
  }
}
</style>