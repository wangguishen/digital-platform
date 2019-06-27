import {
  Layout,
  Header,
  Content,
  Footer,
  Sider,
  MenuGroup, Menu, MenuItem,
  Icon,
  Breadcrumb, BreadcrumbItem,
  Card,
  Submenu
} from 'iview'

const components = [
  Layout,
  Header,
  Content,
  Footer,
  Sider,
  MenuGroup, Menu, MenuItem,
  Icon,
  Breadcrumb, BreadcrumbItem,
  Card,
  Submenu
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
