<template>
  <div class="ceshi">
    <el-color-picker
      v-model="color"
      :inline="true"
      show-alpha
      :predefine="predefineColors"
      popper-class="poper"
      refs="elColorPicker"
      @change="changeddd"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      color: '',
      predefineColors: [
        'rgba(0, 0, 0, 0)',
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)'
      ]
    }
  },
  mounted () {
    this.elColorPicker()
  },
  methods: {
    elColorPicker () {
      console.log(this.$refs['elColorPicker'])
    },
    changeddd () {
      console.log(8888)
    }
  }
}
</script>
<style lang="scss">
  .poper{
    display: block !important;
    width: 310px;
  }
  .ceshi .el-color-picker .el-color-picker__trigger{
    display: none;
  }
  .poper .el-color-predefine__color-selector{
    width: 34px;
    height: 34px;
  }
  .poper .el-color-predefine{
    width: 326px;
  }
  .poper .el-color-predefine__color-selector:nth-child(10n+1){
    margin-left: 8px;
  }
  .poper .el-color-hue-slider.is-vertical{
    width: 18px;
  }
</style>
