/**
 *监控管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>FTP列表</el-breadcrumb-item>
    </el-breadcrumb> -->
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="monitorDir-search">
      <!-- <el-form-item label="目录：">
        <el-input size="small" v-model="formInline.name" placeholder="输入目录"></el-input>
      </el-form-item> -->
      <el-form-item>
        <!-- <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button> -->
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">添加</el-button>
        <el-button size="small" type="primary"  @click="handleRestart()">重启监听</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中">
      <!-- <el-table-column align="center" width="0"></el-table-column> -->
      <!-- type="selection" -->
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column sortable prop="dir" label="目录" width="357">
      </el-table-column>
      <el-table-column sortable prop="mail" label="邮箱" width="500"></el-table-column>
      <el-table-column align="center" label="操作" min-width="100" >
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteMonitorDir(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="45%" @click="closeDialog">
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="目录" prop="dir" style="width:500px">
          <el-input size="small" v-model="editForm.dir" auto-complete="off" placeholder="请输入目录"></el-input>
        </el-form-item>
        <el-form-item label-width="120px" label="邮箱" prop="mail">
          <el-select style="width:380px" multiple class="inputWid" size="small" v-model="editForm.mail" placeholder="请选择" @change = "$forceUpdate()">
            <el-option
              v-for="item in receiverIdArr"
              :key="item.id"
              :label="item.addr"
              :value="item.addr">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { monitorDirList, monitorDirSave, monitorDirDelete,queryEmail,monitorDirRestart } from '../../api/userMG'
import Pagination from '../../components/Pagination'
export default {
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: '添加',
      editForm: {password: 123456},
      // rules表单验证
      rules: {
        dir: [
          { required: true, message: '请输入目录', trigger: 'blur' } 
        ],
        mail: [
          { required: true, message: '请选择邮箱', trigger: 'blur' } 
        ],
      },
      formInline: {
        page: 1,
        size: 10,
        monitorDirName: '',
        // token: localStorage.getItem('logintoken')
      },
      // 删除FTP
      seletedata: {
        ids: '',
        token: localStorage.getItem('logintoken')
      },
      monitorDirparm: [], //搜索权限
      listData: [], //用户数据
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      },
      receiverIdArr:[],
    }
  },
  // 注册组件
  components: {
    Pagination
  },
  created() {
    this.queryEmailList();
    this.getdata(this.formInline)
  },
  methods: {
    // 获取列表
    getdata(parameter) {
      this.loading = true
      monitorDirList(parameter)
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
    queryEmailList(){
      queryEmail({})
        .then(res => {
          this.loading = false
          if (res.code != 200) {
            this.$message({
              type: 'info',
              message: res.msg
            })
          } else {
              this.receiverIdArr = res.msg
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
        this.editForm.mail = row.mail&&row.mail.length>0?row.mail.split(','):row.mail;
      } else {
        this.title = '添加'
        this.editForm = {}
      }
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          this.editForm.mail = this.editForm.mail&&this.editForm.mail.length>0?this.editForm.mail.toString():'';
          monitorDirSave(this.editForm)
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
    deleteMonitorDir(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          monitorDirDelete(row.id)
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
    handleRestart(){
      monitorDirRestart({})
        .then(res => {
          this.loading = false
          if (res.code != 200) {
            this.$message({
              type: 'info',
              message: res.msg
            })
          }else{
            this.$message({
              type: 'success',
              message: '重启成功！'
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
.monitorDir-search {
  margin-top: 20px; 
}
.monitorDirRole {
  width: 100%;
}
</style>

 
 