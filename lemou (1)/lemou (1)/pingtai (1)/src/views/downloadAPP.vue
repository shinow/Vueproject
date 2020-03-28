<template>
  <div>
    <!-- <img src="../assets/img/1573064444(1).jpg" alt /> -->
    <el-table id="table" :data="tableData" border style="width: 80%">
      <el-table-column prop="date" label="APP名称"></el-table-column>
      <el-table-column label="下载二维码">
        <template slot-scope="scope">
          <img
            @click="shijian(scope.row.name,scope.row.date)"
            style="width:25px;height:25px"
            src="../assets/img/1573064444(1).jpg"
            alt
          />
        </template>
      </el-table-column>
    </el-table>
    <!-- <button @click="exportExcel">导出数据</button> -->
    <el-dialog :title="Nameload+'下载'" :visible.sync="dialogVisibleer" width="30%">
      <div style="margin:0 auto;text-align: center;">
        <div id="qrcode" style="margin: 0 auto;text-align: center;display: inline-block"></div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import QRCode from "qrcodejs2"; // 引入qrcode
import FileSaver from "file-saver";
import XLSX from "xlsx";
import jsonp from "jsonp";
export default {
  data() {
    return {
      tableData: [],
      dialogVisibleer: false,
      Nameload: ""
    };
  },
  methods: {
    // npm   npm install --save xlsx file-saver
    //导出数据
    exportExcel() {
      let wb = XLSX.utils.table_to_book(document.querySelector("#table")); // 这里就是表格
      let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "table.xlsx"
        ); //table是自己导出文件时的命名，随意
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    getData() {
      let pay = [
        {
          date: "支付助手",
          name: "http://47.90.59.167/app/messageWatch.apk"
        },
        {
          date: "拼多多",
          name: "http://47.90.59.167/app/pdd.apk"
        }
      ];
      this.tableData = pay;
    },
    shijian(v, date) {
      this.Nameload = date;
      this.dialogVisibleer = true;
      window.setTimeout(() => {
        document.getElementById("qrcode").innerHTML = "";
        new QRCode(
          document.getElementById("qrcode"),
          v // 二维码地址
        );
      }, 200);
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style lang="less" scoped>
</style>