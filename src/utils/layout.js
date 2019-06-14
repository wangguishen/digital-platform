import Vue from 'vue'

const clientHeight = document.documentElement.clientHeight
const tableHeightPage = clientHeight - 290
const tableHeight = clientHeight - 202
// 无分页
Vue.prototype.TABLE_HEIGHT = tableHeight
// 有分页
Vue.prototype.TABLE_HEIGHT_PAGE = tableHeightPage

window.addEventListener('resize', function () {
  const clientHeight = document.documentElement.clientHeight
  const tableHeightPage = clientHeight - 290
  const tableHeight = clientHeight - 202
  this.TABLE_HEIGHT = tableHeight
  this.TABLE_HEIGHT_PAGE = tableHeightPage
});
