import {
  Layout,
  Header,
  Content,
  Footer,
  Sider
} from 'iview'

const components = [
  Layout,
  Header,
  Content,
  Footer,
  Sider
];

// 导出组件
const install = function (Vue) {
  if (!Vue || install.installed) {
    return
  }

  components.forEach(component => {
    component.name && Vue.component(component.name, component)
  })
}

export default {
  install
}
