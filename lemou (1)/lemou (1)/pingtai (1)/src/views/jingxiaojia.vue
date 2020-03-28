 <template>
  <div class="jingxiaojia">
    <div class="head">
      <span @click="distributor()">经销商列表 /</span>
      <span>新增</span>
    </div>
    <div class="cont">
      <ul>
        <li>
          <span>姓名：</span>
          <el-input style="width:200px" @blur.prevent="name1(name)" v-model="name" placeholder="请输入内容"></el-input>
        </li>
        <li>
          <span>账号：</span>
          <el-input style="width:200px" @blur.prevent="account1(account)" v-model="account" placeholder="请输入内容"></el-input>
        </li>
        <li>
          <span>提成：</span>
          <el-input v-model="rating"  @blur.prevent="rating1(rating)"  style="width:200px" placeholder="请输入内容"></el-input>
        </li>
        <li>
          <span>密码：</span>
          <el-input v-model="password" @blur.prevent="password1(password)"  style="width:200px" placeholder="请输入内容"></el-input>
        </li>
        <li>
          <span>权重：</span>
          <el-input style="width:200px" v-model="weight" @blur.prevent="weight1(weight)" placeholder="请输入内容"></el-input>
        </li>
        <li>
          <span>状态：</span>
          <el-select
            v-model="value1"
            size="small"
            style="width:200px"
            @change="chenge(value1)"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in optionss"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </li>
        <li>
          <span>描述：</span>
          <el-input style="width:200px" v-model="remark" placeholder="请输入内容"></el-input>
        </li>
      </ul>
      <button @click="added()">确认新增</button>
    </div>
  </div>
</template>
<script>
import { Deadd } from "@/api";
export default {
  name: "jingxiaojia",
  data() {
    return {
      account: "", //账户
      locked: "", //是否锁定（0锁定；1未锁定）
      password: "", //密码  不填写默认为0
      name: "", //账户名称
      remark: "", //备注信息
      weight: "", //权重
      value1: "",
      input: "",
      repeat:true,
      rating:"",
      optionss: [
        {
          value: 1,
          label: "开启"
        },
        {
          value: 0,
          label: "关闭"
        }
      ]
    };
  },
  created() {},
  methods: {
    weight1(val){
       if (val==="") {
        val ="";
         this.$message.warning("请输入权重！");
         this.weight=val
      }
    },
    password1(val){
      if (val==="") {
        val ="";
         this.$message.warning("请输入密码！");
         this.password=val
      }
    },
    name1(val){
      if (val==="") {
        val ="";
         this.$message.warning("请输入姓名！");
         this.name=val
      }
    },
    account1(val){
       if (val==="") {
        val ="";
         this.$message.warning("请输入账号！");
         this.account=val
      }
    },
    rating1(val){
  if (val==="") {
        val ="";
         this.$message.warning("请输入提成！");
         this.rating=val
      }
    },
    chenge(vla) {
      if (val==="") {
         this.$message.warning("请选择状态哦！");
      }
    },
    added() {
      if (this.name === "" || this.account===""||this.password==="") {
         this.$message.warning("请输入对应的内容！"); 
         return
      }
      if (this.repeat==true) {
          this.repeat=false
        let par = {
        account: this.account,
        locked: this.value1,
        password: this.password,
        name: this.name,
        rating:this.rating,
        remark: this.remark,
        weight: Number(this.weight)
      };
      Deadd(par).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res);
          this.repeat=true
          this.$router.push({
            name: "distributor",
            id:  this.$route.query.yemian
          });

        }else{
            this.$message(res.data.msg)
        }
      });
      }
    },
    distributor() {
      this.$router.push({
        name: "distributor",
        query:{
           id:  this.$route.query.yemian
        }
      });
    },
  }
};
</script>
<style lang="less" scoped>
.jingxiaojia {
  overflow: hidden;
  .head {
    margin: 20px;
    margin-left: 72px;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(24, 24, 24, 1);
  }
  .cont {
    margin: 50px 0 0 300px;
    width: 633px;
    // height: 538px;
    border: 1px solid rgba(112, 112, 112, 1);
    border-radius: 16px;
    ul {
      padding-left: 190px;
      // padding-top: 30px;
      li {
        margin-top: 30px;
        span {
          // float: left;
          font-size: 20px;
          font-family: Songti SC;
          font-weight: 400;
          color: rgba(35, 35, 35, 1);
        }
        input {
          background: rgba(247, 247, 247, 1);
          height: 50px;
          margin-left: 20px;
          // width: 70%;
          font-size: 20px;
          font-family: Songti SC;
          font-weight: 400;
          color: rgba(81, 81, 81, 1);
          text-align: center;
        }
      }
    }
    button {
      width: 196px;
      height: 49px;
      background: rgba(71, 212, 185, 1);
      border-radius: 6px;
      // width: 119px;
      // height: 32px;
      font-size: 18px;
      font-family: Songti SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      // background: rgba(71, 212, 185, 1);
      // border-radius: 4px;
      text-align: center;
      margin: 50px 235px;
    }
  }
}
</style>