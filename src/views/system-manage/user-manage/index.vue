<template>
  <div class="user_manage">
    <el-form :inline="true" :model="formData" class="toolbar">
      <el-form-item label="账号">
        <el-input v-model.number="formData.loginName" placeholder="请输入账号" clearable size="mini" />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model.number="formData.userName" placeholder="请输入姓名" clearable size="mini" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="search">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-refresh-right" size="mini" @click="refresh">刷新</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="24">
        <el-table
          :data="list"
          :height="tableHeightPage"
          stripe
          border
          style="width: 100%; "
          :size="TABLE_SIZE"
        >
          <el-table-column fixed type="index" label="序号" width="50" />
          <el-table-column prop="userName" label="姓名" width="160" />
          <el-table-column prop="loginName" label="账号" :width="160" />
          <el-table-column prop="roles" label="角色" />
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="updateButtonClick(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <my-pagination
      :all-total="total"
      :current-page="page"
      :page-size="rows"
      :page-sizes="[30,60,90,120]"
      @pageChange="pageChange"
      @currentChange="currentChange"
    />
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisible">
      <el-form
        v-if="dialogFormVisible"
        ref="configForm"
        :model="currentForm"
        label-width="80px"
      >
        <!-- :rules="rules" -->
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="currentForm.userName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="用户角色" prop="roles">
          <el-select v-model="currentForm.roles" multiple placeholder="请选择用户角色">
            <el-option v-for="(item,index) in roleList" :key="index" :label="item.roleName" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateSubmit(isUpdate)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getMemberList, getMemberRoles, updateMember } from '@/service/systemManage.js'
import myPagination from "@/components/pagination/my-pagination";
import { list_mixins } from '@/mixins'
export default {
  name: 'user-manage',
  components: { myPagination },
  mixins: [list_mixins],
  data () {
    return {
      isRefresh: false,
      currentForm: {
        userName: '',
        loginName: '',
        roles: []
      },
      roleList: [], // 角色列表
      dialogFormVisible: false,
      list: [],
      formData: {
        loginName: '',
        userName: ''
      },
      page: 1,
      rows: 30,
      total: 0
    }
  },
  created () {
    this.init();
  },
  methods: {
    init () {
      this.getList();
      this.getMemberRoles();
    },
    async getList () {
      const params = {
        loginName: this.formData.loginName,
        userName: this.formData.userName,
        page: this.page,
        rows: this.rows
      }
      for (const key in params) {
        if (!params[key]) {
          delete params[key]
        }
      }
      const res = await getMemberList(params);
      if (this.isRefresh) {
        this.isRefresh = false;
        this.$message({
          type: 'success',
          message: '刷新成功'
        })
      }
      this.total = res.data.total;
      this.list = res.data.rows.map((item) => {
        const obj = item;
        obj.roles = item.ciscRoles.map((jItem) => {
          return jItem.roleName;
        }).join(',');
        return obj;
      })
    },
    // 获取角色列表数据
    async getMemberRoles () {
      const res = await getMemberRoles({});
      // console.log(res, 'juese')
      this.roleList = res.data
    },
    // 查询
    async search () {
      this.page = 1;
      this.getList();
    },
    // 刷新
    async refresh () {
      this.page = 1;
      this.list = [];
      this.isRefresh = true;
      this.getList();
    },
    // 编辑
    async updateButtonClick (item) {
      this.dialogFormVisible = true;
      this.currentForm.userName = item.userName;
      this.currentForm.loginName = item.loginName;
      this.currentForm.roles = item.ciscRoles;
    },
    // 改变每页页码
    pageChange (pageSize) {
      this.rows = pageSize;
    },
    // 当前页
    currentChange (currentPage) {
      this.page = currentPage;
      this.getList();
    },
    async addOrUpdateSubmit (isUpdate) {
      const formData = new FormData();
      const params = {
        loginName: this.currentForm.loginName,
        userName: this.currentForm.userName
      }
      for (const key in params) {
        formData.append(key, params[key])
      }
      this.currentForm.roles.forEach(item => {
        formData.append('ciscRoles', item)
      })
      const res = await updateMember(formData);
      if (res.data.success) {
        this.dialogFormVisible = false;
        this.getList();
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      }
    }
  }
}
</script>

