export const menu_list = {
  data () {
    return {
      menus: [
        {
          id: "1",
          name: "系统参数",
          icon: "menu",
          url: "/system-param",
          level: 1,
          pids: [],
          children: [
            {
              id: "1-1",
              name: "错误消息管理",
              icon: "s-comment",
              url: "/system-param/error-code",
              level: 2
            },
            {
              id: "1-2",
              name: "数据字典管理",
              icon: "date",
              url: "/system-param/data-dictionary",
              level: 2
            },
            {
              id: "1-3",
              name: "系统参数配置",
              icon: "tickets",
              url: "/system-param/system-parameter",
              level: 2
            }
            // {
            //   id: "1-4",
            //   name: "模拟页面创建",
            //   icon: "connection",
            //   url: "/system-param/simulate",
            //   level: 2
            // }
          ]
        }, {
          id: "2",
          name: "系统管理",
          icon: "s-platform",
          url: "system-manage",
          level: 2,
          pids: [],
          children: [
            {
              id: "2-1",
              name: "权限管理",
              icon: "lock",
              url: "/system-manage/jurisdiction",
              level: 2
            },
            {
              id: "2-2",
              name: "用户管理",
              icon: "user",
              url: "/system-manage/user-manage",
              level: 2
            },
            {
              id: "2-3",
              name: "角色管理",
              icon: "postcard",
              url: "/system-manage/role-manage",
              level: 2
            }, {
              id: "2-4",
              name: "资源管理",
              icon: "reading",
              url: "/system-manage/resource-manage",
              level: 2
            }
          ]
        }
      ]
    }
  }
}
