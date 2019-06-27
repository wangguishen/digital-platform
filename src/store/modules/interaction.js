// 表格列表宽度配置
import * as types from '../types.js'

const state = {
  siderBar: false, //控制导航显示隐藏
}

const mutations = {
  [types.SET_SIDER_BAR] (state, data) {
    state.siderBar = data
  },
}
const actions = {
  setSiderBar ({ commit }, state) {
    commit('SET_SIDER_BAR', state)
  }
}
export default {
  state,
  mutations,
  actions
}
