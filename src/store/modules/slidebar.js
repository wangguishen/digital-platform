// 菜单栏配置
const state = {
  isChange: false // 资源是否变化
}

const actions = {
  setIsChange ({ commit }, boo) {
    commit('SET_IS_CHANGE', boo)
  }
}

const mutations = {
  'SET_IS_CHANGE' (state, boo) {
    state.isChange = boo
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
