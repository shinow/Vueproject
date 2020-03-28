<template>
  <div class="payalicode">
    <header>
      <img @click="goback()" src="../../assets/img/fanhu.png" alt />
      <span>元闪付收款码</span>
    </header>
    <div class="Co">
      <van-button type="primary" size="large">点击上传云闪付收款码</van-button>
      <van-uploader
        :after-read="afterRead"
        preview-size="3.7rem"
        style="overflow:hidden;height:0.5rem;border:1px solid red"
      />
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="Clads">
        <div class="geren" v-for="(item,index) in datas" :key="index">
          <div class="upimg">
            <img :src="item.imageUrl" alt />
          </div>
          <div class="rioimg">
            <p>{{item.typeCode}}</p>
            <div class="marnkS">备注：{{item.name}}</div>
            <p style="font-size:0.16rem;">
              {{item.typeCode}}状态：
              <span :style="{color:item.color}">{{item.status}}</span>
            </p>
            <div class="Chimg">
              <van-button type="warning" @click="changee(item)" style="width:100%">修改</van-button>
            </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>
    <van-dialog v-model="show" @confirm="Sconfirm" @cancel="cancelD" show-cancel-button>
      <div style="text-align: center" class="imll">
        <p style="font-size:0.2rem;margin-top:0.1rem;display:none">{{Updacode}}</p>
        <p style="font-size:0.2rem;margin-top:0.1rem">{{Wcode}}</p>
        <img style="width:2rem;height:2rem;margin:0.1rem 0" :src="Shimg" />
        <van-uploader preview-size="1.7rem" :after-read="afterRead" />

        <input
          type="text"
          style="width:3rem;height:0.5rem;margin:0.1rem 0; border:1px solid white; border-radius:0.2rem;text-align: center"
          v-model="nameA"
          placeholder="请输入二维码备注名称"
        />
      </div>
    </van-dialog>
  </div>
