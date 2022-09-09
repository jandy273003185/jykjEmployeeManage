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
      <el-form-item label="名称：">
        <el-input size="small" v-model="formInline.name" placeholder="输入名称"></el-input>
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
      <el-table-column sortable prop="name" label="名称">
      </el-table-column>
      <el-table-column sortable prop="name" label="备注">
      </el-table-column>
      <el-table-column sortable prop="groupName" label="创建时间">
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
    <el-dialog :title="title" :visible.sync="editFormVisible"  class="roll-dialog" width="49%" @click="closeDialog">
      <el-form inline label-width="80px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="名称" prop="name">
          <el-input style="width: 520px;" size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="name">
          <el-input style="width: 520px;" size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item label="菜单授权" prop="name" style="width: 288px;">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            style="margin-top:8px"
            :props="defaultProps">
          </el-tree>
          <!-- :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]" -->
        </el-form-item>
        <el-form-item label="数据授权" prop="name" style="width: 288px;">
            <el-tree
              :data="dataList"
              show-checkbox
              node-key="id"
              style="margin-top:8px"
              :props="defaultProps">
            </el-tree>
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
      },
      menuList: [{
          id: 1,
          label: '权限管理',
          children: [
              {
                id: 4,
                label: '用户管理',
                children: [{
                    id: 9,
                    label: '查看'
                  }, {
                    id: 10,
                    label: '新增'
                  }, {
                    id: 11,
                    label: '修改'
                  }, {
                    id: 12,
                    label: '删除'
                  }
                ]
              },
              {
              id: 5,
              label: '部门管理',
              children: [{
                  id: 9,
                  label: '查看'
                }, {
                  id: 10,
                  label: '新增'
                }, {
                  id: 11,
                  label: '修改'
                }, {
                  id: 12,
                  label: '删除'
                }
              ]
            }
          ]
        }, {
          id: 2,
          label: '日志管理',
          children: [{
            id: 5,
            label: '登录日志'
          }, {
            id: 6,
            label: '操作日志'
          }]
        }, 
      ],
      dataList: [{
          id: 1,
          label: '东莞记忆科技总公司',
          children: [
              {
                id: 4,
                label: '深圳记忆科技分公司',
                children: [{
                    id: 9,
                    label: '技术部'
                  }, {
                    id: 10,
                    label: '业务部'
                  }, 
                ]
              },
              {
              id: 5,
              label: '广州记忆科技分公司',
              children: [{
                  id: 9,
                  label: '技术部'
                }, {
                  id: 10,
                  label: '业务部'
                },
              ]
            }
          ]
        }, 
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
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
    },
    loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{ name: '权限管理' }]);
        }
        if (node.level > 1) return resolve([]);

        setTimeout(() => {
          const data = [{
            name: '用户管理',
            leaf: true, 
            children: [
              { 
                name: '查',
              }
            ]
            }, {
              name: '部门管理'
            },
            {
              name: '角色管理'
            }
        ];

          resolve(data);
        }, 500);
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
.roll-dialog>>>.el-dialog__body {
  overflow-y: auto !important;
  height: calc(100vh - 320px) !important;
}
</style>

 
 