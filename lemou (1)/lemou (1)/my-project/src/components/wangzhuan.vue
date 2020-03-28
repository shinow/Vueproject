<template>
  <div>
    
    <div class="text">
      <img  src="../assets/img/img222.png" alt="">
    </div>
    <header>
      <img @click="goback()" src="../assets/img/fanhui-2.png" alt="">
      <span>网络流程攻略</span>
    </header>
  </div>
</template>
<script>
export default {
  name:"wangzhuan",
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
    top:-0.6rem;
  img{
    width: 3.75rem;
    //  z-index: 1;
   margin-top: 0.3rem;
  }
}

</style>