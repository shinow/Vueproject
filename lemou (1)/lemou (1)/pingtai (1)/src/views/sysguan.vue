<template>
  <div class="sysguan">
    <div class="wrap">
      <ul>
        <li>
          <span>账号：</span>
          <el-input
            size="small"
            style="width:160px;margin-left:53px"
            v-model="accountt"
            placeholder="请输入账号"
          ></el-input>
        </li>
        <li>
          <span>密码：</span>
          <el-input
            size="small"
            style="width:160px;margin-left:53px"
            v-model="password"
            placeholder="初始密码123456"
          ></el-input>
        </li>
        <li>
          <span>姓名：</span>
          <el-input
            size="small"
            style="width:160px;margin-left:53px"
            v-model="name"
            placeholder="请输入内容"
          ></el-input>
        </li>
        <li>
          <span>角色：</span>
          <el-select
            style="width:160px;margin-left:53px"
            v-model="value1"
            size="small"
            placeholder="请选择角色"
          >
            <el-option
              v-for="item in optionss"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </li>
        <li>
          <span>状态：</span>
          <el-select
            style="width:160px;margin-left:53px"
            v-model="value"
            size="small"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </li>
      </ul>
      <button @click="Preservation()">保存</button>
    </div>
  </div>
</template>
<script>
import { UcreateUserRole, Rolist } from "@/api";
export default {
  name: "sysguan",
  data() {
    return {
      value: "",
      name: "",
      accountt: "",
      password: "",
      options: [
        {
          value: 1,
          label: "开启"
        },
        {
          value: 0,
          label: "关闭"
        }
      ],
      input: "",
      value1: "",
      optionss: []
    };
  },
  created() {
    this.Administrators();
  },
  methods: {
    Preservation() {
      if (
        this.accountt === "" ||
        this.password === "" ||
        this.value === "" ||
        this.value1 === "" ||
        this.name === ""
      ) {
        this.$message.warning("请输入对应内容！");
        return;
      }
      let par = {
        account: this.accountt,
        password: this.password,
        locked: this.value,
        roleId: this.value1,
        userName: this.name
      };
      UcreateUserRole(par).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data.data);
          this.$router.go(-1);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    Administrators() {
      let par = {
        pageNum: this.current,
        pageSize: this.size
      };
      Rolist(par).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data);
          this.optionss = res.data.data;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.sysguan {
  // height: 100vh;
  overflow: hidden;
  .head {
    margin: 20px 0 0 73px;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(24, 24, 24, 1);
  }
  .wrap {
    margin: 60px 0 0 423px;
    width: 613px;
    height: 577px;
    border: 1px solid rgba(112, 112, 112, 1);
    border-radius: 16px;
    ul {
      margin: 0 0 0 116px;
      font-size: 24px;
      font-family: Songti SC;
      font-weight: 400;
      color: rgba(71, 70, 70, 1);
      li {
        margin-top: 30px;
      }
    }
    button {
      margin: 76px 0 0 187px;
      width: 238px;
      height: 58px;
      background: rgba(71, 212, 185, 1);
      border-radius: 4px;
      font-size: 24px;
      font-family: Songti SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>