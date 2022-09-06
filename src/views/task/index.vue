/**
 * 任务管理
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
      <!-- <el-form-item label="FTP地址：">
        <el-input size="small" v-model="formInline.username" placeholder="输入FTP地址"></el-input>
      </el-form-item> -->
      <el-form-item>
        <!-- <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button> -->
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">添加</el-button>
        <el-button size="small" type="primary" icon="el-icon-edit" @click="handleHZ()">频率</el-button>
        <el-upload style="display: inline-block;marginLeft:10px;"
            action="" 
            :multiple="true"
            :http-request="uploadPng"
            :show-file-list="false">
            <!-- <el-button type="primary" size="small" icon="el-icon-upload" >导入</el-button> -->
        </el-upload>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <!-- <el-table-column align="center" width="0"></el-table-column> -->
      <!-- type="selection" -->
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" sortable prop="sender.groupName" label="文件发送方" width="110">
        <template slot-scope="scope">
          <div>{{scope.row.sender.groupName+'('+scope.row.sender.serverAddr+')'}}</div>
        </template>
      </el-table-column>
      <el-table-column sortable prop="sender.items[0].storagePath" label="发送路径" width="100">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" sortable prop="receiver[0].groupName" label="文件接收方" width="110">
        <template slot-scope="scope">
          <div>{{scope.row.receiver.length>0?scope.row.receiver[0].groupName+'('+scope.row.receiver[0].serverAddr+')':''}}</div>
        </template>
      </el-table-column>
      <el-table-column sortable prop="receiver[0]" label="接收路径" width="100">
        <template slot-scope="scope">
          <div v-for="(item,i) in scope.row.receiver[0]&&scope.row.receiver[0].items" :key="i">
            {{item.storagePath}}
          </div>
        </template>
      </el-table-column>
      <el-table-column sortable prop="sendType" label="发送方式" width="96">
        <template slot-scope="scope">
          <div>{{scope.row.sendType|sendTypeFilter}}</div>
        </template>
      </el-table-column>
      <el-table-column sortable prop="noticeEmailStr" label="邮箱" width="110">
      </el-table-column>
      <el-table-column sortable prop="cronExpression" label="任务时间" width="100">
      </el-table-column>
      <el-table-column sortable prop="createBy" label="任务创建人" width="106">
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" @click="handleStatus(scope.row)">
             {{scope.row.status == '0'? '暂停' : '启动'}}
          </el-button>
          <el-button size="mini" type="danger" @click="deleteTask(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="70%" @click="closeDialog">
      <el-form label-width="120px" inline :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="发送方式" prop="sendType">
          <el-select class="inputWid" size="small" v-model="editForm.sendType" placeholder="请选择" @change="sendTypeChange">
            <el-option label="FTP" value="1"></el-option>
            <el-option label="邮件" value="2"></el-option>
            <el-option label="仅备份" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务时间" prop="cronExpression" style="margin-top:6px;">
          <!--  https://cron.qqe2.com/  <el-date-picker class="inputWid" size="small" v-model="editForm.savepath" type="date" placeholder="请选择任务时间"></el-date-picker> -->
          <el-input class="inputWid" size="small" v-model="editForm.cronExpression" auto-complete="off" placeholder="请输入任务时间">
            <template slot="append"><span class="cronExpression" @click="cronExpressionLink">选择</span></template>
          </el-input>
        </el-form-item>
        <el-form-item label="文件发送方" prop="sendId">
          <el-select class="inputWid" size="small" v-model="editForm.sendId" placeholder="请选择" @change="sendIdChange">
            <el-option
              v-for="item in sendIdArr"
              :key="item.id"
              :label="item.groupName+'('+item.serverAddr+')'"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发送路径" prop="sendItemId">
          <el-select class="inputWid" size="small" v-model="editForm.sendItemId" placeholder="请选择" @change = "$forceUpdate()">
            <el-option
              v-for="item in sendItemIdArr"
              :key="item.id"
              :label="item.storagePath"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="bakVisible" label="文件接收方" prop="receiverId">
          <el-select class="inputWid" multiple size="small" v-model="editForm.receiverId" placeholder="请选择" @change="receiverIdChange">
            <el-option
              v-for="item in receiverIdArr"
              :key="item.id"
              :label="editForm.sendType == '1'?item.groupName+'('+item.serverAddr+')':item.groupName+'('+item.addr+')'"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="fieldVisible&&bakVisible" label="接收路径" prop="receiverItemId">
          <el-select multiple class="inputWid" size="small" v-model="editForm.receiverItemId" placeholder="请选择" @change = "$forceUpdate()">
            <el-option
              v-for="item in receiverItemIdArr"
              :key="item.id"
              :label="item.storagePath"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        
        <!-- <el-form-item label="备份路径" prop="backupPath">
          <el-input class="inputWid" size="small" v-model="editForm.backupPath" auto-complete="off" placeholder="请输入备份路径"></el-input>
        </el-form-item> -->
        <el-form-item v-if="(fieldVisible&&bakVisible)||editForm.sendType==3" label="邮箱" prop="noticeEmail">
          <el-select multiple class="inputWid" size="small" v-model="editForm.noticeEmail" placeholder="请选择" @change = "$forceUpdate()">
            <el-option
              v-for="item in mailIdArr"
              :key="item.id"
              :label="item.groupName+'('+item.addr+')'"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="任务创建人" prop="createBy">
          <el-input class="inputWid" readonly size="small" v-model="editForm.createBy" auto-complete="off" placeholder=""></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="频率" :visible.sync="HZVisible" width="40%" @click="closeHZDialog">
      <el-form label-width="120px" inline :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="类型" prop="type">
          <el-select class="inputWid" size="small" v-model="editHZForm.type" placeholder="请选择" @change="typeChange">
            <!-- <el-option label="临时备份" value=""></el-option> -->
            <el-option label="长期备份" value="1"></el-option>
            <el-option label="数据清理" value="2"></el-option>
            <el-option label="挂载监控" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="频率时间">
          <el-input class="inputWid" size="small" v-model="editHZForm.cronExpression" auto-complete="off" placeholder="请输入频率时间"></el-input>
        </el-form-item>
        <el-form-item v-if="(editHZForm.type==1||editHZForm.type==2)?true:false" label="发送方服务器" prop="appointServer" >
          <el-select multiple class="inputWid" size="small" v-model="editHZForm.appointServer" placeholder="请选择" @change = "$forceUpdate()">
            <el-option
              v-for="item in sendIdArr"
              :key="item.id"
              :label="item.groupName+'('+item.serverAddr+')'"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="月份" v-if="monthVisible">
          <!-- <el-date-picker class="inputWid" size="small" value-format="M" v-model="editHZForm.methodParams" type="month" placeholder="请选择月份"></el-date-picker>  -->
          <el-input class="inputWid" onKeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))" type="number" min="1" size="small" v-model="editHZForm.methodParams" auto-complete="off" placeholder="请输入月份"></el-input>
        </el-form-item>
        <el-form-item v-if="(editHZForm.type==1||editHZForm.type==2)?true:false" label="邮箱" prop="noticeEmail">
          <el-select multiple class="inputWid" size="small" v-model="editHZForm.noticeEmail" placeholder="请选择" @change = "$forceUpdate()">
            <el-option
              v-for="item in mailIdArr"
              :key="item.id"
              :label="item.groupName+'('+item.addr+')'"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeHZDialog">取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitFormHZ('editForm')">保存</el-button>
        <el-button size="small"  :loading="loading" class="title" @click="handleStatus()">
            {{ hzStatusTxt}}
        </el-button>
      </div>
    </el-dialog>

    <!-- <el-input v-model="inputVal"/>
    <el-button  @click="submitNum" >提交</el-button> -->
  </div>
</template>

<script>
import { taskList, taskAdd,taskUpdate, taskDelete ,querySend,distributorItemList,taskPauseOrResumeJob,queryEmail,taskHZ,queryFrequency} from '../../api/userMG'
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
        sendId: [
          { required: true, message: '请选择文件发送方', trigger: 'blur' }
        ],
        sendItemId: [
          { required: true, message: '请选择发送路径', trigger: 'blur' }
        ],
        receiverId: [
          { required: true, message: '请选择文件接收方', trigger: 'blur' }
        ],
        receiverItemId: [
          { required: true, message: '请选择接收路径', trigger: 'blur' }
        ],
        sendType: [
          { required: true, message: '请选择发送方式', trigger: 'blur' }
        ],
        cronExpression: [
          { required: true, message: '请输入任务时间', trigger: 'blur' }
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
      sendIdArr:[],
      receiverIdArr:[],
      receiverIdArr2:[],
      receiverIdArr3:[],
      sendItemIdArr:[],
      receiverItemIdArr:[],
      fieldVisible:true,
      HZVisible:false,
      bakVisible:true,
      editHZForm:{type:'1'},
      monthVisible:false,

      inputVal:0,
      hzJobId:'',
      hzStatus:0,
      hzStatusTxt:'',
      mailIdArr:[],
    }
  },
  // 注册组件
  components: {
    Pagination
  },
  created() {
    this.querySendList();
    this.queryEmailList();
    this.getdata(this.formInline)
    this.queryFrequencyData(this.editHZForm.type);
  },
  mounted(){
    // let i = 1;
    // setInterval(()=>{
    //   this.inputVal +=  i;
    //   if(i == 7){
    //     this.submitNum();
    //   }
    // },5000)
  },
  methods: {
    submitNum(){
      this.inputVal = 1;
    },
    // 获取列表
    getdata(parameter) {
      this.loading = true
      taskList(parameter)
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
    querySendList(){
      querySend({type:1})
        .then(res => {
          this.loading = false
          if (res.code != 200) {
            this.$message({
              type: 'info',
              message: res.msg
            })
          } else {
            this.sendIdArr = res.msg
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error('系统异常，请稍后再试！')
        })
      querySend({type:2})
        .then(res => {
          this.loading = false
          if (res.code != 200) {
            this.$message({
              type: 'info',
              message: res.msg
            })
          } else {
            this.receiverIdArr = res.msg
            this.receiverIdArr2 = res.msg
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error('系统异常，请稍后再试！')
        })
    },
    queryPath(type,distributorId){
      distributorItemList({page:1,size:100,distributorIds: distributorId})
        .then(res => {
          this.loading = false
          if (res.code != 200) {
            this.$message({
              type: 'info',
              message: res.msg
            })
          } else {
            if(type == 1){
              this.$nextTick(()=>{
                this.sendItemIdArr = res.msg.records
                // this.editForm.sendItemId = res.msg.records[0].id
              })
            }else{
              this.$nextTick(()=>{
                this.receiverItemIdArr = res.msg.records
                // this.editForm.receiverItemId = res.msg.records.length>0?[res.msg.records[0].id]:[]
                this.editForm.receiverId = distributorId;
              }) 
            }
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
              this.mailIdArr = res.msg
              this.receiverIdArr3 = res.msg
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error('系统异常，请稍后再试！')
        })
    },
    sendIdChange(item){
      // this.editForm.sendItemId = ''
      this.queryPath(1,[item]);
    },
    receiverIdChange(item){
      // if(this.editForm.sendtype != '1') return;
      this.$forceUpdate()
      this.queryPath(2,item);
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
    sendTypeChange(val){
      if(val == '1'){
        this.fieldVisible = true;
        this.receiverIdArr = this.receiverIdArr2;
        this.editForm.sendType = '1'
        this.bakVisible = true;
      }else if(val == '2'){
        this.fieldVisible = false;
        this.receiverIdArr = this.receiverIdArr3;
        this.editForm.sendType = '2'
        this.bakVisible = true;
      }else if(val == '3'){
        this.bakVisible = true;
        this.editForm.sendType = '3'
        this.bakVisible = false;
      }
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true
      if (row != undefined && row != 'undefined') {
        this.title = '修改'
        this.editForm = row
        this.sendTypeChange(row.sendType);
        this.editForm.sendId = row.sender.id
        this.sendIdChange(row.sender.id);
        this.editForm.sendItemId = row.sender.items[0].id
        let receiverIds = [];
        if(row.receiver.length>0){
          row.receiver.map((item)=>{
            receiverIds.push(item.id)
          })
        }
        this.editForm.receiverId = receiverIds
        this.receiverIdChange(receiverIds);
        this.editForm.noticeEmail = row.noticeEmail&&row.noticeEmail.length>0?row.noticeEmail.split(','):row.noticeEmail;
        let arr = [];
        if(row.receiver.length>0){
          if(row.receiver[0].items){
            row.receiver[0].items.map((item)=>{
              arr.push(item.id)
            })
          }
        }
        this.editForm.receiverItemId = arr
      } else {
        this.title = '添加'
        this.editForm = {sendType:'1'}
        this.sendTypeChange('1');
      }
    },
    handleHZ(){
      this.HZVisible = true;
    },
    handleStatus(param){
      let obj = {};
      if(param){
        obj.jobId = param.jobId
        obj.status = param.status == '0'? '1':'0';
      }else{
        obj.jobId = this.hzJobId;
        obj.status = this.hzStatus == '0'? '1':'0';
      }
      taskPauseOrResumeJob(obj)
        .then(res => {
          this.loading = false
          if (res.code != 200) {
            this.$message({
              type: 'info',
              message: res.msg
            })
          } else {
            this.hzStatusTxt = this.hzStatusTxt == '启动'?'暂停' : '启动';
            this.$message.success('保存成功！')
            this.HZVisible = false
            this.getdata(this.formInline)
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error('系统异常，请稍后再试！')
        })
    },
    
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          let receiversArr = [],receiverItemIdArr=[];
          this.editForm.receiverItemId.map((item)=>{
            receiverItemIdArr.push(item)
          })
          this.editForm.receiverId.map((item)=>{
            receiversArr.push({receiverId:item,receiverItemId:receiverItemIdArr})
          })
          // receiversArr.push({receiverId:this.editForm.receiverId,receiverItemId:receiverItemIdArr})
          this.editForm.receivers = receiversArr
          this.editForm.noticeEmail = this.editForm.noticeEmail&&this.editForm.noticeEmail.length>0?this.editForm.noticeEmail.toString():'';
          // this.editForm.time = encodeURI(this.editForm.time)
          if(this.editForm.jobId){
            taskUpdate(this.editForm)
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
          }else{
            taskAdd(this.editForm)
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
          }
          
        } else {
          return false
        }
      })
    },
    // 删除
    deleteTask(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          taskDelete(row.jobId)
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
    typeChange(val){
      if(val == '1' || val == '3'){this.monthVisible = false}else{this.monthVisible = true}
      this.queryFrequencyData(this.editHZForm.type)
    },
    queryFrequencyData(){
      this.editHZForm.appointServer = '';
      this.editHZForm.noticeEmail = '';
      queryFrequency(this.editHZForm.type).then(res => {
          this.loading = false
          if (res.code != 200) {
            this.$message({
              type: 'info',
              message: res.msg
            })
          }else{
            this.$set(this.editHZForm,'cronExpression',res.msg.cronExpression)
            this.$set(this.editHZForm,'methodParams',res.msg.methodParams)
            if(res.msg.appointServer){
              this.$set(this.editHZForm,'appointServer',res.msg.appointServer.split(','))
            }
            if(res.msg.noticeEmail){
              this.$set(this.editHZForm,'noticeEmail',res.msg.noticeEmail.split(','))
            }
            this.hzJobId = res.msg.jobId;
            this.hzStatus = res.msg.status;
            this.hzStatusTxt = res.msg.status == '0'?'暂停' : '启动';
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error('系统异常，请稍后再试！')
        })
    },
    submitFormHZ(){
      this.editHZForm.appointServer = this.editHZForm.appointServer.toString();
      this.editHZForm.noticeEmail = this.editHZForm.noticeEmail.toString();
      taskHZ(this.editHZForm).then(res => {
          this.loading = false
          if (res.code != 200) {
            this.$message({
              type: 'info',
              message: res.msg
            })
          } else {
            this.$message.success('保存成功！')
            this.HZVisible = false
            if(this.editHZForm.appointServer.length >0) this.editHZForm.appointServer = this.editHZForm.appointServer.split(',');
            if(this.editHZForm.noticeEmail.length >0) this.editHZForm.noticeEmail = this.editHZForm.noticeEmail.split(',');
            this.getdata(this.formInline)
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error('系统异常，请稍后再试！')
        })
    },
    // 关闭编辑、增加弹出框
    closeDialog() {
      this.editFormVisible = false
    },
    closeHZDialog() {
      this.HZVisible = false
    },
    uploadPng(param){
      let params = {
        // id: this.$route.params.url,
        data: new FormData(),
      };
      params.data.append("file",param.file);
      params.data.append("fileName",encodeURI(param.file.name));
      putInterface('filesystem_toLead',params,true)
      .then((result) => {
        if(result.code=="200"){
            this.getdata(this.formInline)
        }else{
          this.$message.error(result.msg)
        }
      })
    },
    cronExpressionLink(){
      window.open("https://cron.qqe2.com/")
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
.cronExpression:hover{
  cursor: pointer;
}
</style>

 
 