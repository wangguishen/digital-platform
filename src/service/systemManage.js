import axios from '@/utils/request.js'
import { formUtil } from '@/utils/publicUtil'

function splitUrl (url) {
  const fullUrl = `${process.env.VUE_APP_JURISDICTION_API}${url}`;
  return fullUrl
}
// 资源管理
// 查询列表
export const resourceList = params => axios.post(splitUrl('/system/resource/list'), params)

// 创建资源
export const resourceSave = params => axios.post(splitUrl('/system/resource/save'), formUtil(params))

// 删除资源
export const resourceDelete = params => axios.post(splitUrl('/system/resource/delete'), formUtil(params))

// 用户管理

export const getMemberList = params => axios.post(splitUrl('/system/member/list'), formUtil(params));// find

export const getMemberRoles = params => axios.post(splitUrl('/system/member/roles'), formUtil(params));// find

export const updateMember = params => axios.post(splitUrl('/system/member/save'), params);// update

// 角色管理

export const getRoleList = params => axios.post(splitUrl('/system/role/list'), formUtil(params));

export const getResourceTree = params => axios.post(splitUrl('/system/role/resource/tree'), formUtil(params));

export const roleAdd = params => axios.post(splitUrl('/system/role/save'), formUtil(params));

export const roleUpdate = params => axios.post(splitUrl('/system/role/update'), formUtil(params));

export const roleDel = params => axios.post(splitUrl('/system/role/delete'), formUtil(params));

export const roleResourceSave = params => axios.post(splitUrl('/system/role/resource/save'), params);// 分配权限

// 权限管理
// 查询列表
export const memberList = params => axios.post(splitUrl('/system/member/list'), formUtil(params))

// 修改权限
export const urightSave = params => axios.post(splitUrl('/system/uright/save'), params)
