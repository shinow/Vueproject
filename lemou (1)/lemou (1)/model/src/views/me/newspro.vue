<template>
  <div class="Paycode">
    <v-touch v-on:swiperight="goback">
      <header>
        <img @click="goback()" src="../../assets/img/fanhu.png" alt />
        <span>消息中心</span>
      </header>
      <div style="padding-top:0.45rem"></div>
      <div class="cont">
        <van-collapse accordion v-model="activeNames" v-for="(item,index) in data" :key="index">
          <van-collapse-item info="5" :title="item.title" :name="index" icon="shop-o">{{item.name}}</van-collapse-item>
        </van-collapse>
      </div>
    </v-touch>
  </div>
</template>
<script>
export default {
  name: "newspro",
  data() {
    return {
      activeNames: ["1"],
      data: [
        {
          title: "信息1",
          name:
            "4848484eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee84185151515151515"
        },
        {
          title: "信息1515",
          name:
            "发是虎不虎是好的VB和机电设备是还得上班是话不多说VBv 皮里皮里皮里皮里怕老婆老婆老婆老婆老婆了漂亮漂亮漂亮屁老婆"
        }
      ]
    };
  },
  created() {},
  methods: {
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
.Paycode {
  width: 3.75rem;
  height: 100vh;
  background: @bc;
  overflow: auto;
  .van-collapse {
    background: @contcolor;
  }
  .cont {
    width: 3.6rem;
    background: @contcolor;
    border-radius: 4px;
    font-size: 14px;
    margin: 0.25rem auto;
    font-family: HiraginoSansGB-W3, HiraginoSansGB;
    font-weight: normal;
    color: rgba(255, 255, 255, 1) !important;
    ul {
      z-index: 2;
      color: white;
      padding-bottom: 0.3rem;
      li {
        margin-top: 0.07rem;
        width: 90%;
        margin-left: 0.2rem;
        height: 0.45rem;
        border-bottom: 0.01rem solid #232b5a;
        img {
          width: 0.25rem;
          height: 0.25rem;
          float: left;
          margin: 0.06rem 0 0 0.01rem;
        }
        span {
          float: left;
          margin: 0.11rem 0 0 0.2rem;
        }
        .van-icon {
          font-size: 0.2rem;
          float: right;
          margin: 0.08rem 0.13rem 0 0;
        }
      }
      li:nth-child(1) {
        padding-top: 0.1rem;
      }
    }
  }
}
</style>