</template>
<script>
import { Loading } from "element-ui";
let loadingInstance;
export default {
  name: "Flashcode",
  data() {
    return {
      //刷新
      isLoading: false,
      Tyimg: true,
      Di: false,
      titleS: "",
      Updacode: "上传二维码",
      Sparams: "",
      Shimg: "",
      show: false,
      status: "",
      Imgid: "",
      Wcode: "2",
      options: [
        {
          value: 2,
          label: "云闪付个码"
        }
      ],
      nameA: "",
      code: 1,
      url: "",
      checked: true,
      datas: [],
      irow: "",
      id: "",
      mydatas: []
    };
  },
  created() {},
  mounted() {
    //  this.init();
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.init();
      }, 500);
    },
    openFullScreen2() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        mask: true,
        message: "加载中..."
      });
    },
    init() {
      this.Http.post("/api/cjtpay-commercial-web/account/lists", {
        code: 2
      }).then(data => {
        if (data.httpCode == 0) {
          this.datas = data.data;
          console.log(data);
          this.datas.forEach((item, index) => {
            item.color = "white";
            if (item.typeCode == "0") {
              item.typeCode = "支付宝个码";
            } else if (item.typeCode == "1") {
              item.typeCode = "微信个码";
            } else if (item.typeCode == "2") {
              item.typeCode = "云闪付个码";
            } else if (item.typeCode == "3") {
              item.typeCode = "支付宝商码";
            } else if (item.typeCode == "4") {
              item.typeCode = "微信商码";
            }
            if (
              item.status === "" ||
              item.status == undefined ||
              item.status == null
            ) {
              item.status = "关闭";
            }
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
      });
    },
    goback() {
      this.$router.go(-1);
    },
    changee(row) {
      console.log(row);
      this.Updacode = "修改二维码";
      this.show = true;
      this.Sparams = "";
      this.Di = true;
      this.Shimg = row.imageUrl;
      this.Wcode = row.typeCode;
      this.nameA = row.name;
      this.Imgid = row.id;
      this.Tyimg = false;
    },
    cancelD() {
      this.Updacode = "上传二维码";
      this.Di = false;
    },
    Sconfirm() {
      this.Wcode = 2;
      console.log(this.Wcode);
      if (this.nameA === "") {
        this.$toast("请输入备注信息！");
        return;
      }
      if (this.Wcode === "") {
        this.$toast("请选择类型！");
        return;
      }
      if (this.Updacode == "上传二维码") {
        this.Tyimg = true;
        this.axios
          .post("/api/cjtpay-commercial-web/upload/fileCode", this.Sparams, {
            headers: { "Content-Type": "multipart/form-data" }
          })
          .then(res => {
            if (res.httpCode == 0) {
              this.Http.post("/api/cjtpay-commercial-web/account/adds", {
                code: this.Wcode,
                url: res.fileNames["0"],
                remark: res.url,
                name: this.nameA
              }).then(data => {
                this.$toast("二维码上传成功！");
                this.init();
              });
            } else {
              this.$toast(res.msg);
            }
          });
      } else {
        this.Updacode = "上传二维码";
        if (this.Wcode == "云闪付个码") {
          this.Wcode = "2";
        }
        if (
          this.Sparams === "" ||
          this.Sparams == null ||
          this.Sparams == undefined
        ) {
          var pay = {
            code: this.Wcode,
            id: this.Imgid,
            name: this.nameA
          };
          this.Http.post("/api/cjtpay-commercial-web/account/update", pay).then(
            data => {
              this.$toast("修改成功！");
              this.Updacode = "上传二维码";
              this.Di = false;
              this.init();
            }
          );
          return;
        }
        this.axios
          .post("/api/cjtpay-commercial-web/upload/fileCode", this.Sparams, {
            headers: { "Content-Type": "multipart/form-data" }
          })
          .then(res => {
            pay = {
              code: this.Wcode,
              id: this.Imgid,
              url: res.fileNames["0"],
              remark: res.url,
              name: this.nameA
            };
            if (res.httpCode == 0) {
              this.Http.post(
                "/api/cjtpay-commercial-web/account/update",
                pay
              ).then(data => {
                this.$toast("修改成功！");
                this.Updacode = "上传二维码";
                this.Di = false;
                this.init();
              });
            } else {
              this.$toast(res.msg);
            }
          });
      }
    },
    Colors() {
      this.nameA = "";
    },
    afterRead(file) {
      if (file && file.file) {
        let params = new FormData();
        params.append("file", file.file);

        this.show = true;
        console.log(this.Updacode);

        this.Shimg = "";
        this.Tyimg = true;

        this.Shimg = file.content;
        console.log(file);
        this.Sparams = params;
        if (this.Updacode == "修改二维码") {
          this.Tyimg = false;
        } else {
          this.Wcode = "";
          this.nameA = "";
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
img[src=""],
img:not([src]) {
  opacity: 0;
}
.van-dialog {
  background: @contcolor;
  color: white;
  input {
    background: transparent;
  }
  input::-webkit-input-placeholder {
    color: white;
  }
}
.payalicode {
  width: 3.75rem;
  height: 100vh;
  background: @bc;
  overflow: auto;
  .Co {
    padding-top: 0.7rem;
    overflow: hidden;
    .van-uploader {
      float: left;
      opacity: 0;
      margin-top: -0.5rem;
    }
  }
  .Clads {
    position: relative;
    z-index: 3;
    margin-bottom: 0.6rem;
  }
  .geren {
    position: relative;
    z-index: 2;
    margin: 0 auto;
    width: 3.5rem;
    margin-top: 0.15rem;
    margin-bottom: 0.2rem;
    background: @contcolor;
    box-shadow: 0px 0.03rem 0.18rem 0px rgba(1, 1, 1, 0.21);
    border-radius: 0.05rem;
    overflow: hidden;
    color: white;
    .upimg {
      height: 1.5rem;
      width: 1.6rem;
      float: left;
      // margin-top: -0.59rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .rioimg {
      font-size: 0.18rem;
      width: 50%;
      margin: 0.05rem;
      // border: 1px solid red;
      float: left;
      p:nth-child(1) {
        margin: 0.1rem 0;
      }
      p:nth-child(3) {
        margin: 0.1rem 0;
      }
      .marnkS {
        color: red;
        // border: 1px solid red;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .Chimg {
        overflow: hidden;
      }
    }
  }
  .imll {
    .van-uploader {
      float: left;
      margin-left: 0.75rem;
      height: 1rem;
      opacity: 0;
      margin-top: -1.98rem;
    }
  }
}
</style>