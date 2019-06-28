<template>
  <div class="ygt" ref="ygt">
    <!-- <div v-for="(item, index) in nums" :key="index">
      <div>{{ item.STYPE }}</div>
      <div>{{ item.CNT }}</div>
    </div> -->
    <div class="chart-box">
      <div id="chart1" :style="{width: (pmW * 3 / 4) - 20 + 'px'}"></div>
      <div id="chart2" :style="{width: pmW * 1 / 4 + 'px'}"></div>
    </div>
  </div>
</template>

<script>
import { getAllRateListTotal, getBusiView, getStatisView } from '@/service/jzyy'
import { drawLine, openNum } from '@/utils/myCharts'
export default {
  data () {
    return {
      nums: [],
      rates: '0.00',
      times: [],
      yesterday: [],
      nowday: [],
      pmW: 0,
      pmH: 0,
    }
  },

  created () {

    this.getAllRateListTotal()
  },

  mounted () {
    this.pmW = this.$refs.ygt.clientWidth
    this.pmH = this.$refs.ygt.clientHeight
    this.getBusiView()
    this.getStatisView()
  },

  methods: {
    async getAllRateListTotal () {
      const resData = await getAllRateListTotal()
      this.nums = resData.data.data.nums
      this.rates = resData.data.data.rate
    },
    async getBusiView () {
      let self = this;
      const resData = await getBusiView()
      let res = resData.data.data
      let lineNow = [],
          lineHis = [],
          timeNow = [],
          timeHis = [];
      if (res.now.length > res.his.length || res.now.length == res.his.length) {
        for (let i = 0; i < res.now.length; i++) {
          let text1 = "-";
          for (let k = 0; k < res.his.length; k++) {
            if (this.subFun(res.his[k].writetime) == this.subFun(res.now[i].writetime)) {
              text1 = res.his[k].val;
            }
          }
          timeNow.push(res.now[i].writetime);
          lineHis.push(text1);
          lineNow.push(res.now[i].val);
          timeHis.push(res.now[i].writetime);
        }
      }

      if (res.his.length > res.now.length) {
        for (let i = 0; i < res.his.length; i++) {
          let text1 = "-", time = "-";
          for (let k = 0; k < res.now.length; k++) {
            if (this.subFun(res.now[k].writetime) == this.subFun(res.his[i].writetime)) {
              text1 = res.now[k].val;
              time = res.now[k].writetime;
            }
          }
          timeNow.push(time);
          lineNow.push(text1);
          lineHis.push(res.his[i].val);
          timeHis.push(res.his[i].writetime);
        }
      }
      this.$nextTick(() => {
        drawLine('chart1', lineNow, lineHis, timeNow, timeHis)
      })
    },
    async getStatisView () {
      let self = this;
      const resData = await getStatisView()
      let obj = resData.data.data
      console.log('------',resData)
      let lineNow = [],
          lineHis = [],
          timeNow = [],
          timeHis = [];
      for (let i = 0; i < obj.seatList.length; i++) {
        timeNow.push(obj.seatList[i].timetmp);
        lineNow.push(obj.seatList[i].num);
      }

      for (let i = 0; i < obj.accountList.length; i++) {
        timeHis.push(obj.accountList[i].timetmp);
        lineHis.push(obj.accountList[i].num);
      }
      this.$nextTick(() => {
        openNum('chart2', lineNow, lineHis, timeNow, timeHis)
      })
      
    },
    subFun (txt) {
      return txt.substring(11, 16);
    }
  }
}
</script>
<style lang="scss">
  .ygt{
    background: url("../../assets/bg1920.png") no-repeat;
    width: 100%;
    height: 100%;
    padding-top: 20%;
    box-sizing: border-box;
  }
  .chart-box{
    width: 100%;
    display: flex;

  }
  #chart1 {
    width: 1200px;
    height: 300px;
  }
</style>
