import axios from 'axios';
import { loginreq, req,exportExcelInterface } from './axiosFun';

// 登录接口 
export const login = (params) => { return loginreq("post", "/api/user/login", params) };
// 获取用户菜单
export const menu = (params) => { return axios.get("/api/menu?&token=" + localStorage.getItem('logintoken')).then(res => res.data) };
// 退出接口
// export const loginout = () => { return axios.delete("/api/login?&token=" + localStorage.getItem('logintoken')).then(res => res.data) };
export const loginout = () => { return req("post", "/api/user/loginOut") };

export const ftpUpload = (params) => { return req("post", "/api/ftp/upload", params) };
/**
 * 权限管理 
 **/
// 权限管理-获取用户管理
export const userList = (params) => { return req("post", "/api/user/list", params) };
// 权限管理-保存（添加编辑）
export const userSave = (params) => { return req("post", "/api/user/saveOrUpdate", params) };
// export const userDelete = (params) => { return req("post", "/api/user/delete", params) };
// 权限管理-删除用户
export const userDelete = (params) => { return axios.delete("/api/user/delete?id=" + params ).then(res => res.data) };
/**
 * 分发方与接收方管理 
 **/
export const distributorList = (params) => { return req("post", "/api/distributor/list", params) };
export const distributorSave = (params) => { return req("post", "/api/distributor/saveOrUpdate", params) };
export const distributorDelete = (params) => { return axios.delete("/api/distributor/delete?id=" + params ).then(res => res.data) };
export const distributorTestConnect = (params) => { return req("get", "/api/distributor/testConnect/" + params, {}) };
/**
 * 分发文件路径
 **/
export const distributorItemList = (params) => { return req("post", "/api/distributorItem/list", params) };
export const distributorItemSave = (params) => { return req("post", "/api/distributorItem/saveOrUpdate", params) };
export const distributorItemDelete = (params) => { return axios.delete("/api/distributorItem/delete?id=" + params ).then(res => res.data) };
export const distributorItemUpload = (params) => { return req("post", "/api/distributorItem/uploadItems", params) };
/**
 * 邮件管理 
 **/
// 邮件管理-获取邮件列表
export const mailList = (params) => { return req("post", "/api/mail/list", params) };
// 邮件管理-保存（添加编辑）
export const mailSave = (params) => { return req("post", "/api/mail/saveOrUpdate", params) };
// 邮件管理-删除邮件
export const mailDelete = (params) => { return axios.delete("/api/mail/delete?id=" + params ).then(res => res.data) };
/**
 * 任务管理 
 **/
// 任务管理-获取任务列表
export const taskList = (params) => { return req("post", "/api/task/list", params) };
// 任务管理-保存（添加）
export const taskAdd = (params) => { return req("post", "/api/task/add", params) };
// 任务管理-保存（编辑）
export const taskUpdate = (params) => { return req("post", "/api/task/update", params) };
// 任务管理-启用与暂停
export const taskPauseOrResumeJob = (params) => { return req("post", "/api/task/pauseOrResumeJob", params) };
// 任务管理-删除任务
export const taskDelete = (params) => { return axios.delete("/api/task/delete?ids=" + params ).then(res => res.data) };
export const querySend = (params) => { return req("post", "/api/distributor/queryList", params) };
export const queryEmail = (params) => { return req("post", "/api/mail/queryList", params) };
export const taskHZ = (params) => { return req("post", "/api/task/frequency", params) };
export const queryFrequency = (params) => { return req("get", "/api/task/queryFrequency/" + params, {}) };
/**
 * 监控
 **/
export const monitorDirList = (params) => { return req("post", "/api/monitorDir/list", params) };
// 保存（添加编辑）
export const monitorDirSave = (params) => { return req("post", "/api/monitorDir/saveOrUpdate", params) };
// 删除
export const monitorDirDelete = (params) => { return axios.delete("/api/monitorDir/delete/" + params ).then(res => res.data) };
export const monitorDirRestart = (params) => { return req("post", "/api/monitorDir/restart", params) };
/**
 * 系统配置 
 **/
// 获取系统配置列表
export const sysConfigList = (params) => { return req("post", "/api/sysConfig/list", params) };
// 保存（添加编辑）
export const sysConfigSave = (params) => { return req("post", "/api/sysConfig/editVal", params) };
export const sysConfigFlush = (params) => { return req("post", "/api/sysConfig/flush", params) };
// 删除
export const sysConfigDelete = (params) => { return axios.delete("/api/sysConfig/delete?id=" + params ).then(res => res.data) };




/**
 * 日志管理 
 **/
