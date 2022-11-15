<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-sys__role">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList3()">
        <el-form-item>
          <el-input v-model="dataForm.realName" placeholder="姓名" clearable style=" width:140px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="dataForm.inductionPlace" placeholder="入职地" style=" width:140px">
            <el-option
              v-for="item in entryArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="dataForm.createTimeStart"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="开始日期"
            style=" width:140px"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="dataForm.createTimeEnd"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="结束日期"
            style=" width:140px"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="dataForm.inductionStatus"
            placeholder="入职状态"
            style=" width:140px"
          >
            <el-option label="待入职" value="0"> </el-option>
            <el-option label="已入职" value="1"> </el-option>
            <el-option label="放弃入职" value="2"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList3()">{{ $t("query") }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="$hasPermission('sys:role:delete')"
            type="danger"
            @click="deleteHandle3()"
            >放弃入职</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="$hasPermission('sys:role:save')"
            type="primary"
            @click="saveHandle()"
            >保存</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="$hasPermission('sys:role:save')"
            type="primary"
            @click="synchroHandle()"
            >同步SAP</el-button
          >
        </el-form-item>
        <!-- <el-form-item>
          <el-upload 
              action="" 
              :multiple="true"
              :http-request="importExcel"
              :show-file-list="false">
              <el-button type="primary" icon="el-icon-upload" >导入</el-button>
          </el-upload>
        </el-form-item> -->
      </el-form>
      <el-table
        v-loading="dataListLoading"
        :data="dataList"
        border
        @selection-change="dataListSelectionChangeHandle"
        @sort-change="dataListSortChangeHandle"
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          header-align="center"
          align="center"
          width="50"
        ></el-table-column>
        <el-table-column prop="inductionStatus" label="入职状态" header-align="center" align="center"
          ><template slot-scope="scope">
            {{ scope.row.inductionStatus== 0 ?'待入职':(scope.row.inductionStatus== 1 ?'已入职':'放弃入职') }}
          </template>
        </el-table-column>
        <el-table-column
          prop="corporation"
          label="法人公司"
          header-align="center"
          align="center"
          width="180"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.corporation" placeholder="法人公司">
              <el-option
                v-for="item in corporationArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="inductionPlace"
          label="入职地"
          header-align="center"
          align="center"
          width="180"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.inductionPlace" placeholder="入职地">
              <el-option
                v-for="item in entryArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="firstDeptName"
          label="一级组织"
          header-align="center"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="secondDeptName"
          label="二级组织"
          header-align="center"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="thirdDeptName"
          label="三级组织"
          header-align="center"
          align="center"
          width="180"
        ></el-table-column>
         <el-table-column
          prop="fourthDeptName"
          label="四级组织"
          header-align="center"
          align="center"
          width="360"
        ></el-table-column>
        <el-table-column
          prop="costCenter"
          label="成本中心"
          header-align="center"
          align="center"
          width="180"
        >
          <template slot-scope="scope">
            <el-input
              class="positionName"
              v-model="scope.row.costCenter"
              readonly
              @click.native="positionNameClick(scope)"
              placeholder="成本中心"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="realName"
          label="姓名"
          header-align="center"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="reportDate"
          label="拟入职日期"
          header-align="center"
          align="center"
          width="180"
        >
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.reportDate"
              type="date"
              placeholder="选择日期"
              style="width: 150px"
            >
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column
          prop="organizationPostId"
          label="岗位编码"
          header-align="center"
          align="center"
          min-width="150"
        >
          <template slot-scope="scope">
            <el-input
              class="positionName"
              v-model="scope.row.organizationPostId"
              readonly
              @click.native="positionNameClick(scope)"
              placeholder="岗位编码"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="organizationPostName"
          label="岗位名称"
          header-align="center"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            {{scope.row.organizationPostName}}
          </template>
        </el-table-column>
        <el-table-column
          prop="staffNature"
          label="员工类型"
          header-align="center"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.staffNature" placeholder="员工类型">
              <el-option
                v-for="item in employeeTypeArr"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="recruitmentMethod"
          label="招聘类型"
          header-align="center"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.recruitmentMethod" placeholder="招聘类型">
              <el-option
                v-for="item in recruitmentMethodArr"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="internalReferrer"
          label="内部推荐人"
          header-align="center"
          align="center"
          width="126"
        >
          <template slot-scope="scope" v-if="scope.row.recruitmentMethod == '12/内部推荐'?true:false">
            <el-select filterable remote v-model="scope.row.internalReferrer" placeholder="内部推荐人" :remote-method="internalReferrerIdRemote" @change="internalReferrerIdChange">
              <el-option
                v-for="item in internalReferrerArr"
                :key="item.refEmpId"
                :label="item.refEmpInfo"
                :value="item"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="rank"
          label="职工职级"
          header-align="center"
          align="center"
          width="130"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.rank" placeholder="职工职级">
              <el-option v-for="item in jobArr" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="idCard"
          label="身份证号码"
          header-align="center"
          align="center"
          width="180"
        ></el-table-column>
         <el-table-column
          prop="departInterviewer"
          label="部门面试人"
          header-align="center"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.departInterviewer" placeholder="部门面试人" />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="limit"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="pageSizeChangeHandle"
        @current-change="pageCurrentChangeHandle"
      >
      </el-pagination>
      <el-dialog
        :title="title"
        :visible.sync="positionNameVisible"
        width="80%"
        :modal="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <div style="display:flex;">
          <div style="width:40%;margin-right:20px;">
            <el-input style="margin-bottom:10px" placeholder="输入部门关键字进行过滤" v-model="deptFilter"/>
            <el-tree
              :data="deptArr"
              :props="potionNameProps"
              @node-click="positionNameTree"
              ref="tree"
              :filter-node-method="filterNode"
            ></el-tree>
          </div>
          <div style="width:60%;">
            <el-input style="margin-bottom:18px" placeholder="输入岗位关键字进行过滤" v-model="positionFilter" @input="positionInput"/>
            <el-table
              v-loading="dataListLoading"
              :data="positionNameArr"
              border
              @selection-change="singleSelectionChangeHandle"
              @sort-change="dataListSortChangeHandle"
              ref="tb"
            >
              <el-table-column
                type="selection"
                header-align="center"
                align="center"
                width="50"
                :selectable="selected"
              ></el-table-column>
              <el-table-column
                v-if="title == '岗位编码'"
                prop="planName"
                label="岗位"
              ></el-table-column>
              <el-table-column
                v-else
                prop="ccname"
                label="成本中心"
              ></el-table-column>
            </el-table>
          </div>
        </div>
        <template slot="footer">
            <el-button @click="positionNameVisible = false">{{ $t('cancel') }}</el-button>
            <el-button type="primary" @click="positionConfirm()">{{ $t('confirm') }}</el-button>
          </template>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
