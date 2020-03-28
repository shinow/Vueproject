<template>
  <div class="reflect">
    <div class="wrap">
      <div style="font-size:20px">
        <span style="margin-left:30px">经销商编号：</span>
        <el-input
          size="small"
          style="width:200px"
          @change="list()"
          @keyup.enter.native="list()"
          clearable
          v-model="COdealerCode"
          placeholder="请输入内容"
        ></el-input>
        <span style="margin-left:30px">状态：</span>
        <el-select
          style="width:160px"
          v-model="COstatus"
          @change="list()"
          size="small"
          placeholder="请选择状态"
        >
          <el-option
            v-for="item in optionsST"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span style="margin-left:30px">类型：</span>
        <el-select
          style="width:160px"
          v-model="COtype"
          @change="list()"
          size="small"
          placeholder="请选择类型"
        >
          <el-option
            v-for="item in optionsT"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="btn">
        <el-button
          @click="list()"
          type="primary"
          :icon="power.cha.iconcls"
          v-if="power.cha.permission"
        >{{power.cha.menuName}}</el-button>

        <el-button
          @click="XinZengkT()"
          type="warning"
          :icon="power.ADD.iconcls"
          v-if="power.ADD.permission"
        >{{power.ADD.menuName}}</el-button>
      </div>
    </div>
    <div class="details">
      <el-table style="width:100%" @row-click="showRow" :data="tableData" stripe border>
        <el-table-column prop="cardholder" label="持有人名称" align="center"></el-table-column>

        <el-table-column prop="bankName" label="账号名称" align="center" width="250">
          <template slot-scope="scope">
            <span v-if="scope.row.spana">{{scope.row.bankName}}</span>
            <!-- <img :src="scope.row.bankName" alt=""> -->
            <img
              v-if="scope.row.imgggg"
              @click="shijian(scope.row.bankName)"
              style="width:20px;height:20px"
              src="../assets/img/1573064444(1).jpg"
              alt
            />
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center"></el-table-column>
        <el-table-column prop="bankNo" label="账号" align="center" width="250"></el-table-column>
        <el-table-column label="操作状态" width="350" v-if="operation">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row,scope.row.id)"
              type="primary"
              size="small"
              :icon="power.modify.iconcls"
              v-if="power.modify.permission"
            >{{power.modify.menuName}}</el-button>

            <el-button
              @click="DehandleClick(scope.row,scope.row.id)"
              type="danger"
              size="small"
              :icon="power.Delete.iconcls"
              v-if="power.Delete.permission"
            >{{power.Delete.menuName}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="text-align:center;margin-top: 10px;">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <!-- --------------         添加------------ -->
    <div class="xinz">
      <el-dialog title="添加" :visible.sync="XinZeng" width="30%">
        <ul>
          <li v-if="Deale" style="margin-left:20px">
            <span>经销商ID:</span>
            <el-input style="width:160px" v-model="dealerCode"></el-input>
          </li>
          <li>
            <span>请选择状态:</span>
            <el-select style="width:160px" v-model="statusS" placeholder="请选择状态">
              <el-option
                v-for="item in CZtypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </li>
          <li>
            <span>请选择类型:</span>
            <el-select
              style="width:160px"
              v-model="valuebk"
              @change="changeBak(valuebk)"
              placeholder="请选择状态"
            >
              <el-option
                v-for="item in optionsb"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </li>
          <div v-show="yinh">
            <li style="margin-left:30px">
              <span>银行名称:</span>
              <el-input style="width:160px" v-model="TJbankName"></el-input>
            </li>
            <li style="margin-left:30px">
              <span>银行卡号:</span>
              <el-input style="width:160px" v-model="TJbankNo"></el-input>
            </li>
            <li style="margin-left:10px">
              <span>账户人名称:</span>
              <el-input style="width:160px" v-model="TJcardholder"></el-input>
            </li>
          </div>
          <div v-show="alip">
            <li style="margin-left:30px">
              <span style="margin-left:-140px">上传:</span>
              <div class="dddddd">
                <el-upload
                  class="avatar-uploader"
                  :action="doup"
                  :show-file-list="false"
                  multiple: false
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img  v-if="imageUrl" style="width:150px" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </li>
            <li style="margin-left:30px">
              <span>{{aliname}}账号:</span>
              <el-input style="width:160px" v-model="TJbankNo"></el-input>
            </li>
            <li style="margin-left:10px">
              <span>账户人名称:</span>
              <el-input style="width:160px" v-model="TJcardholder"></el-input>
            </li>
          </div>
        </ul>

        <span slot="footer" class="dialog-footer">
          <el-button @click="XinZeng = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisibleB">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- ----------------  修改------------------- -->
    <div class="xiangq">
      <el-dialog title="修改" :visible.sync="dialogVisible" width="30%">
        <ul>
          <li v-if="tuP">
            <span>上传:</span>
            <img :src="mimgA" style="width:150px;height:150px;margin:0px 0 0 10px" alt />
            <div class="aaaaa">
              <el-upload
                  class="avatar-uploader"
                  :action="doup"
                  :show-file-list="false"
                  multiple: false
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </li>
          <li v-if="hangP">
            <span>银行名称:</span>
            <el-input style="width:200px" v-model="Detail.bankName"></el-input>
          </li>
          <li>
            <span>{{Banklist}}:</span>
            <el-input style="width:200px" v-model="Detail.bankNo"></el-input>
          </li>
          <li v-if="Deale">
            <span>经销商ID:</span>
            <el-input style="width:200px" v-model="dealerCode"></el-input>
          </li>
          <li>
            <span>账户状态:</span>
            <el-select style="width:200px" v-model="Detail.status" placeholder="请选择状态">
              <el-option
                v-for="item in CZtypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </li>
          <li style="margin-right:20px">
            <span>持有人名称:</span>
            <el-input style="width:200px" v-model="Detail.cardholder"></el-input>
          </li>
        </ul>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisibleA()">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <div class="changgg" style="text-align: center;">
      <el-dialog :visible.sync="dialogVisiblebk" width="30%">
        <div style="margin:0 auto;text-align: center;">
          <img style="margin:0 auto;" :src="bankNameT" alt />
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  Balist,
  Badetail,
  userMenu,
  BankdealerCode,
  Dealist,
  Baupdate,
  Badelete,
  Baadd
} from "@/api";
export default {
  name: "routement",
  data() {
    return {
      ///api/cjtpay-commercial-web/upload/fileCode
      //47.56.80.83       47.52.240.147     47.90.59.167
      //http://47.90.59.167:8090/cjtpay-commercial-web/upload/fileCode
      doup: "http://47.90.59.167:8090/cjtpay-commercial-web/upload/fileCode",
      optionsST: [
        {
          value: null,
          label: "请选择状态"
        },
        {
          value: 0,
          label: "开启"
        },
        {
          value: 1,
          label: "关闭"
        }
      ],
      optionsT: [
        {
          value: null,
          label: "请选择类型"
        },
        {
          value: 0,
          label: "银行卡"
        },
        {
          value: 1,
          label: "支付宝"
        },
        {
          value: 2,
          label: "微信"
        }
      ],
      optionsb: [
        {
          value: 0,
          label: "银行卡"
        },
        {
          value: 1,
          label: "支付宝"
        },
        {
          value: 2,
          label: "微信"
        }
      ],
      TJbankName: "",
      repeat: true,
      TJbankNo: "",
      Banklist: "",
      COtype: "",
      COstatus: "",
      COdealerCode: "",
      aliname: "",
      mimgA: "",
      statusS: "",
      toP: "",
      tuP: "",
      hangP: "",
      Deale: false,
      dialogVisiblebk: false,
      valuebk: "",
      TJcardholder: "",
      dialogVisible: false,
      current: 1,
      size: 10,
      alip: "",
      value: "",
      mercCode: "",
      id: "",
      XinZeng: false,
      total: 0,
      CZtype: "",
      mercCode: "",
      dealerCode: "",
      tableData: [],
      Detail: "",
      bankNameT: "",
      imageUrl: "",
      yinh: "",
      power: {
        ADD: false,
        Delete: false,
        modify: false,
        cha: false
      },
      operation: true,
      CZtypes: [
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
    this.list();
  },
  mounted() {
    this.Cres();
    this.Concealment();
  },
  methods: {
    Concealment() {
      userMenu({
        menuType: 1,
        parentId: this.$route.query.id
      }).then(res => {
        var concea = res.data.data;
        concea.map(item => {
          if (item.permission == "sys.card.ADD") {
            this.power.ADD = item;
          } else if (item.permission == "sys.card.Delete") {
            this.power.Delete = item;
          } else if (item.permission == "sys.card.modify") {
            this.power.modify = item;
          } else if (item.permission == "sys.card.cha") {
            this.power.cha = item;
          }
        });
        if (this.power.Delete == false && this.power.modify == false) {
          this.operation = false;
        }
      });
    },
    Cres() {
      BankdealerCode().then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data);
          if (
            res.data.data == "" ||
            res.data.data == null ||
            res.data.data == undefined
          ) {
            this.Deale = true;
          } else {
            this.dealerCode = res.data.data;
          }
        }
      });
    },
    showRow(row) {
      this.bankNameT = row.bankName;
    },
    shijian() {
      this.dialogVisiblebk = true;
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      if(res.httpCode==0){
      this.$message.success("请求成功");
        this.imageUrl = file.response.fileNames[0];
        this.TJbankName = this.imageUrl;
        this.mimgA = this.imageUrl;
      }else{
          this.$message.error(res.msg);
      }
    },
    beforeAvatarUpload(file) {
      console.log(file)
      //  this.$message.warning('若上传图片无效，则是图片解析失败！');
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
    changeBak(val) {
      if (val == 0) {
        this.yinh = true;
        this.alip = false;
      } else if (val == 1) {
        this.yinh = false;
        this.alip = true;
        this.aliname = "支付宝";
      } else if (val == 2) {
        this.yinh = false;
        this.alip = true;
        this.aliname = "微信";
      }
    },
    //           **********************************修改
    dialogVisibleA() {
      this.Cres();
      if (this.tuP == true) {
        if (this.Detail.status == "开启") {
          this.Detail.status = "0";
        } else if (this.Detail.status == "关闭") {
          this.Detail.status = "1";
        }
        this.Detail.bankName = this.mimgA;
        let par = {
          dealerCode: this.dealerCode,
          bankName: this.Detail.bankName,
          bankNo: this.Detail.bankNo, //银行卡号
          cardholder: this.Detail.cardholder, //持卡人名称
          id: this.id,
          status: this.Detail.status
        };

        Baupdate(par).then(res => {
          if (res.data.httpCode == 0) {
            this.$message.success("修改成功");
            console.log(res.data.data);
            this.list();
            this.dialogVisible = false;
          } else {
            this.$message.error(res.data.msg);
          }
        });
      } else {
        if (this.Detail.status == "开启") {
          this.Detail.status = "0";
        } else if (this.Detail.status == "关闭") {
          this.Detail.status = "1";
        }
        if (this.Detail.bankNo === "" || this.Detail.cardholder === "") {
          this.$message.error("请输入对应的内容哦！");
          return;
        }
        let par = {
          dealerCode: this.dealerCode,
          bankName: this.Detail.bankName,
          bankNo: this.Detail.bankNo, //银行卡号
          cardholder: this.Detail.cardholder, //持卡人名称
          id: this.id,
          status: this.Detail.status
        };
        Baupdate(par).then(res => {
          if (res.data.httpCode == 0) {
            console.log(res.data.data);
            this.$message.success("修改成功");
            this.list();
            this.dialogVisible = false;
          } else {
            this.$message.error(res.data.msg);
          }
        });
      }
    },
    //           **********************************新增
    dialogVisibleB() {
      if (
        this.valuebk === "" ||
        this.TJbankName === "" ||
        this.TJbankNo === "" ||
        this.TJcardholder === "" ||
        this.statusS === ""
      ) {
        this.$message.warning("请输入对应内容！");
        return;
      }
      if (this.repeat == true) {
        this.repeat = false;
        let par = {
          dealerCode: this.dealerCode,
          status: this.statusS,
          type: this.valuebk,
          bankName: this.TJbankName, //银行名称
          bankNo: this.TJbankNo, //卡号
          cardholder: this.TJcardholder //账户人名称
        };
        Baadd(par).then(res => {
          if (res.data.httpCode == 0) {
            this.$message.success(res.data.msg);
            console.log(res.data.data);
            this.list();
            setTimeout(() => {
              this.repeat = true;
            }, 2000);
            this.XinZeng = false;
          } else {
            this.$message.error(res.data.msg);
            setTimeout(() => {
              this.repeat = true;
            }, 2000);
          }
        });
      }
    },
    XinZengkT() {
      this.Cres();
      this.mimgA = "";
      this.XinZeng = true;
      this.valuebk = "";
      this.imageUrl = "";
      this.TJbankName = "";
      this.TJbankNo = "";
      this.statusS="";
      this.TJcardholder = "";
      this.dealerCode = "";
    },
    ///////查看详情
    handleClick(row, ID) {
      // if (this.Detail.status == "0") {
      //         this.Detail.status = "开启";
      //       } else if (this.Detail.status == "1") {
      //         this.Detail.status = "关闭";
      //       }
      if (row.type == "银行卡") {
        this.Banklist = "银行卡号";
      } else if (row.type == "支付宝") {
        this.Banklist = "支付宝账号";
      } else if (row.type == "微信") {
        this.Banklist = "微信账号";
      }
      if (row.bankName.search("http://")) {
        this.dialogVisible = true;
        this.id = ID;
        this.hangP = true;
        this.tuP = false;
        Badetail(ID).then(res => {
          if (res.data.httpCode == 0) {
            console.log(res.data.data);
            this.Detail = res.data.data;
            this.mimgA = this.Detail.bankName;
            this.dealerCode = this.Detail.dealerCode;
            if (this.Detail.status == "0") {
              this.Detail.status = "开启";
            } else if (this.Detail.status == "1") {
              this.Detail.status = "关闭";
            }
          } else {
            this.$message.error(res.data.msg);
          }
        });
      } else {
        this.id = ID;
        this.dialogVisible = true;
        this.tuP = true;
        this.hangP = false;
        Badetail(ID).then(res => {
          if (res.data.httpCode == 0) {
            console.log(res.data.data);
            this.Detail = res.data.data;
            this.mimgA = this.Detail.bankName;
            this.dealerCode = this.Detail.dealerCode;
            if (this.Detail.status == "0") {
              this.Detail.status = "开启";
            } else if (this.Detail.status == "1") {
              this.Detail.status = "关闭";
            }
          } else {
            this.$message.error(res.data.msg);
          }
        });
      }
    },
    DehandleClick(row, ID) {
      this.$confirm("是否删除该归集卡?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Badelete(ID).then(res => {
            if (res.data.httpCode == 0) {
              this.$message.success(res.data.msg);
              console.log(res.data.data);
              this.list();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    changeZT(val) {
      this.CZtype = val;
    },
    list() {
      let par = {
        pageNum: this.current,
        pageSize: this.size,
        type: this.COtype, //    类型 0 银行卡  1 支付宝 2 微信
        status: this.COstatus, //   状态  0 开启  1 关闭
        dealerCode: this.COdealerCode //  经销商编号
      };
      Balist(par).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data);
          this.tableData = res.data.data;
          this.total = Number(res.data.total);
          this.tableData.forEach((item, index) => {
            item.spana = "";
            item.imgggg = "";
            if (item.bankName.search("http://")) {
              item.spana = true;
              item.imgggg = false;
            } else {
              item.spana = false;
              item.imgggg = true;
            }
            if (item.type == "0") {
              item.type = "银行卡";
            } else if (item.type == "1") {
              item.type = "支付宝";
            } else if (item.type == "2") {
              item.type = "微信";
            }
            if (item.status == "0") {
              item.status = "开启";
            } else if (item.status == "1") {
              item.status = "关闭";
            }
            // item.bankName==
          });
        }
      });
    },
    handleSizeChange(val) {
      this.size = val;
      this.current = 1;
      this.list();
    },
    handleCurrentChange(val) {
      this.current = val;
      this.list();
    }
  }
};
</script>
<style lang="less" scoped>
.reflect {
  overflow: hidden;
  .dddddd {
    margin-top: -30px;
    margin-left: 110px;
    img {
      width: 100%;
    }
  }
  .aaaaa {
    opacity: 0;
    margin-top: -180px;
    margin-left: 90px;
  }
  .btn {
    overflow: hidden;
    float: right;
    margin: 10px 30px 10px 0;
  }
  .details {
    width: 100%;
    margin-top: 20px;
    font-size: 20px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: rgba(1, 1, 1, 1);
    line-height: 26px;

    .block {
      position: fixed;
      right: 600px;
      bottom: 10px;
    }
  }
  .xiangq {
    ul {
      text-align: center;
      li {
        margin-top: 20px;
        font-size: 20px;
      }
    }
  }
  .xinz {
    ul {
      text-align: center;
      li {
        margin-top: 20px;
        font-size: 20px;
      }
    }
  }
}
</style>
<style lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 200px;
  height: 178px;
  display: block;
}
</style>