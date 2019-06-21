import axios from '@/utils/request.js'
import { formUtil } from '@/utils/publicUtil'

// 登录
export const login = params => axios.post('/login', formUtil(params));
