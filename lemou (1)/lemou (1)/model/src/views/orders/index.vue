<template>
  <div class="orderes">
    <v-touch v-on:swiperight="goback">
      <header>
        <img @click="goback" src="../../assets/img/fanhu.png" alt />
        <span>订单列表</span>
      </header>
      <div class="cont">
        <div class="cretime">
          <van-field
            v-model="timestart"
            label="起始时间："
            @click="showPopFn('start')"
            placeholder="请选择起始时间"
            readonly
          />
          <van-field
            v-model="timeend"
            label="截止时间："
            @click="showPopFn('end')"
            placeholder="请选择起始时间"
            readonly
          />
          <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
            <van-datetime-picker
              v-model="currentDate"
              type="date"
              @change="changeFn()"
              @confirm="confirmFn()"
              @cancel="cancelFn()"
            />
          </van-popup>
          <!-- ///// -->
          <div class="con" style="width:100%;overflow:hidden">
            <div class="firsd" style="width:50%;float: left;">
              <van-field
                readonly
                clickable
                :value="value"
                placeholder="请选择订单状态"
                @click="showPicker = true"
              />
              <van-popup v-model="showPicker" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="columns"
                  @cancel="showPicker = false"
                  @confirm="onConfirm"
                />
              </van-popup>
            </div>
            <div class="firsdd" style="width:50%;float:right;">
              <van-field
                readonly
                clickable
                :value="value"
                placeholder="请选择订单类型"
                @click="showPicker = true"
              />
              <van-popup v-model="showPicker" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="columns"
                  @cancel="showPicker = false"
                  @confirm="onConfirm"
                />
              </van-popup>
            </div>
          </div>
        </div>
        <div class="ser">
          <van-search
            placeholder="请输入订单号"
            background="rgba(35, 36, 80, 1)"
            left-icon="records"
            right-icon="search"
            v-model="sms"
          />
          <button>查询</button>
        </div>
      </div>
      <div class="oder">
        <van-collapse v-model="activeNames" v-for="(item,index) in data" :key="index">
          <van-collapse-item :title="'订单号：'+item.title" :name="index">
            <p>支付类型：{{item.type}}</p>
            <p>订单金额：{{item.money}}</p>
            <p>订单状态：{{item.sta}}</p>
          </van-collapse-item>
        </van-collapse>
      </div>
      <div class="nolist" v-if="Orderlist">
        <van-icon size="1rem" color="white" name="newspaper-o" />
        <p>您当前没有订单哦~</p>
      </div>
    </v-touch>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "",
      openstart: "",
      currentDate: new Date(),
      changeDate: new Date(),
      show: false, // 用来显示弹出层
      timestart: "", //开始时间
      timeend: "", //截止时间
      sms: "", //
      //状态
      value: "",
      showPicker: false,
      columns: ["等待处理", "处理中", "提现成功", "提现失败"],
      activeNames: ["1"],
      Orderlist: false,
      data: [
        {
          title: "cwcqececwwc1815815151515",
          type: "1",
          money: "999",
          sta: "25215"
        }
      ]
    };
  },
  methods: {
    //状态
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    showPopFn(v) {
      this.show = true;
      this.openstart = v;
    },
    changeFn() {
      // 值变化是触发
      this.changeDate = this.currentDate; // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
    },
    confirmFn() {
      // 确定按钮
      if (this.openstart === "start") {
        this.timestart = this.timeFormat(this.currentDate);
      } else {
        this.timeend = this.timeFormat(this.currentDate);
      }
      this.show = false;
    },
    cancelFn() {
      this.show = false;
    },
    timeFormat(time) {
      // 时间格式化 2019-09-08
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      return year + "年" + month + "月" + day + "日";
    },
    goback() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.timeFormat(new Date());
  }
};
</script>
<style lang="less" scoped>
.orderes {
  width: 3.75rem;
  height: 100vh;
  background: @bc;
  overflow: auto;
  .cont {
    padding-top: 0.65rem;
    .ser {
      width: 100%;
      .van-search {
        width: 80%;
        float: left;
        height: 0.45rem;
        border-radius: 4px;
        font-family: PingFangSC;
        background-color: @backc;
        color: rgba(255, 255, 255, 1) !important;
        margin: 0.1rem auto;
      }
      .van-search__content {
        background: @backc;
        color: rgba(255, 255, 255, 1) !important;
      }
      button {
        margin: 0.1rem auto;
        width: 18%;
        background-color:@btn2;
        height: 0.45rem;
        border-radius: 0.07rem;
        color: white;
        font-size: 0.17rem;
      }
    }
  }
  .oder {
    width: 3.49rem;
    margin: 0.1rem auto;
    background: @contcolor;
    border-radius: 4px;
    position: relative;
    z-index: 1;
    font-size: 14px;
    font-family: HiraginoSansGB-W3, HiraginoSansGB;
    font-weight: normal;
    color: rgba(255, 255, 255, 1) !important;
    .title {
      opacity: 1;
      padding: 0.15rem 0 0.1rem 0;
      font-size: 0.14rem;
      div:nth-child(2) {
        margin-left: 0.05rem;
      }
      div {
        text-align: center;
        width: 24%;
        float: left;
        text-overflow: ellipsis; /*让截断的文字显示为点点。还有一个值是clip意截断不显示点点*/
        white-space: nowrap; /*让文字不换行*/
        overflow: hidden; /*超出要隐藏*/
      }
    }
    .orlist {
      font-size: 0.14rem;
      overflow: hidden;
      div:nth-child(1) {
        margin-left: 0.05rem;
      }
      div {
        text-align: center;
        width: 24%;
        float: left;
        text-overflow: ellipsis; /*让截断的文字显示为点点。还有一个值是clip意截断不显示点点*/
        white-space: nowrap; /*让文字不换行*/
        overflow: hidden; /*超出要隐藏*/
        img {
          width: 0.24rem;
          height: 0.24rem;
          border-radius: 50%;
        }
      }
    }
  }
  .nolist {
    position: absolute;
    top: 2.3rem;
    width: 3.75rem;
    text-align: center;
    p {
      font-size: 15px;
      font-family: HiraginoSansGB-W3, HiraginoSansGB;
      font-weight: normal;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
<style lang="less">
.van-field__control {
  color: rgba(255, 255, 255, 1) !important;
}
.van-field__left-icon {
  color: rgba(255, 255, 255, 1) !important;
  margin-top: -0.01rem;
}
////////////////////////////////////////
.van-picker,
.van-datetime-picker,
.van-picker__confirm:active,
.van-picker__cancel:active {
  background: @contcolor;
}
.van-picker-column__item {
  color: white;
}
.van-picker__mask {
  background-image: linear-gradient(180deg, #373968, #373968),
    linear-gradient(0deg, #373968, #373968);
  opacity: 0.77;
}
.van-hairline-unset--top-bottom,
.van-picker__frame {
  background: @btn2;
  color: white;
  opacity: 0.1;
}
</style>