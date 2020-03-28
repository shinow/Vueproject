<template>
  <div class="payalicode">
    <header>
      <img @click="goback()" src="../../assets/img/fanhu.png" alt />
      <span>我的银行卡</span>
    </header>
    <div style="padding-top:0.7rem">
      <div @click="tianjia(tian)" class="tianjia">
        <!-- <img src="../assets/img/jiajia.png" alt /> -->
        <span>添加银行卡</span>
      </div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="Clads">
        <div class="content" v-for="(item,index) in dataK" :key="index">
          <div style="padding-top:0.22rem" class="name">
            <span>姓名：</span>
            <span style="margin-left:0.36rem">{{item.userName}}</span>
            <div
              class="Bjab"
              @click="tianjia(bian,item.id,item.userName,item.cardNo,item.bankName)"
            >
              <!-- <img src="../assets/img/biajiji.png" alt /> -->
              <span>编辑</span>
            </div>
          </div>
          <div class="kahao">
            <span>卡号：</span>
            <span style="margin-left:0.36rem">{{item.cardNo}}</span>
          </div>
          <div class="yinhang">
            <span>开户行：</span>
            <span style="margin-left:0.2rem">{{item.bankName}}</span>
          </div>
          <div class="yinhang">
            <span>状态：</span>
            <span style="margin-left:0.34rem" :style="{color:item.color}">{{item.status}}</span>
          </div>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
export default {
  name: "bankcard",
  data() {
    return {
      isLoading: false,
      yonghu1: "",
      dataK: [
        { userName: "48", cardNo: "741454", bankName: "4155", color: "white" },
        {
          userName: "48",
          cardNo: "741454",
          bankName: "4155",
          color: "white"
        },
        {
          userName: "48",
          cardNo: "741454",
          bankName: "4155",
          color: "white"
        }
      ],
      tian: "添加",
      bian: "编辑"
    };
  },
  created() {
    // this.list();
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.list();
      }, 500);
    },
    list() {
      if (
        this.name == "" ||
        this.bankName == "" ||
        this.cardNo == "" ||
        this.userName == ""
      ) {
        this.$toast("请输入对应内容");
        return;
      }
      this.Http.post("/api/cjtpay-commercial-web/account/listBank", {}).then(
        data => {
          if (data.httpCode == 0) {
            console.log(data);
            this.dataK = data.data;
            this.dataK.forEach((item, index) => {
              item.color = "white";
              if (item.status == "0") {
                item.status = "关闭";
                item.color = "white";
              } else if (item.status == "1") {
                item.status = "开启";
                item.color = "green";
              } else if (item.status == "2") {
                item.status = "风控";
                item.color = "red";
              } else if (item.status == "3") {
                item.status = "风控";
                item.color = "red";
              }
            });
          } else {
            // 数据错误提示
          }
        }
      );
    },
    goback() {
      this.$router.push("/Paycode");
    },
    tianjia(val, id, nam, coad, bakn) {
      console.log(val);
      this.$router.push({
        name: "bianjibank",
        query: {
          value: val,
          ids: id,
          names: nam,
          coads: coad,
          bakname: bakn
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.payalicode {
  width: 3.75rem;
  height: 100vh;
  background: @bc;
  overflow: auto;
  .Clads {
    position: relative;
    z-index: 3;
    margin-bottom: 0.6rem;
  }
  .content {
    position: relative;
    z-index: 2;
    font-family: PingFang-SC-Medium;
    color: rgba(251, 252, 254, 1);
    border-radius: 0.1rem;
    font-size: 0.145rem;
    width: 3.3rem;
    margin: 0.2rem 0 0.1rem 0.2rem;
    background: @contcolor;
    box-shadow: 0 0.06rem 0.23rem 0 rgba(3, 3, 3, 0.23);
    overflow: hidden;
    .name,
    .kahao,
    .yinhang,
    .shengyu,
    .edu {
      float: left;
      width: 3.75rem;
      padding: 0.06rem 0 0.15rem 0.23rem;
    }
    .name {
      .Bjab {
        float: right;
        margin-right: 0.95rem;
        // border: 1px solid red;
        margin-top: -0.02rem;
        img {
          width: 0.15rem;
          height: 0.15rem;
        }
        // width: 10%;
      }
    }
  }
  .tianjia {
    color: white;
    width: 3.25rem;
    height: 0.37rem;
    // margin-top: 0.8rem;
    margin-left: 0.25rem;
    line-height: 0.37rem;
    border: 0.01rem dashed white;
    border-radius: 0.06rem;
    img {
      float: left;
      width: 0.18rem;
      height: 0.18rem;
      margin: 0.1rem 0 0 1.1rem;
    }
    span {
      margin-left: 0.12rem;
    }
  }
}
</style>
