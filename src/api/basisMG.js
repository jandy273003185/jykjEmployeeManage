import axios from 'axios';
import { req } from './axiosFun';

/**
 * 接口列表
 **/
// 接口列表-获取接口管理列表
export const InterfaceList = (params) => { return req("post", "/api/Interface/list", params) };
// 接口列表-保存接口管理
export const InterfaceSave = (params) => { return req("post", "/api/Interface/save", params) };
// 接口列表-删除接口管理
export const InterfaceDelete = (params) => { return axios.delete("/api/Interface/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data) };

/**
 * 机器信息管理 
 **/
// 机器信息管理-获取机器信息管理列表
export const MachineList = (params) => { return req("post", "/api/Machine/list", params) };
// 机器信息管理-保存机器信息管理
export const MachineSave = (params) => { return req("post", "/api/Machine/save", params) };
// 机器信息管理-删除机器信息管理
export const MachineDelete = (params) => { return axios.delete("/api/Machine/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data) };

/**
 * 货道信息管理
 **/
// 货道信息管理-获取获取货道信息管理列表
export const MachineAisleList = (params) => { return req("post", "/api/MachineAisle/list", params) };
// 货道信息管理-删除货道信息管理
export const MachineAisleDelete = (params) => { return axios.delete("/api/MachineAisle/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data) };
// 货道信息管理-保存货道信息管理
export const MachineAisleRsave = (params) => { return req("post", "/api/MachineAisle/save", params) };