<template>
  <el-dialog :visible.sync="visible" width="77%" :close-on-click-modal="false" :close-on-press-escape="false">
    <div class="resume-print" style="margin-bottom:50px" v-for="item in dataForm" :key="item.id">
      <div class="table-title" style="border-top:1px solid #eaeef5">基本信息</div>
      <el-descriptions title="" :column="4" border>
        <el-descriptions-item label="姓名" label-style="width:91px" content-style="width:113px">{{item.realName}}</el-descriptions-item>
        <el-descriptions-item label="汉语拼音" content-style="width:124px"></el-descriptions-item>
        <el-descriptions-item label="英文名" content-style="width:124px"></el-descriptions-item>
        <el-descriptions-item label="曾用名" label-style="width:105px" content-style="width:240px;">
          <img class="avatar" :src="'api/'+item.headUrl">
        </el-descriptions-item>
        <el-descriptions-item label="性别" label-style="width:91px">{{item.gender}}</el-descriptions-item>
        <el-descriptions-item label="出生日期">{{item.birthDate}}</el-descriptions-item>
        <el-descriptions-item label="民族">{{item.nation}}</el-descriptions-item>
        <el-descriptions-item label="政治面貌">{{item.politicalOutlook}}</el-descriptions-item>
        <el-descriptions-item label="婚姻状况" label-style="width:91px">{{item.maritalStatus}}</el-descriptions-item>
        <el-descriptions-item label="结婚时间">{{item.marriedDate}}</el-descriptions-item>
        <el-descriptions-item label="子女数目">{{item.childrenNumber}}</el-descriptions-item>
        <el-descriptions-item label="家庭电话"></el-descriptions-item>
        <el-descriptions-item label="星座" label-style="width:91px"></el-descriptions-item>
        <el-descriptions-item label="籍贯(请从左依次选择省市)" label-style="width:110px">{{item.nativePlace}}</el-descriptions-item>
        <el-descriptions-item label="宗教"></el-descriptions-item>
        <el-descriptions-item label="出生地"></el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="4" border class="table-margin">
        <el-descriptions-item label="户口类型" label-style="width:91px" content-style="width:113px">{{item.residenceType}}</el-descriptions-item>
        <el-descriptions-item label="户口所在地(请从左依次选择省市县)" label-style="width:110px" content-style="width:339px">{{item.residenceAddr}}</el-descriptions-item>
        <el-descriptions-item label="档案所在地" label-style="width:105px"></el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="4" border class="table-margin">
        <el-descriptions-item label-style="width:91px" content-style="width:224px" label="手机号">{{item.mobile}}</el-descriptions-item>
        <el-descriptions-item label="E-mail" label-style="width:91px" content-style="width:247px">{{item.email}}</el-descriptions-item>
        <el-descriptions-item label="参加工作时间" label-style="width:105px">{{item.workTime}}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="4" border class="table-margin">
        <el-descriptions-item label="特长" label-style="width:91px">{{item.speciality}}</el-descriptions-item>
        <el-descriptions-item label="爱好" label-style="width:105px">{{item.hobby}}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="4" border class="table-margin">
        <el-descriptions-item label="身份证号" label-style="width:91px" content-style="width:224px">{{item.idCard}}</el-descriptions-item>
        <el-descriptions-item label="身份证地址(请选择省市县后填写详细地址信息)" label-style="width:282px" content-style="width:220px">{{item.idCardAddr}}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="4" border class="table-margin">
        <el-descriptions-item label="身份证有效开始时间" label-style="width:91px" content-style="width:224px">{{item.idCardStartDate}}</el-descriptions-item>
        <el-descriptions-item label="身份证有效结束时间" label-style="width:105px">{{item.idCardExpireDate}}</el-descriptions-item>
        <el-descriptions-item label="身份证签发机关" label-style="width:105px">{{item.issuingAuthority}}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="4" border class="table-margin">
        <el-descriptions-item label="紧急联系人" label-style="width:91px" content-style="width:224px">{{item.emergency}}</el-descriptions-item>
        <el-descriptions-item label="紧急联系人与本人关系" label-style="width:105px">{{item.emergencyRelation}}</el-descriptions-item>
        <el-descriptions-item label="紧急联系人电话" label-style="width:105px">{{item.emergencyMobile}}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="4" border class="table-margin">
        <el-descriptions-item label="是否有亲友任职于我司" label-style="width:91px" content-style="width:133px">{{item.relativeEmployment}}</el-descriptions-item>
        <el-descriptions-item label="任职于我司亲友姓名" label-style="width:91px" content-style="width:105px">{{item.relativePerson}}</el-descriptions-item>
        <el-descriptions-item label="任职于我司亲友与本人关系" label-style="width:106px" content-style="width:131px">{{item.relativePersonRelation}}</el-descriptions-item>
        <el-descriptions-item label="任职于我司亲友任职部门" label-style="width:105px">{{item.relativePersonDepart}}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="4" border class="table-margin">
        <el-descriptions-item label="现居住地址" label-style="width:91px" content-style="width:224px">{{item.address}}</el-descriptions-item>
        <el-descriptions-item label="邮编" label-style="width:105px" content-style="width:237px"></el-descriptions-item>
        <el-descriptions-item label="联系电话" label-style="width:105px">{{item.mobile}}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="4" border class="table-margin">
        <el-descriptions-item label="邮寄地址" label-style="width:91px" content-style="width:224px">{{item.postAddress}}</el-descriptions-item>
        <el-descriptions-item label="邮编" label-style="width:105px" content-style="width:237px"></el-descriptions-item>
        <el-descriptions-item label="联系电话" label-style="width:105px">{{item.mobile}}</el-descriptions-item>
      </el-descriptions>
      <div class="table-title">家庭关系</div>
        <el-table
          :data="item.familyRelations"
          border
          style="width: 100%;">
          <el-table-column prop="relation" label="与本人关系" header-align="center" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" header-align="center" align="center"></el-table-column>
          <el-table-column prop="birthDate" label="出生日期" header-align="center" align="center"></el-table-column>
          <el-table-column v-show="false" prop="gender" label="性别" header-align="center" align="center">
            <template>
              {{ $getDictLabel("gender", item.gender) }}
            </template>
          </el-table-column>
          <el-table-column prop="company" label="工作单位" header-align="center" align="center"></el-table-column>
          <el-table-column prop="position" label="任职情况" header-align="center" align="center"></el-table-column>
          <el-table-column prop="mobile" label="联系电话" header-align="center" align="center"></el-table-column>
        </el-table>
        <div class="table-title">教育经历</div>
        <el-table
          :data="item.educationalExperience"
          border
          style="width: 100%;">
          <el-table-column prop="enterDate" label="入学时间" header-align="center" align="center"></el-table-column>
          <el-table-column prop="leaveDate" label="毕业时间" header-align="center" align="center"></el-table-column>
          <el-table-column prop="schoolName" label="毕业院校" header-align="center" align="center"></el-table-column>
          <el-table-column prop="major" label="所学专业" header-align="center" align="center"></el-table-column>
          <el-table-column prop="education" label="学历" header-align="center" align="center"></el-table-column>
          <el-table-column prop="degree" label="学位" header-align="center" align="center"></el-table-column>
          <el-table-column prop="studyStyle" label="学习方式" header-align="center" align="center"></el-table-column>
          <el-table-column prop="highestEducation" label="是否最高学历" header-align="center" align="center">
            <template>
              {{ item.highestEducation ==0 ? '否': '是'}}
            </template>
          </el-table-column>
          <el-table-column prop="highestDegree" label="是否最高学位" header-align="center" align="center">
            <template>
              {{ item.highestDegree ==0 ? '否': '是'}}
            </template>
          </el-table-column>
          <el-table-column prop="post" label="在校职务" header-align="center" align="center"></el-table-column>
        </el-table>
        <div class="table-title">工作经历</div>
        <el-table
          :data="item.workExperience"
          border
          style="width: 100%;">
          <el-table-column prop="startDate" label="开始时间" header-align="center" align="center"></el-table-column>
          <el-table-column prop="endDate" label="结束时间" header-align="center" align="center"></el-table-column>
          <el-table-column prop="company" label="工作单位名称" header-align="center" align="center"></el-table-column>
          <el-table-column prop="depart" label="所属部门" header-align="center" align="center"></el-table-column>
          <el-table-column prop="post" label="职务名称" header-align="center" align="center"></el-table-column>
          <el-table-column prop="witness" label="证明人" header-align="center" align="center"></el-table-column>
          <el-table-column prop="mobile" label="联系电话" header-align="center" align="center"></el-table-column>
        </el-table>
        <div class="table-title">出国情况</div>
        <el-table
          :data="item.foreignExperience"
          border
          style="width: 100%;">
          <el-table-column prop="startDate" label="开始时间" header-align="center" align="center"></el-table-column>
          <el-table-column prop="endDate" label="结束时间" header-align="center" align="center"></el-table-column>
          <el-table-column prop="cause" label="出国事由" header-align="center" align="center"></el-table-column>
          <el-table-column prop="company" label="所至单位" header-align="center" align="center"></el-table-column>
          <el-table-column prop="totalCost" label="总费用(RMB)" header-align="center" align="center"></el-table-column>
          <el-table-column prop="bearMode" label="费用承担方式" header-align="center" align="center"></el-table-column>
        </el-table>
        <div class="table-title">专业技术职称</div>
        <el-table
          :data="item.personnelMajor"
          border
          style="width: 100%;">
          <el-table-column prop="post" label="职称" header-align="center" align="center"></el-table-column>
          <el-table-column prop="level" label="级别" header-align="center" align="center"></el-table-column>
          <el-table-column prop="assessDate" label="评定时间" header-align="center" align="center"></el-table-column>
        </el-table>
        <div class="table-title">培训经历</div>
        <el-table
          :data="item.trainingExperience"
          border
          style="width: 100%;">
          <el-table-column prop="startDate" label="开始时间" header-align="center" align="center"></el-table-column>
          <el-table-column prop="endDate" label="结束时间" header-align="center" align="center"></el-table-column>
          <el-table-column prop="content" label="培训内容" header-align="center" align="center"></el-table-column>
          <el-table-column prop="institution" label="培训机构" header-align="center" align="center"></el-table-column>
          <el-table-column prop="certificate" label="所获证书" header-align="center" align="center"></el-table-column>
          <el-table-column prop="totalCost" label="培训费用（RMB）" header-align="center" align="center"></el-table-column>
          <el-table-column prop="bearMode" label="费用承担方式" header-align="center" align="center"></el-table-column>
        </el-table>
        <div class="table-title">健康状况</div>
        <el-descriptions :column="4" border class="table-margin">
          <el-descriptions-item label="目前身体状况" label-style="width:105px" content-style="width:144px">{{item.health}}</el-descriptions-item>
          <el-descriptions-item label="一年内有无重大手术病史" label-style="width:105px">{{item.oneYearSurgicalHistory ==0 ? '否': '是'}}</el-descriptions-item>
          <el-descriptions-item label="有无重大疾病或遗传性病史" label-style="width:105px">{{item.majorDiseasesHistory ==0 ? '否': '是'}}</el-descriptions-item>
          <el-descriptions-item label="有无传染性疾病" label-style="width:105px">{{item.infectiousDiseases ==0 ? '否': '是'}}</el-descriptions-item>
        </el-descriptions>
        <div class="table-title">其他情况</div>
        <el-descriptions :column="4" border class="table-margin">
          <el-descriptions-item label="在原单位是否签订过与我司所任此职位相关的保密协议" label-style="width:105px">{{item.secrecyAgreement ==0 ? '否': '是'}}</el-descriptions-item>
          <el-descriptions-item label="是否仍处于竞业限制期内" label-style="width:105px">{{item.restrictTime ==0 ? '否': '是'}}</el-descriptions-item>
          <el-descriptions-item label="有无触犯法律、法规记录" label-style="width:105px">{{item.illegalRecord ==0 ? '否': '是'}}</el-descriptions-item>
          <el-descriptions-item label="有无受过原单位重大处分或惩罚" label-style="width:105px">{{item.majorPenalize ==0 ? '否': '是'}}</el-descriptions-item>
        </el-descriptions>
        <div style="display:flex;border:1px solid #eaeef5;margin-top:-1px">
          <div style="border-right:1px solid #eaeef5;width: 126px;display: flex;justify-content: center;align-items: center;">本人承诺</div>
          <div style="padding:0 6px">
            <p>本人现谨承诺：</p>
            <p>1、 我保证在此表上所填写的每一项内容都属实，如填写或提供虚假信息、资料，属于严重违纪，我无条件地同意公司解除劳动合同的决定，且不索要任何经济补偿或赔偿；</p>
            <p>2、 我同意公司对我提供的信息，如：品德、工作经验、教育背景等进行背景调查；</p>
            <p>3、 我保证已与原工作单位解除工作关系，且不处于与原单位约定的竞业限制期内。如与原单位有任何劳动纠纷或商业秘密纠纷等，我愿意由本人承担由此产生的一切责任；</p>
            <p>4、 公司有关书面文件、通知等无法直接送达员工时，员工确认本表中所填写的住址为邮寄送达地址。如变更住址，本人将在变动后的三个工作日内及时书面通知公司。</p>
            <p style="text-align: right;"><span style="margin-right:128px">员工签名：</span><span style="margin-right:60px">日期：</span><span style="margin-right:30px">        年     </span><span style="margin-right:30px">月    </span>日</p>
          </div>
        </div>
        
    </div>
    <template slot="footer">
      <el-button type="primary" @click="printResume">打印</el-button>
      <el-button @click="visible = false">关闭</el-button>
      <!-- <el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('confirm') }}</el-button> -->
    </template>
  </el-dialog>
</template>

<script>
import print from 'print-js'
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
      this.getInfo()
    },
    // 获取信息
    getInfo () {
      let formData = new FormData();
      formData.append("ids", this.dataForm.ids)
      this.$http.post(`/staffInfo/detailList`,formData).then(({ data: res }) => {
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }else{
          this.dataForm = res.data
        }
        
      }).catch(() => {})
    },
    printResume() {
      print({ 
        printable: 'printJS-form',
        type: 'html',
        // header: '个人简历',
        // headerStyle: 'text-align:center;color:#f00;width:100%;border:1px #000 solid;',
        // targetStyles: ['border', 'padding: 15px'],
        scanStyles: false,
        // style: 'table tr td,th { border-collapse: collapse;padding: 15px;border:1px #000 solid; }' // 表格样式
      })
    },
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

.avatar{
  position: absolute;
  right:20px;
  width: 120px;
  height: 137px;
  margin-top: -22px;
}
.table-title{
   border-left:1px solid #eaeef5;border-right:1px solid #eaeef5; padding: 12px 10px;font-weight: 600;color: #303133;
}
.table-margin{
  margin-top:-2px;
}

.resume-print .el-table th{
  background-color: #fafafa !important;
}
</style>
