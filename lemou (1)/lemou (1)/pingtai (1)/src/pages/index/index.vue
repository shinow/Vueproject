<template>
  <el-container id="top">
    <el-header height="70px" class="banner">
      后台管理系统
      <ul class="pull-right">
        <li>
          <i class="iconfont icon-shezhi"></i>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link" style="color: #fff;cursor: pointer;">
              设置
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="editPass = true">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="signOut = true">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li>|</li>
        <li>
          欢迎
          <span class="sizer">{{userName}}</span>
        </li>
      </ul>
    </el-header>
    <el-container class="bottom">
      <asideMenu class="pull-left" />
      <div class="main">
        <div class="top">
          <i
            @click="toggle()"
            class="hanbao iconfont icon-suojin"
            :class="{'icon-active':$store.state.common.isCollapse}"
          ></i>
          <tag />
        </div>
        <div class="main-content">
          <transition name="fade-transverse">
            <router-view class="views"></router-view>
          </transition>
        </div>
      </div>
    </el-container>
    <el-dialog title="提示" :visible.sync="editPass" width="300px">
      <el-form ref="form" :model="updaPass" :rules="addRules">
        <el-form-item label="请输入原密码" prop="oldpassword">
          <el-input size="small" type="password" v-model="updaPass.oldpassword"></el-input>
        </el-form-item>
        <el-form-item label="请输入新密码" prop="newpassword">
          <el-input size="small" type="password" v-model="updaPass.newpassword"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editPass = false">取 消</el-button>
        <el-button type="primary" @click="editPassData">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="signOut" width="300px">
      <span>您确认退出此系统吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="signOut = false">取 消</el-button>
        <el-button type="primary" @click="logOut">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="请先扫描绑定谷歌验证码"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :show-close="false"
    >
      <div style="text-align: center;">
        <!-- <span style="font-Size:20px">扫描二维码获取谷歌验证码</span> -->
        <div id="qrcode" style="margin: 0 auto;text-align: center;display: inline-block"></div>
      </div>
      <div style="text-align: center;margin-top:20px">
        <span>谷歌验证码：</span>
        <el-input style="width:220px" v-model="Codu" placeholder="请输入谷歌验证码"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisibl">绑 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<script>
import QRCode from "qrcodejs2"; // 引入qrcode
import tag from "./tags";
import asideMenu from "./menu";
import { user, signOutData, editpass, uuserCode, ubindingCode } from "@/api";
export default {
  data() {
    return {
      Codu: "",
      ZOde: "",
      flag: false,
      dialogVisible: false,
      userName: "",
      editPass: false,
      signOut: false,
      updaPass: {
        newpassword: "",
        oldpassword: ""
      },
      addRules: {
        oldpassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度最少为6位", trigger: "blur" }
        ],
        newpassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度最少为6位", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    tag,
    asideMenu
  },
  methods: {
    handleClose() {
      if (this.ZOde == "" || this.ZOde == null || this.ZOde == undefined) {
        this.$message.error("请输入谷歌验证码！");
      }
    },
    dialogVisibl() {
      ubindingCode("" + this.Codu).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data);
          this.dialogVisible = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    Useo() {
      uuserCode().then(res => {
        if (res.data.httpCode == 0) {
          if (!this.flag) {
            window.setTimeout(function() {
              new QRCode(
                document.getElementById("qrcode"),
                res.data.data // 二维码地址
              );
            }, 200);
            this.flag = true;
          }
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    toggle() {
      this.$store.commit("SET_COLLAPSE");
    },
    getUser() {
      user().then(res => {
        this.userName = res.data.data.userName;
        this.ZOde = res.data.data.code;
        if (
          res.data.data.code == "" ||
          res.data.data.code == null ||
          res.data.data.code == undefined
        ) {
          this.dialogVisible = true;
          this.Useo();
        }
      });
    },
    logOut() {
      signOutData().then(res => {
        this.signOut = false;
        this.$router.push({ path: "/login" });
      });
    },
    editPassData() {
      if (this.updaPass.newpassword.length < 6) {
        this.$message("密码长度最少为6位");
        return;
      }
      editpass(this.updaPass).then(res => {
        if (res.data.httpCode == 0) {
          this.editPass = false;
          this.$message({
            message: "请重新登录",
            type: "warning"
          });
          signOutData().then(res => {
            this.$router.push({ path: "/login" });
          });
        }
      });
    }
  },
  created() {
    this.getUser();
  }
};
</script>
<style lang="less">
.banner {
  line-height: 70px;
  background: rgba(56, 71, 98, 1);
  // background-color: #367be4;
  color: #fff;
  padding: 0px 20px;
  font-size: 20px;
  font-weight: 550;
  img {
    vertical-align: middle;
    margin-right: 12px;
  }
  .pull-right {
    margin-right: 12px;
    li {
      float: left;
      font-size: 14px;
      font-weight: normal;
      margin-left: 20px;
      i {
        margin-right: 6px;
        font-size: 14px;
      }
      .item .el-badge__content.is-dot {
        width: 3px;
        height: 3px;
        top: 32px;
        left: 3px;
      }
      .sizer {
        font-size: 16px;
      }
      .el-dropdown {
        height: 50px;
      }
    }
  }
}
.bottom {
  position: absolute;
  top: 70px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  .main {
    width: 100%;
    // height: 100%;
    // background-color: #FFF;
    // overflow: hidden;
    position: relative;
    .top {
      position: relative;
      padding-left: 48px;
      border-bottom: 1px solid #bfbfbf;
      .hanbao {
        position: absolute;
        left: 0px;
        width: 48px;
        height: 42px;
        line-height: 42px;
        text-align: center;
        color: #367be4;
        margin-right: -12px;
        cursor: pointer;
        &.icon-active {
          transform: rotate(180deg);
        }
      }
    }
    .main-content {
      position: absolute;
      top: 52px;
      left: 20px;
      bottom: 10px;
      right: 20px;
      background-color: #fff;
      .views {
        width: 100%;
        height: 100%;
      }
      .fade-transverse-leave-active,
      .fade-transverse-enter-active {
        transition: all 0.5s;
      }
      .fade-transverse-enter {
        opacity: 0;
        transform: translateX(-30px);
      }
      .fade-transverse-leave-to {
        opacity: 0;
        transform: translateX(30px);
      }
    }
  }
}
</style>
