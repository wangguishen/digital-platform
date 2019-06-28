<template>
  <el-row>
    <el-col :span="24">
      <el-form ref="search" :inline="true" :model="search" class="toolbar">
        <el-form-item label="账户" prop="account">
          <el-input v-model="search.account" placeholder="请输入账户" clearable size="mini" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="search.name" placeholder="请输入姓名" clearable size="mini" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="searchClick">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-refresh-right" size="mini" @click="resetClick">刷新</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="18">
      <el-table
        v-myScroll:table
        :data="jurisdiction"
        border
        stripe
        style="width: 100%"
        :size="TABLE_SIZE"
        :height="tableHeightPage"
        highlight-current-row
        @row-click="accreditClick"
      >
        <el-table-column
          type="index"
          width="50"
          label="序号"
        />
        <el-table-column
          prop="userName"
          label="姓名"
          width="120"
        />
        <el-table-column
          prop="loginName"
          label="账户"
        />
        <el-table-column
          prop="rose"
          label="角色"
        />
        <el-table-column
          prop="deptName"
          label="营业部"
        />
      </el-table>
      <my-pagination
        :all-total="pageObj.allTotal"
        :current-page="pageObj.currentPage"
        :page-size="pageObj.pageSize"
        :page-sizes="pageObj.pageSizes"
        @pageChange="pageChange"
        @currentChange="currentChange"
      />
    </el-col>
    <el-col :span="6" :style="{height: (tableHeightPage + 37) + 'px'}">
      <div class="jur-tree-header cf">
        <div v-if="isJurisdiction" class="fl jur-tree-header_left">
          为[{{ currentAcc.loginName }}]分配权限
        </div>
        <div v-else class="fl jur-tree-header_left">
          请选择角色
        </div>
        <!-- <div class="fr jur-tree-header_right" @click="urightSave">
          <el-icon class="el-icon-document" />
        </div> -->
      </div>
      <el-scrollbar class="scrollbar-page" wrap-class="scrollbar-wrapper">
        <!-- <div :height="tableHeightPage + 'px'"> -->
        <el-tree
          ref="jurisdiction"
          :style="{height: (tableHeight - 37) + 'px'}"
          :data="treeData"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-expanded-keys="unfoldList"
          :default-checked-keys="checkList"
          :props="defaultProps"
        />
      <!-- </div> -->
      </el-scrollbar>
    </el-col>
  </el-row>
</template>

