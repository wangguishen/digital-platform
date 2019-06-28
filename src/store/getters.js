import { getSesStorage } from '@/utils/storageUtil.js'

const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  getTableHeight: state => {
    return state.tableHeight.tableHeight
  },
  getTableHeightPage: state => {
    return state.tableHeight.tableHeightPage
  },
  getSlidebarHeight: state => {
    return state.tableHeight.slidebarHeight
  },
  getIframeHeight: state => {
    return state.tableHeight.iframeHeight
  },
  getCurrentTitle: state => {
    const status = getSesStorage("CURRENT_TITLE")
    if (status) {
      state.tagsView.currentTitle = status
    }
    return state.tagsView.currentTitle
  }
}
export default getters
