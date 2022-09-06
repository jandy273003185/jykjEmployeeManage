/**
 * 日志管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>FTP列表</el-breadcrumb-item>
    </el-breadcrumb> -->
    <!-- 搜索筛选 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="传输日志" name="first">
        <el-form :inline="true" :model="formInline" class="user-search">
          <el-form-item label="文件名：">
            <el-input size="small" v-model="formInline.fileName" placeholder="输入文件名"></el-input>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select clearable size="small" v-model="formInline.sendState" placeholder="请选择" class="userRole">
                <el-option label="成功" value="0"></el-option>
                <el-option label="失败" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            <el-button type="primary" size="small" style="marginLeft:10px;" icon="el-icon-download" @click="exportExcel">导出</el-button>
          </el-form-item>
        </el-form>
        <!--列表-->
        <el-table  @sort-change='sortChange' size="small" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
          <!-- <el-table-column align="center" width="0"></el-table-column> -->
          <!-- type="selection" -->
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" sortable prop="fileName" label="文件名" width="140">
          </el-table-column>
          <el-table-column  sortable="custom" :show-overflow-tooltip="true" prop="fileSize" label="文件大小" width="90">
          </el-table-column>
          <!-- <el-table-column :show-overflow-tooltip="true" sortable prop="fileMd5" label="文件MD5" width="140">
          </el-table-column>" -->
          <el-table-column sortable prop="sender" label="发送方" width="100">
          </el-table-column>
          <el-table-column sortable prop="receiver" label="接收方" width="100">
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" sortable prop="sendPath" label="发送路径" width="100">
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" sortable prop="receivePath" label="接收路径" width="100">
          </el-table-column>
          <el-table-column sortable prop="sendType" label="发送方式" width="100">
          </el-table-column>
          <el-table-column sortable prop="taskType" label="任务类型" width="100">
              <template slot-scope="scope">
                <div>{{scope.row.taskType|taskTypeFilter}}</div>
              </template>
          </el-table-column>
          <el-table-column sortable :show-overflow-tooltip="true" prop="backupPath" label="备份路径" width="100">
          </el-table-column>
          <el-table-column sortable prop="sendState" label="发送状态" width="90">
            <template slot-scope="scope">
              <div>{{scope.row.sendState|sendState}}</div>
            </template>
          </el-table-column>
          <el-table-column sortable prop="sendTime" label="发送时间" width="130">
            <template slot-scope="scope">
              <div>{{scope.row.sendTime|timestampToTime}}</div>
            </template>
          </el-table-column>
          <el-table-column sortable prop="errorType" label="错误类型方" width="110">
          </el-table-column> 
          <el-table-column :show-overflow-tooltip="true" sortable prop="errorInfo" label="错误信息" width="140">
            <template slot-scope="scope">
              <div class="linkDialog" @click="errorInfoClick(scope.row)">{{scope.row.errorInfo}}</div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
      </el-tab-pane>
      <el-tab-pane label="备份清理日志" name="second">
        <el-form :inline="true" :model="formInline2" class="user-search">
          <el-form-item label="文件名：">
            <el-input size="small" v-model="formInline2.fileName" placeholder="输入文件名"></el-input>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select clearable size="small" v-model="formInline2.backupState" placeholder="请选择" class="userRole">
                <el-option label="成功" value="0"></el-option>
                <el-option label="失败" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            <el-button type="primary" size="small" style="marginLeft:10px;" icon="el-icon-download" @click="exportExcel2">导出</el-button>
          </el-form-item>
        </el-form>
        <!--列表-->
        <el-table  @sort-change='sortChange2' size="small" :data="listData2" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" sortable prop="fileName" label="文件名" width="140">
          </el-table-column>
          <el-table-column  sortable="custom" :show-overflow-tooltip="true" prop="fileSize" label="文件大小" width="100">
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" sortable prop="filePath" label="文件路径" width="120">
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" sortable prop="backupPath" label="备份文件路径" width="120">
          </el-table-column>
          <el-table-column sortable prop="taskType" label="任务类型" width="100">
              <template slot-scope="scope">
                <div>{{scope.row.taskType|taskTypeFilter}}</div>
              </template>
          </el-table-column>
          <el-table-column sortable prop="backupState" label="备份状态" width="100">
            <template slot-scope="scope">
              <div>{{scope.row.backupState|sendState}}</div>
            </template>
          </el-table-column>
          <el-table-column sortable prop="backupTime" label="备份时间" width="130">
            <template slot-scope="scope">
              <div>{{scope.row.backupTime|timestampToTime}}</div>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" sortable prop="errorInfo" label="错误信息" width="255">
            <template slot-scope="scope">
              <div class="linkDialog" @click="errorInfoClick(scope.row)">{{scope.row.errorInfo}}</div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <Pagination v-bind:child-msg="pageparm2" @callFather="callFather2"></Pagination>
      </el-tab-pane>
      <el-tab-pane label="监控日志" name="third">
        <el-form :inline="true" :model="formInline3" class="user-search">
          <el-form-item label="文件名：">
            <el-input size="small" v-model="formInline3.fileName" placeholder="输入文件名"></el-input>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select clearable size="small" v-model="formInline3.noticeState" placeholder="请选择" class="userRole">
                <el-option label="成功" value="0"></el-option>
                <el-option label="失败" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            <el-button type="primary" size="small" style="marginLeft:10px;" icon="el-icon-download" @click="exportExcel3">导出</el-button>
          </el-form-item>
        </el-form>
        <!--列表-->
        <el-table  @sort-change='sortChange3' size="small" :data="listData3" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" sortable prop="fileName" label="文件名" width="200">
          </el-table-column>
          <el-table-column  sortable="custom" :show-overflow-tooltip="true" prop="fileSize" label="文件大小" width="120">
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" sortable prop="filePath" label="文件路径" width="150">
          </el-table-column>
          <el-table-column sortable prop="taskType" label="任务类型" width="100">
              <template slot-scope="scope">
                <div>{{scope.row.taskType|taskTypeFilter}}</div>
              </template>
          </el-table-column>
          <el-table-column sortable prop="noticeState" label="通知状态" width="100">
            <template slot-scope="scope">
              <div>{{scope.row.noticeState|sendState}}</div>
            </template>
          </el-table-column>
          <el-table-column sortable prop="noticeTime" label="通知时间" width="130">
            <template slot-scope="scope">
              <div>{{scope.row.noticeTime|timestampToTime}}</div>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" sortable prop="errorInfo" label="错误信息" width="315">
            <template slot-scope="scope">
              <div class="linkDialog" @click="errorInfoClick(scope.row)">{{scope.row.errorInfo}}</div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <Pagination v-bind:child-msg="pageparm3" @callFather="callFather3"></Pagination>
      </el-tab-pane>
    </el-tabs>
    
    
    <el-dialog :visible.sync="errorInfoVisible" width="60%" @click="closeErrorInfoDialog">
      <div>{{errorInfo}}</div>
    </el-dialog>
  </div>
</template>

<script>
import { sendLogList ,backupClearLogList,monitorLogList, logExport,sendLogExport,backupClearLogExport,monitorLogExport } from '../../api/userMG'
import Pagination from '../../components/Pagination'
export default {
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: '添加',
      editForm: {
      },
      // rules表单验证
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
      },
      formInline: {
        page: 1,
        size: 10,
      },
      formInline2: {
        page: 1,
        size: 10,
      },
      formInline3: {
        page: 1,
        size: 10,
      },
      // 删除FTP
      seletedata: {
        ids: '',
        token: localStorage.getItem('logintoken')
      },
      userparm: [], //搜索权限
      listData: [], //
      listData2: [], //
      listData3: [], //
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      },
      pageparm2: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      },
      pageparm3: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      },
      errorInfoVisible:false, 
      errorInfo:'',
      proptype: "",
      proptype2: "",
      proptype3: "",
      activeName: 'first',
    }
  },
  // 注册组件
  components: {
    Pagination
  },
  created() {
    this.getdata(this.formInline)
  },
  methods: {
   sortChange(column) {
      // console.log("排序", column.prop, column.order);
      this.formInline.page = 1; // 排序后返回第一页
      this.proptype = column.prop; // 将键名prop赋值给变量proptype
      this.listData = this.listData.sort(
        this.SortFun(column.prop, column.order === "descending")
      );
    },
   sortChange2(column) {
      // console.log("排序", column.prop, column.order);
      this.formInline2.page = 1; // 排序后返回第一页
      this.proptype2 = column.prop; // 将键名prop赋值给变量proptype
      this.listData2 = this.listData2.sort(
        this.SortFun(column.prop, column.order === "descending")
      );
    },
   sortChange3(column) {
      // console.log("排序", column.prop, column.order);
      this.formInline3.page = 1; // 排序后返回第一页
      this.proptype3 = column.prop; // 将键名prop赋值给变量proptype
      this.listData3 = this.listData3.sort(
        this.SortFun(column.prop, column.order === "descending")
      );
    },
    SortFun(attr, rev) {
          //第一个参数传入info里的prop表示排的是哪一列，第二个参数是升还是降排序
          if (rev == undefined) {
            rev = 1;
          } else {
            rev = rev ? 1 : -1;
            //rev = rev>0 ? 1 : -1;
          }
          return function (a, b) {
            a = a[attr];
            b = b[attr];
            if(rev == 1){return b-a;}else{return a-b}
          };
    },
    // 获取列表
    getdata(parameter) {
      this.loading = true
      sendLogList(parameter)
        .then(res => {
          this.loading = false
          if (res.code != 200) {
            this.$message({
              type: 'info',
              message: res.msg
            })
          } else {
            this.listData = res.msg.records
            // 分页赋值
            this.pageparm.currentPage = this.formInline.page
            this.pageparm.pageSize = this.formInline.size
            this.pageparm.total = res.msg.total
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error('系统异常，请稍后再试！')
        })
    },
    getdata2(parameter) {
      this.loading = true
      backupClearLogList(parameter)
        .then(res => {
          this.loading = false
          if (res.code != 200) {
            this.$message({
              type: 'info',
              message: res.msg
            })
          } else {
            this.listData2 = res.msg.records
            // 分页赋值
            this.pageparm2.currentPage = this.formInline2.page
            this.pageparm2.pageSize = this.formInline2.size
            this.pageparm2.total = res.msg.total
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error('系统异常，请稍后再试！')
        })
    },
    getdata3(parameter) {
      this.loading = true
      monitorLogList(parameter)
        .then(res => {
          this.loading = false
          if (res.code != 200) {
            this.$message({
              type: 'info',
              message: res.msg
            })
          } else {
            this.listData3 = res.msg.records
            // 分页赋值
            this.pageparm3.currentPage = this.formInline3.page
            this.pageparm3.pageSize = this.formInline3.size
            this.pageparm3.total = res.msg.total
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error('系统异常，请稍后再试！')
        })
    },
    exportExcel() {
      this.loading = true
      sendLogExport(this.formInline,'传输日志')
        .then(result => {
          this.loading = false
        })
        .catch(err => {
          this.loading = false
          this.$message.error('系统异常，请稍后再试！')
        })
    },
    exportExcel2() {
      this.loading = true
      backupClearLogExport(this.formInline2,'备份清理日志')
        .then(result => {
          this.loading = false
        })
        .catch(err => {
          this.loading = false
          this.$message.error('系统异常，请稍后再试！')
        })
    },
    exportExcel3() {
      this.loading = true
      monitorLogExport(this.formInline3,'监控日志')
        .then(result => {
          this.loading = false
        })
        .catch(err => {
          this.loading = false
          this.$message.error('系统异常，请稍后再试！')
        })
    },
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage
      this.formInline.size= parm.pageSize
      this.getdata(this.formInline)
    },
    callFather2(parm) {
      this.formInline2.page = parm.currentPage
      this.formInline2.size= parm.pageSize
      this.getdata2(this.formInline2)
    },
    callFather3(parm) {
      this.formInline3.page = parm.currentPage
      this.formInline3.size= parm.pageSize
      this.getdata3(this.formInline3)
    },
    // 搜索事件
    search() {
      if(this.activeName == 'first'){
        this.getdata(this.formInline);
      }else if(this.activeName == 'second'){
        this.getdata2(this.formInline2);
      }else if(this.activeName == 'third'){
        this.getdata3(this.formInline3);
      }
    },
   
    // 关闭编辑、增加弹出框
    closeDialog() {
      this.editFormVisible = false
    },
    errorInfoClick(data){
      this.errorInfo = data.errorInfo;
      this.errorInfoVisible = true;
    },
    closeErrorInfoDialog(){
      this.errorInfoVisible = false;
    },
    handleClick(tab, event) {
      if(tab.name == 'first'){
        this.getdata(this.formInline);
      }else if(tab.name == 'second'){
        this.getdata2(this.formInline2);
      }else if(tab.name == 'third'){
        this.getdata3(this.formInline3);
      }
    },
  }
}
</script>

<style scoped>
.user-search {
  margin-top: 20px; 
}
.userRole {
  width: 100%;
}
.inputWid{
  width:300px;
}
.linkDialog{
  color:blue;
  cursor:pointer;
}
.linkDialog:hover{
  border-bottom:1px solid blue;
}
</style>

 
 