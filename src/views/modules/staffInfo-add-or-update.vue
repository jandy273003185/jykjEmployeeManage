<template>
  <el-dialog :visible.sync="visible" width="95%" :title="!dataForm.id ? $t('add') : '详情'" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="dataForm" inline  :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()" label-width="208px">
      <el-form-item prop="realName" :label="$t('user.realName')">
        <el-input v-model="dataForm.realName" :placeholder="$t('user.realName')"></el-input>
      </el-form-item>
      <el-form-item prop="gender" :label="$t('user.gender')">
        <ren-radio-group v-model="dataForm.gender" dict-type="gender"></ren-radio-group>
      </el-form-item>
      <el-form-item prop="nation" label="民族">
        <el-input v-model="dataForm.nation"></el-input>
      </el-form-item>
      <el-form-item prop="politicalOutlook" label="政治面貌">
        <el-input v-model="dataForm.politicalOutlook"></el-input>
      </el-form-item>
      <el-form-item prop="maritalStatus" label="婚姻状况">
        <el-input v-model="dataForm.maritalStatus"></el-input>
      </el-form-item>
      <el-form-item prop="marriedDate" label="结婚时间">
        <el-input v-model="dataForm.marriedDate"></el-input>
      </el-form-item>
      <el-form-item prop="childrenNumber" label="子女数目">
        <el-input v-model="dataForm.childrenNumber"></el-input>
      </el-form-item>
      <el-form-item prop="nativePlace" label="籍贯">
        <el-input v-model="dataForm.nativePlace"></el-input>
      </el-form-item>
      <el-form-item prop="residenceType" label="户口类型">
        <el-input v-model="dataForm.residenceType"></el-input>
      </el-form-item>
      <el-form-item prop="residenceAddr" label="户口所在地">
        <el-input v-model="dataForm.residenceAddr"></el-input>
      </el-form-item>
      <el-form-item prop="mobile" label="手机号">
        <el-input v-model="dataForm.mobile"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="dataForm.email"></el-input>
      </el-form-item>
      <el-form-item prop="workTime" label="参加工作时间">
        <el-input v-model="dataForm.workTime"></el-input>
      </el-form-item>
      <el-form-item prop="idCard" label="身份证号">
        <el-input v-model="dataForm.idCard"></el-input>
      </el-form-item>
      <el-form-item prop="birthDate" label="出生日期">
        <el-input v-model="dataForm.birthDate"></el-input>
      </el-form-item>
      <el-form-item prop="idCardAddr" label="身份证地址">
        <el-input v-model="dataForm.idCardAddr"></el-input>
      </el-form-item>
      <el-form-item prop="issuingAuthority" label="身份证签发机关">
        <el-input v-model="dataForm.issuingAuthority"></el-input>
      </el-form-item>
      <el-form-item prop="idCardStartDate" label="身份证有效开始时间">
        <el-input v-model="dataForm.idCardStartDate"></el-input>
      </el-form-item>
      <el-form-item prop="idCardExpireDate" label="身份证有效结束时间">
        <el-input v-model="dataForm.idCardExpireDate"></el-input>
      </el-form-item>
      <el-form-item prop="emergency" label="紧急联系人">
        <el-input v-model="dataForm.emergency"></el-input>
      </el-form-item>
      <el-form-item prop="emergencyRelation" label="紧急联系人与本人关系">
        <el-input v-model="dataForm.emergencyRelation"></el-input>
      </el-form-item>
      <el-form-item prop="emergencyMobile" label="紧急联系人电话">
        <el-input v-model="dataForm.emergencyMobile"></el-input>
      </el-form-item>
      <el-form-item prop="relativeEmployment" label="是否有亲友任职于我司">
        <el-input v-model="dataForm.relativeEmployment ==0 ? '否': '是'"></el-input>
      </el-form-item>
      <el-form-item prop="relativePerson" label="任职于我司亲友姓名">
        <el-input v-model="dataForm.relativePerson"></el-input>
      </el-form-item>
      <el-form-item prop="relativePersonRelation" label="任职于我司亲友与本人关系">
        <el-input v-model="dataForm.relativePersonRelation"></el-input>
      </el-form-item>
      <el-form-item prop="relativePersonDepart" label="任职于我司亲友任职部门">
        <el-input v-model="dataForm.relativePersonDepart"></el-input>
      </el-form-item>
      <el-form-item prop="address" label="现居住地址">
        <el-input v-model="dataForm.address"></el-input>
      </el-form-item>
      <el-form-item prop="postAddress" label="邮寄地址">
        <el-input v-model="dataForm.postAddress"></el-input>
      </el-form-item>
      <!-- <el-form-item prop="postAddress" label="家庭关系"></el-form-item> -->
      <el-table
        :data="dataForm.familyRelations"
        border
        style="width: 100%;margin-bottom:20px">
        <el-table-column prop="relation" label="与本人关系" header-align="center" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" header-align="center" align="center"></el-table-column>
        <el-table-column prop="birthDate" label="出生日期" header-align="center" align="center"></el-table-column>
        <el-table-column prop="gender" label="性别" header-align="center" align="center">
          <template>
            {{ $getDictLabel("gender", dataForm.gender) }}
          </template>
        </el-table-column>
        <el-table-column prop="company" label="工作单位" header-align="center" align="center"></el-table-column>
        <el-table-column prop="position" label="任职情况" header-align="center" align="center"></el-table-column>
        <el-table-column prop="mobile" label="联系电话" header-align="center" align="center"></el-table-column>
      </el-table>
      <el-table
        :data="dataForm.educationalExperience"
        border
        style="width: 100%;margin-bottom:20px">
        <el-table-column prop="enterDate" label="入学时间" header-align="center" align="center"></el-table-column>
        <el-table-column prop="leaveDate" label="毕业时间" header-align="center" align="center"></el-table-column>
        <el-table-column prop="schoolName" label="毕业院校" header-align="center" align="center"></el-table-column>
        <el-table-column prop="major" label="所学专业" header-align="center" align="center"></el-table-column>
        <el-table-column prop="education" label="学历" header-align="center" align="center"></el-table-column>
        <el-table-column prop="degree" label="学位" header-align="center" align="center"></el-table-column>
        <el-table-column prop="studyStyle" label="学习方式" header-align="center" align="center"></el-table-column>
        <el-table-column prop="highestEducation" label="是否最高学历" header-align="center" align="center">
          <template>
            {{ dataForm.highestEducation ==0 ? '否': '是'}}
          </template>
        </el-table-column>
        <el-table-column prop="highestDegree" label="是否最高学位" header-align="center" align="center">
          <template>
            {{ dataForm.highestDegree ==0 ? '否': '是'}}
          </template>
        </el-table-column>
        <el-table-column prop="post" label="在校职务" header-align="center" align="center"></el-table-column>
      </el-table>
      <el-table
        :data="dataForm.workExperience"
        border
        style="width: 100%;margin-bottom:20px">
        <el-table-column prop="startDate" label="开始时间" header-align="center" align="center"></el-table-column>
        <el-table-column prop="endDate" label="结束时间" header-align="center" align="center"></el-table-column>
        <el-table-column prop="company" label="工作单位名称" header-align="center" align="center"></el-table-column>
        <el-table-column prop="depart" label="所属部门" header-align="center" align="center"></el-table-column>
        <el-table-column prop="post" label="职务名称" header-align="center" align="center"></el-table-column>
        <el-table-column prop="witness" label="证明人" header-align="center" align="center"></el-table-column>
        <el-table-column prop="mobile" label="联系电话" header-align="center" align="center"></el-table-column>
      </el-table>
      <el-table
        :data="dataForm.foreignExperience"
        border
        style="width: 100%;margin-bottom:20px">
        <el-table-column prop="startDate" label="开始时间" header-align="center" align="center"></el-table-column>
        <el-table-column prop="endDate" label="结束时间" header-align="center" align="center"></el-table-column>
        <el-table-column prop="cause" label="出国事由" header-align="center" align="center"></el-table-column>
        <el-table-column prop="company" label="所至单位" header-align="center" align="center"></el-table-column>
        <el-table-column prop="totalCost" label="总费用（RMB）" header-align="center" align="center"></el-table-column>
        <el-table-column prop="bearMode" label="费用承担方式" header-align="center" align="center"></el-table-column>
      </el-table>
      <el-table
        :data="dataForm.personnelMajor"
        border
        style="width: 100%;margin-bottom:20px">
        <el-table-column prop="post" label="职称" header-align="center" align="center"></el-table-column>
        <el-table-column prop="level" label="级别" header-align="center" align="center"></el-table-column>
        <el-table-column prop="assessDate" label="评定时间" header-align="center" align="center"></el-table-column>
      </el-table>
      <el-table
        :data="dataForm.trainingExperience"
        border
        style="width: 100%;margin-bottom:20px">
        <el-table-column prop="startDate" label="开始时间" header-align="center" align="center"></el-table-column>
        <el-table-column prop="endDate" label="结束时间" header-align="center" align="center"></el-table-column>
        <el-table-column prop="content" label="培训内容" header-align="center" align="center"></el-table-column>
        <el-table-column prop="institution" label="培训机构" header-align="center" align="center"></el-table-column>
        <el-table-column prop="certificate" label="所获证书" header-align="center" align="center"></el-table-column>
        <el-table-column prop="totalCost" label="培训费用（RMB）" header-align="center" align="center"></el-table-column>
        <el-table-column prop="bearMode" label="费用承担方式" header-align="center" align="center"></el-table-column>
      </el-table>
      
      <el-form-item prop="health" label="目前身体状况">
        <el-input v-model="dataForm.health"></el-input>
      </el-form-item>
      <el-form-item prop="oneYearSurgicalHistory" label="一年内有无重大手术病史">
        <el-input v-model="dataForm.oneYearSurgicalHistory ==0 ? '否': '是'"></el-input>
      </el-form-item>
      <el-form-item prop="majorDiseasesHistory" label="有无重大疾病或遗传性病史">
        <el-input v-model="dataForm.majorDiseasesHistory ==0 ? '否': '是'"></el-input>
      </el-form-item>
      <el-form-item prop="infectiousDiseases" label="有无传染性疾病">
        <el-input v-model="dataForm.infectiousDiseases ==0 ? '否': '是'"></el-input>
      </el-form-item>
      
      <el-form-item prop="restrictTime" label="是否仍处于竞业限制期内">
        <el-input v-model="dataForm.restrictTime ==0 ? '否': '是'"></el-input>
      </el-form-item>
      <el-form-item prop="illegalRecord" label="有无触犯法律、法规记录">
        <el-input v-model="dataForm.illegalRecord ==0 ? '否': '是'"></el-input>
      </el-form-item>
      <el-form-item prop="majorPenalize" label="有无受过原单位重大处分或惩罚">
        <el-input v-model="dataForm.majorPenalize ==0 ? '否': '是'"></el-input>
      </el-form-item>
      <el-form-item class="secrecyAgreement" prop="secrecyAgreement" label="在原单位是否签订过与我司所任此职位相关的保密协议">
        <el-input v-model="dataForm.secrecyAgreement ==0 ? '否': '是'"></el-input>
      </el-form-item>
      <el-form-item prop="recruiter" label="招聘人姓名">
        <el-input v-model="dataForm.recruiter"></el-input>
      </el-form-item>
      <!-- <el-form-item prop="status" :label="$t('user.status')" size="mini">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="0">{{ $t('user.status0') }}</el-radio>
          <el-radio :label="1">{{ $t('user.status1') }}</el-radio>
        </el-radio-group>
      </el-form-item> -->
    </el-form>
    <template slot="footer">
      <el-button @click="visible = false">关闭</el-button>
      <!-- <el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('confirm') }}</el-button> -->
    </template>
  </el-dialog>
