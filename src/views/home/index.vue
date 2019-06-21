<template>
  <transition name="fade" mode="out-in">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </transition>
</template>

<script>
export default {
  components: {  },

  data () {
    return {
      
    };
  },

  computed: {
    
  },

  methods: {
    
  }
};
</script>y

<style lang="scss">
$color-primary: #20a0ff;

.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;

  .header {
    height: 60px;
    line-height: 60px;
    background: $color-primary;
    color: #fff;
    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
    }
    .logo {
      //width:230px;
      height: 60px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;
      transition: 0.5s all;
      img {
        width: 40px;
        float: left;
        margin: 10px 10px 10px 18px;
      }
      .txt {
        color: #fff;
      }
      &.logo-width {
        width: 230px;
      }
      &.logo-collapse-width {
        width: 60px;
      }
    }
    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
      i {
        font-size: 18px;
      }
    }
  }
  .main {
    display: flex; // background: #324057;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    .menu {
      flex: 0 0 60px;
      width: 60px;
      &:not(.el-menu--collapse) {
        flex: 0 0 230px;
        width: 230px;
      }
    }
    .content-container {
      flex: 1;
      // overflow-y: scroll;
      // padding: 20px;
      padding: 12px;
      .breadcrumb-container {
        //margin-bottom: 15px;
        height: 32px;
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
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
