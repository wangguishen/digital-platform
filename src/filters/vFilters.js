// 全局filter  --  过滤器

import Vue from 'vue'
const vFilter = {
  /* 数字 格式化*/
  number: (number, places, symbol, thousand, decimal) => {
    number = number || 0;
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : "";
    thousand = thousand || ",";
    decimal = decimal || ".";
    var negative = number < 0 ? "-" : "";
    var i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "";
    var j = (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
  },
  /* 数字格式化,正负,百分比  */
  vNumber: (number) => {
    number = number || 0
    number = parseFloat(number).toFixed(2)
    number = number > 0 ? '+' + number + '%' : number + '%'
    return number
  },
  getDay: value => {
    return parseInt(Math.floor(value / 3600) / 24)
  },
  vCard: value => { // 银行卡显示
    return value ? '**** **** **** ' + value.substr(value.length - 4) : ''
  },
  vPhone: str => { // 手机号隐藏显示
    return str ?　str.substr(0, 3) + '****' + str.substr(7) : ''
  },
  vTelPhone: str => { // 手机号断层显示
    return str.substr(0, 3) + ' ' + str.substr(3, 4) + ' ' + str.substr(7)
  },
  vIdCard: str => { // 身份证号断层显示
    return str.substr(0, 3) + ' ' + str.substr(3, 3) + ' ' + str.substr(6, 4) + ' ' + str.substr(10, 4) + ' ' + str.substr(14)
  },
  vUserImg: value => { // 用户头像
    if (!value) { value = 'static/images/icon/user_defu.png' }
    return value
  },
  vFixedTwo: value => { // 保留两位小数
    if (!value) { value = 0 }
    return parseFloat(value).toFixed(2)
  },
  vUpperCase: value => { // 转化大写
    if (!value) { value = '暂无' }
    return value.toUpperCase()
  },
  vLowerCase: value => { // 转化小写
    if (!value) { value = '' }
    return value.toLowerCase()
  },
  vMoneyChange: value => { // 金额转化
    if (!value) { value = 0 }
    return "￥" + value
  },
  vGetDay: val => { // 毫秒转化天
    return parseInt(Math.floor(val / 3600) / 24)
  },
  vGetHour: val => { // 毫秒转化小时
    return parseInt(Math.floor(val / 3600) % 24)
  },
  vGetMin: val => { // 毫秒转化分钟
    return Math.floor(val / 60) % 60
  },
  vGetSec: val => { // 毫秒转化秒
    return val % 60
  },
  /**
   * 日期转化
   * @param {*} val 20190516 --> 2019-05-16
   */
  vDealData: function (val) {
    // 日期过滤
    let time = ''
    time = typeof (val) === 'string' ? val : val.toString()
    const y = time.substring(0, 4)
    const m = time.substring(4, 6)
    const d = time.substring(6, 8)
    return m + '-' + d
  },
  /**
   * 性别转化
   * @param {*} val  0 --> 男  1 --> 女
   */
  vGetSex: function (val) {
    let sex = ''
    if (val == 0) { // 男
      sex = 'static/images/icon/sex_nan.png'
    } else if (val == 1) { // 女
      sex = 'static/images/icon/sex_nv.png'
    }
    return sex
  }
}

export default vFilter