</template>

<script>
import debounce from 'lodash/debounce'
import { isEmail, isMobile } from '@/utils/validate'
export default {
  data () {
    return {
      visible: false,
      roleList: [],
      roleIdListDefault: [],
      dataForm: {}
    }
  },
  computed: {
    dataRule () {
      var validatePassword = (rule, value, callback) => {
        if (!this.dataForm.id && !/\S/.test(value)) {
          return callback(new Error(this.$t('validate.required')))
        }
        callback()
      }
      var validateConfirmPassword = (rule, value, callback) => {
        if (!this.dataForm.id && !/\S/.test(value)) {
          return callback(new Error(this.$t('validate.required')))
        }
        if (this.dataForm.password !== value) {
          return callback(new Error(this.$t('user.validate.confirmPassword')))
        }
        callback()
      }
      var validateEmail = (rule, value, callback) => {
        if (value && !isEmail(value)) {
          return callback(new Error(this.$t('validate.format', { 'attr': this.$t('user.email') })))
        }
        callback()
      }
      var validateMobile = (rule, value, callback) => {
        if (value && !isMobile(value)) {
          return callback(new Error(this.$t('validate.format', { 'attr': this.$t('user.mobile') })))
        }
        callback()
      }
      return {
        realName: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        deptName: [
          { required: true, message: this.$t('validate.required'), trigger: 'change' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validateConfirmPassword, trigger: 'blur' }
        ],
        realName: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
        mobile: [
          { validator: validateMobile, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init () {
      this.visible = true
      this.dataForm.deptId = ''
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.roleIdListDefault = []
        Promise.all([
          // this.getRoleList()
        ]).then(() => {
          if (this.dataForm.id) {
            this.getInfo()
          }
        })
      })
    },
    // 获取角色列表
    getRoleList () {
      return this.$http.get('/sys/role/list').then(({ data: res }) => {
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.roleList = res.data
      }).catch(() => {})
    },
    // 获取信息
    getInfo () {
      this.$http.get(`/staffInfo/detail/${this.dataForm.id}`).then(({ data: res }) => {
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }else{
          this.dataForm = res.data
        }
        
      }).catch(() => {})
    },
    // 表单提交
    dataFormSubmitHandle: debounce(function () {
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) {
          return false
        }
        this.$http[!this.dataForm.id ? 'post' : 'put']('/sys/user', {
          ...this.dataForm,
          roleIdList: [
            ...this.dataForm.roleIdList,
            ...this.roleIdListDefault
          ]
        }).then(({ data: res }) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.$message({
            message: this.$t('prompt.success'),
            type: 'success',
            duration: 500,
            onClose: () => {
              this.visible = false
              this.$emit('refreshDataList')
            }
          })
        }).catch(() => {})
      })
    }, 1000, { 'leading': true, 'trailing': false })
  }
}
</script>

<style lang="scss">
.mod-sys__user {
  .role-list {
    .el-select {
      width: 100%;
    }
  }
}
.secrecyAgreement .el-form-item__label{
 line-height: 22px !important;
}
</style>
