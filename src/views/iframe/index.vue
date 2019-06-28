<template>
  <div>
    <iframe :src="url" frameborder="0" width="100%" :style="{ minHeight: iframeHeight + 'px' }" />
  </div>
</template>

<script>
import { list_mixins } from '@/mixins'
export default {

  mixins: [list_mixins],

  data () {
    return {
      url: ''
    }
  },

  created () {
    this.url = decodeURIComponent(this.$route.fullPath.split("/")[2])
    console.log("url==", this.url)
  }
}
</script>

