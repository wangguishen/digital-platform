import { sider_bar_list } from './sidebar.js'
export const list_mixins = {
  data () {
    return {
      sideBarList: sider_bar_list
    }
  },

  computed: {
    isSiderBar: function () {
      return this.$store.getters.sidebar
    }
  },

  methods: {
    
  }
}
