// 表格列表宽度配置
import * as types from '../types.js'
import { setLocalStorage, getLocalStorage } from '@/utils/storageUtil.js'
const clientHeight = document.documentElement.clientHeight
// const tableHeightPage = clientHeight - 290 + 30
const tableHeight = clientHeight - 202 + 30
const state = {
  tableHeight: tableHeight
}

const mutations = {
  [types.SET_TABLE_HEIGHT] (state, data) {
    setLocalStorage('tableHeight', data);
  },
  [types.GET_TABLE_HEIGHT] (state, data) {
    const currentObj = getLocalStorage(data.key, 'json');
    if (currentObj) {
      state[data.key] = currentObj;
    }
  }
}
const actions = {
  setTableHeight ({ commit }, state) {
    commit('SET_TABLE_HEIGHT', state)
  },
  setTableHeight1 ({ commit, state }) {
    return new Promise(resolve => {
      commit('SET_TABLE_HEIGHT')
      resolve([...state.tableHeight])
    })
  }
}
export default {
  state,
  mutations,
  actions
}
