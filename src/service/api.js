import axios from '@/utils/request.js'
import { formUtil } from '@/utils/publicUtil'
function splitUrl (url) {
  const fullUrl = `${process.env.VUE_APP_BASE_API}${url}`;
  return fullUrl
}
// 登录
export const login = params => axios.post('/login', params);

// 注册
export const register = params => axios.post('/register', params);

// 错误消息列表
export const getErrorMessageList = params => axios.post(splitUrl('/getErrorMessageList'), formUtil(params));

// 新增错误消息
export const insertErrorMessage = params => axios.post(splitUrl('/insertErrorMessage'), formUtil(params));

// 修改错误消息
export const updateErrorMessage = params => axios.post(splitUrl('/updateErrorMessage'), formUtil(params));

// 删除错误消息
export const deleteErrorMessage = params => axios.post(splitUrl('/deleteErrorMessage'), formUtil(params));

// 系统参数配置
export const addSysconfig = params => axios.post(splitUrl('/addSysconfig'), formUtil(params));// add

export const deleteSysconfigByConfigNo = params => axios.post(splitUrl('/deleteSysconfigByConfigNo'), formUtil(params));// delete

export const getSysConfigList = params => axios.post(splitUrl('/getSysConfigList'), params);// find all

export const getSysconfigByConfigNo = params => axios.post(splitUrl('/getSysconfigByConfigNo'), formUtil(params));// find by config_no

export const updateSysconfigByConfigNo = params => axios.post(splitUrl('/updateSysconfigByConfigNo'), formUtil(params));// find by config_no

// 新增字典条目
export const F500101 = params => axios.post(splitUrl('/F500101'), formUtil(params));

// 字典条目修改
export const F500103 = params => axios.post(splitUrl('/F500103'), formUtil(params));

// 字典条目删除
export const F500104 = params => axios.post(splitUrl('/F500104'), formUtil(params));

// 根据条件查询字典条目
export const F500102 = params => axios.post(splitUrl('/F500102'), formUtil(params));

// 根据条件查询数据字典
export const F500106 = params => axios.post(splitUrl('/F500106'), formUtil(params));

// 数据字典添加
export const F500105 = params => axios.post(splitUrl('/F500105'), formUtil(params));

// 数据字典修改
export const F500108 = params => axios.post(splitUrl('/F500108'), formUtil(params));

// 数据字典删除
export const F500107 = params => axios.post(splitUrl('/F500107'), formUtil(params));

