<template>
  <el-dialog :visible.sync="visible" width="76%" :close-on-click-modal="false" :close-on-press-escape="false">
    <div id="printJS-table">
      <table class="tb" v-for="item in dataForm" :key="item.id">
        <tr>
          <td class="tb-title" colspan="10">基本信息</td>
        </tr>
        <tr>
          <td class="bg-gray">姓名</td><td>{{item.realName}}</td><td class="bg-gray">汉语拼音</td><td></td><td class="bg-gray">英文名</td><td></td><td class="bg-gray">曾用名</td><td colspan="2"></td><td rowspan="4" style="padding:2px"><img v-if="item.headUrl" class="avatar" :src="'/api'+item.headUrl" alt=""></td>
        </tr>
        <tr>
          <td class="bg-gray">性别</td><td>{{ $getDictLabel("gender", item.gender) }}</td><td class="bg-gray">出生日期</td><td>{{item.birthDate}}</td><td class="bg-gray">民族</td><td>{{item.nation}}</td><td class="bg-gray">政治面貌</td><td colspan="2">{{item.politicalOutlook}}</td>
        </tr>
        <tr>
          <td class="bg-gray">婚姻状况</td><td>{{item.maritalStatus}}</td><td class="bg-gray">结婚时间</td><td>{{item.marriedDate}}</td><td class="bg-gray">子女数目</td><td>{{item.childrenNumber}}</td><td class="bg-gray">家庭电话</td><td colspan="2"></td>
        </tr>
        <tr>
          <td class="bg-gray">星座</td><td></td><td class="bg-gray">籍贯(请从左依次选择省市)</td><td>{{item.nativePlace}}</td><td class="bg-gray">宗教</td><td></td><td class="bg-gray">出生地</td><td colspan="2"></td>
        </tr>
        <tr>
          <td class="bg-gray">户口类型</td><td>{{item.residenceType}}</td><td class="bg-gray" colspan="2">户口所在地(请从左依次选择省市县)</td><td colspan="3">{{item.residenceAddr}}</td><td class="bg-gray">档案所在地</td><td colspan="2"></td>
        </tr>
        <tr>
          <td class="bg-gray">手机号</td><td colspan="2">{{item.mobile}}</td><td class="bg-gray">E-mail</td><td colspan="3">{{item.email}}</td><td class="bg-gray">参加工作时间</td><td colspan="2">{{item.workTime}}</td>
        </tr>
        <tr>
          <td class="bg-gray">特长</td><td colspan="4">{{item.speciality}}</td><td class="bg-gray">爱好</td><td colspan="4">{{item.hobby}}</td>
        </tr>
        <tr>
          <td class="bg-gray">身份证号</td><td colspan="4">{{item.idCard}}</td><td class="bg-gray" colspan="2">身份证地址(请选择省市县后填写详细地址信息)</td><td colspan="3">{{item.idCardAddr}}</td>
        </tr>
        <tr>
          <td class="bg-gray">身份证有效开始时间</td><td colspan="2">{{item.idCardStartDate}}</td><td class="bg-gray">身份证有效结束时间</td><td colspan="3">{{item.idCardExpireDate}}</td><td class="bg-gray">身份证签发机关</td><td colspan="2">{{item.issuingAuthority}}</td>
        </tr>
        <tr>
          <td class="bg-gray">紧急联系人</td><td colspan="2">{{item.emergency}}</td><td class="bg-gray">紧急联系人与本人关系</td><td colspan="3">{{item.emergencyRelation}}</td><td class="bg-gray">紧急联系人电话</td><td colspan="2">{{item.emergencyMobile}}</td>
        </tr>
        <tr>
          <td class="bg-gray">是否有亲友任职于我司</td><td>{{item.relativeEmployment ==0 ? '否': '是'}}</td><td class="bg-gray">任职于我司亲友姓名</td><td>{{item.relativePerson}}</td><td class="bg-gray">任职于我司亲友与本人关系</td><td colspan="2">{{item.relativePersonRelation}}</td><td class="bg-gray">任职于我司亲友任职部门</td><td colspan="2">{{item.relativePersonDepart}}</td>
        </tr>
        <tr>
          <td class="bg-gray">现居住地址</td><td colspan="2">{{item.address}}</td><td class="bg-gray">邮编</td><td colspan="3"></td><td class="bg-gray">联系电话</td><td colspan="2">{{item.mobile}}</td>
        </tr>
        <tr>
          <td class="bg-gray">邮寄地址</td><td colspan="2">{{item.postAddress}}</td><td class="bg-gray">邮编</td><td colspan="3"></td><td class="bg-gray">联系电话</td><td colspan="2">{{item.mobile}}</td>
        </tr>
        <tr>
          <td class="tb-title" colspan="10">家庭关系(子女出生日期必填)</td>
        </tr>
        <tr class="family">
          <td class="bg-gray">与本人关系</td><td class="bg-gray">姓名</td><td class="bg-gray">出生日期</td><td class="bg-gray">性别</td><td class="bg-gray" colspan="3">工作单位</td><td class="bg-gray">任职情况</td><td class="bg-gray" colspan="2">联系电话</td>
        </tr>
        <tr v-for="family in item.familyRelations" :key="family.id">
          <td>{{family.relation}}</td><td>{{family.name}}</td><td>{{family.birthDate}}</td><td>{{ $getDictLabel("gender", family.gender) }}</td><td colspan="3">{{family.company}}</td><td>{{family.position}}</td><td colspan="2">{{family.mobile}}</td>
        </tr>
        <tr>
          <td class="tb-title" colspan="10">教育经历</td>
        </tr>
        <tr>
          <td class="bg-gray">入学时间</td><td class="bg-gray">毕业时间</td><td class="bg-gray">毕业院校</td><td class="bg-gray">所学专业</td><td class="bg-gray">学历</td><td class="bg-gray">学位</td><td class="bg-gray">学习方式</td><td class="bg-gray">是否最高学历</td><td class="bg-gray">是否最高学位</td><td class="bg-gray">在校职务</td>
        </tr>
        <tr v-for="educational in item.educationalExperience" :key="educational.id">
          <td>{{educational.enterDate}}</td><td>{{educational.leaveDate}}</td><td>{{educational.schoolName}}</td><td>{{educational.major}}</td><td>{{educational.education}}</td><td>{{educational.degree}}</td><td>{{educational.studyStyle}}</td><td>{{educational.highestEducation ==0 ? '否': '是'}}</td><td>{{educational.highestDegree ==0 ? '否': '是'}}</td><td>{{educational.post}}</td>
        </tr>
        <tr>
          <td class="tb-title" colspan="8" style="border: none;">工作经历</td><td style="background-color: #fff;position: absolute;height: 20px;border: none;border-top:1px solid #eaeef5;margin-top:-1px;"></td>
        </tr>
        <tr>
          <td class="bg-gray">开始时间</td><td class="bg-gray">结束时间</td><td class="bg-gray" colspan="3">工作单位名称</td><td class="bg-gray">所属部门</td><td class="bg-gray">职务名称</td><td class="bg-gray">证明人</td><td class="bg-gray" colspan="2">联系电话</td>
        </tr>
        <tr v-for="work in item.workExperience" :key="work.id">
          <td>{{work.startDate}}</td><td>{{work.endDate}}</td><td colspan="3">{{work.company}}</td><td>{{work.depart}}</td><td>{{work.post}}</td><td>{{work.witness}}</td><td colspan="2">{{work.mobile}}</td>
        </tr>
        <tr>
          <td class="tb-title" colspan="10">出国情况</td>
        </tr>
        <tr>
          <td class="bg-gray">开始时间</td><td class="bg-gray">结束时间</td><td class="bg-gray" colspan="2">出国事由</td><td class="bg-gray" colspan="3">所至单位</td><td class="bg-gray">总费用(RMB)</td><td class="bg-gray" colspan="2">费用承担方式</td>
        </tr>
        <tr v-for="foreign in item.foreignExperience" :key="foreign.id">
          <td>{{foreign.startDate}}</td><td>{{foreign.endDate}}</td><td colspan="2">{{foreign.cause}}</td><td colspan="3">{{foreign.company}}</td><td>{{foreign.totalCost}}</td><td colspan="2">{{foreign.bearMode}}</td>
        </tr>
        <tr>
          <td class="tb-title" colspan="10">专业技术职称</td>
        </tr>
        <tr>
          <td class="bg-gray" colspan="4">职称</td><td class="bg-gray" colspan="4">级别</td><td class="bg-gray" colspan="2">评定时间</td>
        </tr>
        <tr v-for="major in item.personnelMajor" :key="major.id">
          <td colspan="4">{{major.post}}</td><td colspan="4">{{major.level}}</td><td colspan="2">{{major.assessDate}}</td>
        </tr>
        <tr>
          <td class="tb-title" colspan="10">培训经历</td>
        </tr>
        <tr>
          <td class="bg-gray">开始时间</td><td class="bg-gray">结束时间</td><td class="bg-gray" colspan="2">培训内容</td><td class="bg-gray" colspan="2">培训机构</td><td class="bg-gray">所获证书</td><td class="bg-gray" colspan="2">培训费用(RMB)</td><td class="bg-gray">费用承担方式</td>
        </tr>
        <tr v-for="training in item.trainingExperience" :key="training.id">
          <td>{{training.startDate}}</td><td>{{training.endDate}}</td><td colspan="2">{{training.content}}</td><td colspan="2">{{training.institution}}</td><td>{{training.certificate}}</td><td colspan="2">{{training.totalCost}}</td><td>{{training.bearMode}}</td>
        </tr>
        <tr>
          <td class="tb-title" colspan="10">健康状况</td>
        </tr>
        <tr>
          <td class="bg-gray" colspan="2">目前身体状况</td><td>{{item.health}}</td><td class="bg-gray">一年内有无重大手术病史</td><td>{{item.oneYearSurgicalHistory ==0 ? '否': '是'}}</td><td class="bg-gray">有无重大疾病或遗传性病史</td><td>{{item.majorDiseasesHistory ==0 ? '否': '是'}}</td><td class="bg-gray" colspan="2">有无传染性疾病</td><td>{{item.infectiousDiseases ==0 ? '否': '是'}}</td>
        </tr>
        <tr>
          <td class="tb-title" colspan="10">其他情况</td>
        </tr>
        <tr>
          <td class="bg-gray" colspan="2">在原单位是否签订过与我司所任此职位相关的保密协议</td><td>{{item.secrecyAgreement ==0 ? '否': '是'}}</td><td class="bg-gray">是否仍处于竞业限制期内</td><td>{{item.restrictTime ==0 ? '否': '是'}}</td><td class="bg-gray">有无触犯法律、法规记录</td><td>{{item.illegalRecord ==0 ? '否': '是'}}</td><td class="bg-gray" colspan="2">有无受过原单位重大处分或惩罚</td><td>{{item.majorPenalize ==0 ? '否': '是'}}</td>
        </tr>
        <tr>
          <td class="tb-title acceptance" rowspan="8">
            本人承诺
          </td>
          <td class="tb-title" colspan="9">
              <p style="height:6px;">本人现谨承诺：</p>
              <p style="height:22px;">1、 我保证在此表上所填写的每一项内容都属实，如填写或提供虚假信息、资料，属于严重违纪，我无条件地同意公司解除劳动合同的决定，且不索要任何经济补偿或赔偿；</p>
              <p style="height:6px;">2、 我同意公司对我提供的信息，如：品德、工作经验、教育背景等进行背景调查；</p>
              <p style="height:22px;">3、 我保证已与原工作单位解除工作关系，且不处于与原单位约定的竞业限制期内。如与原单位有任何劳动纠纷或商业秘密纠纷等，我愿意由本人承担由此产生的一切责任；</p>
              <p>4、 公司有关书面文件、通知等无法直接送达员工时，员工确认本表中所填写的住址为邮寄送达地址。如变更住址，本人将在变动后的三个工作日内及时书面通知公司。</p>
              <p style="text-align: right;"><span style="margin-right:128px">员工签名：</span><span style="margin-right:60px">日期：</span><span style="margin-right:30px">        年     </span><span style="margin-right:30px">月    </span>日</p>
          </td>
        </tr>
      </table>
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
        printable: 'printJS-table',
        type: 'html',
        // header: '个人简历',
        // headerStyle: 'text-align:center;color:#f00;width:100%;border:1px #000 solid;',
        // targetStyles: ['border', 'padding: 15px'],
        scanStyles: false,
        style: '.tb{border-collapse: collapse;margin-bottom: 20px;} .tb,.tb tr,.tb td{border: 1px solid #eaeef5;} .tb td{padding:5px;min-width:95px;max-width:130px;} .tb .tb-title{font-weight: 600;} .avatar{right:20px;width: 120px;height: 137px;} .bg-gray{background-color:#fafafa;-webkit-print-color-adjust: exact; } .acceptance{width:80px;text-align: center;}' // 表格样式
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


.table-title{
   border-left:1px solid #eaeef5;border-right:1px solid #eaeef5; padding: 12px 10px;font-weight: 600;color: #303133;
}
.table-margin{
  margin-top:-2px;
}

.resume-print .el-table th{
  background-color: #fafafa !important;
}

.tb{
  border-collapse: collapse;
  margin-bottom: 20px;
}
.tb,.tb tr,.tb td{
  border: 1px solid #eaeef5;
}
.tb td{
  padding:5px;
  min-width:95px;
  max-width:130px;
}
.tb .tb-title{
  font-weight: 600;
}
.avatar{
  // position: absolute;
  right:20px;
  width: 120px;
  height: 137px;
  // margin-top: -22px;
}
.bg-gray{
  background-color:#fafafa;
}
.acceptance{
  width: 80px;
  text-align: center;

}
</style>
