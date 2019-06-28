<template>
  <el-menu
    class="menu"
    :default-active="$route.fullPath"
    router
    :collapse="collapse"
    :collapse-transition="false"
    :default-openeds="defaultOpeneds"
  >
    <submenu v-for="menu in menus" :key="menu.id" :menu="menu" />
  </el-menu>
</template>

<script>
import submenu from "./submenu";
export default {
  components: {
    submenu
  },
  props: ["menus", "collapse"],

  data () {
    return {
      defaultOpeneds: ["/system"]
    };
  }
};
</script>
