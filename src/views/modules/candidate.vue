<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-sys__role">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList3()">
        <el-form-item>
          <el-input class="inputW" v-model="dataForm.realName" placeholder="姓名" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <!-- <el-select clearable class="inputW" v-model="dataForm.inductionPlace" placeholder="入职地">
            <el-option
              v-for="item in entryArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select> -->
          <ren-select v-model="dataForm.inductionPlace" dict-type="work_address" placeholder="入职地"></ren-select>
        </el-form-item>
        <el-form-item>
          <!-- <el-date-picker
            v-model="dataForm.time"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 300px"
          >
          </el-date-picker> -->
          <el-date-picker
            v-model="dataForm.createTimeStart"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="开始日期"
             class="inputW"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="dataForm.createTimeEnd"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="结束日期"
             class="inputW"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select
            clearable
            v-model="dataForm.noticeStatus"
            placeholder="提醒状态"
            class="inputW"
          >
            <el-option label="未提醒" value="0"> </el-option>
            <el-option label="已提醒" value="1"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            clearable
            v-model="dataForm.inductionStatus"
            placeholder="入职状态"
             class="inputW"
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
          <el-button
            
            type="primary"
            @click="emailHandle()"
            >发起OA入职流程提醒邮件</el-button
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
        <el-table-column
          prop="offerDate"
          label="offer发放日期"
          header-align="center"
          align="center"
          width="120"
          fixed
        ></el-table-column>
        <el-table-column prop="inductionStatus" label="入职状态" header-align="center" align="center"
          ><template slot-scope="scope">
            {{ scope.row.inductionStatus== 0 ?'待入职':(scope.row.inductionStatus== 1 ?'已入职':'放弃入职') }}
          </template>
        </el-table-column>
        <el-table-column prop="noticeStatus" label="提醒状态" header-align="center" align="center"
          ><template slot-scope="scope">
            {{ scope.row.noticeStatus ==0 ?'未提醒':'已提醒' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="reportDate"
          label="报到日期"
          header-align="center"
          align="center"
          width="180"
          fixed
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
          prop="realName"
          label="姓名"
          header-align="center"
          align="center"
          width="100"
          fixed
        ></el-table-column>
        <el-table-column prop="gender" label="性别" header-align="center" align="center"
          ><template slot-scope="scope">
            {{ $getDictLabel("gender", scope.row.gender) }}
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
            <!-- <el-select clearable v-model="scope.row.inductionPlace" placeholder="入职地">
              <el-option
                v-for="item in entryArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select> -->
            <ren-select v-model="scope.row.inductionPlace" dict-type="work_address" placeholder="入职地"></ren-select>
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
            <!-- <el-select clearable v-model="scope.row.corporation" placeholder="法人公司">
              <el-option
                v-for="item in corporationArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select> -->
            <ren-select v-model="scope.row.corporation" dict-type="corporation" placeholder="法人公司"></ren-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="returnPost"
          label="是否离职补岗"
          header-align="center"
          align="center"
          width="126"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.returnPost" placeholder="是否离职补岗" @change="returnPostChange(scope)">
              <el-option value="/否" label="/否"></el-option>
              <el-option value="X/是" label="X/是"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="organizationPostName"
          label="编制岗位名称"
          header-align="center"
          align="center"
          min-width="150"
        >
          <template slot-scope="scope">
            <el-input
              class="positionName"
              v-model="scope.row.organizationPostName"
              readonly
              @click.native="positionNameClick(scope)"
              placeholder="编制岗位名称"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="postName"
          label="个人岗位名称"
          header-align="center"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.postName" placeholder="个人岗位名称" />
          </template>
        </el-table-column>
        <el-table-column
          prop="rank"
          label="个人职级"
          header-align="center"
          align="center"
          width="130"
        >
          <template slot-scope="scope">
            <!-- <el-select clearable v-model="scope.row.rank" placeholder="个人职级">
              <el-option v-for="item in jobArr" :key="item" :label="item" :value="item">
              </el-option>
            </el-select> -->
            <ren-select v-model="scope.row.rank" dict-type="rank" placeholder="个人职级"></ren-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="contractPeriod"
          label="合同期限"
          header-align="center"
          align="center"
          width="130"
        >
          <template slot-scope="scope">
            <!-- <el-select 
              v-model="scope.row.contractPeriod"
              placeholder="合同期限"
            >
              <el-option
                v-for="item in contractPeriodArr"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select> -->
            <ren-select v-model="scope.row.contractPeriod" dict-type="contractPeriod" placeholder="合同期限"></ren-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="probationPeriod"
          label="试用期"
          header-align="center"
          align="center"
          width="120"
        >
          <template slot-scope="scope">
            <!-- <el-select v-model="scope.row.probationPeriod" placeholder="试用期">
              <el-option
                v-for="item in probationArr"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select> -->
            <ren-select v-model="scope.row.probationPeriod" dict-type="probationPeriod" placeholder="试用期"></ren-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="laborContractWorkplace"
          label="劳动合同工作地"
          header-align="center"
          align="center"
          width="166"
        >
          <template slot-scope="scope">
            <!-- <el-select clearable
              multiple
              v-model="scope.row.laborContractWorkplace"
              placeholder="劳动合同工作地"
            >
              <el-option
                v-for="item in entryArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select> -->
            <ren-select :multiple="true" v-model="scope.row.laborContractWorkplace" dict-type="work_address" placeholder="劳动合同工作地"></ren-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="actualWorkingPlace"
          label="实际工作地"
          header-align="center"
          align="center"
          width="160"
        >
          <template slot-scope="scope">
            <!-- <el-select clearable v-model="scope.row.actualWorkingPlace" placeholder="实际工作地">
              <el-option
                v-for="item in entryArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select> -->
            <ren-select v-model="scope.row.actualWorkingPlace" dict-type="work_address" placeholder="实际工作地"></ren-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="costCenter"
          label="成本中心"
          header-align="center"
          align="center"
          width="180"
        >
          <template slot-scope="scope">
            <!-- <el-input
              v-show="false"
              class="positionName"
              readonly
              @click.native="positionNameClick(scope)"
              placeholder="成本中心"
            /> -->
            <span @click="positionNameClick(scope)" style="border:1px solid #DCDFE6;display: block;padding: 10px;width:160px;min-height:40px;border-radius:4px">{{scope.row.ccid?scope.row.ccid+'/'+scope.row.costCenter:''}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号码"
          header-align="center"
          align="center"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="offer确认邮箱"
          header-align="center"
          align="center"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="recruitmentMethod"
          label="招聘类型"
          header-align="center"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <ren-select v-model="scope.row.recruitmentMethod" dict-type="recruitmentMethod" placeholder="招聘类型"></ren-select>
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
            <el-select clearable filterable remote v-model="scope.row.internalReferrer" placeholder="内部推荐人" :remote-method="internalReferrerIdRemote" @change="internalReferrerIdChange">
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
          prop="staffNature"
          label="员工类型"
          header-align="center"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <ren-select v-model="scope.row.staffNature" dict-type="staffNature" placeholder="员工类型"></ren-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="jobNature"
          label="工作性质"
          header-align="center"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <el-select clearable v-model="scope.row.jobNature" placeholder="工作性质">
              <el-option
                v-for="item in workPropertyArr"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label="附件"
          fixed="right"
          header-align="center"
          align="center"
          width="228"
        >
        <!-- :http-request="uploadFile" -->
          <template slot-scope="scope">
            <div style="display:flex">
              <el-upload
                action="#" 
                :multiple="true"
                ref="upload"
                :on-change="handleChange"
                :on-exceed="handleExceed"
                :data="{infoId:scope.row.infoId}"
                :limit="5"
                :auto-upload="false"
                :file-list="fileList"
                :show-file-list="false">
                <el-button  type="primary" style="width:95px" @click="uploadBtn(scope.row.infoId)">上传附件</el-button>
              </el-upload>
              <!-- <el-button  type="primary" style="width:95px" @click="uploadFile(scope.row.infoId)">确定</el-button> -->
              <el-button v-if="scope.row.enclosurePath" :title="scope.row.enclosurePath" style="margin-left:10px;width:130px;overflow:hidden;" type="primary" @click="downHandle(scope.row.enclosurePath)"
                >下载附件</el-button>
            </div>
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
                v-if="title == '编制岗位名称'"
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
            <div v-if="title != '编制岗位名称'" style="color:red;margin:10px 0 -10px 0">如果选不到成本中心,可在以下栏位直接输入</div>
            <div class="demo-input-suffix" v-if="title != '编制岗位名称' && !dataListSelections3[0]">
                编码： <el-input type="number" min="0" @blur="ccidBlur" oninput="if(value.length>10)value=value.slice(0,10)" onkeyup="value=value.replace(/[^\d]/g,'');" v-model="ccid" style="margin-top:20px;margin-right:24px;width:40%" />
                名称： <el-input v-model="costCenter" style="margin-top:20px;width:40%"/>
            </div>
          </div>
        </div>
        <template slot="footer" >
            <el-button @click="positionNameVisible = false">{{ $t('cancel') }}</el-button>
            <el-button type="primary" @click="positionConfirm()">{{ $t('confirm') }}</el-button>
          </template>
      </el-dialog>
      <el-dialog
        title="请选择下载内容"
        :visible.sync="downVisible"
        width="50%"
        :modal="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-table
          :data="downFileArr"
          border
          @selection-change="dataListSelectionChangeHandle2"
          ref="tb"
        >
          <el-table-column
            type="selection"
            header-align="center"
            align="center"
            width="50"
          ></el-table-column>
          <el-table-column label="文件名称">
            <template slot-scope="scope">{{scope.row}}</template>
          </el-table-column>
        </el-table>
        <template slot="footer" >
            <el-button @click="downVisible = false">{{ $t('cancel') }}</el-button>
            <el-button type="primary" @click="downFileConfirm()">{{ $t('confirm') }}</el-button>
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
        staffType:0,
        source:1,
      },
      positionNameVisible: false,
      dataForm: {inductionPlace:''},
      // entryArr: [
      //   { label: "0001/深圳", value: "0001/深圳" },
      //   { label: "0002/东莞", value: "0002/东莞" },
      //   { label: "0003/惠阳", value: "0003/惠阳" },
      //   { label: "0004/苏州", value: "0004/苏州" },
      //   { label: "0005/北京", value: "0005/北京" },
      //   { label: "0006/香港", value: "0006/香港" },
      //   { label: "0007/合肥", value: "0007/合肥" },
      //   { label: "0008/成都", value: "0008/成都" },
      //   { label: "0009/昆山", value: "0009/昆山" },
      //   { label: "0010/上海", value: "0010/上海" },
      //   { label: "0011/郑州", value: "0011/郑州" },
      // ],
      // corporationArr: [
      //   { label: "1000/记忆科技(深圳)有限公司", value: "1000/记忆科技(深圳)有限公司" },
      //   { label: "1100/记忆信息有限公司", value: "1100/记忆信息有限公司" },
      //   {
      //     label: "1200/东莞记忆存储科技有限公司",
      //     value: "1200/东莞记忆存储科技有限公司",
      //   },
      //   {
      //     label: "1300/苏州工业园区记忆科技有限公司",
      //     value: "1300/苏州工业园区记忆科技有限公司",
      //   },
      //   {
      //     label: "1400/记忆科技电子（惠州）公司",
      //     value: "1400/记忆科技电子（惠州）公司",
      //   },
      //   {
      //     label: "1500/北京记忆芯科科技有限公司",
      //     value: "1500/北京记忆芯科科技有限公司",
      //   },
      //   {
      //     label: "1600/深圳市科迪亚科技有限公司",
      //     value: "1600/深圳市科迪亚科技有限公司",
      //   },
      //   {
      //     label: "1700/深圳忆联信息系统有限公司",
      //     value: "1700/深圳忆联信息系统有限公司",
      //   },
      //   {
      //     label: "1800/北京联想核芯科技有限公司",
      //     value: "1800/北京联想核芯科技有限公司",
      //   },
      //   {
      //     label: "2100/东莞忆芯信息技术有限公司",
      //     value: "2100/东莞忆芯信息技术有限公司",
      //   },
      //   {
      //     label: "2200/东莞忆联信息系统有限公司",
      //     value: "2200/东莞忆联信息系统有限公司",
      //   },
      //   {
      //     label: "2300/苏州忆联信息系统有限公司",
      //     value: "2300/苏州忆联信息系统有限公司",
      //   },
      //   {
      //     label: "2400/深圳忆芯信息技术有限公司",
      //     value: "2400/深圳忆芯信息技术有限公司",
      //   },
      //   {
      //     label: "2500/郑州记忆存储科技有限公司",
      //     value: "2500/郑州记忆存储科技有限公司",
      //   },
      //   {
      //     label: "2600/深圳市云芯智联信息技术有限公司",
      //     value: "2600/深圳市云芯智联信息技术有限公司",
      //   },
      // ],
      deptArr: [],
      title: "编制岗位名称",
      potionNameProps: {
        children: "childrenDept",
        label: "deptName",
      },
      row: 0,
      // jobArr: ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9", "R10", "R11"],
      // contractPeriodArr: ["3个月", "6个月", "1年", "2年", "3年", "4年"],
      value3: "4年",
      value4: "3",
      // probationArr: [0, 1, 2, 3, 4, 5, 6],
      // recruitmentMethodArr: [
      //   "10/校园招聘",
      //   "11/社会招聘",
      //   "12/内部推荐",
      //   "13/猎头推荐",
      //   "14/劳务代招",
      //   "30/业务调整",
      //   "99/其他",
      //   "RH/离职回聘",
      // ],
      // employeeTypeArr: ["1/正式合同工", "2/实习员工", "3/劳务派遣工"],
      workPropertyArr: ["X/外派", "/非外派"],
      positionNameArr:[],
      positionNameArr2:[],
      deptFilter:'',
      positionFilter:'',
      internalReferrerArr:[],
      costCenter:'',
      ccid:'',
      downVisible:false,
      downFileArr:[],
      type:2,
      dataListSelections2: [],     // 数据列表，多选项
      fileList:[],
      oldFileList:[],
      fileCount:0,
      infoId:'',
      flag:false,
    };
  },
  methods: {
    positionNameClick(data) {
      this.ccid = '';
      this.costCenter = '';
      this.row = data.$index;
      this.title = data.column.label
      this.positionNameVisible = true;
      this.positionNameArr = [];
      this.positionNameArr2 = [];
      if(this.title == '编制岗位名称'){
        this.getPosition();
      }else{
        this.getCostCenter();
      }
    },
    positionNameTree(data) {
      if(this.title == '编制岗位名称'){
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
      if(this.title == '编制岗位名称'){
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
    // 多选
    dataListSelectionChangeHandle2 (val) {
      this.dataListSelections2 = val
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
    emailHandle(){
      if (this.dataListSelections.length <= 0) {
        return this.$message({
          message: '请选择',
          type: 'warning',
          duration: 1000
        })
      }
      this.$http.post(
        '/staffInfoDetail/emailNotice',this.dataListSelections.map(item => item.infoId)
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
    returnPostChange(obj){
      if(obj.row.returnPost == 'X/是'){
        this.type = 1
      }else{
        this.type = 2
      }
      this.dataList[obj.$index].organizationPostName = ''
    },
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
          this.$message.error(res.data.msg)
        }
      })
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.deptName.indexOf(value) !== -1;
    },
    handleExceed(files, fileList) {
        this.$message.warning(`当前限制最多5个文件，本次选择了 ${files.length} 个文件`);
      },
    handleChange(file,fileList){// 文件状态改变钩子
      // 第一次on-change获取fileList
      if (this.fileCount === 0){
        // 多个文件fileList会变化
        this.oldFileList = Object.assign(this.fileList);
      }
      // file.raw // 文件内容
      // 改文件是否已经存在上传列表中  some判断是否满足要求
      let isTrue = this.oldFileList.some((f)=>{
        return f.name === file.name})
      if (isTrue){
        this.$message.warning("请勿重复上传文件！")
        fileList.pop()
        return
      }
      this.fileList = fileList
      this.fileCount++;
      this.flag = true;
      setTimeout(()=>{
        if(this.flag){
          this.uploadFile();
        }
      },1000)
    },
    uploadBtn(infoId){
      this.infoId = infoId;
    },
    uploadFile(){
      this.flag = false;
      let formData = new FormData();
      this.fileList.forEach(item =>{
        formData.append("file",item.raw)
      })
      // formData.append("file",param.file);
      formData.append("infoId",this.infoId);
      this.dataListLoading = true
      this.$http.post('/staffInfoDetail/uploadEnclosure',formData)
          .then(res => {
          this.dataListLoading = false
          if(res.data.code=="0"){
              this.fileList = [];
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
    // internalReferrerIdChange(e){
    //   this.dataList[this.row].internalReferrerId = e.refEmpId
    //   this.dataList[this.row].internalReferrer = e.e.refEmpInfo
    // },
    getInternalReferrer(query){
      let params = {
        data: new FormData(),
      };
      params.data.append("name",query);
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
    downHandle(val){
      this.downFileArr = val.split(',');
      this.downVisible = true;
    },
    downFileConfirm(){
      if (this.dataListSelections2.length <= 0) {
        return this.$message({
          message: '请选择下载项',
          type: 'warning',
          duration: 1000
        })
      }
      let params = {
        data: new FormData(),
      };
      params.data.append("fileNames",this.dataListSelections2);
      this.$http.post('/staffInfoDetail/downloadEnclosure',params.data,{ responseType: 'blob' })
        .then(({ data: res }) => {
          const url = window.URL.createObjectURL(new Blob([res]))
          const aLink = document.createElement('a')
          aLink.style.display = 'none'
          aLink.href = url
          aLink.setAttribute('download', this.dataListSelections2.length > 1?this.formatDate(new Date(),"yyyy年MM月dd日hh时mm分ss秒")+'_附件.zip':this.dataListSelections2[0]+'.zip')
          document.body.appendChild(aLink)
          aLink.click()
          document.body.removeChild(aLink)
          window.URL.revokeObjectURL(url)
          this.downVisible = false;
      })
    },
  },
  created(){
    this.getInternalReferrer()
  },
  watch: {
    deptFilter(val) {
      this.$refs.tree.filter(val);
    },
    dataList: {
　　　　handler(newValue, oldValue) {
　　　　　　this.dataList.map((item)=>{
            this.$nextTick(()=>{
              if(!item.contractPeriod){item.contractPeriod = '4年'}
              if(!item.probationPeriod){item.probationPeriod = '3'}
              if(item.returnPost == 'X/是'){item.returnPost = 'X/是'}else{item.returnPost = '/否'}
            })
          }) 
　　　　},
　　　　deep: true
　　}
  },
}
</script>
<style lang="css" scoped>
.positionName:hover {
  cursor: pointer;
}
.inputW{
  width:150px;
}
.enclosure>>>span{
  display:block;
  width:50px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
