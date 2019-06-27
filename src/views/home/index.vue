<template>
  <div class="layout">
    <Layout :style="{minHeight: '100vh'}">
      <Sider ref="sidebar" hide-trigger collapsible :collapsed-width="78" v-model="isSiderBar">
        <my-sider-bar></my-sider-bar>
      </Sider>
      <Layout>
        <my-header v-on:changeSide="changeSideBar"></my-header>
        <Content :style="{padding: '0 16px 16px'}">
          <Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb>
          <Card>
            <div style="height: 600px">
              <transition name="fade" mode="out-in">
                <keep-alive>
                  <router-view/>
                </keep-alive>
              </transition>
            </div>
          </Card>
        </Content>
      </Layout>
    </Layout>
    <!-- <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition> -->
  </div>
</template>

<script>
import { list_mixins } from '@/mixins'
import mySiderBar from '@/components/mysiderbar'
import myHeader from '@/components/myheader'
export default {
  name: 'home',
  components: {
    mySiderBar, myHeader
  },

  mixins:[ list_mixins ],
  data () {
    return {
      isCollapsed: false
    };
  },

  computed: {
    menuitemClasses: function () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    },
  },

  watch: {
    
  },

  methods: {
    changeSideBar () { //点击显示隐藏左侧栏回调事件
      this.$refs.sidebar.toggleCollapse();
      // this.$store.dispatch('setSiderBar', !this.isSiderBar)
    }
  }
};
</script>

<style lang="scss">

  .layout-con{
    height: 100%;
    width: 100%;
  }
  .collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
</style>
