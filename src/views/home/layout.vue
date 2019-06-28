<template>
  <div class="layout">
    <div class="layout_sidebar" :class="{hide_sidebar:isHideSidebar}">
      <div class="project_name">
        <img src="static/logo.png" alt="">
        <span>{{ collapsed ? '' : projectName }}</span>
      </div>
      <div :style="{height: (slidebarHeight) + 'px'}">
        <el-scrollbar class="scrollbar-page" wrap-class="scrollbar-wrapper">
          <my-menu :menus="menus" :collapse="collapsed" />
        </el-scrollbar>
      </div>
    </div>
    <div class="layout_main" :class="{hide_sidebar_active:isHideSidebar}">
      <div class="layout_main_header cf">
        <div class="layout_main_header_left fl">
          <div class="layout_main_header_left_collapsed" @click.prevent="collapse">
            <i :class="[!collapsed ? 'el-icon-s-fold' : 'el-icon-s-unfold']" />
          </div>
        </div>
        <div class="fr">
          <el-dropdown trigger="click">
            <div class="layout_main_header_icon" />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>我的消息</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="layout_main_header_right fr">
          <div class="layout_main_header_avatar_wrap">
            <span>{{ userInfo.name }}</span>
            <span>{{ userInfo.business }}</span>
            <img class="layout_main_header_avatar" :src="userInfo.img">
          </div>
        </div>
      </div>
      <section class="layout_main_content">
        <div class="grid-content bg-purple-light">
          <div class="breadcrumb-container">
            <tags-views />
          </div>
          <el-row class="layout_main_content_real">
            <el-col v-show="cachedViews.length > 0" :span="24" class="content-wrapper" :class="[ hasPadding ? 'content-wrapper-padding' : '']">
              <transition name="fade" mode="out-in">
                <keep-alive :include="cachedViews">
                  <router-view :key="key" />
                </keep-alive>
              </transition>
            </el-col>
          </el-row>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import myMenu from "@/components/common/menu"
import tagsViews from "@/components/TagsView/index"
import { resourceList } from '@/service/systemManage'
import { treeData, recursionDelete } from '@/utils/publicUtil'
import { list_mixins } from '@/mixins'

export default {
  name: 'home',

  components: { myMenu, tagsViews },

  mixins: [list_mixins],

  data () {
    return {
      isHideSidebar: false,
      projectName: '数字化运营平台',
      collapsed: false,
      userInfo: {
        sysName: "数字化运营平台",
        name: "中投用户",
        business: "广州中山六路证券营业部",
        img: "static/man1.png"
      },
      menus: [],
      hasPadding: true
    };
  },

  computed: {
    cachedViews () {
      return this.$store.state.tagsView.cachedViews
    },
    key () {
      return this.$route.path
    },
    isChange () {
      return this.$store.state.slidebar.isChange
    }
  },

  watch: {
    isChange: {
      handler: function () {
        this.resourceList()
      },
      deep: true
    },
    $route () {
      this.hasPadding = this.urlHasIframe()
    }
  },

  created () {
    this.resourceList()
  },

  methods: {
    async resourceList () {
      const self = this
      const resData = await resourceList({})
      this.menus = []
      const rows = resData.data.rows
      rows.forEach((item, index) => {
        if (item.serviceType === 'MENU') {
          item.id = item.id.toString()
          item.name = item.text
          item.url = item.menuUrl || ''
          item.icon = item.icon || 'el-icon-menu'
          item.routerUrl = self.urlIsHttp(item.menuUrl)
          self.menus.push(item)
        }
      })
      this.menus = JSON.parse(treeData(this.menus))
      this.menus = recursionDelete(this.menus)
    },
    collapse () {
      if (this.collapsed) {
        this.isHideSidebar = !this.isHideSidebar;
        setTimeout(() => {
          this.collapsed = !this.collapsed;
        }, 100)
      } else {
        this.collapsed = !this.collapsed;
        this.isHideSidebar = !this.isHideSidebar;
      }
    },
    urlIsHttp (str) {
      if (!str) { return '' }
      str = str.startsWith("http") ? '/iframe/' + encodeURIComponent(str) : str
      return str
    },
    urlHasIframe () {
      return !this.$route.fullPath.includes("iframe")
    }
  }
};
</script>

<style lang="scss">
.layout {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  .el-menu{
    border-right: none;
  }
	&_sidebar {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		width: 210px;
    box-sizing: border-box;
    transition: width .28s;
    background: #fff;
	}
	&_main {
		position: relative;
		margin-left: 210px;
    transition: margin .28s;
		&_header {
			padding-right: 35px;
			background-color: $blue;
			height: 60px;
			&_left_collapsed {
				width: 60px;
        height: 60px;
				padding: 0 23px;
        box-sizing: border-box;
        cursor: pointer;
        color: #fff;
        line-height: 60px;
        font-size: 18px;
			}
      .el-dropdown{
        height: 60px;
        cursor: pointer;
      }
      &_avatar_wrap{
        color: #fff;
        width: 500px;
        font: 14px;
        height: 60px;
        position: relative;
        text-align: right;
        span {
          position: absolute;
          font-family: MicrosoftYaHei;
          font-size: 14px;
          right: 58px;
        }
        span:nth-child(1) {
          top: 10px;
        }
        span:nth-child(2) {
          top: 30px;
        }
      }
			&_avatar {
        display: inline-block;
				width: 40px;
				height: 40px;
        border-radius: 20px;
        margin:10px;
      }
      &_icon {
        margin-top: 27px;
        width: 0;
        height: 0;
        border-width: 6px;
        border-style: solid;
        border-color: #fff transparent transparent transparent;
      }
		}
		&_content {
      height: calc(100vh - 60px);
      background-color: #F0F4FB;
      &_real {
        padding: 0 0px 0px 20px;
      }
    }
  }
  .content-wrapper {
    background: #fff;
  }
  .content-wrapper-padding {
    padding: 0px 0px 0px 20px;
  }
  .breadcrumb-container{
    margin-bottom: 15px;
  }
  .el-scrollbar__view{
    // background-color: red;
    // position: relative;
    // margin-top:-7px;
    // top: -7px;
  }
}

.project_name {
	height: 60px;
	background-color: $blue;
	padding: 0 20px;
	font-size: 18px;
	line-height: 60px;
	text-align: center;
	color: #fff;
  border-right:1px solid rgba(238, 241, 146, 0.3);;
  >img {
    vertical-align: middle;
    height: 18px;
  }
  span {
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
  }
}
.hide_sidebar{
  width:66px;
}
.hide_sidebar_active{
  margin-left: 66px;
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
</style>
