<template>
  <div>
    <van-button
      color="linear-gradient(to right, #4bb0ff, #6149f6)"
      @click="Rechargey1"
      type="primary"
      size="large"
    >MA充值</van-button>
    <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" type="primary" size="large">MA提现</van-button>
  </div>
</template>
<script>
export default {
  name: "Deposit",
  data() {
    return {};
  },
  methods: {
    Rechargey1() {
      this.$router.push("/Rechargey");
    }
  }
};
</script>
<style lang="less" scoped>
</style>