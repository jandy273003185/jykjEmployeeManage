<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-sys__role">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList3()">
        <el-form-item>
          <el-input v-model="dataForm.realName" placeholder="姓名" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="dataForm.inductionPlace" placeholder="入职地">
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
            type="date"
            placeholder="开始日期"
            style=" width:150px"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="dataForm.createTimeEnd"
            type="date"
            placeholder="结束日期"
            style=" width:150px"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList3()">{{ $t("query") }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="$hasPermission('sys:role:delete')"
            type="danger"
            @click="deleteHandle3()"
            >{{ $t("deleteBatch") }}</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="$hasPermission('sys:role:save')"
            type="primary"
            @click="writeSAP()"
            >写入SAP</el-button
          >
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
        <el-table-column prop="recruiter" label="招聘专员" header-align="center" align="center" width="100"></el-table-column>
        <el-table-column prop="reportDate" label="报到日期" header-align="center" align="center" width="100"></el-table-column>
        <el-table-column prop="realName" label="姓名" header-align="center" align="center" width="100"></el-table-column>
        <el-table-column prop="gender" label="性别" header-align="center" align="center">
          <template slot-scope="scope">
            {{ $getDictLabel("gender", scope.row.gender) }}
          </template>
        </el-table-column>
        <el-table-column prop="firstDeptName" label="一级组织" header-align="center" align="center" width="100"></el-table-column>
        <el-table-column prop="secondDeptName" label="二级组织" header-align="center" align="center" width="100"></el-table-column>
        <el-table-column prop="thirdDeptName" label="三级组织" header-align="center" align="center" width="100"></el-table-column>
        <el-table-column prop="fourthDeptName" label="四级组织" header-align="center" align="center" width="100"></el-table-column>
        <el-table-column prop="postName" label="个人岗位名称" header-align="center" align="center" width="120"></el-table-column>
        <el-table-column prop="zzzh" label="职族" header-align="center" align="center" width="100"></el-table-column>
        <el-table-column prop="corporation" label="法人公司" header-align="center" align="center" width="220"></el-table-column>
        <el-table-column prop="zzzl" label="职类" header-align="center" align="center" width="100"></el-table-column>
        <el-table-column prop="contractPeriod" label="合同期限" header-align="center" align="center" width="100"></el-table-column>
        <el-table-column prop="probationPeriod" label="试用期" header-align="center" align="center" width="100"></el-table-column>
        <el-table-column prop="laborContractWorkplace" label="劳动合同工作地" header-align="center" align="center" width="180"></el-table-column>
        <el-table-column prop="costCenter" label="成本中心" header-align="center" align="center" width="150"></el-table-column>
        <el-table-column prop="mobile" label="手机号码" header-align="center" align="center" width="120"></el-table-column>
        <el-table-column prop="staffNature" label="员工类型" header-align="center" align="center" width="120"></el-table-column>
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
        width="50%"
        :modal="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-tree
          :data="positionNameArr"
          :props="potionNameProps"
          @node-click="positionNameTree"
        ></el-tree>
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
      positionNameArr: [
        {
          label: "记忆科技",
          children: [
            {
              label: "流程与IT变革中心",
              children: [
                {
                  label: "ERP IT部",
                  children: [
                    {
                      label: "50001238 开发高级工程师 (研发技术族-IT开发-张三)",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      title: "岗位编码",
      potionNameProps: {
        children: "children",
        label: "label",
      },
      row: 0,
      jobArr: ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9", "R10", "R11"],
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
      groupArr:[],
    };
  },
  methods: {
    positionNameClick(data) {
      this.row = data.$index;
      this.title = data.column.label
      this.positionNameVisible = true;
    },
    positionNameTree(data) {
      if(this.title == '岗位编码'){
        this.dataList[this.row].organizationPostName = this.positionNameArr[0].label;
        this.dataList[this.row].realName1 = this.positionNameArr[0].label;
        this.dataList[this.row].realName2 = this.positionNameArr[0].children[0].label;
        this.dataList[this.row].realName3 = this.positionNameArr[0].children[0].children[0].label;
        this.dataList[this.row].realName4 = this.positionNameArr[0].children[0].children[0].children[0].label;
      }else{
        this.dataList[this.row].costCenter = data.label;
      }
    },
    writeSAP(){
      if (this.dataListSelections.length <= 0) {
        return this.$message({
          message: '请选择',
          type: 'warning',
          duration: 1000
        })
      }
      this.$http.post(
        'staffInfoDetail/pushSap',this.dataListSelections.map((item)=>{return item.infoId})
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
  },
};
</script>
<style lang="css" scoped>
.positionName:hover {
  cursor: pointer;
}
</style>
