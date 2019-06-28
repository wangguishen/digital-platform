import { mapMutations } from 'vuex'
import store from '@/store/index.js'

window.addEventListener('resize', function () {
  const clientHeight = document.documentElement.clientHeight
  const tableHeightPage = clientHeight - 102 - 50 - 70
  const tableHeight = clientHeight - 102 - 50
  const slidebarHeight = clientHeight - 60
  const iframeHeight = clientHeight - 102
  store.dispatch('setTableHeight', tableHeight)
  store.dispatch('setTableHeightPage', tableHeightPage)
  store.dispatch('setSlidebarHeight', slidebarHeight)
  store.dispatch('setIframeHeight', iframeHeight)
});
export const list_mixins = {
  data () {
    return {

    }
  },

  computed: {
    tableHeight () {
      return this.$store.getters.getTableHeight
    },
    tableHeightPage () {
      return this.$store.getters.getTableHeightPage
    },
    slidebarHeight () {
      return this.$store.getters.getSlidebarHeight
    },
    iframeHeight () {
      return this.$store.getters.getIframeHeight
    }
  },

  methods: {
    ...mapMutations(['SET_TABLE_HEIGHT', 'GET_TABLE_HEIGHT'])
  }
}