<script>
import { memberList, getResourceTree, urightSave } from '@/service/systemManage'
import myPagination from "@/components/pagination/my-pagination";
// import { treeData } from '@/utils/publicUtil'
import { list_mixins } from '@/mixins'
export default {
  name: 'jurisdiction',
  components: {
    myPagination
  },
  mixins: [list_mixins],
  data () {
    return {
      search: {
        account: '', // 账号
        name: '' // 姓名
      },
      jurisdiction: [], // 权限列表
      pageObj: {
        allTotal: 0, // 总条数
        currentPage: 1, // 当前页数
        pageSize: 50, // 每页条数
        pageSizes: [10, 20, 50, 100]
      },
      treeData: [], // tree列表
      checkList: [], // 选中列表
      keyList: [], // 默认的id数组
      unfoldList: [], // 展开的数组
      defaultProps: {
        children: 'children',
        label: 'text'
      },
      currentAcc: {}, // 当前点击的账户
      isJurisdiction: false // 头部显示
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.memberList()
      this.getResourceTree()
    },
    async memberList () { // 请求权限列表
      const self = this;
      const param = {
        page: self.pageObj.currentPage,
        rows: self.pageObj.pageSize
      }
      if (self.search.account !== '') param.loginName = self.search.account
      if (self.search.name !== '') param.userName = self.search.name
      const resData = await memberList(param)
      console.log('权限管理列表数据', resData)
      self.pageObj.allTotal = resData.data.total;
      const rows = resData.data.rows
      self.jurisdiction = []
      for (let par = 0; par < rows.length; par++) {
        self.$set(rows[par], 'rose', '')
        if (rows[par].ciscRoles.length !== 0) {
          rows[par].ciscRoles.forEach((item, index) => {
            if (index === rows[par].ciscRoles.length - 1) {
              rows[par].rose += item.roleName
            } else {
              rows[par].rose += item.roleName + ','
            }
          })
        }
        self.$nextTick(() => {
          self.jurisdiction.push(rows[par])
        })
      }
      console.log(self.jurisdiction)
    },
    async getResourceTree () { // 请求树状权限
      const self = this;
      const param = {}
      const resData = await getResourceTree(param)
      console.log("树状权限", resData)
      self.treeData = resData.data
    },
    mergeArr (val, old) {
      if (old.length === 0) return
      for (let key = 0; key < old.length; key++) {
        old[key].ciscRightList.forEach((item, index) => {
          const obj = {
            id: item.id,
            text: item.text
          }
          val.push(obj)
        })
      }
    },
    accreditClick (row, column, event) { // 授权操作
      const self = this;
      const obj = {}
      self.checkList = []
      // self.mergeArr(self.checkList, row.ciscRoles)
      // if (row.ciscRoles.length != 0) {self.mergeArr(self.checkList, treeData(row.ciscRights))}
      // if (row.ciscRights.length != 0) {self.mergeArr(self.checkList, treeData(row.ciscRights))}
      // self.mergeArr(self.checkList, treeData(row.ciscRights))
      for (let key = 0; key < row.ciscRoles.length; key++) {
        row.ciscRoles[key].ciscRightList.forEach((item, index) => {
          if (item.serviceType === 'FUNCTION') {
            const obj = {
              id: item.id,
              text: item.text
            }
            self.checkList.push(obj)
          }
        })
      }
      row.ciscRights.forEach((item, index) => {
        if (item.serviceType === 'FUNCTION') {
          const obj = {
            id: item.id,
            text: item.text
          }
          self.checkList.push(obj)
        }
      })
      self.checkList = self.checkList.reduce(function (item, next) {
        obj[next.id] ? '' : obj[next.id] = true && item.push(next);
        return item;
      }, []);
      self.$nextTick(() => {
        self.currentAcc = row
        self.isJurisdiction = true
        self.$refs.jurisdiction.setCheckedNodes(self.checkList)
        self.keyList = self.$refs.jurisdiction.getCheckedKeys()
      })
    },
    searchClick () { // 检索事件
      this.memberList()
    },
    resetClick () { // 重置事件
      this.search.account = '';
      this.search.name = '';
      this.memberList()
    },
    pageChange (data) { // 每页条数切换回调事件
      console.log(`每页 ${data} 条`);
      this.pageObj.pageSize = data;
      this.memberList()
    },
    currentChange (data) { // 当前页切换事件
      console.log(`当前页: ${data}`);
      this.pageObj.currentPage = data;
      this.memberList()
    },
    roleRightsSave () { // 保存tree
      console.log('---', this.$refs.jurisdiction.getCheckedKeys())
    },
    async urightSave (param) {
      const self = this;
      console.log('---', param)
      console.log('---', this.$refs.jurisdiction.getCheckedKeys())
      const formData = new FormData();
      formData.append('userId', self.currentAcc.loginName);
      const treeIds = self.$refs.jurisdiction.getCheckedKeys();
      treeIds.forEach(item => {
        formData.append('rightIds', item);
      })
      const resData = await urightSave(formData)
      if (resData.data.success) {
        // this.memberList();

        this.$message({
          type: 'success',
          message: '权限分配成功'
        })
      } else {
        this.$message({
          type: 'success',
          message: resData.data.message
        })
      }
    }
  }
}
</script>
<style lang="scss">
  .jur-tree-header{
    height: 37px;
    background-color: #E6EDF8;
    line-height: 37px;
    padding:0 10px;
    color: #000;
    font-size: 14px;
    font-weight: 700;
    top: 0;
    left: 0;
  }
</style>
