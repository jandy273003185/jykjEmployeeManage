<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-sys__user">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input
            v-model="dataForm.realName"
            :placeholder="$t('user.realName')"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="dataForm.createTimeStart"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="创建开始日期"
            style="width:150px"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="dataForm.createTimeEnd"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="创建结束日期"
            style="width:150px"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()">{{ $t("query") }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="exportHandle2(null,'/staffInfo/export')">批量下载入职信息表</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="exportHandle2(null,'/staffInfo/exportSum')">批量下载入职信息汇总表</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="exportHandle2(null,'/staffInfo/downloadHeadPic')">批量下载员工头像</el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="dataListLoading"
        :data="dataList"
        border
        @sort-change="dataListSortChangeHandle"
        @selection-change="dataListSelectionChangeHandle"
        style="width: 100%"
      >
        <!-- <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column> -->
        <el-table-column
          type="selection"
          header-align="center"
          align="center"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="realName"
          label="姓名"
          header-align="center"
          align="center"
          width="90"
        ></el-table-column>
        <el-table-column prop="headUrl" label="照片" header-align="center" align="center">
          <template slot-scope="scope">
            <el-popover placement="top-start" trigger="click">
              <a :href="'api/'+scope.row.headUrl" target="_blank" title="查看最大化图片">
                <img width="390" height="390" :src="'api/'+scope.row.headUrl" />
              </a>
              <img
                slot="reference"
                :src="'api/'+scope.row.headUrl"
                style="width: 50px; height: 50px; cursor: pointer"
              />
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="gender"
          :label="$t('user.gender')"
          header-align="center"
          align="center"
          width="60"
        >
          <template slot-scope="scope">
            {{ $getDictLabel("gender", scope.row.gender) }}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="deptName" :label="$t('user.deptName')" header-align="center" align="center"></el-table-column> -->
        <el-table-column
          prop="mobile"
          :label="$t('user.mobile')"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="idCard"
          label="身份证号"
          header-align="center"
          align="center"
          width="170"
        ></el-table-column>
        <el-table-column
          prop="nation"
          label="民族"
          header-align="center"
          align="center"
        ></el-table-column>
        <!-- <el-table-column prop="status" :label="$t('user.status')" header-align="center" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" size="small" type="danger">{{ $t('user.status0') }}</el-tag>
            <el-tag v-else size="small" type="success">{{ $t('user.status1') }}</el-tag>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="createTime"
          :label="$t('user.createDate')"
          header-align="center"
          align="center"
          width="180"
        ></el-table-column>
        <el-table-column
          :label="$t('handle')"
          fixed="right"
          header-align="center"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="addOrUpdateHandle(scope.row.id)"
              >查看</el-button>
              <el-button type="text" size="small" @click="exportHandle2(scope.row,'/staffInfo/export')"
              >下载</el-button>
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
      <!-- 弹窗, 新增 / 修改 -->
      <add-or-update
        v-if="addOrUpdateVisible"
        ref="addOrUpdate"
        @refreshDataList="getDataList"
      ></add-or-update>
    </div>
  </el-card>
</template>

<script>
import mixinViewModule from "@/mixins/view-module";
import AddOrUpdate from "./workerInfo-add-or-update";
export default {
  mixins: [mixinViewModule],
  data() {
    return {
      mixinViewModuleOptions: {
        getDataListURL: "/workerInfo/page",
        getDataListIsPage: true,
        exportIsBatch: true,
        exportURL: "/staffInfo/export",
      },
      dataForm: {
        realName: "",
      },
    };
  },
  components: {
    AddOrUpdate,
  },
};
</script>
