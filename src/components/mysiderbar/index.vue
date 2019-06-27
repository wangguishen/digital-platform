<template>
  <Menu active-name="1-2" accordion theme="dark" width="auto" :class="[isSiderBar ? 'menu-item, collapsed-menu' : '']">
    <div v-for="(item, index) in sideBarList" :key="index">
      <template v-if="item.children">
        <Submenu :name="item.id">
          <template slot="title">
            <Icon v-if="item.icon" :type="item.icon"/>
            {{ item.text }}
          </template>
          <template v-if="item.children">
            <MenuItem v-for="(val, key) in item.children" :key="key" :name="val.id">
              <Icon v-if="val.icon" :type="val.icon"></Icon>
              {{ val.text }}
            </MenuItem>
          </template>
        </Submenu>
      </template>
      <template v-else>
        <MenuItem :name="item.id">
          <Icon v-if="item.icon" :type="item.icon"></Icon>
          {{ item.text }}
        </MenuItem>
      </template>
    </div>
  </Menu>
</template>

<script>
import { list_mixins } from '@/mixins'
export default {
  mixins:[ list_mixins ],
  data () {
    return {
      isCollapsed: true
    }
  },
  created () {
    
  },
  mounted () {
    console.log(this.sideBarList)
  },
  methods: {

  }
}
</script>
<style lang="scss">
  .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
</style>