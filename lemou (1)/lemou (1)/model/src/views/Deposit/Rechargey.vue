<template>
  <div class="Rechargey">
    <v-touch v-on:swiperight="goback">
      <header>
        <img @click="goback" src="../../assets/img/fanhu.png" alt />
        <span>MA充值</span>
      </header>
      <div class="pon">
        <p>请使用您尾号（6789）中国工商银行储蓄卡进行充值！</p>
      </div>
      <div class="cont">
        <ul>
          <li>收款方户名</li>
          <li>
            <span>兰州拉面</span>
            <van-icon name="orders-o" />
            <!-- @click="handleCopy(scope.$index, scope.row.orderNo)" -->
          </li>
          <li>收款方账号</li>
          <li>
            <span>1234 5678 9123 12341</span>
            <van-icon name="orders-o" />
          </li>
          <li>开户行</li>
          <li>
            <span>工商银行杭州金鸡路支行</span>
            <van-icon name="orders-o" />
          </li>
        </ul>
      </div>
      <div class="contmoeny">
        <ul>
          <li>
            <span>充值金额（元）：</span>
            <input type="text" placeholder="请输入金额" />
          </li>
          <li>
            <span>备注：</span>
            <span>ABCEEF</span>
          </li>
        </ul>
      </div>
      <div class="btn">
        <button @click="enterC">确认充值</button>
      </div>
    </v-touch>
    <!-- ////弹窗 -->
    <van-dialog v-model="show" :showConfirmButton="false">
      <div class="diacont">
        <ul>
          <li>收款方户名</li>
          <li>
            <span>兰州拉面</span>
            <van-icon name="orders-o" />
          </li>
          <li>收款方账号</li>
          <li>
            <span>1234 5678 9123 12341</span>
            <van-icon name="orders-o" />
          </li>
          <li>开户行</li>
          <li>
            <span>工商银行杭州金鸡路支行</span>
            <van-icon name="orders-o" />
          </li>
          <li>充值金额</li>
          <li>
            <span>123.00</span>
          </li>
          <li>备注：</li>
          <li>
            <span>ABCDE</span>
          </li>
        </ul>
        <div class="digbtn">
          <button @click="close">未付款（取消）</button>
          <button>已付款</button>
        </div>
        <div class="digp">
          <p>友情提示：为了避免充值成功后不能及时到账，请按 照如上信息完成转账后点击已付款，如未付款，请点 击未付款。</p>
        </div>
      </div>
    </van-dialog>
  </div>
