/**
 * 接收方管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>FTP列表</el-breadcrumb-item>
    </el-breadcrumb> -->
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="FTP地址：">
        <el-input size="small" v-model="formInline.serverAddr" placeholder="输入FTP地址"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">添加</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <!-- <el-table-column align="center" width="0"></el-table-column> -->
      <!-- type="selection" -->
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column sortable prop="serverAddr" label="FTP服务器地址" width="130">
        <template slot-scope="scope">
          <div class="linkDialog" @click="serverAddrClick(scope.row)">{{scope.row.serverAddr}}</div>
        </template>
      </el-table-column>
      <el-table-column sortable prop="serverPort" label="FTP服务器端口" width="130">
      </el-table-column>
      <el-table-column sortable prop="protocol" label="协议" width="70">
        <template slot-scope="scope">
          {{scope.row.protocol == '0'?'ftp':'sftp'}}
        </template>
      </el-table-column>
      <el-table-column sortable prop="encryptTransport" label="是否支持SSL/TLS" width="143">
        <template slot-scope="scope">
          {{scope.row.encryptTransport == '0'?'否':'是'}}
        </template>
      </el-table-column>
      <el-table-column sortable prop="account" label="FTP服务器账号" width="128">
      </el-table-column>
      <el-table-column sortable prop="password" label="密码" width="130">
      </el-table-column>
      <el-table-column sortable prop="manager" label="管理人" width="90">
      </el-table-column>
      <el-table-column sortable prop="groupName" label="所属组织" width="130">
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="180" width="240">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" @click="handleTest(scope.row)">测试连接</el-button>
          <el-button size="mini" type="danger" @click="deleteDistributor(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="60%" @click="closeDialog">
      <el-form label-width="150px" inline :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="FTP服务器地址" prop="serverAddr">
          <el-input size="small" v-model="editForm.serverAddr" auto-complete="off" placeholder="请输入FTP服务器地址"></el-input>
        </el-form-item>
        <el-form-item label="FTP服务器端口" prop="serverPort">
          <el-input size="small" v-model="editForm.serverPort" auto-complete="off" placeholder="请输入FTP服务器端口"></el-input>
        </el-form-item>
        <el-form-item label="协议" prop="protocol">
          <el-select size="small" style="width:200px" v-model="editForm.protocol" placeholder="请选择">
            <el-option label="ftp" value="0"></el-option>
            <el-option label="sftp" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否支持SSL/TLS" prop="encryptTransport">
          <el-select size="small" style="width:200px" v-model="editForm.encryptTransport" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="FTP服务器账号" prop="account">
          <el-input size="small" v-model="editForm.account" auto-complete="off" placeholder="请输入FTP服务器账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input size="small" v-model="editForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="管理人" prop="manager">
          <el-input size="small" v-model="editForm.manager" auto-complete="off" placeholder="请输入管理人"></el-input>
        </el-form-item>
        <el-form-item label="所属组织" prop="groupName">
          <el-input size="small" v-model="editForm.groupName" auto-complete="off" placeholder="请输入所属组织"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="pathVisible" width="60%" @click="closePathDialog">
      <filePath :key="timer" :distributorId="distributorId"/>
    </el-dialog>
  </div>
</template>

<script>
import { distributorList, distributorSave, distributorDelete,distributorTestConnect } from '../../api/userMG'
import Pagination from '../../components/Pagination'
import filePath from '../distributor/filePath'
export default {
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      pathVisible:false,
      timer:'',
      distributorId:'',
      title: '添加',
      editForm: {},
      // rules表单验证
      rules: {
        serverAddr: [
          { required: true, message: '请输入FTP服务器地址', trigger: 'blur' }
        ],
        serverPort: [
          { required: true, message: '请输入FTP服务器端口', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入FTP服务器账号', trigger: 'blur' }
        ],
        protocol: [
          { required: true, message: '请选择协议', trigger: 'blur' }
        ],
      },
      formInline: {
        page: 1,
        size: 10,
        type:2
       },
      // 删除FTP
      seletedata: {
        ids: '',
        token: localStorage.getItem('logintoken')
      },
      userparm: [], //搜索权限
      listData: [], //用户数据
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      }
    }
  },
  // 注册组件
  components: {
    Pagination,
    filePath,
  },
  created() {
    this.getdata(this.formInline)
  },
  methods: {
    // 获取列表
    getdata(parameter) {
      this.loading = true
      distributorList(parameter)
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
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage
      this.formInline.size= parm.pageSize
      this.getdata(this.formInline)
    },
    // 搜索事件
    search() {
      this.getdata(this.formInline)
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true
      if (row != undefined && row != 'undefined') {
        this.title = '修改'
        this.editForm = row
        this.editForm.protocol = row.protocol.toString();
        this.editForm.encryptTransport = row.encryptTransport.toString();
      } else {
        this.title = '添加'
        this.editForm = {protocol:'0',encryptTransport:'1'}
      }
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          this.editForm.type = 2;
          distributorSave(this.editForm)
            .then(res => {
              this.editFormVisible = false
              this.loading = false
              if (res.code == 200) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '保存成功！'
                })
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.editFormVisible = false
              this.loading = false
              this.$message.error('保存失败，请稍后再试！')
            })
        } else {
          return false
        }
      })
    },
    // 删除
    deleteDistributor(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          distributorDelete(row.id)
            .then(res => {
              if (res.code == 200) {
                this.$message({
                  type: 'success',
                  message: '已删除!'
                })
                this.getdata(this.formInline)
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error('删除失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 关闭编辑、增加弹出框
    closeDialog() {
      this.editFormVisible = false
    },
    serverAddrClick(param){
      this.pathVisible = true;
      this.distributorId = param.id
      this.timer = new Date().getTime();
    },
    closePathDialog() {
      this.pathVisible = false
    },
    handleTest(parameter) {
      this.loading = true
      distributorTestConnect(parameter.id)
        .then(res => {
          this.loading = false
          if (res.code != 200) {
            this.$message({
              type: 'info',
              message: res.msg
            })
          } else {
            this.$message.success({
              type: 'info',
              message: res.msg
            })
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error('系统异常，请稍后再试！')
        })
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
.linkDialog{
  color:blue;
  cursor:pointer;
}
.linkDialog:hover{
  border-bottom:1px solid blue;
}
</style>

 
 