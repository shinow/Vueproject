<template>
  <div class="sysxinn">
    <div class="wrap">
      <div class="tou">
        <span>角色名称：</span>
        <el-input style="width:200px" v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="cont">
        <span>权限：</span>
        <div class="quan">
          <el-tree
            :data="data2"
            show-checkbox
            node-key="id"
            accordion
            ref="tree"
            highlight-current
            :props="defaultProps"
          ></el-tree>
        </div>
      </div>
      <button @click="getCheckedKeys">保存</button>
    </div>
  </div>
</template>
<script>
import { Madd, Mlist, Menuadd } from "@/api";
export default {
  name: "sysxinn",
  data() {
    return {
      input: "",
      data2: [],
      defaultProps: {
        children: "childList",
        label: "menuName"
      },
    };
  },
  created() {
    this.yes();
  },
  methods: {
    getCheckedKeys() {
      let Menu = {
        menuIds: this.$refs.tree.getCheckedKeys(),
        roleName: this.input
      };
      Menuadd(Menu).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res);
          this.$router.go(-1);
        }
      });
    },
    yes() {
      let par = {
        parentId: 0
      };
      Mlist(par).then(res => {
        if (res.data.httpCode == 0) {
          this.data2 = res.data.data;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.sysxinn {
  overflow: hidden;
  .head {
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(24, 24, 24, 1);
  }
  .tou {
    margin: 20px 0 0 188px;
    font-size: 18px;
    font-family: MicrosoftYaHei;
    color: rgba(44, 44, 44, 1);
    line-height: 22px;
  }
  .cont {
    width: 1000px;
    margin: 34px 0 0 188px;
    font-size: 18px;
    font-family: MicrosoftYaHei;
    color: rgba(44, 44, 44, 1);
    line-height: 22px;
    span {
      // float: left;
      // border: 1px solid red;
      width: 50px;
    }
    .quan {
      margin-left: 100px;
      margin-top: -22px;
      //  border: 1px solid red;
      // width: 900px;
    }
  }
  button {
    width: 244px;
    height: 48px;
    background: rgba(37, 118, 251, 1);
    border-radius: 6px;
    font-size: 20px;
    font-family: MicrosoftYaHei;
    color: rgba(255, 255, 255, 1);
    line-height: 24px;
    margin: 50px 0 50px 505px;
  }
}
</style>