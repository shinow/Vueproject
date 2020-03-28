<template>
  <div class="clbbz">
    <div class="head">
      <span @click="commoditylb()">商品列表 /</span>
      <span>编辑</span>
    </div>
    <div class="cont">
      <ul>
        <li>
          <span>图片：</span>
          <div class="tutu">
            <el-upload
              class="avatar-uploader"
              :action="doup"
              multiple: false
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </li>
        <li>
          <span>名称：</span>
          <el-input
            size="small"
            style="width:200px;margin-left:80px"
            v-model="Pname"
            placeholder="请输入内容"
          ></el-input>
        </li>
        <li>
          <span>数量：</span>
          <el-input
            size="small"
            style="width:200px;margin-left:80px"
            v-model="Pnum"
            placeholder="请输入内容"
          ></el-input>
        </li>
        <li>
          <span>售货价格：</span>
          <el-input
            size="small"
            style="width:200px;
                margin-left:32px"
            v-model="Psell"
            placeholder="请输入内容"
          ></el-input>
        </li>
        <li>
          <span>状态：</span>
          <el-select
            style="width:200px;margin-left:80px"
            v-model="value2"
            size="small"
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
      </ul>
      <button @click="xiugai()">确认修改</button>
    </div>
  </div>
</template>
<script>
import { Commupdate, Commdetail, Commstatus } from "@/api";
export default {
  name: "clbbz",
  data() {
    return {
      repeat: true,
      doup: "http://47.52.240.147:8090/cjtpay-system-web/upload/file",
      // input: "",
      imageUrl: "", //图片地址
      id: "",
      // imageUrl:"",
      num: "",
      Pname: "1", //
      Pnum: "",
      Psell: "",
      input: "",
      sellPrice: "",
      name: "",
      datas: "",
      value: true,
      value2: "",
      optionss: [
        {
          value: 0,
          label: "开启"
        },
        {
          value: 1,
          label: "关闭"
        }
      ]
    };
  },
  created() {
    this.id = this.$route.query.ids;
    this.Administrators();
  },
  methods: {
    handleAvatarSuccess(res, file) {
      if(res.httpCode==0){
        console.log(res)
        this.imageUrl = file.response.fileNames[0];
      }else{
          this.$message.error(res.msg);
      }
      // console.log(res, file)
      // // this.imageUrl = URL.createObjectURL(file.raw);
      // if (
      //   file.response.fileNames == "" ||
      //   file.response.fileNames == null ||
      //   file.response.fileNames == undefined
      // ) {
      //   this.$message.error("网络异常");
      // } else {
      //   this.imageUrl = file.response.fileNames[0];
      // }
      // this.imageUrl = file.response.fileNames[0];
    },
    beforeAvatarUpload(file) {
      this.progressData = 0;
      var timer2 = setInterval(() => {
        this.progressData = this.progressData + 1;
        if (this.progressData >= 100) {
          clearInterval(timer2);
        }
      }, 200);
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message({
          type: "warning",
          message: "上传头像图片大小不能超过 5MB!",
          showClose: true
        });
      }
      return isLt5M;
    },
    xiugai() {
      if (
        this.id === "" ||
        this.value2 === "" ||
        this.imageUrl === "" ||
        this.Pname === "" ||
        this.Pnum === "" ||
        this.Psell === ""
      ) {
        this.$message.warning("请输入对应的内容！");
        return;
      }
      if (this.value2 == "关闭") {
        this.value2 = 1;
      } else if (this.value2 == "开启") {
        this.value2 = 0;
      }
      if (this.repeat == true) {
        let par = {
          id: this.id, //商品ID
          status: this.value2, //状态 0 下架 1 上架
          imagesUrl: this.imageUrl, //图片地址
          name: this.Pname, //商品名称
          num: this.Pnum, //数量
          sellPrice: this.Psell //单价
        };
        Commupdate(par).then(res => {
          if (res.data.httpCode == 0) {
            console.log(res);
            this.repeat = false;
            this.$router.push({
              name: "commoditylb"
            });
          }
        });
      }
    },
    change(val) {
      let par = {
        id: this.id,
        status: val
      };
      Commstatus().then(res => {
      });
    },
    Administrators() {
      Commdetail(this.id).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res);
          this.datas = res.data.data;
          this.Pname = this.datas.name;
          this.Pnum = this.datas.num;
          this.Psell = this.datas.sellPrice / 100;
          this.imageUrl = this.datas.imagesUrl;
          if (res.data.data.status == "0") {
            this.value2 = "开启";
          } else if (res.data.data.status == "1") {
            this.value2 = "关闭";
          }
        }
      });
    },
    commoditylb() {
      this.$router.push({
        name: "commoditylb"
      });
    }
    
  }
};
</script>
<style lang="less" scoped>
.clbbz {
  overflow: hidden;
  .head {
    margin-top: 20px;
    margin-left: 72px;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(24, 24, 24, 1);
  }
  .cont {
    margin: 30px 0 0 353px;
    width: 772px;
    height: 675px;
    border: 1px solid rgba(112, 112, 112, 1);
    border-radius: 16px;
    ul {
      font-size: 24px;
      font-family: Songti SC;
      font-weight: 400;
      color: rgba(71, 70, 70, 1);
      margin: 20px 0 0 197px;
      li:nth-child(1) {
        .tutu {
          width: 200px;
          height: 143px;
          background: rgba(210, 210, 210, 1);
          border-radius: 4px;
          // float: right;
          // border: 1px solid red;
          // margin-right: 150px;
          margin: -50px 0 0 160px;
        }
      }
      li {
        margin-top: 33px;
      }
      li:nth-child(2) {
        margin-top: 40px;
      }
    }
    button {
      margin: 54px 0 0 268px;
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
<style lang="less">
.avatar-uploader .el-upload {
  width: 205px;
  height: 143px;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  opacity: 0;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
