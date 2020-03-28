<template>
  <div class="system">
    <div class="btn">
      <button @click="sysjues()">角色列表</button>
      <button @click="sysxinn()">新增角色</button>
      <button @click="sysguan()">新增管理员</button>
    </div>
    <div class="details">
      <el-table :data="tableData" style="width:89%" stripe  border>
        <el-table-column align="center" type="index" label="ID" width="105"></el-table-column>
        <el-table-column prop="userName" label="账户名称" align="center" width="255"></el-table-column>
          <el-table-column prop="userType" label="用户类型" align="center" width="255"></el-table-column>
         <template>
            <el-select
            style="width:160px;margin-left:53px"
            size="small"
            v-model="ZTkai"
            placeholder="开启"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          </template>
        <el-table-column prop="caozuo" align="center" label="操作" width="602">
          <template slot-scope="scope">
            <el-button
              style="background:rgba(255,103,82,1);
border-radius:4px;
font-size:14px;
padding: 1px 12px;
color:rgba(254,254,254,1);"
              @click="handleClick1(scope.row.id)"
              type="text"
              size="small"
              v-show="scope.row.userType!='1'"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="text-align:center;margin-top: 10px;">
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
  </div>
</template>
<script>
import {SallLocked, SallOpen,deletelRole,Slist, Sdelete,accountData} from '@/api'
export default {
  name: "system",
  data() {
    return {
      datas: [],
      current: 1,
      ZTkai:'',
      size: 10,
       options: [
        {
          value:1,
          label: "开启"
        },
        {
          value:0,
          label: "关闭"
        }
      ],
      total: 0,
      accountt: "18657173438", //账号
      locked: 0, //状态 1 开启 0 关闭
      orderBy: "", //根据字段名称排序
      //pageNum: 1, //当前页数
      //pageSize: 10, //每页条数
      userName: "", //账户名称
      shanchu: false,
      zheg: false,
      value1: true,
      duii: {
        pageNum: this.current, //当前页数
        pageSize: this.size //每页条数
      },
      value2: true,
      currentPage4: 4,
      tableData: [],
      value: "",
      ids: ""
    };
  },
  created() {
    this.Administrators();
  },
  methods: {
    handleSizeChange(val) {
      this.size = val;
      this.current = 1;
      this.Administrators();
    },
    handleCurrentChange(val) {
      this.current = val;
      this.Administrators();
    },
    Administrators() {
      accountData().then(res => {
        if (res.data.httpCode==0) {
             console.log(res);
        this.tableData = res.data.data;
        }
      });
    },
    handleClick1(id) {
       this.$confirm('是否删除该角色?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         deletelRole(id).then(res => {
           if (res.data.httpCode==0) {
              this.Administrators();
           }
      });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    sysxinn(){
      this.$router.push({
        name:"sysxinn"
      })
    },
    sysjues(){
      this.$router.push({
        name:"sysjues"
      })
    },
sysguan(){
      this.$router.push({
        name:"sysguan"
      })
    },
    handleClick(id) {
      this.zheg = true;
    },
  }
};
</script>
<style lang="less" scoped>
.system {
  // height: 0;
  overflow: hidden;
  .btn {
    margin-top: 20px;
    margin-left: 100px;
    button {
      margin-left: 50px;
      font-size: 17px;
      color: white;
      width: 110px;
      height: 42px;
      background: rgba(88, 104, 217, 1);
      border-radius: 4px;
    }
    button:nth-child(1) {
      margin: 0;
    }
  }
  .details {
    margin-left: 50px;
    margin-top: 100px;
    
 .block{
         position: fixed;
      right:600px;
      bottom: 10px;
      }
  }
}
</style>