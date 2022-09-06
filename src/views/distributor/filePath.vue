/**
 * FTP管理
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
      <!-- <el-form-item label="文件所在目录路径：">
        <el-input size="small" v-model="formInline.name" placeholder="输入文件所在目录路径"></el-input>
      </el-form-item> -->
      <el-form-item>
        <!-- <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button> -->
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">添加</el-button>
        <el-button size="small" type="primary" icon="el-icon-view" @click="viewTemplate()">导入模板</el-button>
        <el-upload style="display: inline-block;marginLeft:10px;"
              action="" 
              :multiple="true"
              :http-request="uploadPng"
              :show-file-list="false">
              <el-button type="primary" size="small" icon="el-icon-upload" >导入</el-button>
          </el-upload>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">

      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column v-if="distributorVisble" sortable prop="storagePath" label="文件所在目录路径" width="500"></el-table-column>
      <el-table-column v-else sortable prop="storagePath" label="文件分发至路径" width="500"></el-table-column>
      <el-table-column align="center" label="操作" min-width="100" >
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" append-to-body width="40%" @click="closeDialog">
      <el-form label-width="136px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item v-if="distributorVisble" label="文件所在目录路径" prop="storagePath">
          <el-input size="small" v-model="editForm.storagePath" auto-complete="off" placeholder="请输入文件所在目录路径"></el-input>
        </el-form-item>
        <el-form-item v-else label="文件分发至路径" prop="storagePath">
          <el-input size="small" v-model="editForm.storagePath" auto-complete="off" placeholder="请输入文件分发至路径"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="导入模板" :visible.sync="templateVisible" append-to-body width="40%" @click="closeTemplateDialog">
      <div style="display:flex;justify-content:center;">
        <img src="@/assets/img/importTemplate.png" alt="" style="width: 400px;height:400px">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { distributorItemList, distributorItemSave, distributorItemDelete,distributorItemUpload } from '../../api/userMG'
import Pagination from '../../components/Pagination'
export default {
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: '添加',
      editForm: {},
      // rules表单验证
      rules: {
        storagePath: [
          { required: true, message: '请输入文件所在目录路径', trigger: 'blur' } 
        ],
      },
      formInline: {
        page: 1,
        size: 10,
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
      },
      templateVisible:false,
    }
  },
  // 注册组件
  components: {
    Pagination
  },
  props:['distributorId','distributorVisble'],
  created() {
    this.getdata(this.formInline)
  },
  methods: {
    // 获取列表
    getdata(parameter) {
      this.loading = true
      this.formInline.distributorId = this.distributorId;
      distributorItemList(parameter)
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
      }
      this.editForm = {distributorId:this.distributorId}
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          distributorItemSave(this.editForm)
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
          distributorItemDelete(row.id)
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
    viewTemplate(){
      this.templateVisible = true;
    },
    closeTemplateDialog() {
      this.templateVisible = false
    },
    uploadPng(param){
      let params = {
        // id: this.$route.params.url,
        data: new FormData(),
      };
      params.data.append("file",param.file);
      params.data.append("distributorId",this.distributorId);
      // params.data.append("fileName",encodeURI(param.file.name));
      distributorItemUpload(params.data)
        .then(res => {
        if(res.code=="200"){
            this.$message.success('导入成功！')
            this.getdata(this.formInline)
        }else{
          this.$message.error(res.msg)
        }
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
</style>

 
 