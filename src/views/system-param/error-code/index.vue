<template>
  <div>
    <div>
      <el-form :inline="true" class="toolbar">
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="addClick">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-input v-model="codingIpt" placeholder="请输入错误编码" maxlength="4" clearable size="mini" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="searchClick">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%"
      :size="TABLE_SIZE"
      :height="tableHeightPage"
      highlight-current-row
    >
      <el-table-column
        type="index"
        width="50"
        label="序号"
      />
      <el-table-column
        prop="error_no"
        label="错误编码"
        width="120"
      />
      <el-table-column
        prop="error_info"
        label="错误描述"
      />
      <el-table-column
        prop="error_reason"
        label="错误原因"
      />
      <el-table-column
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="amendClick(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="deleteClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <my-pagination
      :all-total="pageObj.allTotal"
      :current-page="pageObj.currentPage"
      :page-size="pageObj.pageSize"
      :page-sizes="pageObj.pageSizes"
      @pageChange="pageChange"
      @currentChange="currentChange"
    />
    <edit
      :title="error.title"
      :is-show="error.isError"
      :form="error.form"
      @cancelClick="cancelClick"
      @sureClick="sureClick"
    />
  </div>
</template>

<script>
import { getErrorMessageList, insertErrorMessage, updateErrorMessage, deleteErrorMessage } from '@/service/api'
import myPagination from "@/components/pagination/my-pagination";
import { list_mixins } from '@/mixins'
import edit from "./edit"
export default {
  name: 'errorCode',

  mixins: [list_mixins],

  components: {
    myPagination, edit
  },
  data () {
    return {
      codingIpt: '',
      tableData: [],
      pageObj: {
        allTotal: 0, // 总条数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页条数
        pageSizes: [10, 20, 50, 100]
      },
      isType: 0, // 0 --> 新增  1 --> 修改
      error: {
        isError: false,
        title: '新增错误',
        form: {
          error_no: '',
          error_info: '',
          error_reason: ''
        }
      }
    }
  },
  created () {
    this.getErrorMessageList()
  },
  methods: {
    async getErrorMessageList () { // 获取错误消息列表
      const self = this;
      const param = {
        error_no: self.codingIpt,
        page: self.pageObj.currentPage,
        rows: self.pageObj.pageSize
      }
      const resData = await getErrorMessageList(param)
      console.log('错误消息列表', resData)
      const list = resData.data.data.rows || [];
      self.pageObj.allTotal = resData.data.data.total
      self.tableData = list
    },
    async insertErrorMessage (param) { // 新增错误消息
      const self = this;
      const resData = await insertErrorMessage(param)
      console.log('新增错误消息', resData)
      self.$message.success('恭喜你，新增错误消息成功!');
      self.cancelClick()
      self.getErrorMessageList()
    },
    async updateErrorMessage (param) { // 修改错误消息
      const self = this;
      const resData = await updateErrorMessage(param)
      console.log('修改错误消息', resData)
      self.$message.success('恭喜你，修改错误消息成功!');
      self.cancelClick()
      self.getErrorMessageList()
    },
    async deleteErrorMessage (param) { // 删除错误消息
      const self = this;
      const resData = await deleteErrorMessage(param)
      console.log('删除错误消息', resData)
      self.$message.success('删除错误消息成功!');
      self.cancelClick()
      self.getErrorMessageList()
    },
    pageChange (data) { // 每页条数切换回调事件
      console.log(`每页 ${data} 条`);
      this.pageObj.pageSize = data;
      this.getErrorMessageList()
    },
    currentChange (data) { // 当前页切换事件
      console.log(`当前页: ${data}`);
      this.pageObj.currentPage = data;
      this.getErrorMessageList()
    },
    addClick () { // 新增操作
      const self = this;
      self.isType = 0
      self.error.isError = true;
      self.error.title = '新增错误';
    },
    amendClick (row) { // 修改操作
      const self = this
      console.log(row)
      self.isType = 1
      self.error.title = '修改错误';
      self.error.form.error_no = row.error_no.toString()
      self.error.form.error_info = row.error_info
      self.error.form.error_reason = row.error_reason
      self.error.isError = true;
    },
    deleteClick (row) { // 删除操作
      console.log(row)
      const param = {
        error_no: row.error_no
      }
      this.$confirm('您确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteErrorMessage(param)
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });
      });
    },
    searchClick () { // 查询操作
      const self = this;
      self.pageObj.currentPage = 1;
      // self.pageObj.pageSize = 10;
      self.getErrorMessageList()
    },
    sureClick (data) { // 确定操作
      console.log(data)
      const param = {
        error_no: data.error_no,
        error_info: data.error_no,
        error_reason: data.error_reason
      }
      if (this.isType === 0) {
        this.insertErrorMessage(param)
      } else if (this.isType === 1) {
        this.updateErrorMessage(param)
      }
    },
    cancelClick () {
      this.error.isError = false
      this.error.form.error_no = ''
      this.error.form.error_info = ''
      this.error.form.error_reason = ''
    }
  }
}
</script>
<style lang="scss">
  .toolbar-searh{
    width: 40%;
    margin-left: 20px;
    .el-input-group__prepend{

    }
    .el-input-group__append{
      color: #FFFFFF;
      background-color: #409EFF;
      border-color: #409EFF;
    }
  }
</style>
