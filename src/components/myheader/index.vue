<template>
  <Header class="my-header">
    <Icon type="ios-options" class="my-header_icon" @click="changeSideBar"/>
  </Header>
</template>

<script>
import { list_mixins } from '@/mixins'
export default {
  mixins:[ list_mixins ],
  data () {
    return {

    }
  },
  created () {

  },
  methods: {
    changeSideBar () { // 切换sideBar的显示隐藏
      this.$emit('changeSide')
      // let isSiderBar = this.$store.getters.sidebar
      this.$store.dispatch('setSiderBar', !this.isSiderBar)
    },
  }
}
</script>
<style lang="scss">
  .my-header{
    background: $def;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    &_icon{
      font-size: 20px;
    }
  }
</style>