// 日志管理-获取日志列表
export const logList = (params) => { return req("post", "/api/log/list", params) };
// 日志管理-保存（添加编辑）
export const logSave = (params) => { return req("post", "/api/log/saveOrUpdate", params) };
// 日志管理-删除日志
export const logDelete = (params) => { return axios.delete("/api/log/delete?id=" + params ).then(res => res.data) };
export const logExport = (params,fileName) => { return exportExcelInterface(params,fileName, "/api/log/export", ) };
export const sendLogList = (params) => { return req("post", "/api/sendLog/list", params) }; // 传输日志
export const backupClearLogList = (params) => { return req("post", "/api/backupClearLog/list", params) }; // 备份清理日志
export const monitorLogList = (params) => { return req("post", "/api/monitorLog/list", params) }; // 监控日志
export const sendLogExport = (params,fileName) => { return exportExcelInterface(params,fileName, "/api/sendLog/export", ) };
export const backupClearLogExport = (params,fileName) => { return exportExcelInterface(params,fileName, "/api/backupClearLog/export", ) };
export const monitorLogExport = (params,fileName) => { return exportExcelInterface(params,fileName, "/api/monitorLog/export", ) };

// 权限管理-重置密码
export const userPwd = (params) => { return req("post", "/api/User/pwd", params) };
// 权限管理-修改状态
export const userLock = (params) => { return axios.get("/api/User/lock?userId=" + params.userId + "&lock=" + params.lock + "&token=" + localStorage.getItem('logintoken')) };
// 权限管理-数据权限
export const UserDeptTree = (params) => { return axios.get("/api/UserDept/tree/" + params + "?token=" + localStorage.getItem('logintoken')) };
// 权限管理-数据权限保存
export const UserDeptSave = (params) => { return req("post", "/api/UserDept/save", params) };
// 权限管理-获取部门设置
export const UserDeptdeptTree = (params) => { return axios.get("/api/UserDept/deptTree/" + params + "?token=" + localStorage.getItem('logintoken')) };
// 权限管理-保存部门设置
export const UserChangeDept = (params) => { return req("post", "/api/User/change/dept", params) };
// 权限管理-用户下线
export const userExpireToken = (params) => { return req("get", "/api/User/expireToken/" + params, {}) };
// 权限管理-刷新缓存
export const userFlashCache = (params) => { return req("get", "/api/User/flashCache/" + params, {}) };

/**
 * 菜单管理
 **/
// 菜单管理-获取菜单Module/list
export const ModuleList = () => { return req("post", "/api/Module/list") };
// 菜单管理-根据菜单获取数据
export const ModuleGet = (params) => { return axios.get("/api/Module/get/" + params + "?token=" + localStorage.getItem('logintoken')) };
// 菜单管理-获取父级菜单Module/nodes
export const ModuleNodes = (params) => { return req("post", "/api/Module/nodes", params) };
// 菜单管理-修改菜单
export const ModuleSave = (params) => { return req("post", "/api/Module/save", params) };
// 菜单管理-删除菜单
export const ModuleDelete = (params) => { return axios.delete("/api/Module/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data) };

/**
 * 角色管理 
 **/
// 角色管理-获取角色列表
export const roleList = (params) => { return req("post", "/api/Role/list", params) };
// 角色管理-保存（添加编辑）
export const roleSave = (params) => { return req("post", "/api/Role/save", params) };
// 角色管理-删除角色
export const roleDelete = (params) => { return axios.delete("/api/Role/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data) };
// 角色管理-菜单权限（获取）
export const RoleRightTree = (params) => { return axios.get("/api/RoleRight/tree/" + params + "?token=" + localStorage.getItem('logintoken')) };
// 角色管理-菜单权限（保存）
export const RoleRightSave = (params) => { return req("post", "/api/RoleRight/save", params) };

/**
 * 公司管理 
 **/
// 公司管理-获取公司列表
export const deptList = (params) => { return req("post", "/api/Dept/list", params) };
// 公司管理-保存（添加编辑）
export const deptSave = (params) => { return req("post", "/api/Dept/save", params) };
// 公司管理-删除公司
export const deptDelete = (params) => { return axios.get("/api/Dept/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data) };

/**
 * 系统环境变量 
 **/
// 系统环境变量-获取系统环境变量列表
export const variableList = (params) => { return req("post", "/api/Variable/list", params) };
// 系统环境变量-保存（添加编辑）
export const variableSave = (params) => { return req("post", "/api/Variable/save", params) };
// 系统环境变量-删除系统环境变量
export const variableDelete = (params) => { return axios.delete("/api/Variable/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data) };

/**
 * 权限管理 
 **/
// 权限管理-获取权限列表
export const permissionList = (params) => { return req("post", "/api/Permission/list", params) };
// 权限管理-保存权限
export const ermissionSave = (params) => { return req("post", "/api/Permission/save", params) };
// 权限管理-删除权限
export const ermissionDelete = (params) => { return axios.delete("/api/Permission/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data) };
// 权限管理-获取权限
export const roleDropDown = () => { return axios.get("/api/Role/dropDown/all?&token=" + localStorage.getItem('logintoken')).then(res => res.data) };
// 权限管理-配置权限
export const RolePermission = (params) => { return req("post", "/api/RolePermission/save", params) };