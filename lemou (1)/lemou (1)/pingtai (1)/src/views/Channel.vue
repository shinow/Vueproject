<template>
  <div class="Channel">
    <ul>
      <li v-for="(item,index) in datak" :key="index">
        <span>{{item.name}}：</span>
        <el-input
          v-model="item.remark"
          @blur.prevent="changeCount(item.id,item.remark)"
          style="width:180px;float:right;margin-right:20px"
        ></el-input>
      </li>
      <el-button type="primary" @click="Xchange()">修改限额</el-button>
    </ul>
  </div>
</template>
<script>
import { diccList, Quupdate } from "@/api";
export default {
  name: "Channel",
  data() {
    return {
      datak: []
    };
  },
  created() {
    this.list();
  },
  methods: {
    list() {
      let par = {
        pageNum: 1,
        pageSize: 10,
        parentId: "1154274650443096066"
      };
      diccList(par).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data);
          this.datak = res.data.data;
        }
      });
    },
    changeCount(id, mak) {
    },
    Xchange() {
      // let this_ =this
      let arr = [];
      // console.log(this_)
      this.datak.forEach((item, index) => {
        let obj = {
          id: "",
          remark: ""
        };
        obj = {
          id: item.id,
          remark: item.remark
        };
        arr.push(obj);
      });
      let par = { vos: arr };
      Quupdate(par).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.Channel {
  overflow: hidden;
  ul {
    margin-left: 250px;
    li {
      width: 400px;
      // border: 1px solid red;
      margin-top: 40px;
      input {
        color: red;
        font-size: 20px;
        float: right;
        // margin-right: 60px;
        // margin-top: -5px;
      }
    }
    button {
      margin-top: 50px;
      margin-left: 30px;
    }
  }
}
</style>