<template>
  <div style=" overflow: hidden;">
    <header>
      <img @click="goback()" src="../assets/img/fanhui-2.png" alt />
      <span>任务详情</span>
    </header>
    <div class="cont1">
      <div class="open">
        <p>
          1.点击打
          <span>开淘宝店铺</span>生成朋友代付口令
        </p>
        <p>(提示:查看如何生成代付口令)</p>
      </div>
      <div class="upkou">
        <p>2.上传朋友代付口令</p>
        <input type="text" />
        <button @click="tijiao()">{{entert}}</button>
      </div>
      <div class="pp1">
        <p>3.添加商品收货地址</p>
        <span @click="jiajia()">{{name1}}</span>
        <span @click="jiajia()">{{name2}}</span>
        <span @click="jiajia()">{{name3}}</span>
        <!-- <span>{{carmodel[1]["name"]}}</span><span>{{carmodel[2]["name"]}}</span> -->
        <button @click="okk()">确定</button>
      </div>
    </div>
    <div class="tail1">
      <van-count-down class="a1" :time="time" format="mm:ss " />
      <p>任务剩余时间</p>
      <button>进行中</button>
    </div>
    <div class="addr" v-if="addr">
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
  </div>
</template>
<script>
import areaList from "../../static/area.js";
export default {
  name: "tbdetauls",
  data() {
    return {
      time: 10.3 * 60 * 1000,
      areaList,
      entert: "提交",
      searchResult: [],
      // carmodel:[],
      addr: false,
      name1: "省▾",
      name2: "市▾",
      name3: "区▾"
    };
  },
  created() {
    console.log();
  },
  methods: {
    okk() {
      this.addr = false;
    },
    jiajia() {
      this.addr = true;
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
      this.name1 = value[0]["name"];
      this.name2 = value[1]["name"];
      this.name3 = value[2]["name"];
      // this.carmodel = value;
    },
    tijiao() {
      this.entert = "审核中";
    },
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.pp1 {
  margin: 0.2rem 0 0rem 0.2rem;
  span {
    overflow: hidden;

    white-space: nowrap;

    text-overflow: ellipsis;
    border-radius: 0.07rem;
    text-align: center;
    margin: 0.12rem 0 0.2rem 0.1rem;
    float: left;
    border: 0.001rem solid gray;
    width: 0.6rem;
    height: 0.3rem;
    line-height: 0.3rem;
    color: gray;
  }
  button {
    border-radius: 0.07rem;
    text-align: center;
    margin: 0.12rem 0 0 0.1rem;
    float: left;
    border: 0.001rem solid gray;
    width: 0.6rem;
    height: 0.3rem;
    line-height: 0.3rem;
    color: white;
    background: rgba(66, 124, 245, 1);
    box-shadow: 0.01rem 0.003rem 0.07rem 0 rgba(66, 124, 245, 1);
  }
}
.addr {
  width: 3.75rem;
  position: absolute;
  bottom: 0;
}
.cont1 {
  width: 3.4rem;
  overflow: hidden;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0.03rem 0.27rem 0 rgba(2, 84, 254, 0.17);
  border-radius: 0.1rem;
  margin: 0.7rem 0 0.5rem 0.17rem;
  .open {
    // margin-top: 2rem;
    padding: 0.3rem 0 0 0.2rem;
    span {
      background: rgba(255, 130, 70, 1);
      border-radius: 0.04rem;
      color: white;
      margin: 0 0.05rem;
      font-size: 0.13rem;
      padding: 0.06rem 0.065rem;
    }
    p:nth-child(2) {
      margin: 0.12rem 0 0 0.05rem;
    }
  }
  .upkou {
    margin: 0.25rem 0 0rem 0.2rem;
    input {
      margin: 0.12rem 0 0 0.15rem;
      border: 0.01rem solid rgba(81, 81, 81, 1);
      background-color: #fff;
    }
    button {
      color: white;
      background: rgba(66, 124, 245, 1);
      box-shadow: 0.01rem 0.003rem 0.07rem 0 rgba(66, 124, 245, 1);
      border-radius: 0.03rem;
      padding: 0.06rem 0.12rem;
      font-size: 0.13rem;
      margin-left: 0.07rem;
    }
  }
}
.tail1 {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0 0.29rem 0 rgba(64, 64, 64, 0.13);
  height: 0.89rem;
  width: 3.75rem;
  position: absolute;
  bottom: 0;
  left: 0;
  .a1 {
    font-family: PingFang;
    font-weight: bold;
    color: rgba(227, 1, 1, 1);
    font-size: 0.35rem;
    float: left;
    margin: 0.22rem 0 0 0.39rem;
  }
  p {
    font-size: 0.1rem;
    font-family: PingFang;
    font-weight: 500;
    color: rgba(144, 147, 153, 1);
    float: left;
    margin: 0.55rem 0 0rem -0.67rem;
  }
  button {
    width: 0.89rem;
    height: 0.42rem;
    background: rgba(160, 160, 160, 1);
    border-radius: 0.04rem;
    float: right;
    margin: 0.2rem 0.3rem 0 0;
    color: white;
    font-size: 0.19rem;
  }
}
</style>