import mixinViewModule from "@/mixins/view-module";
export default {
  mixins: [mixinViewModule],
  data() {
    return {
      mixinViewModuleOptions: {
        postQuery: true,
        getDataListURL: "/staffInfoDetail/page",
        getDataListIsPage: true,
        deleteURL: "/staffInfoDetail",
        deleteIsBatch: true,
        staffType:1,
      },
      positionNameVisible: false,
      dataForm: {},
      entryArr: [
        { label: "0001/深圳", value: "0001/深圳" },
        { label: "0002/东莞", value: "0002/东莞" },
        { label: "0003/惠阳", value: "0003/惠阳" },
        { label: "0004/苏州", value: "0004/苏州" },
        { label: "0005/北京", value: "0005/北京" },
        { label: "0006/香港", value: "0006/香港" },
        { label: "0007/合肥", value: "0007/合肥" },
        { label: "0008/成都", value: "0008/成都" },
        { label: "0009/昆山", value: "0009/昆山" },
        { label: "0010/上海", value: "0010/上海" },
        { label: "0011/郑州", value: "0011/郑州" },
      ],
      corporationArr: [
        { label: "1000/记忆科技(深圳)有限公司", value: "1000/记忆科技(深圳)有限公司" },
        { label: "1100/记忆信息有限公司", value: "1100/记忆信息有限公司" },
        {
          label: "1200/东莞记忆存储科技有限公司",
          value: "1200/东莞记忆存储科技有限公司",
        },
        {
          label: "1300/苏州工业园区记忆科技有限公司",
          value: "1300/苏州工业园区记忆科技有限公司",
        },
        {
          label: "1400/记忆科技电子（惠州）公司",
          value: "1400/记忆科技电子（惠州）公司",
        },
        {
          label: "1500/北京记忆芯科科技有限公司",
          value: "1500/北京记忆芯科科技有限公司",
        },
        {
          label: "1600/深圳市科迪亚科技有限公司",
          value: "1600/深圳市科迪亚科技有限公司",
        },
        {
          label: "1700/深圳忆联信息系统有限公司",
          value: "1700/深圳忆联信息系统有限公司",
        },
        {
          label: "1800/北京联想核芯科技有限公司",
          value: "1800/北京联想核芯科技有限公司",
        },
        {
          label: "2100/东莞忆芯信息技术有限公司",
          value: "2100/东莞忆芯信息技术有限公司",
        },
        {
          label: "2200/东莞忆联信息系统有限公司",
          value: "2200/东莞忆联信息系统有限公司",
        },
        {
          label: "2300/苏州忆联信息系统有限公司",
          value: "2300/苏州忆联信息系统有限公司",
        },
        {
          label: "2400/深圳忆芯信息技术有限公司",
          value: "2400/深圳忆芯信息技术有限公司",
        },
        {
          label: "2500/郑州记忆存储科技有限公司",
          value: "2500/郑州记忆存储科技有限公司",
        },
        {
          label: "2600/深圳市云芯智联信息技术有限公司",
          value: "2600/深圳市云芯智联信息技术有限公司",
        },
      ],
      deptArr: [],
      title: "岗位编码",
      potionNameProps: {
        children: "childrenDept",
        label: "deptName",
      },
      row: 0,
      jobArr: ["1级","2级","3级","4级","5级","6级","7级","8级","9级","10级", "R3", "R4", "R5",],
      contractPeriodArr: ["3个月", "6个月", "1年", "2年", "3年", "4年"],
      recruitmentMethodArr: [
        "10/校园招聘",
        "11/社会招聘",
        "12/内部推荐",
        "16-劳务派遣-浩鑫",
        "18-劳务派遣-和仁",
        "19-劳务派遣-佳鑫",
        "21-劳务派遣-新起点",
        "22-劳务派遣-德聚仁合",
        "23-代理招聘-佳鑫",
        "24-代理招聘-浩鑫",
        "25-代理招聘-和仁",
        "26-劳务派遣-华辉",
        
      ],
      employeeTypeArr: ["1/正式合同工", "2/实习员工", "5-时薪制派遣工"],
      workPropertyArr: ["X/外派", "/非外派"],
      positionNameArr:[],
      positionNameArr2:[],
      deptFilter:'',
      positionFilter:'',
      internalReferrerArr:[],
    };
  },
  methods: {
    positionNameClick(data) {
      this.row = data.$index;
      this.title = data.column.label
      this.positionNameVisible = true;
      this.positionNameArr = [];
      this.positionNameArr2 = [];
      if(this.title == '岗位编码'){
        this.getPosition();
      }else{
        this.getCostCenter();
      }
    },
    positionNameTree(data) {
      if(this.title == '岗位编码'){
        // this.dataList[this.row].organizationPostName = data.label;
        this.positionNameArr = data.postDTOS
        this.positionNameArr2 = data.postDTOS
      }else{
        this.dataList[this.row].costCenter = data.label;
        this.positionNameArr = data.costCenters
        this.positionNameArr2 = data.costCenters
      }
    },
    positionConfirm(){
      if(this.title == '岗位编码'){
        this.dataList[this.row].organizationPostId = this.dataListSelections[0].planId;
        this.dataList[this.row].organizationPostName = this.dataListSelections[0].planName;
        this.dataList[this.row].zzzh = this.dataListSelections[0].zzzh;
        this.dataList[this.row].zzzl = this.dataListSelections[0].zzzl;
        this.dataList[this.row].zzzrj = this.dataListSelections[0].zzzrj;
      }else{
        this.dataList[this.row].ccid = this.dataListSelections[0].ccid;
        this.dataList[this.row].costCenter = this.dataListSelections[0].ccname;
      }

      let _firstDeptId = null;
      let _secondDeptId = null;
      this.deptArr.map((first)=>{
        if(first.childrenDept.length > 0){
          first.childrenDept.map((second)=>{
            if(second.childrenDept.length > 0){
              second.childrenDept.map((third)=>{
                // console.log(third.deptId+'------'+this.dataListSelections[0].deptId)
                if(third.deptId == this.dataListSelections[0].deptId){
                  // console.log(third.parentDeptId);
                  _secondDeptId = third.parentDeptId//三级组织
                  this.dataList[this.row].thirdDeptId = this.dataListSelections[0].deptId
                  this.dataList[this.row].thirdDeptName = this.dataListSelections[0].deptName//三级组织
                  if(this.title == '岗位编码'){
                    this.dataList[this.row].fourthDeptId = this.dataListSelections[0].planId
                    this.dataList[this.row].fourthDeptName = this.dataListSelections[0].planName//四级组织
                  // }else{
                  //   this.dataList[this.row].fourthDeptId = this.dataListSelections[0].ccid
                  //   this.dataList[this.row].fourthDeptName = this.dataListSelections[0].ccname//四级组织
                  }
                }
              })
            }
          })
        }
      })
      this.deptArr.map((first)=>{
        if(first.childrenDept.length > 0){
          first.childrenDept.map((second)=>{
            if(second.childrenDept.length > 0){
              if(second.deptId == _secondDeptId){
                _firstDeptId = second.parentDeptId
                this.dataList[this.row].secondDeptId = second.deptId
                this.dataList[this.row].secondDeptName = second.deptName//二级组织
              }
            }
          })
        }
      })
      this.deptArr.map((first)=>{
        if(first.deptId == _firstDeptId){
          this.dataList[this.row].firstDeptId = first.deptId
          this.dataList[this.row].firstDeptName = first.deptName//一级组织
        }
      })
      
      this.dataList[this.row].deptId = this.dataListSelections[0].deptId;
      this.dataList[this.row].deptName = this.dataListSelections[0].deptName;
      this.positionNameVisible = false;
    },
    saveHandle(){
      if (this.dataListSelections.length <= 0) {
        return this.$message({
          message: '请选择',
          type: 'warning',
          duration: 1000
        })
      }
      this.$http.post(
        'staffInfoDetail/saveOrUpdate',this.dataListSelections
      ).then(({ data: res }) => {
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.$message({
          message: this.$t('prompt.success'),
          type: 'success',
          duration: 500,
          onClose: () => {
            this.visible = false
            this.getDataList3();
          }
        })
      }).catch(() => {})
    },
    synchroHandle(){
      this.$http.post(
        '/staffInfoDetail/syncSap',this.dataList.map(item => item.infoId)
      ).then(({ data: res }) => {
        if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.$message({
            message: this.$t('prompt.success'),
            type: 'success',
            duration: 500,
            onClose: () => {
              this.visible = false
              this.getDataList3();
            }
          })
      }).catch(() => {})
    },
   
    getPosition(){
      this.$http.post(
        '/sapApi/getPostsTree'
      ).then(({ data: res }) => {
        if (res.code !== 0) {
            return this.$message.error(res.msg)
        }else{
          this.deptArr = res.data
        }
      }).catch(() => {})
    },
    getCostCenter(){
      this.$http.post(
        '/sapApi/getCostCenterTree'
      ).then(({ data: res }) => {
        if (res.code !== 0) {
            return this.$message.error(res.msg)
        }else{
          this.deptArr = res.data
        }
      }).catch(() => {})
    },
    importExcel(param){
      let params = {
        // id: this.$route.params.url,
        data: new FormData(),
      };
      params.data.append("file",param.file);
      // params.data.append("fileName",encodeURI(param.file.name));
      this.$http.post('/staffInfoDetail/import',params.data)
        .then(res => {
        if(res.data.code=="0"){
            this.$message.success('导入成功！')
            this.getDataList3()
        }else{
          this.$message.error(res.data.msg)
        }
      })
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.deptName.indexOf(value) !== -1;
    },
    uploadFile(param){
      let params = {
        data: new FormData(),
      };
      params.data.append("file",param.file);
      params.data.append("infoId",param.data.infoId);
      // params.data.append("fileName",encodeURI(param.file.name));
      this.$http.post('/staffInfoDetail/uploadEnclosure',params.data)
        .then(res => {
        if(res.data.code=="0"){
            this.$message.success('上传成功！')
            this.getDataList3()
        }else{
          this.$message.error(res.data.msg)
        }
      })
    },
    positionInput(val){
      this.positionNameArr = this.positionNameArr2
      let arr = [];
      this.positionNameArr.map((item)=>{
        if(item.planName.indexOf(val) != -1){
          arr.push(item)
        }
      })
      this.positionNameArr = arr;
    },
    internalReferrerIdChange(e){
      this.dataList[this.row].internalReferrerId = e.refEmpId
      this.dataList[this.row].internalReferrer = e.refEmpInfo
    },
    internalReferrerIdRemote(query){
      if (query.length >= 2 && query.length <= 5 ) {
        setTimeout(() => {
          this.getInternalReferrer(query)
        }, 200);
      }
    },
    getInternalReferrer(realName){
      let params = {
        data: new FormData(),
      };
      params.data.append("name",realName);
      this.$http.post('/sapApi/getReferrers',params.data)
        .then(res => {
        if(res.data.code=="0"){
            this.internalReferrerArr = res.data.data
        }else{
          this.$message.error(res.data.msg)
        }
      })
    },
    selected(row, index) {
      if (row.state == 1) {
        return false //不可勾选
      } else {
        return true; //可勾选
      }
    },
  },
  mounted(){
    this.getInternalReferrer()
  },
  watch: {
    deptFilter(val) {
      this.$refs.tree.filter(val);
    }
  },
}
</script>
<style lang="css" scoped>
.positionName:hover {
  cursor: pointer;
}
</style>
