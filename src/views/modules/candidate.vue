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
            type="date"
            placeholder="开始日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="dataForm.createTimeEnd"
            type="date"
            placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="dataForm.noticeStatus"
            placeholder="提醒状态"
            style="width: 150px"
          >
            <el-option label="未提醒" value="0"> </el-option>
            <el-option label="已提醒" value="1"> </el-option>
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
            >{{ $t("deleteBatch") }}</el-button
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
        <el-form-item>
          <el-button
            v-if="$hasPermission('sys:role:save')"
            type="primary"
            @click="emailHandle()"
            >发起OA入职流程提醒邮件</el-button
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
        <el-table-column
          prop="offerDate"
          label="offer发放日期"
          header-align="center"
          align="center"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="reportDate"
          label="报到日期"
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
          prop="realName"
          label="姓名"
          header-align="center"
          align="center"
          width="100"
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
            <el-select v-model="scope.row.rank" placeholder="个人职级">
              <el-option v-for="item in jobArr" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
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
            <el-select
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
            </el-select>
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
            <el-select v-model="scope.row.probationPeriod" placeholder="试用期">
              <el-option
                v-for="item in probationArr"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
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
            <el-select
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
            </el-select>
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
            <el-select v-model="scope.row.actualWorkingPlace" placeholder="实际工作地">
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
          label="招聘方式"
          header-align="center"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.recruitmentMethod" placeholder="招聘方式">
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
          width="120"
        ></el-table-column>
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
          prop="jobNature"
          label="工作性质"
          header-align="center"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.jobNature" placeholder="工作性质">
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
      title: "编制岗位名称",
      potionNameProps: {
        children: "children",
        label: "label",
      },
      row: 0,
      jobArr: ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9", "R10", "R11"],
      contractPeriodArr: ["3个月", "6个月", "1年", "2年", "3年", "4年"],
      value3: "4年",
      value4: "3",
      probationArr: [0, 1, 2, 3, 4, 5, 6],
      recruitmentMethodArr: [
        "10/校园招聘",
        "11/社会招聘",
        "12/内部推荐",
        "13/猎头推荐",
        "14/劳务代招",
        "30/业务调整",
        "99/其他",
        "RH/离职回聘",
      ],
      employeeTypeArr: ["1/正式合同工", "2/实习员工", "3/劳务派遣工"],
      workPropertyArr: ["X/外派", "/非外派"],
    };
  },
  methods: {
    positionNameClick(data) {
      this.row = data.$index;
      this.title = data.column.label
      this.positionNameVisible = true;
    },
    positionNameTree(data) {
      if(this.title == '编制岗位名称'){
        this.dataList[this.row].organizationPostName = data.label;
      }else{
        this.dataList[this.row].costCenter = data.label;
      }
    },
    saveHandle(){
      this.$http.post(
        'staffInfoDetail/saveOrUpdate',this.dataList
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
      this.$http.post(
        '/staffInfoDetail/emailNotice',this.dataList.map(item => item.infoId)
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
  },
};
</script>
<style lang="css" scoped>
.positionName:hover {
  cursor: pointer;
}
</style>
