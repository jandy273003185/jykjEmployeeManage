/**
 * FTP管理 FTPbak临时备份
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>FTP列表</el-breadcrumb-item>
    </el-breadcrumb> -->
    <!-- 搜索筛选 -->
    <el-form :inline="false" :model="formInline" class="user-search"  label-width="82px">
      <el-form-item label="类型：" >
        <el-radio v-model="ftpForm.type" label="1">需要上传文件到其他FTP</el-radio>
        <el-radio v-model="ftpForm.type" label="2">只备份不上传</el-radio>
        <el-radio v-model="ftpForm.type" label="3">需要邮件发送文件</el-radio>
      </el-form-item>
      <el-form-item label="备份频率：" >
        <el-radio v-model="ftpForm.bakHZ" label="1">2小时一次</el-radio>
        <el-radio v-model="ftpForm.bakHZ" label="2">每天一次</el-radio>
        <el-radio v-model="ftpForm.bakHZ" label="3">15天一次</el-radio>
      </el-form-item>
      <el-form-item label="传输方向：">
        <el-radio v-model="ftpForm.transDirection" label="1">上传</el-radio>
        <el-radio v-model="ftpForm.transDirection" label="2">下载</el-radio>
      </el-form-item>
      <el-form-item label="文件位置：" >
        <!-- action="https://jsonplaceholder.typicode.com/posts/" -->
        <el-upload
          class="upload-demo"
          style="width:200px"
          action="http://172.26.70.88:8080/api/ftp/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          <!-- <el-input style="width:500px" v-model="ftpForm.location"  placeholder="请输入文件位置"/> -->
      </el-form-item>

      <el-form-item>
        <!-- <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button> -->
        <!-- <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">添加</el-button> -->
        <el-button  style="width:80px;" size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保 存</el-button>
      </el-form-item>
    </el-form>
   
    <!-- 编辑界面 -->
    <!-- <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click="closeDialog">
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="文件名称" prop="deptName">
          <el-input size="small" v-model="editForm.deptName" auto-complete="off" placeholder="请输入文件名称"></el-input>
        </el-form-item>
        <el-form-item label="文件大小" prop="deptNo">
          <el-input size="small" v-model="editForm.deptNo" auto-complete="off" placeholder="请输入文件大小"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import { ftpUpload } from '../../api/userMG'
import Pagination from '../../components/Pagination'
export default {
  data() {
    return {
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      type: '1',
      bakHZ: '1',
      transDirection: '1',
      fileList: [],
      ftpForm:{},

      title: '添加',
      editForm: {
        deptId: '',
        deptName: '',
        deptNo: '',
        token: localStorage.getItem('logintoken')
      },
      // rules表单验证
      rules: {
        deptName: [
          { required: true, message: '请输入文件名称', trigger: 'blur' }
        ],
      },
      formInline: {
        page: 1,
        limit: 10,
        varLable: '',
        varName: '',
        token: localStorage.getItem('logintoken')
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },

    // 获取列表
    getdata(parameter) {
      this.loading = true
      // 模拟数据开始
      let res = {
        code: 0,
        msg: null,
        count: 1,
        data: [
          {
            interfaceCode:'AAA',
            theSys:'1024',
            createTime:1655662291000
          },
          {
            interfaceCode:'BBB',
            theSys:'1024',
            createTime:1655662321000
          },
          {
            interfaceCode:'CCC',
            theSys:'1024',
            createTime:1655792451000
          },
          
        ]
      }
      this.loading = false
      this.listData = res.data
      this.pageparm.currentPage = this.formInline.page
      this.pageparm.pageSize = this.formInline.limit
      this.pageparm.total = res.count
      // 模拟数据结束

      /***
       * 调用FTP，注释上面模拟数据 取消下面注释
       */
      // deptList(parameter)
      //   .then(res => {
      //     this.loading = false
      //     if (res.success == false) {
      //       this.$message({
      //         type: 'info',
      //         message: res.msg
      //       })
      //     } else {
      //       this.listData = res.data
      //       // 分页赋值
      //       this.pageparm.currentPage = this.formInline.page
      //       this.pageparm.pageSize = this.formInline.limit
      //       this.pageparm.total = res.count
      //     }
      //   })
      //   .catch(err => {
      //     this.loading = false
      //     this.$message.error('菜单加载失败，请稍后再试！')
      //   })
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
        this.editForm.deptId = row.deptId
        this.editForm.deptName = row.deptName
        this.editForm.deptNo = row.deptNo
      } else {
        this.title = '添加'
        this.editForm.deptId = ''
        this.editForm.deptName = ''
        this.editForm.deptNo = ''
      }
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      console.log(this.fileList);
        this.ftpForm.file = this.fileList[0]
        ftpUpload(this.ftpForm).then(res => {
              if (res.success) {
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
              this.$message.error('保存失败，请稍后再试！')
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
          deptDelete(row.deptId)
            .then(res => {
              if (res.success) {
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

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

 
 