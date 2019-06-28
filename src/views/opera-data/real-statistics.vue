<template>
  <div class="real-statistics">
    <el-form :inline="true" :model="formData" class="toolbar">
      <el-form-item label="开始日期">
        <el-date-picker
          v-model="formData.startDate"
          type="date"
          placeholder="开始日期"
          :size="TABLE_SIZE"
        />
      </el-form-item>
      <el-form-item label="结束日期">
        <el-date-picker
          v-model="formData.endDate"
          type="date"
          placeholder="结束日期"
          :size="TABLE_SIZE"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="search">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-refresh-right" size="mini">导出</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      stripe
      :height="tableHeightPage"
      style="width: 100%;"
      :size="TABLE_SIZE"
    >
      <el-table-column type="index" label="序号" width="250" />
      <el-table-column prop="date" label="日期" width="250" />
      <el-table-column prop="name" label="姓名" width="250" />
      <el-table-column prop="address" label="地址" />
    </el-table>
    <my-pagination
      :all-total="total"
      :current-page="page"
      :page-size="rows"
      :page-sizes="[30,60,90,120]"
      @pageChange="pageChange"
      @currentChange="currentChange"
    />
  </div>

</template>

<script>
import { getAllRateListTotal } from '@/service/api'
import myPagination from "@/components/pagination/my-pagination";
import { list_mixins } from '@/mixins'
export default {
  components: { myPagination },
  mixins: [list_mixins],
  data () {
    return {
      formData: {
        startDate: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      page: 1,
      rows: 30,
      total: 0
    }
  },

  computed: {
    columnWidth () {
      return this.$store.state.tableColumnWidth.sysParamsConfigColumnWidth;
    }
  },

  created () {
    const arr = {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄'
    }
    for (let i = 0; i < 30; i++) {
      this.tableData.push(arr)
    }
    // this.getAllRateListTotal()
  },

  methods: {
    search () {

    },
    async getAllRateListTotal () {
      const resData = await getAllRateListTotal()
      console.log("resData", resData)
    },
    pageChange () {

    },
    currentChange () {

    }
  }
}
</script>

<style lang="scss">
  .real-statistics {
    width: 100%;
    height: 100%;
    padding: 0 0 0 20px;
    box-sizing: border-box;
  }
</style>

