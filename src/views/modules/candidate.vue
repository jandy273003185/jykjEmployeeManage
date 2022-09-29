<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-sys__role">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input v-model="dataForm.name" placeholder="姓名" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="dataForm.value2"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 300px"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <ren-select
            v-model="dataForm.gender"
            dict-type=""
            placeholder="写入SAP状态"
            style="width: 150px"
          ></ren-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()">{{ $t("query") }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="$hasPermission('sys:role:delete')"
            type="danger"
            @click="deleteHandle()"
            >{{ $t("deleteBatch") }}</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="$hasPermission('sys:role:save')"
            type="primary"
            @click="addOrUpdateHandle()"
            >写入SAP</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="$hasPermission('sys:role:save')"
            type="primary"
            @click="addOrUpdateHandle()"
            >同步SAP</el-button
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
        <el-table-column
          prop="name"
          label="offer发放日期"
          header-align="center"
          align="center"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="date"
          label="报到日期"
          header-align="center"
          align="center"
          width="180"
        >
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.date"
              type="date"
              placeholder="选择日期"
              style="width: 150px"
            >
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          sortable="custom"
          header-align="center"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          sortable="custom"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createDate"
          label="入职地"
          sortable="custom"
          header-align="center"
          align="center"
          width="180"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.value" placeholder="入职地">
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
          prop="createDate"
          label="法人公司"
          sortable="custom"
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
          prop="postionName"
          label="编制岗位名称"
          sortable="custom"
          header-align="center"
          align="center"
          min-width="150"
        >
          <template slot-scope="scope">
            <el-input
              class="postionName"
              v-model="scope.row.postionName"
              readonly
              @click.native="postionNameClick(scope)"
              placeholder="编制岗位名称"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="个人岗位名称"
          sortable="custom"
          header-align="center"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.aaa" placeholder="个人岗位名称" />
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="个人职级"
          sortable="custom"
          header-align="center"
          align="center"
          width="130"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.value2" placeholder="个人职级">
              <el-option v-for="item in jobArr" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="合同期限"
          sortable="custom"
          header-align="center"
          align="center"
          width="130"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.value3" placeholder="合同期限">
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
          prop="name"
          label="试用期"
          sortable="custom"
          header-align="center"
          align="center"
          width="120"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.value4" placeholder="试用期">
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
          prop="name"
          label="劳动合同工作地"
          sortable="custom"
          header-align="center"
          align="center"
          width="166"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.value5" placeholder="劳动合同工作地">
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
          prop="name"
          label="实际工作地"
          sortable="custom"
          header-align="center"
          align="center"
          width="160"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.value6" placeholder="实际工作地">
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
          prop="name"
          label="成本中心"
          sortable="custom"
          header-align="center"
          align="center"
          width="180"
        >
          <template slot-scope="scope">
            <el-input
              class="postionName"
              v-model="scope.row.postionName"
              readonly
              @click.native="postionNameClick(scope)"
              placeholder="成本中心"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="手机号码"
          sortable="custom"
          header-align="center"
          align="center"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="offer确认邮箱"
          sortable="custom"
          header-align="center"
          align="center"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="招聘方式"
          sortable="custom"
          header-align="center"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.value8" placeholder="招聘方式">
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
          prop="name"
          label="内部推荐人"
          sortable="custom"
          header-align="center"
          align="center"
          width="120"
        ></el-table-column>
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
        :visible.sync="postionNameVisible"
        width="50%"
        :modal="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-tree
          :data="postionNameArr"
          :props="potionNameProps"
          @node-click="postionNameTree"
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
        getDataListURL: "/sys/role/page",
        getDataListIsPage: true,
        deleteURL: "/sys/role",
        deleteIsBatch: true,
      },
      postionNameVisible: false,
      dataForm: {
        name: "",
        value2: "",
        gender: "",
      },
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
      postionNameArr: [
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
      title: "岗位名称",
      potionNameProps: {
        children: "children",
        label: "label",
      },
      row: 0,
      jobArr: ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9", "R10", "R11"],
      contractPeriodArr: ["1年", "2年", "3年", "4年"],
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
    };
  },
  methods: {
    postionNameClick(data) {
      this.row = data.$index;
      if (data.row.postionName) {
        this.title = "岗位名称";
      } else {
        this.title = "成本中心";
      }
      this.postionNameVisible = true;
    },
    postionNameTree(data) {
      this.dataList[this.row].postionName = data.label;
    },
  },
};
</script>
<style lang="css" scoped>
.postionName:hover {
  cursor: pointer;
}
</style>
