<template>
  <div>
    <div>日历记事本</div>
    <full-calendar
      ref="calendar"
      lang="zh"
      :events="events"
      @changeMonth="changeMonth"
      @eventClick="eventClick"
      @dayClick="dayClick"
      @moreClick="moreClick"
    >
      <div slot="fc-header-left" class="left-box">
        <div class="left-box-title">日历</div>
        <div class="left-box-week">按周</div>
        <div class="left-box-month active">按月</div>
      </div>
      <template slot="fc-header-right">
        
      </template>
    </full-calendar>
  </div>
</template>

<script>
import { FullCalendar } from 'vue-fullcalendar'
export default {
  name: '',
  components: {
    'full-calendar': require('vue-fullcalendar')
  },
  data () {
    return {
      events: [
        {
          id: 1,
          title: '出差',
          start: '2019-06-23',
          end: '2019-06-26'
        },{
          id: 2,
          title: '回家',
          start: '2019-06-25',
          end: '2019-06-26'
        },{
          id: 2,
          title: '回家1',
          start: '2019-06-25'
        },{
          id: 2,
          title: '回家2',
          start: '2019-06-25'
        },{
          id: 2,
          title: '回家3',
          start: '2019-06-25'
        }
      ]
    }
  },
  created () {

  },
  methods: {
    // 选择月份
    changeMonth (start, end, current) {
      // console.log('changeMonth', start.format(), end.format(), current.format())
    },
    // 选择月份
    changeWeek (start, end, current) {
      // console.log('changeWeek', start.format(), end.format(), current.format())
    },
    // 点击事件
    eventClick (event, jsEvent, pos) {
      console.log('eventClick', event, jsEvent, pos)
    },
    // 点击当天
    dayClick (day, jsEvent, view) {
        console.log('dayClick', day, jsEvent)
    },
    // 查看更多
    moreClick (day, events, jsEvent) {
      console.log('moreCLick', day, events, jsEvent)
    },
  }
}
</script>
<style lang="scss">
  .full-calendar-body .dates .dates-events .events-week .events-day{
    min-height: 100px;
  }
  

  .left-box{
    display: flex;
  }
  .left-box div {
    margin: 0 5px;
    cursor: pointer;
  }
  .left-box .left-box-title {
    margin-right: 20px;
    font-weight: bold;
    cursor: default;
  }
  .left-box .active{
    color: #1e9fff;
    font-weight: bold;
  }
</style>