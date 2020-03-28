<template>
  <div class="Paycode">
    <v-touch v-on:swiperight="goback">
      <header>
        <img @click="goback()" src="../../assets/img/fanhu.png" alt />
        <span>修改地址</span>
      </header>
      <div style="padding-top:0.65rem"></div>
      <div class="cont">
        <van-area
          :area-list="areaList"
          confirm-button-text=" "
          @change="onChange"
          confirm="confirm"
          cancel-button-text=" "
          value="110101"
          :columns-num="3"
        />
      </div>
    </v-touch>
  </div>
</template>
<script>
import areaList from "../../../static/area";
export default {
  name: "Chaddress",
  data() {
    return {
      areaList
    };
  },
  created() {},
  methods: {
    goback() {
      this.$router.go(-1);
    },
    onChange(picker, value, index) {
      // <!--打印看下对应值-->
      console.log("当前值：", value, "当前索引：", index);
      //   <!--因为解析过来的数据是数组而carmodel定义字符串-->
      let areaName = "";
      for (var i = 0; i < value.length; i++) {
        areaName = areaName + value[i].name + " ";
      }
      console.log(areaName);
    }
  }
};
</script>

<style lang="less" scoped>
.Paycode {
  width: 3.75rem;
  height: 100vh;
  background: @bc;
  .cont {
    width: 3.6rem;
    background: @contcolor;
    border-radius: 4px;
    font-size: 14px;
    margin: 0 auto;
    font-family: HiraginoSansGB-W3, HiraginoSansGB;
    font-weight: normal;
    color: rgba(255, 255, 255, 1) !important;
    .van-area {
      background: @contcolor;
      color: white;
    }
  }
}
</style>
<style lang="less">
.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border-width: 0 !important;
}
.van-picker-column__item {
  color: white;
}
.van-picker__mask {
  background-image: linear-gradient(180deg, #373968, #373968),
    linear-gradient(0deg, #373968, #373968);
  opacity: 0.67;
}
.van-picker__frame {
  background: @btn2;
  color: white;
  opacity: 0.17;
}
</style>