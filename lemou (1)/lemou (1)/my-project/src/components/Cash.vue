<template>
  <div>
    <header>
      <img @click="goback()" src="../assets/img/fanhui-2.png" alt />
      <span>我的提现</span>
    </header>
    <div  class="tianjia" @click="Cashbj()">
      <van-button type="primary" style="width:3.2rem">新增提现</van-button>
    </div>
    <div class="content" v-for="(item,index) in dataK" :key="index">
      <div style="padding-top:0.22rem" class="name">
        <span>提现账户：</span>
        <span >{{item.account}}</span>
      </div>
      <div class="kahao">
        <span>提现金额：</span>
        <span>{{(item.money)/100}}</span>
      </div>
      <div class="yinhang">
        <span>提现时间：</span>
        <span >{{item.createTime}}</span>
      </div>
      <div class="yinhang">
        <span>提现状态：</span>
        <span>{{item.status}}</span>
      </div>
    </div>
       <div class="workL">
      <img src="../assets/image/图层 4 拷贝.png" alt />
      <p>提现列表</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Cash",
  data() {
    return {
      YK:"",
      yonghu1: "",
      dataK: [],
      tian:"添加",
      bian:"编辑",
    };
  },
  created() {
    this.YK = this.$route.query.ids;
    this.list();
  },
  methods: {
    list() {
      this.Http.post("/api/cjtpay-commercial-web/commercial/withdraw/list", {
       pageNum: 1,
        pageSize: 9999
      }).then(
        data => {
          if (data.httpCode == 0) {
            console.log(data);
            this.dataK = data.data;
            this.dataK.forEach((item,index)=>{
              if (item.status==0) {
                item.status="已提交"
              }else if(item.status==1){
                item.status="审核成功"
              }else if(item.status==2){
                item.status="审核失败"
              }
            })
          } else {
            // 数据错误提示
          }
        }
      );
    },
    Cashbj(){
      this.$router.push({
        name:"Cashbj",
         query: {
          ids: this.YK
        }
      })
    },
    goback() {
      this.$router.push({
        name:"Memess"
      })
    },
  }
};
</script>
<style lang="scss" scoped>
.content {
  font-family: PingFang-SC-Medium;
  position: relative;
  z-index: 2;
  color: rgba(251, 252, 254, 1);
  border-radius: 0.1rem;
  font-size: 0.145rem;
  width: 3.3rem;
  margin: 0.2rem 0 0.1rem 0.2rem;
 background-color:burlywood;
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
      margin-top: -0.02rem;
      img {
        width: 0.15rem;
        height: 0.15rem;
      }
    }
  }
}
.tianjia {
  // width: 3rem;
  padding-top: 0.8rem;
  margin-left: 0.25rem;
}
.workL {
  width: 100%;
  text-align: center;
  position: fixed;
  top: 2.7rem;
  img {
    width: 2.3rem;
    height: 2.03rem;
  }
  p {
    font-size: 0.2rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    opacity: 0.45;
    margin-top: 0.15rem;
  }
}
</style>
