<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-sys__role">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList3()">
        <el-form-item>
          <el-input v-model="dataForm.realName" placeholder="姓名" clearable style=" width:140px"></el-input>
        </el-form-item>
        <el-form-item>
          <ren-select v-model="dataForm.inductionPlace" dict-type="work_address" placeholder="入职地"></ren-select>
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
            clearable
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
            
            type="danger"
            @click="deleteHandle3()"
            >放弃入职</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            
            type="primary"
            @click="saveHandle()"
            >保存</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            
            type="primary"
            @click="synchroHandle()"
            >同步SAP</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-upload 
              action="" 
              :multiple="true"
              :http-request="importExcel"
              :show-file-list="false">
              <el-button type="primary" icon="el-icon-upload" >导入</el-button>
          </el-upload>
        </el-form-item>
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
            <ren-select v-model="scope.row.corporation" dict-type="corporation" placeholder="法人公司"></ren-select>
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
            <ren-select v-model="scope.row.inductionPlace" dict-type="work_address" placeholder="入职地"></ren-select>
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
          <!-- <template slot-scope="scope">
            <el-input
              class="positionName"
              v-model="scope.row.costCenter"
              readonly
              @click.native="positionNameClick(scope)"
              placeholder="成本中心"
            />
          </template> -->
          <template slot-scope="scope">
            <span @click="positionNameClick(scope)" style="border:1px solid #DCDFE6;display: block;padding: 10px;width:160px;min-height:40px;border-radius:4px">{{scope.row.ccid?scope.row.ccid+'/'+scope.row.costCenter:''}}</span>
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
              value-format="yyyy-MM-dd"
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
            <ren-select v-model="scope.row.staffNature" dict-type="staffNature_work" placeholder="员工类型"></ren-select>
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
            <ren-select v-model="scope.row.recruitmentMethod" dict-type="recruitmentMethod_work" placeholder="招聘类型"></ren-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="internalReferrer"
          label="内部推荐人"
          header-align="center"
          align="center"
          width="126"
        >
          <template slot-scope="scope" v-if="(scope.row.recruitmentMethod == '12/内部推荐'?true:false)&&scope.row.internalReferrer">
            <!-- <el-select clearable filterable remote v-model="scope.row.internalReferrer" placeholder="内部推荐人" :remote-method="internalReferrerIdRemote" @change="internalReferrerIdChange">
              <el-option
                v-for="item in internalReferrerArr"
                :key="item.refEmpId"
                :label="item.refEmpInfo"
                :value="item"
              >
              </el-option>
            </el-select> -->
            {{scope.row.internalReferrerId+'-'+scope.row.internalReferrer}}
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
              <ren-select v-model="scope.row.rank" dict-type="rank_work" placeholder="职工职级"></ren-select>
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
              >
                <template slot-scope="scope">{{scope.row.planId+'/'+scope.row.planName}}</template>
              </el-table-column>
              <el-table-column
                v-else
                prop="ccname"
                label="成本中心"
              >
                <template slot-scope="scope">{{scope.row.ccid+'/'+scope.row.ccname}}</template>
              </el-table-column>
            </el-table>
            <div v-if="title != '岗位编码'" style="color:red;margin:10px 0 -10px 0">如果选不到成本中心,可在以下栏位直接输入</div>
            <div class="demo-input-suffix" v-if="title != '岗位编码' && !dataListSelections3[0]">
                编码： <el-input type="number" min="0" @blur="ccidBlur" oninput="if(value.length>10)value=value.slice(0,10)" onkeyup="value=value.replace(/[^\d]/g,'');" v-model="ccid" style="margin-top:20px;margin-right:24px;width:40%" />
                名称： <el-input v-model="costCenter" style="margin-top:20px;width:40%"/>
            </div>
          </div>
        </div>
        <template slot="footer">
            <el-button @click="positionNameVisible = false">{{ $t('cancel') }}</el-button>
            <el-button type="primary" @click="positionConfirm()">{{ $t('confirm') }}</el-button>
          </template>
      </el-dialog>
      <el-dialog
        title="以下数据导入失败"
        :visible.sync="importVisible"
        width="50%"
        :modal="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        {{importError}}
        <template slot="footer">
          <el-button type="primary"  @click="importVisible = false">{{ $t('confirm') }}</el-button>
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
        source:1,
      },
      positionNameVisible: false,
      dataForm: {},
      deptArr: [],
      title: "岗位编码",
      potionNameProps: {
        children: "childrenDept",
        label: "deptName",
      },
      row: 0,
      // jobArr: ["1级","2级","3级","4级","5级","6级","7级","8级","9级","10级", "R3", "R4", "R5",],
      // recruitmentMethodArr: [
      //   "10/校园招聘",
      //   "11/社会招聘",
      //   "12/内部推荐",
      //   "16/劳务派遣-浩鑫",
      //   "18/劳务派遣-和仁",
      //   "19/劳务派遣-佳鑫",
      //   "21/劳务派遣-新起点",
      //   "22/劳务派遣-德聚仁合",
      //   "23/代理招聘-佳鑫",
      //   "24/代理招聘-浩鑫",
      //   "25/代理招聘-和仁",
      //   "26/劳务派遣-华辉",
        
      // ],
      // employeeTypeArr: ["1/正式合同工", "2/实习员工", "5/时薪制派遣工"],
      workPropertyArr: ["X/外派", "/非外派"],
      positionNameArr:[],
      positionNameArr2:[],
      deptFilter:'',
      positionFilter:'',
      internalReferrerArr:[],
      costCenter:'',
      ccid:'',
      type:2,
      importVisible:false,
      importError:'',
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
      let _firstDeptId = null;
      let _secondDeptId = null;
      let _thirdDeptId = null;
      if(this.title == '岗位编码'){
        this.dataList[this.row].zzzh = this.dataListSelections3[0].zzzh;
        this.dataList[this.row].zzzl = this.dataListSelections3[0].zzzl;
        this.dataList[this.row].zzzrj = this.dataListSelections3[0].zzzrj;
        this.dataList[this.row].deptId = this.dataListSelections3[0].deptId
        this.dataList[this.row].deptName = this.dataListSelections3[0].deptName
        this.deptArr.map((first)=>{
          if(first.childrenDept.length > 0){
            first.childrenDept.map((second)=>{
              if(second.deptId == this.dataListSelections3[0].deptId){
                _firstDeptId = second.parentDeptId//一级组织
                _secondDeptId = second.deptId//二级组织
              }
              if(second.childrenDept.length > 0){
                second.childrenDept.map((third)=>{
                  if(third.childrenDept.length == 0){
                    if(third.deptId == this.dataListSelections3[0].deptId){
                      let thirdDeptId = third.deptId;
                      _secondDeptId = third.parentDeptId//二级组织
                      this.dataList[this.row].thirdDeptId = third.deptId
                      this.dataList[this.row].thirdDeptName = third.deptName//三级组织
                      this.dataList[this.row].fourthDeptId = this.dataListSelections3[0].planId
                      this.dataList[this.row].fourthDeptName = this.dataListSelections3[0].planName
                      third.childrenDept.map((four)=>{
                        if(four.deptId == this.dataListSelections3[0].deptId){
                          _thirdDeptId = thirdDeptId//三级组织
                          this.dataList[this.row].fourthDeptId = four.deptId
                          this.dataList[this.row].fourthDeptName = four.deptName//四级组织
                            // this.dataList[this.row].deptId = this.dataListSelections3[0].planId
                            // this.dataList[this.row].deptName = this.dataListSelections3[0].planName//五级组织
                        }
                      })
                    }
                  }else{
                      third.childrenDept.map((four)=>{
                        if(four.deptId == this.dataListSelections3[0].deptId){
                          let thirdDeptId = four.parentDeptId;
                          _secondDeptId = third.parentDeptId//二级组织
                          this.dataList[this.row].thirdDeptId = third.deptId
                          this.dataList[this.row].thirdDeptName = third.deptName//三级组织

                          _thirdDeptId = thirdDeptId//三级组织
                          this.dataList[this.row].fourthDeptId = four.deptId
                          this.dataList[this.row].fourthDeptName = four.deptName//四级组织
                        }
                      })
                  }
                })
              }else{
                // this.dataList[this.row].thirdDeptId = this.dataListSelections3[0].planId
                // this.dataList[this.row].thirdDeptName = this.dataListSelections3[0].planName//三级组织
              }
            })
          }
        })
        this.deptArr.map((first)=>{
          if(first.childrenDept.length > 0){
            first.childrenDept.map((second)=>{
              // if(second.childrenDept.length > 0){
                if(second.deptId == _secondDeptId){
                  _firstDeptId = second.parentDeptId
                  this.dataList[this.row].secondDeptId = second.deptId
                  this.dataList[this.row].secondDeptName = second.deptName//二级组织
                }
              // }
            })
          }
        })
        this.deptArr.map((first)=>{
          if(first.deptId == _firstDeptId){
            this.dataList[this.row].firstDeptId = first.deptId
            this.dataList[this.row].firstDeptName = first.deptName//一级组织
          }
        })

        this.dataList[this.row].organizationPostId = this.dataListSelections3[0].planId;
        this.dataList[this.row].organizationPostName = this.dataListSelections3[0].planName;
      }else{
        if(this.dataListSelections3[0]){
          this.dataList[this.row].ccid =  this.dataListSelections3[0].ccid;
          this.dataList[this.row].costCenter =  this.dataListSelections3[0].ccname;
        }else{
          if(this.ccid){
            if(!this.costCenter){
              return this.$message.error('请输入名称')
            }
          }
          this.dataList[this.row].ccid =  this.ccid ;
          this.dataList[this.row].costCenter =  this.costCenter;
        }
        
      }
      
      this.positionNameVisible = false;
      // console.log(this.dataList[this.row]);
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
   
    // returnPostChange(val){
    //   if(val == 'X/是'){
    //     this.type = 1
    //   }else{
    //     this.type = 2
    //   }
    // },
    getPosition(){
      let params = {
        data: new FormData(),
      };
      params.data.append("type",this.type);
      this.$http.post(
        '/sapApi/getPostsTree',params.data
      ).then(({ data: res }) => {
        if (res.code !== 0) {
            return this.$message.error(res.msg)
        }else{
          this.deptArr = res.data
        }
      }).catch(() => {})
    },
    getCostCenter(){
      let params = {
        data: new FormData(),
      };
      params.data.append("companyNum",(this.dataList[this.row].corporation).substring(0,(this.dataList[this.row].corporation).indexOf('/')));
      this.$http.post(
        '/sapApi/getCostCenterTree',params.data
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
          // this.$message.error(res.data.msg)
          this.importError = res.data.msg;
          this.importVisible = true;
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
    ccidBlur(){
      if(this.ccid.length != 10){
        return this.$message.error('请输入10位纯数字')
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
