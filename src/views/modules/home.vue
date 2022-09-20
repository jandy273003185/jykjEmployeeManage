<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-home">
      <!-- <h3>项目介绍</h3>
      <ul>
        <li>renren-ui基于vue、element-ui构建开发，实现<a href="https://gitee.com/renrenio/renren-ui" target="_blank">renren-security</a>后台管理前端功能，提供一套更优的前端解决方案</li>
        <li>前后端分离，通过token进行数据交互，可独立部署</li>
        <li>动态菜单，通过菜单管理统一管理访问路由</li>
        <li>演示地址：<a href="http://demo.open.renren.io/renren-security" target="_blank">http://demo.open.renren.io/renren-security</a> (账号密码：admin/admin)</li>
      </ul>
      <h3>获取帮助</h3>
      <ul>
        <li>官方社区：<a href="https://www.renren.io/community" target="_blank">https://www.renren.io/community</a></li>
        <li>前端Git地址：<a href="https://gitee.com/renrenio/renren-ui" target="_blank">https://gitee.com/renrenio/renren-ui</a></li>
        <li>后台Git地址：<a href="https://gitee.com/renrenio/renren-security" target="_blank">https://gitee.com/renrenio/renren-security</a></li>
        <li>如需关注项目最新动态，请Watch、Star项目，同时也是对项目最好的支持</li>
      </ul>-->
      <div style="display:flex">
        <div>
          <h3>职员二维码</h3> 
          <!-- <ul> -->
            <!-- <li>扫码下面的二维码，关注【记忆开源】公众号，回复【加群】，即可根据提示加入微信群！</li> -->
            <!-- <li><img src="https://cdn.renren.io/f5cef202207132229319338.jpg" alt="微信群" /></li> -->
          <img :src="baseUrl+dataList" alt="" />
          <!-- </ul> -->
        </div>
        <div style="margin-left:100px">
          <h3>职工二维码</h3> 
          <img :src="baseUrl+dataList2" alt="" />
        </div>
      </div>
    </div>
  </el-card>
</template>
<script>
import mixinViewModule from '@/mixins/view-module'
export default {
  mixins: [mixinViewModule],
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/sys/user/QRCode/1',
      },
      baseUrl:''
    }
  },
  mounted(){
    this.mixinViewModuleOptions.getDataListURL = '/sys/user/QRCode/2'
    this.query2();
    this.baseUrl = window.SITE_CONFIG['apiURL']
  }
}
</script>

<style>
.mod-home {
  line-height: 1.5;
}
</style>
