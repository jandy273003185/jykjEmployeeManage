// 导入组件
import Vue from 'vue';
import Router from 'vue-router';
// 登录
import login from '@/views/login';
// 首页
import index from '@/views/index';
/**
 * 基础菜单
 */
// 登录列表
import masterData from '@/views/masterData/masterData';
import distributor from '@/views/distributor/index';
import recipient from '@/views/recipient/index';
import email from '@/views/email/index';
import userManage from '@/views/permission/userManage/index';
import department from '@/views/permission/department/index';
import role from '@/views/permission/role/index';
import loginLog from '@/views/log/loginLog/index';
import operationLog from '@/views/log/operationLog/index';
import abnormalLog from '@/views/log/abnormalLog/index';
import monitorDir from '@/views/monitorDir/index';
import sysConfig from '@/views/sysConfig/index';
// 接口列表
import Interface from '@/views/interface/Interface';
// 接口列表
import InterfaceSet from '@/views/interfaceSet/InterfaceSet';
// 机器信息管理
import Machine from '@/views/machine/Machine';
// 货道信息管理
import MachineAisle from '@/views/machine/MachineAisle';
/**
 * 订单管理
 */
// 交易订单
import Order from '@/views/pay/Order';
/**
 * 系统管理
 */
// 权限管理
import user from '@/views/system/user';
// 菜单管理
import Module from '@/views/system/Module';
// 角色管理
import Role from '@/views/system/Role';
// 公司管理
import Dept from '@/views/system/Dept';
// 系统环境变量
import Variable from '@/views/system/Variable';
// 权限管理
import Permission from '@/views/system/Permission';
/**
 * 支付管理
 */
// 支付配置信息
import MachineConfig from '@/views/machine/MachineConfig';
// 支付配置
import Config from '@/views/pay/Config';
/**
 * 数据监控
 */
// 监控查询
import druidLogin from '@/views/druid/login';

// 图表界面
import statistics from '@/views/charts/statistics';

// 启用路由
Vue.use(Router);

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
return originalPush.call(this, location).catch(err => err)
}
// 导出路由 
export default new Router({
    routes: [{
        path: '/',
        name: '',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    }, {
        path: '/login',
        name: '登录',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    }, {
        path: '/index',
        name: '首页',
        component: index,
        iconCls: 'el-icon-tickets',
        children: [ 
            {
                path: '/interface/Interface',
                name: 'FTP列表',
                component: Interface,
                meta: {
                    requireAuth: true
                },
            }, {
                path: '/distributor/index',
                name: '分发方管理',
                component: distributor,
                meta: {
                    requireAuth: true
                }
            }, {
                path: '/recipient/index',
                name: '接收方管理',
                component: recipient,
                meta: {
                    requireAuth: true
                }
            }, {
                path: '/email/index',
                name: '接收邮件管理',
                component: email,
                meta: {
                    requireAuth: true
                }
            }, {
                path: '/userManage/index',
                name: '用户管理',
                component: userManage,
                meta: {
                    requireAuth: true
                }
            }, {
                path: '/department/index',
                name: '部门管理',
                component: department,
                meta: {
                    requireAuth: true
                }
            }, {
                path: '/role/index',
                name: '角色管理',
                component: role,
                meta: {
                    requireAuth: true
                }
            },  {
                path: '/loginLog/index',
                name: '登录日志',
                component: loginLog,
                meta: {
                    requireAuth: true
                }
            },  {
                path: '/operationLog/index',
                name: '操作日志',
                component: operationLog,
                meta: {
                    requireAuth: true
                } 
            },  {
                path: '/abnormalLog/index',
                name: '异常日志',
                component: abnormalLog,
                meta: {
                    requireAuth: true
                }
            }, {
                path: '/monitorDir/index',
                name: '监控管理',
                component: monitorDir,
                meta: {
                    requireAuth: true
                }
            }, {
                path: '/sysConfig/index',
                name: '系统配置',
                component: sysConfig,
                meta: {
                    requireAuth: true
                }
            }, {
                path: '/masterData/MasterData',
                name: '系统主数据管理',
                component: masterData,
                meta: {
                    requireAuth: true
                }
            }, {
                path: '/interfaceSet/InterfaceSet',
                name: '接口调用规则设置',
                component: InterfaceSet,
                meta: {
                    requireAuth: true
                }
            }, {
                path: '/machine/Machine',
                name: '机器信息管理',
                component: Machine,
                meta: {
                    requireAuth: true
                }
            }, {
                path: '/machine/MachineAisle',
                name: '货道信息管理',
                component: MachineAisle,
                meta: {
                    requireAuth: true
                }
            }, {
                path: '/pay/Order',
                name: '交易订单',
                component: Order,
                meta: {
                    requireAuth: true
                }
            },  {
                path: '/system/Module',
                name: '菜单管理',
                component: Module,
                meta: {
                    requireAuth: true
                }
            }, {
                path: '/system/Role',
                name: '角色管理',
                component: Role,
                meta: {
                    requireAuth: true
                }
            }, {
                path: '/system/Dept',
                name: '公司管理',
                component: Dept,
                meta: {
                    requireAuth: true
                }
            }, {
                path: '/system/Variable',
                name: '系统环境变量',
                component: Variable,
                meta: {
                    requireAuth: true
                }
            }, {
                path: '/system/Permission',
                name: '权限管理',
                component: Permission,
                meta: {
                    requireAuth: true
                }
            }, {
                path: '/machine/MachineConfig',
                name: '支付配置信息',
                component: MachineConfig,
                meta: {
                    requireAuth: true
                }
            }, {
                path: '/pay/Config',
                name: '支付配置',
                component: Config,
                meta: {
                    requireAuth: true
                }
            }, {
                path: '/druid/login',
                name: '监控查询',
                component: druidLogin,
                meta: {
                    requireAuth: true
                }
            }, {
                path: '/charts/statistics',
                name: '数据可视化',
                component: statistics,
                meta: {
                    requireAuth: true
                }
        }]
    }]
})