/**
 *权限管理
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
      <el-form-item label="用户名：">
        <el-input size="small" v-model="formInline.name" placeholder="输入用户名"></el-input>
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
      <el-table-column sortable prop="name" label="用户名" width="110">
      </el-table-column>
      <el-table-column sortable prop="name" label="所属部门" width="120">
      </el-table-column>
      <el-table-column sortable prop="phone" label="手机号" width="110">
      </el-table-column>
      <el-table-column sortable prop="email" label="邮箱" width="180">
      </el-table-column>
      <el-table-column sortable prop="address" label="性别" width="100">
      </el-table-column>
      <el-table-column sortable prop="userName" label="状态" width="100">
      </el-table-column>
      <el-table-column sortable prop="groupName" label="创建时间" width="130">
        <!-- <template slot-scope="scope">
          <div>{{scope.row.sendTime|timestampToTime}}</div>
        </template> -->
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="60%" @click="closeDialog">
      <el-form inline label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="用户名" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入所属部门"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input size="small" v-model="editForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input size="small" v-model="editForm.phone" auto-complete="off" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="address">
          <el-radio-group v-model="editForm.radio">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input size="small" v-model="editForm.email" auto-complete="off" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="角色配置" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入角色配置"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="userName">
          <el-radio-group v-model="editForm.radio">
            <el-radio :label="0">停用</el-radio>
            <el-radio :label="1">正常</el-radio>
          </el-radio-group>
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
import { userList, userSave, userDelete } from '../../../api/userMG'
import Pagination from '../../../components/Pagination'
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
        userName: [
          { required: true, message: '请输入状态', trigger: 'blur' } 
        ],
      },
      formInline: {
        page: 1,
        size: 10,
        userName: '',
        // token: localStorage.getItem('logintoken')
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
    Pagination
  },
  created() {
    this.getdata(this.formInline)
  },
  methods: {
    // 获取列表
    getdata(parameter) {
      this.loading = true
      userList(parameter)
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
      } else {
        this.title = '添加'
        this.editForm = {password:123456}
      }
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          userSave(this.editForm)
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
    deleteUser(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          userDelete(row.id)
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
    }
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
</style>

 
 