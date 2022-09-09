/**
 *登录日志
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
        <el-input size="small" v-model="formInline.configName" placeholder="输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select clearable size="small" v-model="formInline.sendState" placeholder="请选择" class="userRole">
            <el-option label="成功" value="0"></el-option>
            <el-option label="失败" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <!-- <el-table-column align="center" width="0"></el-table-column> -->
      <!-- type="selection" -->
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column sortable prop="configName" label="用户名">
      </el-table-column>
      <el-table-column sortable prop="configValue" label="操作类型">
      </el-table-column>
      <el-table-column sortable prop="remark" label="状态">
      </el-table-column>
      <el-table-column sortable prop="remark" label="操作IP">
      </el-table-column>
       <el-table-column sortable prop="groupName" label="创建时间">
        <!-- <template slot-scope="scope">
          <div>{{scope.row.sendTime|timestampToTime}}</div>
        </template> -->
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
  </div>
</template>

<script>
import { sysConfigList, sysConfigSave, sysConfigFlush,sysConfigDelete } from '../../../api/userMG'
import Pagination from '../../../components/Pagination'
export default {
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      formInline: {
        page: 1,
        size: 10,
        // token: localStorage.getItem('logintoken')
      },
      listData: [], //系统数据
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
      sysConfigList(parameter)
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

 
 