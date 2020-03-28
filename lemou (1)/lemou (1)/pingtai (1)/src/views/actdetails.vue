<template>
  <div class="actdetails">
    <div class="wrap">
      <div class="head">
        <span @click="user()">用户列表 /</span>
        <span>账号详情</span>
      </div>
      <div class="jiben">
        <div class="bianji">
          <span>基本信息</span>
          <span @click="increasebg()">编辑</span>
        </div>
        <div class="cent">
          <ul>
            <li>
              <span>ID</span>
              <span>{{datas.accountId}}</span>
            </li>
            <li>
              <span>姓名</span>
              <span>{{datas.userName}}</span>
            </li>
            <li>
              <span>账号</span>
              <span>{{datas.account}}</span>
            </li>
            <li>
              <span>等级</span>
              <span>{{datas.userType}}</span>
            </li>
            <li>
              <span>支付宝</span>
              <span>{{datas.alipay}}</span>
            </li>
            <li style="margin-left:20px">
              <span>所属码商</span>
              <span>{{datas.dealerName}}</span>
            </li>
            <li style="margin-left:40px;">
              <span>所属邀请码</span>
              <span>{{datas.invitationCode}}</span>
            </li>
            <li style="margin-left:40px">
              <span>描述</span>
              <span>{{datas.remark}}</span>
            </li>
            <li style="margin-left:40px">
              <span>收益</span>
              <span>{{(datas.totalEarnings)/100}}</span>
            </li>
            <li style="margin-left:40px">
              <span>状态</span>
              <span>{{datas.locked== 1 ? "开启" : "关闭"}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="yhkk">
        <div class="meiri">
          <span>账户每日限额</span>
          <span @click="quota()">编辑</span>
        </div>
        <div class="numb">
          <div class="zuo">
            <ul v-for="(item,index) in dataK" :key="index">
              <li>
                <span>{{item.code}}：</span>
                <span style="float: right;margin-right:50px">{{(item.totalQuota)/100}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- <div class="usermsg" v-show="actma">
        <div class="tianjia">
          <span>账户二维码信息</span>

          <span @click="zhuangt()">编辑</span>
        </div>
        <div class="skm">
          <div v-show="item.Typebak" class="danma" v-for="(item,index) in erweim" :key="index">
            <p>{{item.typeCode}}</p>
            <div class="tu">
              <img style="width:100%;height:100%" :src="item.imageUrl" alt />
            </div>
            <p>状态：{{item.status}}</p>
          </div>
        </div>
      </div>-->
      <div class="Tybank">
        <div class="editB">
          <span>拼多多通道设置</span>
        </div>
        <div class="details" style="margin: 30px 0px 20px 30px">
          <el-table :data="PdtableData" style="width:100%" stripe border>
            <el-table-column align="center" prop="buyerMake" label="买家日成交额度" width="200"></el-table-column>
            <el-table-column prop="buyerNum" label="买家限制链接数量" align="center" width="200"></el-table-column>
            <el-table-column prop="sellerMake" label="商品日成交总额" align="center" width="200"></el-table-column>
            <el-table-column prop="sellerNum" label="商品限制链接数量" align="center" width="200"></el-table-column>

            <el-table-column prop="type" align="center" label="类型" width="200"></el-table-column>
            <el-table-column align="center" label="操作" width="200">
              <template slot-scope="scope">
                <el-button @click="PdEditdes(scope.row)" type="primary">编辑详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="xiangq">
          <el-dialog title="修改拼多多通道设置" :visible.sync="PdialogVisible" width="30%">
            <ul>
              <li>
                <span style="margin-left:20px">买家日成交额度：</span>
                <el-input style="width:180px" v-model="Pdeatali.buyerMake"></el-input>
              </li>
              <li>
                <span>买家限制链接数量：</span>
                <el-input style="width:180px" v-model="Pdeatali.buyerNum"></el-input>
              </li>
              <li>
                <span style="margin-left:20px">商品日成交总额：</span>
                <el-input style="width:180px" v-model="Pdeatali.sellerMake"></el-input>
              </li>
              <li>
                <span>商品限制链接数量：</span>
                <el-input style="width:180px" v-model="Pdeatali.sellerNum"></el-input>
              </li>
            </ul>

            <span slot="footer" class="dialog-footer">
              <el-button @click="PdialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisibleP()">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
      <div class="Tybank">
        <div class="editB">
          <span>银行卡账户</span>
        </div>
        <div class="details" style="margin: 30px 0px 0px 30px">
          <div class="ampnmae" style="margin-bottom:20px">
            <span>持卡人名称：</span>
            <el-input
              style="width:180px"
              clearable
              @change="Ssearch()"
              @keyup.enter.native="Ssearch()"
              v-model="userName"
              placeholder="请输入内容"
            ></el-input>
            <el-button type="primary" @click="Ssearch()" icon="el-icon-search">搜索</el-button>
          </div>
          <el-table :data="tableData" style="width:100%" stripe border>
            <el-table-column align="center" prop="accountId" label="账户编号" width="140"></el-table-column>
            <el-table-column prop="bankMark" label="银行编号" align="center" width="130"></el-table-column>
            <el-table-column prop="bankName" label="银行名称" align="center" width="140"></el-table-column>

            <el-table-column prop="userName" label="持卡人名称" align="center" width="130">
              <!-- <template slot-scope="scope">
            <span>{{(scope.row.money)/100}}</span>
              </template>-->
            </el-table-column>
            <el-table-column prop="code" align="center" label="类型" width="130"></el-table-column>
            <el-table-column prop="cardId" align="center" label="卡ID" width="180"></el-table-column>
            <el-table-column prop="bankQuota" align="center" label="限额" width="130"></el-table-column>
            <el-table-column prop="status" align="center" label="状态" width="130">
              <template slot-scope="scope">
                <span :style="{color:scope.row.col}">{{scope.row.status}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="130">
              <template slot-scope="scope">
                <el-button @click="Editdes(scope.row.id)" type="primary">编辑详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block" style="text-align:center;margin: 10px 0 10px 0 ;">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="current"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
        <div class="xiangq">
          <el-dialog title="编辑银行卡详情" :visible.sync="dialogVisible" width="30%">
            <ul>
              <li>
                <span>银行名称:</span>
                <el-input style="width:180px" v-model="bankdeta.bankName" :disabled="true"></el-input>
              </li>
              <li>
                <span>银行编号:</span>
                <el-input style="width:180px" v-model="bankdeta.bankMark" :disabled="true"></el-input>
              </li>
              <li style="margin-left:-15px">
                <span>持卡人名称:</span>
                <el-input style="width:180px" v-model="bankdeta.userName" :disabled="true"></el-input>
              </li>
              <li style="margin-left:50px">
                <span>限额:</span>
                <el-input style="width:180px" v-model="bankdeta.bankQuota"></el-input>
              </li>
              <li style="margin-left:50px">
                <span>状态:</span>
                <el-select
                  style="width:180px"
                  v-model="bankdeta.status"
                  @change="changeZT(bankdeta.status)"
                  placeholder="请选择操作状态"
                >
                  <el-option
                    v-for="item in CZtypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </li>

              <li style="margin-left:50px">
                <span>卡ID:</span>
                <el-input style="width:180px" v-model="bankdeta.cardId"></el-input>
              </li>
              <li style="margin-left:50px">
                <span>卡号:</span>
                <el-input style="width:180px" v-model="bankdeta.cardNo" :disabled="true"></el-input>
              </li>
            </ul>

            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisibleA(bankdeta.id)">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  commpersonalDetails,
  commaccountQuota,
  PqueryQuotaPdd,
  PupdateQuotaPdd,
  commqueryAccount,
  commquerydetailsBank,
  commqueryAccountBank,
  commqueryupdateBank
} from "@/api";
export default {
  name: "actdetails",
  data() {
    return {
      current: 1,
      size: 10,
      total: 0,
      PdtableData: [],
      CZtypes: [
        {
          value: 0,
          label: "关闭"
        },
        {
          value: 1,
          label: "开启"
        }
      ],
      tableData: [],
      userName: "",
      userId: "",
      dataK: [],
      // value1: true,
      value2: "",
      id: "",
      datas: "",
      erweim: [],
      actma: "",
      Pdeatali: "",
      dialogVisible: false,
      bankdeta: "",
      PdialogVisible: false
    };
  },
  created() {
    this.id = this.$route.query.ids;
    console.log(this.id);
    this.personalDetails();
    this.accountQuota();
    this.commqueryAccountBankT();
    this.Pddyong();
  },
  methods: {
    PdEditdes(row) {
      console.log(row);
      this.PdialogVisible = true;
      this.Pdeatali = row;
    },
    Pddyong() {
      PqueryQuotaPdd(this.id).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data);
          this.PdtableData = res.data.data;
          this.PdtableData.forEach((item, index) => {
            item.buyerMake = item.buyerMake / 100;
            item.sellerMake = item.sellerMake / 100;
            if (item.type == 0) {
              item.type = "拼多多支付宝";
            } else if (item.type == 1) {
              item.type = "拼多多微信";
            }
          });
        }
      });
    },
    Ssearch() {
      this.commqueryAccountBankT();
    },
    changeZT(val) {
      console.log(val);
      this.bankdeta.status = val;
      if (this.bankdeta.cardId == "") {
        this.$message("请输入卡ID");
      }
    },
    dialogVisibleA(val) {
      if (this.bankdeta.cardId == "") {
        this.$message.error("请输入卡ID");
        return;
      }
      let pay = {
        bankQuota: this.bankdeta.bankQuota, //限额
        cardId: this.bankdeta.cardId, //卡ID
        id: val, //id
        status: this.bankdeta.status //状态 0关闭 1开启
      };
      commqueryupdateBank(pay).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data);
          this.dialogVisible = false;
          this.commqueryAccountBankT();
        }
      });
    },
    Editdes(id) {
      this.dialogVisible = true;
      commquerydetailsBank(id).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data);
          this.bankdeta = res.data.data;
          if (this.bankdeta.status == 0) {
            this.bankdeta.status = "关闭";
          } else if (this.bankdeta.status == 1) {
            this.bankdeta.status = "开启";
          }
        }
      });
    },
    personalDetails() {
      commpersonalDetails(this.id).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data);
          if (res.data.data.locked == 1) {
            this.value2 = true;
          }
          if (res.data.data.userType == 0) {
            res.data.data.userType = "一级";
          }
          if (res.data.data.userType == 1) {
            res.data.data.userType = "二级";
          }
          this.datas = res.data.data;
        }
      });
    },
    handleSizeChange(val) {
      this.size = val;
      this.current = 1;
      this.commqueryAccountBankT();
    },
    handleCurrentChange(val) {
      this.current = val;
      this.commqueryAccountBankT();
    },
    accountQuota() {
      commaccountQuota(this.id).then(res => {
        // let data =res.data
        if (res.data.httpCode == 0) {
          console.log(res.data);
          res.data.data.forEach((item, index) => {
            if (item.code == 0) {
              item.code = "支付宝";
            } else if (item.code == 1) {
              item.code = "微信";
            } else if (item.code == 2) {
              item.code = "云闪付";
            } else if (item.code == 3) {
              item.code = "支付宝商码";
            } else if (item.code == 4) {
              item.code = "微信商码";
            } else if (item.code == 5) {
              item.code = "银行卡";
            } else if (item.code == 6) {
              item.code = "拼多多支付宝";
            } else if (item.code == 7) {
              item.code = "拼多多微信";
            } else if (item.code == 8) {
              item.code = "聚合码";
            } else if (item.code == 9) {
              item.code = "支付宝固态码";
            }
          });
          this.dataK = res.data.data;
        }
      });
    },
    commqueryAccountBankT() {
      let pay = {
        userId: this.id, //用户ID
        userName: this.userName //持卡人名称
      };
      commqueryAccountBank(pay).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data);
          this.tableData = res.data.data;
          this.total = res.data.data.length;
          this.tableData.forEach((item, index) => {
            item.col = "";
            if (item.code == 3) {
              item.code = "银行卡";
            }
            if (item.status == 0) {
              item.status = "关闭";
              item.col = "black";
            } else if (item.status == 1) {
              item.status = "开启";
              item.col = "green";
            }
          });
        }
      });
    },
    dialogVisibleP() {
      if (
        this.Pdeatali.buyerMake === "" ||
        this.Pdeatali.buyerNum === "" ||
        this.Pdeatali.sellerMake === "" ||
        this.Pdeatali.sellerNum === ""
      ) {
        this.$message.error("请输入对应内容！");
        return;
      }
      let pay = {
        buyerMake: this.Pdeatali.buyerMake, //买家日成交额度
        buyerNum: this.Pdeatali.buyerNum, //买家限制链接数量
        id: this.Pdeatali.id,
        sellerMake: this.Pdeatali.sellerMake, //商品日成交总额
        sellerNum: this.Pdeatali.sellerNum //商品限制链接数量
      };
      PupdateQuotaPdd(pay).then(res => {
        if (res.data.httpCode == 0) {
          console.log(res.data);
          this.PdialogVisible = false;
        } else {
          this.$message.error(res.data.mag);
        }
      });
    },
    zhuangt() {
      this.$router.push({
        name: "zhuangt",
        query: {
          ids: this.id
        }
      });
    },
    increasebg() {
      this.$router.push({
        name: "increasebg",
        query: {
          ids: this.id
        }
      });
    },
    quota() {
      this.$router.push({
        name: "quota",
        query: {
          ids: this.id
        }
      });
    },
    user() {
      this.$router.push({
        name: "user"
      });
    },
    account() {
      this.$router.push({
        name: "account"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.actdetails {
  .wrap {
    margin: 40px 0 0 79px;
    .head {
      span {
        font-size: 20px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(24, 24, 24, 1);
      }
    }
    .jiben {
      margin-top: 52px;
      width: 1326px;
      height: 206px;
      border: 1px solid rgba(112, 112, 112, 1);
      border-radius: 16px;
      .bianji {
        margin: 17px 0 0 30px;
        span:nth-child(1) {
          font-size: 22px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(71, 70, 70, 1);
        }
        span:nth-child(2) {
          font-size: 22px;
          font-family: Songti SC;
          font-weight: 400;
          color: rgba(2, 24, 253, 1);
          float: right;
          margin-right: 30px;
        }
      }
      .cent {
        margin: 15px 0 0 130px;
        ul {
          li {
            height: 120px;
            width: 90px;
            float: left;
            span {
              text-align: center;
              display: block;
              width: 100%;
            }
            span:nth-child(2) {
              margin-top: 39px;
            }
          }
          li:nth-child(3) {
            width: 120px;
          }
          li:nth-child(5) {
            width: 120px;
          }
        }
      }
    }
    .yhkk {
      margin-top: 60px;
      width: 1326px;
      height: 327px;
      border: 1px solid rgba(112, 112, 112, 1);
      border-radius: 16px;
      .meiri {
        margin: 17px 0 0 30px;
        font-size: 22px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(35, 35, 35, 1);
        span:nth-child(2) {
          font-size: 22px;
          font-family: Songti SC;
          font-weight: 400;
          color: rgba(2, 24, 253, 1);
          float: right;
          margin-right: 30px;
        }
      }
      .numb {
        margin: 0 0 0 298px;
        .zuo {
          margin-top: 0;
          float: left;
          width: 900px;
          // width: 320px;
          font-size: 20px;
          font-family: Songti SC;
          font-weight: 400;
          color: rgba(35, 35, 35, 1);
          li {
            width: 300px;
            margin-top: 10px;
            float: left;
            margin-left: 80px;
          }
        }
        .you {
          float: right;
          margin-right: 120px;
          width: 400px;
          font-size: 20px;
          font-family: Songti SC;
          font-weight: 400;
          color: rgba(35, 35, 35, 1);
          p {
            margin-top: 30px;
          }
          p:nth-child(1) {
            margin-top: 0;
          }
        }
      }
    }
    .usermsg {
      width: 1326px;
      height: 405px;
      border: 1px solid rgba(112, 112, 112, 1);
      border-radius: 16px;
      margin: 65px 0;
      .tianjia {
        margin: 31px 0 0 30px;
        font-size: 22px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(35, 35, 35, 1);
        span:nth-child(2) {
          font-size: 22px;
          font-family: Songti SC;
          font-weight: 400;
          color: rgba(2, 24, 253, 1);
          float: right;
          margin-right: 30px;
        }
      }
      .skm {
        // height: 230px;
        margin: 27px 0 0 191px;
        .danma {
          text-align: center;
          float: left;
          height: 120px;
          margin-left: 50px;
          p:nth-child(1) {
            // border: 1px solid red;
            text-align: center;
          }
          p:nth-child(3) {
            // border: 1px solid red;
            text-align: center;
          }
          .tu {
            width: 158px;
            height: 121px;
            background: rgba(194, 194, 194, 1);
            box-shadow: 0px 2px 7px 0px rgba(8, 8, 8, 0.09);
            border-radius: 2px;
            margin: 28px 0 20px 0;
          }
        }
        .danma:nth-child(1) {
          margin-left: 0;
        }
      }
    }
    .Tybank {
      width: 1326px;
      // height: 405px;
      border: 1px solid rgba(112, 112, 112, 1);
      border-radius: 16px;
      margin: 65px 0;
      .editB {
        margin: 31px 0 0 30px;
        font-size: 22px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(35, 35, 35, 1);
        span:nth-child(2) {
          font-size: 22px;
          font-family: Songti SC;
          font-weight: 400;
          color: rgba(2, 24, 253, 1);
          float: right;
          margin-right: 30px;
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
    }
  }
}
</style>