</template>
<script>
export default {
  name: "Rechargey",
  data() {
    return {
      show: false
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    //  handleCopy(index, row) {
    //   this.copyData = row;
    //   this.copy(this.copyData);
    // },
    // copy(data) {
    //   let url = data;
    //   let oInput = document.createElement("input");
    //   oInput.value = url;
    //   document.body.appendChild(oInput);
    //   oInput.select(); // 选择对象;
    //   console.log(oInput.value);
    //   document.execCommand("Copy"); // 执行浏览器复制命令
    //   this.$message({
    //     message: "复制成功",
    //     type: "success"
    //   });
    //   oInput.remove();
    // },
    enterC() {
      this.show = true;
    },
    close() {
      this.show = false;
    }
  }
};
</script>
<style lang="less" scoped>
.Rechargey {
  width: 3.75rem;
  height: 100vh;
  background: @bc;
  .pon {
    width: 3.75rem;
    padding-top: 0.65rem;
    text-align: center;
    font-size: 0.15rem;
    font-family: HiraginoSansGB-W3, HiraginoSansGB;
    font-weight: normal;
    color: rgba(255, 255, 255, 1);
    line-height: 21px;
  }
  .cont {
    width: 3.49rem;
    margin: 0.15rem auto;
    background: @contcolor;
    border-radius: 4px;
    font-size: 0.13rem;
    font-family: HiraginoSansGB-W3, HiraginoSansGB;
    font-weight: normal;
    color: rgba(255, 255, 255, 1);
    ul {
      padding-top: 0.17rem;
      margin-left: 0.14rem;
      padding-bottom: 0.17rem;
      li {
        margin-top: 0.12rem;
      }
      li:nth-child(1) {
        margin-top: 0;
      }
      li:nth-child(2n-1) {
        opacity: 0.7;
      }
      li:nth-child(2n) {
        font-size: 16px;
        font-family: HiraginoSansGB-W6, HiraginoSansGB;
        font-weight: normal;
        color: rgba(255, 255, 255, 1);
        line-height: 0.24rem;
        .van-icon {
          float: right;
          margin-right: 0.22rem;
          margin-top: 0.03rem;
        }
      }
    }
  }
  .contmoeny {
    width: 3.49rem;
    margin: 0.15rem auto;
    background: @contcolor;
    border-radius: 4px;
    font-size: 16px;
    font-family: HiraginoSansGB-W6, HiraginoSansGB;
    font-weight: normal;
    color: rgba(255, 255, 255, 1);
    line-height: 0.24rem;
    ul {
      padding-top: 0.12rem;
      padding-left: 0.14rem;
      padding-bottom: 0.1rem;
      margin-bottom: 0.4rem;
      li {
        width: 3.2rem;
        margin-top: 0.12rem;
        input {
          background: transparent;
          width: 50%;
        }
        input::-webkit-input-placeholder {
          color: gray;
        }
      }
      li:nth-child(1) {
        margin-top: 0;
        border-bottom: 1px solid #323d72;
        padding-bottom: 0.14rem;
        span {
          width: 40%;
        }
      }
    }
  }
  .btn {
    width: 3.75rem;
    text-align: center;
    button {
      width: 3.49rem;
      height: 0.5rem;
      background: @btn2;
      border-radius: 4px;
      font-size: 17px;
      font-family: HiraginoSansGB-W3, HiraginoSansGB;
      font-weight: normal;
      color: @white;
      line-height: 26px;
    }
  }
  .van-dialog {
    background: @digba;
  }
  .diacont {
    margin: 0.15rem auto;
    border-radius: 4px;
    font-size: 0.13rem;
    font-family: HiraginoSansGB-W3, HiraginoSansGB;
    font-weight: normal;
    color: rgba(255, 255, 255, 1);
    ul {
      margin-left: 0.14rem;
      li {
        margin-top: 0.12rem;
      }
      li:nth-child(1) {
        margin-top: 0;
      }
      li:nth-child(2n-1) {
        opacity: 0.5;
      }
      li:nth-child(2n) {
        font-size: 16px;
        font-family: HiraginoSansGB-W6, HiraginoSansGB;
        font-weight: normal;
        color: rgba(255, 255, 255, 1);
        line-height: 0.24rem;
        .van-icon {
          float: right;
          margin-right: 0.22rem;
          margin-top: 0.03rem;
        }
      }
    }
    .digbtn {
      width: 100%;
      margin-top: 0.15rem;
      text-align: center;
      button:nth-child(1) {
        width: 1.3rem;
        height: 0.48rem;
        background: @colrdig;
        border-radius: 6px;
        font-size: 0.16rem;
        font-family: HiraginoSansGB-W3, HiraginoSansGB;
        font-weight: normal;
        color: rgba(255, 255, 255, 1);
      }
      button:nth-child(2) {
        margin-left: 0.1rem;
        width: 1.3rem;
        height: 0.48rem;
        background: @btn2;
        border-radius: 6px;
        font-size: 0.16rem;
        font-family: HiraginoSansGB-W3, HiraginoSansGB;
        font-weight: normal;
        color: rgba(255, 255, 255, 1);
      }
    }
    .digp {
      margin: 0.2rem auto;
      width: 95%;
      font-size: 0.13rem;
      font-family: HiraginoSansGB-W3, HiraginoSansGB;
      font-weight: normal;
      color: rgba(255, 255, 255, 1);
      line-height: 20px;
      opacity: 0.8;
    }
  }
}
</style>